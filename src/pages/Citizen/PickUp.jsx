import React from 'react'
import { useUserAuth } from "../../context/UserAuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage, setPickups } from "../../firebase/firebase";

export default function PickUp() {
    const { user } = useUserAuth();
    const [type, setType] = React.useState("Yellow");
    const [weight, setWeight] = React.useState("");
    const [imgUrl, setImgUrl] = React.useState("https://www.rd.com/wp-content/uploads/2018/05/garbage-finds-ft.jpg?resize=700,467");
    const [dayTime, setDayTime] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [pincode, setPincode] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [message, setMessage] = React.useState("");
    //console.log(dayTime);

    const handleChange = (e) => {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
                setImgUrl(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setImage(e.target.files[0]);
        }
    };

    // const handleTypeChange = (e) => {
    //     setType(e.target.value);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (image != null){
            const imageRef = ref(storage, `images/${image.name + v4()}`);
            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                setImgUrl(url);
                });
            });
          }
          let pickup = {
            type: type,
            weight: weight,
            imgUrl: imgUrl,
            dayTime: 1664415000,
            location: location,
            pincode: pincode,
            OTP: Math.floor(1000 + Math.random() * 9000),
            status: "pending",
            user: user.uid,
          };
          console.log(pickup);
          await setPickups(pickup);
          setTimeout(function() {
            setMessage("Pickup Scheduled Successfully");
          }, 1000);          
        } catch (error) {
            setTimeout(function() {
                //console.log(error);
                setMessage("Failed to generate pickup-request");
            }, 1000);
        }
      };

  return (
    <div>
        {
            message ? (<h3 className="bg-green-500 text-white p-4 rounded-xl text-center">{message}</h3>) : (
                <form onSubmit={handleSubmit} className='max-w-[400px] w-full mt-20 mx-auto rounded-xl bg-teal-900 text-white p-4'>
                        <h2 className='text-4xl font-bold text-center py-6'>Schedule Your PickUp</h2>
                        <div className='flex flex-col py-2'>
                            <label>Weight</label>
                            <input className='border p-2 text-black' type="text" onChange={(e) => setWeight(e.target.value)}/>
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Address</label>
                            <input className='border p-2 text-black' type="text" onChange={(e) => setLocation(e.target.value)}/>
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Pin Code</label>
                            <input className='border p-2 text-black' type="number" onChange={(e) => setPincode(e.target.value)}/>
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Garbage Type</label>
                            <select name="GarbageType" id="GarbageType" className="text-black" onChange={e => setType(e.target.value)}>
                                <option value="Yellow">Yellow (papers and glass bottles)</option>
                                <option value="Blue">Blue( plastic wrappers and non-bioderadable wastes)</option>
                                <option value="Green">Green(wet and bioderadable wastes)</option>
                            </select>
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Add Image</label>
                            <img src={imgUrl} className="profile-pic border p-2" alt="profile pic" />
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                style={{
                                    fontSize: "15px",
                                    marginLeft: "4vw",
                                    padding: "10px"
                                }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>PickUp Time</label>
                            <input className='border p-2 text-black' type="time" onChange={(e) => setDayTime(e.target.value)} />
                        </div>
                        <button className='border w-full my-5 py-2 bg-white text-teal-900'>Schedule</button>
                </form>
            )
        }
    </div>
  )
}

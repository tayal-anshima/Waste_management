import React,{useState} from 'react'
import { useUserAuth } from "../../context/UserAuthContext";

export default function SignUp(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [location, setLocation] = useState("");
    const [pincode, setPincode] = useState("");
    const { signUp } = useUserAuth();
    const [error, setError] = useState("");
    const [truckColour,setTruckColour]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let data;
        try {
            data = {
                displayName: name,
                isCitizen: false,
                location: location,
                pincode: pincode,
                truckColour: truckColour,
            };
            await signUp(email, password, data);
            setTimeout(function() {
                props.signed(true);
            }, 1000);
        } catch (error) {
            setTimeout(function() {
                props.signed(false);
            }, 2000);
            setError("Failed to create a new account.");
        }
    }

    return (
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto rounded-xl bg-white p-4'>
                    <h2 className='text-4xl font-bold text-center py-6'>Sign Up</h2>
                    <div className="error-msg" style={{ marginTop: "0.2rem", marginLeft: "0.2rem"}}>
                        {error && (
                        <p className="error-text" style={{ color: "red", fontSize: "0.8rem", fontWeight: "900",}}>
                            {" "}
                            {error}
                        </p>
                        )}
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Name</label>
                        <input className='border p-2' type="text" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Email</label>
                        <input className='border p-2' type="text" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Location</label>
                        <input className='border p-2' type="text" onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Pincode</label>
                        <input className='border p-2' type="text" onChange={(e) => setPincode(e.target.value)} required />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input className='border p-2' type="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Truck Colour</label>
                        <select id="truckColour" onChange={(e) => setTruckColour(e.target.value)} required >
                        <option value="Yellow">Yellow (Papers and Glass bottles)</option>
                        <option value="Green">Green(Wet and Bioderadable wastes)</option>
                        <option value="Blue">Blue(Plastic wrappers and Non-bioderadable wastes)</option>
                        </select>
                    </div>
                    <button className='border w-full my-5 py-2 bg-teal-900 hover:bg-teal-800 text-white' type="Submit">Sign In</button>
            </form>
  )
}

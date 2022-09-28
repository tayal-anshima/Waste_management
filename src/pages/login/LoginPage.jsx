import React,{useState} from 'react'
import { useUserAuth } from "../../context/UserAuthContext";
import {  useNavigate } from "react-router-dom";

export default function LoginPage(props) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [category,setCategory]=useState("Citizen");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  function handleChange (e) {
    setCategory(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      setTimeout(function() {
        if(category === "Citizen")
          navigate("/citizenslogedin");
        else
          navigate("/collectorlogedin");
      }, 1000);
    } catch (error) {
      setTimeout(function() {
        navigate("/login");
      }, 2000);
      setError("Incorrect Email or Password");
    }
  };

  return (
    <div>
       <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto mt-20 rounded-xl bg-teal-900 text-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Login</h2>
                <div className="error-msg" style={{ marginTop: "0.2rem", marginLeft: "0.2rem"}}>
                    {error && (
                    <p className="error-text" style={{ color: "white", fontSize: "0.8rem", fontWeight: "1000",}}>
                        {" "}
                        {error}
                    </p>
                    )}
                </div>
                <div className='flex flex-col py-2'>
                    <label>Email</label>
                    <input className='border p-2 text-black' type="text"  onChange={(e) => setEmail(e.target.value)}required/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border p-2 text-black' type="password"  onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Category</label>
                     <select className="text-black" required onChange={ handleChange }>
                       <option value="Citizen" >Citizen</option>
                       <option value="Garbage Collector" >Garbage Collector</option>
                     </select>
                </div>
                <button className='border w-full my-5 py-2 bg-white  text-teal-900' >Login</button>
                {/* Dont have account -----> Sign UP (/cards)*/}
        </form>
    </div>
  )
}

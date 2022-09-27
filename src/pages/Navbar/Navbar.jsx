import React,{useState} from 'react'
import logo from '../../assets/images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
export default function HomeNavbar() {
  const[extend,setExtend]=useState(false);
  return (
   <>
    <div className="bg-slate-100 h-12 flex p-10 justify-between text-teal-900">
       <div className="flex items-center">
         <Link to="/">
          <img className="w-20" src={logo} alt=""/>
          </Link>
         <p className='font-bold text-2xl ml-8 text-teal-900'>Waste-Setu</p>
         <nav className="hidden md:block  items-center ml-6">
            <a className="m-4 hover:cursor-pointer hover:underline" href="/">Home</a>
            <a className="m-4 hover:cursor-pointer hover:underline" href="#About">About</a>
            <a className="m-4 hover:cursor-pointer hover:underline" href="Footer">Footer</a>
         </nav>
       </div>
       <div className=' flex items-center text-xl text-teal-900  '>
           <Link className='border-4 px-4 py-2 text-teal-900 hover:text-white border-teal-900 hover:bg-teal-900 hidden sm:block m-2' to="/login">Login</Link>
           <Link className='border-4 px-4 py-2 text-teal-900 hover:text-white border-teal-900 hover:bg-teal-900 hidden sm:block m-2' to="/cards">SignUp</Link> 
           <button onClick={()=>{setExtend((curr)=>(!curr))}} className='block md:hidden text-teal-900 m-2' ><MenuIcon/></button>
       </div>
    </div>
    <div className={`text-center ${extend?"block":"hidden"} md:hidden bg-slate-100 text-teal-900 `}>
      <ul>
        <li className="mt-3"><Link to="/" >Home</Link></li>
        <li className="mt-3"><Link to="/about" >About</Link></li>
        <li className="mt-3"><Link to="/about" >Footer</Link></li>
        <li className="mt-3 block sm:hidden"><Link to="/login" >Login</Link></li>
        <li className="mt-3 block sm:hidden"><Link to="/about" >SignUp</Link></li>
      </ul>
    </div>
    </>
  )
}

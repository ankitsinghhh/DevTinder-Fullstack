import axios from 'axios';
import React from 'react'
import {useState} from "react"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {
    const [email,setEmailId] = useState("aarav@gmail.com");
    const [password,setPassword] = useState("Strong#1234");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () =>{
    
       try{
        const res = await axios.post(
            BASE_URL+"/login",
            {
                email,
                password,
            },
            { withCredentials:true}
    )

        console.log(res.data.data) 
        dispatch(addUser(res.data.data))
        return navigate('/')

       }
       catch(err){
            console.error(err)
       }
    }

  return (
    <div className='flex  my-40 justify-center max-h-screen max-w-screen'>
      <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body self-center">
    <h2 className="card-title self-center text-2xl text-primary">Login</h2>
    <div>

    <fieldset className="fieldset">
  <div className="form-group">
    <label htmlFor="email" className="fieldset-legend">Email ID</label>
    <input type="text" id="email" value={email} onChange={(e)=>setEmailId(e.target.value)} className="input" placeholder="Enter your Email ID" />
  </div>

  <div className="form-group mt-4">
    <label htmlFor="password" className="fieldset-legend">Password</label>
    <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input" placeholder="Enter a Strong password" />
  </div>
</fieldset>

    </div>
    <div className="card-actions justify-center">
      <button className="btn btn-primary self-center my-4 px-34 " onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>


    </div>
  )
}

export default Login

import axios from "axios";
import { useState } from "react";
import React from "react";

function Signup() {

    const [form, setFrom ] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFrom({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/signup', form)
            localStorage.setItem('token', res.data.token)
            alert('signup successfully')
        } catch (error) {
            console.log(error);
            alert('signup failed')

        }
    }

    return(
        <>
            <div className="flex flex-col bg-green-400 h-screen ">
                <div className="flex flex-col rounded-4xl items-center justify-center h-100 w-100 ml-125 mt-40 bg-zinc-800">
                    <input className="h-10 w-70 pl-4 rounded-4xl" 
                    type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange}/>

                    
                    <input className="mt-3 w-70 h-10 pl-4 rounded-4xl" 
                    type="text" name="email"  placeholder="Email" value={form.email} onChange={handleChange}></input>


                    <input className="mt-3 w-70 h-10 pl-4 rounded-4xl" 
                    type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}></input>


                    <button type="submit" className="mt-3 cursor-pointer
                     bg-zinc-600 w-25 h-10 rounded-3xl" onClick={handleSubmit}>Signup</button>
                </div>
            </div>
        </>
    
    )
}
export default Signup;
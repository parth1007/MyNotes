import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [creds, setcreds] = useState({name:"", email:"",password:"",cpassword:""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name ,email,password} = creds;
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password}) 
          });
          const json= await response.json();
          console.log(json);
          if(json.success) {
            //redirect
            localStorage.setItem('token',json.authToken);
            navigate('/');
        }
        else {
            alert("Invalid credentials")
        }

    };

    const onChange = (e)=>{
        setcreds({...creds,[e.target.name]:e.target.value});
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3 my-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange}/>
            </div>
            <div className="mb-3 my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={onChange} name="password" id="password"/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword"/>
            </div>

            <button type="submit" className="btn btn-primary">SignUp</button>
        </form>
    </div>
  )
}

export default Signup;
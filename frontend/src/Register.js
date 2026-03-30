import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [showPassword,setShowPassword] = useState(false)

const navigate = useNavigate()

const register = async ()=>{

try{

await axios.post(
"https://auth-dashboard-api.onrender.com/register",
{ name,email,password }
)

alert("Registration successful")

navigate("/")

}catch(err){

alert("Registration failed")

}

}

return(

<div className="auth-container">

<div className="auth-box">

<h1>Register</h1>

{/* NAME */}

<div className="input-group">

<span className="icon">👤</span>

<input
type="text"
required
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<label>Name</label>

</div>


{/* EMAIL */}

<div className="input-group">

<span className="icon">📧</span>

<input
type="email"
required
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<label>Email</label>

</div>


{/* PASSWORD */}

<div className="input-group">

<span className="icon">🔒</span>

<input
type={showPassword ? "text" : "password"}
required
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<label>Password</label>

<span
className="show-pass"
onClick={()=>setShowPassword(!showPassword)}
>
👁
</span>

</div>


<button onClick={register}>
Create Account
</button>

<p style={{marginTop:"18px"}}>
Already have an account? <a href="/">Login</a>
</p>

</div>

</div>

)

}

export default Register
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [showPassword,setShowPassword] = useState(false)

const navigate = useNavigate()

const login = async ()=>{

try{

const res = await axios.post(
"https://auth-dashboard-api.onrender.com/login",
{ email, password }
)

localStorage.setItem("token",res.data.token)

navigate("/dashboard")

}catch(err){

alert("Login failed")

}

}

return(

<div className="auth-container">

<div className="auth-box">

<h1>Login</h1>

{/* EMAIL INPUT */}

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


{/* PASSWORD INPUT */}

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


<button onClick={login}>
Login
</button>


<p style={{marginTop:"18px"}}>
No account? <a href="/register">Register</a>
</p>

</div>

</div>

)

}

export default Login
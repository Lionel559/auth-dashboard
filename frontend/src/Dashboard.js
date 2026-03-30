import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import CountUp from "react-countup"

import { Line, Bar } from "react-chartjs-2"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
Title,
Tooltip,
Legend
)

function Dashboard(){

const [user,setUser] = useState(null)
const [users,setUsers] = useState([])
const [dark,setDark] = useState(false)
const [loading,setLoading] = useState(true)

const [editUser,setEditUser] = useState(null)
const [editName,setEditName] = useState("")
const [editEmail,setEditEmail] = useState("")

const navigate = useNavigate()

useEffect(()=>{

const token = localStorage.getItem("token")

axios.get(
"https://auth-dashboard-api.onrender.com/profile",
{
headers:{ authorization:token }
}
).then(res=>{
setUser(res.data.user)
setLoading(false)
})

axios.get("https://auth-dashboard-api.onrender.com/users")
.then(res=>{
setUsers(res.data)
})

},[])

const logout = ()=>{
localStorage.removeItem("token")
navigate("/")
}

/* DELETE USER */

const deleteUser = async(id)=>{

await axios.delete(`https://auth-dashboard-api.onrender.com/users/${id}`)

setUsers(users.filter(user => user.id !== id))

}

/* START EDIT */

const startEdit = (user)=>{

setEditUser(user)
setEditName(user.name)
setEditEmail(user.email)

}

/* UPDATE USER */

const updateUser = async ()=>{

await axios.put(`https://auth-dashboard-api.onrender.com/users/${editUser.id}`,{
name:editName,
email:editEmail
})

setUsers(users.map(u =>
u.id === editUser.id ? {...u,name:editName,email:editEmail} : u
))

setEditUser(null)

}

/* CHART DATA */

const chartData = {
labels:["Jan","Feb","Mar","Apr","May","Jun"],
datasets:[
{
label:"User Growth",
data:[200,400,650,800,1000,1204],
borderColor:"#6366f1",
backgroundColor:"rgba(99,102,241,0.2)",
tension:0.4
}
]
}

const revenueData = {
labels:["Jan","Feb","Mar","Apr","May","Jun"],
datasets:[
{
label:"Revenue",
data:[1200,2100,3400,5000,7200,8430],
backgroundColor:"#10b981"
}
]
}

return(

<div className={dark ? "dashboard dark" : "dashboard"}>

{/* SIDEBAR */}

<div className="sidebar">

<h2 className="logo">🚀 MyApp</h2>

<ul>
<li>📊 Dashboard</li>
<li>👥 Users</li>
<li>📈 Analytics</li>
<li>⚙ Settings</li>
</ul>

<button className="logout" onClick={logout}>
Logout
</button>

</div>


{/* MAIN */}

<div className="main">

{/* TOPBAR */}

<div className="topbar">

<input
className="search"
placeholder="Search users..."
/>

<label className="switch">

<input
type="checkbox"
checked={dark}
onChange={()=>setDark(!dark)}
/>

<span className="slider"></span>

</label>

<div className="user">

{loading ? (
<div className="skeleton-user"></div>
) : (
<>👤 {user.name}</>
)}

</div>

</div>


<h1>Dashboard Overview</h1>


{/* STATS */}

<div className="cards">

<div className="card purple">
<h3>Total Users</h3>
<p className="stat">
<CountUp end={1204} duration={2}/>
</p>
</div>

<div className="card blue">
<h3>Revenue</h3>
<p className="stat">
$<CountUp end={8430} duration={2}/>
</p>
</div>

<div className="card green">
<h3>Orders</h3>
<p className="stat">
<CountUp end={320} duration={2}/>
</p>
</div>

</div>


{/* USER GROWTH CHART */}

<h2 className="section-title">User Analytics</h2>

<div className="chart">
<Line data={chartData}/>
</div>


{/* REVENUE CHART */}

<h2 className="section-title">Revenue Analytics</h2>

<div className="chart">
<Bar data={revenueData}/>
</div>


{/* USERS TABLE */}

<h2 className="section-title">Users</h2>

<table className="table">

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{users.map((u,index)=>(

<tr key={index}>

<td>{u.name}</td>

<td>{u.email}</td>

<td><span className="active">Active</span></td>

<td>

<button
className="edit-btn"
onClick={()=>startEdit(u)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteUser(u.id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>


{/* EDIT MODAL */}

{editUser && (

<div className="modal">

<div className="modal-box">

<h3>Edit User</h3>

<input
value={editName}
onChange={(e)=>setEditName(e.target.value)}
/>

<input
value={editEmail}
onChange={(e)=>setEditEmail(e.target.value)}
/>

<button onClick={updateUser}>
Save
</button>

<button onClick={()=>setEditUser(null)}>
Cancel
</button>

</div>

</div>

)}

</div>

</div>

)

}

export default Dashboard
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await dispatch(loginUser(form));
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;
import React from 'react'
import Template from '../components/Template'
import loginImg from "../assets/login.png"

// login
const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      desc1="Stay connected. Stay informed. Stay safe with Guardview.ai."
      image={loginImg}
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login

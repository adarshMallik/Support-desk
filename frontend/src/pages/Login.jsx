import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import { useNavigate} from 'react-router-dom'
import {FaSignInAlt,FaUser} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import {login,reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData,setFormData]= useState({
    email:'',
    password: '',
  })

  const {name,email,password,password2}= formData

  const dispatch = useDispatch()   
  const navigate = useNavigate()

  const {user,isLoading,isError,isSuccess,message} = useSelector(state => state.auth)
  
  useEffect(() =>{
    if(isError){
     toast.error(message)
    }

    //Redirect when logged in
    if(isSuccess || user)
    {
     navigate('/')
    }
    dispatch(reset())

},[isError,isSuccess,dispatch,user,message,navigate])

  const onChange = (e) =>{
          setFormData((prevState) =>({
            ...prevState,[e.target.name]: e.target.value,
          }))
  }

  const onSubmit = (e) =>{
    e.preventDefault()

      const userData= {
        email,
        password
      }

      dispatch(login(userData))
    
}

if(isLoading)
{
  <Spinner/>
}
  return (
    <>
     <section className='heading'>
      <h1>
        <FaSignInAlt/> Login
      </h1>
      <p>Please login into your account </p>
      <section className='form'>
        <form onSubmit={onSubmit}>
          
         <div className='form-group'>
          <input 
          type='email' 
          className='form-control' 
          id='email' 
          name='email'
          value={email} 
          onChange={onChange} 
          placeholder='Enter your email'
          required/>
          </div>

         <div className='form-group'>
         <input 
          type='password' 
          className='form-control' 
          id='password' 
          name='password'
          value={password} 
          onChange={onChange} 
          placeholder='Enter your password'
          required/> 
          </div>

        <div className='form-group'>
          <button className='btn btn-block'>Submit</button>

        </div>

        </form>

      </section>

     </section>
    </>
  )
}

export default Login

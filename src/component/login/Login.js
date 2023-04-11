import '../../styles/style.css'
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from 'react';
import { key } from '../../keys/Keys';



function LogIn(props) {
    const userEmail = useRef()
    const password = useRef()

    const [errorMessage, setErrorMessage] = useState('')
    const [emailMessage, setEmailErrorMessage] = useState('')
    const [passwordError, setPasswordErrorMessage] = useState('')

    const navigate = useNavigate()



    const emailValidation = () => {
        let emailValid = userEmail.current.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        if (!emailValid) {
            setEmailErrorMessage('Invalid Email')
        }
        else {
            setEmailErrorMessage('')
        }
    }

    const passwordValidation = () => {
        if (password.current.value.length < 6) {
            setPasswordErrorMessage('Password length is less than 8')
        }
        else {
            setPasswordErrorMessage('')
        }
    }
    const verifyCredentials = () => {


        let obj = JSON.parse(localStorage.getItem(key))
        if (obj) {
            const found = obj.find((object) => { return object.email == userEmail.current.value })
            if (found) {
                if (found.password === password.current.value) {
                    navigate(`/posts/${found.id}`)

                }
                else {
                    setErrorMessage('Invalid username/password')

                    setTimeout(() => {
                        setErrorMessage('')
                    }, 2000)
                }
            } else {
                setErrorMessage('Invalid username/password')
                setTimeout(() => {
                    setErrorMessage('')
                }, 2000)
            }
        }

    }

    return (
        <div>
            <h1 className='spacing'>Login</h1>
            <h4 className='errorMessage'>{errorMessage}</h4>
            <label className='spacing'>Enter Your Email</label><br />
            <input type="text" name="Email" className='spacing' ref={userEmail} onBlur={emailValidation} /><br />
            <p className='errorMessage'>{emailMessage}</p>
            <label className='spacing'>Enter Your Password</label><br />
            <input type="password" name="Password" className='spacing' ref={password} onBlur={passwordValidation} /><br />
            <p className='errorMessage'>{passwordError}</p>
            <input type="submit" value="SignIn" className="spacing" onClick={verifyCredentials} />
            <h4 className='spacing'>Don't have an account? <Link to="SignUp"> SignUp</Link></h4>

        </div>
    )

}
export default LogIn;
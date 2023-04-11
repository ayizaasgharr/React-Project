import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { key } from '../../keys/Keys';

function SignUp(props) {

    const username = useRef()
    const email = useRef()
    const password = useRef()

    const [emailMessage, setEmailErrorMessage] = useState('')
    const [passwordError, setPasswordErrorMessage] = useState('')
    const [nameError, setNameError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const nameValidation = () => {

        let nameValid = username.current.value.match(/^[A-Za-z]+$/)
        if (!nameValid) {
            setNameError('Invalid name')
        }
        else if (username.current.value < 4) {
            setNameError('Name length should be atleast 4')
        }
        else {
            setNameError('')
        }
    }
    const emailValidation = () => {
        let emailValid = email.current.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        if (!emailValid) {
            setEmailErrorMessage('Invalid Email')
        }
        else {
            setEmailErrorMessage('')
        }
    }

    const passwordValidation = () => {
        if (password.current.value.length < 8) {
            setPasswordErrorMessage('Password length is less than 8')
        }
        else {
            setPasswordErrorMessage('')
        }
    }

    const addUser = () => {

        if (email.current.value != '' && password.current.value != '' && username.current.value != '') {
            let obj = JSON.parse(localStorage.getItem(key))
            let userData = {
                id: obj === null ? 11 : obj.length + 1,
                name: username.current.value,
                email: email.current.value,
                password: password.current.value,

            }

            if (obj) {
                obj.push(userData)
                localStorage.setItem(key, JSON.stringify(obj))
                navigate(`/posts/${userData.id}`)

            }
            else {

                localStorage.setItem(key, JSON.stringify([userData]))
                navigate(`/posts/${userData.id}`)

            }
        }
        else {
            setErrorMessage('All field required!!!')

            setTimeout(() => {
                setErrorMessage('')
            }, 2000)
        }
    }



    return (<div>

        <h1 className="spacing">SignUp</h1>
        <h4 className='errorMessage'>{errorMessage}</h4>
        <label className="spacing" >Enter Your Name</label><br />
        <input type="text" name="Name" className="spacing" ref={username} onBlur={nameValidation} /><br />
        <p className='errorMessage'>{nameError}</p>

        <label className="spacing">Enter Your Email</label><br />

        <input type="text" name="Email" className="spacing" ref={email} onBlur={emailValidation} /><br />
        <p className='errorMessage'>{emailMessage}</p>

        <label className="spacing">Enter Your Password</label><br />
        <input type="password" name="Password" className="spacing" ref={password} onBlur={passwordValidation} /><br />
        <p className='errorMessage'>{passwordError}</p>

        <input type="submit" value="SignUp" className="spacing" onClick={addUser} />
        <h4>Already have an account? <Link to="/"> SignIn</Link></h4>
    </div>)



}
export default SignUp;

import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/style.css'
import { key2 } from '../../keys/Keys.js'

function CreatePost(props) {

    const title = useRef()
    const content = useRef()
    const { id } = useParams()
    const [error, setError] = useState('')
    const navigate = useNavigate()




    const submitContent = () => {
        if (title.current.value === '' || content.current.value === '') {
            return setError("All input field required!!!")

        }
        let userid = id;
        let obj = JSON.parse(localStorage.getItem(key2))
        let postData = {
            id: (obj === null || obj.length === 0) ? 101 : obj[obj.length - 1].id + 1,
            userId: userid,
            title: title.current.value,
            body: content.current.value,
        }
        if (obj) {

            obj.push(postData)
            localStorage.setItem(key2, JSON.stringify(obj))
        }
        else {
            localStorage.setItem(key2, JSON.stringify([postData]))

        }
        navigate(`/posts/${id}`)

    }

    return (
        <div>
            <h1> Create Post</h1>
            <h4> Title</h4>
            <input type="text" className='spacing' ref={title} /> <br />
            <h4> Content</h4>

            <textarea type="text" className='spacing' ref={content} /> <br />
            <p className='errorMessage'>{error}</p>

            <input type="submit" className='spacing' onClick={submitContent} />

        </div>
    )



}
export default CreatePost;
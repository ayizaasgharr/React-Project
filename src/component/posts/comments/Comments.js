
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import axios from "axios";
import { key, key3 } from "../../../keys/Keys";
import useFetch from "../../../hooks/FetchData";
function Comments(props) {
    const { userid, postid } = useParams()
    let obj = JSON.parse(localStorage.getItem(key))
    const user = obj.find((object) => { return object.id == userid })
    const newcomment = useRef()
    const [comments, setComments] = useState([])
    const [refresh, setIsRefresh] = useState(false)
    const [editComment, setIsEditComment] = useState(false)
    const [editId, setEditId] = useState('')
    const editedComment = useRef()
    const [error, setError] = useState('')
    const data = useFetch(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)




    const submitComment = () => {
        if (newcomment.current.value == '') {
            return setError("All input field required!!!")
        }
        let obj3 = JSON.parse(localStorage.getItem(key3))
        let commentData = {
            postId: postid,
            id: (obj3 === null || obj3.length === 0) ? 501 : obj3[obj3.length - 1].id + 1,
            name: user.name,
            email: user.email,
            body: newcomment.current.value,

        }
        if (obj3) {

            obj3.push(commentData)
            localStorage.setItem(key3, JSON.stringify(obj3))
        }
        else {
            localStorage.setItem(key3, JSON.stringify([commentData]))

        }

        setIsRefresh(true)
    }


    useEffect(
        () => {
            data.then((res) => {
                if (res.length > 0) {
                    let obj = JSON.parse(localStorage.getItem(key3))
                    if (obj) {
                        const array = obj.filter((object) => {
                            return (object.postId == postid)
                        })
                        let res2 = [...res, ...array]
                        setComments(res2)

                    }
                    else {
                        setComments(res)

                    }
                    newcomment.current.value = ''
                }
                else {

                    let obj = JSON.parse(localStorage.getItem(key3))
                    if (obj) {
                        const array = obj.filter((object) => {
                            return (object.postId == postid)
                        })
                        setComments(array)

                    }

                }
                setIsRefresh(false)

            }

            )
        }
        , [refresh]
    )
    return (

        <div>
            <h1>Comments</h1>

            {comments &&
                comments.map((data) => {
                    return (
                        <div key={data.id}>
                            <p>{data.name}</p>
                            {(editId === data.id && editComment == true) ? <input type="text" defaultValue={data.body} ref={editedComment} /> : <p>{data.body}</p>}

                            {user.email === data.email ? editComment == false ? <button onClick={() => {
                                setEditId(data.id)
                                setIsEditComment(true)
                            }}>edit</button> : <button onClick={() => {

                                let comments = JSON.parse(localStorage.getItem(key3))
                                const ind = comments.findIndex((object) => { return editId == object.id })
                                comments[ind].body = editedComment.current.value
                                localStorage.setItem(key3, JSON.stringify(comments))
                                setIsEditComment(false)
                                setIsRefresh(true)
                            }}>save</button> : <p></p>

                            }

                            {
                                user.email === data.email && <button onClick={() => {
                                    let objs = JSON.parse(localStorage.getItem(key3))
                                    const index = objs.findIndex((object) => { return object.id == data.id })
                                    objs.splice(index, 1)
                                    localStorage.setItem(key3, JSON.stringify(objs))
                                    setIsRefresh(true)

                                }}>delete</button>
                            }
                            <hr />
                        </div>
                    )

                })
            }

            <input type="text" className='spacing' placeholder="Write comment" ref={newcomment} /> <br />
            <p className='errorMessage'>{error}</p>

            <input type="submit" className='spacing' onClick={submitComment} />

        </div>

    )


}
export default Comments
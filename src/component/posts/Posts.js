import { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { key2 } from "../../keys/Keys";
import useFetch from "../../hooks/FetchData";
function Posts(props) {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [refresh, setIsRefresh] = useState(false);
    const data = useFetch("https://jsonplaceholder.typicode.com/posts");
    const navigateTo = () => {
        navigate(`/posts/${id}/create-post`);
    };

    useEffect(() => {
        data.then((res) => {
            if (res.length > 0) {
                let obj = JSON.parse(localStorage.getItem(key2));
                if (obj) {
                    let res2 = [...res, ...obj];
                    setPosts(res2);
                } else {
                    setPosts(res);
                }
            }
        });
        setIsRefresh(false);
    }, [refresh]);

    return (
        <div>
            <h1>
                Posts
                <button type="button" onClick={navigateTo}>
                    Create Post
                </button>{" "}
                <button
                    type="button"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Signout
                </button>
            </h1>
            {posts &&
                posts.map((data) => {
                    return (
                        <div key={data.id}>
                            <h3>
                                {data.id}. {data.title}
                            </h3>

                            <p>{data.body}</p>
                            {id === data.userId && (
                                <button
                                    onClick={(postid) => {
                                        navigate(`/posts/${data.id}/edit-post`);
                                    }}
                                >
                                    edit
                                </button>
                            )}
                            {id === data.userId && (
                                <button
                                    onClick={() => {
                                        let objs = JSON.parse(localStorage.getItem(key2));
                                        const index = objs.findIndex((object) => {
                                            return object.id == data.id;
                                        });

                                        objs.splice(index, 1);
                                        localStorage.setItem(key2, JSON.stringify(objs));
                                        setIsRefresh(true);
                                    }}
                                >
                                    delete
                                </button>
                            )}
                            {
                                <button
                                    onClick={() => {
                                        navigate(`/posts/comments/${id}/${data.id}`);
                                    }}
                                >
                                    View Comments
                                </button>
                            }
                            <hr />
                        </div>
                    );
                })}
        </div>
    );
}
export default Posts;

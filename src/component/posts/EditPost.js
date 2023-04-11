import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/style.css";
import { key2 } from "../../keys/Keys";

function EditPost(props) {
    const { id } = useParams();
    const [defaultTitle, setDefaultTitle] = useState("");
    const [defaultContent, setDefaultContent] = useState("");
    const title = useRef();
    const content = useRef();
    const navigate = useNavigate();

    let obj = JSON.parse(localStorage.getItem(key2));
    useEffect(() => {
        const found = obj.find((object) => {
            return object.id == id;
        });
        setDefaultTitle(found.title);
        setDefaultContent(found.body);
    }, []);

    const submitContent = () => {
        const ind = obj.findIndex((object) => {
            return object.id == id;
        });
        if (title.current.value != "") {
            obj[ind].title = title.current.value;
        }
        if (content.current.value != "") {
            obj[ind].body = content.current.value;
        }
        localStorage.setItem(key2, JSON.stringify(obj));
        navigate(-1);
    };
    return (
        <div>
            <h1> Edit Post</h1>
            <h4> Title</h4>
            <input
                type="text"
                className="spacing"
                ref={title}
                defaultValue={defaultTitle}
            />{" "}
            <br />
            <h4> Content</h4>
            <textarea
                type="text"
                className="spacing"
                ref={content}
                defaultValue={defaultContent}
            />{" "}
            <br />
            <input type="submit" className="spacing" onClick={submitContent} />
        </div>
    );
}
export default EditPost;

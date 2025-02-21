import {useState} from "react";
import './AddNote.css';

export default function AddNote({notes, setNotes}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:5000/add_note/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, content, category})
        });

        const result = await response.json();
        setMessage(response.ok ? result.message : result.error);

        if (response.ok) {
            setNotes([...notes, {id: result.id, title, content, category}]);
        }
    };

    return (
        <div>
            <h2>Add Note</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Add Note</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

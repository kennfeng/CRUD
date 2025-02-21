import { useState } from "react";

export default function UpdateNote({ notes, setNotes }) {
    const [noteId, setNoteId] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://127.0.0.1:5000/update_note/${noteId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle,
                content: newContent,
                category: newCategory,
            })
        });

        const result = await response.json();
        setMessage(response.ok ? result.message : result.error);

        if (response.ok) {
            setNotes(notes.map(note =>
                note.id === parseInt(noteId)
                    ? { ...note, title: newTitle, content: newContent, category: newCategory }
                    : note
            ));
        }
    };

    return (
        <div>
            <h2>Update Note</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="number"
                    placeholder="Note ID"
                    value={noteId}
                    onChange={(e) => setNoteId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="New Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                />
                <textarea
                    placeholder="New Content"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    required
                />
                <button type="submit">Update Note</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

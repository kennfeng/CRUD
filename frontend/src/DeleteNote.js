import {useState} from "react";

export default function DeleteNote({notes, setNotes}) {
    const [noteId, setNoteId] = useState("");
    const [message, setMessage] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://127.0.0.1:5000/delete_note/${noteId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        setMessage(response.ok ? result.message : result.error);

        if (response.ok) {
            // Remove deleted note from the state
            setNotes(notes.filter(note => note.id !== parseInt(noteId)));
        }
    };

    return (
        <div>
            <h2>Delete Note</h2>
            <form onSubmit={handleDelete}>
                <input
                    type="number"
                    placeholder="Note ID"
                    value={noteId}
                    onChange={(e) => setNoteId(e.target.value)}
                    required
                />
                <button type="submit">Delete Note</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

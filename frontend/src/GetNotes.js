import {useState, useEffect} from "react";

export default function GetNotes() {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/notes");

        if (!response.ok) {
          const data = await response.json();
          setMessage(data.error || "Something went wrong");
        } else {
          const data = await response.json();
          setNotes(data.notes || []);
        }
      } catch (error) {
        setMessage("Error fetching notes");
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Notes List</h2>
      {message && <p>{message}</p>}
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>ID:</strong> {note.id} <br />
              <strong>Title:</strong> {note.title} <br />
              <strong>Category:</strong> {note.category} <br />
              <em>{note.content}</em> <br />
              <small>{note.timestamp}</small>
            </li>
          ))}
        </ul>
      ) : !message && <p>No notes found</p>} 
    </div>
  );
}
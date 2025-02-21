import {useState, useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import AddNote from "./AddNote";
import DeleteNote from "./DeleteNote";
import GetNotes from "./GetNotes";
import UpdateNote from "./UpdateNote";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://127.0.0.1:5000/notes");
      const result = await response.json();
      if (response.ok) {
        setNotes(result.notes || []);
      }
    };
    fetchNotes();
  }, []);

  return (
    <Router>
      <div>
        <h1>React Notes Manager</h1>
        {/* Navigation Links */}
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/notes">View All Notes</Link> | 
          <Link to="/add">Add Note</Link> | 
          <Link to="/update">Update Note</Link> | 
          <Link to="/delete">Delete Note</Link>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<h2>Home Page</h2>} />

          {/* Route to View All Notes) */}
          <Route path="/notes" element={<GetNotes notes={notes} />} />

          {/* Route for AddNote */}
          <Route path="/add" element={<AddNote notes={notes} setNotes={setNotes} />} />

          {/* Route for UpdateNote */}
          <Route path="/update" element={<UpdateNote notes={notes} setNotes={setNotes} />} />

          {/* Route for DeleteNote */}
          <Route path="/delete" element={<DeleteNote notes={notes} setNotes={setNotes} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

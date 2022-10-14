import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/NotesList";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "17/03/2022",
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "17/03/2022",
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "17/03/2022",
    },
    {
      id: nanoid(),
      text: "This is my new note!",
      date: "17/03/2022",
    }
  ]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem("react-notes-app-data")
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
     <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList 
            notes={notes.filter((note) =>
              note.text.toLowerCase().includes(searchText)
              )}
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
        />
     </div>
  </div>
  );
};

export default App;
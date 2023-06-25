import React, { useState } from "react";
import Axios from 'axios'; 

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function postNote() {
    
    if(note.title.length !==0){

      Axios.post("/articles", {
        title: note.title, 
        content: note.content
      }).then (
        res => {
          console.log(res.data)
        }
      )

    }
  }

  const[showText, setText] = useState(false); 

  function handleTitleClick() {
    setText(true); 
  }

  // function handleSearchClick(){
  //   console.log(note.title);
  //   console.log(note.content);  
  //   if(note.title !== ""){
  //     props.onSearch(note.title); 
  //   }

  //   // setNote({
  //   //   title: "",
  //   //   content: ""
  //   // });
    
  // }

  function handleChange(event) {
    const { name, value } = event.target;

    if(name === "title"){
      console.log("title area changed."); 
      props.onSearch(value); 
    }

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    postNote(); 
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note" action="/articles" method="post">
        <input
          onClick={handleTitleClick}
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        {showText && 
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={showText ? 3 : 1}
        />
        }
        <button className="add" onClick={submitNote}>Add</button>  
      </form>    
      {/* <button className="search" onClick={handleSearchClick}>🔍</button> */}
      
    </div>
  );
}

export default CreateArea;
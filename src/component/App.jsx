import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios"; 
// import notes from '../notes'; 

function App() {

    
    // const[noteLst, setLst] = useState([...notes]); 
    const[noteLst, setLst] = useState([{}]);
    const[inp, setInput] = useState(""); 
    const[isSearch, setIsSearch] = useState(false); 
    const[resLst, setResLst] = useState([{}]); 

    useEffect(() => {
      fetch("/articles").then(
        response => response.json()
      ).then (
        data => {
          setLst(data)
          fetch(`/articles/${inp}`).then(
            response => response.json()
          ).then (
            data => {
              setResLst(data)
            }
          )
        }
      )
    }, [inp])

    function addNote(note) {
      if(note.title !== ""){
        setLst( prev => [...prev, note]); 
        setResLst(prev => [...prev, note]); 
      }
    }

    function searchNote(input) {
      setInput(input); 
      setIsSearch(true); 
    }

    function deleteNote(id, title) {
        // console.log(id); 
        setLst(prev => {
          return prev.filter((item, index) => {
            return index !== id;
          })});
        setResLst(prev => {
          return prev.filter((item, index) => {
            return index !== id;
          })});
        
        Axios.delete(`/articles/${title}`)
        .then(res => console.log("Deleted!!!", res)).catch(err => console.log(err)); 
        
    }

  return (
    <div>
      <Header />
      <CreateArea 
        onAdd = {addNote}
        onSearch = {searchNote}
      />

     
      { isSearch ? 
      resLst.map((item, index) => { 
        return (
        <Note 
             onDelete={deleteNote}
             key={index} id={index} title={item.title} 
             content={item.content} 
         /> 
        );
     }) :
      noteLst.map((item, index) => { 
       return (
       <Note 
            onDelete={deleteNote}
            key={index} id={index} title={item.title} 
            content={item.content} 
        /> 
       );
    })}
      
      <Footer />
    </div>
  );
}

export default App;

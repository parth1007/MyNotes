import React, {useContext,useState,useEffect,useRef} from 'react';
import noteContext from '../context/noteContext';
import NoteItem from './noteItem';
import { useNavigate } from "react-router-dom";


const Home = () => {
  const context = useContext(noteContext);
  const {notes, addNote,getNotes,editNote} = context;
  let navigate = useNavigate();

  const [note, setnote] = useState({title:"",description:"",tag:"default"})
  const submit = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description,note.tag);
    setnote({title:"",description:"",tag:"default"});
  }
  const onChange = (e)=>{
    setnote({...note,[e.target.name]:e.target.value});
  }
  const oneChange = (e)=>{
    setenote({...enote,[e.target.name]:e.target.value});
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else {
      navigate("/login");
    }
  }, [])
  const [enote, setenote] = useState({id:"",etitle:"",edescription:"",etag:"default"})

  const ref = useRef(null);
  const refClose = useRef(null);
  
  const updateNote = (currentNote)=>{
    ref.current.click();
    setenote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description})
  }

  const esubmit = (e)=>{
    e.preventDefault();
    editNote(enote.id,enote.etitle,enote.edescription);
    refClose.current.click();
    // addNote(note.title, note.description,note.tag);
  }

  return (
    <div>
      <div className="container my-3">
      <h2>Add a note</h2>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
        </div>

        <button type="submit" className="btn btn-primary" onClick={submit}>Add</button>
      </form>




        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref = {ref} data-bs-target="#exampleModal" >
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                  <form>
                    <div className="mb-3 my-3">
                      <label htmlFor="etitle" className="form-label">Title</label>
                      <input type="text" className="form-control" id="etitle" name="etitle" onChange={oneChange} value={enote.etitle}/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">Description</label>
                      <input type="text" className="form-control" id="edescription" name="edescription" onChange={oneChange} value={enote.edescription}/>
                    </div>

                    {/* <button type="submit" className="btn btn-primary" onClick={submit}>Add</button> */}
                  </form>
              </div>

              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={esubmit} className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>


      <h2 className="my-3">Your Notes</h2>
      <div className="notesgrid row">
        {notes.map((note)=>{
          return <NoteItem key={note._id} updateNote={updateNote} note={note}/>;
        })}
      </div>
      </div>
    </div>
  )
}

export default Home;
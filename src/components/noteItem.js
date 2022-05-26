import React ,{useContext} from 'react';
import noteContext from '../context/noteContext';


const NoteItem = (props) => {
    const {note,updateNote} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

    const deletenote = ()=>{
      deleteNote(note._id);
    }

  return (

    <div className="col-md-3">
        <div className="card-body border">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <button type="button" className="btn btn-primary btn-sm" onClick={deletenote}>Delete</button>
            <button type="button" className="btn btn-primary mx-3 btn-sm" onClick={()=>{updateNote(note)}}>Update</button>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
    </div>
  )
}

export default NoteItem;
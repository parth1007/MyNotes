const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Notes = require("../models/Notes");

const fetchuser = require("../middleware/getuser");

const { body, validationResult } = require("express-validator");


// Route 1: Fetch all the notes from user:

router.get("/fetchNotes",fetchuser,async(req, res) => {
    try {
        const notes = await Notes.find({user : req.user.id});
        res.json(notes);
    } catch (error) {
        res.status(400).send("Some error occured");
      }
})


// Route 2: Add a note: Login required

router.post(
  "/addNote",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {

    try {
        
        const {title, description, tag} = req.body;

        // Check for any errors, if error exist return bad request and errors
        const errors = validationResult(req, res);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag,user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        res.status(400).send("Some error occured");
      }
    }
  );


// Route 3: Update a note:

router.put('/updateNote/:id', fetchuser , async (req, res)=>{
  const {title, description, tag} = req.body;
  try {
    

    // Creating a new note
    const newNote={};
    if(title) {newNote.title = title};
    if(description) {newNote.description = description};
    if(tag) {newNote.tag = tag};


    //Finding note and update
    let note = await Notes.findById(req.params.id);
    if(!note) {return res.status(404).send("Not found")};

    
    //Validating user
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true});
    res.json({note})


  } catch (error) {
    res.status(400).send("Some error occured");
  }
})


// Route 4: Delete a note:

router.delete('/deleteNote/:id', fetchuser , async (req, res)=>{
  // const {title, description, tag} = req.body;
  try {
    
    //Finding note
    let note = await Notes.findById(req.params.id);
    if(!note) {return res.status(404).send("Not found")};

    
    //Validating user
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted",note:note})


  } catch (error) {
    res.status(400).send("Some error occured");
  }
})





  module.exports = router;

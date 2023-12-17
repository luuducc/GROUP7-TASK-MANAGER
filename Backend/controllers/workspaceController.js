const TodoList = require("../models/WorkSpace");
const User = require("../models/WorkSpace");
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyTokenAndUser,
} = require("./verifyToken");
const WorkSpace = require("../models/WorkSpace");

const WorkspaceController = {

  // CREATE wWORKSPACE
  createWorkspace:async (req, res) => {
    try {
      //Create new workspace
      const newWorkspace = await new WorkSpace({
        title: req.body.title,
        body: req.body.body,
      });

      //Save todoList to DB
      const workspace = await newWorkspace.save();
      res.status(200).json(workspace);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL WORKSPACE
  getAllWorkspace: async (req, res) => {
    try {
      const workspace = await WorkSpace.find();
      res.status(200).json(workspace);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  //DELETE WORKSPACE BY ID
  deleteWorkspace: async (req, res) => {
    try {
      await WorkSpace.findByIdAndDelete(req.params.idWorkspace);
      res.status(200).json("Workspace deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE WORKSPACE
  updateWorkspace: async (req, res) => {
    try {
      const workspace = await WorkSpace.findByIdAndUpdate(
        req.params.idWorkspace,
        {
          title: req.body.title,
          body: req.body.body
        },
        { new: true }
      );
  
      if (!workspace) {
        return res.status(404).json({ error: "Workspace not found" });
      }
      res.status(200).json(workspace);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    
};

module.exports = WorkspaceController;

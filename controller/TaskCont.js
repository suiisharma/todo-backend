import Response from "../Utils/response.js";
import Task from "../models/TaskScema.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!(title && description)) {
      return Response(res, 400, false, "Required fields can't be empty!");
    }
    await Task.create({ title, description, userId: req.user._id });
    Response(res, 201, true, "Task created successfully!");
  } catch (error) {
    Response(res, 400, false, "Task Creation Failed!");
    console.log(error.message);
  }
};

export const GetAllTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId });
    Response(res, 200, true, tasks);
  } catch (error) {
    Response(res, 400, false, "Task Fetching failed!");
    console.log(error.message);
  }
};

export const UpdateTasks = async (req, res) => {
  try {
    if (!req.params.id) {
      return Response(res, 400, false, "Invalid Request!");
    }
    const task = await Task.findById(req.params.id);
    if(!task){
      return Response(res,400,false,"Task not found!")
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    Response(res, 200, true, "Task Updated Successfully!");
  } catch (error) {
    Response(res, 400, false, "Some Error Occured!");
    console.log(error.message);
  }
};

export const DeleteTask = async (req, res) => {
  try {
    if(!(req.params.id)){
      return Response(res,400,false,"Invalid Request!")
    }
    const task=await Task.findByIdAndDelete(req.params.id);
    if(!task){
      return Response(res,400,false,"Task not found!")
    }
    Response(res, 200, true, "Task Deleted Successfully!");
  } catch (error) {
    Response(res, 400, false, "Some Error Occured!");
    console.log(error.message);
  }
};

export const EditTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if(!(title&&description)){
      return Response(res, 400, false, "Required fields can't be empty!");
    }
    if(!(req.params.id)){
      return Response(res,400,false,"Invalid Request!")
    }
    const task = await Task.findById(req.params.id);
    if(!task){
      return Response(res,400,false,"Task not found!")
    }
    task.title = title;
    task.description = description;
    await task.save();
    Response(res, 200, true, "Task Updated Successfully!");
  } catch (error) {
    Response(res, 404, false, "Some Error Occured!");
    console.log(error.message);
  }
};

import express from 'express'
import IsAuthenticated from '../middleware/IsAuthenticated.js'
import { GetAllTasks, UpdateTasks, createTask ,DeleteTask, EditTask} from '../controller/TaskCont.js'

const taskRouter= express.Router()

taskRouter.post('/CreateTask',IsAuthenticated,createTask);

taskRouter.get('/GetAllTasks',IsAuthenticated,GetAllTasks)

taskRouter.route('/:id',IsAuthenticated).put(UpdateTasks).delete(DeleteTask).post(EditTask)

export default taskRouter
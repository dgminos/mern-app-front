import { useState, useEffect } from "react"
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Modal } from 'react-bootstrap'
import EditTaskForm from "./EditTaskForm"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  let today = new Date()
  let formattedDate = today.toLocaleDateString()

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const backURL= 'https://mern-todo-app-back-884n-dev.fl0.io/'

  useEffect(() => {
    return () => handleClose()
}, [task])

  const handleDeleteClick = async () => {
    
    if (!user) {
      return
    }

    const response = await fetch(backURL+'/api/tasks/' + task._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TASK', payload: json})
    }
  }

  return (
    <div className=" d-block task-details">
      <div className='row justify-content-space-between'>
        <div className='col-md-11'>
      <h4><strong>{task.title}</strong></h4>
      <p><strong>Created By: </strong>{task.createdBy}</p>
      <p><strong>Description: </strong>{task.description}</p>
      <p><strong>Date: </strong>{formattedDate}</p>
      <p>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
        </div>
        <div className='col-md-1 btns text-center'>
      <span className="material-symbols-outlined" id='btn-delete' onClick={handleDeleteClick}>Delete</span>
      <span className="material-symbols-outlined mt-5" id='btn-update' onClick={handleShow}>Edit</span>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Edit Task
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditTaskForm theTask={task} /> 
        </Modal.Body>
    </Modal>
    </div>
  )
}

export default TaskDetails
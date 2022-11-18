import { useState } from 'react'
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Form, Button } from 'react-bootstrap'

const EditTaskForm = ({ theTask }) => {

  const id = theTask._id

  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState(theTask.title)
  const [createdBy, setCreatedBy] = useState(theTask.createdBy)
  const [description, setDescription] = useState(theTask.description)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const backURL= 'https://mern-app-back-production.up.railway.app/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedTask = {id,title, createdBy, description}
    
    if (!user) {
      setError('You must be logged in')
      return
    }

    const response = await fetch('backURL/api/tasks/'+ theTask._id, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              }
    })

    const json = await response.json()
    console.log(json)

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    
    if (response.ok) {
      dispatch({type: 'UPDATE_TASK', payload: json})
      const fetchTasks = async () => {
        const response = await fetch('backURL/api/tasks', {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()
  
          dispatch({type: 'SET_TASKS', payload: json}) 
      }
  
      if (user) {
        fetchTasks()
      }
    }
  }

  return (
    <Form className='create' onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><strong>Task Title:</strong></Form.Label>
        <Form.Control type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
        className={emptyFields.includes('title') ? 'error' : ''} />
      </Form.Group>
      <Form.Group>
        <Form.Label><strong>Created By:</strong></Form.Label>
        <Form.Control type='text' placeholder='Created by' onChange={(e) => setCreatedBy(e.target.value)}
        value={createdBy}
        required
        className={emptyFields.includes('title') ? 'error' : ''} />
      </Form.Group>
      <Form.Group>
        <Form.Label><strong>Description:</strong></Form.Label>
        <Form.Control as='textarea' type='text' rows='5' placeholder='Description' onChange={(e) => setDescription(e.target.value)}
        value={description}
        required
        className={emptyFields.includes('title') ? 'error' : ''} />
      </Form.Group>
      <Button className='mt-3 form-button' type='submit'>
        Edit task
      </Button>
      {error && <div className='error'>{error}</div>}
    </Form>
  )
}

export default EditTaskForm
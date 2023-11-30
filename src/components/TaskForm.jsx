import 'dotenv/config'
import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { Form, Button } from 'react-bootstrap'

const TaskForm = () => {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [createdBy, setCreatedBy] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const backURL = process.env.BACKURL

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const task = {title, createdBy, description}

    const response = await fetch(backURL+'/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    
    if (response.ok) {
      setTitle('')
      setCreatedBy('')
      setDescription('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_TASK', payload: json})
    }
  }

  return (
    <Form className='create' onSubmit={handleSubmit}>
      <h3>Add new Task</h3>
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
        Add task
      </Button>
      {error && <div className='error'>{error}</div>}
    </Form>
  )
}

export default TaskForm
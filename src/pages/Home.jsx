import { useEffect }from 'react'
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import TaskDetails from '../components/TaskDetails'
import TaskForm from '../components/TaskForm'

const Home = () => {
  const {tasks, dispatch} = useTasksContext()
  const {user} = useAuthContext()

  const backURL= 'https://mern-app-back-production.up.railway.app/'

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(backURL+'/api/tasks', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TASKS', payload: json})
      }
    }

    if (user) {
      fetchTasks()
    }
  }, [dispatch, user])

  return (
     
    <div className='row'>
      <div className='col md-8'>
      <div className="tasks">
        {tasks && tasks.map((task) => (
          <TaskDetails key={task._id} task={task} />
        ))}
      </div>
      </div>
      <div className='col-md-4'>
      <TaskForm />
    </div>
    </div>
   
  )
}

export default Home
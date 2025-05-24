import { useState } from 'react'
import { update as updateGoal, deleteGoal } from '../../services/goalService'

const GoalItem = ({ goal, onDeleted, onUpdated }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(goal.title)

    const save = async () => {
        await updateGoal({ title }, goal._id)
        setIsEditing(false)
        onUpdated()
    }

    return (
        <li>
            {isEditing
                ? <>
                    <input value={title} onChange={e => setTitle(e.target.value)} />
                    <button onClick={save}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
                : <>
                    {goal.title}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={async () => { await deleteGoal(goal._id); onDeleted() }}>Delete</button>
                </>}
        </li>
    )
}

export default GoalItem
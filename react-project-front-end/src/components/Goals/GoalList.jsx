import { useState, useEffect } from 'react'
import GoalItem from './GoalItem'
import GoalForm from './GoalForm'
import { index as fetchGoals } from '../../services/goalService'

const GoalList = ({ kidId }) => {
    const [goals, setGoals] = useState([])
    const [showForm, setShowForm] = useState(false)

    const load = () => fetchGoals().then(all => setGoals(all.filter(g => g.kid === kidId)))
    useEffect(load, [kidId])

    return (
        <div>
            <h3>Goals</h3>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add'}
            </button>
            {showForm && <GoalForm kidId={kidId} onComplete={() => { setShowForm(false); load() }} />}
            <ul>
                {goals.map(g => (
                    <GoalItem key={g._id} goal={g} onDeleted={load} />
                ))}
            </ul>
        </div>
    )
}

export default GoalList
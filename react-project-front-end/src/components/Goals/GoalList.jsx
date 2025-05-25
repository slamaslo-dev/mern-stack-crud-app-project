import { useState, useEffect } from 'react'
import GoalItem from './GoalItem'
import GoalForm from './GoalForm'
import { index as fetchGoals } from '../../services/goalService'

const GoalList = ({ kidId }) => {
    const [goals, setGoals] = useState([])
    const [showForm, setShowForm] = useState(false)

    const load = async () => {
        try {
            const response = await fetchGoals(kidId);
            if (response.err) {
                console.error('Error loading goals:', response.err);
                return;
            }
            setGoals(response.data || response);
        } catch (err) {
            console.error('Error loading goals:', err);
        }
    }

    useEffect(() => {
        if (kidId) {
            load();
        }
    }, [kidId])

    return (
        <div>
            <h3>Goals</h3>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add'}
            </button>
            {showForm && <GoalForm kidId={kidId} onComplete={() => { setShowForm(false); load() }} />}
            <ul>
                {goals.map(g => (
                    <GoalItem key={g._id} goal={g} onDeleted={load} onUpdated={load} />
                ))}
            </ul>
        </div>
    )
}

export default GoalList
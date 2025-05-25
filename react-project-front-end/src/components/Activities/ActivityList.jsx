import { useState, useEffect } from 'react'
import ActivityItem from './ActivityItem'
import ActivityForm from './ActivityForm'
import { index as fetchActs } from '../../services/activityService'

const ActivityList = ({ kidId }) => {
    const [acts, setActs] = useState([])
    const [showForm, setShowForm] = useState(false)

    const load = () => fetchActs().then(all => setActs(all.filter(a => a.kid === kidId)))
    useEffect(load, [kidId])

    return (
        <div>
            <h3>Activities</h3>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add'}
            </button>
            {showForm && <ActivityForm kidId={kidId} onComplete={() => { setShowForm(false); load() }} />}
            <ul>
                {acts.map(a => (
                    <ActivityItem key={a._id} activity={a} onDeleted={load} />
                ))}
            </ul>
        </div>
    )
}

export default ActivityList
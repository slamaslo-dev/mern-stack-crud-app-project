import { useState } from 'react'
import { update as updateAct, deleteActivity } from '../../services/activityService'

const ActivityItem = ({ activity, onDeleted }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({ name: activity.name, schedule: activity.schedule })

    const save = async () => {
        await updateAct(formData, activity._id)
        setIsEditing(false)
        onDeleted()
    }

    return (
        <li>
            {isEditing ? (
                <>
                    <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    <input value={formData.schedule} onChange={e => setFormData({ ...formData, schedule: e.target.value })} />
                    <button onClick={save}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    {activity.name} ({activity.schedule})
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={async () => { await deleteActivity(activity._id); onDeleted() }}>Delete</button>
                </>
            )}
        </li>
    )
}

export default ActivityItem
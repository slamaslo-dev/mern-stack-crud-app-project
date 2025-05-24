import { useState } from 'react'
import { create as createAct } from '../../services/activityService'

const ActivityForm = ({ kidId, onComplete }) => {
    const [formData, setFormData] = useState({ name: '', schedule: '' })
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const handleSubmit = async e => {
        e.preventDefault()
        await createAct({ ...formData, kid: kidId })
        onComplete()
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Activity name" />
            <input name="schedule" value={formData.schedule} onChange={handleChange} placeholder="e.g., Mon/Wed/Fri" />
            <button type="submit">Save</button>
        </form>
    )
}

export default ActivityForm
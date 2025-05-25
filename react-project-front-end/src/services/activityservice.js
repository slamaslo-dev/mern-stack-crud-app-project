const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/activities`

const index = async (goalId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/goal/${goalId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
        return { err: err.message };
    }
}

const create = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        return res.json();
    } catch (err) {
        console.log(err);
        return { err: err.message };
    }
}

const update = async (formData, activityId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${activityId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        return res.json();
    } catch (err) {
        console.log(err);
        return { err: err.message };
    }
}

const markComplete = async (activityId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${activityId}/complete`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
        return { err: err.message };
    }
}

const deleteActivity = async (activityId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${activityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
        return { err: err.message };
    }
}

export {
    index,
    create,
    update,
    markComplete,
    deleteActivity
}
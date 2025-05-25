const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/goals`

const index = async (kidId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/kid/${kidId}`, {
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

// Get single goal
const show = async (goalId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${goalId}`, {
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

const update = async (formData, goalId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${goalId}`, {
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

const deleteGoal = async (goalId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${goalId}`, {
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
    show,
    create,
    update,
    deleteGoal
}
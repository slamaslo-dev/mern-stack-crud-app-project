
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/kids`

const index = async () => {
    try {
        const res = await fetch(BASE_URL)
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (formData, kidId) => {
    try {
        const res = await fetch(`${BASE_URL}/${kidId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

const deleteKid = async (kidId) => {
    try {
        const res = await fetch(`${BASE_URL}/${kidId}`, {
            method: 'DELETE',
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

export {
    index,
    create,
    update,
    deleteKid
}

import './App.css'
import { useState, useEffect } from 'react'
import * as kidService from './services/kidService'
import NavBar from './components/NavBar/NavBar'
import KidList from './components/KidList/KidList'
import KidForm from './components/KidList/KidForm'
import KidDetail from './components/KidDetail/KidDetail'

function App() {
  const [kids, setKids] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    const fetchKids = async () => {
      try {
        const fetched = await kidService.index()
        if (fetched.err) throw new Error(fetched.err)
        setKids(fetched)
      } catch (err) {
        console.log(err)
      }
    }
    fetchKids()
  }, [])

  const handleSelect = (kid) => {
    setSelected(kid)
    setIsFormOpen(false)
  }

  const handleFormView = (kid) => {
    // if no kid passed in, clear selection
    if (!kid?._id) setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  const handleAddKid = async (formData) => {
    try {
      const newKid = await kidService.create(formData)
      if (newKid.err) throw new Error(newKid.err)
      setKids([newKid, ...kids])
      setIsFormOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateKid = async (formData, kidId) => {
    try {
      const updated = await kidService.update(formData, kidId)
      if (updated.err) throw new Error(updated.err)
      setKids(kids.map(k => (k._id !== updated._id ? k : updated)))
      setSelected(updated)
      setIsFormOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteKid = async (kidId) => {
    try {
      const deleted = await kidService.deleteKid(kidId)
      if (deleted.err) throw new Error(deleted.err)
      setKids(kids.filter(k => k._id !== deleted._id))
      setSelected(null)
      setIsFormOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar />
      <KidList
        kids={kids}
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <KidForm
          handleAddKid={handleAddKid}
          selected={selected}
          handleUpdateKid={handleUpdateKid}
        />
      ) : (
        <KidDetail
          selected={selected}
          handleFormView={handleFormView}
          handleDeleteKid={handleDeleteKid}
        />
      )}
    </>
  )
}

export default App
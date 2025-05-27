import "./App.css";
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router";
import * as kidService from "./services/kidService";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import KidList from "./components/KidList/KidList";
import KidForm from "./components/KidList/KidForm";
import KidDetail from "./components/KidDetail/KidDetail";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);
  const [kids, setKids] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchKids = async () => {
      try {
        const fetched = await kidService.index();
        if (fetched.err) throw new Error(fetched.err);
        setKids(fetched);
      } catch (err) {
        console.log(err);
      }
    };
    fetchKids();
  }, [user]);

  const handleSelect = (kid) => {
    setSelected(kid);
    setIsFormOpen(false);
  };

  const handleFormView = (kid) => {
    if (!kid?._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddKid = async (formData) => {
    try {
      const newKid = await kidService.create(formData);

      if (newKid.err) throw new Error(newKid.err);

      setKids([newKid, ...kids]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateKid = async (formData, kidId) => {
    try {
      const updatedKid = await kidService.update(formData, kidId);
      if (updatedKid.err) throw new Error(updatedKid.err);
      setKids(kids.map((k) => (k._id !== updatedKid._id ? k : updatedKid)));
      setSelected(updatedKid);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteKid = async (kidId) => {
    try {
      const deletedKid = await kidService.deleteKid(kidId);
      if (deletedKid.err) throw new Error(deletedKid.err);
      setKids(kids.filter((k) => k._id !== deletedKid._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="main">


        <Routes>
          <Route
            path="/"
            element={
              user
                ? (

                  <div className="dashboard">
                    <KidList
                      kids={kids}
                      handleSelect={handleSelect}
                      handleFormView={handleFormView}
                      isFormOpen={isFormOpen}
                    />
                    {isFormOpen
                      ? <KidForm
                        className="kid-form"
                        handleAddKid={handleAddKid}
                        selected={selected}
                        handleUpdateKid={handleUpdateKid}
                        handleFormView={handleFormView}
                      />
                      : <KidDetail
                        selected={selected}
                        handleFormView={handleFormView}
                        handleDeleteKid={handleDeleteKid}
                      />}
                  </div>
                )
                : <div>Please sign in to manage kids.</div>
            }
          />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Routes>
      </div>
    </>
  )

}

export default App;

import { useState, useEffect } from "react";
import GoalItem from "./GoalItem.jsx";
import GoalForm from "./GoalForm.jsx";
import { index as fetchGoals } from "../../services/goalService.js";

const GoalList = ({ kidId }) => {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!kidId) return;

    setLoading(true);
    try {
      const response = await fetchGoals(kidId);
      if (response.err) {
        console.error("Error loading goals:", response.err);
        return;
      }
      setGoals(response.data || response);
    } catch (err) {
      console.error("Error loading goals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [kidId]);

  const handleFormComplete = () => {
    setShowForm(false);
    load();
  };

  if (loading) return <div>Loading goals...</div>;

  return (
     <div className="section">
      <h3>Goals</h3>
      <button className="btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Goal"}
      </button>

      {showForm && <GoalForm kidId={kidId} onComplete={handleFormComplete} />}

      {goals.length === 0 ? (
        <p>No goals yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {goals.map((g) => (
            <GoalItem
              key={g._id}
              goal={g}
              kidId={kidId}
              onDeleted={load}
              onUpdated={load}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoalList;

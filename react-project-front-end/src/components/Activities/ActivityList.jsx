import { useState, useEffect } from "react";
import ActivityItem from "./ActivityItem";
import ActivityForm from "./ActivityForm";
import { index as fetchActivities } from "../../services/activityService";

const ActivityList = ({ goalId, kidId }) => {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadActivities = async () => {
    if (!goalId) return;

    setLoading(true);
    try {
      const response = await fetchActivities(goalId);
      if (response.err) {
        console.error("Error loading activities:", response.err);
        return;
      }
      setActivities(response.data || response);
    } catch (err) {
      console.error("Error loading activities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [goalId]);

  const handleFormComplete = () => {
    setShowForm(false);
    loadActivities();
  };

  if (loading) return <div>Loading activities...</div>;

  return (
     <div className="section">
      <h4>Activities</h4>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Activity"}
      </button>

      {showForm && (
        <ActivityForm
          kidId={kidId}
          goalId={goalId}
          onComplete={handleFormComplete}
        />
      )}

      {activities.length === 0 ? (
        <p>No activities yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {activities.map((activity) => (
            <ActivityItem
              key={activity._id}
              activity={activity}
              onDeleted={loadActivities}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityList;

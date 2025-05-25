import { useState } from "react";
import {
  update as updateActivity,
  deleteActivity,
  markComplete,
  markIncomplete,
} from "../../services/activityService";

const ActivityItem = ({ activity, onDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: activity.title,
    description: activity.description,
  });

  const save = async () => {
    try {
      await updateActivity(formData, activity._id);
      setIsEditing(false);
      onDeleted(); // Refresh the list
    } catch (err) {
      console.error("Error updating activity:", err);
    }
  };

  const handleToggleComplete = async () => {
    try {
      if (activity.isCompleted) {
        await markIncomplete(activity._id);
      } else {
        await markComplete(activity._id);
      }
      onDeleted();
    } catch (err) {
      console.error("Error toggling completion status:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteActivity(activity._id);
      onDeleted();
    } catch (err) {
      console.error("Error deleting activity:", err);
    }
  };

  return (
    <li
      style={{
        padding: "0.5rem",
        border: "1px solid #ccc",
        margin: "0.5rem 0",
        backgroundColor: activity.isCompleted ? "#d4edda" : "white",
      }}
    >
      {isEditing ? (
        <>
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title"
          />
          <input
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description"
          />
          <button onClick={save}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div>
            <strong>{activity.title}</strong>
            {activity.description && <p>{activity.description}</p>}
            {activity.isCompleted && (
              <span style={{ color: "green" }}> ✓ Completed</span>
            )}
          </div>
          <div>
            <button onClick={handleToggleComplete}>
              {activity.isCompleted ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default ActivityItem;

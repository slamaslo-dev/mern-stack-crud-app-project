import { useState } from "react";
import { update as updateGoal, deleteGoal } from "../../services/goalService";
import ActivityList from "../Activities/ActivityList";

const GoalItem = ({ goal, kidId, onDeleted, onUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: goal.title,
    description: goal.description || "",
  });

  const save = async () => {
    try {
      await updateGoal(formData, goal._id);
      setIsEditing(false);
      onUpdated();
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure? This will delete all activities for this goal."
      )
    ) {
      try {
        await deleteGoal(goal._id);
        onDeleted();
      } catch (err) {
        console.error("Error deleting goal:", err);
      }
    }
  };

  return (
    <li
      style={{
        border: "1px solid #ddd",
        margin: "0.5rem 0",
        padding: "1rem",
        borderRadius: "4px",
      }}
    >
      {isEditing ? (
        <>
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Goal title"
          />
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Goal description"
            rows="3"
            style={{ width: "100%", margin: "0.5rem 0" }}
          />
          <div>
            <button onClick={save}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h4 style={{ margin: 0 }}>{goal.title}</h4>
              {goal.description && (
                <p style={{ margin: "0.5rem 0", color: "#666" }}>
                  {goal.description}
                </p>
              )}
            </div>
            <div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ marginRight: "0.5rem" }}
              >
                {isExpanded ? "Hide" : "Show"} Activities
              </button>
              <button
                onClick={() => setIsEditing(true)}
                style={{ marginRight: "0.5rem" }}
              >
                Edit
              </button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>

          {isExpanded && (
            <div
              style={{
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: "1px solid #eee",
              }}
            >
              <ActivityList goalId={goal._id} kidId={kidId} />
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default GoalItem;

import { useState } from "react";
import { create as createActivity } from "../../services/activityService";

const ActivityForm = ({ kidId, goalId, onComplete }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createActivity({
        ...formData,
        kid: kidId,
        goal: goalId,
      });
      onComplete();
    } catch (err) {
      console.error("Error creating activity:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Activity title"
        required
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Activity description"
      />
      <button className="btn" type="submit">Save</button>
    </form>
  );
};

export default ActivityForm;

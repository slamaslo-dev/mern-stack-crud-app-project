import { useState } from "react";
import { create as createGoal } from "../../services/goalService";

const GoalForm = ({ kidId, onComplete }) => {
  const [formData, setFormData] = useState({ title: "" });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGoal({ ...formData, kid: kidId });
    onComplete();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Goal title"
      />
      <button className="btn" type="submit">Save</button>
    </form>
  );
};

export default GoalForm;

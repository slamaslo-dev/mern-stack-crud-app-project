import { useState, useEffect } from "react";

const KidForm = ({
  selected,
  handleAddKid,
  handleUpdateKid,
  handleFormView,
}) => {
  const initial = { name: "", birthDate: "" };
  const [formData, setFormData] = useState(initial);

  useEffect(() => {
    if (selected) {
      setFormData({
        name: selected.name,
        // Convert Date to YYYY-MM-DD format for date input
        birthDate: selected.birthDate
          ? new Date(selected.birthDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormData(initial);
    }
  }, [selected]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected?._id) {
        await handleUpdateKid(formData, selected._id);
      } else {
        await handleAddKid(formData);
        handleFormView(null);
      }
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selected?._id ? "Edit Kid" : "New Kid"}</h2>
      <label>
        Name:
        <input name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Birth Date:
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </label>
      <button className="btn" type="submit">
        {selected?._id ? "Save Changes" : "Add Kid"}
      </button>
      <button
        className="btn"
        type="button"
        onClick={() => handleFormView(null)}
      >
        Cancel
      </button>
    </form>
  );
};

export default KidForm;

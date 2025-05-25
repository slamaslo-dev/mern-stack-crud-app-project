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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected?._id) {
      handleUpdateKid(formData, selected._id);
    } else {
      handleAddKid(formData);
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
      <button type="submit">
        {selected?._id ? "Save Changes" : "Add Kid"}
      </button>
      <button type="button" onClick={() => handleFormView(null)}>
        Cancel
      </button>
    </form>
  );
};

export default KidForm;

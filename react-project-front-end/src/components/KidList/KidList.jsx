const KidList = ({ kids, handleSelect, handleFormView, isFormOpen }) => (
  <section className="kid-list">
    <h2>Kids</h2>
    <button className="btn" onClick={() => handleFormView(null)}>+ New Kid</button>
    <ul>
      {kids.map((k) => (
        <li key={k._id}>
          <span
            onClick={() => handleSelect(k)}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {k.name}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default KidList;

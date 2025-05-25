const KidList = ({ kids, handleSelect, handleFormView, isFormOpen }) => (
  <section>
    <h2>Kids</h2>
    <button onClick={() => handleFormView(null)}>+ New Kid</button>
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

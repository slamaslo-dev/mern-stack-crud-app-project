import GoalList from "../Goals/GoalList";

const KidDetail = ({ selected, handleFormView, handleDeleteKid }) => {
  if (!selected) {
    return <p>Please select a kid (or add a new one).</p>;
  }

  return (
    <div className="kid-card">
      <header>
        <h2>{selected.name}'s Dashboard</h2>
        <div>
          <button
            className="btn"
            onClick={() => handleFormView(selected)}
          >
            Edit Kid
          </button>
          <button
            className="btn"
            onClick={() => handleDeleteKid(selected._id)}
          >
            Delete Kid
          </button>
        </div>
      </header>

      <div className="basic-info">
        <h3>Basic Info</h3>
        <p>
          Birth Date:{' '}
          {new Date(selected.birthDate).toLocaleDateString()}
        </p>
      </div>

      <div className="sections">
        <div className="section">
          <GoalList kidId={selected._id} />
        </div>
        
      </div>
    </div>
  );
};

export default KidDetail;

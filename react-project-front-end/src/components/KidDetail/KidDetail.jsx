import GoalList from "../Goals/GoalList";

const KidDetail = ({ selected, handleFormView, handleDeleteKid }) => {
  if (!selected) {
    return <p>Please select a kid (or add a new one).</p>;
  }

  const formatDate = (dateString) => {
    const datePart = new Date(dateString).toISOString().split('T')[0];
    return datePart;
  };

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
          {formatDate(selected.birthDate)}
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

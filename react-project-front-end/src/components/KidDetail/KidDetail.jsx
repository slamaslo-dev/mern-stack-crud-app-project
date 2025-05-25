
import GoalList from '../Goals/GoalList'
import ActivityList from '../Activities/ActivityList'

const KidDetail = ({
    selected,
    handleFormView,
    handleDeleteKid
}) => {
    if (!selected) {
        return <p>Please select a kid (or add a new one).</p>
    }

    return (
        <section>
            <h2>{selected.name}'s Dashboard</h2>
            <button onClick={() => handleFormView(selected)}>
                Edit Kid
            </button>
            <button onClick={() => handleDeleteKid(selected._id)}>
                Delete Kid
            </button>

            <div>
                <h3>Basic Info</h3>
                <p>
                    Birth Date:{' '}
                    {new Date(selected.birthDate).toLocaleDateString()}
                </p>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <GoalList kidId={selected._id} />
                <ActivityList kidId={selected._id} />
            </div>
        </section>
    )
}

export default KidDetail

import { useState } from "react";
import { Task, useTask } from "../../../context/Task.context";
import UpdateTaskModal from "./UpdateTaskModal"; // Import the modal

const AllTask = () => {
  const { tasks, deleteTaskById, editTaskById, updateTaskById } = useTask();
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [currentTask, setCurrentTask] = useState<Task | null>(null); // To store the task being updated

  const handleUpdateClick = (task: Task) => {
    setCurrentTask(task); // Set the current task to be updated
    setShowModal(true); // Open the modal
  };

  return (
    <>
      <div className="mb-3">
        <h1>All Task ({tasks.length})</h1>
      </div>
      <div className="flex-wrap d-flex justify-content-center align-items-center">
        {tasks && tasks.length > 0 ? (
          tasks.map((cur: Task, i) => {
            return (
              <div
                key={i}
                className="card border py-4 px-4 mx-2 my-2 col-sm-12 col-md-6 col-lg-3 "
              >
                <h2
                  className={`card-heading ${
                    cur.isComplete ? "text-decoration-line-through " : ""
                  } `}
                >
                  {cur.title}
                </h2>
                <p className="card-body ">{cur.description}</p>
                <div className="d-flex">
                  <button
                    onClick={() => deleteTaskById(cur._id)}
                    title="delete"
                    className="btn btn-outline-danger rounded-pill "
                  >
                    Delete
                  </button>
                  {!cur.isComplete && (
                    <button
                      onClick={() => handleUpdateClick(cur)} // Open modal for update
                      title="update"
                      className="btn btn-outline-success rounded-pill "
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-center text-decoration-underline">
            No Task Available
          </h1>
        )}
      </div>

      {showModal && (
        <UpdateTaskModal
          task={currentTask!} // Pass the task to the modal
          closeModal={() => setShowModal(false)} // Function to close modal
        />
      )}
    </>
  );
};

export default AllTask;

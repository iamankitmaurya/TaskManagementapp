import { useEffect, useState } from "react";
import { Task, useTask } from "../../../context/Task.context";

interface UpdateTaskModalProps {
  task: Task;
  closeModal: () => void;
}

const UpdateTaskModal = ({ task, closeModal }: UpdateTaskModalProps) => {
  const { updateTaskById } = useTask();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setTitle(task.title); // Pre-fill the current task's details
    setDescription(task.description);
  }, [task]);

  const handleUpdate = async () => {
    try {
      await updateTaskById(task._id, { title, description }); // Call the context function to update the task
      closeModal(); // Close the modal after successful update
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ display: "block" }}
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <label htmlFor="taskTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="taskTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="taskDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="taskDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;

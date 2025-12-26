import { useEffect, useState } from "react";
import api from "../api/axios";
import "../Styles/dashboard.css";
 

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/todos");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!taskInput.trim() || !statusInput.trim()) return;

    try {
      if (editingTaskId) {
        await api.put(
          `/todos/${editingTaskId}`,
          {
            task: taskInput,
            status: statusInput
          }
        );
        setEditingTaskId(null);
      } else {
        await api.post("/todos", {
          task: taskInput,
          status: statusInput
        });
      }

      setTaskInput("");
      setStatusInput("");
      fetchTasks();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleEdit = (task) => {
    setTaskInput(task.task);
    setStatusInput(task.status);
    setEditingTaskId(task._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>📌 TaskBoard</h2>
        <ul>
          <li> Dashboard</li>
          <li> Logout</li>
        </ul>
      </aside>

      <main className="main">
        <h1 className="greeting">👋 Welcome back!</h1>
        <p className="subtitle">Your sticky wall of tasks</p>

        <div className="task-input">
          <input
            type="text"
            placeholder="Task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />

          <input
            type="text"
            placeholder="Status (pending/completed/in progress)"
            value={statusInput}
            onChange={(e) => setStatusInput(e.target.value)}
          />

          <button onClick={handleAddOrUpdate}>
            {editingTaskId ? "Update" : "Add"}
          </button>
        </div>

        <div className="task-wall">
          {tasks.map((task, index) => (
            <div
              key={task.task_id}
              className={`task-card color-${index % 5}`}
            >
              <p><b>Task:</b> {task.task}</p>
              <p><b>Status:</b> {task.status}</p>

              <div className="task-actions">
                <button onClick={() => handleEdit(task)}>✏️</button>
                <button onClick={() => handleDelete(task._id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

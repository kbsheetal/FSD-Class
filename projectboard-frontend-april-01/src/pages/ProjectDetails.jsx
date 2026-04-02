import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
} from "../features/task/taskSlice";

function ProjectDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchTasks(id));
  }, []);

  const handleCreate = async () => {
    await dispatch(
      createTask({
        ...form,
        project: id,
      })
    );

    dispatch(fetchTasks(id)); // refresh
    setForm({ title: "", description: "" });
  };

  return (
    <div>
      <h2>Project Tasks</h2>

      {/* CREATE TASK */}
      <div>
        <h3>Create Task</h3>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button onClick={handleCreate}>Create Task</button>
      </div>

      <hr />

      {/* TASK LIST */}
      {tasks.map((t) => (
        <div key={t._id}>
          <strong>{t.title}</strong> - {t.status}
        </div>
      ))}
    </div>
  );
}

export default ProjectDetails;
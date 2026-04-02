import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  createProject,
} from "../features/project/projectSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

    useEffect(() => {
        const token = localStorage.getItem("token");

    if (!token) {
        navigate("/");
    } else {
        dispatch(fetchProjects());
    }
    }, []);

  const handleCreate = async () => {
    await dispatch(createProject(form));
    dispatch(fetchProjects()); // refresh list

    setForm({ name: "", description: "" });
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* CREATE PROJECT */}
      <div>
        <h3>Create Project</h3>

        <input
          placeholder="Project Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button onClick={handleCreate}>Create Project</button>
      </div>

      <hr />

      {/* PROJECT LIST */}
      <h3>Your Projects</h3>

      {projects.map((p) => (
        <div
          key={p._id}
          onClick={() => navigate(`/project/${p._id}`)}
          style={{ cursor: "pointer", margin: "10px 0" }}
        >
          {p.name}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
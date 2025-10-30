import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import Navbar from "../components/Navbar";
import { api } from "../config";
import HashLoader from "react-spinners/HashLoader";
import { CSSProperties } from "react";

export default function Admin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phoneno: "",
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const override: CSSProperties = {
    display: "block",
    borderColor: "#fdf004",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchItems();
  }, [navigate]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${api}/item`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      enqueueSnackbar("Error fetching items", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item._id);
    setEditForm({
      name: item.name,
      email: item.email,
      phoneno: item.phoneno,
      title: item.title,
      description: item.description,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.keys(editForm).forEach((key) => {
        formData.append(key, editForm[key]);
      });

      await axios.put(`${api}/item/${editingItem}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      enqueueSnackbar("Item updated successfully", { variant: "success" });
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
      enqueueSnackbar("Error updating item", { variant: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${api}/item/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      enqueueSnackbar("Item deleted successfully", { variant: "success" });
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      enqueueSnackbar("Error deleting item", { variant: "error" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <main id="adminPage">
      <Navbar />
      <section>
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {loading ? (
          <HashLoader
            color="#fdf004"
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div className="admin-items">
            {items.map((item) => (
              <div key={item._id} className="admin-item-card">
                {editingItem === item._id ? (
                  <form onSubmit={handleUpdate} className="edit-form">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      placeholder="Name"
                      required
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      placeholder="Email"
                      required
                    />
                    <input
                      type="tel"
                      value={editForm.phoneno}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phoneno: e.target.value })
                      }
                      placeholder="Phone"
                      required
                    />
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      placeholder="Title"
                      required
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({ ...editForm, description: e.target.value })
                      }
                      placeholder="Description"
                      required
                    />
                    <div className="edit-actions">
                      <button type="submit" className="save-btn">
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3>{item.title}</h3>
                    <p>Founder: {item.name}</p>
                    <p>Email: {item.email}</p>
                    <p>Phone: {item.phoneno}</p>
                    <p>{item.description}</p>
                    <div className="admin-actions">
                      <button
                        onClick={() => handleEdit(item)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

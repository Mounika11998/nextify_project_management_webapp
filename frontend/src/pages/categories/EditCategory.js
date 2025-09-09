import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../../services/api";
import { toast } from "react-toastify";
import "./EditCategory.css";

function EditCategory({ onCreate, onUpdate }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === "new" || !id;
  const [form, setForm] = useState({ name: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      apiGet(`/api/categories/${id}`)
        .then((res) => {
          const c = res?.data;
          if (c) {
            setForm({ name: c.name || "" });
            toast.success("Loaded category");
          }
        })
        .catch((err) => {
          setError(err.message || "Failed to load category");
          toast.error(err.message || "Failed to load category");
        });
    }
  }, [isNew, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isNew) {
        await (onCreate ? onCreate(form) : apiPost("/api/categories", form));
        toast.success("Category created");
      } else {
        await (onUpdate ? onUpdate(id, form) : apiPut(`/api/categories/${id}`, form));
        toast.success("Category updated");
      }
      navigate("/categories");
    } catch (err) {
      setError(err.message || "Save failed");
      toast.error(err.message || "Save failed");
    }
  };

  return (
    <div className="edit-category-container">
      <h2 className="form-title">{isNew ? "Add Category" : "Edit Category"}</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="name">Category Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/categories")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCategory;

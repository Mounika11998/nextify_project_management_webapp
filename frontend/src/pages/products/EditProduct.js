import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../../services/api";
import { toast } from "react-toastify";
import "./EditProduct.css";

function EditProduct({ categories = [], products = [], onCreate, onUpdate }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === "new" || !id;
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [error, setError] = useState("");
  const categoryOptions = categories.length
    ? categories.map((c) => c.name)
    : ["Mobile", "Laptop", "TV", "Book"];

  useEffect(() => {
    if (!isNew) {
      apiGet(`/api/products/${id}`)
        .then((res) => {
          const p = res?.data;
          if (p) {
            setForm({
              name: p.name || "",
              price: p.price ?? "",
              description: p.description || "",
              category: p.category || "",
            });
            toast.success("Loaded product");
          }
        })
        .catch((err) => {
          setError(err.message || "Failed to load product");
          toast.error(err.message || "Failed to load product");
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
        await (onCreate ? onCreate(form) : apiPost("/api/products", form));
        toast.success("Product created");
      } else {
        await (onUpdate ? onUpdate(id, form) : apiPut(`/api/products/${id}`, form));
        toast.success("Product updated");
      }
      navigate("/products");
    } catch (err) {
      setError(err.message || "Save failed");
      toast.error(err.message || "Save failed");
    }
  };

  return (
    <div className="edit-product-container">
      <h2 className="form-title">{isNew ? "Add Product" : "Edit Product"}</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;

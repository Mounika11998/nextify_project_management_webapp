import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./ListCategories.css";

function ListCategories({ categories = [], onDeleteCategory }) {
  const handleDelete = async (id) => {
    try {
      await onDeleteCategory(id);
      toast.success("Category deleted");
    } catch (err) {
      toast.error(err?.message || "Failed to delete");
    }
  };

  return (
    <div className="categories-container">
      <div className="toolbar">
        <h2>Categories</h2>
        <Link to="/categories/new" className="btn-primary">
          + Add Category
        </Link>
      </div>

      {!categories.length && (
        <div className="empty-message">No categories yet</div>
      )}

      {categories.length > 0 && (
        <table className="categories-table">
          <thead>
            <tr>
              <th>Name</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  <Link
                    to={`/categories/${c._id}/edit`}
                    className="btn-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListCategories;

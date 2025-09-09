import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./ListProducts.css";

function ListProducts({ products = [], onDeleteProduct, onQueryProducts }) {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const filteredProducts = useMemo(() => {
    if (!products || !products.length) return [];
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter((item) => {
      const name = item.name?.toString().toLowerCase() || "";
      const category = item.category?.toString().toLowerCase() || "";
      const price = item.price?.toString().toLowerCase() || "";
      return (
        name.includes(q) ||
        category.includes(q) ||
        price.includes(q)
      );
    });
  }, [products, search]);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this product?");
      if (!confirmed) return;
      await onDeleteProduct(id);
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err?.message || "Failed to delete");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // Local filtering is handled by useMemo above
  };

  const handleSortChange = async (e) => {
    const selectedOrder = e.target.value;
    setOrder(selectedOrder);
    setSortBy("price"); // always sort by price
    if (onQueryProducts) {
      await onQueryProducts({ search, sortBy: "price", order: selectedOrder });
    }
  };

  return (
    <div className="products-container">
      <div className="toolbar">
        <h2>Products</h2>

        <form onSubmit={handleSearch} className="search-bar">
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn-secondary">Search</button>
        </form>

        <div className="toolbar-actions">
          <select
            value={order}
            onChange={handleSortChange}
            className="sort-dropdown"
          >
            <option value="asc">Sort by Price: Ascending</option>
            <option value="desc">Sort by Price: Descending</option>
          </select>

          <Link to="/products/new" className="btn-primary">
            + Add Product
          </Link>
        </div>
      </div>

      {!filteredProducts.length && (
        <div className="empty-message">No products found</div>
      )}

      {filteredProducts.length > 0 && (
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td>
                  <Link
                    to={`/products/${p._id}/edit`}
                    className="btn-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(p._id)}
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

export default ListProducts;

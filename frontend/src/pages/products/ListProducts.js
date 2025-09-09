import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./ListProducts.css";

function ListProducts({ products = [], onDeleteProduct, onQueryProducts }) {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [showSortMenu, setShowSortMenu] = useState(false);

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

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSortChange = async (selectedOrder) => {
    setOrder(selectedOrder);
    setSortBy("price");
    setShowSortMenu(false); // close menu
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
        </form>

        <div className="toolbar-actions">
          <div className="sort-dropdown-wrapper">
            <button
              type="button"
              className="btn-secondary sort-btn"
              onClick={() => setShowSortMenu((prev) => !prev)}
            >
              Sort by Price ▾
            </button>
            {showSortMenu && (
              <div className="sort-menu">
                <button onClick={() => handleSortChange("asc")}>
                  Ascending
                </button>
                <button onClick={() => handleSortChange("desc")}>
                  Descending
                </button>
              </div>
            )}
          </div>

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
                    state={{ product: p }}
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

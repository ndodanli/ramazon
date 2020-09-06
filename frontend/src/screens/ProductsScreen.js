import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveProduct,
  deleteProduct,
} from "../actions/productActions";
import withAuthentication from "../components/withAuthentication";
const initialState = {};
const productReducer = (state, action) => {
  switch (action.type) {
    case "_id":
      return { ...state, ...action.payload };
    case "name":
      return { ...state, ...action.payload };
    case "price":
      return { ...state, ...action.payload };
    case "image":
      return { ...state, ...action.payload };
    case "brand":
      return { ...state, ...action.payload };
    case "category":
      return { ...state, ...action.payload };
    case "countInStock":
      return { ...state, ...action.payload };
    case "description":
      return { ...state, ...action.payload };
    case "modal":
      return { ...action.payload };
    default:
      return state;
  }
};

function ProductsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [product, productDispatch] = useReducer(productReducer, initialState);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;

  const productSave = useSelector((state) => state.productSave);
  const {
    success: successSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    return () => {};
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    productDispatch({
      type: "modal",
      payload: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
      },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct(product));
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <div>
      <div className="content content-margined">
        <div className="product-header">
          <h3>Products</h3>
          {userInfo.isAdmin && (
            <button className="button" onClick={() => openModal({})}>
              Create Product
            </button>
          )}
        </div>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product.name}
                  onChange={(e) =>
                    productDispatch({
                      type: "name",
                      payload: { name: e.target.value },
                    })
                  }
                />
              </li>
              <li>
                <label htmlFor="text">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={product.price}
                  onChange={(e) =>
                    productDispatch({
                      type: "price",
                      payload: { price: e.target.value },
                    })
                  }
                />
              </li>
              <li>
                <label htmlFor="text">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={product.image}
                  onChange={(e) =>
                    productDispatch({
                      type: "image",
                      payload: { image: e.target.value },
                    })
                  }
                />
              </li>
              <li>
                <label htmlFor="text">Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={product.brand}
                  onChange={(e) =>
                    productDispatch({
                      type: "brand",
                      payload: { brand: e.target.value },
                    })
                  }
                />
              </li>
              <li>
                <label htmlFor="text">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={product.category}
                  onChange={(e) =>
                    productDispatch({
                      type: "category",
                      payload: { category: e.target.value },
                    })
                  }
                />
              </li>
              <li>
                <label htmlFor="text">Count In Stock</label>
                <input
                  type="text"
                  name="countInStock"
                  id="countInStock"
                  value={product.countInStock}
                  onChange={(e) =>
                    productDispatch({
                      type: "countInStock",
                      payload: { countInStock: e.target.value },
                    })
                  }
                />
              </li>
              <li>
                <label htmlFor="text">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={product.description}
                  onChange={(e) =>
                    productDispatch({
                      type: "description",
                      payload: { description: e.target.value },
                    })
                  }
                />
              </li>
              <li>
                <button type="submit" className="button primary">
                  {product._id ? "Update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalVisible(false)}
                  type="button"
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{" "}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withAuthentication(ProductsScreen);

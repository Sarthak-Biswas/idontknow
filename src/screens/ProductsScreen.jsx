import React, { useEffect, useState } from "react";
import Products from "../apis/Products.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";
import Loading from "../components/Loading";
import ADDPRODUCTModal from "../components/ADDPRODUCTModal";

const ProductsScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://58wlnugovh.execute-api.ap-south-1.amazonaws.com/Prod/user/getallProductDetails",
          {},
          { headers: { authToken } }
        );

        setProducts(data);
        setLoading(false);
      } catch (err) {
        message.error("There is some error");
      }
    };
    getAllProducts();
    const getAllCategory = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://chnbq3osxj.execute-api.ap-south-1.amazonaws.com/Prod/user/getCategory",
          {},
          { headers: { authToken } }
        );

        setCategory(data);
      } catch (err) {
        message.error("Server error");
      }
    };
    getAllCategory();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");

      await axios.post(
        "https://2lebf9n7tk.execute-api.ap-south-1.amazonaws.com/Prod/admin/deleteProduct",
        { id },
        { headers: { authToken } }
      );

      window.location.reload();
      message.success("Product deleted successfully");
    } catch (err) {
      message.error("Product not deleted");
    }
  };

  const deletepopup = (id) => {
    const confirmdelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmdelete) {
      deleteProduct(id);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {modalOpen && (
            <ADDPRODUCTModal closeModal={setModalOpen} category={category} />
          )}
          <div className="pageContainer">
            <div className="pageContainerTop">
              <p className="pageHeading">All Products</p>
            </div>
            <div className="line" />
            <table>
              <thead>
                <tr>
                  <td></td>
                  <td>Name</td>
                  <td>Category</td>
                  <td>Price(in Rs)</td>
                  <td>Availability</td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="list">
                    <div className="imagesize">
                      {" "}
                      <td>
                        <img
                          style={{
                            width: "100px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                          src={product.primary_image}
                          alt=""
                        />
                      </td>
                    </div>
                    <td>{product.name}</td>
                    <td>{product.category_name}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.availability ? "In Stock" : "Out of Stock"}
                    </td>
                    <td>
                      <button
                        className="btn__type1"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        View / Edit
                      </button>
                    </td>

                    <td>
                      <button
                        className="btn__type1"
                        onClick={() => deletepopup(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div id="screen__bottom">
              <button className="btn__type2" onClick={() => setModalOpen(true)}>
                Add Product
              </button>
              <div className="bottom__left"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductsScreen;

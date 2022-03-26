import React, { useEffect, useState } from "react";
import Products from "../apis/Products.json";
import { useParams } from "react-router-dom";
import "./ProductScreen.css";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";
import Loading from "../components/Loading";
import EDITPRODUCTModal from "../components/EDITPRODUCTModal";

const ProductScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://5n9i6r7gml.execute-api.ap-south-1.amazonaws.com/Prod/user/getProductDetails",
          { id },
          { headers: { authToken } }
        );
        setProduct(data);
        setLoading(false);
      } catch (err) {
        message.error("There is some error");
      }
    };
    getProduct();

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
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {modalOpen && (
            <EDITPRODUCTModal
              closeModal={setModalOpen}
              category={category}
              product={product}
            />
          )}
          <div className="pageContainer">
            <div className="pageContainerTop">
              <p className="pageHeading">{product.name}</p>

              <button className="btn_type3" onClick={() => setModalOpen(true)}>
                <img src="/images/editIcon.svg" alt="" />
                Edit
              </button>
            </div>
            <div className="line" />

            <div className="scroll__container">
              <div
                id="photoContainer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={product.primary_image}
                  alt=""
                  style={{ width: "400px", height: "auto", marginLeft: "30px" }}
                />
              </div>

              <div className="editForm">
                <div className="editField">
                  <p>Name</p>

                  <div>{product.name}</div>
                </div>
                <div className="editField">
                  <p>Price</p>

                  <div>{product.price}</div>
                </div>
                <div className="editField">
                  <p> MRP</p>

                  <div>{product.MRP}</div>
                </div>
                <div className="editField">
                  <p>Category</p>

                  <div>{product.category_name}</div>
                </div>
                <div className="editField">
                  <p>Description</p>

                  <div>{product.description}</div>
                </div>

                <div className="editField">
                  <p>Stock</p>

                  <div>{product.stock}</div>
                </div>

                <div className="editField">
                  <p>Likes</p>

                  <div>{product.likes}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;

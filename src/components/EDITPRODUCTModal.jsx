import React, { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const EDITPRODUCTModal = ({ closeModal, category, product }) => {
  console.log(product);
  const navigate = useNavigate();
  const [name, setName] = useState(product.name);

  const [category_name, setCategory_Name] = useState(product.category_name);
  const [price, setPrice] = useState(product.price);
  const [MRP, setMRP] = useState(product.MRP);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.primary_image);

  const [stock, setStock] = useState(product.stock);
  const [loading, setLoading] = useState(true);

  let image64;

  const base64 = async (e) => {
    try {
      const file = e.target.files[0];
      image64 = await convertimage(file);

      message.success("Image chosen Successfully");
    } catch (err) {
      message.error("Please choose again");
    }
  };

  const convertimage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadimage = async (e) => {
    if (!image64) {
      return message.error("Please upload an image");
    }
    try {
      e.preventDefault();
      const baseindex = image64.indexOf("base64,");

      const type = image64.slice(11, baseindex - 1);
      const Content = "image/" + image64.slice(11, baseindex - 1);

      const authToken = localStorage.getItem("authToken");
      const img = image64.slice(baseindex + 7);

      const { data } = await axios.post(
        "https://woslo04mf4.execute-api.ap-south-1.amazonaws.com/Prod/admin/uploadFiles",
        { img, type, Content },
        {
          headers: {
            authToken,
            "Content-Type": "application/json",
          },
        }
      );

      setImage(data.url);
      message.success("Image replaced Successfully");
    } catch (err) {
      console.log(err);
      message.error("Error replacing image");
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      category_name,
      price,
      description,
      primary_image: image,
      stock,
      product_id: product.id,
      MRP,
    };

    try {
      const authToken = localStorage.getItem("authToken");

      const { data } = await axios.post(
        "https://a1lkyfegcf.execute-api.ap-south-1.amazonaws.com/Prod/admin/editProduct",
        newProduct,
        { headers: { authToken } }
      );

      message.success("Product edited Successfully");
    } catch (err) {
      message.error("Product not added");
    }
    closeModal(false);

    window.location.reload();
  };

  return (
    <>
      {!loading ? (
        <Loading />
      ) : (
        <>
          <div className="modal">
            <div className="modal__container">
              <div className="modalTitle">
                <h2>EDIT PRODUCT</h2>
                <CancelIcon onClick={() => closeModal(false)} />
              </div>
              <div className="editForm" style={{ width: "100%" }}>
                <div className="scroll__container" style={{ height: "100%" }}>
                  <div className="editField">
                    <p>Name</p>
                    <input
                      autoComplete="new-password"
                      type="text"
                      placeholder="product name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>

                  <div className="editField">
                    <p>Category</p>
                    <select
                      name="cat"
                      className="dropdown"
                      onChange={(e) => setCategory_Name(e.target.value)}
                      defaultValue={category_name}
                    >
                      <option value="none">None</option>
                      {category.map((cat) => (
                        <option key={cat.id} value={cat.category_name}>
                          {cat.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="editField">
                    <p>Price</p>
                    <input
                      autoComplete="new-password"
                      type="number"
                      placeholder="product price"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </div>
                  <div className="editField">
                    <p>MRP</p>
                    <input
                      autoComplete="new-password"
                      type="number"
                      placeholder="product mrp"
                      onChange={(e) => setMRP(e.target.value)}
                      value={MRP}
                    />
                  </div>
                  <div className="editField">
                    <p>Stock</p>
                    <input
                      autoComplete="new-password"
                      type="number"
                      placeholder="product stock"
                      onChange={(e) => setStock(e.target.value)}
                      value={stock}
                    />
                  </div>

                  <div className="editField">
                    <p>
                      Add Image{" "}
                      <button className="button__type5" onClick={uploadimage}>
                        Replace
                      </button>
                    </p>
                    <input
                      autoComplete="new-password"
                      type="file"
                      placeholder="Upload Image"
                      onChange={(e) => base64(e)}
                    />{" "}
                  </div>

                  <div className="editField">
                    <p>Description</p>
                    <textarea
                      autoComplete="new-password"
                      name="coupon__desc"
                      placeholder="Add a short description (optional)"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                </div>
              </div>
              <div className="modalBottom">
                <button
                  className="button__type4"
                  onClick={(e) => editProduct(e)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EDITPRODUCTModal;

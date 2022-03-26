import React, { useState, useEffect } from "react";
import "./Modal.css";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const CreateCouponModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState();
  const [valid_till, setValid_till] = useState("");
  const [pricelimit, setPricelimit] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category_name, setCategory_Name] = useState("");

  const addcoupon = async (e) => {
    e.preventDefault();
    const newcoupon = {
      coupon,
      discount: Number(discount),
      valid_till,
      pricelimit: Number(pricelimit),
      quantity: Number(quantity),
      category_name,

      description,
    };

    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await axios.post(
        "https://klo3o8i80a.execute-api.ap-south-1.amazonaws.com/Prod/admin/addCoupon",
        newcoupon,
        { headers: { authToken } }
      );

      message.success("Coupon added Successfully");
      closeModal(false);
      window.location.reload();
    } catch (err) {
      message.error("Coupon not added");
    }
  };
  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://chnbq3osxj.execute-api.ap-south-1.amazonaws.com/Prod/user/getCategory",
          {},
          { headers: { authToken } }
        );

        setCategory(data);

        setLoading(false);
      } catch (err) {
        message.error("There is some error");
      }
    };
    getAllCategory();
  }, []);

  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modalTitle">
          <h2>Create a Coupon</h2>
          <CancelIcon onClick={() => closeModal(false)} />
        </div>
        <div className="editForm" style={{ width: "100%" }}>
          <div className="scroll__container" style={{ height: "100%" }}>
            <div className="editField">
              <p>Coupon Code</p>
              <input
                autoComplete="new-password"
                type="text"
                placeholder="Type Here"
                onChange={(e) => setCoupon(e.target.value)}
              />
            </div>

            <div className="editField">
              <p>Discount( in %)</p>
              <input
                autoComplete="new-password"
                type="number"
                placeholder="Discount in percentage"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="editField">
              <p>Price limit</p>
              <input
                autoComplete="new-password"
                type="number"
                placeholder="Enter a price limit"
                onChange={(e) => setPricelimit(e.target.value)}
              />
            </div>
            <div className="editField">
              <p>Quantity</p>
              <input
                autoComplete="new-password"
                type="number"
                placeholder="Enter coupon quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="editField">
              <p>Valid till</p>
              <input
                autoComplete="new-password"
                type="date"
                placeholder="Date till which the coupon is valid"
                onChange={(e) => setValid_till(e.target.value)}
              />
            </div>

            <div className="editField">
              <p>Category</p>
              <select
                name="cat"
                className="dropdown"
                onChange={(e) => setCategory_Name(e.target.value)}
              >
                {category.map((cat) => (
                  <option key={cat.id} value={cat.category_name}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="editField">
              <p>Description</p>
              <textarea
                autoComplete="new-password"
                name="coupon__desc"
                placeholder="Add a short description (optional)"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="modalBottom">
          <button className="button__type4" onClick={(e) => addcoupon(e)}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponModal;

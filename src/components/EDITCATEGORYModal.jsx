import React, { useState, useEffect } from "react";
import "./Modal.css";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const EDITCATEGORYModal = ({ closeeditmodal, editcat }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState({ url: editcat.img });

  const [category, setCategory] = useState(editcat.category_name);
  const [activate, setActivate] = useState(editcat.active);
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
      return message.error("Please choose an image");
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

      setImage(data);
      message.success("Image uploaded Successfully");
    } catch (err) {
      message.error("Error uploading image");
    }
  };

  const editCategory = async (e) => {
    try {
      if (!category || !image.url) {
        return message.error(
          "Please fill all the fields or please click on upload button to upload image"
        );
      }

      const editCategory = {
        name: category,
        id: editcat.id,
        active: activate,
        url: image.url,
      };

      const authToken = localStorage.getItem("authToken");
      const { data } = await axios.post(
        "https://8zifq105r5.execute-api.ap-south-1.amazonaws.com/Prod/admin/editCategory",
        editCategory,
        { headers: { authToken } }
      );

      message.success("Category edited Successfully");
      closeeditmodal(false);
      window.location.reload();
    } catch (err) {
      message.error("Category not edited");
    }
  };
  return (
    <>
      <div className="modal">
        <div className="modal__container" style={{ width: "40%" }}>
          <div className="modalTitle">
            <h2>Create Category</h2>
            <CancelIcon onClick={() => closeeditmodal(false)} />
          </div>
          <div className="editForm" style={{ width: "100%" }}>
            <div className="scroll__container" style={{ height: "70%" }}>
              <div className="editField">
                <p>Category Name</p>
                <input
                  autoComplete="new-password"
                  type="text"
                  placeholder="Enter new category name"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
              </div>
              <div className="editField">
                <p>
                  Add Image{" "}
                  <button className="button__type5" onClick={uploadimage}>
                    Upload
                  </button>
                </p>
                <input
                  type="file"
                  autoComplete="new-password"
                  placeholder="Upload Image"
                  onChange={(e) => base64(e)}
                />{" "}
              </div>
              <div className="editField">
                <p>Category</p>
                <select
                  name="cat"
                  className="dropdown"
                  onChange={(e) => setActivate(e.target.value)}
                  defaultValue={activate === "1" ? "1" : "0"}
                >
                  <option value="1">Activate</option>
                  <option value="0">Deactivate</option>
                </select>
              </div>
            </div>
            <div className="modalBottom">
              <button
                className="button__type4"
                onClick={(e) => editCategory(e)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EDITCATEGORYModal;

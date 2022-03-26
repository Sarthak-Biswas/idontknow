import React, { useState, useEffect } from "react";
import "./AllCouponsScreen.css";
import Coupons from "../apis/Coupons.json";
import CreateCouponModal from "../components/CreateCouponModal";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";
import Loading from "../components/Loading";

const AllCouponsScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllCoupons = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://fcfquqn69e.execute-api.ap-south-1.amazonaws.com/Prod/admin/viewallCoupons",
          {},
          { headers: { authToken } }
        );

        setCoupons(data);
        setLoading(false);
      } catch (err) {
        message.error("There is some error");
      }
    };
    getAllCoupons();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {modalOpen && <CreateCouponModal closeModal={setModalOpen} />}
          <div className="pageContainer">
            <div className="pageContainerTop">
              <p className="pageHeading">All Coupons</p>
              <button className="btn_type3" onClick={() => setModalOpen(true)}>
                Add a Coupon
              </button>
            </div>
            <div className="line" />
            <table>
              <thead>
                <tr>
                  <td style={{ marginLeft: "10px" }}>Coupon Code</td>
                  <td>Discount(in %)</td>
                  <td>Created On</td>
                  <td>Valid Till</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr
                    key={coupon.id}
                    className="list"
                    style={{ padding: "10px" }}
                  >
                    <td style={{ marginLeft: "30px" }}>{coupon.coupon}</td>
                    <td>{coupon.discount}</td>
                    <td>{coupon.create_date}</td>
                    <td>{coupon.valid_till}</td>
                    <td>
                      <button
                        className="btn__type1"
                        style={{ borderColor: "#F33535", color: "#F33535" }}
                      >
                        disable
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div id="screen__bottom">
              <div></div>
              <div className="bottom__left"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllCouponsScreen;

import React from "react";
import "./CoinWalletScreen.css";
import Wallets from "../apis/Wallet.json";

const CoinWalletScreen = () => {
  return (
    <div className="pageContainer">
      <div className="pageContainerTop">
        <p className="pageHeading">Coin Wallet</p>
      </div>
      <div className="line" />
      <table>
        <thead>
          <tr>
            <td />
            <td>Username</td>
            <td>Order ID</td>
            <td>Price (in Rs)</td>
            <td>Date</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {Wallets.map((wallet) => (
            <tr className="list">
              <td>
                <img src={wallet.imgUrl} alt="" />
              </td>
              <td>{wallet.username}</td>
              <td>{wallet._id}</td>
              <td>{wallet.price}</td>
              <td>{wallet.date}</td>
              <td>
                <button className="btn__type1">issue</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="screen__bottom">
        <div className="btngrp">
          <button className="first">Pending Requests</button>
          <button>Issued Coins</button>
        </div>
        <div className="bottom__left"></div>
      </div>
    </div>
  );
};

export default CoinWalletScreen;

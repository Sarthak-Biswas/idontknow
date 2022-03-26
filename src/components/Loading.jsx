import React from "react";
import { PuffLoader } from "react-spinners";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <PuffLoader size={100} color="#38bdf8" />
    </div>
  );
};

export default Loading;

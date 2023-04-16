import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
// import "../styles/homepage.css";


const HomePage = () => {
  const img1 =
    "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60";

  const img2 =
    "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60";

  const navigate = useNavigate();

  return (
    <Layout>
      <Slider />
      <div className="home-cat row d-flex align-items-center justify-content-center">
        <h1>Category</h1>
        <div className="col-md-5 ">
          <div className="Imagecontainer">
            <img src={img1} alt="Rent" style={{ width: "100%" }} />
            <button className="btn" onClick={() => navigate("/category/rent")}>
              FOR RENT
            </button>
          </div>
        </div>
        <div className="col-md-5">
          <div className="Imagecontainer">
            <img src={img2} alt="Rent" style={{ width: "100%" }} />
            <button className="btn" onClick={() => navigate("/category/sale")}>
              FOR SALE
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

import React from "react";
import NavBar from "../navBar/NavBar";
import "./home.css";
import SearchBar from "../searchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const restaurantProfile = useSelector((state)=> state.restaurantProfile)
  console.log(restaurantProfile);
  return (
    <div>
      <div className="home-container">
        <NavBar />
        <h1>Hungrezy</h1>
        <h3>Order the good food & drinks from your area</h3>
        <div className="search-bar">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Home;

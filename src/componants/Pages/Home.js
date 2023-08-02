import React, { useEffect } from "react";
import NavBar from "../navBar/NavBar";
import "./home.css";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";


function Home() {
  const data = useSelector((state) => state.userData);
  console.log("home page data",data);
  return (
  <div>
     <div className="home-container ">
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

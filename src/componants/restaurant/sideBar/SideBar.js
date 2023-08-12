import React, { useState,useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "./sideBar.css";
import { useProSidebar } from "react-pro-sidebar";
import { Divider, SwipeableDrawer } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import MyRestaurant from "../restaurantProfile/MyRestaurant";
import ComingSoon from "../../Pages/comingSoon/ComingSoon";
import axios from "axios";
import { getRestaurantURL } from "../../../BackEndURLs/Urls";
import { useSelector } from "react-redux";

function SideBar() {
  const [isMobileView, setIsMobileView] = useState(false);
  // Update the isMobileView state on component mount and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call the function to set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const iconClassName = isMobileView ? "very-small" : "medium";
  const clappsedWidth = isMobileView ? "38px" : "65px";

  const data = useSelector((state) => state.userData);
  const [restaurantProfile, setRestaurantProfile] = useState({});
  const getRestaurant = async () => {
    await axios
      .post(getRestaurantURL, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 202) {
          console.log("data is not there");
        } else {
          setRestaurantProfile(res.data);
          console.log("data is there", res);
        }
      })
      .catch((error) => {
        console.log("Restaurant details not found", error);
      });
  };

  useEffect(()=>{
    getRestaurant();
  },[])

  const {
    collapseSidebar,
    toggleSidebar,
    collapsed,
    toggled,
    broken,
    defaultCollapsed,
    rtl,
  } = useProSidebar();
  const [toggle, setToggle] = useState(true);
  return (
    <div
      className="sideBar-container"
      style={{ display: "flex", height: "100vh" }}
    >
      <Sidebar
        defaultCollapsed="true"
        width="250px"
        collapsedWidth={clappsedWidth}
        className="app"
        transitionDuration="300"
        onBackdropClick={() => setToggle(false)}
      >
        <Menu>
          <MenuItem
            className="menu1"
            icon={toggle ? <MenuRoundedIcon fontSize={iconClassName} /> : <CloseIcon fontSize={iconClassName} />}
            onClick={() => {
              collapseSidebar();
              setToggle(!toggle);
            }}
          >
            <h2>{restaurantProfile?.restaurant?.name}</h2>
          </MenuItem>
          <Divider />
          <MenuItem className="menu"
            icon={<HomeIcon fontSize={iconClassName} />}
            component={<Link to="/" className="link" />}
          >
            Home
          </MenuItem>
          <MenuItem className="menu" icon={<GridViewRoundedIcon fontSize={iconClassName} />}>Dashboard</MenuItem>
          <MenuItem className="menu" icon={<ReceiptRoundedIcon fontSize={iconClassName} />}> Invoices </MenuItem>
          <SubMenu className="menu" label="Customers" icon={<SportsHandballIcon fontSize={iconClassName} />}>
            <MenuItem
              icon={<TimelineRoundedIcon fontSize={iconClassName} />}
              component={<Link to="customer-list" className="link" />}
            >
              {" "}
              Customer List{" "}
            </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon fontSize={iconClassName} />}>Bubble Chart</MenuItem>
          </SubMenu>
          <SubMenu className="menu" label="Products" icon={<StorefrontIcon fontSize={iconClassName} />}>
            <MenuItem icon={<TimelineRoundedIcon fontSize={iconClassName} />}> Add product </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon fontSize={iconClassName} />}>My Products</MenuItem>
          </SubMenu>
          <SubMenu className="menu" label="Orders" icon={<BorderColorIcon fontSize={iconClassName} />}>
            <MenuItem icon={<BubbleChartRoundedIcon fontSize={iconClassName} />}>orders</MenuItem>
          </SubMenu>
          <SubMenu className="menu" label="Wallets" icon={<WalletRoundedIcon fontSize={iconClassName} />}>
            <MenuItem icon={<AccountBalanceRoundedIcon fontSize={iconClassName} />}>
              Current Wallet
            </MenuItem>
            <MenuItem icon={<SavingsRoundedIcon fontSize={iconClassName} />}>Savings Wallet</MenuItem>
          </SubMenu>
          <MenuItem className="menu" icon={<MonetizationOnRoundedIcon fontSize={iconClassName} />}>Transactions</MenuItem>
          <SubMenu className="menu" label="Settings" icon={<SettingsIcon fontSize={iconClassName} />}>
            <MenuItem
              icon={<InfoIcon fontSize={iconClassName} />}
              component={<Link to="setting" className="link" />}
            >
              {" "}
              Restaurant details{" "}
            </MenuItem>
          </SubMenu>
          <MenuItem className="menu" icon={<LogoutRoundedIcon fontSize={iconClassName} />}> Logout </MenuItem>
        </Menu>
      </Sidebar>
      <section className="main-content">
        <Routes>
          <Route
            path="setting"
            element={<MyRestaurant />}
          />
          <Route path="customer-list" element={<ComingSoon />} />
        </Routes>
      </section>
    </div>
  );
}

export default SideBar;

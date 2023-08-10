import React, { useState } from "react";
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
import HomeIcon from '@mui/icons-material/Home';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import StorefrontIcon from "@mui/icons-material/Storefront";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from '@mui/icons-material/Info';
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "./sideBar.css";
import { useProSidebar } from "react-pro-sidebar";
import { Divider, SwipeableDrawer } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import MyRestaurant from "../restaurantProfile/MyRestaurant";
import ComingSoon from "../../Pages/comingSoon/ComingSoon";

function SideBar() {
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
        collapsedWidth="65px"
        className="app"
        transitionDuration="500"
        onBackdropClick={() => setToggle(false)}
      >
        <Menu>
          <MenuItem
            className="menu1"
            icon={toggle ? <MenuRoundedIcon /> : <CloseIcon />}
            onClick={() => {
              collapseSidebar();
              setToggle(!toggle);
            }}
          >
            <h2>NAME</h2>
          </MenuItem>
          <Divider />
          <MenuItem icon={<HomeIcon />} component={<Link to="/" className="link" />} >Home</MenuItem>
          <MenuItem icon={<GridViewRoundedIcon />}>Dashboard</MenuItem>
          <MenuItem icon={<ReceiptRoundedIcon />}> Invoices </MenuItem>
          <SubMenu label="Customers" icon={<SportsHandballIcon />}>
            <MenuItem
              icon={<TimelineRoundedIcon />}
              component={<Link to="customer-list" className="link" />}
            >
              {" "}
              Customer List{" "}
            </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}>Bubble Chart</MenuItem>
          </SubMenu>
          <SubMenu label="Products" icon={<StorefrontIcon />}>
            <MenuItem icon={<TimelineRoundedIcon />}> Add product </MenuItem>
            <MenuItem icon={<BubbleChartRoundedIcon />}>My Products</MenuItem>
          </SubMenu>
          <SubMenu label="Orders" icon={<BorderColorIcon />}>
            <MenuItem icon={<BubbleChartRoundedIcon />}>orders</MenuItem>
          </SubMenu>
          <SubMenu label="Wallets" icon={<WalletRoundedIcon />}>
            <MenuItem icon={<AccountBalanceRoundedIcon />}>
              Current Wallet
            </MenuItem>
            <MenuItem icon={<SavingsRoundedIcon />}>Savings Wallet</MenuItem>
          </SubMenu>
          <MenuItem icon={<MonetizationOnRoundedIcon />}>Transactions</MenuItem>
          <SubMenu label="Settings" icon={<SettingsIcon />}>
            <MenuItem
              icon={<InfoIcon />}
              component={<Link to="setting" className="link" />}
            >
              {" "}
              Restaurant details{" "}
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<LogoutRoundedIcon />}> Logout </MenuItem>
        </Menu>
      </Sidebar>
      <section className="main-content">
        <Routes>
          <Route path="setting" element={<MyRestaurant />} />
          <Route path="customer-list" element={<ComingSoon />} />
        </Routes>
      </section>
    </div>
  );
}

export default SideBar;

import React, { useState } from "react";
import PgDashboard from "./pgdashboard/pgDashboard";
import { Router, Routes, Route, Link } from "react-router-dom";
import Badminton from "./components/Badminton";
import UpcomingEvents from "./upcoming/UpcomingPage";
import LoginPage from "./login/LoginPage"
import { Avatar, Popover } from 'antd';

import { Layout, Menu, theme } from "antd";
import Football from "./components/Football";
import OrdersTable from "./history/OrdersTable";
import LogOut from "./login/LogOut";
import Analytics from "./analytics/Analytics";
import './App.css'

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;


const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogin = () => {
    // Logic to handle successful login
    setIsLoggedIn(true);
  };

  const content = (
    <div>
      <LogOut setIsLoggedIn={setIsLoggedIn}></LogOut>
    </div>
  );

  return (

    <Layout>
      {
        isLoggedIn && (
          <Header
            className="header"
            style={{
              display: "flex",
              alignItems: "center",
              left: '0rem'
            }}
          >
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <Menu.Item key="0" >
                <Popover content={content} trigger="click">
                  <Avatar size="large" icon={<UserOutlined />} />
                </Popover>
              </Menu.Item>
              <Menu.Item key="1">
                <span>Dashboard</span>
                <Link to="/playground" />
              </Menu.Item>
              <Menu.Item key="2">

                <span>Up Coming</span>
                <Link to="/upcoming" />
              </Menu.Item>
              <Menu.Item key="3">

                <span>History</span>
                <Link to="/history" />
              </Menu.Item>
              <Menu.Item key="4">
                <span>Analytics</span>
                <Link to="/analytics" />
              </Menu.Item>
            </Menu>
          </Header>
        )
      }

      <Layout>
        <Layout
          style={{
            padding: "0 0 0",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {isLoggedIn ? (
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/playground" element={<PgDashboard />}></Route>
                <Route path="/badminton" element={<Badminton />} />
                <Route path="/football" element={<Football />} />
                <Route path="/upcoming" element={<UpcomingEvents />} />
                <Route path="/history" element={<OrdersTable />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            ) : (<LoginPage onLogin={handleLogin} />)}

          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white', position: 'fixed', width: '100%', bottom: 0, height: '0.5em' }}>SportSea</Footer>
      </Layout>
    </Layout>

  );
};
export default App;

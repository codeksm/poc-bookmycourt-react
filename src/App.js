import React from "react";
import PgDashboard from "./pgdashboard/pgDashboard";
import { Router, Routes, Route, Link } from "react-router-dom";
import Badminton from "./components/Badminton";
import UpcomingEvents from "./upcoming/UpcomingPage";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Football from "./components/Football";
import OrdersTable from "./history/OrdersTable";
const { Header, Content, Sider } = Layout;

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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (

    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
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
        </Menu>
      </Header>
      <Layout>
        <Layout
          style={{
            padding: "0 0 0",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* <PgDashboard></PgDashboard> */}
            <Routes>
              <Route path="/" element={<PgDashboard />} />
              <Route path="/playground" element={<PgDashboard />}></Route>
              <Route path="/badminton" element={<Badminton />} />
              <Route path="/football" element={<Football />} />
              <Route path="/upcoming" element={<UpcomingEvents />} />
              <Route path="/history" element={<OrdersTable />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>

  );
};
export default App;

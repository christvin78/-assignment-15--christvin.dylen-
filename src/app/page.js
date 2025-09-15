"use client";

import { useState } from "react";
import { Layout, Menu, Breadcrumb, Card, Switch, Avatar, Input, Dropdown, Badge } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const userMenu = {
    items: [
      { key: "1", label: "Profile" },
      { key: "2", label: "Settings" },
      { type: "divider" },
      { key: "3", label: "Logout" },
    ],
  };

  return (
    <Layout className={darkMode ? "dark-mode" : ""} style={{ minHeight: "100vh" }}>
      {/* Sider */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth="60"
        className="sider-custom"
      >
        <div className="logo">{collapsed ? "🌟" : "My Logo"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="menu-custom"
          items={[
            { key: "1", icon: <HomeOutlined />, label: "Home" },
            { key: "2", icon: <InfoCircleOutlined />, label: "About" },
            { key: "3", icon: <PhoneOutlined />, label: "Contact" },
          ]}
        />
      </Sider>

      <Layout>
        {/* Header */}
        <Header className="header-custom">
          {/* Sidebar Toggle */}
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} />
          )}

          {/* Search */}
          <Input
            className="search-bar"
            placeholder="Search..."
            prefix={<SearchOutlined />}
          />

          {/* Right Side (Actions) */}
          <div className="header-actions">
            {/* Dark Mode Toggle */}
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              className="switch-dark"
            />

            {/* Notification */}
            <Badge count={3}>
              <BellOutlined className="icon-btn" />
            </Badge>

            {/* User Profile */}
            <Dropdown menu={userMenu} placement="bottomRight" arrow>
              <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>

        {/* Breadcrumb */}
        <Breadcrumb className="breadcrumb-custom">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>

        {/* Content */}
        <Content className="content-custom">
          <Card title="Welcome 🎉" bordered={false} className="card-custom">
            <p>
              This is a <b>modern interactive dashboard</b> built with{" "}
              <b>Next.js</b> and <b>Ant Design</b>.  
              Use the sidebar, header tools, and dark mode toggle to explore.
            </p>
          </Card>

          <div className="card-grid">
            <Card hoverable className="card-hover">
              <h3>🌙 Dark Mode</h3>
              <p>Switch between light & dark themes.</p>
            </Card>
            <Card hoverable className="card-hover">
              <h3>🔔 Notifications</h3>
              <p>Stay updated with alerts & messages.</p>
            </Card>
            <Card hoverable className="card-hover">
              <h3>👤 User Profile</h3>
              <p>Access your profile & settings easily.</p>
            </Card>
            <Card hoverable className="card-hover">
              <h3>🔍 Search Bar</h3>
              <p>Quickly find what you need in the dashboard.</p>
            </Card>
          </div>
        </Content>

        
      </Layout>
    </Layout>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Card,
  Switch,
  Avatar,
  Input,
  Dropdown,
  Badge,
  Modal,
  Form,
  Button,
  message,
  Upload,
  List,
} from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
  UploadOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);

  // ✅ Notifikasi
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to the dashboard 🎉", read: false },
    { id: 2, text: "New message from Admin 📩", read: false },
    { id: 3, text: "Your profile was updated ✅", read: true },
  ]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // ✅ Cek localStorage saat load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Simpan user ke localStorage
  const saveUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // ✅ Login
  const handleLogin = (values) => {
    const fakeUser = { username: values.username, email: values.email, avatar: null };
    saveUser(fakeUser);
    setIsLoggedIn(true);
    setLoginModal(false);
    message.success("Login successful 🎉");
  };

  // ✅ Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
    message.info("Logged out 👋");
  };

  // ✅ Update settings
  const handleSaveSettings = (values) => {
    const updatedUser = {
      ...user,
      username: values.username || user.username,
      avatar: values.avatar || user.avatar,
    };
    saveUser(updatedUser);
    setSettingsModal(false);
    message.success("Profile updated ✅");
  };

  // ✅ Upload custom avatar
  const handleAvatarUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedUser = { ...user, avatar: reader.result };
      saveUser(updatedUser);
      message.success("Custom avatar uploaded 🎨");
    };
    reader.readAsDataURL(file);
    return false; // biar tidak auto-upload
  };

  // ✅ Menu user
  const userMenu = {
    items: isLoggedIn
      ? [
          {
            key: "1",
            icon: <SettingOutlined />,
            label: "Settings",
            onClick: () => setSettingsModal(true),
          },
          { type: "divider" },
          {
            key: "2",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: handleLogout,
          },
        ]
      : [
          {
            key: "3",
            icon: <LoginOutlined />,
            label: "Login",
            onClick: () => setLoginModal(true),
          },
        ],
  };

  // ✅ Menu notifikasi
  const notificationMenu = {
    items: [
      {
        key: "list",
        label: (
          <div style={{ maxHeight: 250, overflowY: "auto", width: 300 }}>
            {notifications.length > 0 ? (
              <List
                dataSource={notifications}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      background: item.read ? "#f5f5f5" : "#e6f7ff",
                      borderRadius: 6,
                      marginBottom: 5,
                      padding: "8px 12px",
                    }}
                    actions={[
                      <Button
                        size="small"
                        type="link"
                        icon={<CheckOutlined />}
                        onClick={() =>
                          setNotifications((prev) =>
                            prev.map((n) =>
                              n.id === item.id ? { ...n, read: true } : n
                            )
                          )
                        }
                      >
                        Mark Read
                      </Button>,
                      <Button
                        size="small"
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          setNotifications((prev) =>
                            prev.filter((n) => n.id !== item.id)
                          )
                        }
                      >
                        Delete
                      </Button>,
                    ]}
                  >
                    {item.text}
                  </List.Item>
                )}
              />
            ) : (
              <p style={{ textAlign: "center", margin: 0 }}>No notifications 🎉</p>
            )}
          </div>
        ),
      },
      { type: "divider" },
      {
        key: "clear",
        label: (
          <Button
            danger
            type="text"
            style={{ width: "100%" }}
            onClick={() => setNotifications([])}
          >
            Clear All
          </Button>
        ),
      },
    ],
  };

  return (
    <Layout className={darkMode ? "dark-mode" : ""} style={{ minHeight: "100vh" }}>
      {/* === Sider === */}
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

      {/* === Layout Content === */}
      <Layout>
        {/* === Header === */}
        <Header className="header-custom">
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} />
          )}

          <Input className="search-bar" placeholder="Search..." prefix={<SearchOutlined />} />

          <div className="header-actions">
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              className="switch-dark"
            />

            {/* ✅ Dropdown Notifikasi */}
            <Dropdown menu={notificationMenu} placement="bottomRight" arrow trigger={["click"]}>
              <Badge count={unreadCount} offset={[0, 6]}>
                <BellOutlined className="icon-btn" />
              </Badge>
            </Dropdown>

            {/* ✅ User Menu */}
            <Dropdown menu={userMenu} placement="bottomRight" arrow>
              <Avatar
                src={user?.avatar || null}
                style={{ backgroundColor: "#87d068", cursor: "pointer" }}
                icon={!user?.avatar && <UserOutlined />}
              />
            </Dropdown>
          </div>
        </Header>

        {/* === Breadcrumb === */}
        <Breadcrumb className="breadcrumb-custom">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>

        {/* === Content === */}
        <Content className="content-custom">
          <Card title="Welcome 🎉" bordered={false} className="card-custom">
            {isLoggedIn ? (
              <p>
                Hello, <b>{user?.username}</b> 👋 <br />
                Email: <i>{user?.email}</i>
              </p>
            ) : (
              <p>
                Please <b>login</b> to access full features.  
                Click the avatar icon on the top-right corner.
              </p>
            )}
          </Card>
        </Content>

        {/* === Footer === */}
        <Footer className="footer-custom">©2025 Created by <b>[Your Name]</b></Footer>
      </Layout>

      {/* === Modal Login === */}
      <Modal title="Login" open={loginModal} onCancel={() => setLoginModal(false)} footer={null}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Enter a valid email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* === Modal Settings === */}
      <Modal title="User Settings" open={settingsModal} onCancel={() => setSettingsModal(false)} footer={null}>
        <Form layout="vertical" onFinish={handleSaveSettings} initialValues={user || {}}>
          <Form.Item label="Change Username" name="username">
            <Input placeholder="New username..." />
          </Form.Item>

          <Form.Item label="Change Password" name="password">
            <Input.Password placeholder="New password..." />
          </Form.Item>

          {/* ✅ Pilih Avatar Default */}
          <Form.Item label="Choose avatar">
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["avatar1.jpg", "avatar2.jpg", "avatar3.jpg"].map((file) => (
                <Avatar
                  key={file}
                  src={`/avatar/${file}`}
                  size={64}
                  style={{
                    cursor: "pointer",
                    border: user?.avatar === `/avatar/${file}` ? "2px solid #1890ff" : "2px solid transparent",
                  }}
                  onClick={() => {
                    const updatedUser = { ...user, avatar: `/avatar/${file}` };
                    saveUser(updatedUser);
                    message.success("Avatar updated 🎨");
                  }}
                />
              ))}
            </div>
          </Form.Item>

          {/* ✅ Upload Custom Avatar */}
          <Form.Item label="Or Upload Custom Avatar" name="avatar">
            <Upload beforeUpload={handleAvatarUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
            {user?.avatar && (
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <Avatar src={user.avatar} size={64} />
              </div>
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

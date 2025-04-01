import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Flex, notification } from "antd";

import { saveToken } from "../../utils/utils";
import { postSignIn, postSignUp } from "../../api/auth";

const LoginComponent: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: {
    email: string;
    password: string;
    login: string;
    phoneNumber: string;
    username: string;
  }) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        const data = await postSignIn(values.login, values.password);
        console.log(data);
        saveToken(data.token, data.refreshToken);
        notification.success({
          message: "Login Success",
        });
      } else {
        const data = await postSignUp(
          values.email,
          values.login,
          values.password,
          values.phoneNumber,
          values.username
        );
        console.log(data);
        saveToken(data.token, data.refreshToken);
        notification.success({
          message: "Registration Success",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Registration"}</h2>
      <Form
        layout="vertical"
        name="login"
        initialValues={{ remember: true }}
        style={{ display: "block", maxWidth: 420, marginTop: 50 }}
        onFinish={onFinish}
      >
        {!isLogin && (
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        )}

        <Form.Item
          label="Login"
          name="login"
          rules={[{ required: true, message: "Please input your Login!" }]}
        >
          <Input placeholder="Login" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        {!isLogin && (
          <Form.Item
            label="PhoneNumber"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phoneNumber!" },
            ]}
          >
            <Input placeholder="PhoneNumber" />
          </Form.Item>
        )}

        {!isLogin && (
          <Form.Item
            label="UserName"
            name="username"
            rules={[{ required: true, message: "Please input your UserName!" }]}
          >
            <Input placeholder="UserName" />
          </Form.Item>
        )}

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox
                style={{
                  color: "#A1A1A1",
                  fontSize: "12px",
                }}
              >
                Remember me
              </Checkbox>
            </Form.Item>
            {/* <a className={styles.forgot} href="">
              {isLoading
                ? "Dont have an account? Sign Up"
                : "Already have an account? Login"}
            </a> */}
            <Button type="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </Button>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button
            style={{
              color: "white",
              backgroundColor: "#7f265b",
              width: "420px",
              height: "50px",
            }}
            block
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {isLogin ? "Login" : "Registration"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginComponent;

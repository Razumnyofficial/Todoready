import { useState } from "react";
import { Button, Checkbox, Form, Input, Flex, notification } from "antd";

import { saveToken } from "../../utils/utils";
import { postLogOut, postSignIn, postSignUp } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import styles from "./LoginComponents.module.css";




const LoginComponent = () => {

  const navigate = useNavigate();

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
        saveToken(data.accessToken, data.refreshToken);
        notification.success({
          message: "Registration was successful",
        });
        navigate("/");
      } else {
        const data = await postSignUp(
          values.email,
          values.login,
          values.password,
          values.phoneNumber,
          values.username
        );
        console.log(data);
        saveToken(data.accessToken, data.refreshToken);
        notification.success({
          message: "Registration Success",
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Incorrectly entered data, try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>{isLogin ? "Login" : "Registration"}</h2>
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
            rules={[{ required: true, message: " Email должен быть валидным" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        )}

        <Form.Item
          label="Login"
          name="login"
          rules={[
            { required: true, message: "Логин от 2 до 60 символов" },
            { min: 2, message: "Логин должен быть не менее 2 символов" },
            { max: 60, message: "Логин должен быть не более 60 символов" },
          ]}
        >
          <Input placeholder="Login" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Пароль от 6 до 60 символов" },
            { min: 6, message: "Пароль должен быть не менее 6 символов" },
            { max: 60, message: "Пароль должен быть не более 60 символов" },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        {!isLogin && (
          <Form.Item
            label="PhoneNumber"
            name="phoneNumber"
            rules={[
              { required: true, message: "Телефон должен быть валидным" },
            ]}
          >
            <Input placeholder="PhoneNumber" />
          </Form.Item>
        )}

        {!isLogin && (
          <Form.Item
            label="UserName"
            name="username"
            rules={[
              {
                required: true,
                message: "Имя пользователя от 1 до 60 символов",
              },
              { min: 1, message: "Имя пользователя должен быть не менее 1 символов" },
              { max: 60, message: "Имя пользователя должен быть не более 60 символов" },
            ]}
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
            <Button
              style={{ color: "#7f265b" }}
              type="link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "You have no account? Sign up"
                : "Do you have an account? Sign in"}
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
            {isLogin ? "Login" : "Register"}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            onClick={() => {
              postLogOut();
            }}
          >
            Log out
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginComponent;

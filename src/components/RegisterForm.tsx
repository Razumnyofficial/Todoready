import { Button, Form, Input, notification } from "antd";
import { Link } from "react-router-dom";
import { postSignUp } from "@/api/auth";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { useState } from "react";
import { RegisterFormValues } from "@/types/authTypes";
// import styles from "./AuthForm.module.css";



const RegisterForm = () => {
  const [form] = Form.useForm<RegisterFormValues>();
  const [isRegister, setIsRegister] = useState(false);
  // const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    try {
      console.log("начало регестрации");
      const response = await postSignUp(values);

      console.log("ответ от сервера", response);

      if (response) {
        notification.success({
          message: "Регистрация прошла успешно",
          duration: 0,
        });
        form.resetFields();
        setIsRegister(true);
        // navigate("/login");
      }
    } catch (error) {
      console.log("Ошибка регестрации", error);
      notification.error({
        message: "Ошибка регистрации",
        description: "Проверьте данные и попробуйте снова",
      });
    }
  };

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<RegisterFormValues>
  ) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message: "Ошибка регистрации",
      description: "Проверьте данные и попробуйте снова",
    });
  };

  return (
    <>
      {!isRegister ? (
        <Form
          form={form}
          layout="vertical"
          style={{
            display: "block",
            maxWidth: 420,
            width: "100%",
            marginTop: 50,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            label="email"
            rules={[
              { required: true, message: "Введите корректный email" },
              { type: "email", message: "Некорректный email!" },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>

          <Form.Item
            name="login"
            label="login"
            rules={[
              { required: true, message: "Логин от 2 до 60 символов" },
              {
                min: 2,
                message:
                  "Логин должен быть не менее 2 символов латинского алфавита",
              },
              {
                max: 60,
                message:
                  "Логин должен быть не более 60 символов латинского алфавита",
              },
              {
                pattern: /^[a-zA-Z]+$/,
                message: "Логин должен состоять только из латинского алфавита",
              },
            ]}
          >
            <Input placeholder="login" />
          </Form.Item>

          <Form.Item
            name="password"
            label="password"
            rules={[
              { required: true, message: "Пароль от 6 до 60 символов" },
              { min: 6, message: "Пароль должен быть не менее 6 символов" },
              { max: 60, message: "Пароль должен быть не более 60 символов" },
            ]}
          >
            <Input type="password" placeholder="password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Пароли не совпадают" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не совпадают!"));
                },
              }),
            ]}
          >
            <Input type="password" placeholder="confirmPassword" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="phoneNumber"
            rules={[
              { required: false, message: "Введите номер телефона" },
              {
                pattern: /^\+7\d{10}$/,
                message: "Номер телефона должен быть в формате +7XXXXXXXXXX",
              },
            ]}
          >
            <Input placeholder="phoneNumber" />
          </Form.Item>

          <Form.Item
            name="username"
            label="username"
            rules={[
              {
                required: true,
                message: "Имя пользователя от 1 до 60 символов",
              },
              {
                min: 1,
                message:
                  "Имя пользователя должен быть не менее 1 символов латинского алфавита",
              },
              {
                max: 60,
                message:
                  "Имя пользователя должен быть не более 60 символов латинского алфавита",
              },
              {
                pattern: /^[a-zA-Z]+$/,
                message: "Логин должен состоять только из латинского алфавита",
              },
            ]}
          >
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: 200,
                height: 45,
                backgroundColor: "#7f265b",
                marginTop: 50,
              }}
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <h2>Регистрация прошла успешно!</h2>

          <Link
            to="/auth/login"
            style={{
              display: "flex",
              textAlign: "center",
              textDecoration: "underline",
              fontSize: 20,
            }}
          >
            Перейти на страницу авторизации
          </Link>
        </div>
      )}
    </>
  );
};

export default RegisterForm;

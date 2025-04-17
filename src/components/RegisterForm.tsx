import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { postSignUp } from "../api/auth";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
// import styles from "./AuthForm.module.css";

interface RegisterFormValues {
  email: string;
  login: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  username: string;
}

const RegisterForm = () => {
  const [form] = Form.useForm<RegisterFormValues>();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    try {
      await postSignUp(
        values.email,
        values.login,
        values.password,
        values.phoneNumber,
        values.username
      );

      notification.success({ message: "Регистрация прошла успешно" });
      form.resetFields();
      navigate("/login");
    } catch (error) {
      console.log(error);
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
    <Form
      form={form}
      layout="vertical"
      style={{ display: "block", maxWidth: 420, width: "100%", marginTop: 50 }}
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

      <Form.Item name="phoneNumber" label="phoneNumber" rules={[]}>
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
  );
};

export default RegisterForm;

import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../api/auth";
import { saveToken } from "../utils/utils";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: { login: string; password: string }) => {
    try {
      const data = await postSignIn(values.login, values.password);

      saveToken(data.accessToken, data.refreshToken);
      notification.success({ message: "Вход выполнен успешно" });
      navigate("/");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Ошибка входа",
        description: "Неверный логин или пароль. Попробуйте снова",
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ display: "block", maxWidth: 420, width: "100%", marginTop: 50 }}
    >
      <Form.Item
        label="login"
        name="login"
        rules={[
          { required: true, message: "Логин от 2 до 60 символов" },
          { min: 2, message: "Логин должен быть не менее 2 символов" },
          { max: 60, message: "Логин должен быть не более 60 символов" },
        ]}
      >
        <Input placeholder="login" />
      </Form.Item>

      <Form.Item
        label="password"
        name="password"
        rules={[
          { required: true, message: "Пароль от 6 до 60 символов" },
          { min: 6, message: "Пароль должен быть не менее 6 символов" },
          { max: 60, message: "Пароль должен быть не более 60 символов" },
        ]}
      >
        <Input type="password" placeholder="password" />
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
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

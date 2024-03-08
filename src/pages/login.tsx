import { Button, Row } from "antd";
import React from "react";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "S12345",
  //   },
  // });

  // const { register } = useFormContext();

  // const defaultValues = {
  //   id: "A-0001",
  //   password: "S12345",
  // };

  const [login, { error }] = useLoginMutation();

  console.log("error:", error);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("logging  in");

    try {
      const res = await login(data).unwrap();
      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log("data:", user);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("user logged in", { id: toastId, duration: 2000 });
      if (res.data.needsPasswordChange) {
        navigate("/change-password");
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      {" "}
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="id" label={"ID:"} />

        <PHInput type="password" name="password" label={"Password:"} />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;

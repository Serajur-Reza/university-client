import { Row, Button } from "antd";
import React from "react";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagementApi";
import { toast } from "sonner";
import { logOut } from "../redux/features/auth/authSlice";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";

export default function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [changePassword] = useChangePasswordMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("changing password...");

    const res = await changePassword(data);
    console.log(res);
    if (res?.data?.success) {
      dispatch(logOut());
      navigate("/login");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
    //   const user = verifyToken(res.data.accessToken) as TUser;
    //   console.log("data:", user);
    //   dispatch(setUser({ user: user, token: res.data.accessToken }));
    //   toast.success("user logged in", { id: toastId, duration: 2000 });
    //   navigate(`/${user.role}/dashboard`);
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      {" "}
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label={"Old Password:"} />

        <PHInput type="password" name="newPassword" label={"New Password:"} />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
}

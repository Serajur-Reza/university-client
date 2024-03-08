import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { logOut } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

type Props = {
  role: string;
  children: ReactNode;
};

function ProtectedRoute({ children, role }: Props) {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  let user;

  if (token) {
    user = verifyToken(token);
  }

  console.log(user);

  if (role !== user?.role) {
    dispatch(logOut());
    return <Navigate to={"/login"} replace={true} />;
  }

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
}

export default ProtectedRoute;

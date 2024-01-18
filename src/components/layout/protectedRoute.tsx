import React, { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
}

export default ProtectedRoute;

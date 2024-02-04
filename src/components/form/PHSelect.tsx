import { Form, Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

export default function PHSelect(props: Props) {
  return (
    <Controller
      name={props.name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={props.label}>
          <Select size="large" {...field} options={props.options} />
          {error ? <small style={{ color: "red" }}>{error.message}</small> : ""}
        </Form.Item>
      )}
    />
  );
}

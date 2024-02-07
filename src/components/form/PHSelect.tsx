import { Form, Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
};

export default function PHSelect(props: Props) {
  return (
    <Controller
      name={props.name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={props.label}>
          <Select
            size="large"
            {...field}
            options={props.options}
            disabled={props.disabled}
          />
          {error ? <small style={{ color: "red" }}>{error.message}</small> : ""}
        </Form.Item>
      )}
    />
  );
}

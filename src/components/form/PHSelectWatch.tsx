import { Form, Select } from "antd";
import { useEffect } from "react";

import { Controller, useFormContext, useWatch } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | "tags" | undefined;
  onValueChange(a: string): void;
};

export default function PHSelectWatch(props: Props) {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name: props.name,
  });

  useEffect(() => {
    props.onValueChange(inputValue);
  }, [inputValue]);

  console.log(inputValue);
  return (
    <Controller
      name={props.name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={props.label}>
          <Select
            mode={props.mode}
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

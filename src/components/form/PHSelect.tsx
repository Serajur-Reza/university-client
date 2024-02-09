import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  options:
    | { value: string; label: string; disabled?: boolean }[]
    | undefined
    | string;
  disabled?: boolean;
  mode?: "multiple" | "tags" | undefined;
};

export default function PHSelect(props: Props) {
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

import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type Props = { name: string; label?: string };

export default function PHTimePicker({ name, label }: Props) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              size="large"
              style={{ width: "100%" }}
              format={"HH:mm"}
            />
          </Form.Item>
        )}
      />
    </div>
  );
}

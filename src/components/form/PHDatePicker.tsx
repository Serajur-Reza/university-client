import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type Props = { name: string; label?: string };

export default function PHDatePicker({ name, label }: Props) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker {...field} size="large" style={{ width: "100%" }} />
          </Form.Item>
        )}
      />
    </div>
  );
}

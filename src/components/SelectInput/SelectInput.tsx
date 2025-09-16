import cls from "./SelectInput.module.css";
import type { ChangeEvent } from "react";

interface Option {
  key: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  name?: string;
  childrenOptions: Option[];
  title?: string;
  defaultValue?: string;
}

export const SelectInput = ({ childrenOptions, name, id, value, onChange, title }: Props) => {
  return (
    <select value={value} onChange={onChange} className={cls.select} name={name} id={id} title={title} defaultValue={value}>
      {childrenOptions.map(({ key, label, disabled }) => (
        <option key={key} value={key} disabled={disabled}>
          {label}
        </option>
      ))}
    </select>
  );
};

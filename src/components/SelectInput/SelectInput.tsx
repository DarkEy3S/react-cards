import cls from "./SelectInput.module.css";
import type { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  name?: string;
  childrenOptions: Record<string, string>;
  title: string;
}

export const SelectInput = ({ childrenOptions, name, id, value, onChange, title }: Props) => {
  return (
    <>
      <select value={value} onChange={onChange} className={cls.select} name={name} id={id} title={title}>
        {Object.entries(childrenOptions).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

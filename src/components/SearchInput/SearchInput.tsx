import cls from "./SearchInput.module.css";
import { useId } from "react";
import { SearchIcon } from "../icons.tsx";
import type { ChangeEvent } from "react";

export const SearchInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => {
  const inputID = useId();

  return (
    <div className={cls.inputContainer}>
      <label htmlFor={inputID}>{<SearchIcon className={cls.searchIcon} />}</label>
      <input type="search" id={inputID} value={value} onChange={onChange} className={cls.input} placeholder={placeholder} />
    </div>
  );
};

import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./Button.module.scss";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type PropsType = DefaultButtonPropsType & {
  title: string;
  callback: () => void;
};

export const Button: React.FC<PropsType> = ({
  title,
  callback,
  ...restProps
}) => {
  return (
    <button className={s.btn} onClick={callback} {...restProps}>
      {title}
    </button>
  );
};

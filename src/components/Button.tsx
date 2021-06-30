import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./Button.module.scss";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type PropsType = DefaultButtonPropsType & {
  title: string;
  callback?: () => void;
};

export const Button: React.FC<PropsType> = ({
  title,
  callback,
  className,
  ...restProps
}) => {
  const finalClassName = `${s.btn} ${className}`;
  return (
    <button className={finalClassName} onClick={callback} {...restProps}>
      {title}
    </button>
  );
};

import styles from "./Card.module.scss";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`${styles.wrapper} ${className}`}>{children}</div>;
};

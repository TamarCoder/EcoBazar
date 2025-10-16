import styles from "./CustomButton.module.css";
import React from "react";
import { ButtonVariant, ButtonType } from "./button.types";

type ButtonProps = {
  variant: keyof typeof ButtonVariant;
  size: "sm" | "md" | "lg";
  title: string;
  type: keyof typeof ButtonType;
  onClick?: () => void;
  className: string;
};

export default function Button({
  title,
  onClick,
  variant = "PRIMARY",
  size = "md",
  type = "BUTTON",
}: ButtonProps) {
  const buttonClasses = [
    styles.customButton,
    styles[variant.toLowerCase()],
    styles[size],
  ].join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={ButtonType[type] as any}
    >
      {title}
    </button>
  );
}

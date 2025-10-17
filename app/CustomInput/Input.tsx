import styles from './Input.module.css';
import { InputType, InputVariant } from './input.type';
import React, { useState } from "react";



type InputProps = {
    type?: keyof typeof InputType;
    variant? : keyof typeof InputVariant;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    required?: boolean;
}

export default function Input( props: InputProps ) {
  const inputTypeValue = props.type ? InputType[props.type] : undefined;
  const [showPassword, setShowPassword] = useState(false);
  const displayType = props.type === 'Password' && showPassword ? 'Text' : props.type;


  const inputClassNames = [
    styles.inputContainer, 

  ]

  return (
    <div className={inputClassNames.join(' ')}>
         {props.label &&(
            <label className={styles.label}>
                {props.label} 
                {props.required && <span className={styles.required}>{props.label}</span>}
            </label>
         )}

         
    </div> 
  );
}
import React from 'react';
import styles from './CheckBox.module.css'
import CheckIcon from '../icons/CheckIcon'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  disabled,
  onChange,
  className,
  ...props
}) => {
  return (
    <label
      className={styles.label}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        style={{display: 'none'}} 
        {...props}    
      />
      <div 
        className={`${className} ${styles.div} ${disabled ? styles.dis : ''}`}
        
      >
        {checked && (
          <CheckIcon 
          className={styles.CheckBoxIcon} 
          color={disabled ? "primary" : "accent"}
          strokeOpacity={disabled ? "0.4" : "1"} 
          width={40}
          height={40}/>
        )}
      </div>
    </label>
  );
};

export default CheckBox;

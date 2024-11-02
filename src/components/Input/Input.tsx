import React from 'react';
import './Input.css'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, disabled = false, className, placeholder, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div
        className={`input-container ${disabled ? 'input-disabled' : ''} ${className}`}
      >
        <input
          ref={ref}
          type='text'
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className='input-field'
          {...props}
        />
        {afterSlot && <div className="input-icon">{afterSlot}</div>}
      </div>
    );
  }
);


export default Input;

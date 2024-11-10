import React from 'react';
import s from './Input.module.scss';
import cn from 'classnames';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, afterSlot, ...props }, ref) => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
      },
      [onChange],
    );

    return (
      <label className={cn(s.input, props.disabled && s.input_disabled, className)}>
        <input {...props} ref={ref} type="text" value={value} className={s.input__field} onChange={handleChange} />
        {afterSlot && <div className={s.input__after}>{afterSlot}</div>}
      </label>
    );
  },
);

export default Input;

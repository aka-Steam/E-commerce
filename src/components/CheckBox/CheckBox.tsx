import React from 'react';
import cn from 'classnames';
import CheckIcon from '../icons/CheckIcon';
import s from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, disabled, onChange, className, ...props }) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      onChange(event.target.checked);
    },
    [onChange],
  );

  return (
    <label className={cn(s.root, disabled && s[`root_disabled`])}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        style={{ display: 'none' }}
        {...props}
      />
      <div className={cn(s.root__area, disabled && s[`root__area_disabled`], className)}>
        {checked && (
          <CheckIcon className={cn(s.root__icon, disabled && s[`root__icon_disabled`])} width={40} height={40} />
        )}
      </div>
    </label>
  );
};

export default CheckBox;

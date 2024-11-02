import React, { useState, useRef, useEffect } from 'react';
import styles from './MultyDropdown.module.css'
import Input from '../Input'
import ArrowDownIcon from '../icons/ArrowDownIcon';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. 
   * В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<Option[]>(options)
  const [inputValue, setInputValue] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setFilter(options);
  }, [options]);


  // Обработка клика вне компонента для закрытия списка
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (currentValueString: string) => {
    setInputValue(currentValueString);

    const split: string[] = currentValueString.split(',');
    const possibleOptions: Set<Option> = new Set();

    for (const elem of split) {
      const possibleOptionFound = options.filter(option => option.value.includes(elem))
      possibleOptionFound.forEach(option => possibleOptions.add(option));
    }

    // const possibleOption: Option[] = Array.from(possibleOptionsSet);

    setFilter(Array.from(possibleOptions))

    // setSelected(event.target.value);
    // setFilter(event.target.value);

  };

  const handleOptionClick = (option: Option) => {
    if (value.some(selected => selected.key === option.key)) {
      // Убираем опцию из выбранных, если она уже выбрана
      onChange(value.filter(selected => selected.key !== option.key));
    } else {
      // Добавляем опцию к выбранным
      onChange([...value, option]);
    }


  };

  const renderOption = (option: Option, index: number) => (
    <div
      key={option.key}
      onClick={() => handleOptionClick(option)}
      onMouseEnter={() => setHoveredIndex(index)}
      className={`${styles.option} ${value.some(selected => selected.key === option.key) ? styles.selectedOption : ''} ${hoveredIndex === index ? 'hovered' : ''}`}
    >
      {option.value}
    </div>
  );

  return (
    <div className={`${styles.multiDropdownContainer} ${className}`} ref={dropdownRef}>
      <Input
        placeholder={getTitle([])}
        value={value.length > 0 ? getTitle(value) : inputValue}
        onClick={() => !disabled && value.length > 0 ? setIsOpen(!isOpen) : !isOpen && setIsOpen(true)}
        onChange={(v) => handleInputChange(v)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
        // className={styles.input}

      />
      {isOpen && !disabled && (
        <div className={styles.dropdownList}>
          {options.length > 0 ? (
            filter.map(renderOption)
          ) : (
            <div className={styles.noOptions} >Нет доступных опций</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;

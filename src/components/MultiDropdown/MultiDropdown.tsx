import React, { useState, useRef, useEffect } from 'react';
import s from './MultyDropdown.module.scss';
import cn from 'classnames';
import Input from '../Input';
import Text from 'components/Text'
import ArrowDownIcon from 'components/icons/ArrowDownIcon';

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

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLInputElement>(null);
  const [filter, setFilter] = React.useState('');
  const [isOpened, setIsOpened] = React.useState(false);
  
  const open = () => {
    setIsOpened(true);
  };
  
  React.useEffect(() => {
    const handlerClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLDivElement)) {
        setIsOpened(false);
      }
    };
  
    window.addEventListener("click", handlerClick);
  
    return () => {
      window.removeEventListener("click", handlerClick);
    }
  }, []);
  
  React.useEffect(() => {
    if (isOpened) {
      setFilter('');
    }
  }, [isOpened]);
  
  const title = React.useMemo(() => getTitle(value), [getTitle, value]);
  
  const isEmpty = value.length === 0;

  const filteredOptions = React.useMemo(() => {
    const str = filter.toLocaleLowerCase();
    return options.filter((o) => o.value.toLocaleLowerCase().indexOf(str) === 0);
  }, [filter, options]);
  
  const selectedKeysSet = React.useMemo<Set<Option['key']>>(
    () => 
      new Set(value.map(({ key }) => key)),
    [value]
  );
  
  const onSelect = React.useCallback(
    (option: Option) => {
      if (disabled) {
        return;
      }
  
      if (selectedKeysSet.has(option.key)) {
        onChange([...value].filter(({ key }) => key !== option.key));
      } else {
        onChange([...value, option]);
      }

      ref.current?.focus();
    },
    [disabled, onChange, value, selectedKeysSet]
  );
    
  const opened = isOpened && !disabled;

return (
<div
  ref={wrapperRef}
  className={cn(
    s['multi-dropdown'],
    className,
  )}
>
  <Input
    onClick={open}
    ref={ref}
    disabled={disabled}
    placeholder={title}
    className={s['multi-dropdown__field']}
    value={opened ? filter : isEmpty ? '' : title}
    onChange={setFilter}
    afterSlot={<ArrowDownIcon color="secondary" />}
  />
  {opened && (
    <div className={s['multi-dropdown__options']}>
      {filteredOptions.map((option) => (
        <button
          className={cn(
            s['multi-dropdown__option'],
            selectedKeysSet.has(option.key) && s['multi-dropdown__option_selected'],
          )}
          key={option.key}
          onClick={() => {onSelect(option)}}
        >
          <Text view="p-16">
            {option.value}
          </Text>
        </button>
      ))}
    </div>
  )}
</div>

);

  // const [isOpen, setIsOpen] = useState(false);
  // const [filter, setFilter] = useState<Option[]>(options)
  // const [inputValue, setInputValue] = useState('');
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // const dropdownRef = useRef<HTMLDivElement>(null);


  // useEffect(() => {
  //   setFilter(options);
  // }, [options]);


  // // Обработка клика вне компонента для закрытия списка
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // const handleInputChange = (currentValueString: string) => {
  //   setInputValue(currentValueString);

  //   const split: string[] = currentValueString.split(',');
  //   const possibleOptions: Set<Option> = new Set();

  //   for (const elem of split) {
  //     const possibleOptionFound = options.filter(option => option.value.includes(elem))
  //     possibleOptionFound.forEach(option => possibleOptions.add(option));
  //   }
  //   setFilter(Array.from(possibleOptions))
  // };

  // const handleOptionClick = (option: Option) => {
  //   if (value.some(selected => selected.key === option.key)) {
  //     // Убираем опцию из выбранных, если она уже выбрана
  //     onChange(value.filter(selected => selected.key !== option.key));
  //   } else {
  //     // Добавляем опцию к выбранным
  //     onChange([...value, option]);
  //   }
  // };

  // const renderOption = (option: Option, index: number) => (
  //   <div
  //     key={option.key}
  //     onClick={() => handleOptionClick(option)}
  //     onMouseEnter={() => setHoveredIndex(index)}
  //     className={`${styles.option} ${value.some(selected => selected.key === option.key) ? styles.selectedOption : ''} ${hoveredIndex === index ? 'hovered' : ''}`}
  //   >
  //     {option.value}
  //   </div>
  // );

  // return (
  //   <div className={`${styles.multiDropdownContainer} ${className}`} ref={dropdownRef}>
  //     <Input
  //       placeholder={getTitle([])}
  //       value={value.length > 0 ? getTitle(value) : inputValue}
  //       onClick={() => !disabled && value.length > 0 ? setIsOpen(!isOpen) : !isOpen && setIsOpen(true)}
  //       onChange={(v) => handleInputChange(v)}
  //       disabled={disabled}
  //       afterSlot={<ArrowDownIcon color="secondary" />}
  //       // className={styles.input}

  //     />
  //     {isOpen && !disabled && (
  //       <div className={styles.dropdownList}>
  //         {options.length > 0 ? (
  //           filter.map(renderOption)
  //         ) : (
  //           <div className={styles.noOptions} >Нет доступных опций</div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default MultiDropdown;

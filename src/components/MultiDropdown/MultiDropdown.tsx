import React from 'react';
import cn from 'classnames';
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { Option, MultiDropdownProps } from './types';
import s from './MultiDropdown.module.scss';

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

  const open = React.useCallback(() => {
    setIsOpened(true);
  }, []);

  React.useEffect(() => {
    const handlerClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLDivElement)) {
        setIsOpened(false);
      }
    };

    window.addEventListener('click', handlerClick);

    return () => {
      window.removeEventListener('click', handlerClick);
    };
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

  const selectedKeysSet = React.useMemo<Set<Option['key']>>(() => new Set(value.map(({ key }) => key)), [value]);

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
    [disabled, onChange, value, selectedKeysSet],
  );

  const opened = isOpened && !disabled;

  return (
    <div ref={wrapperRef} className={cn(s['multi-dropdown'], className)}>
      <Input
        onClick={open}
        ref={ref}
        disabled={disabled}
        placeholder={title}
        className={s['multi-dropdown__field']}
        value={opened ? filter : isEmpty ? '' : title}
        onChange={setFilter}
        afterSlot={<ArrowDownIcon className={s['multi-dropdown__icon']} />}
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
              onClick={() => {
                onSelect(option);
              }}
            >
              <Text view="p-16">{option.value}</Text>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;

import React from 'react';
import cn from 'classnames';
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { Option, MultiDropdownProps, BETA_MultiDropdownProps } from './types';
import { observer } from 'mobx-react-lite';
import s from './MultiDropdown.module.scss';

const MultiDropdown: React.FC<BETA_MultiDropdownProps> = ({ store, className }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLDivElement)) {
        store.close();
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [store]);

  return (
    <div ref={wrapperRef} className={cn(s['multi-dropdown'], className)}>
      <Input
        // onClick={store.toggle} // TODO  возникает ошибка при использовании isOpened
        onClick={() => store.toggle()}
        ref={inputRef}
        placeholder={store.title}
        className={s['multi-dropdown__field']}

        value={store.isOpened ? store.filter : store.isEmpty ? '' : store.title}
        // onChange={store.setFilter} // TODO
        onChange={(v) => store.setFilter(v)}
        afterSlot={<ArrowDownIcon className={s['multi-dropdown__icon']} />}
      />
      {store.isOpened && (
        <div className={s['multi-dropdown__options']}>
          {store.filteredOptions.map((option) => (
            <button
              key={option.key}
              className={cn(
                s['multi-dropdown__option'],
                store.selectedKeysSet.has(option.key) && s['multi-dropdown__option_selected'],
              )}
              onClick={() => store.selectOption(option)}
            >
              <Text view="p-16">{option.value}</Text>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


export default observer(MultiDropdown);

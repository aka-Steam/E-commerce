import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { MultiDropdownProps } from './types';

import { useStore } from 'stores/local/ProductsListStore';
import * as s from './MultiDropdown.module.scss';


const MultiDropdown: React.FC<MultiDropdownProps> = ({ className }) => {
  const productsListStore = useStore();

  const store = productsListStore.filterStore;

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
        onClick={store.toggle}
        ref={inputRef}
        placeholder={store.title}
    
        value={store.isOpened ? store.filter : store.isEmpty ? '' : store.title}
        onChange={store.setFilter}
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
};

export default observer(MultiDropdown);

import { action, computed, makeObservable, observable, runInAction, reaction } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export class MultiDropdownModel implements ILocalStore {
  value: Option[] = []; // Установленные опции
  options: Option[] = []; // Список всех доступных опций в приложении
  filter: string = ''; // строковое представление выбранных опций
  isOpened: boolean = false;

  selectedOptions: Option[] = []; // Буффер выбранных обций для корректной работы с query параметрами

  constructor(initialOptions: Option[] = []) {
    this.options = initialOptions;

    makeObservable<MultiDropdownModel>(this, {
      value: observable,
      options: observable.ref,
      selectedOptions: observable,
      filter: observable,
      isOpened: observable,
      filteredOptions: computed,
      selectedKeysSet: computed,
      selectedKeys: computed,
      title: computed,
      isEmpty: computed,
      open: action.bound,
      close: action.bound,
      toggle: action.bound,
      setFilter: action.bound,
      setValue: action.bound,
      selectOption: action.bound,
      getOptionsByKeys: action.bound,
    });
  }



  get isEmpty() {
    return this.value.length === 0;
  }

  // Отсеянные по строковому представлению фильтра опции
  get filteredOptions() {
    const str = this.filter.toLocaleLowerCase();
    return this.options.filter((o) => o.value.toLocaleLowerCase().includes(str));
  }

  get selectedKeysSet() {
    return new Set(this.value.map(({ key }) => key));
  }

  get selectedKeys() {
  

    return this.value.map(({ key }) => key);
  }

  get title() {
    return this.value.length === 0 ? 'Filter' : this.value.map(({ value }) => value).join(', ');
  }

  open() {
    this.isOpened = true;
    this.filter = ''; // Сбрасываем фильтр при открытии
  }

  close() {
    this.isOpened = false;
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

  setFilter(filter: string) {
    this.filter = filter;
  }

  setValue(value: Option[]) {
    this.value = value;
  }

  selectOption(option: Option) {
    if (this.selectedKeysSet.has(option.key)) {
      this.value = this.value.filter(({ key }) => key !== option.key);
    } else {
      this.value = [...this.value, option];
    }
  }

  setVelueByKeys(keys: string[] = []) {
    if (this.options.length > 0) {
      // Берем только уникальные key
      const keysSet = new Set(keys);
      this.value = this.options.filter((option) => keysSet.has(option.key));
    }
  };

  setSelectedOptions(options: Option[]) {
    this.selectedOptions = options;
  };

  getOptionsByKeys(keys: string[] = []) {
    return this.options.filter((option) => keys.includes(option.key));
  }

  destroy(): void {
  }
}

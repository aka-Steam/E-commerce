import { action, computed, makeObservable, observable, runInAction, reaction } from 'mobx';
import axiosInstance from 'utils/axiosInstanse';
import { ILocalStore } from 'utils/useLocalStore';
import Meta from 'utils/meta';
import { normalizeProductInfo, ProductInfoModel } from '../models/products';
import React from 'react';

type PrivateFields = '_products' | '_meta';
//Todo - props?

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


  private reactionSelectedOptions = reaction(
    // Первый аргумент – колбэк, который возвращает отслеживаемые поля
    () => this.selectedOptions,
  
    // Второй аргумент – колбэк, в котором выполняется желаемая логика
    (newSelectedOptionsValue) => {console.log("reactionValue"), this.value = newSelectedOptionsValue }
  );


  private reactionValue = reaction(
    // Первый аргумент – колбэк, который возвращает отслеживаемые поля
    () => this.value,
  
    // Второй аргумент – колбэк, в котором выполняется желаемая логика
    (nvalue) => {console.log("reactionValue") }
  );


  constructor(initialOptions: Option[] = []) {
    this.options = initialOptions;
    // TODO <multiDropdownModel, PrivateFields>
    makeObservable(this, {
      value: observable,
      options: observable.ref,
      selectedOptions: observable,
      filter: observable,
      isOpened: observable,
      filteredOptions: computed,
      selectedKeysSet: computed,
      title: computed,
      isEmpty: computed,
      Vvalue: computed,
      open: action,
      close: action,
      toggle: action,
      setFilter: action,
      setValue: action.bound,
      selectOption: action,
      getOptionsByKeys: action,
    });
  }


get Vvalue(){
  return this.value;
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

  setVelueByKeys = (keys: string[] = []) => {
    if (this.options.length > 0) {
      console.log("setValueBy case - ", keys)
      // Берем только уникальные key
      const keysSet = new Set(keys);
      this.value = this.options.filter((option) => keysSet.has(option.key));
    }
  };

  setSelectedOptions = (options: Option[]) => {
    this.selectedOptions = options;
  };

  getOptionsByKeys(keys: string[] = []) {
    return this.options.filter((option) => keys.includes(option.key));
  }

  destroy(): void {
    this.reactionValue;
    this.reactionSelectedOptions
  }
}

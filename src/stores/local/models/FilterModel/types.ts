export type Categoty = {
  id: number;
  image: string;
  name: string;
};

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

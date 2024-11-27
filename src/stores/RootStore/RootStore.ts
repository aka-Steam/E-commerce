import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
    setSearch(arg0: { search: string; }): import("react").MouseEventHandler<HTMLButtonElement> | undefined {
      throw new Error('Method not implemented.');
    }
    readonly query = new QueryParamsStore();
  }
import React from 'react';
import cn from 'classnames';
import Input from 'components/Input';
import Button from 'components/Button';
import { useStore } from 'stores/local/ProductsListStore';
import rootStore from 'stores/global/RootStore';
import s from './SearchBar.module.scss';

export type SearchBarProps = {
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const store = useStore();

  const handleSearch = React.useCallback(() => {
    store.fetchProducts();
    rootStore.query.setParam('search', store.searchStore.searchValue);
  }, [store.searchStore]);

  return (
    <div className={cn(s['search-bar'], className)}>
      <Input
        value={store.searchStore.searchValue}
        onChange={store.searchStore.setSearchValue}
        placeholder="Search product"
      ></Input>
      <Button onClick={handleSearch}>Find now</Button>
    </div>
  );
};

export default SearchBar;

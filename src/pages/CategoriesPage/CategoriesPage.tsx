import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useLocalStore } from 'utils/useLocalStore';
import CategoriesStore from 'stores/local/CategoriesStore';
import CategoryCard from 'components/CategoryCard';
import Text from 'components/Text';
import Loader from 'components/Loader';
import Meta from 'utils/meta';
import * as s from './CategoriesPage.module.scss';

const CategoriesPage: React.FC = () => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  React.useEffect(() => {
    categoriesStore.fetchCategories();
  }, []);

  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      <section className={s.hero}>
        <Text view="title" className={s.hero__title}>
          Categories
        </Text>
        <Text view="p-20" color="secondary" className={s.hero__subtitle}>
          Here you can find all product categories organized for your convenience
        </Text>
      </section>
      {categoriesStore.meta === Meta.loading || categoriesStore.meta === Meta.error ? (
        <div className={s[`state-сontainer`]}>
          {categoriesStore.meta === Meta.loading ? (
            <Loader />
          ) : (
            <Text view="p-20" color="primary">
              Error loading categories
            </Text>
          )}
        </div>
      ) : (
        <div className={s.grid}>
          {categoriesStore.categories.map((category) => (
            <CategoryCard key={category.id} id={category.id} name={category.name} image={category.image} />
          ))}
        </div>
      )}
    </main>
  );
};

export default observer(CategoriesPage);

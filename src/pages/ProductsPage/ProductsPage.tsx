import Text from 'components/Text';

import s from './ProductsPage.module.scss'

const PoductsPaje = () => {
  return (
    <main>
      <div className={s.titleContainer}>
        <Text tag={'h1'} weight={'bold'}>Products</Text>
        <Text  weight={'bold'}>We display products based on the latest products we have, if you want
        to see our old products please enter the name of the item</Text>
      </div>
    </main>
  );
};

export default PoductsPaje;

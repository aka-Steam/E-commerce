import s from './OnePoductPaje.module.scss';
import BackButton from './components/BackButton';
import Carousel from './components/Carousel';
import Text from 'components/Text';
import Button from 'components/Button';

const OnePoductPaje = () => {
  return (
    <main className={s.main}>
      <BackButton className={s.backButton}>Назад</BackButton>
      
      <div className={s.productInfoContainer}>
        <Carousel />
        <div className={s.productDescription}>
          <Text className={s.title} view="title" tag="h1">
            White Aesthetic Chair
          </Text>
          <Text className={s.subtitle} view="p-20" tag="div" color="secondary">
            Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day
            comfort and support
          </Text>
          <Text className={s.price} view="title" tag="div">
            $99.98
          </Text>
          <div className={s.actionGroup}>
            <Button>Buy Now</Button>
          </div>
        </div>
      </div>
      <div className={s.relatedItemsContainer}>
        <Text className={s.reletadItemsTitle} tag="h2" weight="bold">Related Items</Text>
      </div>
    </main>
  );
};

export default OnePoductPaje;

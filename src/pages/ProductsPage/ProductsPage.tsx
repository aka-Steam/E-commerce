import React, { useState } from 'react'

import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown, {Option} from 'components/MultiDropdown';
import Pagination from 'components/Pagination';

import s from './ProductsPage.module.scss';

const PoductsPaje = () => {
  
  const OPTIONS = [
    { key: 'msk', value: 'Moscow' },
    { key: 'spb', value: 'Saint Petersburg' },
    { key: 'ekb', value: 'Ekaterinburg' },
  ];
  
  const [value, setValue] = React.useState<Option[]>( []);

  return (
    <main className={s.main}>
      <div className={s.titleContainer}>
        <Text className={s.title} view={'title'}>
          Products
        </Text>
        <Text className={s.subtitle} view={'p-20'} weight={'normal'} color={'secondary'}>
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>
      <div className={s.controlsContainer}>
        <div className={s.controlsContainerGroup}>
          <Input placeholder={'Search product'}></Input>
          <Button>Find now</Button>
        </div>

        <MultiDropdown
          className={s.filter}
          options={OPTIONS}
          value={value}
          onChange={setValue}
          getTitle={(values: Option[]) => values.length === 0 ? 'Filter': values.map(({ value }) => value).join(', ')}
        />
        
      </div>
      <div className={s.contentContainer}>
        <div className={s.contentTitleContainer}>
          <Text className={s.contentTitle} tag={'h2'} weight={'bold'}>
            Total Product
          </Text>
          <Text tag='div' view='p-20' weight='bold' color='accent' className={s.contentCounter}>184</Text>
        </div>
        <Pagination currentPage={1} totalPages={10} onPageChange={(cp: any)=>{console.log(cp)}}></Pagination>
      </div>
    </main>
  );
};

export default PoductsPaje;

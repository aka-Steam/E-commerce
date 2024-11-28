import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom'; 
import qs from 'qs';
import rootStore from 'stores/global/RootStore/instance';

interface QueryParamsConnectorProps {
  store: {
    params: Record<string, any>;
    setParams: (params: Record<string, any>) => void;
  };
}

/**
 * Компонент-коннектор для синхронизации стора с URL
 */
const QueryParamsConnector: React.FC<QueryParamsConnectorProps> = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  // Синхронизация URL -> Store
  useEffect(() => {
    rootStore.query.setSearch(location.search);
  }, [location.search, rootStore.query]);

  // Синхронизация Store -> URL
  useEffect(() => {
    const currentParams = qs.stringify(rootStore.query.params, { addQueryPrefix: true });
    if (currentParams !== location.search) {
      navigate(`${location.pathname}${currentParams}`, { replace: true });
    }
  }, [rootStore.query.params, location]);

  return null; // Компонент не рендерит ничего
});

export default QueryParamsConnector;

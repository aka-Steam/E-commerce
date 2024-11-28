import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom'; // для работы с URL
import qs from 'qs';
import rootStore from '../../stores/RootStore/instance';

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
    // const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
    rootStore.query.setSearch(location.search);
  }, [location.search, rootStore.query]);

  // Синхронизация Store -> URL
  useEffect(() => {
    const currentParams = qs.stringify(rootStore.query.params, { addQueryPrefix: true });
// debugger;
    if (currentParams !== location.search) {
    
        navigate(`${location.pathname}${currentParams}`, { replace: true });
        //   history.replace({
    //     ...location,
    //     search: currentParams,
    //   });
    }
  }, [rootStore.query.params, location]);

  return null; // Компонент не рендерит ничего
});

export default QueryParamsConnector;

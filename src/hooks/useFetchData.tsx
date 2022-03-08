import React, { useEffect, useState, useCallback } from "react";
import { requestHandler } from "../helpers/requestHandler";
import { UserContext } from "../App";

type Options = {
  url?: string;
  route: string;
  type: string;
  body?: any;
  credentials?: "same-origin" | "include" | "omit" | undefined;
  contentType?: string;
};

type Error = {
  errors: any;
  type?: string;
};

const useFetchData = (options: Options, id: string, shouldPersist = false, shouldCache = true, timesToFetch = 1) => {
  let currentUrl = localStorage.getItem("currentUrl");
  const [currentData, setCurrentData] = useState<any>(null);
  const [error, setError] = useState<Error | unknown>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { currentCacheData, setCurrentCacheData } = React.useContext(UserContext);

  const getItem = useCallback(async () => {
    if (shouldPersist) {
      let item = localStorage.getItem(id);
      if (item && item !== currentCacheData[id]) {
        let parsed = await JSON.parse(item);
        setCurrentData(parsed);
        setCurrentCacheData(item, id);
      }
    }
  }, [currentCacheData[id], id, setCurrentCacheData, shouldPersist]);

  const setCacheData = useCallback(() => {
    if (currentCacheData[id] && shouldCache) {
      setCurrentData(JSON.parse(currentCacheData[id]));
    }
  }, [currentCacheData[id], shouldCache]);

  useEffect(() => {
    getItem();
    setCacheData();
  }, [id, getItem, setCacheData]);

  const fetchData = () => {
    setIsFetching(true);
    for (let i = 0; i < timesToFetch; i++) {
      let dataString: string;
      try {
        const reqOptions = options;
        reqOptions.url = reqOptions?.url || currentUrl;
        requestHandler(reqOptions).then((data: any) => {
          if (shouldCache) dataString = JSON.stringify(data);

          //equality check between in memory cache and data from server
          if (dataString !== currentCacheData[id] && shouldCache) {
            // only re-render and cache if data has changed
            setCurrentCacheData(dataString, id);
            setCurrentData(data);
            shouldPersist && localStorage.setItem(id, dataString);
          } else if (!shouldCache) {
            setCurrentData(data);
          }

          setError(null);
          setIsFetching(false);
        });
      } catch (error) {
        setError(error);
      }
    }
  };

  return {
    data: currentData,
    isFetching,
    error,
    fetchData,
    refresh: getItem,
  };
};

export default useFetchData;

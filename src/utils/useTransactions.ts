/* eslint-disable unicorn/filename-case */
import { useState, useEffect } from 'react';
import http from 'utils/http';

interface IHash {
  hash: string;
}

export default (page: number, txHashes: IHash[]) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!txHashes) return;
    setData(null);
    const keys = txHashes.slice((page - 1) * 5, page * 5);

    const promiseList: any = [];
    keys.forEach((key) => {
      promiseList.push(
        new Promise(function p(resolve) {
          http.get(`/rawtx/${key.hash}`).then((res) => {
            resolve(res);
          });
        })
      );
    });
    Promise.all(promiseList).then((res) => {
      setLoading(false);
      setData(res);
    });
  }, [txHashes, page]);
  return {
    data,
    loading,
  };
};

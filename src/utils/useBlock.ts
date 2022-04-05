/* eslint-disable unicorn/filename-case */
import { useState, useEffect } from 'react';
import http from 'utils/http';

export default (key: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!key) return;
    setLoading(true);
    setData(null);
    setError(null);
    http
      .get(`/rawblock/${key}`)
      .then((res: any) => {
        setLoading(false);
        setData(res);
      })
      .catch((err: any) => {
        setLoading(false);
        setError(err);
      });
  }, [key]);
  return {
    loading,
    error,
    data,
  };
};

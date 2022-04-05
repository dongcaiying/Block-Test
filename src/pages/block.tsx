import React, { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Input, Spin, Descriptions, Pagination } from 'antd';

import useBlock from 'utils/useBlock';
import useTransactions from 'utils/useTransactions';

import './block.css';

const { Item } = Descriptions;

const Block = () => {
  const { pathname } = useLocation();
  const [current, setCurrent] = useState(1);

  const { data, loading } = useBlock(pathname.replace('/', ''));

  const { data: transactions, loading: transactionsLoading } = useTransactions(current, data ? data.tx : null);
  useEffect(() => {
    return () => {
      setCurrent(1);
    };
  }, []);
  const handleSearch = (val) => {
    window.location.pathname = val;
  };
  const handlePage = useCallback((page) => {
    setCurrent(page);
  }, []);

  return (
    <div className="block-container">
      <Input.Search placeholder="请输入" size="large" onSearch={handleSearch} style={{ marginBottom: '2rem' }} />
      <Spin spinning={loading}>
        <Descriptions title={`Block ${data ? data.block_index : ''}`} column={1}>
          <Item label="Hash">{data ? data.hash : ''}</Item>
          <Item label="Number of Transactions">{data ? data.tx.length : ''}</Item>
        </Descriptions>
      </Spin>
      <Spin spinning={transactionsLoading}>
        {transactions && transactions.length
          ? transactions.map((t, index) => {
              return (
                <Descriptions title={index === 0 ? 'Block Transactions' : ''} column={1} key={t.hash}>
                  <Descriptions.Item label="Fee">{t.fee}</Descriptions.Item>
                  <Descriptions.Item label="Hash">{t.hash}</Descriptions.Item>
                </Descriptions>
              );
            })
          : null}
        {data && data.tx && data.tx.length ? (
          <Pagination
            defaultCurrent={1}
            total={data.tx.length / 5}
            pageSize={5}
            current={current}
            showSizeChanger={false}
            onChange={handlePage}
          />
        ) : null}
      </Spin>
    </div>
  );
};

export default Block;

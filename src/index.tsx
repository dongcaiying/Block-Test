import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';

ReactDOM.render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);

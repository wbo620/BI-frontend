import {GithubOutlined, PhoneFilled, QqOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import {useIntl} from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'ICE出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'QQ',
          title: <QqOutlined/>,
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined/>,
          href: 'https://gitee.com/wbo620',
          blankTarget: true,
        },
        {
          key: 'wbo',
          title: 'wbo',
          href: 'https://gitee.com/wbo620',
          blankTarget: true,
        },
        {
          key: 'phone',
          title: <PhoneFilled/>,
          href: 'https://gitee.com/wbo620',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;

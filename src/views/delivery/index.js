import React from 'react';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addMenu } from 'redux/slices/menu';
import { useTranslation } from 'react-i18next';
import getSystemIcons from 'helpers/getSystemIcons';

export default function Delivery() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const list = user.urls
    .find((item) => item.id === 'user_management')
    .submenu.find((item) => item.id === 'deliveries');

  const addMenuItem = (payload) => {
    const data = { ...payload, icon: undefined };
    dispatch(addMenu(data));
  };

  return (
    <div className='product-container'>
      <Row gutter={8}>
        {list?.children.map((item) => (
          <Col span={6} key={item.id}>
            <Card className='card-view' hoverable>
              <Link
                to={`/${item.url}`}
                className='d-flex justify-content-center align-items-center'
                onClick={() => addMenuItem(item)}
              >
                {getSystemIcons(item.icon)}
                <span className='text'>{t(item.name)}</span>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

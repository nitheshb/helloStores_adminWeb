import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, Col, Form, Input, InputNumber, Row } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { removeFromMenu, setMenuData } from '../../../redux/slices/menu';
import { useTranslation } from 'react-i18next';
import LanguageList from '../../../components/language-list';
import sellerbookingService from '../../../services/seller/booking-zone';
import MediaUpload from 'components/upload';

const BookingZoneAdd = () => {
  const { t } = useTranslation();
  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [image, setImage] = useState(
    activeMenu.data?.image ? [activeMenu.data?.image] : [],
  );
  const { defaultLang, languages } = useSelector(
    (state) => state.formLang,
    shallowEqual,
  );
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    return () => {
      const data = form.getFieldsValue(true);
      dispatch(setMenuData({ activeMenu, data }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    const body = {
      ...values,
      area: String(values.area),
      images: image?.map((img) => img.name),
    };
    setLoadingBtn(true);
    const nextUrl = 'seller/booking/zone';
    sellerbookingService

      .create(body)
      .then(() => {
        toast.success(t('successfully.created'));
        navigate(`/${nextUrl}`);
        dispatch(removeFromMenu({ ...activeMenu, nextUrl }));
      })
      .finally(() => setLoadingBtn(false));
  };

  return (
    <Card title={t('add.booking.zone')} extra={<LanguageList />}>
      <Form
        name='basic'
        layout='vertical'
        onFinish={onFinish}
        form={form}
        initialValues={{ active: true, ...activeMenu.data }}
      >
        <Row gutter={12}>
          <Col span={12}>
            {languages.map((item) => (
              <Form.Item
                key={'title' + item.id}
                label={t('title')}
                name={['title', item.locale]}
                rules={[
                  {
                    required: item.locale === defaultLang,
                    message: t('required'),
                  },
                ]}
                hidden={item.locale !== defaultLang}
              >
                <Input />
              </Form.Item>
            ))}
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('area')}
              name='area'
              rules={[
                { required: true, message: t('required') },
                {
                  validator(_, value) {
                    if (value < 0) {
                      return Promise.reject(new Error(t('must.be.at.least.0')));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber className='w-100' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('image')}
              name='images'
              rules={[
                { required: image?.length === 0, message: t('required') },
              ]}
            >
              <MediaUpload
                type='shop-galleries'
                imageList={image}
                setImageList={setImage}
                form={form}
                multiple={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type='primary' htmlType='submit' loading={loadingBtn}>
          {t('save')}
        </Button>
      </Form>
    </Card>
  );
};

export default BookingZoneAdd;

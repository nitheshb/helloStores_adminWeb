import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Table,
  Tag,
  DatePicker,
  Spin,
  Menu,
  Dropdown,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { addMenu, disableRefetch } from 'redux/slices/menu';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ReportChart from 'components/report/chart';
import moment from 'moment';
import { ReportContext } from 'context/report';
import FilterColumns from 'components/filter-column';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  fetchOrderProduct,
  fetchOrderProductChart,
} from 'redux/slices/report/order';
import useDidUpdate from 'helpers/useDidUpdate';
import numberToPrice from 'helpers/numberToPrice';

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

const ReportOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { date_from, date_to, by_time, chart, handleChart, handleDateRange } =
    useContext(ReportContext);
  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);
  const {
    loading,
    chartData: reportData,
    productList: reportProducts,
  } = useSelector((state) => state.orderReport, shallowEqual);
  const { defaultCurrency } = useSelector(
    (state) => state.currency,
    shallowEqual,
  );
  const initialColumns = [
    {
      title: t('order.id'),
      dataIndex: 'id',
      key: 'id',
      is_show: true,
      render: (_, data) => (
        <span onClick={() => goToShow(data)}>#{data.id}</span>
      ),
    },
    {
      title: t('status'),
      dataIndex: 'items_sold',
      key: 'items_sold',
      is_show: true,
      render: (_, row) => <Tag>{row.status}</Tag>,
    },
    {
      title: t('customer'),
      dataIndex: 'user_firstname',
      key: 'user_firstname',
      is_show: true,
      render: (_, data) => <>{`${data.firstname} ${data.lastname}`}</>,
    },
    {
      title: t('customer.type'),
      key: 'user_active',
      dataIndex: 'user_active',
      is_show: true,
      render: (_, data) => {
        const status = Boolean(data.active);
        return (
          <Tag color={status ? 'green' : 'red'} key={data.id}>
            {status ? 'Active' : 'Inactive'}
          </Tag>
        );
      },
    },
    {
      title: t('products'),
      key: 'category',
      dataIndex: 'category',
      is_show: true,
      render: (_, data) => {
        if (data.products?.length > 1) {
          return (
            <>
              <p>{data.products[0]}</p>

              <Dropdown
                overlay={
                  <Menu>
                    {data.products
                      ?.slice(1, data.products.length)
                      .map((item, key) => (
                        <Menu.Item key={key}>{item}</Menu.Item>
                      ))}
                  </Menu>
                }
              >
                <Tag style={{ cursor: 'pointer' }}>{`+ ${
                  data.products?.length - 1
                } more`}</Tag>
              </Dropdown>
            </>
          );
        } else {
          return <>{data.products[0]}</>;
        }
      },
    },
    {
      title: t('item.sold'),
      key: 'item_sold',
      dataIndex: 'item_sold',
      is_show: true,
      render: (_, data) => {
        return Number(data.quantity);
      },
    },
    {
      title: t('net.sales'),
      key: 'price',
      dataIndex: 'price',
      is_show: true,
      render: (_, data) => {
        return (
          <>
            {numberToPrice(
              data.price,
              defaultCurrency?.symbol,
              defaultCurrency?.position,
            )}
          </>
        );
      },
    },
  ];
  const [columns, setColumns] = useState(initialColumns);

  const performance = [
    {
      label: t('item.sold'),
      value: 'quantity',
      price: false,
      qty: 'quantity',
    },
    {
      label: t('net.sales'),
      value: 'price',
      price: true,
      qty: 'price',
    },
    {
      label: t('avg.order.price'),
      value: 'avg_price',
      price: true,
      qty: 'avg_price',
    },
    {
      label: t('orders'),
      value: 'count',
      price: false,
      qty: 'count',
    },
  ];

  useDidUpdate(() => {
    setColumns(initialColumns);
  }, [i18n?.store?.data?.[`${i18n?.language}`]?.translation]);

  const goToShow = (row) => {
    dispatch(
      addMenu({
        url: `order/details/${row.id}`,
        id: 'order_details',
        name: t('order.details'),
      }),
    );
    navigate(`/order/details/${row.id}`);
  };

  const fetchReport = () => {
    if (performance.find((item) => item.value === chart)) {
      const data = {
        date_from,
        date_to,
        type: by_time,
        chart,
      };
      dispatch(fetchOrderProductChart(data));
    }
  };

  const fetchProduct = (page, perPage) => {
    dispatch(
      fetchOrderProduct({
        date_from,
        date_to,
        by_time,
        chart,
        page,
        perPage,
      }),
    );
  };

  useEffect(() => {
    handleChart(performance[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeMenu.refetch) {
      fetchProduct();
      fetchReport();
      dispatch(disableRefetch(activeMenu));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu.refetch]);

  useDidUpdate(() => {
    fetchProduct();
  }, [date_to, by_time, chart, date_from]);

  useDidUpdate(() => {
    fetchReport();
  }, [date_to, by_time, chart, date_from]);

  const onChangePagination = (pagination) => {
    const { pageSize: perPage, current: page } = pagination;
    fetchProduct(page, perPage);
  };

  return (
    <Spin size='large' spinning={loading}>
      <Row gutter={24} className='mb-3'>
        <Col span={12}>
          <Space size='large'>
            <RangePicker
              defaultValue={[moment(date_from), moment(date_to)]}
              onChange={handleDateRange}
            />
          </Space>
        </Col>
      </Row>
      <Row gutter={24} className='report-products'>
        {performance?.map((item) => (
          <Col
            span={6}
            key={item.label}
            onClick={() => handleChart(item.value)}
          >
            <Card className={chart === item.value && 'active'}>
              <Row className='mb-5'>
                <Col>
                  <Text>{item.label}</Text>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={18}>
                  <Title level={2}>
                    {!item.price
                      ? reportData[item.qty]
                      : numberToPrice(
                          reportData[item.qty],
                          defaultCurrency?.symbol,
                          defaultCurrency?.position,
                        )}
                  </Title>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      <ReportChart reportData={reportData} chart_data='price_avg' />
      <Row gutter={24}>
        <Col span={24}>
          <Card>
            <Space className='d-flex justify-content-between'>
              <Text level={3}>{t('orders')}</Text>
              <Space className='d-flex justify-content-end'>
                <FilterColumns columns={columns} setColumns={setColumns} />
              </Space>
            </Space>

            <Table
              columns={columns?.filter((item) => item.is_show)}
              dataSource={reportProducts?.data}
              rowKey={(row) => row.id}
              loading={loading}
              pagination={{
                pageSize: reportProducts?.per_page,
                page: reportProducts?.current_page || 1,
                total: reportProducts?.total,
                defaultCurrent: 1,
              }}
              onChange={onChangePagination}
              scroll={{ x: 1200 }}
            />
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

export default ReportOrder;

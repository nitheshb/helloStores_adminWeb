import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Table,
  Tag,
  Button,
  DatePicker,
  Spin,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { CloudDownloadOutlined } from '@ant-design/icons';
import ReportService from '../../services/reports';
import { disableRefetch } from '../../redux/slices/menu';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ReportContext } from '../../context/report';
import FilterColumns from '../../components/filter-column';
import useDidUpdate from '../../helpers/useDidUpdate';
import { useLocation } from 'react-router-dom';
import QueryString from 'qs';
import numberToPrice from '../../helpers/numberToPrice';
import {
  fetchExtrasChart,
  fetchExtrasList,
} from '../../redux/slices/report/extras';
import ReportChart from '../../components/report/chart';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

const ReportExtras = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const category_id = QueryString.parse(location.search, [])['?category_id'];
  const product_id = QueryString.parse(location.search, [])['?product_id'];
  const { date_from, date_to, by_time, chart, handleChart, handleDateRange } =
    useContext(ReportContext);

  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);

  const {
    loading,
    chartData: reportData,
    extrasList,
  } = useSelector((state) => state.extrasReport, shallowEqual);

  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const { defaultCurrency } = useSelector(
    (state) => state.currency,
    shallowEqual,
  );

  const expandedRowRender = (row) => {
    // const data = row.stocks
    //   .map((stock) => stock.extras)
    //   .filter((extras) => extras.length > 0);

    const columns = [
      {
        title: t('extras.group'),
        dataIndex: 'Extras Group',
        render: (_, data) =>
          data.extras
            ?.map((extra) => extra?.group?.translation?.title)
            ?.join(','),
        key: 'Extras name',
      },
      {
        title: t('extras.value'),
        render: (_, data) => data?.extras?.map((extra) => extra?.value),
        dataIndex: 'value',
        key: 'name',
      },
      {
        title: t('status'),
        dataIndex: 'active',
        render: (_, data) => {
          return (
            <Tag>
              {t(
                data?.extras?.map((extra) => extra?.active)[0] === 1
                  ? 'active'
                  : 'inactive',
              )}
            </Tag>
          );
        },
        key: 'active',
      },
    ];
    return (
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={row?.stocks}
        pagination={false}
      />
    );
  };
  const initialColumns = [
    {
      title: t('title'),
      dataIndex: 'translation_title',
      key: 'translation_title',
      render: (_, data) => {
        return data?.translation?.title;
      },
      is_show: true,
    },
    {
      title: t('bar.code'),
      dataIndex: 'bar_code',
      key: 'bar_code',
      is_show: true,
      render: (_, data) => {
        return <>{data?.bar_code || '-'}</>;
      },
    },

    {
      title: t('price'),
      dataIndex: 'price',
      key: 'price',
      is_show: true,
      render: (_, data) =>
        numberToPrice(
          data?.price,
          defaultCurrency?.symbol,
          defaultCurrency?.position,
        ),
    },
    {
      title: t('quantity'),
      key: 'quantity',
      dataIndex: 'quantity',
      is_show: true,
    },
    {
      title: t('status'),
      key: 'active',
      dataIndex: 'active',
      render: (_, data) => {
        const status = Boolean(data?.active);
        return (
          <Tag color={status ? 'green' : 'red'} key={data.id}>
            {status ? 'Active' : 'Inactive'}
          </Tag>
        );
      },
      is_show: true,
    },
  ];
  const [columns, setColumns] = useState(initialColumns);

  useDidUpdate(() => {
    setColumns(initialColumns);
  }, [i18n?.store?.data?.[`${i18n?.language}`]?.translation]);

  const chart_type = useMemo(
    () => [
      {
        label: 'item.sold',
        value: 'avg_quantity',
        qty: 'quantity',
        price: false,
      },
      { label: 'net.sales', value: 'price', qty: 'price', price: true },
      {
        label: 'Orders',
        value: 'count',
        qty: 'count',
        price: false,
      },
    ],
    [],
  );

  const fetchReport = () => {
    const params = {
      date_from,
      date_to,
      type: by_time,
      chart,
    };
    if (category_id) params.categories = [category_id];
    if (product_id) params.products = [product_id];
    dispatch(fetchExtrasChart(params));
  };

  const fetchExtras = (page, perPage) => {
    const params = {
      date_from,
      date_to,
      type: by_time,
      page,
      perPage,
    };
    if (category_id) params.categories = [category_id];
    if (product_id) params.products = [product_id];
    dispatch(fetchExtrasList(params));
  };

  useEffect(() => {
    handleChart(chart_type[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeMenu.refetch) {
      fetchExtras();
      fetchReport();
      dispatch(disableRefetch(activeMenu));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu.refetch]);

  useDidUpdate(() => {
    fetchExtras();
  }, [date_to, category_id, product_id, date_from]);

  useDidUpdate(() => {
    fetchReport();
  }, [date_to, by_time, chart, category_id, product_id, date_from]);

  const onChangePagination = (pagination) => {
    const { pageSize: perPage, current: page } = pagination;
    fetchExtras(page, perPage);
  };

  const excelExport = () => {
    setDownloading(true);
    ReportService.getReportProductList({
      date_from,
      date_to,
      type: by_time,
      export: 'excel',
      // products: rowSelection?.selectedRowKeys,
    })
      .then((res) => {
        const body = res.data.link;
        if (body) {
          window.location.href = body;
        }
      })
      .finally(() => setDownloading(false));
  };

  // const onSelectChange = (newSelectedRowKeys) => {
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };
  //
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

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
        {chart_type?.map((item) => (
          <Col
            span={8}
            key={item.label}
            onClick={() => handleChart(item.value)}
          >
            <Card className={chart === item.value && 'active'}>
              <Row className='mb-5'>
                <Col>
                  <Text>{t(item.label)}</Text>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
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
                <Col span={12} className='d-flex justify-content-end'>
                  <Tag color='geekblue' className='d-flex align-items-center'>
                    5%
                  </Tag>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      <ReportChart reportData={reportData} chart_data='quantities_sum' />
      <Card>
        <Space className='d-flex justify-content-between align-center'>
          <Typography.Text strong level={3}>
            {t('extras')}
          </Typography.Text>
          <Space className='d-flex justify-content-between'>
            <Button
              icon={<CloudDownloadOutlined />}
              loading={downloading}
              onClick={excelExport}
            >
              {t('download')}
            </Button>
            <FilterColumns columns={columns} setColumns={setColumns} />
          </Space>
        </Space>

        <Table
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: ['0'],
          }}
          // rowSelection={rowSelection}
          columns={columns?.filter((item) => item.is_show)}
          dataSource={extrasList?.data?.data}
          rowKey={(row) => row.id}
          loading={loading}
          pagination={{
            pageSize: extrasList?.data?.per_page,
            page: extrasList?.data?.current_page || 1,
            total: extrasList?.data?.meta?.total,
            defaultCurrent: 1,
          }}
          onChange={onChangePagination}
          scroll={{
            x: 1500,
          }}
        />
      </Card>
    </Spin>
  );
};

export default ReportExtras;

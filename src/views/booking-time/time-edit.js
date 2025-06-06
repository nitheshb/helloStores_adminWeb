import React, { useState, useEffect } from 'react';
import Loading from 'components/loading';
import moment from 'moment';
import { weeks } from 'components/shop/weeks';
import BookingTimeForm from 'components/forms/booking-time-form';
import { Form } from 'antd';
import BookingTime from 'services/booking-time';
import bookingClosedDays from 'services/bookingClosedDays';
import { shallowEqual, useSelector } from 'react-redux';
import bookingWorkingDays from 'services/bookingWorkingDays';
import { useDispatch } from 'react-redux';
import { disableRefetch, removeFromMenu } from 'redux/slices/menu';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { adminFetchBookingTime } from 'redux/slices/booking-time';

const BookingTimeEdit = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [days, setDays] = useState([]);
  const [lines, setLines] = useState(new Array(7).fill(false));
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { myShop } = useSelector((state) => state.myShop, shallowEqual);
  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoadingBtn(true);
    const closeDatesBody = {
      dates: days
        ? days.map((item) => moment(item).format('YYYY-MM-DD'))
        : undefined,
    };

    const workingDaysBody = {
      dates: values.working_days.map((item) => ({
        day: item.title,
        from: moment(item.from ? item.from : '00').format('HH-mm'),
        to: moment(item.to ? item.to : '00').format('HH-mm'),
        disabled: item.disabled,
      })),
    };

    const workingMaxTime = {
      max_time: values.max_time,
      shop_id: myShop.id,
    };
    const nextUrl = 'booking/time';

    Promise.all([
      BookingTime.create(workingMaxTime),
      bookingClosedDays.update(myShop.uuid, closeDatesBody),
      values.working_days.length !== 0
        ? bookingWorkingDays.update(myShop.uuid, workingDaysBody)
        : undefined,
    ]).then(() => {
      toast.success(t('successfully.updated'));
      dispatch(adminFetchBookingTime());
      dispatch(removeFromMenu({ ...activeMenu, nextUrl }));
      navigate(`/${nextUrl}`);
    });
  };

  const getDays = () => {
    setLoading(true);
    BookingTime.getAll()
      .then((res) => {
        console.log('data', res);
        form.setFieldsValue({
          max_time: res.data[0].max_time,
        });
      })
      .finally(() => {
        dispatch(disableRefetch(activeMenu));
        setLoading(false);
      });

    bookingClosedDays
      .getById(myShop.uuid)
      .then((res) => {
        setDays(
          res.data.booking_shop_closed_date
            .filter(
              (date) => date.day > moment(new Date()).format('YYYY-MM-DD'),
            )
            .map((itm) => new Date(itm.day)),
        );
      })
      .finally(() => {
        dispatch(disableRefetch(activeMenu));
        setLoading(false);
      });

    bookingWorkingDays
      .getById(myShop.uuid)
      .then((res) => {
        setLines(
          res.data.dates.length !== 0
            ? res.data.dates.map((item) => item.disabled)
            : [],
        );

        res.data.dates.length !== 0 &&
          form.setFieldsValue({
            working_days: res.data.dates.map((item) => ({
              title: item.day,
              from: moment(item.from, 'HH:mm:ss'),
              to: moment(item.to, 'HH:mm:ss'),
              disabled: Boolean(item.disabled),
            })),
          });
      })
      .finally(() => {
        dispatch(disableRefetch(activeMenu));
        setLoading(false);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      working_days: weeks,
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (activeMenu.refetch) {
      getDays();
    }
    // eslint-disable-next-line
  }, [activeMenu.refetch]);

  return (
    <>
      {!loading ? (
        <BookingTimeForm
          onFinish={onFinish}
          form={form}
          lines={lines}
          loadingBtn={loadingBtn}
          days={days}
          setDays={setDays}
          setLines={setLines}
          weeks={weeks}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default BookingTimeEdit;

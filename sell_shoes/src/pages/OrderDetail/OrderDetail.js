import styles from './OrderDetail.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
import routes from '~/config/routes';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

// const data = {
//     _id: 1,
//     orderProduct: [
//         {
//             id: 1,
//             img: 'https://res.cloudinary.com/dgczeeypr/image/upload/v1691132026/BanGiay/juss6nurwh3rc17enipw.jpg',
//             name: 'Vans Old Skool Classic Blackádgsdgsdfg đậpVans Old Skool Classic Blackádgsdgsdfg đậpVans Old Skool Classic Blackádgsdgsdfg đập',
//             quantity: 1,
//             size: 39,
//             price: 1000000,
//             // method: 'VNPAY',
//         },
//         {
//             id: 2,
//             img: 'https://res.cloudinary.com/dgczeeypr/image/upload/v1691132026/BanGiay/juss6nurwh3rc17enipw.jpg',
//             name: 'Vans Old Skool Classic Blackádgsdgsdfg đập',
//             quantity: 1,
//             size: 39,
//             price: 1000000,
//         },
//     ],
//     method: 'VNPAY',
//     address: 'Quận 12 thành phố hồ chí minh',
//     sdt: '09677777',
//     name: 'Trần trung Tín',
//     status: 'Đang chuyển',
//     dateOrder: '12/08/2023 09:10',
// };

function OrderDetail() {
    const token = useSelector((state) => state.user.accessToken);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/user/purchase', {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setData(response.data.data);
                console.log('response.data', response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('header-text')}>Chi tiết đơn hàng của tôi</h3>
                <Link to={config.routes.home} className={cx('cart-btn')}>
                    Tiếp tục mua sắm!
                </Link>
            </div>
            {Array.isArray(data) && data.length !== 0 ? (
                data.map((pro, index) => (
                    <div className={cx('information')} key={index}>
                        <div className={cx('address')}>
                            <div className={cx('address-heading')}>
                                <h3 className={cx('address-header')}>ĐỊA CHỈ NHẬN HÀNG</h3>
                                <p className={cx('address-time')}>{pro.dateOrder}</p>
                            </div>
                            <div className={cx('address-content')}>
                                <h3 className={cx('address-content-name')}>Tên người nhận: {pro.id_note.fullname}</h3>
                                <p className={cx('address-content-tel')}>SĐT: {pro.id_note.phone}</p>
                                <p className={cx('address-content-add')}>Địa chỉ: {pro.adress}</p>
                            </div>
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('content')}>
                                <div className={cx('content-top')}>
                                    <div className={cx('content-column')}>
                                        {pro.orderProducts.map((orderPro, index) => (
                                            <div key={index} className={cx('content-item')}>
                                                <div className={cx('content-left')}>
                                                    <div className={cx('content-img')}>
                                                        <img
                                                            src={orderPro.id_product.image}
                                                            alt="image"
                                                            className={cx('content-image')}
                                                        ></img>
                                                    </div>
                                                    <div className={cx('body')}>
                                                        <h3 className={cx('body-name')}>
                                                            {orderPro.id_product.name_product}
                                                        </h3>
                                                        <div className={cx('body-action')}>
                                                            <p className={cx('body-action-quantity')}>
                                                                x{orderPro.quantity}
                                                            </p>
                                                            <p className={cx('body-action-size')}>
                                                                size: {orderPro.size}
                                                            </p>
                                                            <p className={cx('body-action-price')}>
                                                                {orderPro.unit_price.toLocaleString()} VNĐ
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={cx('content-right')}>
                                        {/* <p className={cx('content-method')}>{data.method}</p> */}
                                        <div className={cx('status')}>
                                            <span className={cx('status-post')}>{pro.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('content-bottom')}>
                                    <p className={cx('content-bottom-price')}> {pro.totalPrice.toLocaleString()} VNĐ</p>
                                    Tổng tiền:
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className={cx('no-product')}>Bạn chưa mua sản phẩm nào!</div>
            )}
        </div>
    );
}

export default OrderDetail;

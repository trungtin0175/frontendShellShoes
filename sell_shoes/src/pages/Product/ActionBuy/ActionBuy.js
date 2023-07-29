import styles from './ActionBuy.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';

const cx = classNames.bind(styles);

function ActionBuy() {
    const [open, setOpen] = useState(false);
    const handleBuy = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div onClick={handleBuy} className={cx('buy-btn')}>
                Mua ngay
            </div>
            {/* <div className={cx('add-btn')}>
                <FontAwesomeIcon icon={faCartShopping} />
                Thêm vào giỏ hàng
            </div> */}
            <Modal
                centered
                open={open}
                footer={null}
                // onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                style={{ marginTop: 30 }}
            >
                <div className={cx('main')}>
                    <form className={cx('form')} id="form-2">
                        <h3 className={cx('heading')}>Thông tin nhận hàng</h3>
                        <div className={cx('form-group')}></div>
                        <div className={cx('form-group')}>
                            <label htmlFor="fullname" className={cx('form-label')}>
                                Tên người nhận
                            </label>
                            <input
                                id="fullname"
                                type="text"
                                placeholder="Trần Trung Tín"
                                className={cx('form-control')}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="numberphone" className={cx('form-label')}>
                                Số điện thoại
                            </label>
                            <input
                                id="numberphone"
                                type="tel"
                                placeholder="0123456789"
                                className={cx('form-control')}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="address" className={cx('form-label')}>
                                Địa chỉ nhận hàng
                            </label>
                            <input
                                id="address"
                                type="text"
                                placeholder="409 đ.Hùng Vương q.12 tp.HCM"
                                className={cx('form-control')}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('button')}>
                            <button className={cx('form-submit')}>Thanh toán vnpay</button>
                            <button className={cx('form-submit')}>Thanh toán khi nhận hàng</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default ActionBuy;

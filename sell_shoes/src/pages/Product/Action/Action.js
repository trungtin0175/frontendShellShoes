import styles from './Action.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { useState } from 'react';
import ActionBuy from '~/pages/Product/ActionBuy';

const cx = classNames.bind(styles);
const size = [35, 36, 37, 38, 39];

function Action() {
    const [activeSize, setActiveSize] = useState(null);
    const [changeNum, setChangeNum] = useState(1);
    const handleSize = (index) => {
        setActiveSize(index);
    };
    const handleDecrease = () => {
        setChangeNum(changeNum === 1 ? changeNum - 0 : changeNum - 1);
    };
    const handleIncrease = () => {
        setChangeNum(changeNum + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <h3 className={cx('name')}>
                    Giày thể thao nữ MWC - 0737 Giày Thể Thao Nữ Phối Sọc Màu Thể Thao,Sneaker Da Siêu Êm Chân Đế Bằng
                </h3>
                <div className={cx('prices')}>
                    <span className={cx('price-new')}>1.300.000 VNĐ</span>
                    <span className={cx('price-old')}>1.500.000 VNĐ</span>
                    <span className={cx('price-percent')}>-86.6%</span>
                </div>
                <div className={cx('size')}>
                    <p className={cx('size-heading')}>Kích thước</p>
                    {size.map((num, index) => (
                        <div
                            key={index}
                            className={cx('size-item', { active: activeSize === index })}
                            onClick={() => handleSize(index)}
                        >
                            {num}
                        </div>
                    ))}
                </div>
                <div className={cx('quantity')}>
                    <p className={cx('quantity-heading')}>Số lượng</p>
                    <div className={cx('quantity-btn')} onClick={() => handleDecrease()}>
                        -
                    </div>
                    <span className={cx('quantity-number')}>{changeNum}</span>
                    <div className={cx('quantity-btn')} onClick={() => handleIncrease()}>
                        +
                    </div>
                </div>
                <div className={cx('action')}>
                    <ActionBuy />
                    {/* <div className={cx('buy-btn')}>Mua ngay</div> */}
                    <div className={cx('add-btn')}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        Thêm vào giỏ hàng
                    </div>
                </div>
                <div className={cx('policy', 'row', 'sm-gutter')}>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy1} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>Bảo hành keo vĩnh viễn</span>
                    </div>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy2} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>
                            Miễn phí vận chuyển toàn quốc cho đơn hàng từ 150k
                        </span>
                    </div>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy3} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>
                            Đổi trả dễ dàng (trong vòng 7 ngày nếu lỗi nhà sản xuất)
                        </span>
                    </div>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy4} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>Hotline 1900.633.349 hỗ trợ từ 8h30-21h30</span>
                    </div>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy5} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>Giao hàng tận nơi, nhận hàng xong thanh toán</span>
                    </div>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy6} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>
                            Ưu đãi tích điểm và hưởng quyền lợi thành viên từ GG
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Action;

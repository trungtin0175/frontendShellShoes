import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const [showSort, setShowSort] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const handleSort = () => {
        setShowSort(!showSort);
    };
    const handlePrice = () => {
        setShowPrice(!showPrice);
    };
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sort')}>
                <h3 className={cx('sort-heading')} onClick={() => handleSort()}>
                    Sắp xếp theo
                </h3>
                <div className={cx('sort-title', { active: showSort })}>
                    <span className={cx('sort-item')}>Mặc định</span>
                    <span className={cx('sort-item')}>Giá tăng dần</span>
                    <span className={cx('sort-item')}>Giá giảm giần</span>
                    <span className={cx('sort-item')}>Khuyến mãi tốt nhất</span>
                </div>
            </div>
            <div className={cx('price')} style={{ transform: showSort ? 'translateY(-85%)' : 'translateY(0)' }}>
                <h3 className={cx('price-heading')} onClick={() => handlePrice()}>
                    Khoảng giá
                </h3>
                <div className={cx('price-title', { active: showPrice })}>
                    <span className={cx('price-item')}>Dưới 1 triệu</span>
                    <span className={cx('price-item')}>Từ 1-5 triệu</span>
                    <span className={cx('price-item')}>Từ 5-10 triệu</span>
                    <span className={cx('price-item')}>Trên 10 triệu</span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;

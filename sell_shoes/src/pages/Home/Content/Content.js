import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';

const cx = classNames.bind(styles);
function Content() {
    return (
        <Link className={cx('wrapper')} to="./product">
            <div className={cx('container')}>
                <div className={cx('wrapper-img')}>
                    <img
                        className={cx('img')}
                        src="https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/01/02/z4003668433045_8dd8f2344fa5c837544609c6fda41b4f.jpg"
                        alt="giày"
                    />
                </div>
                <div className={cx('info')}>
                    <h4 className={cx('name')}>
                        Giày thể thao nữ MWC - 0737 Giày Thể Thao Nữ Phối Sọc Màu Thể Thao,Sneaker Da Siêu Êm Chân Đế
                        Bằng
                    </h4>
                    <div className={cx('promotion')}>
                        <span className={cx('price-old')}>1.500.000 VNĐ</span>
                        <span className={cx('price-percent')}>-86.6%</span>
                    </div>
                    <div className={cx('price-new')}>1.300.000 VNĐ</div>
                </div>
            </div>
        </Link>
    );
}

export default Content;

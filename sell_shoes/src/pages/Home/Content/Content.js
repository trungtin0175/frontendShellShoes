import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';

const cx = classNames.bind(styles);
function Content({ product }) {
    // const sale = ((product.newPrice_product / product.oldPrice_product) * 100).toFixed(2);
    const sale = (((product.oldPrice_product - product.newPrice_product) / product.oldPrice_product) * 100).toFixed(2);
    return (
        <Link className={cx('wrapper')} to={`/api/product/detail/${product._id}`}>
            <div className={cx('container')}>
                <div className={cx('wrapper-img')}>
                    <img
                        className={cx('img')}
                        //src="https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/01/02/z4003668433045_8dd8f2344fa5c837544609c6fda41b4f.jpg"
                        src={product.image}
                        alt="giày"
                    />
                </div>
                <div className={cx('info')}>
                    <h4 className={cx('name')}>{product.name_product}</h4>
                    {product.oldPrice_product === product.newPrice_product ? (
                        <div className={cx('price-new')}>{product.newPrice_product.toLocaleString()} VNĐ</div>
                    ) : (
                        <div>
                            <div className={cx('promotion')}>
                                <span className={cx('price-old')}>{product.oldPrice_product.toLocaleString()} VNĐ</span>
                                <span className={cx('price-percent')}>{sale}%</span>
                            </div>
                            <div className={cx('price-new')}>{product.newPrice_product.toLocaleString()} VNĐ</div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default Content;

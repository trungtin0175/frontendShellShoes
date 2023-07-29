import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import Action from './Action';
import Image from './Image';
import Description from './Description';
import Related from './Related';

const cx = classNames.bind(styles);

function Product() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-info')}>
                {/* IMG */}
                <Image />
                {/* Action */}
                <Action />
            </div>
            <div className={cx('wrapper-container')}>
                <Description />
                <Related />
            </div>
        </div>
    );
}

export default Product;

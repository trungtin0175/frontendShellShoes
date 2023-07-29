import classNames from 'classnames/bind';
import styles from './Related.module.scss';
import Content from '~/pages/Home/Content';
import '~/components/GridStyles';

const cx = classNames.bind(styles);

function Related() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Có thể bạn cũng thích</h3>
            <div className={cx('container', 'row', 'sm-gutter')}>
                <div className={cx('col', 'l-2-4')}>
                    <Content />
                </div>
                <div className={cx('col', 'l-2-4')}>
                    <Content />
                </div>
                <div className={cx('col', 'l-2-4')}>
                    <Content />
                </div>
                <div className={cx('col', 'l-2-4')}>
                    <Content />
                </div>
                <div className={cx('col', 'l-2-4')}>
                    <Content />
                </div>
            </div>
        </div>
    );
}

export default Related;

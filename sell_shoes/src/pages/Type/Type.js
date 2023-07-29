import classNames from 'classnames/bind';
import styles from './Type.module.scss';
import Content from '~/pages/Home/Content';
import '~/components/GridStyles';

const cx = classNames.bind(styles);

function Type() {
    return (
        <div className={cx('wrapper')}>
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
                <div className={cx('col', 'l-2-4')}>
                    <Content />
                </div>
            </div>
        </div>
    );
}

export default Type;

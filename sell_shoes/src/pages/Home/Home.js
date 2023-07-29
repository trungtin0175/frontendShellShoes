import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slide from './Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import Category from './Category';
import Content from './Content';
import '~/components/GridStyles';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function Home() {
    const [showBtn, setShowBtn] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const height = 350;

            setShowBtn(scrollPosition > height);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <div className={cx('wrapper')}>
            <Slide arrImages={[images.slide1, images.slide2, images.slide3]} />
            <Category />
            <div className={cx('wrapper-title')}>
                <h1 className="title">Tất cả sản phẩm</h1>
            </div>
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
            <div className={cx('wrapper-btn')}>
                <button className={cx('btn')}>Xem thêm</button>
            </div>
            <div
                className={cx('wrapper-scroll')}
                style={{ display: showBtn ? 'flex' : 'none' }}
                onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
            >
                <FontAwesomeIcon className={cx('scroll-icon')} icon={faChevronUp} />
            </div>
        </div>
    );
}

export default Home;

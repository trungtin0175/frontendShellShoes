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
import axios from 'axios';

const cx = classNames.bind(styles);
function Home() {
    const [showBtn, setShowBtn] = useState(false);
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [productCount, setProductCount] = useState(10);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/allproduct')
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const sorted = [...products].sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
        setSortedProducts(sorted);
    }, [products]);

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
    }, []);

    const handleLoadMore = () => {
        setProductCount(productCount + 10);
    };

    return (
        <div className={cx('wrapper')}>
            <Slide arrImages={[images.banner4, images.banner2, images.banner3]} />
            <Category />
            <div className={cx('wrapper-title')}>
                <h1 className="title">Tất cả sản phẩm</h1>
            </div>
            <div className={cx('container', 'row', 'sm-gutter')}>
                {Array.isArray(sortedProducts) ? (
                    sortedProducts.slice(0, productCount).map((product, index) => (
                        <div className={cx('col', 'l-2-4', 'c-6')} key={index}>
                            <Content product={product} />
                        </div>
                    ))
                ) : (
                    <p>Product not found</p>
                )}
            </div>
            {productCount < sortedProducts.length && (
                <div className={cx('wrapper-btn')}>
                    <button onClick={handleLoadMore} className={cx('btn')}>
                        Xem thêm
                    </button>
                </div>
            )}
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link } from 'react-router-dom';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowresult] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 3000);
    }, []);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowresult(false);
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        <div>
            <Tippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Kết quả</h4>
                            <Link className={cx('search-link')}>
                                <img
                                    src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/product/cache/29162ccbe9d79568e67e3d26712ec350/S/a/Sandro_SHACH00899-20_V_2_1.webp"
                                    alt="search"
                                    className={cx('search-result-img')}
                                ></img>
                                <div className={cx('search-result-info')}>
                                    <h4 className={cx('search-result-name')}>Giày sneaker da Square Cross</h4>
                                    <p className={cx('search-result-price')}>8.120.000 ₫</p>
                                </div>
                            </Link>
                            <Link className={cx('search-link')}>
                                <img
                                    src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/product/cache/29162ccbe9d79568e67e3d26712ec350/S/a/Sandro_SHACH00899-20_V_2_1.webp"
                                    alt="search"
                                    className={cx('search-result-img')}
                                ></img>
                                <div className={cx('search-result-info')}>
                                    <h4 className={cx('search-result-name')}>Giày sneaker da Square Cross</h4>
                                    <p className={cx('search-result-price')}>8.120.000 ₫</p>
                                </div>
                            </Link>
                            <Link className={cx('search-link')}>
                                <img
                                    src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/product/cache/29162ccbe9d79568e67e3d26712ec350/S/a/Sandro_SHACH00899-20_V_2_1.webp"
                                    alt="search"
                                    className={cx('search-result-img')}
                                ></img>
                                <div className={cx('search-result-info')}>
                                    <h4 className={cx('search-result-name')}>Giày sneaker da Square Cross</h4>
                                    <p className={cx('search-result-price')}>8.120.000 ₫</p>
                                </div>
                            </Link>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm tên giày, hãng giày, ..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowresult(true)}
                    ></input>
                    {!!searchValue && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;

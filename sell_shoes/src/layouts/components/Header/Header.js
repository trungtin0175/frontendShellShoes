import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Search from '../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import routes from '~/config/routes';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function Header() {
    const user = useSelector((state) => state.user);
    // console.log(user.user._id);
    const navigate = useNavigate();
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img className={cx('logo-img')} src={images.logo} alt="Logo"></img>
                    </Link>
                    <h4 className={cx('logo-title')}>Không Đẹp Hoàn Tiền!</h4>
                </div>
                <Search />
                <div className={cx('actions')}>
                    <Link to={config.routes.cart} className={cx('cart')}>
                        <div className={cx('action-icon')}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                        <div className={cx('action-name')}>Giỏ hàng</div>
                    </Link>
                    {user.email ? (
                        <Link to={config.routes.profile} className={cx('user')}>
                            <div className={cx('action-icon')}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className={cx('action-name')}>Tài khoản</div>
                        </Link>
                    ) : (
                        <Link to={config.routes.login} className={cx('user')}>
                            <div className={cx('action-icon')}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className={cx('action-name')}>Đăng nhập</div>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;

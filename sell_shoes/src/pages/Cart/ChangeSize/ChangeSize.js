import styles from './ChangeSize.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
// import ActionBuy from '../Product/ActionBuy/ActionBuy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
// import routes from '~/config/routes';
import config from '~/config/config';
import { useSelector } from 'react-redux';
import axios from 'axios';

const cx = classNames.bind(styles);
function ChangeSize({ size, id, _id, show, setShow, showSize, setShowSize, pro }) {
    const token = useSelector((state) => state.user.accessToken);

    const [activeSize, setActiveSize] = useState(null);
    const [products, setProducts] = useState([]);
    const [sizeProduct, setSizeProduct] = useState(size);
    const [count, setCount] = useState(null);

    console.log('product', id);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/product/detail/${_id}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log('API Error:', error);
            });
    }, [id]);

    console.log(products.size);
    const handleSize = (num, index) => {
        setActiveSize(index);
        setSizeProduct(num);
        // setDataCart((prevDataCart) => ({
        //     ...prevDataCart,
        //     size: num,
        // }));
    };
    console.log(activeSize);
    console.log('user', products.quantity);
    const handleSubmit = async (id, _id) => {
        const user = pro[0].detail_cart.filter((prod) => prod._id === id);
        try {
            const response = await axios.put(
                `http://localhost:3000/api/cart/edit/${id}`,
                {
                    size: sizeProduct,
                    quantity: user[0].quantity,
                    unitPrice: user[0].unitPrice,
                },
                {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                },
                setCount(sizeProduct),
                setShow((prevShow) => ({
                    ...prevShow,
                    [_id]: !prevShow[_id],
                })),
                setShowSize(!showSize),
            );
        } catch (error) {
            console.error(error);
        }
    };
    const handleIsWrapperVisible = (productId) => {
        setShow((prevShow) => ({
            ...prevShow,
            [productId]: !prevShow[productId],
        }));
    };
    console.log(sizeProduct);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Thay đổi kích thước bạn muốn</h2>
            <div className={cx('size')}>
                {Array.isArray(products.size) ? (
                    products.size.map((num, index) => {
                        const numArray = num.split(',').map((numb) => numb.trim());
                        return (
                            <div className={cx('size-list')} key={index}>
                                {numArray.map((numb, i) => (
                                    <div
                                        className={cx('size-item', { active: activeSize === i })}
                                        onClick={() => handleSize(numb, i)}
                                        key={i}
                                    >
                                        {numb}
                                    </div>
                                ))}
                            </div>
                        );
                    })
                ) : (
                    <p>no size</p>
                )}
            </div>
            <div className={cx('button')}>
                <button onClick={() => handleIsWrapperVisible(_id)} className={cx('btn-esc')}>
                    TRỞ LẠI
                </button>
                <button onClick={() => handleSubmit(id, _id)} className={cx('btn-submit')}>
                    XÁC NHẬN
                </button>
            </div>
        </div>
    );
}

export default ChangeSize;

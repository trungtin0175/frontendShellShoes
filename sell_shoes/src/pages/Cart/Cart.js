import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import ActionBuy from '../Product/ActionBuy/ActionBuy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
// import routes from '~/config/routes';
import config from '~/config/config';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChangeSize from '~/pages/Cart/ChangeSize';
import { ProductContext } from '~/layouts/HeaderOnly/HeaderOnly';
import { LengthContext } from '~/App';
import { IdCartItemContext } from '~/layouts/HeaderOnly/HeaderOnly';

const cx = classNames.bind(styles);

function Cart() {
    const token = useSelector((state) => state.user.accessToken);
    const [products, setProducts] = useState([]);
    // const [data, setData] = useState([...products]);
    const [allPrice, setAllPrice] = useState(0);
    const [allQuantity, setAllQuantity] = useState(0);
    const [show, setShow] = useState([]);
    const [count, setCount] = useState(null);
    const [showSize, setShowSize] = useState(false);
    const [dele, setDele] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { setProductCart } = useContext(ProductContext);
    const { setLengthCart } = useContext(LengthContext);
    const { idCartItem } = useContext(IdCartItemContext);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/cart', {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setSelectedProducts([...selectedProducts, idCartItem]);
    }, [count, showSize, dele]);
    const handleDecrease = async (id, currentNum) => {
        if (currentNum === 1) {
            return;
        }
        const user = products[0].detail_cart.filter((prod) => prod._id === id);
        try {
            const response = await axios.put(
                `http://localhost:3000/api/cart/edit/${id}`,
                {
                    quantity: currentNum - 1,
                    unitPrice: user[0].unitPrice,
                    size: user[0].size,
                },
                {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                },
            );
            setCount(currentNum);
        } catch (error) {
            console.error(error);
        }
    };
    const handleIncrease = async (id, currentNum) => {
        const user = products[0].detail_cart.filter((prod) => prod._id === id);
        try {
            const response = await axios.put(
                `http://localhost:3000/api/cart/edit/${id}`,
                {
                    quantity: currentNum + 1,
                    unitPrice: user[0].unitPrice,
                    size: user[0].size,
                },
                {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                },
            );
            setCount(currentNum);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSize = (productId) => {
        setShow((prevShow) => ({
            ...prevShow,
            [productId]: !prevShow[productId],
        }));
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/cart/delete/${id}`, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            setDele(!dele);
            setLengthCart(response.data.length);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        // Khi danh sách sản phẩm được chọn thay đổi, tính toán lại allPrice và allQuantity
        let totalPrice = 0;
        let totalQuantity = 0;

        products.forEach((product) => {
            product.detail_cart.forEach((pro) => {
                if (selectedProducts.includes(pro._id)) {
                    totalPrice += pro.price;
                    totalQuantity += 1;
                }
            });
        });

        setAllPrice(totalPrice);
        setAllQuantity(totalQuantity);
    }, [selectedProducts, products]);
    console.log('dmm', products);

    const handleCheckboxChange = (productId) => {
        console.log('productId', productId);
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter((id) => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };
    useEffect(() => {
        // Tạo mảng chứa thông tin sản phẩm đã chọn
        const selectedProductDetails = products
            .flatMap((product) => product.detail_cart)
            .filter((pro) => selectedProducts.includes(pro._id));

        // Gọi setProductCart để cập nhật dữ liệu trong context
        setProductCart(selectedProductDetails);
    }, [selectedProducts]);
    // useEffect(() => {
    //     // Tạo mảng chứa thông tin sản phẩm đã thêm vào giỏ hàng
    //     const addedProductIds = products.map((product) => product._id);

    //     // Cập nhật danh sách sản phẩm đã chọn theo danh sách sản phẩm đã thêm vào giỏ hàng
    //     setSelectedProducts(addedProductIds);
    // }, [products]);
    const handleConfirm = () => {
        // Logic để lấy thông tin của các sản phẩm đã chọn
        const selectedProductDetails = products.filter((product) => selectedProducts.includes(product._id));
        console.log(selectedProductDetails); // In ra thông tin của các sản phẩm đã chọn
    };
    // console.log('products', products);
    return (
        <div className={cx('wrapper')}>
            {products.length !== 0 ? (
                <div className={cx('wrapper-has')}>
                    <div className={cx('header')}>
                        <h4 className={cx('product')}>Sản Phẩm</h4>
                        <div className={cx('type')}>
                            <h4 className={cx('type-item')}>Size</h4>
                            <h4 className={cx('type-item')}>Đơn Giá</h4>
                            <h4 className={cx('type-item')}>Số Lượng</h4>
                            <h4 className={cx('type-item')}>Số Tiền</h4>
                            <h4 className={cx('type-item')}>Thao Tác</h4>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        {products.map((product, index) =>
                            product.detail_cart.map((pro, index) => (
                                <div key={index} className={cx('product-item')}>
                                    <div className={cx('body-left')}>
                                        <div className={cx('body-check')}>
                                            <input
                                                // onChange={(e) => handleInput(e, index)}
                                                // checked={isChecked[index]}
                                                checked={
                                                    selectedProducts.includes(pro._id)
                                                    // ||
                                                    // selectedProducts.includes(idCartItem)
                                                } // Kiểm tra nếu sản phẩm đã được chọn
                                                onChange={() => handleCheckboxChange(pro._id)}
                                                type="checkbox"
                                                className={cx('body-check_btn')}
                                            />
                                        </div>
                                        <div className={cx('body-products')}>
                                            <div className={cx('body-product')}>
                                                <img className={cx('body-product_img')} src={pro.id_product.image} />
                                                <p className={cx('body-product_name')}>{pro.id_product.name_product}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('body-right')}>
                                        <div className={cx('body-size')}>
                                            <div className={cx('body-price')}>{pro.size}</div>
                                            <div className={cx('body-size_wrapper')}>
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    onClick={(index) => handleSize(pro.id_product._id)}
                                                    className={cx('body-size_icon')}
                                                />
                                                <div
                                                    className={cx('body-size_change', {
                                                        active: show[pro.id_product._id],
                                                    })}
                                                >
                                                    <ChangeSize
                                                        size={pro.size}
                                                        id={pro._id}
                                                        _id={pro.id_product._id}
                                                        show={show}
                                                        setShow={setShow}
                                                        showSize={showSize}
                                                        setShowSize={setShowSize}
                                                        pro={products}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('body-price')}>
                                            {pro.unitPrice.toLocaleString()} VNĐ
                                            {/* {newData[index].price} */}
                                        </div>
                                        <div className={cx('body-action')}>
                                            <div
                                                className={cx('quantity-btn')}
                                                onClick={() => handleDecrease(pro._id, pro.quantity)}
                                            >
                                                -
                                            </div>
                                            <span className={cx('quantity-number')}>{pro.quantity}</span>
                                            <div
                                                className={cx('quantity-btn')}
                                                onClick={() => handleIncrease(pro._id, pro.quantity)}
                                                //  onClick={() => handleIncrease(index)}
                                            >
                                                +
                                            </div>
                                        </div>
                                        <div className={cx('body-price-new')}>{pro.price.toLocaleString()} VNĐ</div>
                                        <div onClick={() => handleDelete(pro._id)} className={cx('body-delete')}>
                                            Xóa
                                        </div>
                                    </div>
                                </div>
                            )),
                        )}
                    </div>
                    <div className={cx('footer')}>
                        <h4 className={cx('footer-all')}>Tổng thanh toán {allQuantity} sản phẩm:</h4>
                        <div className={cx('footer-price')}>{allPrice.toLocaleString()} VNĐ</div>
                        {/* <ActionBuy /> */}
                        <div>
                            <Link className={cx('buy-btn')} to={config.routes.buyNow}>
                                Mua ngay
                            </Link>
                        </div>
                        {/* <div className={cx('footer-buy')}>Mua Hàng</div> */}
                    </div>
                </div>
            ) : (
                <div className={cx('wrapper-no')}>
                    <img src={images.cart} alt="cart" className={cx('cart-img')}></img>
                    <h3 className={cx('cart-heading')}>Bạn chưa có sản phẩm nào trong giỏ hàng!</h3>
                    <Link to={config.routes.home} className={cx('cart-btn')}>
                        Tiếp tục mua sắm!
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Cart;

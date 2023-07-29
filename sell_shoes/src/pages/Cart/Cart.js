import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import ActionBuy from '../Product/ActionBuy/ActionBuy';

const cx = classNames.bind(styles);

const products = [
    {
        id: 1,
        img: 'https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/01/02/z4003668433045_8dd8f2344fa5c837544609c6fda41b4f.jpg',
        name: 'Giày thể thao nữ MWC - 0737 Giày Thể Thao Nữ Phối Sọc Màu Thể Thao,Sneaker Da Siêu Êm Chân Đế Bằng',
        price: 900000,
        sl: 1,
    },
    {
        id: 2,
        img: 'https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/01/02/z4003668433045_8dd8f2344fa5c837544609c6fda41b4f.jpg',
        name: 'Giày thể thao nữ MWC - 0737 Giày Thể Thao Nữ Phối Sọc Màu Thể Thao,Sneaker Da Siêu Êm Chân Đế Bằng',
        price: 1300000,
        sl: 2,
    },
    {
        id: 3,
        img: 'https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/01/02/z4003668433045_8dd8f2344fa5c837544609c6fda41b4f.jpg',
        name: 'Giày thể thao nữ MWC - 0737 Giày Thể Thao Nữ Phối Sọc Màu Thể Thao,Sneaker Da Siêu Êm Chân Đế Bằng',
        price: 1500000,
        sl: 1,
    },
];
function Cart() {
    // const [data, setData] = useState([...products]);
    const [allPrice, setAllPrice] = useState(0);
    const [allQuantity, setAllQuantity] = useState(0);
    const initialData = products.map((product) => ({
        ...product,
        price: product.price,
    }));
    const [data, setData] = useState(initialData);
    const newData = [...data];
    // const handleDecrease = (index) => {
    //     if (newData[index].sl === 1) {
    //         newData[index].sl = 1;
    //         newData[index].price = initialData[index].price;
    //     } else {
    //         newData[index].sl--;
    //         newData[index].price = initialData[index].price * newData[index].sl;
    //     }
    //     setData([...newData]);
    // };
    const handleDecrease = (index) => {
        if (newData[index].sl === 1) {
            newData[index].sl = 1;
            newData[index].price = initialData[index].price;
        } else {
            newData[index].sl--;
            newData[index].price = initialData[index].price * newData[index].sl;
        }
        setData([...newData]);

        // Cập nhật giá trị newAllPrice và newAllQuantity sau khi giảm số lượng
        const updatedAllPrice = allPrice - initialData[index].price;
        const updatedAllQuantity = allQuantity - 1;
        setAllPrice(updatedAllPrice);
        setAllQuantity(updatedAllQuantity);
    };
    const handleIncrease = (index) => {
        newData[index].sl++;
        newData[index].price = initialData[index].price * newData[index].sl;
        setData([...newData]);

        // Cập nhật giá trị newAllPrice và newAllQuantity sau khi tăng số lượng
        const updatedAllPrice = allPrice + initialData[index].price;
        const updatedAllQuantity = allQuantity + 1;
        setAllPrice(updatedAllPrice);
        setAllQuantity(updatedAllQuantity);
    };
    // const handleIncrease = (index) => {
    //     newData[index].sl++;
    //     newData[index].price = initialData[index].price * newData[index].sl;
    //     setData([...newData]);
    // };
    const handleInput = (e, index) => {
        const checked = e.target.checked;
        let newAllPrice = allPrice;
        let newAllQuantity = allQuantity;
        let newProducts = [...newData];

        if (checked) {
            newAllPrice += newProducts[index].price;
            newAllQuantity += newProducts[index].sl;
        } else {
            newAllPrice -= newProducts[index].price;
            newAllQuantity -= newProducts[index].sl;
        }

        newProducts[index].checked = checked;
        setData(newProducts);
        setAllPrice(newAllPrice);
        setAllQuantity(newAllQuantity);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h4 className={cx('product')}>Sản Phẩm</h4>
                <div className={cx('type')}>
                    <h4 className={cx('type-item')}>Đơn Giá</h4>
                    <h4 className={cx('type-item')}>Số Lượng</h4>
                    <h4 className={cx('type-item')}>Số Tiền</h4>
                    <h4 className={cx('type-item')}>Thao Tác</h4>
                </div>
            </div>
            <div className={cx('body')}>
                {data.map((product, index) => (
                    <div key={product.id} className={cx('product-item')}>
                        <div className={cx('body-left')}>
                            <div className={cx('body-check')}>
                                <input
                                    onChange={(e) => handleInput(e, index)}
                                    // checked={isChecked[index]}
                                    type="checkbox"
                                    className={cx('body-check_btn')}
                                />
                            </div>
                            <div className={cx('body-products')}>
                                <div className={cx('body-product')}>
                                    <img className={cx('body-product_img')} src={product.img} />
                                    <p className={cx('body-product_name')}>{product.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('body-right')}>
                            <div className={cx('body-price')}>{newData[index].price}</div>
                            <div className={cx('body-action')}>
                                <div className={cx('quantity-btn')} onClick={() => handleDecrease(index)}>
                                    -
                                </div>
                                <span className={cx('quantity-number')}>{product.sl}</span>
                                <div className={cx('quantity-btn')} onClick={() => handleIncrease(index)}>
                                    +
                                </div>
                            </div>
                            <div className={cx('body-price-new')}>{product.price} VNĐ</div>
                            <div className={cx('body-delete')}>Xóa</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('footer')}>
                <h4 className={cx('footer-all')}>Tổng thanh toán {allQuantity} sản phẩm:</h4>
                <div className={cx('footer-price')}>{allPrice} VNĐ</div>
                <ActionBuy />
                {/* <div className={cx('footer-buy')}>Mua Hàng</div> */}
            </div>
        </div>
    );
}

export default Cart;

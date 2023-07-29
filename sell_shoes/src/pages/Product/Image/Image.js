import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
const arrImg = [
    {
        id: 1,
        img: 'https://img.mwc.com.vn/giay-thoi-trang?w=1150&h=0&FileInput=//Upload/2022/11/batch-z3862079935033-f6bccda75e03c97943ade02d90bdb3fd-d109ebcd-d279-4b6a-b375-1444e10ff4d4.jpg',
    },
    { id: 2, img: 'https://kaiwings.vn/upload/product/kw-054/giay-zip-bot-nam-cao-co-da-bo-dep-hang-hieu.jpg' },
    { id: 3, img: 'https://anv.vn/wp-content/uploads/2020/10/giay-chay-bo-nam-3.jpg' },
    { id: 4, img: 'https://vcdn-giadinh.vnecdn.net/2020/03/24/5d034e198bd1a-em004ba-01-8780-1585039024.jpg' },
];
function Image() {
    const [selectedImg, setSelectedImg] = useState('');
    const [colorIndex, setColorIndex] = useState(1);

    const handleImageClick = (img, index) => {
        setSelectedImg(img);
        setColorIndex(index);
    };
    const firstImg = arrImg[0].img;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-img')}>
                <img className={cx('wrapper-img_main')} src={selectedImg || firstImg} alt="Hình ảnh" />
            </div>
            <div className={cx('wrapper-extra')}>
                {arrImg.map((img) => (
                    <div
                        className={cx('wrapper-supp')}
                        key={img.id}
                        style={{ borderColor: img.id === colorIndex ? 'red' : 'black' }}
                    >
                        <img
                            className={cx('wrapper-supp_img')}
                            src={img.img}
                            alt="Hình ảnh"
                            onClick={() => handleImageClick(img.img, img.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Image;

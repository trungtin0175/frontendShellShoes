import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import { useRef } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function Slide({ arrImages }) {
    const slideRef = useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const prev = () => {
        slideRef.current.slickPrev();
    };
    const next = () => {
        slideRef.current.slickNext();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide')}>
                <div className={cx('slide-show')}>
                    <Slider {...settings} ref={slideRef}>
                        {arrImages.map((image, index) => (
                            <img key={index} src={image} alt="slider" className={cx('slide-img')} />
                        ))}
                    </Slider>
                </div>
                <div className={cx('btn-prev')} onClick={() => prev()}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={cx('btn-next')} onClick={() => next()}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
        </div>
    );
}
Slide.prototype = {
    arrImages: PropTypes.array.isRequired,
};

export default Slide;

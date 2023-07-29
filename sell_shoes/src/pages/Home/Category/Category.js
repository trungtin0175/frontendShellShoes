import styles from './Category.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';

const cx = classNames.bind(styles);

function Category() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/category/all')
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    });
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('types')}>
                {category.map((type, index) => (
                    <Link key={index} to={config.routes.type}>
                        <li className={cx('type-item')}>
                            <div className={cx('wrapper-img')}>
                                <img src={type.image} alt={type.name} className={cx('type-img')}></img>
                            </div>
                            <p className={cx('type-name')}>{type.name}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Category;

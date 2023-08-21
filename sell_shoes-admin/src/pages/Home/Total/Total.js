import classNames from "classnames/bind";
import styles from "./Total.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faBagShopping,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import config from "~/config";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const cx = classNames.bind(styles);

function Total() {
  const token = useSelector((state) => state.user.accessToken);
  const [userCount, setUserCount] = useState([]);
  const [orderCount, setOrderCount] = useState([]);
  const [productCount, setProductCount] = useState([]);
  const [revenueCount, setRevenueCount] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:3000/api/order/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:3000/api/admin/allusers", {
          headers: {
            token: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:3000/api/allproduct", {
          headers: {
            token: `Bearer ${token}`,
          },
        }),
      ])
      .then(
        axios.spread((orderResponse, usersResponse, productResponse) => {
          const orderData = orderResponse.data.data;
          const usersData = usersResponse.data;
          const productData = productResponse.data.data; // Thay đổi dựa trên cấu trúc của dữ liệu từ yêu cầu API này

          // Tiếp tục xử lý dữ liệu của bạn
          setOrderCount(orderData);
          setUserCount(usersData);
          setProductCount(productData);
          setCount(count + 1);
          // setOrderLength(orderData.length);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  console.log("order", orderCount);
  useEffect(() => {
    const priceTotal = orderCount.reduce((total, order) => {
      if (order.status === "Đã giao") {
        return total + order.totalPrice;
      }
      return total;
    }, 0);
    setRevenueCount(priceTotal);
  }, [count]);
  console.log("1234", revenueCount);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <div className={cx("icon", "first")}>
          <FontAwesomeIcon icon={faDollar} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng doanh thu</h4>
          <span className={cx("item-result")}>
            {revenueCount.toLocaleString()} VNĐ
          </span>
        </div>
      </div>
      <div className={cx("title")}>
        <div className={cx("icon", "second")}>
          <FontAwesomeIcon icon={faBagShopping} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng sản phẩm</h4>
          <span className={cx("item-result")}>{productCount.length}</span>
        </div>
      </div>
      <div className={cx("title")}>
        <div className={cx("icon", "third")}>
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng số đơn</h4>
          <span className={cx("item-result")}>{orderCount.length}</span>
        </div>
      </div>
      <div className={cx("title")}>
        <div className={cx("icon", "four")}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng người dùng</h4>
          <span className={cx("item-result")}>{userCount.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Total;

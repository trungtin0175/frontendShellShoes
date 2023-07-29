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

const cx = classNames.bind(styles);

function Total() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <div className={cx("icon", "first")}>
          <FontAwesomeIcon icon={faDollar} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng doanh thu</h4>
          <span className={cx("item-result")}>500000 VNĐ</span>
        </div>
      </div>
      <div className={cx("title")}>
        <div className={cx("icon", "second")}>
          <FontAwesomeIcon icon={faBagShopping} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng sản phẩm</h4>
          <span className={cx("item-result")}>500000 VNĐ</span>
        </div>
      </div>
      <div className={cx("title")}>
        <div className={cx("icon", "third")}>
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng số đơn</h4>
          <span className={cx("item-result")}>500000 VNĐ</span>
        </div>
      </div>
      <div className={cx("title")}>
        <div className={cx("icon", "four")}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng người dùng</h4>
          <span className={cx("item-result")}>500000 VNĐ</span>
        </div>
      </div>
    </div>
  );
}

export default Total;

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import config from "~/config";
import Total from "./Total";
import { Table } from "antd";
import { useState } from "react";

const cx = classNames.bind(styles);
const colurm = [
  {
    key: "1",
    title: "ID",
    dataIndex: "id",
  },
  {
    key: "2",
    title: "Code",
    dataIndex: "code",
  },
  {
    key: "3",
    title: "Name",
    dataIndex: "name",
  },
  {
    key: "4",
    title: "Prices",
    dataIndex: "prices",
  },
  {
    key: "5",
    title: "Address",
    dataIndex: "address",
  },
  {
    key: "6",
    title: "UserName",
    dataIndex: "username",
  },
];
const arr = [
  {
    id: 1,
    code: 3001,
    name: "GIÀY THỂ THAO NIKE AIR FORCE 1 LOW 82 SAIL ‘BROWN’ DX6065-101 MÀU KEM",
    prices: 200000,
    address:
      "2B ấp 2, Xuân Thới Thượng, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam",
    username: "Trung Tín",
  },
  {
    id: 2,
    code: 3001,
    name: "GIÀY THỂ THAO NIKE AIR FORCE 1 LOW 82 SAIL ‘BROWN’ DX6065-101 MÀU KEM",
    prices: 200000,
    address:
      "2B ấp 2, Xuân Thới Thượng, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam",
    username: "Trung Tín",
  },
  {
    id: 3,
    code: 3001,
    name: "GIÀY THỂ THAO NIKE AIR FORCE 1 LOW 82 SAIL ‘BROWN’ DX6065-101 MÀU KEM",
    prices: 200000,
    address:
      "2B ấp 2, Xuân Thới Thượng, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam",
    username: "Trung Tín",
  },
  {
    id: 4,
    code: 3001,
    name: "GIÀY THỂ THAO NIKE AIR FORCE 1 LOW 82 SAIL ‘BROWN’ DX6065-101 MÀU KEM",
    prices: 200000,
    address:
      "2B ấp 2, Xuân Thới Thượng, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam",
    username: "Trung Tín",
  },
  {
    id: 5,
    code: 3001,
    name: "GIÀY THỂ THAO NIKE AIR FORCE 1 LOW 82 SAIL ‘BROWN’ DX6065-101 MÀU KEM",
    prices: 200000,
    address:
      "2B ấp 2, Xuân Thới Thượng, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam",
    username: "Trung Tín",
  },
  {
    id: 6,
    code: 3001,
    name: "GIÀY THỂ THAO NIKE AIR FORCE 1 LOW 82 SAIL ‘BROWN’ DX6065-101 MÀU KEM",
    prices: 200000,
    address:
      "2B ấp 2, Xuân Thới Thượng, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam",
    username: "Trung Tín",
  },
];
function Home() {
  const [dataSource, setDataSource] = useState(arr);
  const data = dataSource.slice(-4);
  return (
    <div className={cx("wrapper")}>
      <Total />
      <div className={cx("order")}>
        <h4 className={cx("order-name")}>Recent Order</h4>
        <header className={cx("order-header")}>
          <Table
            pagination={false}
            columns={colurm}
            dataSource={data.map((item) => ({ ...item, key: item.id }))}
          ></Table>
        </header>
      </div>
    </div>
  );
}

export default Home;

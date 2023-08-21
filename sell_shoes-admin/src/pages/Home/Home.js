import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import config from "~/config";
import Total from "./Total";
import { Table } from "antd";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import axios from "axios";

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
  const token = useSelector((state) => state.user.accessToken);
  const [category, setCategory] = useState([]);
  const [order, setOrder] = useState([]);
  const [count, setCount] = useState(0);
  console.log(category);
  // const [options, setOptions] = useState({
  //   chart: {
  //     id: "basic-bar",
  //   },
  //   xaxis: {
  //     categories: [],
  //   },
  // });

  // const [series, setSeries] = useState([
  //   {
  //     name: "series-1",
  //     data: [30, 40, 45, 50, 49, 60, 70, 91],
  //   },
  // ]);
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [], // Đây là nơi bạn cần cung cấp các danh mục cho biểu đồ, sau khi lấy dữ liệu từ API.
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [], // Đây là nơi bạn cần cung cấp dữ liệu số lượng hàng đã bán, sau khi tính toán từ dữ liệu đơn hàng.
    },
  ]);
  const [deliveredQuantity, setDeliveredQuantity] = useState(0);

  // useEffect(() => {
  //   // Sử dụng axios.all để gửi cả hai yêu cầu API cùng một lúc
  //   axios
  //     .all([
  //       axios.get("http://localhost:3000/api/category/all", {
  //         headers: {
  //           token: `Bearer ${token}`,
  //         },
  //       }),
  //       axios.get("http://localhost:3000/api/order/all", {
  //         headers: {
  //           token: `Bearer ${token}`,
  //         },
  //       }),
  //     ])
  //     .then(
  //       axios.spread((categoryResponse, orderResponse) => {
  //         // Lấy dữ liệu danh mục và đơn hàng từ các phản hồi API
  //         const categories = categoryResponse.data.map((cate) => cate.category);

  //         // Tính toán số lượng hàng đã đặt hàng trên từng danh mục từ dữ liệu đơn hàng
  //         const categoryQuantityMap = {};
  //         orderResponse.data.data.forEach((orderItem) => {
  //           orderItem.orderProducts.forEach((product) => {
  //             const category = product.id_product.id_category.category;

  //             if (!categoryQuantityMap[category]) {
  //               categoryQuantityMap[category] = product.quantity;
  //             } else {
  //               categoryQuantityMap[category] += product.quantity;
  //             }
  //           });
  //         });

  //         // Tạo mảng dữ liệu mới cho biểu đồ
  //         const newData = categories.map(
  //           (category) => categoryQuantityMap[category] || 0
  //         );

  //         // Cập nhật dữ liệu cho biểu đồ
  //         setOptions((prevOptions) => ({
  //           ...prevOptions,
  //           xaxis: {
  //             ...prevOptions.xaxis,
  //             categories: categories,
  //           },
  //         }));
  //         setSeries([
  //           {
  //             name: "series-1",
  //             data: newData,
  //           },
  //         ]);

  //         // Tăng biến count để ghi nhận sự thay đổi
  //         setCount(count + 1);
  //       })
  //     )
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  useEffect(() => {
    // Sử dụng axios.all để gửi cả hai yêu cầu API cùng một lúc
    axios
      .all([
        axios.get("http://localhost:3000/api/category/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:3000/api/order/all", {
          headers: {
            token: `Bearer ${token}`,
          },
        }),
      ])
      .then(
        axios.spread((categoryResponse, orderResponse) => {
          // Lấy dữ liệu danh mục và đơn hàng từ các phản hồi API
          const categories = categoryResponse.data.map((cate) => cate.category);

          // Tính toán số lượng hàng đã đặt hàng trên từng danh mục từ dữ liệu đơn hàng
          const categoryQuantityMap = {};
          let deliveredQuantity = 0; // Số lượng hàng đã giao

          orderResponse.data.data.forEach((orderItem) => {
            if (orderItem.status === "Đã giao") {
              deliveredQuantity += 1;
              orderItem.orderProducts.forEach((product) => {
                const category = product.id_product.id_category.category;
                if (!categoryQuantityMap[category]) {
                  categoryQuantityMap[category] = product.quantity;
                } else {
                  categoryQuantityMap[category] += product.quantity;
                }
              });
            }
          });

          // Tạo mảng dữ liệu mới cho biểu đồ
          const newData = categories.map(
            (category) => categoryQuantityMap[category] || 0
          );

          // Cập nhật dữ liệu cho biểu đồ
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: categories,
            },
          }));
          setSeries([
            {
              name: "series-1",
              data: newData,
            },
          ]);

          // Cập nhật số lượng hàng đã giao
          setDeliveredQuantity(deliveredQuantity);

          // Tăng biến count để ghi nhận sự thay đổi
          setCount(count + 1);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Tạo mảng dữ liệu mới dựa trên số lượng hàng đã đặt hàng trên từng danh mục
  // const newData = category.map((cate) => {
  //   const categoryName = cate.category;
  //   return categoryQuantityMap[categoryName] || 0; // Nếu không có số lượng, gán giá trị mặc định là 0
  // });
  // const [options, setOptions] = useState({
  //   chart: {
  //     id: "basic-bar",
  //   },
  //   xaxis: {
  //     categories: [],
  //   },
  // });

  // const [series, setSeries] = useState([
  //   {
  //     name: "series-1",
  //     data: [30, 40, 45, 50, 49, 60, 70, 91],
  //   },
  // ]);
  // Cập nhật data trong state
  // useEffect(() => {
  //   setSeries([
  //     {
  //       name: "series-1",
  //       data: newData,
  //     },
  //   ]);
  // }, [count]);
  // const [dataSource, setDataSource] = useState(arr);
  // const data = dataSource.slice(-4);
  console.log("setorder", order);
  return (
    <div className={cx("wrapper")}>
      <Total />
      <div className={cx("chart")}>
        <h4 className={cx("order-name")}>Số lượng đã bán</h4>
        <div className={cx("mixed-chart")}>
          <Chart options={options} series={series} type="bar" width="800" />
        </div>
      </div>
      {/* <div className={cx("order")}>
        <h4 className={cx("order-name")}>Recent Order</h4>
        <header className={cx("order-header")}>
          <Table
            pagination={false}
            columns={colurm}
            dataSource={data.map((item) => ({ ...item, key: item.id }))}
          ></Table>
        </header>
      </div> */}
    </div>
  );
}

export default Home;

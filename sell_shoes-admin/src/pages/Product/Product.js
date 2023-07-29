import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import config from "~/config";
import { Button, Input, Space, Table, Modal } from "antd";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ChangeProduct from "~/pages/ChangeProduct";

const cx = classNames.bind(styles);
// const data = [
//   {
//     id: 1,
//     name: "Giày thể thao nữ MWC - 0533 Giày Sục Thể Thao Nữ Đế Cao Phối Sọc Thể Thao Siêu Cute,Sneaker Êm Chân Đế Bằng Hot Trend",
//     category: "boot",
//     price: 2000000,
//     sl: 20,
//   },
//   {
//     id: 2,
//     name: "Giày thể thao nữ MWC - 0533 Giày Sục Thể Thao Nữ Đế Cao Phối Sọc Thể Thao Siêu Cute,Sneaker Êm Chân Đế Bằng Hot Trend",
//     category: "sneaker",
//     price: 2000000,
//     sl: 20,
//   },
//   {
//     id: 3,
//     name: "Giày thể thao nữ MWC - 0533 Giày Sục Thể Thao Nữ Đế Cao Phối Sọc Thể Thao Siêu Cute,Sneaker Êm Chân Đế Bằng Hot Trend",
//     category: "sneaker",
//     price: 2000000,
//     sl: 20,
//   },
//   {
//     id: 4,
//     name: "Giày thể thao nữ MWC - 0533 Giày Sục Thể Thao Nữ Đế Cao Phối Sọc Thể Thao Siêu Cute,Sneaker Êm Chân Đế Bằng Hot Trend",
//     category: "dép",
//     price: 2000000,
//     sl: 20,
//   },
//   {
//     id: 5,
//     name: "Giày thể thao nữ MWC - 0533 Giày Sục Thể Thao Nữ Đế Cao Phối Sọc Thể Thao Siêu Cute,Sneaker Êm Chân Đế Bằng Hot Trend",
//     category: "sneaker",
//     price: 2000000,
//     sl: 20,
//   },
//   {
//     id: 6,
//     name: "Giày thể thao nữ MWC - 0533 Giày Sục Thể ",
//     category: "sneaker",
//     price: 2000000,
//     sl: 20,
//   },
// ];
function Product() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/allproduct")
      .then((response) => {
        console.log(response.data.data);
        setProductData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const rederAction = (categoryId) => {
    return (
      <div>
        <EditOutlined
          onClick={() => {
            setSelectedProductId(categoryId);
            setOpen(true);
            console.log(categoryId);
          }}
          style={{
            color: "orange",
            fontSize: "20px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        />
        <DeleteOutlined
          style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
        />
      </div>
    );
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const colurm = [
    {
      key: "1",
      title: "ID",
      dataIndex: "_id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name_product",
      ...getColumnSearchProps("name"),
    },
    {
      key: "3",
      title: "Category",
      dataIndex: "id_category",
      ...getColumnSearchProps("id_category"),
    },
    // {
    //   key: "3",
    //   title: "Product",
    //   dataIndex: "id_category",
    //   render: (record) => ({
    //     // Lấy giá trị "sneaker" từ id_category và hiển thị nó
    //     // trong thuộc tính children của cell
    //     children: record.id_category.category,
    //   }),
    //   ...getColumnSearchProps("id_category"),
    // },
    {
      key: "4",
      title: "Price",
      dataIndex: "newPrice_Product",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      key: "5",
      title: "Sl",
      dataIndex: "quantity",
      sorter: (a, b) => a.sl - b.sl,
      sortDirections: ["descend", "ascend"],
    },
    {
      key: "5",
      title: "Action",
      dataIndex: "sl",
      render: (text, record) => rederAction(record._id),
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <h3 className={cx("heading-name")}>Danh sách sản phẩm</h3>
        <Link to={config.routes.newproduct} className={cx("heading-link")}>
          <FontAwesomeIcon className={cx("heading-icon")} icon={faPlus} />
          Thêm sản phẩm
        </Link>
      </div>
      <header className={cx("body")}>
        <Table
          // pagination={false}
          // filterSearch={(input, record) => true}
          columns={colurm}
          dataSource={productData.map((item, index) => ({
            ...item,
            key: index,
          }))}
        ></Table>
      </header>
      <Modal
        // title="Thay đổi sản phẩm"
        centered
        open={open}
        footer={null}
        // onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        style={{ marginTop: 30 }}
      >
        <ChangeProduct productId={selectedProductId} />
      </Modal>
    </div>
  );
}

export default Product;

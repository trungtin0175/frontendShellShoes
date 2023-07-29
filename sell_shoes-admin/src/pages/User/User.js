import classNames from "classnames/bind";
import styles from "./User.module.scss";
import config from "~/config";
import { Button, Input, Space, Table } from "antd";
import { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const cx = classNames.bind(styles);
const data = [
  {
    id: 1,
    name: "Trần Trung Tín",
    numberphone: 905111111,
    email: "trungtin@gmail.com",
    order: 0,
  },
  {
    id: 2,
    name: "Trần Trung Nguyên",
    numberphone: 905111111,
    email: "trungtin@gmail.com",
    order: 4,
  },
  {
    id: 3,
    name: "Trần Trung Tèo",
    numberphone: 905111111,
    email: "trungtin@gmail.com",
    order: 2,
  },
  {
    id: 4,
    name: "Trần Trung Tín",
    numberphone: 905111111,
    email: "trungtin@gmail.com",
    order: 0,
  },
  {
    id: 5,
    name: "Trần Trung Tín",
    numberphone: 905111111,
    email: "trungtin@gmail.com",
    order: 3,
  },
  {
    id: 6,
    name: "Trần Trung Tín",
    numberphone: 905111111,
    email: "trungtin@gmail.com",
    order: 1,
  },
];
function Home() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  // const [dataSource, setDataSource] = useState(arr);
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
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      key: "3",
      title: "NumberPhone",
      dataIndex: "numberphone",
    },
    {
      key: "4",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "5",
      title: "Order",
      dataIndex: "order",
      sorter: (a, b) => a.order - b.order,
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("user")}>
        <h4 className={cx("user-heading")}>QUẢN LÝ USER</h4>
        <header className={cx("user-header")}>
          <Table
            // pagination={false}
            // filterSearch={(input, record) => true}
            columns={colurm}
            dataSource={data.map((item) => ({ ...item, key: item.id }))}
          ></Table>
        </header>
      </div>
    </div>
  );
}

export default Home;

import classNames from "classnames/bind";
import styles from "./NewProduct.module.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);
function NewProduct() {
  // const users = useSelector((state) => state.user.fullname);
  // console.log(users);
  const user = useSelector((state) => state.user.accessToken);

  const [formData, setFormData] = useState({
    name_product: "",
    oldPrice_product: "",
    newPrice_product: "",
    size: [],
    image: null,
    quantity: "",
    describe: "",
    detail: "",
    category: "default",
  });
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/category/all")
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "quantity"
          ? parseInt(value)
          : name === "newPrice_product" || name === "oldPrice_product"
          ? parseFloat(value)
          : value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };
  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    // if (e.target.tagName === "SELECT" && e.target.multiple) {
    const sizeValue = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setFormData({ ...formData, [name]: sizeValue });
    // }
  };
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const inputRef = useRef();
  const handleClear = () => {
    inputRef.current.reset();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name_product", formData.name_product);
    form.append("oldPrice_product", formData.oldPrice_product);
    form.append("newPrice_product", formData.newPrice_product);
    form.append("size", formData.size);
    form.append("quantity", formData.quantity);
    form.append("describe", formData.describe);
    form.append("detail", formData.detail);
    form.append("image", formData.image);
    form.append("category", formData.category);
    console.log(formData.category);
    console.log(formData.size);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/newproduct",
        form,
        {
          headers: {
            token: `Bearer ${user}`,
          },
        }
      );
      toast.success("Thêm sản phẩm thành công!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Thất bại, vui lòng kiểm tra lại kết nối!");
    }
  };
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("heading")}>Thêm sản phẩm</h3>
      <div className={cx("body")}>
        <form
          ref={inputRef}
          onSubmit={handleSubmit}
          className={cx("form")}
          id="form-1"
        >
          <div className={cx("form-group")}>
            <label htmlFor="name_product" className={cx("form-label")}>
              Tên sản phẩm
            </label>
            <input
              id="name_product"
              type="text"
              placeholder="Nhập tên sản phẩm"
              className={cx("form-control")}
              name="name_product"
              onChange={handleInputChange}
            />
          </div>
          <div className={cx("prices")}>
            <div className={cx("form-group")}>
              <label htmlFor="oldprice" className={cx("form-label")}>
                Giá gốc của sản phẩm
              </label>
              <input
                id="oldPrice_product"
                type="text"
                placeholder="Nhập giá gốc của sản phẩm"
                className={cx("form-control")}
                name="oldPrice_product"
                onChange={handleInputChange}
              />
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="newprice" className={cx("form-label")}>
                Giá khuyến mãi của sản phẩm
              </label>
              <input
                id="newPrice_product"
                type="text"
                placeholder="Nhập giá mới của sản phẩm"
                className={cx("form-control")}
                name="newPrice_product"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="size" className={cx("form-label")}>
              Size của sản phẩm (chọn nhiều)
            </label>
            <select
              name="size"
              id="size"
              multiple
              className={cx("form-select")}
              onChange={handleSizeChange}
              value={formData.size}
            >
              <option value={34}>34</option>
              <option value={35}>35</option>
              <option value={36}>36</option>
              <option value={37}>37</option>
              <option value={38}>38</option>
              <option value={39}>39</option>
              <option value={40}>40</option>
              <option value={41}>41</option>
              <option value={42}>42</option>
              <option value={43}>43</option>
              <option value={44}>44</option>
            </select>
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="quantity" className={cx("form-label")}>
              Số lượng của sản phẩm
            </label>
            <input
              id="quantity"
              type="text"
              placeholder="Nhập số lượng của sản phẩm"
              className={cx("form-control")}
              name="quantity"
              onChange={handleInputChange}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="describe" className={cx("form-label")}>
              Mô tả của sản phẩm
            </label>
            <textarea
              id="describe"
              type="text"
              placeholder="Nhập mô tả của sản phẩm"
              className={cx("form-control")}
              name="describe"
              onChange={handleInputChange}
              rows="4"
              style={{
                height: "100px",
              }}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="detail" className={cx("form-label")}>
              Chi tiết của sản phẩm
            </label>
            <textarea
              id="detail"
              type="text"
              placeholder="Nhập chi tiết của sản phẩm"
              className={cx("form-control")}
              name="detail"
              onChange={handleInputChange}
              rows="1"
              style={{
                height: "100px",
              }}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="image" className={cx("form-label")}>
              Hình ảnh của sản phẩm
            </label>
            <input
              id="image"
              type="file"
              accept=".jpg, .png"
              placeholder="Nhập chi tiết của sản phẩm"
              className={cx("form-control")}
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="category" className={cx("form-label")}>
              Phân loại sản phẩm
            </label>
            <select
              name="category"
              id="category"
              className={cx("form-control")}
              onChange={handleCategoryChange}
            >
              <option value="default">-- Chọn một danh mục --</option>
              {category.map((cate, index) => (
                <option key={index} value={cate.category}>
                  {cate.category}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleClear} className={cx("form-submit")}>
            Đăng tải
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default NewProduct;

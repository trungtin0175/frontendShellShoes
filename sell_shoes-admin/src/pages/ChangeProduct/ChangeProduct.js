// import classNames from "classnames/bind";
// import styles from "~/pages/NewProduct/NewProduct.module.scss";
// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useSelector } from "react-redux";

// const cx = classNames.bind(styles);
// function ChangeProduct({ productId }) {
//   const user = useSelector((state) => state.user.accessToken);
//   console.log(user);
//   const [product, setProduct] = useState({
//     name_product: "",
//     oldPrice_product: "",
//     newPrice_product: "",
//     size: [],
//     image: null,
//     quantity: "",
//     describe: "",
//     detail: "",
//     category: "default",
//   });
//   const [oldproduct, setOldproduct] = useState({
//     name_product: "",
//     oldPrice_product: "",
//     newPrice_product: "",
//     size: [],
//     image: null,
//     quantity: "",
//     describe: "",
//     detail: "",
//     category: "default",
//   });
//   const [category, setCategory] = useState([]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/category/all")
//       .then((response) => {
//         setCategory(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   const inputRef = useRef();
//   const handleClear = () => {
//     inputRef.current.reset();
//   };
//   const handleClearAll = () => {
//     setProduct({
//       name_product: "",
//       oldPrice_product: "",
//       newPrice_product: "",
//       size: [],
//       image: null,
//       quantity: "",
//       describe: "",
//       detail: "",
//       category: "default",
//     });
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({
//       ...product,
//       [name]:
//         name === "quantity"
//           ? parseInt(value)
//           : name === "newPrice_product" || name === "oldPrice_product"
//           ? parseFloat(value)
//           : value,
//     });
//   };
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProduct({ ...product, image: file });
//   };
//   const handleSizeChange = (e) => {
//     const { name, value } = e.target;
//     // if (e.target.tagName === "SELECT" && e.target.multiple) {
//     const sizeValue = Array.from(e.target.selectedOptions, (option) =>
//       parseInt(option.value)
//     );
//     setProduct({ ...product, [name]: sizeValue });
//     // }
//   };
//   const handleCategoryChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append(
//       "name_product",
//       oldproduct.name_product || product.name_product
//     );
//     form.append(
//       "oldPrice_product",
//       oldproduct.oldPrice_product || product.oldPrice_product
//     );
//     form.append(
//       "newPrice_product",
//       oldproduct.newPrice_product || product.newPrice_product
//     );
//     form.append("size", oldproduct.size || product.size);
//     form.append("quantity", oldproduct.quantity || product.quantity);
//     form.append("describe", oldproduct.describe || product.describe);
//     form.append("detail", oldproduct.detail || product.detail);
//     form.append("image", oldproduct.image || product.image);
//     form.append("category", oldproduct.category || product.category);
//     try {
//       const response = await axios.put(
//         `http://localhost:3000/api/product/edit/${productId}`,
//         form,
//         {
//           headers: {
//             token: `Bearer ${user}`,
//           },
//         }
//       );
//       toast.success("Submit successful", {
//         autoClose: 1000,
//       });
//       handleClearAll();
//     } catch (error) {
//       console.error(error);
//       toast.error("Submit failure, please check your connect and try again");
//     }
//   };
//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/product/detail/${productId}`, {
//         headers: {
//           token: `Bearer ${user}`,
//         },
//       })
//       .then((response) => {
//         setOldproduct(response.data);
//         console.log(setOldproduct(response.data));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [productId]);
//   return (
//     <div className={cx("wrapper-change")}>
//       <h3 className={cx("heading")}>Thay đổi sản phẩm</h3>
//       <div className={cx("body")}>
//         <form onSubmit={handleSubmit} className={cx("form")} id="form-1">
//           <div className={cx("form-group")}>
//             <label htmlFor="name_product" className={cx("form-label")}>
//               Tên sản phẩm
//             </label>
//             <input
//               id="name_product"
//               type="text"
//               placeholder="Nhập tên sản phẩm"
//               className={cx("form-control")}
//               name="name_product"
//               onChange={handleInputChange}
//               value={oldproduct.name_product || product.name_product}
//             />
//           </div>
//           <div className={cx("prices-change")}>
//             <div className={cx("form-group")}>
//               <label htmlFor="oldPrice_product" className={cx("form-label")}>
//                 Giá gốc của sản phẩm
//               </label>
//               <input
//                 id="oldPrice_product"
//                 type="text"
//                 placeholder="Nhập giá gốc của sản phẩm"
//                 className={cx("form-control")}
//                 name="oldPrice_product"
//                 onChange={handleInputChange}
//                 value={oldproduct.oldPrice_product || product.oldPrice_product}
//               />
//             </div>
//             <div className={cx("form-group")}>
//               <label htmlFor="newPrice_product" className={cx("form-label")}>
//                 Giá mới của sản phẩm
//               </label>
//               <input
//                 id="newPrice_product"
//                 type="text"
//                 placeholder="Nhập giá mới của sản phẩm"
//                 className={cx("form-control")}
//                 name="newPrice_product"
//                 onChange={handleInputChange}
//                 value={oldproduct.newPrice_product || product.newPrice_product}
//               />
//             </div>
//           </div>
//           <div className={cx("form-group")}>
//             <label htmlFor="size" className={cx("form-label")}>
//               Size của sản phẩm (chọn nhiều)
//             </label>
//             <select
//               name="size"
//               id="size"
//               multiple
//               className={cx("form-select")}
//               onChange={handleSizeChange}
//               value={product.size}
//             >
//               <option value="35">35</option>
//               <option value="36">36</option>
//               <option value="37">37</option>
//               <option value="38">38</option>
//               <option value="39">39</option>
//               <option value="40">40</option>
//               <option value="41">41</option>
//               <option value="42">42</option>
//             </select>
//           </div>
//           <div className={cx("form-group")}>
//             <label htmlFor="quantity" className={cx("form-label")}>
//               Số lượng của sản phẩm
//             </label>
//             <input
//               id="quantity"
//               type="text"
//               placeholder="Nhập số lượng của sản phẩm"
//               className={cx("form-control")}
//               name="quantity"
//               onChange={handleInputChange}
//               value={oldproduct.quantity || product.quantity}
//             />
//           </div>
//           <div className={cx("form-group")}>
//             <label htmlFor="describe" className={cx("form-label")}>
//               Mô tả của sản phẩm
//             </label>
//             <textarea
//               id="describe"
//               type="text"
//               placeholder="Nhập mô tả của sản phẩm"
//               className={cx("form-control")}
//               name="describe"
//               onChange={handleInputChange}
//               rows="4"
//               style={{
//                 height: "100px",
//               }}
//               value={oldproduct.describe || product.describe}
//             />
//           </div>
//           <div className={cx("form-group")}>
//             <label htmlFor="detail" className={cx("form-label")}>
//               Chi tiết của sản phẩm
//             </label>
//             <textarea
//               id="detail"
//               type="text"
//               placeholder="Nhập chi tiết của sản phẩm"
//               className={cx("form-control")}
//               name="detail"
//               onChange={handleInputChange}
//               rows="4"
//               style={{
//                 height: "100px",
//               }}
//               value={oldproduct.detail || product.detail}
//             />
//           </div>
//           <div className={cx("form-group")}>
//             <label htmlFor="image" className={cx("form-label")}>
//               Hình ảnh của sản phẩm (4 ảnh)
//             </label>
//             <input
//               id="image"
//               type="file"
//               multiple
//               accept=".jpg, .png"
//               placeholder="Nhập chi tiết của sản phẩm"
//               className={cx("form-control")}
//               name="image"
//               onChange={handleImageChange}
//             />
//           </div>
//           <div className={cx("form-group")}>
//             <label htmlFor="category" className={cx("form-label")}>
//               Phân loại sản phẩm
//             </label>
//             <select
//               name="category"
//               id="category"
//               className={cx("form-control")}
//               onChange={handleCategoryChange}
//             >
//               <option value="default">-- Chọn một danh mục --</option>
//               {category.map((cate, index) => (
//                 <option key={index} value={cate.category}>
//                   {cate.category}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button className={cx("form-submit")}>Đăng tải</button>
//           <ToastContainer />
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ChangeProduct;

import classNames from "classnames/bind";
import styles from "~/pages/NewProduct/NewProduct.module.scss";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
function ChangeProduct({ productId }) {
  const user = useSelector((state) => state.user.accessToken);
  console.log(user);
  const [currentProduct, setCurrentProduct] = useState({
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
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const inputRef = useRef();
  const handleClear = () => {
    inputRef.current.reset();
  };

  const handleClearAll = () => {
    setCurrentProduct({
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
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setCurrentProduct({
  //     ...currentProduct,
  //     [name]:
  //       name === "quantity"
  //         ? parseInt(value)
  //         : name === "newPrice_product" || name === "oldPrice_product"
  //         ? parseInt(value)
  //         : value,
  //   });
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]:
        name === "quantity"
          ? value === ""
            ? null
            : parseInt(value)
          : name === "newPrice_product" || name === "oldPrice_product"
          ? value === ""
            ? null
            : parseFloat(value)
          : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCurrentProduct({ ...currentProduct, image: file });
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    const sizeValue = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setCurrentProduct({ ...currentProduct, [name]: sizeValue });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name_product", currentProduct.name_product);
    form.append("oldPrice_product", currentProduct.oldPrice_product);
    form.append("newPrice_product", currentProduct.newPrice_product);
    form.append("size", currentProduct.size);
    form.append("quantity", currentProduct.quantity);
    form.append("describe", currentProduct.describe);
    form.append("detail", currentProduct.detail);
    form.append("image", currentProduct.image);
    form.append("category", currentProduct.category);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/product/edit/${productId}`,
        form,
        {
          headers: {
            token: `Bearer ${user}`,
          },
        }
      );
      toast.success("Thay đổi thành công!", {
        autoClose: 1000,
      });
      handleClearAll();
    } catch (error) {
      console.error(error);
      toast.error("Thất bại, vui lòng kiểm tra lại kết nối!");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/product/detail/${productId}`, {
        headers: {
          token: `Bearer ${user}`,
        },
      })
      .then((response) => {
        setCurrentProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  return (
    <div className={cx("wrapper-change")}>
      <h3 className={cx("heading")}>Thay đổi sản phẩm</h3>
      <div className={cx("body")}>
        <form onSubmit={handleSubmit} className={cx("form")} id="form-1">
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
              value={currentProduct.name_product}
            />
          </div>
          <div className={cx("prices-change")}>
            <div className={cx("form-group")}>
              <label htmlFor="oldPrice_product" className={cx("form-label")}>
                Giá gốc của sản phẩm
              </label>
              <input
                id="oldPrice_product"
                type="text"
                placeholder="Nhập giá gốc của sản phẩm"
                className={cx("form-control")}
                name="oldPrice_product"
                onChange={handleInputChange}
                value={currentProduct.oldPrice_product}
              />
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="newPrice_product" className={cx("form-label")}>
                Giá mới của sản phẩm
              </label>
              <input
                id="newPrice_product"
                type="text"
                placeholder="Nhập giá mới của sản phẩm"
                className={cx("form-control")}
                name="newPrice_product"
                onChange={handleInputChange}
                value={currentProduct.newPrice_product}
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
              value={currentProduct.size}
            >
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
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
              value={currentProduct.quantity}
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
              value={currentProduct.describe}
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
              rows="4"
              style={{
                height: "100px",
              }}
              value={currentProduct.detail}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="image" className={cx("form-label")}>
              Hình ảnh của sản phẩm (4 ảnh)
            </label>
            <input
              id="image"
              type="file"
              multiple
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
          <button className={cx("form-submit")}>Đăng tải</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default ChangeProduct;

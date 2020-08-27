import express from "express";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../util";
const router = express.Router();
const cors = require("cors");
router.use(cors());

router.get("/categories/:category", async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({
    category: category,
  });
  res.send(products);
});

router.post("/home", async (req, res) => {
  const searchValue = req.body.searchParams.q,
    page =
      req.body.searchParams.page - 1 === 0 ? 1 : req.body.searchParams.page - 1,
    category = req.body.searchParams.category,
    numOfItemsInPage = req.body.numOfItemsInPage;
  let totalItemCount = 0;
  await Product.find({}).countDocuments(function (err, count) {
    totalItemCount = count;
  });
  await Product.find({
    name: { $regex: searchValue, $options: "i" },
    category: { $regex: category, $options: "i" },
  })
    .sort({ price: "asc" })
    .limit(numOfItemsInPage)
    .skip(numOfItemsInPage * page)
    .then((result) => {
      return res
        .status(200)
        .send({ products: result, totalItemCount: totalItemCount });
    })
    .catch((error) => {
      return res.status(500).send({ message: "Error!", error: error });
    });
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id });
  if (product) {
    res.send(product);
  } else {
    res.send(404).status.send({ message: "Product Not Found" });
  }
});
router.post("/", isAuth, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newProduct });
  }
  return res.status(500).send({ message: "Error in Creating Product" });
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ message: "Error in Updating Product" });
});

router.delete("/:id", async (req, res) => {
  const deletedProduct = await Product.deleteMany({});
});
export default router;

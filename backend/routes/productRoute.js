import express from "express";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../util";
import db from "../database/models";
const router = express.Router();
const cors = require("cors");
router.use(cors());

router.post("/home", async (req, res) => {
  console.log("TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
  // const jane = await db["User"].create({
  //   username: "TEST",
  //   password: "dsa",
  //   Name: "Jane",
  //   Email: "das1",
  //   IsAdmin: false,
  //   TestValueUnder: new Array(["dasd", "214"]),
  //   TestValueTwo: new Date(),
  // });
  // const product = await db["Product"].create({
  //   name: "Product24",
  //   price: 15,
  //   rating: 26,
  // });
  // const incrementResult = await product.increment('price', {by:5})
  // const incrementResult = await product.increment({ price: 44, rating: 10 });
  // console.log(jane.Name); // "Jane"
  // jane.Name = "Ada";
  // the name is still "Jane" in the database
  // await jane.destroy();
  // console.log("incrementResult", incrementResult);
  // console.log(jane.Name); // "Jane"


  // const select = await db["User"].findAll({
  //   attributes: ['Name', 'id']
  // })
  const select = await db["User"].findByPk(5)
  console.log('select', select)
  // console.log('JSON.stringify(select)', JSON.stringify(select, null, 3))
  const searchValue = req.body.searchParams.q,
    page =
      req.body.searchParams.page - 1 < 0 ? 0 : req.body.searchParams.page - 1,
    category = req.body.searchParams.category,
    numOfItemsInPage = req.body.numOfItemsInPage;
  let totalItemCount = 0;
  await Product.find({
    name: { $regex: searchValue, $options: "i" },
    category: { $regex: category, $options: "i" },
  }).countDocuments(function (err, count) {
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
    res.status(404).send({ message: "Product Not Found" });
  }
});
router.post("/", async (req, res) => {
  console.log(req.body);
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

router.delete("/:id", async () => {});
export default router;

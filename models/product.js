const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json",
    );
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        try {
          products = JSON.parse(fileContent);
        } catch {
          products = [];
        }
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json",
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        try {
          cb(JSON.parse(fileContent));
        } catch {
          cb([]);
        }
      }
    });
  }
};

const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

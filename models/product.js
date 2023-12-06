const fs = require("fs");
const path = require("path");

const products = [];

module.exports = class Products {
  constructor(t) {
    this.title = t;
  }
  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json",
    );
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          // Handle the error here, possibly logging it or informing the user
          console.log(err);
        }
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
    // return products;
  }
};

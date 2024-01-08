const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const json2csv = require("json2csv");
const { COOKIE, URLS } = require("./scarapperData")

class ProductScrapper {

  static async getProductPage(url) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://www.flipkart.com" + url,
      headers: { Cookie: COOKIE },
    };
    const response = await axios.request(config);
    const html = response.data;
    const $ = cheerio.load(html);

    let product = {
      title: "",
      description: "",
      price: 0,
      rating: 0,
      imageUrl: "",
      category: "",
    };
    $("._2whKao").each((index, element) => {
      const data = $(element).text();
      product.category = data;
    });
    $(".B_NuCI").each((index, element) => {
      const data = $(element).text(); product.title = data;
    });
    $("._1mXcCf").each((index, element) => {
      const data = $(element).children("p").text();
      product.description = data;
    });
    $("._30jeq3").each((index, element) => {
      const data = $(element).text().replace("₹", "").replace(" ", "").replace(",", "");
      product.price = Number(data);
    });
    $("._3LWZlK").each((index, element) => {
      const data = $(element).text();
      product.rating = data;
    });
    $("._3qGmMb").each((index, element) => {
      const data = $(element).eq(0).attr("src");
      product.imageUrl = data;
    });
    return product;
  }

  static async scrape(i, u) {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${u}&page=${i}`,
        headers: { Cookie: COOKIE },
      };
      const response = await axios.request(config);
      const html = response.data;
      const $ = cheerio.load(html);
      const products = [];
      $("._2rpwqI").each((index, element) => {
        const data = $(element).attr("href");
        const product = ProductScrapper.getProductPage(data)
        products.push(product)
      });
      return Promise.all(products);
    } catch (error) {
      console.error("Error fetching the webpage:", error.message);
    }
  }

}

async function save() {
  const products = []
  for (let i = 0; i < 4; i++) {
    const _products = [
      ...await ProductScrapper.scrape(1, URLS[2]),
      // ...await ProductScrapper.scrape(2, URLS[i]),
      // ...await ProductScrapper.scrape(3, URLS[i]),
      // ...await ProductScrapper.scrape(4, URLS[i]),
      // ...await ProductScrapper.scrape(5, URLS[i]),
      // ...await ProductScrapper.scrape(6, URLS[i]),
      // ...await ProductScrapper.scrape(7, URLS[i]),
      // ...await ProductScrapper.scrape(8, URLS[i]),
      // ...await ProductScrapper.scrape(9, URLS[i]),
      // ...await ProductScrapper.scrape(10, URLS[i]),
    ]
    products.push(..._products)
  }
  ExcellFactory.save(products, "xlsx")
}

class ExcellFactory {
  fields = ["title", "description", "price", "rating", "category", "imageUrl"];

  static async save(products, ext) {
    if (ext === "csv") this.csvSaver(products)
    if (ext === "xlsx") this.xlsSaver(products)
  }

  static async xlsSaver(products) {
    // Create a new workbook and add a worksheet
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Products');
    // Add headers to the worksheet
    this.fields.forEach((field, index) => {
      worksheet.cell(1, index + 1).string(field);
    });
    // Add data to the worksheet
    products.forEach((product, rowIndex) => {
      this.fields.forEach((field, colIndex) => {
        worksheet.cell(rowIndex + 2, colIndex + 1).string(String(product[field]));
      });
    });
    // Save the workbook to a file
    workbook.write('products.xlsx', (err, stats) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Excel file created successfully: products.xlsx');
      }
    });
  }

  static async csvSaver(products) {
    const csv = json2csv.parse(products, { fields: this.fields });
    fs.writeFileSync("products.csv", csv);
  }
}





save().then((r) => console.log(r)).catch(e => console.log(e))

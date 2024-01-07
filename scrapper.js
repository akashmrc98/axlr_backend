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

  static saveProductsAsCSV(products) {
    const fields = ["title", "description", "price", "rating", "category", "imageUrl"];
    const csv = json2csv.parse(products, { fields });
    fs.writeFileSync("products.csv", csv);
  }
}

async function save() {
  const products = []
  for (let i = 0; i < URLS.length; i++) {
    const _products = [
      ...await ProductScrapper.scrape(1, URLS[i]),
      ...await ProductScrapper.scrape(2, URLS[i]),
      ...await ProductScrapper.scrape(3, URLS[i]),
      ...await ProductScrapper.scrape(4, URLS[i]),
      ...await ProductScrapper.scrape(5, URLS[i]),
      ...await ProductScrapper.scrape(6, URLS[i]),
      ...await ProductScrapper.scrape(7, URLS[i]),
      ...await ProductScrapper.scrape(8, URLS[i]),
      ...await ProductScrapper.scrape(9, URLS[i]),
      ...await ProductScrapper.scrape(10, URLS[i]),
    ]
    products.push(..._products)
  }
  ProductScrapper.saveProductsAsCSV(products)
}


save().then((r) => console.log(r)).catch(e => console.log(e))

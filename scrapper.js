const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const json2csv = require("json2csv");
const { FK_COOKIE } = require("./src/config");

const _url = "https://www.flipkart.com/audio-video/pr?sid=0pm&otracker=categorytree&fm=neo%2Fmerchandising&iid=M_8bf4ef6a-304c-42f8-b158-60b40c2f44f7_1_372UD5BXDFYS_MC.9JGNW7M0TUHD&otracker=hp_rich_navigation_1_1.navigationCard.RICH_NAVIGATION_Electronics~Audio~All_9JGNW7M0TUHD&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_1_L2_view-all&cid=9JGNW7M0TUHD"

class ProductScrapper {

  static async getProductPage(url) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://www.flipkart.com" + url,
      headers: { Cookie: FK_COOKIE },
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
    $(".B_NuCI").each((index, element) => {
      const data = $(element).text();
      product.title = data;
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
    $("._3GIHBu").each((index, element) => {
      const data = $(element).find("a").text();
      product.category = data;
    });
    $("._3qGmMb").each((index, element) => {
      const data = $(element).eq(0).attr("src");
      product.imageUrl = data;
    });
    return product;
  }

  static async scrape(i) {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${_url}&page=${i}`,
        headers: { Cookie: FK_COOKIE },
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
  const products = [
    ...await ProductScrapper.scrape(1),
    ...await ProductScrapper.scrape(2),
    ...await ProductScrapper.scrape(3),
    ...await ProductScrapper.scrape(4),
    ...await ProductScrapper.scrape(5),
    ...await ProductScrapper.scrape(6),
    ...await ProductScrapper.scrape(7),
    ...await ProductScrapper.scrape(8),
    ...await ProductScrapper.scrape(9),
    ...await ProductScrapper.scrape(10),
    ...await ProductScrapper.scrape(11),
    ...await ProductScrapper.scrape(12),
    ...await ProductScrapper.scrape(13),
    ...await ProductScrapper.scrape(14),
    ...await ProductScrapper.scrape(15),
    ...await ProductScrapper.scrape(16),
    ...await ProductScrapper.scrape(17),
    ...await ProductScrapper.scrape(18),
    ...await ProductScrapper.scrape(19),
    ...await ProductScrapper.scrape(20),
    ...await ProductScrapper.scrape(21),
    ...await ProductScrapper.scrape(22),
    ...await ProductScrapper.scrape(23),
    ...await ProductScrapper.scrape(24),
  ]
  ProductScrapper.saveProductsAsCSV(products)
}


save().then((r) => console.log(r)).catch(e => console.log(e))

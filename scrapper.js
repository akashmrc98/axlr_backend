const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const json2csv = require("json2csv");

class productScrapper {}

async function getProductPage(url) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Cookie:
        "K-ACTION=null; SN=2.VI181C39AD398E4DF5A66084EF1E22F13D.SI8FC276169D5344E68EB537D011D3A215.VS7318EA5FECD54A839FB46FB175A03329.1704559561; T=TI170455956122300183974466354500497726422171708486160252819036086932; at=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQ2Yjk5NDViLWZmYTEtNGQ5ZC1iZDQyLTFkN2RmZTU4ZGNmYSJ9.eyJleHAiOjE3MDYyODc1NjEsImlhdCI6MTcwNDU1OTU2MSwiaXNzIjoia2V2bGFyIiwianRpIjoiNTM4YjVlYmItN2FjZS00MTQwLWE0MTgtN2Y4YmM0MTBjYWUxIiwidHlwZSI6IkFUIiwiZElkIjoiVEkxNzA0NTU5NTYxMjIzMDAxODM5NzQ0NjYzNTQ1MDA0OTc3MjY0MjIxNzE3MDg0ODYxNjAyNTI4MTkwMzYwODY5MzIiLCJ0SWQiOiJtYXBpIiwidnMiOiJMTyIsInoiOiJIWUQiLCJtIjp0cnVlLCJnZW4iOjR9.juKnw0WI1JTF_YJz1BR9s56WzxqzngXdNcil6P9ro70; rt=null",
    },
  };
  const response = await axios.request(config);
  const html = response.data;
  const $ = cheerio.load(html);
}

async function scrape() {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://www.flipkart.com/audio-video/pr?sid=0pm&otracker=categorytree&fm=neo%2Fmerchandising&iid=M_8bf4ef6a-304c-42f8-b158-60b40c2f44f7_1_372UD5BXDFYS_MC.9JGNW7M0TUHD&otracker=hp_rich_navigation_1_1.navigationCard.RICH_NAVIGATION_Electronics~Audio~All_9JGNW7M0TUHD&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_1_L2_view-all&cid=9JGNW7M0TUHD",
      headers: {
        Cookie:
          "K-ACTION=null; SN=2.VI181C39AD398E4DF5A66084EF1E22F13D.SI8FC276169D5344E68EB537D011D3A215.VS7318EA5FECD54A839FB46FB175A03329.1704559561; T=TI170455956122300183974466354500497726422171708486160252819036086932; at=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQ2Yjk5NDViLWZmYTEtNGQ5ZC1iZDQyLTFkN2RmZTU4ZGNmYSJ9.eyJleHAiOjE3MDYyODc1NjEsImlhdCI6MTcwNDU1OTU2MSwiaXNzIjoia2V2bGFyIiwianRpIjoiNTM4YjVlYmItN2FjZS00MTQwLWE0MTgtN2Y4YmM0MTBjYWUxIiwidHlwZSI6IkFUIiwiZElkIjoiVEkxNzA0NTU5NTYxMjIzMDAxODM5NzQ0NjYzNTQ1MDA0OTc3MjY0MjIxNzE3MDg0ODYxNjAyNTI4MTkwMzYwODY5MzIiLCJ0SWQiOiJtYXBpIiwidnMiOiJMTyIsInoiOiJIWUQiLCJtIjp0cnVlLCJnZW4iOjR9.juKnw0WI1JTF_YJz1BR9s56WzxqzngXdNcil6P9ro70; rt=null",
      },
    };
    const response = await axios.request(config);
    const html = response.data;
    const $ = cheerio.load(html);
    $("._2rpwqI").each((index, element) => {
      const data = $(element).att("href");
      console.log(data);
    });
  } catch (error) {
    console.error("Error fetching the webpage:", error.message);
  }
}

// Run the scraper
scrape();

// const product = [];
// const price = [];
// const rating = [];
// const category = [];
// const url = [];
// // Add your scraping logic here
// $(".s1Q9rs").each((index, element) => {
//   const data = $(element).text();
//   product.push(data);
// });
// $("._30jeq3").each((index, element) => {
//   const data = $(element).text();
//   price.push(data);
// });
// $("._3LWZlK").each((index, element) => {
//   const data = $(element).text();
//   rating.push(data);
// });
// $("._3Djpdu").each((index, element) => {
//   const data = $(element).text();
//   category.push(data);
// });

// $(".CXW8mj").each((index, element) => {
//   const data = $(element).children("img").eq(0).attr("src");
//   url.push(data);
// });

// const products = [];
// for (let i = 0; i < product.length; i++) {
//   products.push({
//     product: product[i],
//     category: category[i],
//     price: price[i],
//     rating: rating[i],
//     imageUrl: url,
//   });
// }

// const fields = ["product", "category", "price", "rating", "imageUrl"];
// // Convert JSON to CSV
// const csv = json2csv.parse(products, { fields });
// // Write CSV to a file
// fs.writeFileSync("products.csv", csv);

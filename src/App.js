import React, { useEffect, useState } from "react";
import { ProductList } from "./components/product/ProductList";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPrice = async (productUrl) => {
    const url = "https://corsproxy.io/?" + encodeURIComponent(productUrl);
    const res = await fetch(url);
    const htmlContent = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const ls = doc.getElementsByTagName("bdi");
    return ls[0].textContent;
  };

  const getImg = async (url) => {
    const responseImg = await fetch(url);

    const dataImg = await responseImg.json();
    return dataImg.guid.rendered;
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(
        "https://hectorabzar.com/wp-json/wp/v2/product"
      );

      if (!response.ok) {
        throw new Error("خطا در انجام عملیات");
      }
      const data = await response.json();
      //console.log(data);
      const itemList = [];
      for (let item of data) {
        //const price = await getPrice(item.link);
        const price = "25000";

        const image = item._links["wp:featuredmedia"]
          ? await getImg(item._links["wp:featuredmedia"][0].href)
          : "";
        itemList.push({
          id: item.id,
          title: item.title.rendered,
          about: item.excerpt.rendered,
          price: price,
          img: image,
        });
      }

      setItems(itemList);
    } catch (error) {
      console.log(error);
      setError(true);
    }

    setIsLoading(false);

    //console.log(data[0].title);
    //console.log(itemList);
    //const url = data[0].link;
    //console.log(url);
    //const da = await res.json();
    // console.log(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {isLoading && <p>در حال گرفتن اطلاعات...</p>}
      {!isLoading && !error && <ProductList items={items} />}
      {!isLoading && error && <p>خطا در انجام عملیات</p>}
    </div>
  );
}

export default App;

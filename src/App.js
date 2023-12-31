import React, { useCallback, useEffect, useState } from "react";
import { ProductList } from "./components/product/ProductList";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPrice = async (productUrl) => {
    try {
      const url = "https://corsproxy.io/?" + encodeURIComponent(productUrl);
      const res = await fetch(url);
      if (!res.ok) throw new Error("sth went wrong");
      const htmlContent = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const ls = doc.getElementsByTagName("bdi");
      return ls[0].textContent;
    } catch (error) {
      return "";
    }
  };

  const getImg = async (url) => {
    try {
      const responseImg = await fetch(url);
      if (!responseImg.ok) throw new Error("sth went wrong");
      const dataImg = await responseImg.json();
      return dataImg.guid.rendered;
    } catch (error) {
      return "";
    }
  };

  const fetchData = useCallback(async () => {
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

      const itemList = [];
      for (let item of data) {
        const price = await getPrice(item.link);
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
      setError(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {isLoading && <p className="loading">در حال گرفتن اطلاعات...</p>}
      {!isLoading && !error && <ProductList items={items} />}
      {!isLoading && error && <p className="error">خطا در انجام عملیات</p>}
    </div>
  );
}

export default App;

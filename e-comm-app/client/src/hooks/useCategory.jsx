import axios from "axios";
import { useEffect, useState } from "react";

const useCategory = () => {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-Category");
      if (data.success) {
        let categorys = !data.category
          ? []
          : Array.isArray(data.category)
          ? data.category
          : [data.category];
        setCategory(categorys);
      }
    } catch (error) {
      console.log(`error in custon category hook : ${error}`);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return category;
};

export default useCategory;

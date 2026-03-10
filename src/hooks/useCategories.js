
import { useState, useEffect } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("https://fakestoreapi.com/products/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
}
        fetchCategories();
}, []);

  return { categories, loading };
}
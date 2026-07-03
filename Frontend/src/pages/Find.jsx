import React, { useState, useEffect } from "react";
import Itemcard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import axios from "axios";
import { api } from "../config";
import HashLoader from "react-spinners/HashLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSearchParams } from "react-router-dom";

function Find() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const override = {
    display: "block",
    borderColor: "#fdf004",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${api}/item`);

        let data = response.data?.data || [];

        if (searchQuery.trim() !== "") {
          const query = searchQuery.toLowerCase();

          data = data.filter(
            (item) =>
              item.title?.toLowerCase().includes(query) ||
              item.description?.toLowerCase().includes(query)
          );
        }

        setItems(data);
        AOS.refresh();
      } catch (error) {
        console.error("Error fetching items:", error.response?.data || error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [searchQuery]);

  return (
    <main id="findpage">
      <Navbar />

      <section>
        <h1 className="lfh1">Lost and Found Items</h1>

        {loading ? (
          <HashLoader
            color="#fdf004"
            loading={loading}
            cssOverride={override}
            size={50}
          />
        ) : (
          <div className="item-container">
            {items.length > 0 ? (
              [...items]
                .reverse()
                .map((item) => (
                  <Itemcard
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    createdAt={item.createdAt}
                  />
                ))
            ) : (
              <h3 style={{ textAlign: "center", width: "100%" }}>
                No items found.
              </h3>
            )}

            <div className="extraItem"></div>
            <div className="extraItem"></div>
            <div className="extraItem"></div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Find;
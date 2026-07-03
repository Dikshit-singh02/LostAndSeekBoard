import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../config";
import HashLoader from "react-spinners/HashLoader";
import noimg from "../assets/no-image.png";

function Details() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(noimg);

  const { id } = useParams();

  const override = {
    display: "block",
    borderColor: "#fdf004",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${api}/item/${id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!item.image) return;

    axios
      .get(`${api}/files/${item.image}`)
      .then(() => {
        setImage(`${api}/files/${item.image}`);
      })
      .catch(() => {
        setImage(noimg);
      });
  }, [item.image]);

  return (
    <main id="detailspage">
      <Navbar />

      <section>
        {loading ? (
          <HashLoader
            color="#fdf004"
            loading={loading}
            cssOverride={override}
            size={50}
          />
        ) : (
          <div className="details-card">
            <div className="img-container">
              <img src={image} alt={item.title || "Item"} />
            </div>

            <div className="action-container">
              <a href={`tel:${item.phoneno}`}>
                <CallIcon /> Call
              </a>

              <a href={`mailto:${item.email}`}>
                <EmailIcon /> Email
              </a>
            </div>

            <h1>{item.title}</h1>

            <div className="details-container">
              <p>Founder</p>
              <p>{item.name}</p>
            </div>

            <div className="details-container desc">
              <p>{item.description}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Details;
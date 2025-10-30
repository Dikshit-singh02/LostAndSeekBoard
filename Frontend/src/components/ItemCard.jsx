import { useState ,useEffect} from "react";
import { api } from "../config";
import noImage from "../assets/no-image.png"
import axios from "axios";


export default function Itemcard(props) {
  const [image, setImage] = useState(noImage);
  useEffect(() => {
    axios
      .get(`${api}/files/${props.image}`)
      .then((res) => {
        setImage(`${api}/files/${props.image}`);
      })
      .catch((error) => {
        setImage(noImage);
      });


  },[props.image]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <a href={"/find/details/" + props.id} data-aos="fade-up">
      <div className="card">
        <div className="card-img">
          <img
            src={image}
            alt=""
          />
        </div>
        <div className="card-desc">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          <p className="post-date">Posted: {formatDate(props.createdAt)}</p>
        </div>
      </div>
    </a>
  );
}

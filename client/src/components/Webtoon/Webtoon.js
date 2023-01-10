import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Webtoon.module.scss";

function Webtoon({
  _id,
  title,
  author,
  url,
  img,
  service,
  updateDays,
  searchKeyword,
}) {
  return (
    <div className={styles.wrapper}>
      <img src={img}></img>
      <div className={styles.title}>
        <Link to={`/webtoon/${encodeURI(encodeURIComponent(title))}`}>
          {title.length > 8 ? title.slice(0, 7).trim() + "..." : title}
        </Link>
      </div>
    </div>
  );
}

export default Webtoon;

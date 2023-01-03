import { useState } from "react";
import styles from "./Loading.module.scss";

function Loading() {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;

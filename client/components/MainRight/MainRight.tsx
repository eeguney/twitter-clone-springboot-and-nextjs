import React from "react";
import styles from "../../styles/MainRight.module.scss";
import { IconList, Icons } from "../UI/Icons";
import TrendsForYou from "./Widgets/TrendsForYou";

type Props = {};

const MainRight = (props: Props): JSX.Element => {
  return (
    <section className={styles.mainRight}>
      <div className={styles.pageHeader}>
        <div className={styles.search}>
          <Icons icon={IconList.Search} size={21} color="#333" />
          <input type="text" placeholder="Search Twitter" />
        </div>
      </div>
      <div className={styles.widgetContainer}>
        <TrendsForYou label="Trends For You" />
      </div>
    </section>
  );
};

export default MainRight;

import React from "react";
import styles from "../../styles/Widgets.module.scss";

interface WidgetProps {
    label: string;
    children: JSX.Element;
};

const Widget = (props: WidgetProps) => {
  return (
    <div className={styles.widget}>
      <div className={styles.trendsForYou}>
        <label>{props.label}</label>
        {
            props.children
        }
      </div>
    </div>
  );
};

export default Widget;

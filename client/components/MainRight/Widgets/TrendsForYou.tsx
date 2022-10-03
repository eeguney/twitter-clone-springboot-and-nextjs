import React from "react";
import styles from "../../../styles/Widgets.module.scss";
import Widget from "../Widget";
import { Links } from "../../UI/Links";

interface TrendsForYouProps {
    label: string;
};

const TrendsForYou = (props: TrendsForYouProps) => {
  return (
    <Widget label={props.label}>
      <div className={styles.list}>
        <Links.WidgetTrendsLink title="ALLAH BELANIZI VERSİN" trendCause="Trending in Turkey" tweetCount="2,428" />
        <Links.WidgetTrendsLink title="Amazon" trendCause="Business and Finance" tweetCount="953K" />
        <Links.WidgetTrendsLink title="Ekmek 5" trendCause="Trending in Turkey" tweetCount="9,146" />
        <Links.WidgetTrendsLink title="#Asgari" trendCause="Trending in Turkey" tweetCount="5,020" />
        <Links.WidgetTrendsLink title="ALLAH BELANIZI VERSİN" trendCause="Trending in Turkey" tweetCount="2,428" />
        <Links.WidgetTrendsLink title="Amazon" trendCause="Business and Finance" tweetCount="953K" />
        <Links.WidgetTrendsLink title="Ekmek 5" trendCause="Trending in Turkey" tweetCount="9,146" />
        <Links.WidgetTrendsLink title="#Asgari" trendCause="Trending in Turkey" tweetCount="5,020" />
      </div>
    </Widget>
  );
};

export default TrendsForYou;

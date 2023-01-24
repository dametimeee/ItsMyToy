import React from "react";
import styles from "./Sidebar.module.scss";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Icon } from "semantic-ui-react";

function Sidebar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId="/management/members"
          onSelect={({ itemId }) => {
            // maybe push to the route
          }}
          items={[
            {
              title: "Dashboard",
              itemId: "/dashboard",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => <Icon name="inbox" />,
            },
            {
              title: "Management",
              itemId: "/management",
              elemBefore: () => <Icon name="users" />,
              subNav: [
                {
                  title: "Projects",
                  itemId: "/management/projects",
                },
                {
                  title: "Members",
                  itemId: "/management/members",
                },
              ],
            },
            {
              title: "Another Item",
              itemId: "/another",
              subNav: [
                {
                  title: "Teams",
                  itemId: "/management/teams",
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Sidebar;

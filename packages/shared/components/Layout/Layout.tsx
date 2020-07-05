import React from "react";
import { useStaticQuery, graphql } from "gatsby";

// components
import { Header } from "../Header";

// styles
import "./Layout.scss";

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer></footer>
      </div>
    </>
  );
};

export default Layout;

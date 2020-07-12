import React, { useContext } from "react";

// packages
import { Link } from "gatsby";

// contexts
import { CountContext } from "../../contexts";

// types
export interface IHeaderProps {
  siteTitle: string;
}

const Header: React.FC<IHeaderProps> = ({ siteTitle = "" }) => {
  const { count, increment } = useContext(CountContext);

  return (
    <header
      style={{
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div>
          <button onClick={increment}>Increment</button>
          <span> Current Count: {count}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

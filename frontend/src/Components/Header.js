import PropTypes from "prop-types";
import { useLocation } from "react-router";
import Button from "./Button";

const Header = ({ title, onAdd , showAdd }) => {
  const location = useLocation()

  return (
    <header className="header">
      <h1>{title}</h1>
{location.pathname === '/' && <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
        showAdd={showAdd}
      />
}    </header>
  );
};

// const headerStyles = {
// color:'red',
// fontSize:'3em',
// backgroundColor:'black'
// }

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

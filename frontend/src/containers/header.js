import { connect } from "react-redux";
import { isLoggedIn } from "../actions";
import Header from "../components/Header";

const mapDispatchToProps = dispatch => {
  return {
    IsLoggedIn: () => {
      dispatch(isLoggedIn());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Header);

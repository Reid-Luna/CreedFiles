import { connect } from "react-redux";
import { logout } from "../actions";
import Header from "../components/Header";
import { withRouter } from "react-router";

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));

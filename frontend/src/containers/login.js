import { connect } from "react-redux";
import { login, register, isLoggedIn } from "../actions";
import Login from "../components/Login";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Login: (username, password) => {
      dispatch(login(username, password));
    },
    IsLoggedIn: () => {
      dispatch(isLoggedIn());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

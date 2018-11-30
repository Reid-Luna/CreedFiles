import { connect } from "react-redux";
import { register } from "../actions";
import Register from "../components/Register";

const mapStateToProps = state => {
  return {
    status: state.register,
    auth: state.auth,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Register: (username, email, password) => {
      dispatch(register(username, email, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

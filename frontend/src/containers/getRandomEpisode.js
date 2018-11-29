import { connect } from "react-redux";
import { getRandom, getTotal, isLoggedIn, getCurrentUser } from "../actions";
import GRE from "../components/GetRandomEpisode";

const mapStateToProps = state => {
  return {
    episode: state.episodes,
    total: state.total.total,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GetEpisode: () => {
      dispatch(getRandom());
    },
    GetTotal: () => {
      dispatch(getTotal());
    },
    IsLoggedIn: () => {
      dispatch(isLoggedIn());
    },
    CurrentUser: () => {
      dispatch(getCurrentUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GRE);

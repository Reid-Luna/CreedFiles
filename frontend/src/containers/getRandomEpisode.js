import { connect } from "react-redux";
import { getRandom, getTotal } from "../actions";
import GRE from "../components/GetRandomEpisode";

const mapStateToProps = state => {
  return {
    episode: state.episodes,
    total: state.total.total,
    auth: state.auth,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GetEpisode: () => {
      dispatch(getRandom());
    },
    GetTotal: () => {
      dispatch(getTotal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GRE);

import { connect } from "react-redux";
import { getRandom } from "../actions";
import GRE from "../components/GetRandomEpisode";

const mapStateToProps = state => {
  return {
    episodes: state.episodes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetEpisode: () => {
      dispatch(getRandom());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GRE);

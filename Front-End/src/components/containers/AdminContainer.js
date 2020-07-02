import Admin from "../Admin.js";
import { connect } from "react-redux";
import { getUsersList, addNewUser, updateUser } from "../../actions/usersListActions";
import { openModal } from "../../actions/userModalActions";
const mapStateToProps = state => {
  return {
    users: state.usersList.users,
    isOpen: state.userModal.isOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsersList: () => dispatch(getUsersList()),
    openModal: flag => dispatch(openModal(flag)),
    addNewUser: userData => dispatch(addNewUser(userData)),
    updateUser: userData => dispatch(updateUser(userData)),
  };
};

const AdminContainer = connect(mapStateToProps, mapDispatchToProps)(Admin);

export default AdminContainer;

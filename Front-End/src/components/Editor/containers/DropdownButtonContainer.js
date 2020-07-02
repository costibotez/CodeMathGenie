import { connect } from "react-redux";
import DropdownButton from "../components/DropdownButton.js";
import { SUPPORTED_LANGUAGES, LANGUAGE_NAME_CONVERSIONS } from "../../../constants";
import { selectLanguageOfNew } from "../../../actions/fileeditActions";

const mapStateToProps = state => {
  let listOfPrograms = [];
  SUPPORTED_LANGUAGES.forEach((element, index) => {
    listOfPrograms[index] = {};
    listOfPrograms[index]["name"] = LANGUAGE_NAME_CONVERSIONS[element];
    listOfPrograms[index]["language"] = element;
  });

  return {
    dropdownItems: listOfPrograms,
    currentlang: state.fileedit.lang,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectLanguageOfNew: lang => {
      dispatch(selectLanguageOfNew(lang));
    },
  };
};

const DropdownButtonContainer = connect(mapStateToProps, mapDispatchToProps)(DropdownButton);

export default DropdownButtonContainer;

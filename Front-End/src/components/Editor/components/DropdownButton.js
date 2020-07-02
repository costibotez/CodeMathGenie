import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { faCss3 } from "@fortawesome/free-brands-svg-icons";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**--------Props---------------
 * dropdownItems: array of strings, each string being the name of a Program
 * displayValue: string to be displayed as the placeholder for the dropdown
 * onSelect: function called when an item is selected in the dropdown
 */
/**--------Optional props--------
 * defaultOpen: boolean determining if the dropdown should start off open or closed
 */
export default class DropdownButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };
  }

  //==============React Lifecycle Functions===================//
  componentDidMount() {}

  toggleHandler = prevVal => {
    this.setState({ dropdownOpen: !prevVal });
  };

  selectLanguage = lang => {
    let result = true;

    if (this.props.selectLanguageOfNew && result) {
      this.props.selectLanguageOfNew(lang);
    }
  };

  renderDropdownItems = () => {
    //map each program string in the array to a dropdown item
    return !this.props.dropdownItems
      ? ""
      : this.props.dropdownItems.map(program => {
          let faLanguage;
          switch (program.language) {
            case "js":
              faLanguage = faJs;
              break;
            case "css":
              faLanguage = faCss3;
              break;
            case "html":
            default:
              faLanguage = faHtml5;
          }
          return (
            <DropdownItem
              key={program.language}
              onClick={() => this.selectLanguage(program.language)}
            >
              <FontAwesomeIcon icon={faLanguage} fixedWidth />
              <span style={{ marginLeft: "10px" }}>{program.name}</span>
            </DropdownItem>
          );
        });
  };

  render() {
    // let value = this.props.displayValue
    // if(this.props.dirty){
    //   value = (<span>&#8226;{this.props.displayValue}</span>)
    // }

    let faLanguage;
    switch (this.props.currentlang) {
      case "js":
        faLanguage = faJs;
        break;
      case "css":
        faLanguage = faCss3;
        break;
      case "html":
      default:
        faLanguage = faHtml5;
    }

    return (
      <div className="editor-language-dropdown">
        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={() => this.toggleHandler(this.state.dropdownOpen)}
        >
          {/* HACK: disables the colors entirely, makes the dropdown transparent */}
          <DropdownToggle className="btn-language-dropdown" color={""} caret>
            <div className="editor-language-dropdown-closed-content">
              <FontAwesomeIcon icon={faLanguage} fixedWidth /> {this.props.currentlang}
            </div>
          </DropdownToggle>
          <DropdownMenu>{this.renderDropdownItems()}</DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

import React from "react";
import { SORT_BY_NAME, SORT_BY_CREATE, SORT_BY_UPDATE } from "../constants";
import Radio from "../../common/Radio.js";

/**-------Props--------
 * runCode: function to be called when button is pressed
 */
const SortRadio = props => {
  let options = [
    { display: "Name", value: SORT_BY_NAME },
    { display: "Create Date", value: SORT_BY_CREATE },
    { display: "Update Date", value: SORT_BY_UPDATE }];
  
  return (
    <Radio
      options={options}
      defaultSelected={props.sortMode}
      horizontalMode= {true} 
      handleClick={props.updateSortMode}
    />
  );
};

export default SortRadio;

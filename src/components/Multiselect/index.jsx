import React from "react";

import Select from "react-select";

const Multiselect = ({ handleColumnChange, columnOptions }) => (
  <Select
    defaultValue={columnOptions}
    isMulti
    name="colors"
    options={columnOptions}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={(e) => handleColumnChange(e)}
  />
);

export default Multiselect;

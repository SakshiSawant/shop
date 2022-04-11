import React from "react";
import { forwardRef } from 'react';
// import "./RadioButton.scss";

const RadioButton = forwardRef(function RadioButton(
  {
    label,
    id,
    name,
    value,
    // onChange,
    checked
  },
  ref
) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        type="radio"
        checked={checked}
        ref={ref}
      />
    </div>
  )
})
  
  
//   (props) => {
//     return (
//         <div className="RadioButton">
//             <input id={props.id} onChange={props.changed} value={props.value} type="radio" checked={props.isSelected} />
//             <label htmlFor={props.id}>{props.label}</label>
//         </div>
//     );
// }

export default RadioButton;
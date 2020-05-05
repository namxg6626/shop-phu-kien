import React from "react";
import "./Form.scss";

const Input = (props) => {
  const { label, required, type } = props;
  return (
    <div className="form__feild">
      <label htmlFor={label}>{label.replace(/[-]/g, " ")}</label>
      <input
        type={type}
        id={label}
        name={label}
        required={required}
        placeholder="nhập thông tin..."
      />
    </div>
  );
};

export default function Form(props) {
  const { feildConfig, handleSubmit } = props;
  const { method, action } = feildConfig;
  return (
    <form className="form" method={method} action={action} name="form">
      {feildConfig.feildSet.map((x, id) => (
        <Input
          key={id}
          label={x.feildName}
          type={x.type}
          required={x.required}
        />
      ))}
      <button onClick={handleSubmit}>Xác nhận</button>
    </form>
  );
}

// const registerFeildConfig = {
//   method: "POST",
//   feildSet: [
//     { feildName: "email", required: true },
//     { feildName: "password", required: true },
//     { feildName: "confirm-password", required: true },
//   ],
// };

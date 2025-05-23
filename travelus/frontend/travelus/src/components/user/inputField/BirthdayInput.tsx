import React from "react";
import { TextField } from "@mui/material";

interface BirthdayInputProps {
  labelName: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BirthdayInput: React.FC<BirthdayInputProps> = ({ labelName, name, onChange }) => {
  return (
    <TextField
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
        "& .MuiInputBase-root": {
          backgroundColor: "white",
          height: "100%",
          borderRadius: "inherit",
        },
        "& .MuiInputBase-input": {
          backgroundColor: "white",
          fontSize: "18px",
          fontWeight: "bold",
          border: "1px solid #9E9E9E",
          borderRadius: "10px",
        },
        "& .MuiInputLabel-root": {
          color: "#9E9E9E",
          fontSize: "20px",
        },
        "& .MuiInputLabel-shrink": {
          fontSize: "16px",
        },
        "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after": {
          display: "none",
        },
      }}
      id="birthday"
      label={labelName}
      variant="filled"
      value={name}
      helperText="ex) 19990101"
      onChange={onChange}
      autoComplete="off"
    />
  );
};

export default BirthdayInput;

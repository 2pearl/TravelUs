import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface GenderInputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenderInput: React.FC<GenderInputProps> = ({ name, onChange }) => {
  return (
    <FormControl>
      <FormLabel id="gender">Gender</FormLabel>
      <RadioGroup
        className="pl-2"
        row
        aria-labelledby="gender"
        id="gender"
        onChange={onChange}>
        <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
        <FormControlLabel value="MALE" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
  );
};

export default GenderInput;

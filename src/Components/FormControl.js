import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export default function SelectFormControl({ label, id, value, onChange, options }) {
    return (
        <FormControl sx={{ m: 1, width: "158px" }}>
            <InputLabel htmlFor={id} size="small">
                {label}
            </InputLabel>
            <Select native value={value} onChange={onChange} id={id} label={label} size="small">
                <option aria-label="None" value="" />
                {options.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}

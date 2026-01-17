// import React from "react";
// import TextField from "@mui/material/TextField";

// type Props = {
//   name: string;
//   type: string;
//   label: string;
// };

// const CustomizedInput = (props: Props) => {
//   return (
//     <TextField
//       margin="normal"
//       name={props.name}
//       label={props.label}
//       type={props.type}
//       slotProps={{
//         inputLabel: {
//           style: { color: "white" }, // replaces InputLabelProps
//         },
//         input: {
//           style: { borderRadius: 10, fontSize: 20, color: "white" }, // replaces InputProps.style
//         },
//       }}
//       sx={{ width: 400 }} // sets overall width
//     />
//   );
// };

// export default CustomizedInput;

import React from "react";
import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      name={props.name}
      label={props.label}
      type={props.type}
      slotProps={{
        inputLabel: {
          style: { color: "#333" }, // dark label color
        },
        input: {
          style: {
            borderRadius: 10,
            fontSize: 16,
            color: "#000", // input text color
          },
        },
      }}
      sx={{
        width: "100%", // responsive width
        maxWidth: 400,
        bgcolor: "#f5f5f5", // light background for input field
      }}
      variant="outlined"
    />
  );
};

export default CustomizedInput;


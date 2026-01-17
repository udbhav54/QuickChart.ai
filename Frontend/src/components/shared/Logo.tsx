import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <img
          src="/image.png"
          alt="QuickChart Logo"
          width="30"
          height="30"
          className="image-inverted"
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          fontWeight: 800,
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px" }}>QuickChat-GPT</span>
      </Typography>
    </div>
  );
}

export default Logo;

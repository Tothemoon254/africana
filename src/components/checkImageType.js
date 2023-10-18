import React from "react";

function checkImageType(file) {
    // Check if the file is an image
    if (file.type.startsWith("image/")) {
      if (file.type === "image/jpeg" || file.type === "image/jpg") {
        // It's a JPEG image
        return "image/jpeg";
      } else if (file.type === "image/png") {
        // It's a PNG image
        return "image/png";
      } else {
        // It's an image but not JPEG or PNG
        return "other";
      }
    } else {
      // It's not an image
      return "not-an-image";
    }
  }
  export default checkImageType
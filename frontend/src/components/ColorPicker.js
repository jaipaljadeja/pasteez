import React from "react";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/monolith.min.css";

class ColorPicker extends React.Component {
  handleChange(newColor) {
    console.log(newColor, "from the pickerjs");
    this.props.onChange(newColor);
  }

  componentDidMount() {
    Pickr.create({
      el: ".pickr",
      theme: "monolith",
      default: "#00DCF3", // or 'classic', or 'nano'
      swatches: [
        "rgba(208, 2, 27, 1)",
        "rgba(245, 166, 35, 1)",
        "rgba(248, 231, 28, 1)",
        "rgba(139, 87, 42, 1)",
        "rgba(126, 211, 33, 1)",
        "rgba(189, 16, 224, 1)",
        "rgba(74, 144, 226, 1)",
        "rgba(0, 0, 0, 1)",
      ],

      components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
          hex: true,
          input: true,
          save: true,
        },
      },
    }).on("save", (color, instance) => {
      let newColor = color.toHEXA().toString();
      this.handleChange(newColor);
    });
  }

  render() {
    return <div className="pickr"></div>;
  }
}

export default ColorPicker;

import { useEffect, useRef } from "react";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/monolith.min.css";

export default function ColorPicker({ data, setData }) {
  const pickrElement = document.getElementsByClassName("color-picker");
  // creating a Pickr instance
  const pickr = () => {
    Pickr.create({
      el: ".color-picker",
      theme: "monolith",
      default: "#00DCF3", // or 'classic', or 'nano'
      swatches: [
        "rgba(244, 67, 54, 1)",
        "rgba(233, 30, 99, 0.95)",
        "rgba(156, 39, 176, 0.9)",
        "rgba(103, 58, 183, 0.85)",
        "rgba(63, 81, 181, 0.8)",
        "rgba(33, 150, 243, 0.75)",
        "rgba(3, 169, 244, 0.7)",
        "rgba(0, 188, 212, 0.7)",
        "rgba(0, 150, 136, 0.75)",
        "rgba(76, 175, 80, 0.8)",
        "rgba(139, 195, 74, 0.85)",
        "rgba(205, 220, 57, 0.9)",
        "rgba(255, 235, 59, 0.95)",
        "rgba(255, 193, 7, 1)",
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
      console.log('Event: "save"', color, instance);
      const newColor = color.toHEXA().toString();
      setData({ ...data, frameBG: newColor });
    });
  };

  const pickrRef = useRef(); // create a ref object
  pickrRef.current = pickr; // assign the pickr function to the ref object

  useEffect(() => {
    if (pickrElement) {
      return pickrRef.current();
    }
  }, [pickrElement]);

  return (
    <>
      <div className="color-picker"></div>
    </>
  );
}

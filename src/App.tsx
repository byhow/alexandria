import { useState } from "react";
import { SketchPicker } from "react-color";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [color, setColor] = useState("#1f47f9");
  const [gradient, setGradient] = useState([]);
  return (
    <div>
      <SketchPicker
        color={color}
        onChange={(color) => {
          setColor(color.hex);
          invoke(
            "generate_gradient",
            color.rgb as unknown as Record<string, unknown> // will figure this out later
          ).then((grad) => {
            console.log(grad);
            setGradient(grad as []);
          });
        }}
      />
      {gradient.map((color) => (
        <div
          style={{
            padding: "2rem",
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
          }}
        >
          rgb({color[0]}, {color[1]}, {color[2]})
        </div>
      ))}
    </div>
  );
}

export default App;

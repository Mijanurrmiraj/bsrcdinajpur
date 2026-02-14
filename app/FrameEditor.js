"use client";

import { useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

export default function FrameEditor() {

  const stageRef = useRef();

  const [userImage, setUserImage] = useState(null);
  const [img] = useImage(userImage);
  const [frameImage] = useImage("/frame.png");

  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);


  const upload = (e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      setUserImage(reader.result);
    };

    reader.readAsDataURL(file);

  };


  const download = () => {

    const uri = stageRef.current.toDataURL({
      pixelRatio: 3
    });

    const link = document.createElement("a");

    link.download = "bsap-frame.png";

    link.href = uri;

    link.click();

  };


  return (

    <div style={{
      textAlign: "center",
      background: "#7A0C1C",
      minHeight: "100vh",
      color: "white",
      padding: "20px"
    }}>

      <h2>৮ম প্রতিষ্ঠাতা বার্ষিকী ফ্রেম</h2>

      <input type="file" onChange={upload} />

      <br /><br />

      <Stage
        width={350}
        height={350}
        ref={stageRef}
        style={{
          margin: "auto",
          border: "3px solid white"
        }}
      >

        <Layer>

          {img && (

            <KonvaImage
              image={img}
              draggable
              x={position.x}
              y={position.y}
              scaleX={scale}
              scaleY={scale}
              onDragEnd={(e) =>
                setPosition({
                  x: e.target.x(),
                  y: e.target.y()
                })
              }
            />

          )}

          {frameImage && (

            <KonvaImage
              image={frameImage}
              width={350}
              height={350}
              listening={false}
            />

          )}

        </Layer>

      </Stage>

      <br />

      <button onClick={download}>
        Download
      </button>

    </div>

  );

}

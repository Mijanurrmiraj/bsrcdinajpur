"use client";

import { useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

export default function Home() {

  const stageRef = useRef();

  const [userImage, setUserImage] = useState(null);
  const [frameImage] = useImage("/frame.png");

  const [img] = useImage(userImage);

  const [position, setPosition] = useState({
    x: 50,
    y: 50
  });

  const [scale, setScale] = useState(1);


  // Upload photo
  const upload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setUserImage(reader.result);
    };

    reader.readAsDataURL(file);

  };


  // Download image
  const download = () => {

    const uri = stageRef.current.toDataURL({
      pixelRatio: 3
    });

    const link = document.createElement("a");

    link.download = "bsap-frame.png";

    link.href = uri;

    link.click();

  };


  // Zoom support
  const handleWheel = (e) => {

    e.evt.preventDefault();

    const newScale = scale + e.evt.deltaY * -0.001;

    setScale(newScale);

  };


  return (

    <div style={{
      textAlign: "center",
      background: "linear-gradient(#0D0D0D,#7A0C1C)",
      minHeight: "100vh",
      color: "white",
      padding: "20px"
    }}>

      <h1>
        বাংলাদেশ ছাত্র অধিকার পরিষদ
      </h1>

      <h3>
        ৮ম প্রতিষ্ঠাতা বার্ষিকী
      </h3>

      <input type="file" onChange={upload} />

      <br /><br />


      <Stage
        width={350}
        height={350}
        ref={stageRef}
        onWheel={handleWheel}
        style={{
          margin: "auto",
          border: "3px solid red",
          borderRadius: "10px",
          background: "#111"
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
              onDragEnd={(e) => {

                setPosition({
                  x: e.target.x(),
                  y: e.target.y()
                });

              }}
            />

          )}

          {frameImage && (

            <KonvaImage
              image={frameImage}
              x={0}
              y={0}
              width={350}
              height={350}
              listening={false}
            />

          )}

        </Layer>

      </Stage>


      <br />

      <button
        onClick={download}
        style={{
          background: "#C8102E",
          color: "white",
          padding: "12px 25px",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Download Photo
      </button>


    </div>

  );

}

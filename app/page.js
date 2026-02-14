"use client";

import { useEffect, useRef } from "react";
import { fabric } from "fabric";

export default function Home() {

  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {

    const canvas = new fabric.Canvas("canvas", {
      width: 1080,
      height: 1080,
      backgroundColor: "#7A0C1C",
    });

    fabricRef.current = canvas;

    // load frame
    fabric.Image.fromURL("/frame.png", (img) => {

      img.set({
        selectable: false,
        evented: false,
        left: 0,
        top: 0,
        scaleX: 1080 / img.width,
        scaleY: 1080 / img.height,
      });

      canvas.add(img);
      canvas.sendToBack(img);

    });

  }, []);


  const upload = (e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      fabric.Image.fromURL(reader.result, (img) => {

        img.set({
          left: 200,
          top: 200,
          cornerColor: "red",
          cornerSize: 20,
          transparentCorners: false,
        });

        img.scaleToWidth(500);

        fabricRef.current.add(img);

        fabricRef.current.setActiveObject(img);

      });

    };

    reader.readAsDataURL(file);

  };


  const download = () => {

    const url = fabricRef.current.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");

    link.download = "bsap-frame-HD.png";

    link.href = url;

    link.click();

  };


  return (

    <div style={{
      textAlign: "center",
      background: "#7A0C1C",
      minHeight: "100vh",
      padding: "20px",
      color: "white"
    }}>

      <h2>৮ম প্রতিষ্ঠাতা বার্ষিকী ফ্রেম</h2>

      <input type="file" onChange={upload} />

      <br /><br />

      <canvas
        id="canvas"
        style={{
          width: "350px",
          height: "350px",
          border: "3px solid white"
        }}
      />

      <br /><br />

      <button
        onClick={download}
        style={{
          padding: "12px 25px",
          background: "red",
          color: "white",
          border: "none"
        }}
      >
        HD Download
      </button>

    </div>

  );

}

"use client";

import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

export default function Home() {

  const canvasEl = useRef(null);
  const containerRef = useRef(null);
  const fabricCanvas = useRef(null);
  const frameObj = useRef(null);

  const CANVAS_SIZE = 1080;

  const [canvasWidth, setCanvasWidth] = useState(350);


  // Responsive resize
  useEffect(() => {

    const resizeCanvas = () => {

      const width = containerRef.current.offsetWidth;

      setCanvasWidth(width);

      if (fabricCanvas.current) {

        fabricCanvas.current.setZoom(width / CANVAS_SIZE);

        fabricCanvas.current.setWidth(width);
        fabricCanvas.current.setHeight(width);

      }

    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () =>
      window.removeEventListener("resize", resizeCanvas);

  }, []);


  // Initialize fabric
  useEffect(() => {

    const canvas = new fabric.Canvas("canvas", {

      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      selection: false

    });

    fabricCanvas.current = canvas;

    fabric.Image.fromURL("/frame.png", (img) => {

      img.scaleToWidth(CANVAS_SIZE);

      img.set({

        left: 0,
        top: 0,
        selectable: false,
        evented: false

      });

      frameObj.current = img;

      canvas.add(img);
      canvas.bringToFront(img);

    });

  }, []);


  // Upload image
  const upload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      fabric.Image.fromURL(reader.result, (img) => {

        img.scaleToWidth(500);

        img.set({

          left: 300,
          top: 300,
          cornerStyle: "circle",
          cornerColor: "red",
          borderColor: "white"

        });

        fabricCanvas.current.add(img);

        fabricCanvas.current.setActiveObject(img);

        fabricCanvas.current.bringToFront(frameObj.current);

      });

    };

    reader.readAsDataURL(file);

  };


  // Download HD
  const download = () => {

    const data =
      fabricCanvas.current.toDataURL({

        format: "png",
        quality: 1

      });

    const link = document.createElement("a");

    link.href = data;
    link.download = "bsap-frame.png";

    link.click();

  };


  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          বাংলাদেশ ছাত্র অধিকার পরিষদ
        </h1>

        <p style={styles.subtitle}>
          ৮ম প্রতিষ্ঠাতা বার্ষিকী ফ্রেম
        </p>


        <label style={styles.uploadBtn}>
          ছবি আপলোড করুন
          <input
            type="file"
            hidden
            onChange={upload}
          />
        </label>


        <div
          ref={containerRef}
          style={styles.canvasContainer}
        >

          <canvas
            id="canvas"
            ref={canvasEl}
          />

        </div>


        <button
          onClick={download}
          style={styles.downloadBtn}
        >
          HD Download
        </button>

      </div>

    </div>

  );

}


const styles = {

  container: {

    minHeight: "100vh",

    background:
      "linear-gradient(135deg,#2b0000,#7A0C1C,#2b0000)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    padding: "15px"

  },


  card: {

    width: "100%",
    maxWidth: "420px",

    background: "rgba(255,255,255,0.05)",

    padding: "20px",

    borderRadius: "15px",

    textAlign: "center",

    boxShadow: "0 0 20px red"

  },


  title: {

    color: "white",
    fontSize: "22px"

  },


  subtitle: {

    color: "#ffcccc",
    fontSize: "16px",
    marginBottom: "15px"

  },


  uploadBtn: {

    display: "block",

    background: "red",

    padding: "12px",

    borderRadius: "8px",

    marginBottom: "15px",

    color: "white",

    cursor: "pointer"

  },


  canvasContainer: {

    width: "100%",
    aspectRatio: "1/1",

    border: "2px solid red",

    borderRadius: "10px",

    overflow: "hidden",

    marginBottom: "15px"

  },


  downloadBtn: {

    width: "100%",

    padding: "12px",

    background: "darkred",

    color: "white",

    border: "none",

    borderRadius: "8px",

    fontSize: "16px"

  }

};

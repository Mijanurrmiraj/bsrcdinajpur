"use client";

import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

export default function Home() {

  const containerRef = useRef(null);
  const fabricCanvas = useRef(null);
  const frameObj = useRef(null);

  const [canvasSize, setCanvasSize] = useState(350);

  const ORIGINAL_SIZE = 2048; // আপনার frame.png resolution (change if needed)

  // responsive resize
  useEffect(() => {

    const resize = () => {

      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;

      setCanvasSize(width);

      if (fabricCanvas.current) {

        fabricCanvas.current.setZoom(width / ORIGINAL_SIZE);

        fabricCanvas.current.setWidth(width);
        fabricCanvas.current.setHeight(width);

        fabricCanvas.current.renderAll();
      }
    };

    resize();

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);

  }, []);


  // init fabric canvas
  useEffect(() => {

    const canvas = new fabric.Canvas("canvas", {

      width: ORIGINAL_SIZE,
      height: ORIGINAL_SIZE,
      selection: true

    });

    fabricCanvas.current = canvas;

    // load frame
    fabric.Image.fromURL("/frame.png", (img) => {

      img.scaleToWidth(ORIGINAL_SIZE);

      img.set({

        left: 0,
        top: 0,

        selectable: false,
        evented: false,

        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true

      });

      frameObj.current = img;

      canvas.add(img);

      canvas.bringToFront(img);

      canvas.renderAll();

    });

  }, []);


  // upload photo
  const upload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      fabric.Image.fromURL(reader.result, (img) => {

        img.scaleToWidth(ORIGINAL_SIZE * 0.7);

        img.set({

          left: ORIGINAL_SIZE * 0.15,
          top: ORIGINAL_SIZE * 0.15,

          cornerStyle: "circle",
          cornerColor: "red",
          borderColor: "white"

        });

        fabricCanvas.current.add(img);

        fabricCanvas.current.setActiveObject(img);

        fabricCanvas.current.bringToFront(frameObj.current);

        fabricCanvas.current.renderAll();

      });

    };

    reader.readAsDataURL(file);

  };


  // HD Download (Original Quality)
  const download = () => {

    const canvas = fabricCanvas.current;

    // save current view
    const zoom = canvas.getZoom();
    const width = canvas.getWidth();
    const height = canvas.getHeight();

    // set original resolution
    canvas.setZoom(1);
    canvas.setWidth(ORIGINAL_SIZE);
    canvas.setHeight(ORIGINAL_SIZE);

    canvas.renderAll();

    const dataURL = canvas.toDataURL({

      format: "png",
      quality: 1,
      multiplier: 1

    });

    // restore responsive view
    canvas.setZoom(zoom);
    canvas.setWidth(width);
    canvas.setHeight(height);

    canvas.renderAll();

    // download
    const link = document.createElement("a");

    link.href = dataURL;

    link.download = "bsap-frame-HD.png";

    link.click();

  };


  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          বাংলাদেশ ছাত্র অধিকার পরিষদ
        </h1>

        <p style={styles.subtitle}>
          ৮ম প্রতিষ্ঠাতা বার্ষিকী প্রোফাইল ফ্রেম
        </p>


        <label style={styles.uploadBtn}>
          ছবি আপলোড করুন
          <input type="file" hidden onChange={upload} />
        </label>


        <div ref={containerRef} style={styles.canvasContainer}>

          <canvas id="canvas"/>

        </div>


        <button onClick={download} style={styles.downloadBtn}>
          HD Download
        </button>

     <div style={styles.footer}>

  <p>
    Powered by <b>BSRC Dinajpur</b>
  </p>

  <p>
    Developer:{" "}
    <a
      href="https://facebook.com/mijanurrmiraj"
      target="_blank"
      rel="noopener noreferrer"
      style={styles.link}
    >
      Miraj
    </a>
  </p>

</div>

  );

}


const styles = {link: {

  color: "#ffffff",

  textDecoration: "none",

  fontWeight: "bold"

},

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

    fontSize: "16px",

    cursor: "pointer"

  }

};

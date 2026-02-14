"use client";

import { useEffect, useRef } from "react";
import { fabric } from "fabric";

export default function Home() {

  const fabricCanvas = useRef(null);
  const frameObj = useRef(null);

  useEffect(() => {

    const canvas = new fabric.Canvas("canvas", {
      width: 1080,
      height: 1080,
      selection: false
    });

    fabricCanvas.current = canvas;

    fabric.Image.fromURL("/frame.png", (img) => {

      img.scaleToWidth(1080);

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


  const upload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      fabric.Image.fromURL(reader.result, (img) => {

        img.scaleToWidth(600);

        img.set({
          left: 240,
          top: 240,
          cornerSize: 18,
          cornerColor: "#ff0000",
          borderColor: "#ffffff",
          cornerStyle: "circle"
        });

        fabricCanvas.current.add(img);
        fabricCanvas.current.setActiveObject(img);

        fabricCanvas.current.bringToFront(frameObj.current);

      });

    };

    reader.readAsDataURL(file);

  };


  const download = () => {

    const url = fabricCanvas.current.toDataURL({
      format: "png",
      quality: 1
    });

    const link = document.createElement("a");

    link.href = url;
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
          ৮ম প্রতিষ্ঠাতা বার্ষিকী প্রোফাইল ফ্রেম
        </p>


        <label style={styles.uploadBtn}>
          ছবি আপলোড করুন
          <input
            type="file"
            onChange={upload}
            hidden
          />
        </label>


        <div style={styles.canvasBox}>

          <canvas id="canvas" style={styles.canvas}/>

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

    padding: "20px"

  },


  card: {

    background: "rgba(255,255,255,0.05)",

    backdropFilter: "blur(10px)",

    padding: "30px",

    borderRadius: "15px",

    textAlign: "center",

    boxShadow: "0 0 30px rgba(255,0,0,0.4)"

  },


  title: {

    color: "#fff",

    marginBottom: "5px"

  },


  subtitle: {

    color: "#ffcccc",

    marginBottom: "20px"

  },


  uploadBtn: {

    display: "inline-block",

    padding: "12px 25px",

    background:
      "linear-gradient(45deg,#ff0000,#b30000)",

    color: "#fff",

    borderRadius: "8px",

    cursor: "pointer",

    marginBottom: "20px"

  },


  canvasBox: {

    border: "2px solid red",

    borderRadius: "10px",

    boxShadow: "0 0 20px red",

    marginBottom: "20px"

  },


  canvas: {

    width: "350px",

    height: "350px"

  },


  downloadBtn: {

    padding: "12px 30px",

    background:
      "linear-gradient(45deg,#ff0000,#660000)",

    color: "#fff",

    border: "none",

    borderRadius: "8px",

    fontSize: "16px",

    cursor: "pointer"

  }

};

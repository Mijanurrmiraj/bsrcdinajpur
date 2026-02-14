"use client";

import { useRef, useState, useEffect } from "react";

export default function Home() {

  const canvasRef = useRef(null);

  const frameRef = useRef(null);

  const [userImage, setUserImage] = useState(null);

  const [position, setPosition] = useState({ x: 300, y: 300 });

  const [scale, setScale] = useState(1);

  const [dragging, setDragging] = useState(false);

  const CANVAS_SIZE = 1080;


  useEffect(() => {

    const frame = new Image();

    frame.src = "/frame.png";

    frame.onload = () => {

      frameRef.current = frame;

      draw();

    };

  }, []);


  const draw = () => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    if (userImage) {

      const width = userImage.width * scale;
      const height = userImage.height * scale;

      ctx.drawImage(userImage, position.x, position.y, width, height);

    }

    if (frameRef.current) {

      ctx.drawImage(frameRef.current, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

    }

  };


  const upload = (e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      const img = new Image();

      img.src = reader.result;

      img.onload = () => {

        setUserImage(img);

        setPosition({ x: 200, y: 200 });

        setScale(0.8);

        setTimeout(draw, 100);

      };

    };

    reader.readAsDataURL(file);

  };


  const startDrag = () => setDragging(true);

  const stopDrag = () => setDragging(false);


  const move = (clientX, clientY) => {

    if (!dragging) return;

    const rect = canvasRef.current.getBoundingClientRect();

    const x = (clientX - rect.left) * (CANVAS_SIZE / rect.width);
    const y = (clientY - rect.top) * (CANVAS_SIZE / rect.height);

    setPosition({ x, y });

    draw();

  };


  const mouseMove = (e) => move(e.clientX, e.clientY);

  const touchMove = (e) => {

    const touch = e.touches[0];

    move(touch.clientX, touch.clientY);

  };


  const download = () => {

    const link = document.createElement("a");

    link.download = "bsap-frame-HD.png";

    link.href = canvasRef.current.toDataURL("image/png", 1.0);

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
        ref={canvasRef}
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onMouseMove={mouseMove}
        onTouchStart={startDrag}
        onTouchEnd={stopDrag}
        onTouchMove={touchMove}
        style={{
          width: "350px",
          height: "350px",
          border: "3px solid white",
          cursor: "move"
        }}
      />

      <br /><br />

      <button
        onClick={download}
        style={{
          padding: "12px 25px",
          background: "red",
          color: "white",
          border: "none",
          fontSize: "16px"
        }}
      >
        HD Download
      </button>

    </div>

  );

}

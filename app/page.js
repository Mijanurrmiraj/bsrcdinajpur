"use client";

import { useRef, useState, useEffect } from "react";

export default function Home() {

  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);

  const [position, setPosition] = useState({ x: 100, y: 100 });

  const [dragging, setDragging] = useState(false);

  const frame = useRef(null);


  useEffect(() => {

    const img = new Image();
    img.src = "/frame.png";

    img.onload = () => {
      frame.current = img;
      draw();
    };

  }, []);


  const draw = () => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 350;
    canvas.height = 350;

    ctx.clearRect(0, 0, 350, 350);

    if (image) {
      ctx.drawImage(image, position.x, position.y, 200, 200);
    }

    if (frame.current) {
      ctx.drawImage(frame.current, 0, 0, 350, 350);
    }

  };


  const upload = (e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      const img = new Image();

      img.src = reader.result;

      img.onload = () => {
        setImage(img);
        draw();
      };

    };

    reader.readAsDataURL(file);

  };


  const startDrag = () => setDragging(true);

  const stopDrag = () => setDragging(false);

  const onMove = (e) => {

    if (!dragging) return;

    const rect = canvasRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left - 100;
    const y = e.clientY - rect.top - 100;

    setPosition({ x, y });

    draw();

  };


  const download = () => {

    const link = document.createElement("a");

    link.download = "bsap-frame.png";

    link.href = canvasRef.current.toDataURL();

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

      <canvas
        ref={canvasRef}
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onMouseMove={onMove}
        onTouchStart={startDrag}
        onTouchEnd={stopDrag}
        onTouchMove={(e) => {

          const rect = canvasRef.current.getBoundingClientRect();

          const touch = e.touches[0];

          const x = touch.clientX - rect.left - 100;
          const y = touch.clientY - rect.top - 100;

          setPosition({ x, y });

          draw();

        }}
        style={{
          border: "3px solid white",
          cursor: "move"
        }}
      />

      <br /><br />

      <button onClick={download}>
        Download
      </button>

    </div>

  );

}

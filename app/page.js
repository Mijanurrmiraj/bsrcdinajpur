"use client";

import dynamic from "next/dynamic";

const FrameEditor = dynamic(() => import("./FrameEditor"), {
  ssr: false
});

export default function Home() {
  return <FrameEditor />;
}

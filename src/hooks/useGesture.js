import { useEffect, useState } from "react";

export default function useGesture() {
  const [gesture, setGesture] = useState("none");

  useEffect(() => {
    // ⚠️ versi awal: simulasi dulu (biar tidak ribet)
    // nanti bisa diganti MediaPipe

    const handleKey = (e) => {
      if (e.key === "1") {
        setGesture("point"); // telunjuk
      } else if (e.key === "0") {
        setGesture("none");
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return gesture;
}
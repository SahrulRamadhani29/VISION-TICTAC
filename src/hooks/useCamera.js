import { useEffect, useRef } from "react";

export default function useCamera() {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        // 🔥 CHECK SUPPORT
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error("Camera not supported");
          alert("Browser tidak mendukung kamera");
          return;
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        alert("Tidak bisa mengakses kamera");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return videoRef;
}
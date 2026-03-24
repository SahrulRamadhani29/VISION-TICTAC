import { useEffect, useState } from "react";

export default function useGesture(videoRef) {
  const [gesture, setGesture] = useState({
    x: 0,
    y: 0,
    isPointing: false,
  });

  useEffect(() => {
    let camera = null;
    let hands = null;
    let interval = null;

    const init = () => {
      // 🔥 TUNGGU VIDEO & MEDIAPIPE SIAP
      if (!videoRef.current || !window.Hands || !window.Camera) return;

      hands = new window.Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      });

      hands.onResults((results) => {
        if (
          results.multiHandLandmarks &&
          results.multiHandLandmarks.length > 0
        ) {
          const landmarks = results.multiHandLandmarks[0];

          const indexTip = landmarks[8];
          const indexMCP = landmarks[5];

          const middleTip = landmarks[12];
          const ringTip = landmarks[16];
          const pinkyTip = landmarks[20];

          // =========================
          // 🔥 DETEKSI POINTING (TETAP)
          // =========================
          const indexExtended = indexTip.y < indexMCP.y - 0.06;

          const otherFingersDown =
            middleTip.y > indexTip.y &&
            ringTip.y > indexTip.y &&
            pinkyTip.y > indexTip.y;

          const minDistance =
            Math.abs(indexTip.y - indexMCP.y) > 0.1;

          const isPointing =
            indexExtended && otherFingersDown && minDistance;

          setGesture({
            x: indexTip.x,
            y: indexTip.y,
            isPointing,
          });
        } else {
          setGesture({
            x: 0,
            y: 0,
            isPointing: false,
          });
        }
      });

      camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });

      camera.start();

      clearInterval(interval); // 🔥 STOP LOOP
    };

    // 🔥 LOOP SAMPAI VIDEO READY
    interval = setInterval(() => {
      if (videoRef.current) {
        init();
      }
    }, 200);

    return () => {
      if (camera) camera.stop();
      if (hands) hands.close();
      if (interval) clearInterval(interval);
    };
  }, [videoRef]);

  return gesture;
}
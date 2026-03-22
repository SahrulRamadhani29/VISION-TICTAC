import { useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export default function useGesture(videoRef) {
  const [gesture, setGesture] = useState({
    x: 0,
    y: 0,
    isPointing: false,
  });

  useEffect(() => {
    if (!videoRef.current) return;

    const hands = new Hands({
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
      if (!results.multiHandLandmarks?.length) {
        setGesture((prev) => ({ ...prev, isPointing: false }));
        return;
      }

      const landmarks = results.multiHandLandmarks[0];

      // 📍 telunjuk tip (index finger tip)
      const indexTip = landmarks[8];

      // 📍 jari lain (buat cek pointing)
      const middleTip = landmarks[12];
      const ringTip = landmarks[16];

      const isPointing =
        indexTip.y < middleTip.y &&
        indexTip.y < ringTip.y;

      setGesture({
        x: indexTip.x * window.innerWidth,
        y: indexTip.y * window.innerHeight,
        isPointing,
      });
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, [videoRef]);

  return gesture;
}
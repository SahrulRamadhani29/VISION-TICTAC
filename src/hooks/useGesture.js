import { useEffect, useState } from "react";

export default function useGesture(videoRef) {
  const [gesture, setGesture] = useState({ x: 0, y: 0, isPointing: false });

  useEffect(() => {
    if (!videoRef.current) return;

    let camera;

    const init = async () => {
      try {
        // 🔥 Ambil class dari global object (hasil dari tag script di index.html)
        const Hands = window.Hands;
        const Camera = window.Camera;

        if (!Hands || !Camera) {
          console.error("Waduh, MediaPipe belum ter-load dari CDN!");
          return;
        }

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
          try {
            if (!results.multiHandLandmarks?.length) {
              setGesture((p) => ({ ...p, isPointing: false }));
              return;
            }

            const lm = results.multiHandLandmarks[0];
            const index = lm[8]; // Ujung telunjuk
            const middle = lm[12]; // Ujung jari tengah
            const ring = lm[16]; // Ujung jari manis

            // Logika deteksi: telunjuk lebih tinggi dari jari tengah & manis
            const isPointing = index.y < middle.y && index.y < ring.y;

            setGesture({
              x: index.x * window.innerWidth,
              y: index.y * window.innerHeight,
              isPointing,
            });
          } catch (e) {
            console.error("gesture error", e);
          }
        });

        camera = new Camera(videoRef.current, {
          onFrame: async () => {
            try {
              await hands.send({ image: videoRef.current });
            } catch (e) {
              console.error("frame error", e);
            }
          },
        });

        camera.start();
      } catch (err) {
        console.error("MediaPipe error:", err);
      }
    };

    init();

    return () => {
      if (camera) camera.stop();
    };
  }, [videoRef]); 

  return gesture;
}
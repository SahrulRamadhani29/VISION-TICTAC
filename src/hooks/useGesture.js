import { useEffect, useState } from "react";

export default function useGesture(videoRef) {
  const [gesture, setGesture] = useState({ x: 0, y: 0, isPointing: false });

  useEffect(() => {
    if (!videoRef.current) return;

    let camera;

    const init = async () => {
      try {
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
            
            const indexTip = lm[8]; // Ujung telunjuk
            const indexPip = lm[6]; // Sendi telunjuk
            const middleTip = lm[12];
            const middlePip = lm[10];
            const ringTip = lm[16];
            const ringPip = lm[14];
            const pinkyTip = lm[20];
            const pinkyPip = lm[18];

            // Logika deteksi gesture (menunjuk)
            const isIndexUp = indexTip.y < indexPip.y;
            const isMiddleDown = middleTip.y > middlePip.y;
            const isRingDown = ringTip.y > ringPip.y;
            const isPinkyDown = pinkyTip.y > pinkyPip.y;
            const isPointing = isIndexUp && isMiddleDown && isRingDown && isPinkyDown;

            // 🔥 RUMUS KALIBRASI PRESISI TINGKAT DEWA 🔥
            // Menghitung offset karena video kena efek object-fit: cover
            const video = videoRef.current;
            const vw = video.videoWidth;
            const vh = video.videoHeight;
            const sw = window.innerWidth;
            const sh = window.innerHeight;

            let renderW = sw;
            let renderH = sh;
            let offsetX = 0;
            let offsetY = 0;

            if (vw && vh) {
              const videoRatio = vw / vh;
              const screenRatio = sw / sh;

              if (screenRatio > videoRatio) {
                // Layar lebih lebar dari video (Landscape)
                renderW = sw;
                renderH = sw / videoRatio;
                offsetY = (sh - renderH) / 2;
              } else {
                // Layar lebih panjang dari video (Portrait/Mobile)
                renderW = sh * videoRatio;
                renderH = sh;
                offsetX = (sw - renderW) / 2;
              }
            }

            // Hitung koordinat final yang udah dikalibrasi!
            const exactX = offsetX + ((1 - indexTip.x) * renderW);
            const exactY = offsetY + (indexTip.y * renderH);

            setGesture({
              x: exactX,
              y: exactY,
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
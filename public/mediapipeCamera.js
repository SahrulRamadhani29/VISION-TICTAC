// Custom Camera pengganti window.Camera dari MediaPipe
// Tugas: buka getUserMedia, pasang stream ke <video>, dan panggil onFrame()

export class SimpleCamera {
  constructor(videoElement, { onFrame, width = 1280, height = 720 } = {}) {
    this.video = videoElement;
    this.onFrame = onFrame;
    this.width = width;
    this.height = height;
    this.stream = null;
    this.rafId = null;
  }

  async start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: this.width, height: this.height, facingMode: "user" },
        audio: false,
      });

      this.stream = stream;
      this.video.srcObject = stream;

      // Pastikan video mulai play
      await this.video.play().catch((err) => {
        console.error("Video gagal play:", err);
      });

      const loop = async () => {
        if (!this.video || this.video.readyState < 2) {
          this.rafId = requestAnimationFrame(loop);
          return;
        }

        if (this.onFrame) {
          try {
            await this.onFrame();
          } catch (e) {
            console.error("onFrame error:", e);
          }
        }

        this.rafId = requestAnimationFrame(loop);
      };

      this.rafId = requestAnimationFrame(loop);
    } catch (e) {
      console.error("SimpleCamera error:", e);
      alert("Tidak bisa mengakses kamera. Cek permission & HTTPS.");
    }
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
    }
  }
}

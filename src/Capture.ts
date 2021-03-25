export class Capture {
  stream: any | null = null;
  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: Blob[] = [];

  async startCapture() {
    // @ts-ignore
    return navigator.mediaDevices.getDisplayMedia({
      video: { cursor: "always" },
      audio: true,
    });
  }

  async start() {
    this.recordedChunks = [];
    this.stream = await this.startCapture();
    return new Promise((resolve, reject) => {
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: "video/webm; codecs=vp9",
      });
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
          resolve(this.recordedChunks);
        }
      };
      this.mediaRecorder.onerror = reject;
      this.mediaRecorder.start();
    });
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach((track: any) => track.stop());
      this.stream = null;
    }
  }

  getBlob() {
    if (!this.recordedChunks.length) return null;
    const blob = new Blob(this.recordedChunks, {
      type: "video/webm",
    });
    return URL.createObjectURL(blob);
  }
}

import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Capture } from "./Capture";
import { createFileName, downloadFile } from "./utils";

const capture = new Capture();

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCaptureStarted, setCapture] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const handleStartCapture = async () => {
    try {
      setCapture(true);
      await capture.start();
      setUrl(capture.getBlob());
    } catch (e) {
      // TODO: show Snackbar
    } finally {
      setCapture(false);
    }
  };

  useEffect(() => {
    if (!url) return;
    const videoElem = videoRef.current;
    if (!videoElem) return;
    videoElem.src = url;
    videoElem.play();
  }, [url]);

  const handleStopCapture = () => {
    capture.stop();
  };

  const handleDownload = () => {
    if (!url) return;
    downloadFile(url, createFileName(new Date(), "webm"));
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: 500, border: "1px solid #000" }}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        disabled={isCaptureStarted}
        onClick={handleStartCapture}
      >
        Start
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={!isCaptureStarted}
        onClick={handleStopCapture}
      >
        Stop
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={!url}
        onClick={handleDownload}
      >
        Download
      </Button>
    </div>
  );
}

export default App;

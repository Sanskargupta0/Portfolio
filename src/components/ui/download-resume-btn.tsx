"use client";

import { useState } from "react";

const DownloadResumeBtn = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const resumeUrl = "https://github.com/Sanskargupta0/Sanskargupta0/raw/main/Sanskar-Gupta.pdf";
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Sanskar-Gupta-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button 
      className="download-resume-btn" 
      onClick={handleDownload}
      disabled={isDownloading}
      aria-label="Download Resume"
    >
      <svg 
        className="download-svg-icon" 
        viewBox="0 0 384 512" 
        height="1em" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
      </svg>
      <span className="download-icon2"></span>
      <span className="download-tooltip">
        {isDownloading ? "Downloading..." : "Download Resume"}
      </span>
    </button>
  );
};

export default DownloadResumeBtn;

import React, { useEffect, useRef } from "react"

interface BackgroundProps {
  imageUrl: string,
  onColorsExtracted?: (lightColor: string, darkColor: string) => void;
}

const Background: React.FC<BackgroundProps> = ({ imageUrl, onColorsExtracted }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

    const extractColors = (imageData: ImageData) => {
    const pixels = imageData.data;
    let lightR = 0, lightG = 0, lightB = 0;
    let darkR = 255, darkG = 255, darkB = 255;
    let lightCount = 0, darkCount = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      if (brightness > 127) {
        lightR += r;
        lightG += g;
        lightB += b;
        lightCount++;
      } else {
        darkR += r;
        darkG += g;
        darkB += b;
        darkCount++;
      }
    }

    const avgLight = `rgb(${Math.round(lightR / lightCount)}, ${Math.round(lightG / lightCount)}, ${Math.round(lightB / lightCount)})`;
    const avgDark = `rgb(${Math.round(darkR / darkCount)}, ${Math.round(darkG / darkCount)}, ${Math.round(darkB / darkCount)})`;

    alert(avgDark+ '-' + avgLight);
    // if (onColorsExtracted) {
    //   onColorsExtracted(avgLight, avgDark);
    // }
  };

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.src = imageUrl
    img.crossOrigin = "anonymous" // Enable cross-origin loading

    // Set canvas size to match the viewport
    const setCanvasSize = (flag = null) => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      img.onload = () => {
        // Draw the image onto the canvas, scaling to fit the viewport
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        extractColors(imageData);
      }

      img.onerror = (error) => {
        console.error("Failed to load image:", error)
      }

      if (flag) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }

    // Initial size setup
    setCanvasSize()

    // Handle window resize
    window.addEventListener("resize", setCanvasSize)

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [imageUrl])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
}
export default Background

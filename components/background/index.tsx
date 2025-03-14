import React, { useEffect, useRef } from "react"
import { analyzeCanvasTheme } from "~utils/themeUtils";

interface BackgroundProps {
  imageUrl: string,
  onColorsExtracted?: (lightColor: string, darkColor: string) => void;
}

const Background: React.FC<BackgroundProps> = ({ imageUrl, onColorsExtracted }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.src = imageUrl
    img.crossOrigin = "anonymous" // Enable cross-origin loading

    const setCanvasSize = (flag = null) => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const a = analyzeCanvasTheme(canvas, {});
        console.log(a);
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

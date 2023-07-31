import { Component as box } from "@mejor";
import http from "@app/services/http-client";

function showImage(target, src, alt) {
  const netStat = navigator.onLine;
  if (src.includes("http") && !netStat) return;

  if (target.src.length < 1 || target.src !== src) {
    const cachedImage = sessionStorage.getItem(src);
    if (cachedImage) {
      target.src = cachedImage;
      target.alt = alt;
    } else {
      http.get(src)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result;
            sessionStorage.setItem(src, base64data);
            target.src = base64data;
            target.alt = alt;
          };
          reader.readAsDataURL(blob);
        })
        .catch((error) => {
          console.error("Error fetching or caching image:", error);
        });
    }
  }
}

export default box(({ 
  src,
  alt,
  width,
  height,
  ...props
}) => (
  <img use:visible={({ target }) => showImage(target, src, alt)} loading="lazy" style="background-color:#f6f6f6;" {...{ width, height, ...props }} />
));

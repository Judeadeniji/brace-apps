import { Component as Box } from "@mejor";
import http from "@app/services/http-client";

// Function to check if the device is online
function isOnline() {
  return navigator.onLine;
}

// Function to check if a given string is a valid base64 string
function isValidBase64(str) {
  try {
    return btoa(atob(str)) === str;
  } catch (e) {
    return false;
  }
}

// Function to add "data:image/" prefix to a base64 string
function addDataImagePrefix(base64Str) {
  return `data:image/jpeg;base64,${base64Str}`;
}

// Function to load the image and handle caching
async function loadImage(target, src, alt) {
  const cachedImage = sessionStorage.getItem(alt);
   if(target.src || target.srcset || target?.alt?.includes(alt)) return;
   if (cachedImage) {
      target.src = cachedImage;
      target.srcset = cachedImage;
      target.alt = alt;
      return;
    }
    
  try {
    // Check if the image is already in base64 format
    if (isValidBase64(src) && !src.startsWith('data:')) {
      src = addDataImagePrefix(src);
      target.srcset = src;
      target.src = src;
      target.alt = alt;
      sessionStorage.setItem(alt, src);
      return;
    }
    

    // Check if the image source is from "example" or "http" and the device is offline
  //  if ((src.includes("example") || src.startsWith('data:') || src.includes("http")) && !isOnline()) return;

    // Check if the target image is not already loaded with the same source
    if (!target.src || target.src !== src) {
      if (cachedImage) {
        target.src = cachedImage;
        target.srcset = cachedImage;
        target.alt = alt;
      } else {
        const response = await http.get(src);
        const blob = await response.blob();
        const base64data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        sessionStorage.setItem(alt, base64data);
        target.src = base64data;
        target.srcset = base64data;
        target.alt = alt;
      }
    }
  } catch (error) {
    target.src = src;
    target.srcset = src;
    sessionStorage.setItem(alt, src);
    console.error('Error loading image:', error);
  }
}

export default Box(({ src, alt, width, height, ...props }) => (
  <picture loading="lazy" key={alt}>
    <source use:visible={({ target }) => loadImage(target, src, alt)} type="image/jpeg" />
    <img use:visible={({ target }) => loadImage(target, src, alt)} style="background-color:#f6f6f6;" {...{ width, height, ...props }} />
  </picture>
));
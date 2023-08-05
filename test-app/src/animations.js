export const fade = {
  keyframes: [
    { opacity: 0.1 },
    { opacity: 1 }
  ],
  options: {
    duration: 500,
    fill: 'forwards'
  },
}

export const slide = {
  keyframes: [
    { transform: "translateY(20px)" },
    { transform: "translateY(0)" },
  ],
  options: {
    duration: 260,
    fill: 'forwards',
    iteration: 1
  }
};
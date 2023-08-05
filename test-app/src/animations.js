export const fade = {
  keyframes: [
    { opacity: 0.1 },
    { opacity: 1 }
  ],
  options: {
    duration: 250,
    fill: 'forwards'
  },
}

export const slide = {
  keyframes: [
    { transform: "translateY(30px)" },
    { transform: "translateY(0)" },
  ],
  options: {
    duration: 300,
    fill: 'forwards',
    iteration: 1
  }
};
export default function scrollTo(selector) {
  const el = document.querySelector(selector);
  el.scrollIntoView({behavior: 'smooth'})
}
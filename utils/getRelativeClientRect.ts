export default function getRelativeClientRect(el: any) {
  const rect = el.getBoundingClientRect()
  const parentRect = el?.offsetParent?.getBoundingClientRect()
  return {
    bottom: parentRect?.bottom - rect.bottom,
    height: rect.height,
    left: rect.left - parentRect.left,
    right: parentRect.right - rect.right,
    top: rect.top - parentRect.top,
    width: rect.width,
  }
}

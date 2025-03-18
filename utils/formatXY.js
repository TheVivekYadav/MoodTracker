export function formatXY(element,clientX,clientY){
  const maxX = window.innerWidth - element.offsetWidth;
  const maxY = window.innerHeight - element.offsetHeight;

  // Ensure the element stays within the screen bounds
  const x = Math.min(maxX, Math.max(0, clientX));
  const y = Math.min(maxY, Math.max(0, clientY));

    return {x,y}
}



//document.activeElement.addEventListener('keydown', handleKeydownEvent);
window.addEventListener('keydown', handleKeydownEvent);
// window.addEventListener('keydown', (evt) => {
//   document.write(evt.key);
// });
// document.write("IN app()");
function handleKeydownEvent(e) {
  //document.write("IN handleKeydown()");
  switch(e.key) {
    case 'ArrowUp':
      nav(-1);
      break;
    case 'ArrowDown':
      nav(1);
      break;
    case 'ArrowRight':
      nav(1);
      break;
    case 'ArrowLeft':
      nav(-1);
      break;
  }
}
var currentIndex = 0;
function nav (move) {
  // Add % to remove out of bound index
  //document.write("IN nav()");
  var next = currentIndex + move;
  console.log(next);
  var items = document.querySelectorAll('.items');
  var targetElement = items[next];
  currentIndex = next;
  targetElement.focus();
}

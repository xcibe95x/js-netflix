// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// When the user is on the button, open the modal
btn.onmouseover = function() {
  modal.style.display = "block";
}
// When the user is anywhere outside of the modal, close it
window.onmouseover = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
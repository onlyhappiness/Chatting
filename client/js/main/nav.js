const container = document.getElementById('container');
const bars = document.getElementById('bars');

bars.onclick = () => {
  container.classList.toggle('active');
}
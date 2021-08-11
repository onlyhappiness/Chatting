const container = document.querySelector('.container');
const bars = document.getElementById('bars');

bars.onclick = () => {
  container.classList.toggle('active');
}
const container = document.getElementById('container');
const bars = document.getElementById('bars');
const sidebar = document.getElementById('sidebar')

bars.onclick = () => {
  container.classList.toggle('active');
  sidebar.classList.toggle('active');
}

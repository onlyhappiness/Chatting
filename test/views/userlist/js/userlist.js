const userList = document.getElementById('users');

const socket = io();

socket.on('roomUsers', ({ room, users }) => {
  outputUsers(users);
});

function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
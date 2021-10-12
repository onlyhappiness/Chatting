const socket = io();

const clientsTotal = document.getElementById('client-total');

const messageContainer = document.getElementById('message-container');
// const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');


// 이름
// let 계절 = ['봄', '여름', '가을', '겨울'];
// let 그것은 = ['같은', '만큼', '이', '은'];
// let 바로 = ['똥', '눈사람','꽃','분노','사랑','기쁨'];
// let 네게 = 계절[Math.floor(Math.random() * 계절.length)];
// let 주어진 = 그것은[Math.floor(Math.random() * 그것은.length)];
// let 이름은 = 바로[Math.floor(Math.random() * 바로.length)];

// let 네게주어진이름 =[네게, 주어진, 이름은].join(' ');

// nameInput.value = 네게주어진이름;


// 메세지 받을 때 알람음
// const messageTone = new Audio('/message-tone.mp3');

// nameInput.value = displayName;


messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
})

// 현재 접속자 수
socket.on('clients-total', (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`;
});

function sendMessage() {
  if (messageInput.value === '') return
  console.log(messageInput.value);
  const data = {
    // name: nameInput.value,
    message: messageInput.value,
    dataTime: new Date()
  }
  socket.emit('message', data);
  addMessageToUI(true, data);
  messageInput.value = '';
}

socket.on('chat-message', (data) => {
  //console.log(data);
  // messageTone.play();
  addMessageToUI(false, data);
});

function addMessageToUI(isOwnMessage, data) {
  clearFeedback()
  const element = `
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
      <p class="message">
        ${data.message}
        <span>● ${moment(data.dataTime).fromNow()}</span>
      </p>
    </li>
  `;
  // <span>${data.name} ● ${moment(data.dataTime).fromNow()}</span>


  messageContainer.innerHTML += element;
  scrollToBottom();
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

messageInput.addEventListener('focus', (e) => {
  socket.emit('feedback', {
    // feedback: `${nameInput.value} is typing a message`
  });
});

messageInput.addEventListener('keypress', (e) => {
  socket.emit('feedback', {
    // feedback: `${nameInput.value} is typing a message`
  });
});

messageInput.addEventListener('blur', (e) => {
  socket.emit('feedback', {
    feedback: ``,
  });
});

socket.on('feedback', (data) => {
  clearFeedback()
  const element = `
    <li class="message-feedback">
      <p class="feedback" id="feedback">${data.feedback}</p>
    </li>
  `;
  messageContainer.innerHTML += element;
});

function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach(element => {
    element.parentNode.removeChild(element);
  }) 
}

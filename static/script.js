const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");


const BOT_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnkNIjtePBIsOh7mdGERruSETCzY8-aUnL8LQY61eW70yoKSV9kXTsfMA&s=10";
const PERSON_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj7dS65P6kTaMDBRyvU0X2XIBIK3j8iiiB6Q&usqp=CAU";
const BOT_NAME = "SpeedOfLight++ [BOT]";


msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  socket.send(msgText);
});

socket.on('message', function(text) {
    appendMessage(BOT_NAME, BOT_IMG, "left", text)
})


function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}


// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}
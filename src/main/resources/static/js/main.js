var loginElelent = document.querySelector('#login');
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm');
var URL = "http://localhost:8080";
var userName=null
var stomp = null;

function connectSocket(event) {
    userName = document.querySelector('#username').value.trim();
    if (userName) {
        loginElelent.classList.add("dis");
        chatElement.classList.remove("dis");
        var socket = new SockJS(URL + '/connect');
            stomp = Stomp.over(socket);
            stomp.connect({}, connectedDone)
    }
    event.preventDefault();
}

function connectedDone() {
    stomp.send("/app/chat.login", {}, JSON.stringify({message: userName, chatType: 'JOIN'}))
    stomp.subscribe("/app/chat.send", sendMessage)
}
function sendMessage() {

}
userForm.addEventListener('submit', connectSocket)
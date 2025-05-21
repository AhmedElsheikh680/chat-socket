var loginElelent = document.querySelector('#login');
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm');
var userName=null
var stomp = null;

function connectSocket(event) {
    userName = document.querySelector('#username').value.trim();
    if (userName) {
        loginElelent.classList.add("dis");
        chatElement.classList.remove("dis");
        var socket = new SockJS('/connect');
            stomp = Stomp.over(socket);
    }
    event.preventDefault();
}

userForm.addEventListener('submit', connectSocket)
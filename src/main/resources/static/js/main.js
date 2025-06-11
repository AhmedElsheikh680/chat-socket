var loginElelent = document.querySelector('#login');
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm');
var connect = document.querySelector('#connect');
var mainChat = document.querySelector('#main-chat');
var sendDiv = document.querySelector('#sendDiv');
var main = document.querySelector('#main');
var URL = "http://localhost:8080";
var userName=null
var stomp = null;
var users = null;

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
    stomp.subscribe("/topic/all", sendMessage)
    stomp.send("/app/chat.login", {}, JSON.stringify({sender: userName, chatType: 'JOIN'}))
    connect.classList.add("dis")
}
function sendMessage(payload) {
    var message = JSON.parse(payload.body)
    if (message.chatType == 'JOIN') {
        joinUser(message,"Join")
        listActiveUsers()
    } else if(message.chatType == 'LEAVE') {
        joinUser(message, "Leave")
        listActiveUsers()
    } else {
        var li = document.createElement('li');
        li.classList.add('sms');
        var image= document.createElement('img');
        image.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        var span1= document.createElement('span');
        span1.classList.add('my-message');
        var span2= document.createElement('span');
        span2.classList.add('user')
        var span2User = document.createTextNode(message.sender);
        span2.appendChild(span2User);
        var span3= document.createElement('span');
        span3.classList.add('mes');
        var span3Message = document.createTextNode(message.message);
        span3.appendChild(span3Message)

        span1.appendChild(span2);
        span1.appendChild(span3);
        li.appendChild(image);
        li.appendChild(span1);

        mainChat.appendChild(li);

    }

}

function joinUser(message, state) {
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    var hr1 = document.createElement('hr');
    var hr2 = document.createElement('hr');
    var messageJoin = document.createTextNode(message.sender + " "+ state)
    li1.classList.add('status');
    li1.appendChild(messageJoin)
    li2.appendChild(hr1)
    li2.appendChild(li1)
    li2.appendChild(hr2)
    mainChat.appendChild(li2)
}

function send() {
    var messageUser  =  document.querySelector('#sms').value.trim();
    if (messageUser && stomp) {
        var userMessage = {
            message: messageUser,
            chatType: 'CHAT',
            sender: userName
        }
        stomp.send("/app/chat.send", {}, JSON.stringify(userMessage))
        document.querySelector('#sms').value='';
    }
}
function listActiveUsers() {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", URL +"/active");
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState ==4 && xmlHttpRequest.status == 200) {
             users = JSON.parse(xmlHttpRequest.responseText);
            showActiveUsers(users)
        }
    };
    xmlHttpRequest.send();

}

function showActiveUsers(users) {
    document.getElementById('test').remove();
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('abso')
    mainDiv.id='test'
    for (let x=0; x<users.length; x ++) {

        var div = document.createElement('div');
        var span1 = document.createElement('span');
        span1.classList.add('name-us');
        var userName = document.createTextNode(users[x].username);
        span1.appendChild(userName)
        var span2 = document.createElement('span');
        var i = document.createElement('i');
        i.classList.add('fas');
        i.classList.add('fa-circle');
        span2.appendChild(i);

        div.appendChild(span1);
        div.appendChild(span2);

        mainDiv.appendChild(div);
    }

    main.appendChild(mainDiv)
}










userForm.addEventListener('submit', connectSocket)
sendDiv.addEventListener('click', send)
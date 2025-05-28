package com.chatSocket.componet;

import com.chatSocket.model.ChatMessage;
import com.chatSocket.model.ChatType;
import com.chatSocket.model.Storage;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Log4j2
public class SocketAction {

    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event){
        log.info("Congratulations You are connected now!!!!!");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {

        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(event.getMessage());
       String username =  (String) stompHeaderAccessor.getSessionAttributes().get("username");

       if (username != null) {
           log.info("Hi "+ username + " You are Disconnected now!!");
           ChatMessage chatMessage = ChatMessage.builder()
                   .chatType(ChatType.LEAVE)
                   .sender(username)
                   .build();
           Storage.removeBySession(stompHeaderAccessor.getSessionId());
           simpMessageSendingOperations.convertAndSend("/topic/all", chatMessage);
       }
    }
}
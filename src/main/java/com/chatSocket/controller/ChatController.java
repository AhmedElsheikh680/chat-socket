package com.chatSocket.controller;

import com.chatSocket.model.ActiveUser;
import com.chatSocket.model.ChatMessage;
import com.chatSocket.model.Storage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.login")
    @SendTo("/topic/all")
    public ChatMessage login(@Payload  ChatMessage chatMessage, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        simpMessageHeaderAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        Storage.activeUsers.add(ActiveUser.builder()
                        .username(chatMessage.getSender())
                        .session(simpMessageHeaderAccessor.getSessionId())
                .build());
        return chatMessage;
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/all")
    public ChatMessage send(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }
}

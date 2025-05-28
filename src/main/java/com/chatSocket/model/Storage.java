package com.chatSocket.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@Data

public class Storage {

    public static List<ActiveUser> activeUsers = new ArrayList<>();

    public static void removeBySession(String session){

        for (int i=0; i<activeUsers.size(); i++){
            if (activeUsers.get(i).getSession().equals(session)) {
                activeUsers.remove(i);
                break;
            }
        }
    }

}

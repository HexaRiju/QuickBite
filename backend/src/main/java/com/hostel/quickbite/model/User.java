package com.hostel.quickbite.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String rollNo;   // PRIMARY KEY

    private String name;
    private String roomNo;
    private String password;

    // getters and setters
    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRoomNo() { return roomNo; }
    public void setRoomNo(String roomNo) { this.roomNo = roomNo; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
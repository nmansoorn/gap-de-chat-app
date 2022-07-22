
# Gap De

Gap De is a Full Stack Chatting App.
Uses Socket.io for real time communication and stores user details in encrypted format in Mongo DB Database.
## Tech Stack

**Client:** React JS

**Server:** Node JS, Express JS

**Database:** Mongo DB
  
## Demo

https://gap-de.herokuapp.com/

![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/group%20%2B%20notif.PNG)
## Run Locally

Clone the project

```bash
  git clone https://github.com/nmansoorn/gap-de-chat-app
```

Go to the project directory

```bash
  cd gap-de-chat-app
```

Install dependencies

```bash
  npm install
```

```bash
  cd client
  npm install
```

Start the server

```bash
  cd ..
  npm start
```
Start the Client

```bash
  //open now terminal
  cd client
  npm start
```

  
# Features

### Modern Landing Page
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/login.PNG)
### Authenticaton
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/login.PNG)
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/signup.PNG)
### Responsive Minimalistic Design Dark/Light Mode
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/real-time.PNG)
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/real-time.PNG)
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/real-time.PNG)
### Real Time Chatting with Typing indicators
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/real-time.PNG)
### One to One and Group chats
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/mainscreen.PNG)
### Avatars, Last Message Received Timestamp, Unread Message Indicator, and Delete Chat Button (Admin)
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/mainscreen.PNG)
### Search Users
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/search.PNG)
### Create Group Chats and Dynamic Search
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/new%20grp.PNG)
### Persistent Notifications
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/group%20%2B%20notif.PNG)
### Add or Remove users from group (Admin vs Non-admin)
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/add%20rem.PNG)
### View User Profile
![](https://github.com/nmansoorn/gap-de-chat-app/blob/master/screenshots/profile.PNG)

### Upcomming Features
- Enable user to update/delete account
- Emergency Delete All button
- View Online/Offline Status
- View all users
- Global chat rooms (viewable by all users)
- Add mini-avatars of users (max 5) infront of Group Chat name
- Timestamps for last message within the open chat page
- Add username on top of the message bubble for group chats (currenly shown on hover)
- Convert Single Chat search to dynamic (like the group chat)


### Challenge
- Without compromising reliability and keeping storage in mind, implement a delete chat feature that enables any user to delete a chat ONLY from their account keeping the history intact for other users. Upon receiving a new message, create a new message for the deleting user, and keep the trail for the rest of the users. In case of a group chat, the deleting user needs to be re-added.

## Made By
- [@nmansoorn](https://github.com/nmansoorn)

  

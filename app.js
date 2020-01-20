var app = app || {};

//basic state 
app.username   = "Guest";
app.SEPARATOR  = ';'

app.handleMessageReceived = function(address, message){
    console.log("Message :"+message);
    //append message to message board 
    //pack 
    var packet = message.split(app.SEPARATOR,2);

    let myAddress = app.connection.address();

    if( myAddress !== address )
        app.showMessageOnBoard(packet);
}

app.showMessageOnBoard = function(packet){
    //DOM API To Create New DOM Element
    var post = document.createElement('div');    
    post.innerText = `${packet[0]}:${packet[1]}`;

    var messageBoard = document.querySelector(".message-board");
    //DOM API To Attach New DOM Element
    messageBoard.prepend(post); 
}

app.handleMessageSend = function(event){
    event.preventDefault();

    var messageInput = document.querySelector(".message-input");
    var message      = messageInput.value;

    var packet       = `${app.username}${app.SEPARATOR}${message}`

    if( message ) {
        app.connection.send(packet);
    }

    app.showMessageOnBoard([app.username,message]);

    messageInput.value = '';
    return false;
};


app.initializeMessageSend = function(){
    var messageSendButton = document.querySelector(".message-send-button");
    messageSendButton.addEventListener('click', app.handleMessageSend);
};


app.initializeMessageReceive = function(){
    app.connection.on("message",app.handleMessageReceived);
}

app.acceptUsername = function(){
    app.username = prompt("Please enter user name") || app.username;
}

//Add credential support

app.handleOpenBoardButton = async function(event) {
    event.preventDefault();

    let nameInput = document.getElementById("board-name-input").value;
    let passInput = document.getElementById("board-pass-input").value;

    let channelIdInput = nameInput + ":" + passInput;
    console.log('channelIdInput='+channelIdInput);
    const channelName = await digestMessage(channelIdInput);
    console.log("Connecting To..."+channelName);
    //open specified board
    app.connection = new Bugout(channelName);

    app.initializeMessageReceive();

    app.showForm();

    return false;
};




app.initializeOpenBoard = function() {
    var openBoardButton = document.querySelector(".open-board-button");
    openBoardButton.addEventListener('click', app.handleOpenBoardButton);
};


//Add Logout Support
app.handleExitBoardButton = function(event){
    //avoid form submission
    event.preventDefault();
    //close connection
    app.connection.close();
    //hide form and clear message board
    app.hideForm();
    app.clearMessageBoard();
    return false;
};

app.initializeExitBoard = function() {
    var exitBoardButton = document.querySelector(".exit-board-button");
    exitBoardButton.addEventListener('click', app.handleExitBoardButton);
};

//Show hide form
app.showForm = function(){
    let formElem = document.getElementById("message-form-id");
    formElem.style.display = 'block';
};
app.hideForm = function(){
    let formElem = document.getElementById("message-form-id");
    formElem.style.display = 'none';
};

app.clearMessageBoard = function(){
    var messageBoard = document.querySelector(".message-board");
    messageBoard.innerHTML = '';
}

app.initializeApp = function(){
    app.acceptUsername();
    app.initializeOpenBoard();
    app.initializeMessageSend();
    app.initializeExitBoard();
};

let init = function(){
    app.initializeApp();
};

window.addEventListener("load", init );
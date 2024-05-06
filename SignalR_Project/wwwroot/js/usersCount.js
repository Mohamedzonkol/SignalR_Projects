///Create Connection
var connection = new signalR.HubConnectionBuilder()
/*.configureLogging(signalR.LogLevel.Information)*/.
    withUrl("/hubs/userCount"/*, signalR.HttpTransportType.WebSockets*/).build();
//connect to method that hub invoke aka receive notification from server "hub"
connection.on("UpdateTotalViews", (message) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = message.toString();
});
connection.on("UpdateTotalUsers", (message) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = message.toString();
});
//invoke hub method aka send notification to hun    ///hub==server
function NewWindowLoadedOnClient() {
    connection.send("NewWindowLoaded");
}
//start connection
function success() {
    console.log("Connection to User Hub Successful");
    NewWindowLoadedOnClient();
}
function fail() {
  //  concole.log("Connected to User Hub Rejected");
}
connection.start().then(success, fail);
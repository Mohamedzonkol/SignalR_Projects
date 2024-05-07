let lbl_houseJoined = document.getElementById("lbl_houseJoined");
let btn_un_gryffindor = document.getElementById("btn_un_mohamed");
let btn_un_slytherin = document.getElementById("btn_un_ahmed");
let btn_un_hufflepuff = document.getElementById("btn_un_karem");
let btn_un_ravenclaw = document.getElementById("btn_un_manal");

let btn_gryffindor = document.getElementById("btn_mohamed");
let btn_slytherin = document.getElementById("btn_ahmed");
let btn_hufflepuff = document.getElementById("btn_karem");
let btn_ravenclaw = document.getElementById("btn_manal");

let trigger_gryffindor = document.getElementById("trigger_mohamed");
let trigger_slytherin = document.getElementById("trigger_ahmed");
let trigger_hufflepuff = document.getElementById("trigger_karem");
let trigger_ravenclaw = document.getElementById("trigger_manal");

//create connection
var connectionHouse = new signalR.HubConnectionBuilder().withUrl("/hubs/houseGroup").build();


btn_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("JoinGroup", "Mohamed");
    event.preventDefault();
});
btn_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("JoinGroup", "Ahmed");
    event.preventDefault();
});
btn_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("JoinGroup", "Manal");
    event.preventDefault();
});
btn_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("JoinGroup", "Karem");
    event.preventDefault();
});


btn_un_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("LeaveGroup", "Mohamed");
    event.preventDefault();
});
btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Ahmed");
    event.preventDefault();
});
btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Manal");
    event.preventDefault();
});
btn_un_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Karem");
    event.preventDefault();
});
  
connectionHouse.on("substantiation", (strGroupJoined, houseName, hasubscrabed) => {
    lbl_houseJoined.innerText = strGroupJoined;
    if (hasubscrabed) {
        switch (houseName) {
            case 'mohamed':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                //trigger_gryffindor.click();
                break;
            case 'karem':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                //trigger_gryffindor.click();
                break;
            case 'ahmed':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                //trigger_gryffindor.click();
                break;
            case 'manal':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                //trigger_gryffindor.click();
                break;
            default:
                    break;
        }
        toastr.success(`You Have Subcribed Successfuly .${houseName}`);
    }
    else {
        switch (houseName) {
            case 'mohamed':
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                //trigger_gryffindor.click();
                break;
            case 'karem':
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                //trigger_gryffindor.click();
                break;
            case 'ahmed':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                //trigger_gryffindor.click();
                break;
            case 'manal':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                //trigger_gryffindor.click();
                break;
            default:
                break;
        }
        toastr.success(`You Have UnSubcribed Successfuly .${houseName}`);
    }
});



//start connection
function fulfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");
}
function rejected() {
    //rejected logs
}

connectionHouse.start().then(fulfilled, rejected);
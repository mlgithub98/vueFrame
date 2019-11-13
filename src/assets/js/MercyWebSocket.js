var websocket = null;
// var debugTextArea = document.getElementById("debugTextArea");

import Bus from "@/components/Bus";

export function debug(message) {
    // debugTextArea.value += message + "\n";
    // debugTextArea.scrollTop = debugTextArea.scrollHeight;
    console.log(message + "\n")
    return message;
}
export function sleep(numberMillis) {
    var start = new Date().getTime();
    while (true) {
        if (new Date().getTime() - start > numberMillis) {
            break;
        }
    }
}

export function ClearText()
{
    // document.getElementById("debugTextArea").value="";
    console.log("清空方法");
}
export function sendMessage(msg) {
    if(msg == ""){
        return;
    }
    if ( websocket != null )
    {
        //document.getElementById("inputText").value = "";
        websocket.send(msg);
        console.log( "string sent :", '"'+msg+'"' );
    }
}

//var wsUri = "ws://192.168.5.116:8686";

//var xq = 0;
export function initWebSocket(callback) {
    var url = "ws://127.0.0.1:47903";
    console.log(url);
    try {
            if (typeof MozWebSocket == 'function')
                WebSocket = MozWebSocket;
            if ( websocket){
                websocket.close();
            }

            websocket = new WebSocket( url );
            websocket.onopen = function (evt) {
                console.log("CONNECTED");
                Bus.$emit("mercyWebSocket_open");
            };
            
            
            websocket.onclose = function (evt) {
                console.log("DISCONNECTED");
                Bus.$emit("mercyWebSocket_closed");
            };
            
            websocket.onmessage = function (evt) {
                var str = evt.data;
                if(str.indexOf("namelist")>=0){
                    //alert(str);
                    var strs = new Array();
                    strs = str.split("|");
                    showlist( strs );
                }
                else{
                    console.log( "Message received :", evt.data );
                    // debug( evt.data );
                }
                Bus.$emit("OnWebsocket_msg",evt.data);
            };
            websocket.onerror = function (evt) {
                //debug('ERROR: ' + evt.data);
            };

        } 
    catch (exception) {
            //debug('ERROR: ' + exception);
        }
}
export function stopWebSocket() {
    if (websocket)
        websocket.close();
}
export function checkSocket() {
    if (websocket != null) {
        var stateStr;
        switch (websocket.readyState) {
            case 0: {
                stateStr = "CONNECTING";
                break;
            }
            case 1: {
                stateStr = "OPEN";
                break;
            }
            case 2: {
                stateStr = "CLOSING";
                break;
            }
            case 3: {
                stateStr = "CLOSED";
                break;
            }
            default: {
                stateStr = "UNKNOW";
                break;
            }
        }
        debug("WebSocket state = " + websocket.readyState + " ( " + stateStr + " )");
    } else {
        debug("WebSocket is null");
    }
}



window.onbeforeunload=function(){
    if (websocket)
        websocket.close();
}
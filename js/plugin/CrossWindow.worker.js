
var oPort = {};

/**
 * [onconnect description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function onConnect( event){

   var oPortCurrent       = event.ports[0];

   oPortCurrent.onmessage = function( e){
        var sName;

        if( e.data.action == '--activ--'){

            sName        = e.data.name.trim();

            oPort[sName] = [oPortCurrent];

            return true;

        }else{

            sName = e.data.action;

            if( sName.indexOf(",") >= 0){
                var aName = sName.split(",");

                for( var sKey in aName){
                    sendMessage( aName[sKey].trim(), e.data.value);
                }

            }else{
                sendMessage( sName.trim(), e.data.value);
            }
            return true;

        }
    };


    oPortCurrent.start();
}

/**
 * [sendMessage description]
 * @param  {[type]} sName [description]
 * @param  {[type]} data  [description]
 * @return {[type]}       [description]
 */
function sendMessage( sName, data){


    if( sName == '*'){
        for( var sKey in aList){
            aList[sKey].postMessage( data);
        }
        return true;
    }

    if( oPort[sName]){

        oPort[sName].postMessage( data);

        return true;
    }
}



onconnect  = onConnect;
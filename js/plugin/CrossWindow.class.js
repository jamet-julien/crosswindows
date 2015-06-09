

(function( global){


    var sPlugin = 'CrossWindow.class.js';
    var sWorker = 'CrossWindow.worker.js';

    var CrossWindow = (function(){

        var oWorker = null;
        var sAuthor = '';

        /**
         * [_init description]
         * @return {[type]} [description]
         */
        function _init(){
            var aScript = document.querySelectorAll( 'script');

            for( var i = 0; i<aScript.length; i++){

                var sScript = aScript[i].getAttribute( 'src');

                if( sScript.indexOf( sPlugin )>=0){
                    _sScript = sScript.replace( sPlugin, sWorker);
                    break;
                }
            }
        }

        /**
         * [setName description]
         * @param {[type]} sName [description]
         */
        function setName( sName){
            if( sName){

                sAuthor = sName;
                oWorker = new SharedWorker( _sScript);

                oWorker.port.start();

                oWorker.port.onerror = function(e) {
                    console.log('ERROR!');
                };

                oWorker.port.postMessage( {action:'--activ--', name : sName});
                console.log( 'active');

            }

            return _public;
        }

        /**
         * [send envoie les variables a la page concerné]
         * @param  {[type]} sName [nom de la page concerne ]
         * @param  {[type]} mData [varaible a envoyer]
         * @return {[type]}       [description]
         */
        function send( sName, mData){
            oWorker.port.postMessage({action: sName, value : mData, author : sAuthor});
            return _public;
        }

        /**
         * [setOnMessage description]
         * @param {[type]} fCallBack [description]
         */
        function setOnMessage( fCallBack){

            if( oWorker && fCallBack){

                oWorker.port.onmessage = fCallBack;
            }

            return _public;
        }


        _init();

        var _public = {
            setName      : setName,
            setOnMessage : setOnMessage,
            send         : send
        };

        return _public;

    })();

    global.CrossWindow = CrossWindow;

})( window);
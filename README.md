# crosswindows

Mise en place d'un système de communication entre diffèrentes windows d'un même site

## Features

- fonctionnel et souplesse
    - faire en sorte que si une page est ouverte deux fois ne s'écrase pas

## Fonctionnement

### exemple simple
```javascript

    /**
     * [definir nom de la page courrante et action lors de reception de message]
     * @param  {[object]} e [variable envoyé]
     */
    CrossWindow.setName('other').setOnMessage( function( e){
        // recuperation des variable envoyé dans e.data

    });
    // envoie du message à "main" et "page"
    CrossWindow.send( 'main, page',{ value: 'other : '+sValue});
```
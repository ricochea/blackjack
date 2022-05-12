

(() => {
    'use strict'

        let deck     = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador     = 0,
        puntosComputadora = 0;

    // Referencias del HTML

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas'),
          puntosHTML = document.querySelectorAll('small');

    // Esta funcion crea un nuevo deck (baraja)
    const crearDeck = () => {

        deck = [];
        for(let i = 2; i <= 10; i++) {
            for( let tipo of tipos) {
                deck.push( i + tipo);
            }
        }

        for ( let tipo of tipos ) {
            for ( let esp of especiales ) {
                deck.push( esp + tipo);
            }
        }
    // console.log( deck );

    return _.shuffle( deck );
    //console.log( deck );
    

    }

    crearDeck();
    // esta funcion me permite tomar una carta
    const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    //console.log(deck);
    //console.log(carta); // carta debe de ser de la bataja
    return carta;
    }

    // pedirCarta();
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1 );
        return ( isNaN( valor ) ) ?
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
        
        
        
        // ESTA ES LA FORMA LARGA
        // let puntos = 0;
        //2=2    10 = 10 etc
        // if ( isNaN( valor ) ) {
            // 
            // puntos = ( valor === 'A' ) ? 11 : 10;
    // 
        // } else {
        //  puntos = valor * 1;       

    }

    // Turno de la computadora

    const turnoComputadora = ( puntosMinimos ) => {

        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta( carta );
        
            puntosHTML[1].innerText = puntosComputadora
            
            //<img class="carta" src="cartas/2D.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ){
            break;

        }

        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ) );

        setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie Gana :(');
        } else if (puntosMinimos > 21 ) {
            alert('Computadora Gana');
        } else if ( puntosComputadora > 21 ) {
            alert('Jugador gana');
        } else {
            alert('Computadora gana');
        }
        }, 30 );
    }




    // const valor = valorCarta( pedirCarta() );
    // console.log({ valor });

    //*****EVENTOS  */

    btnPedir.addEventListener( 'click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );

    puntosHTML[0].innerText = puntosJugador
    
    //<img class="carta" src="cartas/2D.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
    imgCarta.classList.add('carta');

    divCartasJugador.append( imgCarta );

    if (puntosJugador > 21 ) {
        console.warn( 'Lo siento mucho, ya perdiste' );
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

    })

    btnDetener.addEventListener( 'click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugador );

    });



    // //TODO: Borrar
    // console.log( 16 )
    // turnoComputadora( 16 );

    btnNuevo.addEventListener('click', () => {

        console.clear();
        deck = [];
        deck = crearDeck();

        puntosJugador       = 0;
        puntosComputadora   = 0;

        puntosHTML[0].innerHTML       = 0;
        puntosHTML[1].innerHTML       = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    })

})();





/* Datos facciones (colores y alcances base) */
const facciones = [
    { nombre: "Marquesado", color: "#f7852a", alcanceBase: 10 },
    { nombre: "Nido de Águilas", color: "#325a9b", alcanceBase: 7 },
    { nombre: "Alianza del Bosque", color: "#6cc46d", alcanceBase: 3 },
    { nombre: "Vagabundo (B)", color: "#f7f7f7", alcanceBase: 5 }, // blanco
    { nombre: "Vagabundo (N)", color: "#111111", alcanceBase: 2 }, // negro (base 2, regla dinámica)
    { nombre: "Compañía del Río", color: "#5fc9e3", alcanceBase: 5 },
    { nombre: "Culto Reptiliano", color: "#f0e300", alcanceBase: 2 },
    { nombre: "Ducado Subterráneo", color: "#e6cfa7", alcanceBase: 8 },
    { nombre: "Conspiración Córvida", color: "#5c3a91", alcanceBase: 3 },
    { nombre: "Señor de los Cientos", color: "#e04b3e", alcanceBase: 9 },
    { nombre: "Guardianes de Hierro", color: "#555555", alcanceBase: 8 }
];

const alcanceMinimoPorJugadores = { 2:17, 3:18, 4:21, 5:25, 6:28 };


const prepData = {

"Inicio de partida" : {
    normal: `
Preparación básica

Paso 1: Asignar Facciones y Jugador Inicial. Asigna una facción a cada jugador usando cualquier método. Determina al azar el orden de asiento y el jugador inicial, el orden de turno va hacia su izquierda. Cada jugador toma su tablero de facción y todas sus piezas, tal y como se describe en la parte trasera del mismo. 
Paso 2: Preparar Marcadores de Puntuación. 
Paso 3: Robar Mano Iniciales. Si estáis jugando dos jugadores, quita las cuatro cartas de dominancia del mazo. Baraja el mazo. Cada jugador roba tres cartas. 
Paso 4: Colocar Ruinas. Coloca una ficha de ruina en cada espacio del mapa marcado con una "R" (cuatro en total). 
Paso 5: Formar la Reserva común de Objetos.Coloca estos objetos en los espacios correspondientes de la reserva de objetos en la parte superior del mapa: 2 botas , 2 bolsas , 1 ballesta , 1 martillo , 2 espadas , 2 teteras, 2 monedas . 
Paso 6: Otras Piezas. coloca los dos dados junto al mapa. 
Paso 7: Preparar Facciones. En orden de preparación (A, B, C, etc.) cada jugador sigue las instrucciones de preparación.`,

    avanzada: `
Preparación avanzada

Paso 1: Escoger y Preparar un Mapa Como grupo, escojan un mapa. Si escogen un mapa alternativo ver las reglas del juego, después reunir los 12 marcadores de palo, mezclarlos, y colocar uno en cada claro aleatoriamente de modo que cubran el símbolo de palo impreso, si lo hay. Preparar las ruinas, la reserva de objetos, y los dados. 
Paso 2: Escoger un Mazo Como grupo, pueden escoger reemplazar todo el mazo estándar por el mazo de Exiliados y Partisanos (si lo tienen). 
Paso 3: Preparar Bots Como grupo, pueden escoger jugar con bots, tal como se describe en la Ley de la Rootbótica. (ver reglas de juego) 
Paso 4: Sentar a los Jugadores, Determinar aleatoriamente el orden de asiento y el primer jugador, el orden de turno va hacia su izquierda. 
Paso 5: Preparar los Lugares Míticos (si los tienen), Como grupo, pueden escoger usar lugares míticos (ver reglas del juego). Si lo hacen, pueden ignorar la colocación de las piezas de la Torre o el Transbordador indicadas en los Mapas Alternativos (ver reglas). 
Paso 5.1: Elegir, Como grupo, elegir si usan uno o dos lugares míticos, y devolver a la caja cualesquiera cartas de lugares míticos que no quieran usar en la partida. 
Paso 5.2: Repartir y Reunir, Barajar las cartas de lugares míticos seleccionadas, robas el número elegido (uno o dos) y reunir las piezas de los lugares míticos mostradas en cada carta robada. 
Paso 5.3: Preparar, El último jugador según el orden de turno prepara un lugar mítico tal y como se indica en su carta. Si eligieron jugar con dos lugares míticos, el penúltimo jugador en orden de turno prepara el otro lugar mítico como indica su carta. 
Paso 6: Preparar Secuaces (si los tienen), Como grupo, pueden escoger jugar con exactamente tres secuaces (ver reglas del juego), como se indica a continuación. 
Paso 6.1: Reunir las piezas, Barajar las cartas de secuaces. Robar tres cartas de secuaces y devolver el resto a la caja. Reunir las piezas de los secuaces robados formando una reserva. 
Paso 6.2: Degradar, Si es una partida de tres jugadores, voltear a uno de los secuaces al azar a su cara de Degradado (marcada con una "D"). Si es una partida a cuatro jugadores, voltear a dos secuaces al azar a sus caras de Degradado. Si la partida es a cinco o más jugadores, voltear a los tres secuaces a su cara de Degradado. 
Paso 6.3: Preparar los Secuaces, Empezando por el último jugador en orden de turno y yendo en sentido inverso al orden de turno, cada jugador prepara a uno de los secuaces seleccionados siguiendo las instrucciones en su carta de secuaz (algunos no tienen instrucciones). 
Paso 6.4: Colocar Marcadores de Secuaces, Colocar los tres marcadores de secuaces con el lado mostrando un "4", "8", y "12" bocarriba tapando las casillas "4", "8", y "12" del contador de puntuación en el mapa. 
Paso 6.5: Devolver a la caja las Facciones coincidentes. Una facción no puede seleccionarse para la partida si su respectivo secuaz está en juego (indicado por el icono y el color en su lateral). Devuelve los tableros, piezas y cartas de preparación de dichas facciones a la caja. 
Paso 7: Robar Cinco Cartas, Si es una partida a dos jugadores, retirar del mazo las cuatro cartas de dominancia y devolverlas a la caja. Barajar el mazo. Cada jugador roba cinco cartas. (¡No tres como en la preparación estándar! Seleccionarás y te quedarás con tres cartas en el paso 10). 
Paso 8: Preparar las Facciones, Como grupo, pueden escoger y preparar las facciones como se describe en la Preparación Estándar o pueden usar las cartas de preparación de facción incluidas en la expansión de Los Merodeadores, como se describe abajo. 
Paso 8.1: Repartir Cartas de Preparación, (o usar la calculadora en las reglas del juego) Barajar las cartas de preparación de las facciones belicosas (nombre en rojo con una espada) y robar una al centro de la mesa. Barajar el resto de cartas de preparación de las facciones belicosas con todas las cartas de preparación de las facciones insurgentes (nombre en gris sin espada) y robar una carta por jugador al centro de la mesa. (Habrá una carta de preparación de facción más que el número de jugadores). Si es una partida a dos jugadores, retirar todas las cartas de preparación de facciones insurgentes antes de robar ninguna carta (Pueden dejarlas si juegan con Secuaces y se atreven). 
Paso 8.1.1: Bloquear al último insurgente. Si la última carta de preparación de facción robada es insurgente, giradla horizontalmente para mostrar que está bloqueada. No puede escogerse a menos que, como mínimo, una facción belicosa haya sido escogida. 
Paso 8.1.2: Vagabundo, Cuando se robe una carta de preparación de facción de Vagabundo, robar también una carta de personaje de Vagabundo al azar y situarla a su lado bocarriba. Si un jugador escoge a ese Vagabundo como su facción, debe usar esa carta de personaje. 
Paso 8.2: Escoger Facciones, Empezando por el último jugador en orden de turno y yendo en sentido inverso al orden de turno, cada jugador escoge una de las cartas de preparación de facción del centro de la mesa y prepara su facción en ese instante (antes de que el siguiente jugador escoja). 
Paso 8.2.1: Hogar, Al preparar su facción, los jugadores podrían tener que elegir uno o más claro como claros hogar. Los jugadores no pueden escoger como claros hogar claros que sus enemigos ya hayan escogido como sus claros hogar o claros donde no puedan colocar las piezas indicadas en su preparación. 
Paso 8.2.2: Patrias Adyacentes, Algunas facciones te indican que escojas claros patria que no sean adyacentes a claros patria enemigos, o que haya dos o más claros entre ellos y claros patria enemigos. Si no puedes cumplir un requisito de "dos o más claros entre ellos", puedes escoger un claro patria que no sea adyacente a un claro hogar enemigo. Si no puedes cumplir un requisito de "no adyacente", puedes escoger un claro patria que sea adyacente a un claro hogar enemigo. (Sencillamente, piensa en esto como en "Intenta empezar lo más alejado posible"). 
Paso 9: Preparar Marcadores de Puntuación, 
Paso 10: Seleccionar las Manos Iniciales, Cada jugador escoge tres cartas para mantener en su mano y coloca las otras dos bocabajo en el mazo común. Cuando todos lo hayan hecho, barajar el mazo.
`
},


    "Marquesado": {
    normal: `• Paso 1: Juntar Guerreros y Madera. Forma las reservas de guerreros (25) y de fichas de madera (8).
• Paso 2: Colocar La Fortaleza. Coloca la ficha de fortaleza en el claro de una esquina a tu elección.
• Paso 3: Guarnición. Coloca un guerrero en cada claro excepto en el claro que está en la esquina diagonalmente opuesta al claro de la ficha de fortaleza.
• Paso 4: Colocar los Edificios Iniciales. Coloca 1 aserradero, 1 taller y 1 reclutador. Puedes colocarlos en el claro de la ficha de fortaleza o en claros adyacentes, en cualquier combinación.
• Paso 5: Rellenar Contadores. Coloca tus 5 aserraderos, 5 talleres, y 5 reclutadores restantes en sus correspondientes contadores de edificios de derecha a izquierda (esto rellena todos los espacios excepto el de más a la izquierda de cada contador).`,

    avanzada: `1º: Elige 3 claros de hogar, cada uno adyacente a otro de tus claros de hogar.
2º: Pon 3 guerreros en cada uno de tus hogares. Pon 1 guerrero en cada otro claro.
3º: Pon el castillo en uno de tus hogares, no adyacente a un hogar enemigo si es posible.
4º: Pon 1 aserradero, 1 taller y 1 reclutador en cada claro de un hogar diferente (si es posible).
5º: Llena tu registro de Edificios con tus edificios, excepto los espacios de más a la izquierda.`
    },

    "Nido de Águilas": {
    normal: `• Paso 1: Juntar Guerreros. Forma la reserva de guerreros (20).
• Paso 2: Colocar Nido y Guerreros Iniciales. Coloca 1 nido y 6 guerreros en el claro de la esquina diagonalmente opuesta al claro donde está la ficha de fortaleza.
• Paso 3: Escoger Líder. Elige 1 de las 4 cartas de líder y colócala en tu espacio de carta de líder.
• Paso 4: Colocar Visires. Coloca tus 2 cartas de Visir Leal, mostrando su palo, en las columnas de Decreto según marque tu líder.
• Paso 5: Rellenar Contador. Coloca tus 6 nidos restantes en tu contador de nidos, de derecha a izquierda.`,

    avanzada: `1º: Elige un claro de hogar en el borde del mapa que tenga 3+ claros entre él y los hogares enemigos.
2º: Pon 6 guerreros y 1 nido en tu hogar.
3º: Pon cualquier carta de Líder en tu espacio de Carta de Líder. Mantén los otros 3 líderes boca arriba cerca.
4º: Mete tus 2 Visires Leales bajo el espacio de columnas del Decreto como se indica en tu líder actual.
5º: Llena tus espacios de Nidos con nidos, excepto el de más a la izquierda.`
    },

    "Alianza del Bosque": {
    normal: `• Paso 1: Juntar Guerreros. Forma la reserva de guerreros (10).
• Paso 2: Colocar Bases. Coloca 3 bases en los espacios correspondientes de tu zona de bases.
• Paso 3: Rellenar el Contador de Simpatía. Coloca allí 10 fichas de simpatía.
• Paso 4: Obtener Simpatizantes. Roba 3 cartas y colócalas bocabajo en tu montón de simpatizantes.`,

    avanzada: `1º: Roba 3 cartas y añádelas boca abajo a tu pila de Simpatizantes.
2º: Llena tu registro de Simpatía con fichas de simpatía.
3º: Pon tus 3 Bases en tus espacios de Bases correspondientes.`
    },

    "Vagabundo": {
    normal: `• Paso 1: Elegir un Personaje. Elige una carta de personaje y colócala en tu espacio de carta de personaje.
• Paso 2: Colocar el Peón. Coloca tu peón de Vagabundo en un bosque a tu elección.
• Paso 3: Conseguir Misiones. Baraja tu mazo de misiones, roba 3 cartas de misión y colócalas bocarriba junto a ti.
• Paso 4: Llenar las Ruinas. Toma las 4 ruinas del mapa y coloca los objetos "R" bajo ellas aleatoriamente.
• Paso 5: Obtener los Objetos Iniciales. Toma los objetos marcados con "S" de tu carta de personaje y colócalos en tu tablero.
• Paso 6: Configurar Relaciones. Coloca los marcadores de relación de cada facción no Vagabundo en el espacio Indiferente.`,

    avanzada: `1º: Pon tu peón en cualquier bosque.
2º: Baraja el mazo de misiones. Roba 3 misiones y colócalas cerca.
3º: Pon 4 objetos "R" bajo las ruinas aleatoriamente, a menos que un no-Vagabundo ya lo haya hecho.
4º: Pon tu carta de personaje en tu espacio correspondiente y configura los objetos "S" iniciales.
5º: Pon los marcadores de relación para las facciones no-Vagabundo en el espacio Indiferente.`
    },

    "Compañía del Río": {
    normal: `• Paso 1: Juntar Guerreros. Forma la reserva de guerreros (15).
• Paso 2: Desembarcar. Coloca 4 guerreros en cualquier claro en contacto con el río.
• Paso 3: Rellenar Puestos Comerciales. Coloca 9 puestos comerciales en los espacios correspondientes.
• Paso 4: Obtener Fondos Iniciales. Coloca 3 guerreros en tu zona de Pagos.
• Paso 5: Precios Iniciales. Coloca 1 ficha de servicio en cualquier espacio de cada contador de Servicios.`,

    avanzada: `1º: Pon 4 guerreros entre cualquier claro a lo largo del río.
2º: Pon 3 guerreros en tu caja de Pagos.
3º: Llena tus registros de Puestos de Comercio con los puestos correspondientes.
4º: Pon tus 3 marcadores de servicio en tu registro de Servicios, estableciendo un precio para cada uno.`
    },

    "Culto Reptiliano": {
    normal: `• Paso 1: Juntar Guerreros. Forma la reserva de guerreros (25).
• Paso 2: Colocar Guerreros. En el claro de la esquina opuesta a la fortaleza o nido inicial, coloca 4 guerreros y 1 jardín. Luego coloca 1 guerrero en cada claro adyacente.
• Paso 3: Elegir al Paria. Coloca la ficha de paria sobre cualquier casilla de la zona paria.
• Paso 4: Rellenar los Contadores de Jardín. Coloca tus 14 jardines restantes en sus espacios correspondientes.`,

    avanzada: `1º: Elige un claro de hogar no adyacente a hogares enemigos.
2º: Pon 4 guerreros y 1 jardín correspondiente en tu hogar. Pon 2 guerreros en claros adyacentes tan equitativamente como sea posible.
3º: Pon 2 guerreros en tu caja de Acólitos.
4º: Llena tus registros de Jardines con jardines, excepto el espacio de más a la izquierda.
5º: Pon tu marcador de paria en su lado de Paria en cualquier espacio de la caja de Paria.`
    },

    "Ducado Subterráneo": {
    normal: `• Paso 1: Juntar Guerreros y Túneles. Forma las reservas de guerreros (20) y fichas de túneles (3).
• Paso 2: Preparar la Madriguera. Coloca la loseta de la madriguera cerca del mapa.
• Paso 3: Salir a la Superficie. Coloca 2 guerreros y 1 túnel en un claro de esquina libre, y 2 guerreros en cada claro adyacente.
• Paso 4: Rellenar los Marcadores de Edificios. Coloca 3 ciudadelas y 3 mercados en tus espacios de edificios.
• Paso 5: Recoger Ministros. Coloca las 9 cartas de ministro bocarriba en tu pila de ministros sin convencer.
• Paso 6: Rellenar los Espacios de Coronas. Coloca las 9 coronas en los espacios con puntos de victoria.`,

    avanzada: `1º: Elige un claro de hogar no adyacente a hogares enemigos.
2º: Pon 6 guerreros y 1 túnel en tu hogar. Pon 3 guerreros en claros adyacentes tan equitativamente como sea posible.
3º: Coloca tu tablero de Madriguera cerca del mapa.
4º: Llena tus registros de Edificios con mercados.
5º: Coloca tus cartas de ministros boca arriba en tu pila de Ministros No Influenciados.
6º: Pon tus 9 coronas en los espacios cuadrados con puntos de victoria.`
    },

    "Conspiración Córvida": {
    normal: `• Paso 1: Juntar Guerreros y conspiraciones. Forma las reservas de guerreros (15) y fichas de conspiracion (8).
• Paso 2: Dispersarse. Coloca 1 guerrero en un claro cualquiera de cada palo (3 en total).`,

    avanzada: `1º: Elige un claro de hogar y coloca 1 guerrero y 1 ficha de cnospiracion boca abajo allí.
2º: Pon 1 guerrero en un claro de cada palo (4 en total).`
    },

    "Señor de los Cientos": {
    avanzada: `1º: Elige un claro de hogar en el borde del mapa con 3+ claros entre él y los hogares enemigos.
2º: Pon tu Señor de la Guerra, 4 guerreros y 1 fortaleza en tu hogar.
3º: Pon tu carta de humor Obstinado en tu espacio de Carta de Humor.
4º: Pon los 4 objetos "R" bajo las ruinas aleatoriamente, a menos que esto ya se haya hecho.`
    },

    "Guardianes de Hierro": {
    avanzada: `1º: Baraja las 12 fichas de reliquia boca abajo. Pon una boca abajo aleatoriamente en cada bosque.
2º: Elige 2 claros de hogar adyacentes en el borde del mapa con 2 claros entre ellos y los hogares enemigos. Pon 4 guerreros en cada hogar.
3º: Pon las reliquias restantes tan equitativamente como sea posible entre las que no sean adyacentes a tus hogares.
4º: Mete una carta de Vasallo Fiel en cada uno de tus espacios de columna de Séquito.`
    }
};

const factionColors = {
    "Marquesado": "#f7852a",
    "Nido de Águilas": "#325a9b",
    "Alianza del Bosque": "#6cc46d",
    "Vagabundo (B)": "#f7f7f7",
    "Vagabundo (N)": "#111111",
    "Compañía del Río": "#5fc9e3",
    "Culto Reptiliano": "#f0e300",
    "Ducado Subterráneo": "#e6cfa7",
    "Conspiración Córvida": "#5c3a91",
    "Señor de los Cientos": "#e04b3e",
    "Guardianes de Hierro": "#555555"
};

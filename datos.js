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

• Paso 1: Asignar Facciones y Jugador Inicial. Asigna una facción a cada jugador usando cualquier método. Determina al azar el orden de asiento y el jugador inicial, el orden de turno va hacia su izquierda. Cada jugador toma su tablero de facción y todas sus piezas, tal y como se describe en la parte trasera del mismo. 
• Paso 2: Preparar Marcadores de Puntuación. 
• Paso 3: Robar Mano Iniciales. Si estáis jugando dos jugadores, quita las cuatro cartas de dominancia del mazo. Baraja el mazo. Cada jugador roba tres cartas. 
• Paso 4: Colocar Ruinas. Coloca una ficha de ruina en cada espacio del mapa marcado con una "R" (cuatro en total). 
• Paso 5: Formar la Reserva común de Objetos.Coloca estos objetos en los espacios correspondientes de la reserva de objetos en la parte superior del mapa: 2 botas , 2 bolsas , 1 ballesta , 1 martillo , 2 espadas , 2 teteras, 2 monedas . 
• Paso 6: Otras Piezas. coloca los dos dados junto al mapa. 
• Paso 7: Preparar Facciones. En orden de preparación (A, B, C, etc.) cada jugador sigue las instrucciones de preparación.`,

    avanzada: `
Preparación avanzada

• Paso 1: Escoger y Preparar un Mapa Como grupo, escojan un mapa. Si escogen un mapa alternativo ver las reglas del juego, después reunir los 12 marcadores de palo, mezclarlos, y colocar uno en cada claro aleatoriamente de modo que cubran el símbolo de palo impreso, si lo hay. Preparar las ruinas, la reserva de objetos, y los dados. 
• Paso 2: Escoger un Mazo Como grupo, pueden escoger reemplazar todo el mazo estándar por el mazo de Exiliados y Partisanos (si lo tienen). 
• Paso 3: Preparar Bots Como grupo, pueden escoger jugar con bots, tal como se describe en la Ley de la Rootbótica. (ver reglas de juego) 
• Paso 4: Sentar a los Jugadores, Determinar aleatoriamente el orden de asiento y el primer jugador, el orden de turno va hacia su izquierda. 
• Paso 5: Preparar los Lugares Míticos (si los tienen), Como grupo, pueden escoger usar lugares míticos (ver reglas del juego). Si lo hacen, pueden ignorar la colocación de las piezas de la Torre o el Transbordador indicadas en los Mapas Alternativos (ver reglas). 
• Paso 5.1: Elegir, Como grupo, elegir si usan uno o dos lugares míticos, y devolver a la caja cualesquiera cartas de lugares míticos que no quieran usar en la partida. 
• Paso 5.2: Repartir y Reunir, Barajar las cartas de lugares míticos seleccionadas, robas el número elegido (uno o dos) y reunir las piezas de los lugares míticos mostradas en cada carta robada. 
• Paso 5.3: Preparar, El último jugador según el orden de turno prepara un lugar mítico tal y como se indica en su carta. Si eligieron jugar con dos lugares míticos, el penúltimo jugador en orden de turno prepara el otro lugar mítico como indica su carta. 
• Paso 6: Preparar Secuaces (si los tienen), Como grupo, pueden escoger jugar con exactamente tres secuaces (ver reglas del juego), como se indica a continuación. 
• Paso 6.1: Reunir las piezas, Barajar las cartas de secuaces. Robar tres cartas de secuaces y devolver el resto a la caja. Reunir las piezas de los secuaces robados formando una reserva. 
• Paso 6.2: Degradar, Si es una partida de tres jugadores, voltear a uno de los secuaces al azar a su cara de Degradado (marcada con una "D"). Si es una partida a cuatro jugadores, voltear a dos secuaces al azar a sus caras de Degradado. Si la partida es a cinco o más jugadores, voltear a los tres secuaces a su cara de Degradado. 
• Paso 6.3: Preparar los Secuaces, Empezando por el último jugador en orden de turno y yendo en sentido inverso al orden de turno, cada jugador prepara a uno de los secuaces seleccionados siguiendo las instrucciones en su carta de secuaz (algunos no tienen instrucciones). 
• Paso 6.4: Colocar Marcadores de Secuaces, Colocar los tres marcadores de secuaces con el lado mostrando un "4", "8", y "12" bocarriba tapando las casillas "4", "8", y "12" del contador de puntuación en el mapa. 
• Paso 6.5: Devolver a la caja las Facciones coincidentes. Una facción no puede seleccionarse para la partida si su respectivo secuaz está en juego (indicado por el icono y el color en su lateral). Devuelve los tableros, piezas y cartas de preparación de dichas facciones a la caja. 
• Paso 7: Robar Cinco Cartas, Si es una partida a dos jugadores, retirar del mazo las cuatro cartas de dominancia y devolverlas a la caja. Barajar el mazo. Cada jugador roba cinco cartas. (¡No tres como en la preparación estándar! Seleccionarás y te quedarás con tres cartas en el paso 10). 
• Paso 8: Preparar las Facciones, Como grupo, pueden escoger y preparar las facciones como se describe en la Preparación Estándar o pueden usar las cartas de preparación de facción incluidas en la expansión de Los Merodeadores, como se describe abajo. 
• Paso 8.1: Repartir Cartas de Preparación, (o usar la calculadora en las reglas del juego) Barajar las cartas de preparación de las facciones belicosas (nombre en rojo con una espada) y robar una al centro de la mesa. Barajar el resto de cartas de preparación de las facciones belicosas con todas las cartas de preparación de las facciones insurgentes (nombre en gris sin espada) y robar una carta por jugador al centro de la mesa. (Habrá una carta de preparación de facción más que el número de jugadores). Si es una partida a dos jugadores, retirar todas las cartas de preparación de facciones insurgentes antes de robar ninguna carta (Pueden dejarlas si juegan con Secuaces y se atreven). 
• Paso 8.1.1: Bloquear al último insurgente. Si la última carta de preparación de facción robada es insurgente, giradla horizontalmente para mostrar que está bloqueada. No puede escogerse a menos que, como mínimo, una facción belicosa haya sido escogida. 
• Paso 8.1.2: Vagabundo, Cuando se robe una carta de preparación de facción de Vagabundo, robar también una carta de personaje de Vagabundo al azar y situarla a su lado bocarriba. Si un jugador escoge a ese Vagabundo como su facción, debe usar esa carta de personaje. 
• Paso 8.2: Escoger Facciones, Empezando por el último jugador en orden de turno y yendo en sentido inverso al orden de turno, cada jugador escoge una de las cartas de preparación de facción del centro de la mesa y prepara su facción en ese instante (antes de que el siguiente jugador escoja). 
• Paso 8.2.1: Hogar, Al preparar su facción, los jugadores podrían tener que elegir uno o más claro como claros hogar. Los jugadores no pueden escoger como claros hogar claros que sus enemigos ya hayan escogido como sus claros hogar o claros donde no puedan colocar las piezas indicadas en su preparación. 
• Paso 8.2.2: Patrias Adyacentes, Algunas facciones te indican que escojas claros patria que no sean adyacentes a claros patria enemigos, o que haya dos o más claros entre ellos y claros patria enemigos. Si no puedes cumplir un requisito de "dos o más claros entre ellos", puedes escoger un claro patria que no sea adyacente a un claro hogar enemigo. Si no puedes cumplir un requisito de "no adyacente", puedes escoger un claro patria que sea adyacente a un claro hogar enemigo. (Sencillamente, piensa en esto como en "Intenta empezar lo más alejado posible"). 
• Paso 9: Preparar Marcadores de Puntuación, 
• Paso 10: Seleccionar las Manos Iniciales, Cada jugador escoge tres cartas para mantener en su mano y coloca las otras dos bocabajo en el mazo común. Cuando todos lo hayan hecho, barajar el mazo.
`
},


    "Marquesado": {
    normal: `• Paso 1: Juntar Guerreros y Madera. Forma las reservas de guerreros (25) y de fichas de madera (8).
• Paso 2: Colocar La Fortaleza. Coloca la ficha de fortaleza en el claro de una esquina a tu elección.
• Paso 3: Guarnición. Coloca un guerrero en cada claro excepto en el claro que está en la esquina diagonalmente opuesta al claro de la ficha de fortaleza.
• Paso 4: Colocar los Edificios Iniciales. Coloca 1 aserradero, 1 taller y 1 reclutador. Puedes colocarlos en el claro de la ficha de fortaleza o en claros adyacentes, en cualquier combinación.
• Paso 5: Rellenar Contadores. Coloca tus 5 aserraderos, 5 talleres, y 5 reclutadores restantes en sus correspondientes contadores de edificios de derecha a izquierda (esto rellena todos los espacios excepto el de más a la izquierda de cada contador).`,

    avanzada: `• Paso 1: Elige 3 claros de hogar, cada uno adyacente a otro de tus claros de hogar.
• Paso 2: Pon 3 guerreros en cada uno de tus hogares. Pon 1 guerrero en cada otro claro.
• Paso 3: Pon el castillo en uno de tus hogares, no adyacente a un hogar enemigo si es posible.
• Paso 4: Pon 1 aserradero, 1 taller y 1 reclutador en cada claro de un hogar diferente (si es posible).
• Paso 5: Llena tu registro de Edificios con tus edificios, excepto los espacios de más a la izquierda.`
    },

    "Nido de Águilas": {
    normal: `• Paso 1: Juntar Guerreros. Forma la reserva de guerreros (20).
• Paso 2: Colocar Nido y Guerreros Iniciales. Coloca 1 nido y 6 guerreros en el claro de la esquina diagonalmente opuesta al claro donde está la ficha de fortaleza.
• Paso 3: Escoger Líder. Elige 1 de las 4 cartas de líder y colócala en tu espacio de carta de líder.
• Paso 4: Colocar Visires. Coloca tus 2 cartas de Visir Leal, mostrando su palo, en las columnas de Decreto según marque tu líder.
• Paso 5: Rellenar Contador. Coloca tus 6 nidos restantes en tu contador de nidos, de derecha a izquierda.`,

    avanzada: `• Paso 1: Elige un claro de hogar en el borde del mapa que tenga 3+ claros entre él y los hogares enemigos.
• Paso 2: Pon 6 guerreros y 1 nido en tu hogar.
• Paso 3: Pon cualquier carta de Líder en tu espacio de Carta de Líder. Mantén los otros 3 líderes boca arriba cerca.
• Paso 4: Mete tus 2 Visires Leales bajo el espacio de columnas del Decreto como se indica en tu líder actual.
• Paso 5: Llena tus espacios de Nidos con nidos, excepto el de más a la izquierda.`
    },

    "Alianza del Bosque": {
    normal: `• Paso 1: Juntar Guerreros. Forma la reserva de guerreros (10).
• Paso 2: Colocar Bases. Coloca 3 bases en los espacios correspondientes de tu zona de bases.
• Paso 3: Rellenar el Contador de Simpatía. Coloca allí 10 fichas de simpatía.
• Paso 4: Obtener Simpatizantes. Roba 3 cartas y colócalas bocabajo en tu montón de simpatizantes.`,

    avanzada: `• Paso 1: Roba 3 cartas y añádelas boca abajo a tu pila de Simpatizantes.
• Paso 2: Llena tu registro de Simpatía con fichas de simpatía.
• Paso 3: Pon tus 3 Bases en tus espacios de Bases correspondientes.`
    },

    "Vagabundo": {
    normal: `• Paso 1: Elegir un Personaje. Elige una carta de personaje y colócala en tu espacio de carta de personaje.
• Paso 2: Colocar el Peón. Coloca tu peón de Vagabundo en un bosque a tu elección.
• Paso 3: Conseguir Misiones. Baraja tu mazo de misiones, roba 3 cartas de misión y colócalas bocarriba junto a ti.
• Paso 4: Llenar las Ruinas. Toma las 4 ruinas del mapa y coloca los objetos "R" bajo ellas aleatoriamente.
• Paso 5: Obtener los Objetos Iniciales. Toma los objetos marcados con "S" de tu carta de personaje y colócalos en tu tablero.
• Paso 6: Configurar Relaciones. Coloca los marcadores de relación de cada facción no Vagabundo en el espacio Indiferente.`,

    avanzada: `• Paso 1: Pon tu peón en cualquier bosque.
• Paso 2: Baraja el mazo de misiones. Roba 3 misiones y colócalas cerca.
• Paso 3: Pon 4 objetos "R" bajo las ruinas aleatoriamente, a menos que un no-Vagabundo ya lo haya hecho.
• Paso 4: Pon tu carta de personaje en tu espacio correspondiente y configura los objetos "S" iniciales.
• Paso 5: Pon los marcadores de relación para las facciones no-Vagabundo en el espacio Indiferente.`
    },

    "Compañía del Río": {
    normal: `• Paso 1: Juntar Guerreros. Forma la reserva de guerreros (15).
• Paso 2: Desembarcar. Coloca 4 guerreros en cualquier claro en contacto con el río.
• Paso 3: Rellenar Puestos Comerciales. Coloca 9 puestos comerciales en los espacios correspondientes.
• Paso 4: Obtener Fondos Iniciales. Coloca 3 guerreros en tu zona de Pagos.
• Paso 5: Precios Iniciales. Coloca 1 ficha de servicio en cualquier espacio de cada contador de Servicios.`,

    avanzada: `• Paso 1: Pon 4 guerreros entre cualquier claro a lo largo del río.
• Paso 2: Pon 3 guerreros en tu caja de Pagos.
• Paso 3: Llena tus registros de Puestos de Comercio con los puestos correspondientes.
• Paso 4: Pon tus 3 marcadores de servicio en tu registro de Servicios, estableciendo un precio para cada uno.`
    },

    "Culto Reptiliano": {
    normal: `• Paso 1: Juntar Guerreros. Forma la reserva de guerreros (25).
• Paso 2: Colocar Guerreros. En el claro de la esquina opuesta a la fortaleza o nido inicial, coloca 4 guerreros y 1 jardín. Luego coloca 1 guerrero en cada claro adyacente.
• Paso 3: Elegir al Paria. Coloca la ficha de paria sobre cualquier casilla de la zona paria.
• Paso 4: Rellenar los Contadores de Jardín. Coloca tus 14 jardines restantes en sus espacios correspondientes.`,

    avanzada: `• Paso 1: Elige un claro de hogar no adyacente a hogares enemigos.
• Paso 2: Pon 4 guerreros y 1 jardín correspondiente en tu hogar. Pon 2 guerreros en claros adyacentes tan equitativamente como sea posible.
• Paso 3: Pon 2 guerreros en tu caja de Acólitos.
• Paso 4: Llena tus registros de Jardines con jardines, excepto el espacio de más a la izquierda.
• Paso 5: Pon tu marcador de paria en su lado de Paria en cualquier espacio de la caja de Paria.`
    },

    "Ducado Subterráneo": {
    normal: `• Paso 1: Juntar Guerreros y Túneles. Forma las reservas de guerreros (20) y fichas de túneles (3).
• Paso 2: Preparar la Madriguera. Coloca la loseta de la madriguera cerca del mapa.
• Paso 3: Salir a la Superficie. Coloca 2 guerreros y 1 túnel en un claro de esquina libre, y 2 guerreros en cada claro adyacente.
• Paso 4: Rellenar los Marcadores de Edificios. Coloca 3 ciudadelas y 3 mercados en tus espacios de edificios.
• Paso 5: Recoger Ministros. Coloca las 9 cartas de ministro bocarriba en tu pila de ministros sin convencer.
• Paso 6: Rellenar los Espacios de Coronas. Coloca las 9 coronas en los espacios con puntos de victoria.`,

    avanzada: `• Paso 1: Elige un claro de hogar no adyacente a hogares enemigos.
• Paso 2: Pon 6 guerreros y 1 túnel en tu hogar. Pon 3 guerreros en claros adyacentes tan equitativamente como sea posible.
• Paso 3: Coloca tu tablero de Madriguera cerca del mapa.
• Paso 4: Llena tus registros de Edificios con mercados.
• Paso 5: Coloca tus cartas de ministros boca arriba en tu pila de Ministros No Influenciados.
• Paso 6: Pon tus 9 coronas en los espacios cuadrados con puntos de victoria.`
    },

    "Conspiración Córvida": {
    normal: `• Paso 1: Juntar Guerreros y conspiraciones. Forma las reservas de guerreros (15) y fichas de conspiracion (8).
• Paso 2: Dispersarse. Coloca 1 guerrero en un claro cualquiera de cada palo (3 en total).`,

    avanzada: `• Paso 1: Elige un claro de hogar y coloca 1 guerrero y 1 ficha de cnospiracion boca abajo allí.
• Paso 2: Pon 1 guerrero en un claro de cada palo (4 en total).`
    },

    "Señor de los Cientos": {
    avanzada: `• Paso 1: Elige un claro de hogar en el borde del mapa con 3+ claros entre él y los hogares enemigos.
• Paso 2: Pon tu Señor de la Guerra, 4 guerreros y 1 fortaleza en tu hogar.
• Paso 3: Pon tu carta de humor Obstinado en tu espacio de Carta de Humor.
• Paso 4: Pon los 4 objetos "R" bajo las ruinas aleatoriamente, a menos que esto ya se haya hecho.`
    },

    "Guardianes de Hierro": {
    avanzada: `• Paso 1: Baraja las 12 fichas de reliquia boca abajo. Pon una boca abajo aleatoriamente en cada bosque.
• Paso 2: Elige 2 claros de hogar adyacentes en el borde del mapa con 2 claros entre ellos y los hogares enemigos. Pon 4 guerreros en cada hogar.
• Paso 3: Pon las reliquias restantes tan equitativamente como sea posible entre las que no sean adyacentes a tus hogares.
• Paso 4: Mete una carta de Vasallo Fiel en cada uno de tus espacios de columna de Séquito.`
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


const factionSummaries = {
    "Marquesado": "El Marquesado Gatuno gobierna el Bosque y quiere convertirlo en su reserva militar e industrial. Cada vez que el Marquesado construya uno de sus edificios (un taller, un aserradero, o un reclutador) obtiene puntos de victoria. Cuantos más edificios del mismo tipo tenga en el mapa, más puntos obtiene. Sin embargo, para continuar alimentando ese ritmo de construcción, el Marquesado debe mantener y proteger una economía de madera fuerte e interconectada.",
    "Nido de Águilas": "Las Dinastías del Nido de Águilas desean restaurar su antiguamente digna estirpe a su gloria pasada retomando control de los claros del Bosque. Durante la Noche, el Nido de Águilas obtiene puntos de victoria en función del número de nidos que tiene en el mapa. Cuanto más nidos haya colocado, mayores son sus ganancias. Sin embargo, el Nido está atado a su Decreto, un conjunto siempre creciente de acciones obligatorias que han sido prometidas por su líder. Cada turno debe llevar a cabo todas las acciones de su Decreto, o caerá en el caos.",
    "Alianza del Bosque": "La Alianza trabaja para obtener la simpatía de las variadas criaturas del bosque que están descontentas con la situación actual. Cada vez que la Alianza coloca una ficha de simpatía, puede obtener puntos de victoria. Cuanta más simpatía tenga en el mapa, más puntos de victoria obtiene. Ganas simpatía de las gentes requiere simpatizantes. Estos simpatizantes también se pueden utilizar con un fin violento, incitando a la rebelión por todo el Bosque. Cuando ocurra una revuelta, la Alianza establecerá una base. Las bases le permiten a la Alianza entrenar oficiales, incrementando su flexibilidad militar.",
    "Vagabundo": "El Vagabundo puede apoyar a todos los bandos de este conflicto, al tiempo que lleva a cabo misiones para incrementar su reputación. Cada vez que mejoras tu relación con otra facción, o bien quitas un guerrero que pertenece a una facción hostil, obtienes puntos de victoria. También puedes completar misiones para obtener puntos de victoria. Para mover y actuar de forma efectiva con el Vagabundo debes gestionar tu hatillo de objetos, expandiendo tu colección al explorar las ruinas en los claros y ayudar a otras facciones.",
    "Culto Reptiliano": "El Culto Reptiliano trata de abrumar a sus enemigos a través de fuerza de voluntad bruta, y para ello utiliza a las criaturas descartadas del Bosque. En los claros que gobierna el Culto puede construir jardines, con los que aumenta el boca a pico para difundir su evangelio. Cuanto mayor sea su control sobre el corazón de sus fieles, el Culto obtendrá más puntos de victoria al completar ciertos rituales. Mientras que las otras facciones gastan cartas para lograr sus objetivos, el Culto principalmente revela cartas y gradualmente las va seleccionando para conseguir el conjunto ideal de seguidores. A no ser que se usen para puntuar, esas cartas no se gastan y vuelve a la mano del Culto durante la Noche. Sin embargo, este enfoque más amable hace que el movimiento y las operaciones de combate sean más difíciles, así que esas acciones sólo pueden ser llevadas a cabo por sus acólitos más radicalizados, obtenidos a medida que los guerreros del Culto son masacrados al defender en batallas.",
    "Compañía del Río": "Cuando llegaron noticias de que se estaba desatando una guerra total en el Bosque, la Compañía del Río envió rápidamente a sus oficiales para ponerse manos a la obra. Mientras las otras facciones compran sus servicios, la Compañía podrá reforzar sus intereses comerciales construyendo puestos comerciales a lo largo del río, obteniendo puntos de victoria. También puede obtenerlos mediante la acumulación de fondos. Sin embargo, una tesorería boyante también se convierte en un objetivo fácil, así que la Compañía debe ser cuidadosa al expandir sus operaciones por el peligroso bosque.",
    "Ducado Subterráneo": "El Ducado Subterráneo quiere demostrarle a las extrañas criaturas del Bosque que estarían mejor como súbditos suyos. A medida que coloca puestos fronterizos para mostrar su poder en el Bosque, el Ducado puede convencer ministros para que sigan su causa, obteniendo puntos de victoria y desviando más y más recursos del Ducado. Pero tened cuidado, un revés de la fortuna podría suponer una humillación pública y llevar a los ministros a abandonar su tarea.",
    "Conspiración Córvida": "La Conspiración Córvida busca forzar al Bosque a la sumisión llevando a cabo planes criminales y obteniendo puntos de victoria cada vez que voltean uno. Cuantos más planes haya revelados sobre el mapa, más puntos obtienen. Desviar la atención es crítico, ya que si sus intenciones son demasiado obvias, los Córvidos se arriesgan a ser expuestos. Para evitarlo deben reclutar con mucha cautela y buscar todas las oportunidades posibles para el subterfugio y la extorsión.",
    "Señor de los Cientos": "El Señor de los Cientos no soporta necedades y no permite discrepancias. Durante su Noe, obtiene puntos en función del grado de opresión al que somete a sus enemigos. Cuando más claros gobierne con piezas de los Cientos y sin piezas enemigas (ni guerreros, ni edificios, ¡nada!) más puntos obtiene. Para aumentar su poder y captar guerreros, los Cientos deben ganar objetos y añadirlos a su creciente Botín. Liderando a los Cientos está el Señor de la Guerra, un guerrero demagogo cuyo inestable estado de ánimo le da una habilidad durante el turno. El señor de la guerra está obsesionado con el botín, así que a medida que los Cientos consiguen más objetos, él tendrá menos estados de ánimo entre los que escoger. Declarándose a ellos mismos como la verdadera voz del Bosque, los Cientos pueden instigar turbas, que destruirán fichas y edificios enemigos, y saquearán los objetos de las ruinas.",
    "Guardianes de Hierro": "Los Guardianes de Hierro son una orden de devotos caballeros, que tiempo atrás fueron exiliados del Bosque, pero han regresado para recuperar las reliquias perdidas en conflictos del pasado. No obstante, que estas reliquias pertenezcan a los Guardianes o al Bosque, ya es otra cuestión. Para cumplir su misión, necesitarán desenterrar las reliquias de los bosques, llevarlas a un puesto provisional del mismo tipo, y, finalmente, recuperarlas. Cuando recuperen una reliquia, obtienen tantos puntos de victoria como el valor de la misma, de uno a tres, y además también obtienen dos puntos cada vez que completan un conjunto de tres tipos de reliquias (figuras, tablas y joyas). Con el paso del tiempo, los Guardianes reunirán un Séquito de criaturas del Bosque, permitiéndoles realizar más acciones. Sin embargo, cada vez que desentierren o recuperen una reliquia, podrían perder la carta del Séquito que usaron para ello, por lo que necesitarán planear por adelantado y adoptar una gestión prudente del riesgo para tener éxito."
};

const alcanceHelpText = `
El "Alcance" es un valor que mide qué tan "militante" o expansiva es una facción.

• **Valores Altos (ej. Marquesado: 10):** Indican facciones que ponen muchos guerreros en el mapa.
• **Valores Bajos (ej. Alianza: 3):** Indican facciones insurgentes o especializadas.

Para una partida equilibrada, la suma del Alcance de todas las facciones debe ser igual o mayor al mínimo recomendado para tu número de jugadores:

• 2 Jugadores: 17+
• 3 Jugadores: 18+
• 4 Jugadores: 21+
• 5 Jugadores: 25+
• 6 Jugadores: 28+

**Regla Especial (Vagabundo):**

• El primer Vagabundo (B o N) tiene un Alcance de 5.
• Si se añade un segundo Vagabundo, este solo tiene un Alcance de 2.
`;


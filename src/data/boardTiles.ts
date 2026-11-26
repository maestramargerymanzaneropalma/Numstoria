import type { CivilizationId, TileData } from '../types/game';

export interface CivilizationMeta {
  id: CivilizationId;
  name: string;
  shortName: string;
  accentHex: string;
  softBgHex: string;
  borderHex: string;
  textHex: string;
  systemLabel: string;
}

export const CIVILIZATIONS: Record<CivilizationId, CivilizationMeta> = {
  mesopotamia: {
    id: 'mesopotamia',
    name: 'Mesopotamia',
    shortName: 'Mesopotamia',
    accentHex: '#9a3412',
    softBgHex: '#fdf3ec',
    borderHex: '#d8a182',
    textHex: '#7c280c',
    systemLabel: 'Escritura cuneiforme y base 60',
  },
  egipto: {
    id: 'egipto',
    name: 'Egipto',
    shortName: 'Egipto',
    accentHex: '#b45309',
    softBgHex: '#fef8eb',
    borderHex: '#dfb878',
    textHex: '#78350f',
    systemLabel: 'Jeroglíficos decimales aditivos',
  },
  america: {
    id: 'america',
    name: 'América',
    shortName: 'América',
    accentHex: '#1f5c4a',
    softBgHex: '#eef6f2',
    borderHex: '#8ab8a8',
    textHex: '#154235',
    systemLabel: 'Sistema vigesimal maya (base 20)',
  },
  india: {
    id: 'india',
    name: 'India',
    shortName: 'India',
    accentHex: '#1e3a5f',
    softBgHex: '#eef3f9',
    borderHex: '#8ea8c9',
    textHex: '#162c49',
    systemLabel: 'Sistema posicional decimal y el cero',
  },
  arabia: {
    id: 'arabia',
    name: 'Arabia',
    shortName: 'Arabia',
    accentHex: '#991b1b',
    softBgHex: '#fcf0ef',
    borderHex: '#d49494',
    textHex: '#781414',
    systemLabel: 'Al-Jabr (álgebra) y transmisión decimal',
  },
};

export const BOARD_TILES: TileData[] = [
  // 1 — INICIO
  {
    id: 1,
    category: 'start',
    title: 'Campamento Base',
    missionSummary: 'Inicio del recorrido por cinco culturas matemáticas',
    targetValue: 0,
    targetDisplay: 'Inicio',
    historicalContext:
      'Los equipos Sol y Luna inician su recorrido por cinco grandes tradiciones del pensamiento matemático: Mesopotamia, Egipto, América, India y Arabia.',
    quickRule:
      'En cada turno lanza el dado para avanzar en orden del 1 al 32. Alternarás retos de matemáticas con preguntas de historia, y el juego verificará automáticamente tus respuestas para otorgarte cada sello.',
    exampleText: 'Haz clic en "Lanzar dado" o selecciona cualquier casilla numerada del tablero.',
    sageHint: 'Revisa siempre la explicación guiada y el ejemplo sencillo antes de responder.',
    gridPos: { row: 1, col: 1 },
  },

  // 2–7 — MESOPOTAMIA (Mat, Hist, Mat, Hist, Mat, Hist)
  {
    id: 2,
    category: 'mesopotamia',
    challengeMode: 'math',
    title: 'Tablilla de Arcilla',
    missionSummary: 'Representa el número 14 con cuñas y clavos',
    targetValue: 14,
    targetDisplay: '14',
    historicalContext:
      'En las ciudades de Sumeria y Babilonia, los escribas presionaban un punzón de caña sobre arcilla húmeda para registrar intercambios de cebada, ovejas y herramientas.',
    quickRule:
      'Cada cuña horizontal (◄) vale 10 y cada clavo vertical (▼) vale 1. Solo suma los valores de las piezas que coloques en la tablilla.',
    exampleText: 'Para formar 12: coloca 1 cuña (10) + 2 clavos (2) = 12.',
    sageHint: 'Piensa en 14 como una decena (10) más cuatro unidades (4).',
    mathExplanation: '14 se forma con 1 cuña de 10 y 4 clavos de 1 (10 + 4 = 14).',
    useBase60: false,
    gridPos: { row: 1, col: 2 },
  },
  {
    id: 3,
    category: 'mesopotamia',
    challengeMode: 'history',
    title: 'Escritura Cuneiforme',
    missionSummary: '¿Cómo registraban sus cuentas los escribas mesopotámicos?',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'A diferencia de Egipto o Grecia, en la región entre los ríos Tigris y Éufrates abundaba el barro fino pero escaseaban la piedra tallada y el papiro.',
    quickRule:
      'Lee con atención la relación entre el entorno geográfico de Mesopotamia y el material que usaban para escribir números.',
    exampleText: 'Observa que el término "cuneiforme" viene de "cuña", por la forma que dejaba el punzón.',
    sageHint: 'Recuerda el recurso natural más abundante a orillas del Tigris y el Éufrates.',
    historyQuestion: {
      prompt: '¿Sobre qué material y con qué instrumento grababan sus números los escribas de Mesopotamia?',
      options: [
        'Sobre tablillas de arcilla húmeda usando un punzón de caña en forma de cuña',
        'Sobre rollos de papiro usando tinta negra y pincel de junco',
        'Sobre cuerdas de algodón haciendo nudos de colores',
      ],
      correctIndex: 0,
      explanation:
        'Los escribas mesopotámicos usaban tablillas de arcilla fresca y un estilete de caña que dejaba marcas en forma de cuña (escritura cuneiforme), las cuales se secaban al sol para conservar los registros.',
    },
    gridPos: { row: 1, col: 3 },
  },
  {
    id: 4,
    category: 'mesopotamia',
    challengeMode: 'math',
    title: 'Inventario de Grano',
    missionSummary: 'Representa el número 27 en la tablilla cuneiforme',
    targetValue: 27,
    targetDisplay: '27',
    historicalContext:
      'Los almacenes de los templos mesopotámicos llevaban cuentas diarias de sacos de grano repartidos entre panaderos, artesanos y agricultores.',
    quickRule:
      'Separa el número en decenas y unidades: cada grupo de 10 es una cuña (+10) y cada unidad sobrante es un clavo (+1).',
    exampleText: 'Para formar 23: coloca 2 cuñas (+10 +10 = 20) y 3 clavos (+3) = 23.',
    sageHint: '¿Cuántas veces cabe el 10 en el 27 y cuántas unidades quedan sueltas?',
    mathExplanation: '27 se compone de 2 cuñas de 10 (20) más 7 clavos de 1 (20 + 7 = 27).',
    useBase60: false,
    gridPos: { row: 1, col: 4 },
  },
  {
    id: 5,
    category: 'mesopotamia',
    challengeMode: 'history',
    title: 'Herencia del 60',
    missionSummary: 'Identifica la huella actual de la base 60 mesopotámica',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'Los matemáticos babilonios eligieron el 60 como base principal porque se puede dividir exactamente entre muchos números (2, 3, 4, 5, 6, 10, 12, 15, 20 y 30).',
    quickRule:
      'Aunque hoy usamos base 10 para el dinero y las medidas métricas, seguimos usando la base 60 de Mesopotamia en nuestra vida diaria.',
    exampleText: 'Piensa en cómo divides el tiempo en tu reloj o los ángulos en geometría.',
    sageHint: '¿En qué unidad cotidiana cada bloque completo equivale exactamente a 60 partes?',
    historyQuestion: {
      prompt: '¿En qué ámbito seguimos usando hoy el sistema sexagesimal (base 60) heredado de Mesopotamia?',
      options: [
        'En la medición del tiempo (60 segundos, 60 minutos) y en los grados de una circunferencia (360°)',
        'En el conteo de billetes y monedas de uso cotidiano',
        'En la numeración de páginas y capítulos de los libros',
      ],
      correctIndex: 0,
      explanation:
        'Cada hora tiene 60 minutos, cada minuto 60 segundos y un círculo completo tiene 360° (6 × 60), una herencia directa de la astronomía y matemática babilónica.',
    },
    gridPos: { row: 1, col: 5 },
  },
  {
    id: 6,
    category: 'mesopotamia',
    challengeMode: 'math',
    title: 'Tiempo en Base 60',
    missionSummary: 'Construye 75 usando grupos de 60 y unidades',
    targetValue: 75,
    targetDisplay: '75 (1×60 + 15)',
    historicalContext:
      'Al medir intervalos astronómicos o jornadas de trabajo, los babilonios agrupaban de 60 en 60, tal como hoy convertimos 75 minutos en 1 hora y 15 minutos.',
    quickRule:
      'En el nivel superior cada pieza vale 60. En el nivel inferior cada pieza vale 1. Busca cuántos grupos completos de 60 caben en 75 y pon el resto abajo.',
    exampleText: 'Para formar 65: pon 1 grupo de 60 arriba (= 60) y 5 unidades abajo (= 60 + 5 = 65).',
    sageHint: '75 equivale a 1 hora (60) más 15 minutos sueltos.',
    mathExplanation: '75 = (1 × 60) + 15. Un grupo de 60 en la posición superior y 15 (1 cuña + 5 clavos) en la inferior.',
    useBase60: true,
    gridPos: { row: 1, col: 6 },
  },
  {
    id: 7,
    category: 'mesopotamia',
    challengeMode: 'history',
    title: 'Agrimensura Fluvial',
    missionSummary: '¿Por qué necesitaban geometría y cálculo en Mesopotamia?',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'Las lluvias estacionales hacían crecer los ríos Tigris y Éufrates, modificando canales de riego y límites de parcelas agrícolas.',
    quickRule:
      'Relaciona el desarrollo de áreas, volúmenes y tablas de cálculo con las necesidades prácticas de una sociedad agrícola y urbana.',
    exampleText: 'Antes de existir libros escolares, las tablillas mostraban problemas resueltos de canales y terrenos.',
    sageHint: 'Piensa en la agricultura, el riego y la construcción de obras públicas.',
    historyQuestion: {
      prompt: '¿Cuál fue uno de los principales motivos prácticos que impulsó la geometría y el cálculo en Mesopotamia?',
      options: [
        'Medir parcelas agrícolas, diseñar canales de riego y calcular el volumen de ladrillos para obras',
        'Fabricar relojes digitales de pulsera para los viajeros',
        'Calcular tarifas aéreas y rutas marítimas transoceánicas',
      ],
      correctIndex: 0,
      explanation:
        'Las tablillas babilónicas contienen ejercicios prácticos para trazar canales de riego, repartir terrenos tras inundaciones y estimar materiales de construcción.',
    },
    gridPos: { row: 1, col: 7 },
  },

  // 8–13 — EGIPTO (Mat, Hist, Mat, Hist, Mat, Hist)
  {
    id: 8,
    category: 'egipto',
    challengeMode: 'math',
    title: 'Símbolos del Nilo',
    missionSummary: 'Forma 24 con jeroglíficos egipcios',
    targetValue: 24,
    targetDisplay: '24',
    historicalContext:
      'En los muros de templos y papiros administrativos, los egipcios escribían números agrupando símbolos que representaban potencias de 10.',
    quickRule:
      'El sistema egipcio es decimal y aditivo: cada Asa/Talón vale 10 y cada Trazo vertical vale 1. Solo suma las piezas que coloques.',
    exampleText: 'Para formar 13: coloca 1 Asa (10) + 3 Trazos (1+1+1) = 13.',
    sageHint: 'Necesitas 2 decenas (Asas de 10) y 4 unidades (Trazos de 1).',
    mathExplanation: '24 se construye con 2 Asas de 10 (20) y 4 Trazos de 1 (20 + 4 = 24).',
    gridPos: { row: 1, col: 8 },
  },
  {
    id: 9,
    category: 'egipto',
    challengeMode: 'history',
    title: 'Sistema Aditivo',
    missionSummary: '¿Cómo funcionaba la numeración jeroglífica egipcia?',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'Observa la tabla de jeroglíficos egipcios arriba: cada símbolo (1, 10, 100, 1,000) tiene un dibujo propio y fijo.',
    quickRule:
      'En un sistema aditivo, el valor de cada símbolo no cambia por el lugar donde esté escrito: simplemente se suman todos los símbolos dibujados.',
    exampleText: 'Si dibujas dos cuerdas (100 + 100) y un trazo (1), siempre vale 201 sin importar el orden.',
    sageHint: '¿Necesitaban un símbolo para el cero si cada potencia de 10 tenía su propio dibujo?',
    historyQuestion: {
      prompt: '¿Qué caracteriza al sistema de jeroglíficos numéricos de Egipto?',
      options: [
        'Es aditivo: cada símbolo tiene un valor fijo (1, 10, 100, 1,000) y se suman al repetirse',
        'Usa únicamente los dígitos 0 y 1 en sistema binario',
        'Cambia el valor del trazo vertical según la columna donde se coloque',
      ],
      correctIndex: 0,
      explanation:
        'El sistema egipcio era decimal aditivo: cada potencia de 10 tenía un jeroglífico distinto y bastaba repetir cada símbolo hasta 9 veces para sumar su valor total.',
    },
    gridPos: { row: 1, col: 9 },
  },
  {
    id: 10,
    category: 'egipto',
    challengeMode: 'math',
    title: 'Graneros de Menfis',
    missionSummary: 'Forma 132 con jeroglíficos egipcios',
    targetValue: 132,
    targetDisplay: '132',
    historicalContext:
      'Los inspectores egipcios registraban las cosechas de trigo almacenadas en los graneros reales dibujando cuerdas enrolladas para las centenas y asas para las decenas.',
    quickRule:
      'Descompón 132 en centenas (100), decenas (10) y unidades (1): 1 Cuerda enrollada + 3 Asas + 2 Trazos.',
    exampleText: 'Para formar 114: 1 Cuerda (100) + 1 Asa (10) + 4 Trazos (4) = 114.',
    sageHint: 'Empieza agregando 1 Cuerda enrollada de 100, luego las decenas y al final las unidades.',
    mathExplanation: '132 = 1×100 (Cuerda enrollada) + 3×10 (Asas) + 2×1 (Trazos).',
    gridPos: { row: 1, col: 10 },
  },
  {
    id: 11,
    category: 'egipto',
    challengeMode: 'history',
    title: 'El Papiro Rhind',
    missionSummary: 'Descubre para qué servía el papiro matemático más famoso',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'Hacia el año 1650 a. C., el escriba Ahmes copió el Papiro Rhind con más de 80 problemas resueltos paso a paso para enseñar a futuros funcionarios.',
    quickRule:
      'Los problemas egipcios estaban pensados para situaciones reales: repartir panes y cerveza, calcular raciones y medir volúmenes de graneros.',
    exampleText: 'Por ejemplo, explicaba cómo repartir 5 hogazas entre 4 trabajadores en partes iguales.',
    sageHint: 'El Papiro Rhind era un manual práctico para escribas y administradores.',
    historyQuestion: {
      prompt: '¿Qué tipo de contenido reúne el célebre Papiro Matemático Rhind?',
      options: [
        'Un manual con más de 80 problemas prácticos resueltos sobre repartos, fracciones y áreas',
        'Un libro de poesías religiosas sin ningún cálculo numérico',
        'Un mapa astronómico para navegar por el océano Atlántico',
      ],
      correctIndex: 0,
      explanation:
        'Copiado por el escriba Ahmes, el Papiro Rhind enseñaba a resolver repartos proporcionales, fracciones unitarias y cálculos de áreas y volúmenes en la vida cotidiana.',
    },
    gridPos: { row: 1, col: 11 },
  },
  {
    id: 12,
    category: 'egipto',
    challengeMode: 'math',
    title: 'Tributo de Loto',
    missionSummary: 'Forma 1,210 con jeroglíficos egipcios',
    targetValue: 1210,
    targetDisplay: '1,210',
    historicalContext:
      'Cuando las cifras alcanzaban los millares —como contar ladrillos, ganado o soldados—, los escribas dibujaban la flor de loto (1,000), abundante en las orillas del Nilo.',
    quickRule:
      'Combina la Flor de loto (1,000), la Cuerda enrollada (100) y el Asa (10). Si no hay unidades sueltas, simplemente no agregas trazos.',
    exampleText: 'Para formar 1,120: 1 Flor de loto (1,000) + 1 Cuerda (100) + 2 Asas (20) = 1,120.',
    sageHint: 'Necesitas 1 Flor de loto (1,000), 2 Cuerdas (200) y 1 Asa (10).',
    mathExplanation: '1,210 = 1×1,000 (Flor de loto) + 2×100 (Cuerdas enrolladas) + 1×10 (Asa).',
    gridPos: { row: 1, col: 12 },
  },
  {
    id: 13,
    category: 'egipto',
    challengeMode: 'history',
    title: 'Tensadores de Cuerda',
    missionSummary: '¿Cómo trazaban ángulos rectos después de cada crecida del Nilo?',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'Cada año, la inundación del río Nilo borraba los límites entre parcelas agrícolas. Al bajar el agua, los agrimensores debían volver a trazar terrenos rectangulares.',
    quickRule:
      'Con una cuerda dividida por 12 nudos iguales se puede formar un triángulo de lados 3, 4 y 5, cuyo ángulo mayor es exactamente de 90°.',
    exampleText: 'Como 3² + 4² = 5² (9 + 16 = 25), ese triángulo siempre forma una esquina cuadrada perfecta.',
    sageHint: 'Piensa en la herramienta sencilla de nudos igualmente espaciados que tensaban entre tres personas.',
    historyQuestion: {
      prompt: '¿Qué herramienta usaban los agrimensores egipcios ("tensadores de cuerda") para trazar esquinas rectas de 90°?',
      options: [
        'Una cuerda cerrada con 12 nudos a igual distancia para formar un triángulo de lados 3, 4 y 5',
        'Un láser óptico de medición satelital',
        'Un reloj de arena y una brújula magnética',
      ],
      correctIndex: 0,
      explanation:
        'Al tensar una cuerda con 12 nudos en tramos de 3, 4 y 5 unidades se obtiene un triángulo rectángulo exacto, técnica práctica usada siglos antes de Pitágoras.',
    },
    gridPos: { row: 2, col: 12 },
  },

  // 14–19 — AMÉRICA (Mat, Hist, Mat, Hist, Mat, Hist)
  {
    id: 14,
    category: 'america',
    challengeMode: 'math',
    title: 'Trueque de Cacao',
    missionSummary: 'Arma el número 25 en el tablero vigesimal maya',
    targetValue: 25,
    targetDisplay: '25',
    historicalContext:
      'En los mercados de Mesoamérica, los granos de cacao servían como moneda cotidiana y los comerciantes agrupaban las cargas en veintenas.',
    quickRule:
      'El sistema maya es posicional de base 20: cada punto (●) vale 1 y cada barra (▬) vale 5. Lo que pongas en el Nivel Superior se multiplica por 20, y el Nivel Base por 1.',
    exampleText: 'Para formar 21: pon 1 punto arriba (1×20 = 20) y 1 punto abajo (1×1 = 1) → Total 21.',
    sageHint: 'Separa 25 en un grupo de 20 (arriba) más 5 unidades (una barra abajo).',
    mathExplanation: '25 = (1 × 20) + (5 × 1). Un punto en el Nivel Superior y una barra en el Nivel Base.',
    gridPos: { row: 3, col: 12 },
  },
  {
    id: 15,
    category: 'america',
    challengeMode: 'history',
    title: 'El Cero en Concha',
    missionSummary: '¿Para qué inventaron los mayas el glifo de la concha?',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'A diferencia de sistemas puramente aditivos, un sistema posicional necesita indicar cuando una posición está vacía para no confundir los valores.',
    quickRule:
      'Sin el cero posicional no podríamos distinguir entre 2 (2 unidades) y 40 (2 veintenas y 0 unidades).',
    exampleText: 'En nuestro sistema decimal pasa lo mismo: el 0 distingue el número 2 del número 20.',
    sageHint: 'Recuerda qué pasa en el Nivel Base cuando un número es múltiplo exacto de 20.',
    historyQuestion: {
      prompt: '¿Qué función cumplía el símbolo de la concha o caracol en la numeración maya?',
      options: [
        'Representar el cero posicional para indicar que un nivel de veintenas estaba vacío',
        'Multiplicar por 100 cualquier cantidad escrita debajo',
        'Indicar que una suma había salido incorrecta',
      ],
      correctIndex: 0,
      explanation:
        'Las culturas mesoamericanas fueron pioneras en usar un signo específico (la concha) para el cero posicional, indispensable para distinguir 2 de 40 o de 400.',
    },
    gridPos: { row: 4, col: 12 },
  },
  {
    id: 16,
    category: 'america',
    challengeMode: 'math',
    title: 'Cuenta de Jade',
    missionSummary: 'Arma el número 43 en el tablero vigesimal maya',
    targetValue: 43,
    targetDisplay: '43',
    historicalContext:
      'Los escribas mayas llevaban el conteo de cuentas de jade verde y plumas de quetzal entregadas en ceremonias comunitarias.',
    quickRule:
      'Cada punto en el Nivel Superior vale 20. Dos puntos arriba valen 40; luego agrega en el Nivel Base las unidades que falten.',
    exampleText: 'Para formar 45: coloca 2 puntos arriba (2×20 = 40) y 1 barra abajo (5) → Total 45.',
    sageHint: '2 puntos arriba suman 40; ¿cuántos puntos faltan abajo para completar 43?',
    mathExplanation: '43 = (2 × 20) + 3. Dos puntos en el Nivel Superior (40) y tres puntos en el Nivel Base (3).',
    gridPos: { row: 5, col: 12 },
  },
  {
    id: 17,
    category: 'america',
    challengeMode: 'history',
    title: 'Calendario Tzolk’in',
    missionSummary: '¿Cómo vinculaban los mayas las matemáticas con el cielo?',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'Desde observatorios como El Caracol en Chichén Itzá, los astrónomos seguían ciclos solares, lunares y de Venus con precisión notable.',
    quickRule:
      'El conocimiento matemático en América permitía predecir estaciones de lluvia, siembras y ciclos ceremoniales a largo plazo.',
    exampleText: 'El calendario ritual Tzolk’in duraba 260 días (13 números × 20 signos) y se combinaba con el año solar de 365 días.',
    sageHint: 'Piensa en la combinación entre astronomía, agricultura y registro del tiempo.',
    historyQuestion: {
      prompt: '¿Para qué aplicaban principalmente los mayas sus cálculos vigesimales y tablas numéricas?',
      options: [
        'Para medir ciclos astronómicos y calendarios agrícolas y rituales como el Tzolk’in de 260 días',
        'Para calcular intereses bancarios con tarjetas de crédito',
        'Para programar máquinas de vapor industriales',
      ],
      correctIndex: 0,
      explanation:
        'Las tablas vigesimales de los códices mayas registraban ciclos solares, lunares y calendáricos esenciales para la agricultura y la vida ceremonial.',
    },
    gridPos: { row: 6, col: 12 },
  },
  {
    id: 18,
    category: 'america',
    challengeMode: 'math',
    title: 'Cosecha de Maíz',
    missionSummary: 'Arma el número 60 usando el cero maya en la base',
    targetValue: 60,
    targetDisplay: '60',
    historicalContext:
      'Al contabilizar reservas anuales de maíz en veintenas exactas, el Nivel Base quedaba en cero y se mostraba el glifo de la concha.',
    quickRule:
      'Busca cuántos grupos exactos de 20 forman 60 y deja el Nivel Base en 0 (concha).',
    exampleText: 'Para formar 40: coloca 2 puntos arriba (2×20 = 40) y deja la base en 0 (concha).',
    sageHint: '3 × 20 = 60. Coloca 3 puntos arriba y deja vacío (concha = 0) el Nivel Base.',
    mathExplanation: '60 = (3 × 20) + 0. Tres puntos en el Nivel Superior y la concha (0) en el Nivel Base.',
    gridPos: { row: 6, col: 11 },
  },
  {
    id: 19,
    category: 'america',
    challengeMode: 'history',
    title: 'Los Quipus Andinos',
    missionSummary: 'Conoce cómo registraban números en los Andes de América del Sur',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'En Sudamérica, el Imperio inca administraba caminos, almacenes y censos de millones de habitantes a lo largo de la cordillera de los Andes sin escritura alfabética.',
    quickRule:
      'Los quipucamayocs utilizaban cordeles colgantes de lana o algodón donde cada altura del nudo representaba unidades, decenas, centenas o millares en base 10.',
    exampleText: 'La ausencia de nudo en una posición de la cuerda indicaba el cero en esa cifra.',
    sageHint: '¿Qué dispositivo textil portátil permitía guardar censos e inventarios numéricos?',
    historyQuestion: {
      prompt: '¿Qué era el "quipu" utilizado en la región andina de América?',
      options: [
        'Un sistema de cuerdas anudadas en base decimal para registrar censos, cosechas y tributos',
        'Una moneda de oro acuñada con rostro de emperador',
        'Un reloj solar tallado en madera flotante',
      ],
      correctIndex: 0,
      explanation:
        'El quipu empleaba cuerdas de colores y nudos ubicados por niveles decimales (unidades, decenas, centenas) para almacenar información numérica precisa.',
    },
    gridPos: { row: 6, col: 10 },
  },

  // 20 — ESPECIAL: PUENTE DEL TIEMPO
  {
    id: 20,
    category: 'special',
    specialKind: 'puente',
    title: 'Puente del Tiempo',
    missionSummary: 'Avanza 2 casillas automáticamente hacia India',
    targetValue: 0,
    targetDisplay: '+2 casillas',
    historicalContext:
      'Las rutas marítimas y caravanas antiguas conectaron los saberes matemáticos entre los continentes, acelerando el viaje del conocimiento.',
    quickRule:
      'Al caer en el Puente del Tiempo tu ficha avanza 2 casillas adicionales hacia adelante (de la casilla 20 a la 22) y abre de inmediato ese reto.',
    exampleText: 'Haz clic en el botón inferior para avanzar a la casilla 22.',
    sageHint: 'Aprovecha este impulso directo hacia los retos de la India.',
    gridPos: { row: 6, col: 9 },
  },

  // 21–26 — INDIA (Mat, Hist, Mat, Hist, Mat, Hist)
  {
    id: 21,
    category: 'india',
    challengeMode: 'math',
    title: 'El Lugar del Cero',
    missionSummary: 'Forma el número 205 en el tablero posicional decimal',
    targetValue: 205,
    targetDisplay: '205',
    historicalContext:
      'Los matemáticos de la India perfeccionaron el sistema posicional de base 10 con nueve cifras más el cero, permitiendo escribir cualquier número sin importar su tamaño.',
    quickRule:
      'Cada columna multiplica su dígito por 100, 10 o 1. Cuando no hay decenas, se escribe 0 en esa columna para que el 2 siga valiendo 200 y no 20.',
    exampleText: 'Para formar 104: coloca 1 en Centenas (100), 0 en Decenas (0) y 4 en Unidades (4).',
    sageHint: 'Coloca 2 en Centenas, deja 0 en Decenas y pon 5 en Unidades.',
    mathExplanation: '205 = 2×100 + 0×10 + 5×1. El 0 mantiene el lugar de las decenas vacías.',
    gridPos: { row: 6, col: 8 },
  },
  {
    id: 22,
    category: 'india',
    challengeMode: 'history',
    title: 'Brahmagupta y Shunya',
    missionSummary: '¿Qué aporte fundamental hizo India al concepto del cero?',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'En el siglo VII d. C., el astrónomo y matemático indio Brahmagupta llamó al cero "shunya" (vacío) y escribió por primera vez reglas claras para operar con él.',
    quickRule:
      'India no solo usó el cero como marcador de espacio vacío, sino que lo trató como un número con propiedades propias (por ejemplo, cualquier número más cero sigue siendo el mismo número).',
    exampleText: 'Gracias a Brahmagupta hoy escribimos con naturalidad operaciones como 8 + 0 = 8 o 8 − 8 = 0.',
    sageHint: 'Piensa en el paso de "espacio vacío" a "número con reglas aritméticas".',
    historyQuestion: {
      prompt: '¿Por qué es tan importante el aporte de Brahmagupta y la matemática de la India respecto al cero?',
      options: [
        'Porque formalizaron el cero como un número completo y definieron reglas para sumar y restar con él',
        'Porque prohibieron usar el cero en cualquier operación escrita',
        'Porque inventaron los números romanos con letras mayúsculas',
      ],
      correctIndex: 0,
      explanation:
        'En India, el cero ("shunya") pasó de ser solo un marcador de hueco vacío a convertirse en un número verdadero dentro del sistema posicional decimal.',
    },
    gridPos: { row: 6, col: 7 },
  },
  {
    id: 23,
    category: 'india',
    challengeMode: 'math',
    title: 'Cálculo Escrito',
    missionSummary: 'Forma el número 340 en el tablero posicional decimal',
    targetValue: 340,
    targetDisplay: '340',
    historicalContext:
      'Con los diez símbolos indoarábigos (0 al 9), los comerciantes de la India realizaban sumas y multiplicaciones rápidas sobre tablillas cubiertas de polvo fino.',
    quickRule:
      'Separa 340 en sus tres valores posicionales: Centenas (×100), Decenas (×10) y Unidades (×1).',
    exampleText: 'Para formar 250: 2 en Centenas (200) + 5 en Decenas (50) + 0 en Unidades (0).',
    sageHint: '3 en Centenas, 4 en Decenas y 0 en Unidades.',
    mathExplanation: '340 = 3×100 + 4×10 + 0×1 = 300 + 40 + 0.',
    gridPos: { row: 6, col: 6 },
  },
  {
    id: 24,
    category: 'india',
    challengeMode: 'history',
    title: 'Los Diez Dígitos',
    missionSummary: '¿Por qué triunfaron los numerales indoarábigos (0 al 9)?',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'Antes de generalizarse los dígitos 0 al 9, sumar o multiplicar cantidades grandes en sistemas sin valor posicional requería ábacos físicos y resultaba lento por escrito.',
    quickRule:
      'Un sistema posicional decimal usa solo 10 signos para representar infinitos números y permite alinear columnas para calcular rápido.',
    exampleText: 'Comparar 348 + 125 en columnas es mucho más rápido que sumar CCCXLVIII + CXXV.',
    sageHint: 'Piensa en cuántos símbolos distintos se necesitan y qué tan fácil es operar en papel.',
    historyQuestion: {
      prompt: '¿Qué ventaja decisiva ofreció el sistema decimal posicional nacido en la India?',
      options: [
        'Con solo diez símbolos (0 al 9) permite escribir cualquier número y operar fácilmente por columnas',
        'Necesita cientos de dibujos diferentes para cada número mayor a 1,000',
        'Solo sirve para contar objetos menores que 20',
      ],
      correctIndex: 0,
      explanation:
        'Al combinar valor posicional en base 10 con el cero, bastan diez dígitos (0–9) para representar cualquier cantidad y efectuar operaciones aritméticas en papel.',
    },
    gridPos: { row: 6, col: 5 },
  },
  {
    id: 25,
    category: 'india',
    challengeMode: 'math',
    title: 'Notación Desarrollada',
    missionSummary: 'Forma el número 478 en el tablero posicional decimal',
    targetValue: 478,
    targetDisplay: '478',
    historicalContext:
      'Descomponer un número en centenas, decenas y unidades muestra el significado exacto de cada dígito según el lugar que ocupa.',
    quickRule:
      'El primer dígito de la izquierda indica cuántas centenas (×100) hay; el del centro cuántas decenas (×10); y el de la derecha cuántas unidades (×1).',
    exampleText: '365 significa 300 + 60 + 5 (3 Centenas, 6 Decenas, 5 Unidades).',
    sageHint: 'Ajusta 4 en Centenas, 7 en Decenas y 8 en Unidades.',
    mathExplanation: '478 = 4×100 + 7×10 + 8×1 = 400 + 70 + 8.',
    gridPos: { row: 6, col: 4 },
  },
  {
    id: 26,
    category: 'india',
    challengeMode: 'history',
    title: 'Sabios de India',
    missionSummary: 'Conoce las investigaciones de Aryabhata en astronomía y cálculo',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'En el año 499 d. C., con apenas 23 años, el matemático indio Aryabhata escribió el Aryabhatiya, resumiendo cálculos de áreas, raíces y movimientos planetarios.',
    quickRule:
      'Los avances matemáticos de la India incluyeron tanto la aritmética decimal como la geometría de círculos y la trigonometría temprana.',
    exampleText: 'Aryabhata estimó π ≈ 3.1416 y explicó científicamente que los eclipses se deben a las sombras de la Tierra y la Luna.',
    sageHint: 'Relaciona los cálculos matemáticos con la astronomía y la medición de circunferencias.',
    historyQuestion: {
      prompt: '¿Qué logró calcular con notable precisión el matemático indio Aryabhata en el siglo V?',
      options: [
        'Una aproximación muy exacta de Pi (3.1416) y cálculos astronómicos sobre eclipses y rotaciones',
        'La fórmula química del plástico sintético',
        'La velocidad de los trenes de alta velocidad',
      ],
      correctIndex: 0,
      explanation:
        'Aryabhata calculó π con cuatro decimales exactos (3.1416), elaboró tablas tempranas de seno trigonométrico y explicó los eclipses mediante geometría.',
    },
    gridPos: { row: 6, col: 3 },
  },

  // 27–32 — ARABIA (Mat, Hist, Mat, Hist, Mat, Hist)
  {
    id: 27,
    category: 'arabia',
    challengeMode: 'math',
    title: 'Balanza de Al-Jabr',
    missionSummary: 'Encuentra el valor de x para equilibrar: x + 4 = 11',
    targetValue: 7,
    targetDisplay: 'x = 7',
    historicalContext:
      'En Bagdad, el matemático Al-Juarismi enseñó a resolver problemas cotidianos de herencias y comercio planteando igualdades equilibradas como una balanza.',
    quickRule:
      'Una ecuación funciona como una balanza: ambos platos deben pesar lo mismo. Si ya tienes 4 en el plato izquierdo, busca cuánto vale x para llegar a 11.',
    exampleText: 'En x + 3 = 8, probamos cuánto le falta a 3 para llegar a 8: x = 5 porque 5 + 3 = 8.',
    sageHint: 'Pregúntate: ¿qué número sumado con 4 da como resultado 11?',
    mathExplanation: 'Al probar x = 7, el lado izquierdo vale 7 + 4 = 11, equilibrando exactamente al 11 del lado derecho.',
    alJabrEquation: {
      equationDisplay: 'x + 4 = 11',
      leftKnown: 4,
      rightTotal: 11,
      coefficient: 1,
    },
    gridPos: { row: 6, col: 2 },
  },
  {
    id: 28,
    category: 'arabia',
    challengeMode: 'history',
    title: 'Casa de la Sabiduría',
    missionSummary: '¿Qué papel jugó la Casa de la Sabiduría de Bagdad?',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'Entre los siglos IX y XI, el mundo árabe vivió una Edad de Oro científica en ciudades como Bagdad, El Cairo y Córdoba.',
    quickRule:
      'La Casa de la Sabiduría reunió a traductores y científicos de distintas culturas que conservaron textos griegos e indios y crearon nuevas ramas de la ciencia.',
    exampleText: 'Allí se tradujeron obras de Euclides y tratados astronómicos de la India al idioma árabe.',
    sageHint: 'Piensa en una gran biblioteca, centro de traducción e investigación científica internacional.',
    historyQuestion: {
      prompt: '¿Qué fue la Casa de la Sabiduría (Bayt al-Hikma) fundada en Bagdad?',
      options: [
        'Un gran centro de traducción, biblioteca e investigación donde convivieron sabios de diversas culturas',
        'Una fortaleza militar exclusiva para guardar armaduras',
        'Un teatro al aire libre para comedias romanas',
      ],
      correctIndex: 0,
      explanation:
        'La Casa de la Sabiduría reunió manuscritos de Grecia, Persia e India, impulsando enormes avances en álgebra, astronomía, óptica y medicina.',
    },
    gridPos: { row: 6, col: 1 },
  },
  {
    id: 29,
    category: 'arabia',
    challengeMode: 'math',
    title: 'Equilibrio Comercial',
    missionSummary: 'Encuentra el valor de x para equilibrar: x + 7 = 19',
    targetValue: 12,
    targetDisplay: 'x = 12',
    historicalContext:
      'Los mercaderes de las rutas caravaneras usaban métodos algebraicos sencillos para calcular cantidades faltantes de telas, especias o plata.',
    quickRule:
      'Para hallar el valor de x en x + 7 = 19, puedes restar mentalmente 19 − 7 o probar valores hasta igualar ambos platos.',
    exampleText: 'En x + 5 = 15, como 15 − 5 = 10, resulta x = 10.',
    sageHint: '¿Cuánto le falta a 7 para alcanzar 19?',
    mathExplanation: '12 + 7 = 19, por lo tanto x = 12 equilibra ambos lados de la balanza.',
    alJabrEquation: {
      equationDisplay: 'x + 7 = 19',
      leftKnown: 7,
      rightTotal: 19,
      coefficient: 1,
    },
    gridPos: { row: 5, col: 1 },
  },
  {
    id: 30,
    category: 'arabia',
    challengeMode: 'history',
    title: 'El Legado de Al-Juarismi',
    missionSummary: '¿Qué dos palabras matemáticas nacen de la obra de Al-Juarismi?',
    targetValue: 0,
    targetDisplay: 'Historia',
    historicalContext:
      'El libro más influyente de Muhammad ibn Musa al-Juarismi explicaba paso a paso cómo resolver ecuaciones por restauración ("al-jabr") y reducción.',
    quickRule:
      'Al traducirse sus libros al latín, el término "al-jabr" pasó a ser "álgebra", y el nombre latinizado "Al-Khwarizmi" dio origen a "algoritmo".',
    exampleText: 'Hoy llamamos algoritmo a cualquier serie ordenada de pasos para resolver un problema.',
    sageHint: 'Relaciona "al-jabr" y el apellido del autor con términos que usas hoy en clase.',
    historyQuestion: {
      prompt: '¿Qué conceptos matemáticos actuales derivan directamente del tratado y del nombre de Al-Juarismi?',
      options: [
        '"Álgebra" (de al-jabr, restauración) y "algoritmo" (de la latinización de su nombre)',
        '"Triángulo" y "cuadrado"',
        '"Kilómetro" y "centímetro"',
      ],
      correctIndex: 0,
      explanation:
        'Su obra dio nombre al álgebra y su nombre propio (Algoritmi en latín) originó la palabra algoritmo para designar procedimientos ordenados paso a paso.',
    },
    gridPos: { row: 4, col: 1 },
  },
  {
    id: 31,
    category: 'arabia',
    challengeMode: 'math',
    title: 'Doble Medida',
    missionSummary: 'Encuentra el valor de x para equilibrar: 2x = 14',
    targetValue: 7,
    targetDisplay: 'x = 7',
    historicalContext:
      'Cuando dos paquetes idénticos de mercancía tienen el mismo peso desconocido x, el doble de x equivale al peso total del plato contrario.',
    quickRule:
      '2x significa "dos veces x" (x + x). Busca un número que sumado consigo mismo dé 14.',
    exampleText: 'En 2x = 10, como 2 × 5 = 10 (5 + 5 = 10), el valor es x = 5.',
    sageHint: 'Divide 14 entre 2 o busca qué número multiplicado por 2 da 14.',
    mathExplanation: '2 × 7 = 14 (7 + 7 = 14), por lo que x = 7 equilibra la balanza.',
    alJabrEquation: {
      equationDisplay: '2x = 14',
      leftKnown: 0,
      rightTotal: 14,
      coefficient: 2,
    },
    gridPos: { row: 3, col: 1 },
  },
  {
    id: 32,
    category: 'arabia',
    isFinal: true,
    challengeMode: 'history',
    title: 'Puente Global',
    missionSummary: 'Cierre de expedición: ¿cómo llegaron los números del 0 al 9 al mundo?',
    targetValue: 0,
    targetDisplay: 'Historia · Fin',
    historicalContext:
      'Al cierre de nuestro viaje por cinco culturas, los tratados árabes explicaron los numerales indios a estudiosos del Mediterráneo, entre ellos Fibonacci en el siglo XIII.',
    quickRule:
      'La historia de las matemáticas es una obra colectiva: lo que hoy escribimos con 10 cifras y ecuaciones nació del diálogo entre distintas civilizaciones.',
    exampleText: 'Por eso llamamos "números indoarábigos" a las cifras 0, 1, 2, 3, 4, 5, 6, 7, 8 y 9.',
    sageHint: 'Recuerda el puente cultural entre India, el mundo árabe y Europa.',
    historyQuestion: {
      prompt: '¿Por qué llamamos "numerales indoarábigos" al sistema que usamos actualmente en todo el mundo?',
      options: [
        'Porque nacieron en la India y fueron estudiados, perfeccionados y difundidos por sabios árabes hacia el Mediterráneo y Europa',
        'Porque fueron inventados al mismo tiempo en la Antártida y Oceanía',
        'Porque únicamente se usaron en monedas de plata romanas',
      ],
      correctIndex: 0,
      explanation:
        '¡Expedición completada! Los matemáticos indios crearon el sistema posicional con el cero y los estudiosos árabes lo difundieron, integrando un patrimonio universal.',
    },
    gridPos: { row: 2, col: 1 },
  },
];

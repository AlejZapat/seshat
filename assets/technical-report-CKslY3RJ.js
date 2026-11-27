var e=`---
title: "Monitoreo de hielo y tensión en la Zona I de la línea 2x500 kV Nueva Pan de Azúcar–Polpaico: qué mide el piloto VIGIA, qué detecta y qué decisión puede apoyar"
author: "Luis Alejandro Zapata"
date: "27-11-2026"
lang: es-CL
abstract: |
    El piloto VIGIA instaló en 2026 sensores en el cable de seis torres de la línea 2x500 kV Nueva Pan de Azúcar–Polpaico, para detectar las condiciones que causan fallas en el sector La Dormida. Este informe revisa su primer invierno: qué mide cada punto, con qué confiabilidad, qué episodios de carga detectó, si el modelo de amenaza meteorológica los anticipó y qué queda en pie del caso de negocio que lo justificó. La inclinación del cable resultó una señal de carga clara en las torres de la cresta: hubo cinco episodios en 2026, y el modelo marcó la tormenta de julio pero no el evento del 21 de julio. La tensión mecánica no se mide, las estaciones no registran precipitación y la interfaz de datos solo entrega las últimas 24 horas. El beneficio del caso de negocio no se puede verificar todavía; se proponen indicadores intermedios y lo que falta para que el sistema apoye una decisión.
toc: true
numbersections: true
header-includes:
  - \\usepackage{etoolbox}
  - \\AtBeginDocument{\\renewcommand{\\figurename}{Figura}}
  - \\AtBeginDocument{\\renewcommand{\\tablename}{Tabla}}
  - \\AtBeginDocument{\\gappto\\captionsspanish{\\renewcommand{\\tablename}{Tabla}}\\selectlanguage{spanish}}
  - \\usepackage{float}
  - \\floatplacement{figure}{H}
  - \\pretocmd{\\tableofcontents}{\\clearpage}{}{}
  - \\apptocmd{\\tableofcontents}{\\clearpage}{}{}
  - \\AtBeginDocument{\\setcounter{table}{-1}}
---

# Portada {-}

| Campo | Valor |
|------------------------|------------------------------------------------------------------------|
| Autor(es) | Luis Alejandro Zapata |
| Fecha | 27-11-2026 |
| Versión | 0.3 (borrador de trabajo) |
| Clasificación | Uso interno, confidencial: contiene datos de operación de la línea y del sistema de monitoreo |
| Normativa de referencia | Pliego RPTD N°17; CIGRE TB 179 |

# Resumen Ejecutivo

La línea 2x500 kV Nueva Pan de Azúcar–Polpaico cruza la cordillera de la Costa en el sector La Dormida, la Zona I del diseño, entre las torres 815 y 860. Ahí tuvo dos fallas con nieve: el 14 de julio de 2022 y el 16 de junio de 2025. Para anticipar esas condiciones, el caso de negocio W-0009 (octubre de 2025) propuso VIGIA, un piloto de vigilancia con sensores en seis puntos, y estimó un beneficio neto de 1,1 millones de USD en cinco años con una inversión de unos 400.000 USD. Los sensores entregan datos desde marzo de 2026.

Este informe revisa el primer invierno con los datos del propio sistema: 64.000 a 68.000 lecturas de 5 minutos por sensor, del 14 de marzo al 26 de noviembre de 2026. Las series están completas en 96,6 a 98 % desde el 14 de abril, cuando terminó la instalación. La inclinación del cable es una señal de carga clara en las torres de la cresta: sigue a la temperatura del conductor con una dispersión de 0,03° en las torres 825 y 821, y una regla simple (4 desviaciones sobre la normal, con el aire a 2 °C o menos y dos lecturas seguidas) encuentra cinco episodios de carga en 2026, todos en esas dos torres. El modelo de amenaza meteorológica, con el archivo del pronóstico, marcó la tormenta del 4 y 5 de julio desde hora y media antes de la primera carga, pero no el evento del 21 de julio. Dos de los seis puntos, las torres 803 y 892, están fuera de la Zona I y no tuvieron episodios.

El sistema no cumple todavía lo que prometió el caso de negocio. La tensión mecánica no se mide: la estima el proveedor. Las estaciones meteorológicas no registran precipitación y no tienen datos de ningún episodio. La interfaz de datos solo entrega las últimas 24 horas. Y el beneficio no se puede verificar con un invierno: depende de fallas que ocurren una vez cada cuatro años y que tuvieron causas previas. Se propone medirlo con indicadores intermedios (episodios detectados, anticipados y atendidos) y cerrar cuatro brechas: un recolector diario de datos, la precipitación medida, el método del proveedor para la tensión y un protocolo de acciones acordado con el centro de control y con mantenimiento.

# Introducción

## Antecedentes

La línea 2x500 kV Nueva Pan de Azúcar–Polpaico tiene 408 km y 899 estructuras. Entre las torres 815 y 860 cruza el sector La Dormida: 21,9 km de la Zona I del diseño, con 45 de sus 46 estructuras sobre 1.000 m de altitud y la más alta a 1.648 m. El sector no tiene acceso terrestre; se llega en helicóptero (W-0009, sección 2).

El 14 de julio de 2022, después de una nevada en la cresta, se cortaron subconductores de los dos circuitos; el circuito 1 se energizó a los 10 días y el circuito 2 a los 12 (W-0009, sección 2). El 16 de junio de 2025 se deformó la cruceta media de la torre 820. El caso de negocio da para esos eventos 1,85 y 0,55 millones de USD de reparación (W-0009, 5.2.1).

El documento W-0009, "Vigilancia Integrada para Gestión de Infraestructura y Ambiente", versión 0 de octubre de 2025, propone un sistema de monitoreo con sensores para detectar condiciones que podrían provocar fallas, con un piloto de seis puntos en la Zona I (W-0009, sección 3). Promete el monitoreo en tiempo real de variables ambientales y de la infraestructura, entre ellas la flecha y la tensión mecánica del cable, y la historia de los datos para análisis predictivo (W-0009, sección 4). El sistema instalado es del proveedor Siemens, con equipos Gridpulse: en cada punto, un sensor montado en el conductor, una estación meteorológica y una cámara.

El Pliego RPTD N°17 exige que la base de datos de los activos registre su condición y su desempeño (SEC, 2020, 5.21), y la auditoría técnica de la línea de 2026 recomienda establecer un monitoreo focalizado durante los períodos de mayor exigencia ambiental (Proingesa, 2026, INF-005, 6.1). La auditoría no menciona el piloto.

Este informe es el estudio técnico de la iniciativa en la aplicación del autor. Se complementa con el estudio del modelo de amenaza meteorológica de la misma línea (Zapata, 2026), que anticipa con el pronóstico del tiempo las condiciones que VIGIA mide cuando ya ocurren.

## Objetivos

Objetivo general: determinar qué mide VIGIA, qué detecta y qué decisión puede apoyar, y revisar su caso de negocio con la evidencia de su primer invierno.

Objetivos específicos:

1. Inventariar qué mide cada uno de los seis puntos, con qué resolución y con qué completitud desde el fin de la instalación.
2. Fijar una regla de detección de los episodios de carga a partir de la inclinación, medir su robustez y listar los episodios de 2026.
3. Contrastar cada episodio con el modelo de amenaza meteorológica: su estado durante el episodio y desde cuándo lo marcaba.
4. Clasificar cada supuesto del caso de negocio según la evidencia disponible y proponer indicadores para medir el beneficio.
5. Identificar las brechas que impiden que VIGIA apoye una decisión y proponer cómo cerrarlas.

## Alcance y limitaciones

- Período: del 14 de marzo al 26 de noviembre de 2026 para los sensores; del 14 de abril al 21 de julio para el contraste con el modelo, el período del archivo de pronósticos guardado.
- Datos: medias de 5 minutos exportadas de los paneles del proveedor, en consultas de solo lectura autorizadas por el autor. No se analizaron la tensión, la flecha ni el espesor de hielo que estima el proveedor, ni las fotos, salvo las del 21 de julio (Zapata, 2026, Anexo D).
- No incluye la capacidad dinámica de la línea, que es otra iniciativa, ni el diseño de las torres (Zapata, 2026, Anexo E).
- La carga en kilogramos por metro se cita donde ya fue calculada; no se calcula para los demás episodios.

# Estado del Arte

Las empresas de transmisión que vigilan el hielo combinan dos enfoques: medir la carga sobre la línea y pronosticar las condiciones que la producen (Zapata, 2026, Estado del Arte). La medición confirma el fenómeno cuando ya está sobre el conductor; el pronóstico da tiempo para prepararse, pero con incertidumbre.

En la práctica nórdica la carga se mide en forma directa. Statnett puso en servicio la línea Sima–Samnanger en diciembre de 2013 y poco después midió 69 kg/m de hielo, frente a 25 kg/m de diseño; en respuesta instaló un vano de monitoreo en paralelo a la línea (noviembre de 2014) y una celda de carga en uno de sus vanos (Adum et al., 2022). La medición sirvió para corregir el diseño.

En Islandia, Landsnet perdió 40 torres en una tormenta de diciembre de 2019, con un costo estimado de 40 millones de USD por la interrupción. Desde 2018 prueba estaciones montadas en el conductor, y usa sus avisos en tiempo real para priorizar y programar el despacho de cuadrillas y para enviarlas a retirar el hielo a tiempo (Bjarnason, 2025). Hydro-Québec, por su parte, opera la detección y el pronóstico del hielo para su red (Cazade, 2020). Para la medición en terreno, la guía de referencia es el folleto técnico 179 de CIGRE (2001).

Tres diferencias separan a VIGIA de esas experiencias. Primero, estima la carga desde la inclinación del cable, una medida indirecta que depende de la mecánica de cada vano, en lugar de medirla con una celda. Segundo, el fenómeno de La Dormida es la nieve húmeda en una cresta de 1.500 a 1.650 m, no el hielo de nube ni la lluvia engelante de las latitudes altas. Tercero, las fuentes publicadas describen usos concretos (cuándo despachar una cuadrilla, qué mantenimiento programar), pero ninguna de las consultadas cuantifica el ahorro.

# Metodología

## Enfoque y datos

El enfoque es analítico y con datos medidos. Las fuentes son estas:

| Fuente | Contenido | Uso |
|------------------------|------------------------------------------|------------------------|
| Historia de los paneles del proveedor | Seis sensores, del 14-03 al 26-11-2026: inclinación media y máxima, temperatura del conductor y del aire, humedad y lecturas por intervalo, en medias de 5 minutos | Objetivos 1 a 3 |
| Tablas de los paneles | Variables medidas, resultados de los algoritmos del proveedor, estaciones meteorológicas | Objetivos 1 y 5 |
| Documentación de la interfaz de datos del proveedor (versión 1.0, 05-05-2026) | Acceso, ventana de consulta y métricas | Objetivo 5 |
| Archivo de pronósticos del IFS (Open-Meteo) | Hora a hora, en la ubicación y la cota de las seis torres, del 14-03 al 21-07-2026 | Objetivo 3 |
| Planilla de estructuras de la línea | Zona, cota, tipo, vanos y tensiones de diseño | Objetivos 1 y 3 |
| W-0009, versión 0 | Caso de negocio | Objetivo 4 |

: Fuentes del estudio

El IFS es el modelo de pronóstico global del Centro Europeo de Previsiones Meteorológicas a Plazo Medio. Las horas de este informe son locales de invierno (UTC−4), salvo que se diga otra cosa.

## Inclinación como señal de carga

Cada sensor está sobre un subconductor de la fase inferior, a pocos metros de la torre, y mide el ángulo del cable. Cuando el cable recibe peso, se hunde, y el ángulo junto a la torre aumenta. El ángulo cambia también con la temperatura del conductor, que alarga el cable. La normal de cada sensor es, por eso, una recta en función de la temperatura del conductor:

$$\\theta_n = a + b\\,T_c \\tag{1}$$

Donde:

- $\\theta_n$: inclinación normal, sin carga, en grados;
- $T_c$: temperatura del conductor, en °C;
- $a$, $b$: coeficientes ajustados por mínimos cuadrados.

La recta se ajusta con las lecturas secas (humedad bajo 80 %), sin las que se alejan de la mediana más de 4 veces la desviación absoluta mediana escalada (1,4826 por la desviación absoluta mediana, el equivalente robusto de la desviación estándar). La dispersión $\\sigma$ de cada sensor es la desviación estándar de los residuos de esa recta. El exceso sobre la normal es:

$$e = \\theta - \\theta_n \\tag{2}$$

Donde $\\theta$ es la inclinación medida.

## Regla de episodio

Una lectura tiene carga cuando $e \\geq 4\\sigma$ y el aire está a 2 °C o menos. Las lecturas con carga separadas por 30 minutos o menos forman un episodio, y un episodio vale si tiene al menos dos lecturas seguidas. Es la regla de la vista Sensores de la aplicación; los umbrales se probaron con una lectura más y una menos de exigencia (3 y 5 desviaciones; 1 y 3 °C; una y tres lecturas seguidas).

## Contraste con el modelo de amenaza

El modelo de amenaza meteorológica (Zapata, 2026) calcula cada hora el manguito de nieve húmeda sobre el conductor y lo compara con la carga de diseño de la zona. Su estado es Normal, Propicia o Sobre diseño. Para cada episodio se corrió el modelo con el archivo de pronósticos, desde el día anterior, en la torre del sensor, igual que la función "Consultar el modelo" de la vista Sensores. Se registró su estado durante el episodio y la primera hora en Propicia o Sobre diseño en las 24 horas previas. Además, para cada torre y cada día del 14 de abril al 21 de julio se comparó el mayor estado del mecanismo de nieve húmeda con la presencia de un episodio.

El archivo de pronósticos reúne las primeras horas de cada corrida: dice qué habría marcado el modelo con el mejor pronóstico disponible, no con cuántos días de anticipación lo habría hecho.

## Revisión del caso de negocio

Cada supuesto del W-0009 se clasifica en uno de cuatro estados según la evidencia: Verificado (contrastado con datos o documentos primarios), Informado (lo dice un documento, sin contraste), Supuesto (una estimación sin respaldo) y Sin información.

# Desarrollo y Análisis

## Qué mide el sistema

Las tablas de los paneles del proveedor muestran qué se mide, qué se estima y con qué frecuencia:

| Variable | Origen | Frecuencia | Estado |
|----------------------------|--------------------|----------------|--------------------------------------|
| Inclinación del cable | Sensor del conductor | 1 minuto, configurable hasta 5 segundos | Medida |
| Temperatura del conductor (dos sondas) | Sensor del conductor | 1 minuto | Medida |
| Temperatura y humedad del aire | Sensor del conductor y estación | 1 minuto | Medida |
| Corriente | Sensor del conductor | 1 minuto | Medida |
| Viento, presión y radiación | Estación meteorológica | 1 minuto | Medidos desde julio de 2026 en cuatro de las seis estaciones |
| Precipitación | Estación meteorológica | — | Sin valores medidos |
| Tensión mecánica, flecha y espesor de hielo | Algoritmos del proveedor | 1 hora | Estimados, no medidos |
| Foto | Sensor del conductor | 1 hora | La cámara de 360° se ve solo en la aplicación móvil del proveedor |

: Variables del sistema VIGIA

La tensión, la flecha y el espesor de hielo están en la tabla de resultados de los algoritmos del proveedor, no en la de mediciones: son estimaciones hechas a partir de las mismas variables del sensor (Zapata, 2026, Anexo C, C-27). El caso de negocio prometía medir la tensión mecánica y la flecha (W-0009, sección 4).

La interfaz de datos del proveedor tiene un solo punto de consulta, con una ventana máxima de 24 horas que no puede empezar antes de las últimas 24 horas: no entrega historia, que hay que pedir al soporte del proveedor. Exige una dirección IP permitida, y no entrega la tensión, la flecha, el espesor de hielo ni las fotos (Gridpulse, 2026). El 26 de noviembre de 2026 el servidor respondió con el certificado por omisión de su intermediario, autofirmado, y la conexión no se completó; el acceso está pendiente con el proveedor.

## Completitud de las series

| Torre | Vano del sensor | Lecturas | Completitud desde el 14-04 (%) | Vacíos de 1 h o más | Mayor vacío (inicio, UTC) |
|--------|------------|------------|--------------|------------|----------------------|
| 803 | 803–804 | 64.052 | 98,0 | 7 | 58,5 h (13-11 10:55) |
| 821 | 821–820 | 67.706 | 96,6 | 4 | 85,0 h (21-05 09:50) |
| 825 | 825–826 | 64.055 | 98,0 | 7 | 58,5 h (13-11 10:55) |
| 837 | 837–836 | 67.722 | 96,6 | 4 | 85,0 h (21-05 09:50) |
| 843 | 843–842 | 64.054 | 98,0 | 7 | 58,5 h (13-11 10:55) |
| 892 | 892–891 | 67.719 | 96,6 | 4 | 85,0 h (21-05 09:50) |

: Lecturas de 5 minutos de cada sensor, del 14-03 al 26-11-2026

Desde el 14 de abril, las cinco variables están en todas las lecturas, y cada intervalo de 5 minutos reúne, en la mediana, cinco lecturas de un minuto; tiene cinco o más en 99,2 a 100 % de los intervalos. Antes de esa fecha, los sensores dan valores de instalación en otro nivel (Zapata, 2026, Anexo C, C-05 y C-31).

Los seis sensores forman dos tríos con los mismos vacíos, en las mismas horas: 803, 825 y 843, por un lado, y 821, 837 y 892, por el otro. Un vacío común a tres sensores distantes es del sistema de comunicación o de almacenamiento, no de un sensor. El mayor vacío del segundo trío empieza el 21 de mayo, el día de la intervención sobre el sensor de la torre 821.

\\newpage

## Normal y dispersión de cada sensor

| Torre | $a$ (°) | $b$ (°/°C) | $\\sigma$ (°) | Umbral, $4\\sigma$ (°) | Lecturas secas descartadas (%) | Ángulo calculado del vano (°) |
|--------|----------|----------|----------|----------|--------------|--------------|
| 803 | 19,77 | 0,0147 | 0,052 | 0,21 | 0,3 | 18,51 |
| 821 | 24,21 | 0,0091 | 0,033 | 0,13 | 27,4 | 23,55 |
| 825 | 1,03 | 0,0130 | 0,030 | 0,12 | 0,04 | 0,24 |
| 837 | 22,10 | 0,0106 | 0,064 | 0,25 | 1,8 | 22,21 |
| 843 | 25,83 | 0,0180 | 0,047 | 0,19 | 0,3 | 25,86 |
| 892 | 10,35 | 0,0338 | 0,075 | 0,30 | 0,05 | 11,07 |

: Normal de cada sensor (ecuación 1), con el ángulo del cable sin carga a 0 °C calculado con la mecánica de su vano

La normal a 0 °C, el coeficiente $a$, coincide con el ángulo que da la mecánica del vano del sensor, calculada con los datos de diseño de la planilla, con diferencias de 0,03 a 1,26°. Esa comparación fijó el vano de cada sensor: en las torres 837 y 843 es el de atrás, no el que se había informado (Zapata, 2026, Anexo C, C-35).

Cada ajuste usa de 50.130 a 53.936 lecturas secas. La dispersión va de 0,030° en la torre 825 a 0,075° en la 892. Las dos torres de la cresta, 825 y 821, tienen la señal más limpia, y las 837 y 892, la más ruidosa. En la 821 el ajuste descarta 27,4 % de las lecturas secas: hasta el 21 de mayo el sensor leyó unos 17° menos, y la intervención de ese día lo dejó en el nivel que corresponde a su vano (Zapata, 2026, Anexo C, C-32).

## Estaciones meteorológicas

Las estaciones tienen datos medidos desde el 11 de julio de 2026 en la torre 803 y desde el 24 de julio en las 825, 843 y 892. La de la 837 tiene datos solo de noviembre, y la de la 821 casi no tiene: está detenida desde el 4 de noviembre, y el sistema muestra en su lugar una estación virtual (Zapata, 2026, Anexo C, C-28). Ninguna estación registra precipitación: la de los paneles es la de la estación virtual. Ningún episodio de carga tiene datos de estación, porque todos son anteriores al 24 de julio (Zapata, 2026, Anexo C, C-34).

# Resultados

## Episodios de carga de 2026

| Torre | Inicio y término (hora local) | Minutos | Exceso máximo (°) | Aire mínimo (°C) | Modelo | Manguito del modelo (kg/m) |
|--------|--------------------|--------|----------|----------|----------|----------|
| 825 | 04-07, 16:30 a 19:20 | 170 | 0,45 | −0,1 | Propicia | 0,14 |
| 821 | 04-07, 17:00 a 17:35 | 35 | 0,38 | −1,0 | Normal | 0,02 |
| 825 | 04-07, 23:05, a 05-07, 06:10 | 425 | 0,80 | 0,3 | Propicia | 0,29 |
| 821 | 05-07, 00:20 a 00:55 | 35 | 0,28 | −0,6 | Propicia | 0,17 |
| 825 | 21-07, 13:50 a 14:30 | 40 | 0,38 | 0,5 | Normal | 0 |

: Episodios de carga de 2026, en hora local, con el estado del modelo de amenaza en la misma torre

![Exceso de la inclinación sobre su normal en las torres 825 y 821, con el umbral de cada sensor y las horas en que el modelo de amenaza estuvo en Propicia por nieve húmeda en la torre 825. Medias de 5 minutos, hora local.](figures/load-episodes-2026.png)

Del 14 de marzo al 26 de noviembre de 2026 hubo cinco episodios, todos en las torres 825 y 821. Cuatro son de la tormenta del 4 y 5 de julio; el quinto es el evento del 21 de julio, registrado en el estudio del modelo de amenaza (Zapata, 2026, Anexo D). Las torres 803, 837, 843 y 892 no tuvieron ninguno. En la tormenta de julio, la 821, 99 m más abajo que la 825, cargó menos y por menos tiempo.

La magnitud en kilogramos por metro está calculada para dos episodios, con la mecánica del vano del sensor de la torre 825: 0,23 a 0,75 kg/m por subconductor en el de la noche del 4 al 5 de julio, con una estimación central de 0,35, y 0,12 a 0,37 kg/m en el del 21 de julio, con una estimación central de 0,18 (Zapata, 2026, Resultados y Anexo D). El rango es ancho porque depende de cuántos vanos se cargaron y de cuánto se mueven las cadenas de aisladores.

\\newpage

## Robustez de la regla

| Variante de la regla | 803 | 821 | 825 | 837 | 843 | 892 |
|------------------------------|------|------|------|------|------|------|
| Umbral de $3\\sigma$ | 0 | 2 | 3 | 3 | 0 | 5 |
| Umbral de $4\\sigma$ (regla) | 0 | 2 | 3 | 0 | 0 | 0 |
| Umbral de $5\\sigma$ | 0 | 2 | 3 | 0 | 0 | 0 |
| Aire hasta 1 °C | 0 | 2 | 3 | 0 | 0 | 0 |
| Aire hasta 2 °C (regla) | 0 | 2 | 3 | 0 | 0 | 0 |
| Aire hasta 3 °C | 0 | 2 | 3 | 1 | 0 | 0 |
| Una lectura | 0 | 7 | 5 | 4 | 0 | 2 |
| Dos lecturas seguidas (regla) | 0 | 2 | 3 | 0 | 0 | 0 |
| Tres lecturas seguidas | 0 | 2 | 3 | 0 | 0 | 0 |

: Episodios de cada sensor al cambiar un umbral de la regla y dejar los otros dos en su valor

En las torres 825 y 821 los episodios no dependen del umbral de desviaciones ni del límite de temperatura. Aceptar una lectura aislada agrega dos lecturas sueltas en la 825 y cinco en la 821. En las 837 y 892, las más ruidosas, bajar el umbral a $3\\sigma$ o subir el límite a 3 °C agrega candidatos que la regla descarta; el único que se revisó, el de la 837 del 28 de agosto, se descartó (Zapata, 2026, Anexo C, C-33).

## Contraste con el modelo de amenaza

En la tormenta del 4 y 5 de julio, el modelo estuvo en Propicia por nieve húmeda en la torre 825 desde las 15:00 del 4 de julio, hora y media antes de la primera carga, hasta las 14:00 del día siguiente. En el episodio 3 su manguito llegó a 0,29 kg/m, dentro del rango que da la inclinación. En la 821 marcó Propicia desde la misma hora, pero estaba en Normal durante el episodio 2, con 0,02 kg/m, y volvió a Propicia en el episodio 4. El 21 de julio el pronóstico dio lluvia con 1,5 a 2,3 °C, y el modelo estuvo en Normal todo el día (Zapata, 2026, Anexo C, C-30).

| Del 14-04 al 21-07-2026, seis torres | Con episodio | Sin episodio |
|------------------------------|----------|----------|
| Modelo en Propicia o Sobre diseño | 4 | 2 |
| Modelo en Normal | 1 | 587 |

: Días por torre según el mayor estado del mecanismo de nieve húmeda del modelo y la presencia de un episodio (594 días-torre)

Los cuatro aciertos son las torres 825 y 821 el 4 y el 5 de julio. El episodio sin aviso es el del 21 de julio. Las dos alarmas sin carga son de la torre 837 en esos mismos días: el pronóstico no ubica la línea de nieve entre la 825 y la 837, 100 m más abajo (Zapata, 2026, Anexo C, C-02). El modelo no llegó a Sobre diseño en ninguna de las seis torres en el período. Con cinco días-torre con episodio, la tabla describe la temporada; no estima una tasa de aciertos.

La hora y media de anticipación es la del archivo de pronósticos, que reúne las primeras horas de cada corrida. La anticipación real, la de los pronósticos emitidos días antes, exige guardar las corridas sucesivas.

# Discusión

## Interpretación

En las torres de la cresta, la inclinación detecta la carga en pocos minutos: con medias de 5 minutos, la regla confirma un episodio con su segunda lectura seguida, unos 10 minutos después de empezar. La señal es limpia (0,03° de dispersión), las series están casi completas y el resultado no depende de los umbrales. Lo que el sistema no entrega es la magnitud: la tensión es una estimación del proveedor con un método que no se conoce, y la carga en kilogramos por metro depende de la mecánica de cada vano, calculada para dos episodios.

Los resultados muestran por qué la medición y el pronóstico se necesitan. El modelo anticipó la tormenta de julio y los sensores la confirmaron; el 21 de julio el modelo no avisó y el sensor de la 825 registró la carga; y en la 837 el modelo marcó dos días sin carga, que el sensor permite descartar. Es la cadena de las empresas de referencia (Estado del Arte), y la que el W-0009 describe como el paso de un mantenimiento reactivo a uno preventivo (W-0009, 5.3).

Dos de los seis puntos, las torres 803 y 892, están en la Zona III, a 315 y 517 m de altitud, mientras el W-0009 ubica los seis en la Zona I. No tuvieron episodios, y la 892 tiene la señal más ruidosa. Su papel no está documentado: pueden servir de referencia fuera de la zona expuesta, pero no vigilan La Dormida.

## El caso de negocio frente a la evidencia

| Supuesto o dato del W-0009 | Sección | Evidencia | Estado |
|----------------------------|----------|--------------------------------------|------------|
| Fallas de 2022 y 2025: 10 y 12 días fuera de servicio; 1,85 y 0,55 millones de USD de reparación | 2 y 5.2.1 | Solo el propio documento. Su sección 2 da 10 y 12 días para los dos circuitos en 2022 | Informado |
| Una falla mayor cada cuatro años en la Zona I | 5.2.1 | Dos fallas mayores entre 2019 y 2025 según el propio documento; el historial completo de fallas de la línea no se revisó en este estudio | Supuesto |
| Con VIGIA, la mitad de las fallas mayores | 5.1 | Sin evidencia posible con un invierno; las dos fallas tuvieron causas previas (Zapata, 2026, Discusión) | Supuesto |
| 50 % menos de mantenimiento correctivo | 5.1 | El cuadro de 5.4 deja el mantenimiento en cero en los dos escenarios, y los costos de inspección y helicóptero están sin completar | Sin información |
| Sin sanciones por energía no suministrada con VIGIA; 0,9 millones de USD sin él | 5.1 y 5.2.3 | Estimación del documento; sus referencias normativas no se verificaron aquí | Supuesto |
| Inversión del piloto: unos 400.000 USD | 6 | Planilla de presupuesto y costo total (2026): 266.212 USD ejecutados a mayo de 2026 | Informado |
| Costo de operación del sistema | — | No está en el documento | Sin información |

: Supuestos del caso de negocio y su estado según la evidencia

| Lo que promete el W-0009 | Sección | Lo que hay |
|----------------------------|----------|------------------------------------------|
| Monitoreo en tiempo real de variables ambientales | 4 | En parte: temperatura y humedad del aire por minuto en los seis puntos; viento desde julio en cuatro; sin precipitación |
| Monitoreo de la flecha y la tensión mecánica | 4 | No: las estima el proveedor |
| Historia de los datos para análisis predictivo | 4 | En parte: los paneles guardan la historia por minuto desde marzo; la interfaz de datos entrega solo las últimas 24 horas |
| Alertas al centro de control | 5.3.1 | Sin información: la ficha de la iniciativa no registra alarmas configuradas, y no se toman decisiones con el sistema |
| Seis puntos en la Zona I | 3 | En parte: cuatro en la Zona I y dos en la Zona III |

: Capacidades prometidas por el caso de negocio y su estado

El beneficio del W-0009 descansa en evitar una falla mayor cada cuatro años. Con esa frecuencia, un invierno sin fallas no demuestra nada, ni a favor ni en contra. Se propone medir el beneficio con indicadores intermedios, que se pueden registrar desde ahora:

1. Episodios detectados por invierno y por torre.
2. Episodios anticipados por el modelo, y con cuántas horas de anticipación, con las corridas guardadas.
3. Alarmas del modelo descartadas por los sensores, como las de la 837 en julio.
4. Decisiones tomadas con los datos (despachos, vuelos evitados o dirigidos), con su registro.
5. Tiempo entre la detección y la acción.
6. Disponibilidad de los datos: completitud de las series y días con estación y precipitación medidas.

## Cumplimiento de los objetivos

| Objetivo | Resultado | Estado |
|----------------------|----------------------------------------|------------------|
| 1. Inventario | Variables, frecuencia y completitud de los seis puntos; qué se mide y qué se estima | Cumplido |
| 2. Regla de detección | Normal y dispersión de cada sensor, regla fijada, robustez probada y cinco episodios | Cumplido, con los umbrales fijados en los mismos datos |
| 3. Contraste con el modelo | Estado del modelo en cada episodio y por día; anticipación dentro del archivo | Cumplido en parte: falta la anticipación real |
| 4. Caso de negocio | Siete supuestos clasificados, cinco capacidades revisadas y seis indicadores | Cumplido con la versión 0 del W-0009 |
| 5. Brechas | Siguientes Pasos | Cumplido |

: Cumplimiento de los objetivos específicos

## Incertidumbre y límites

1. Un invierno, cinco episodios, dos torres: las cifras describen la temporada de 2026, no una tasa.
2. Los umbrales de la regla se fijaron con los mismos episodios que detecta. La prueba fuera de la muestra es el invierno de 2027.
3. Con medias de 5 minutos, una carga de menos de 10 minutos no forma un episodio.
4. La inclinación depende de la mecánica del vano; la magnitud tiene un rango ancho y está calculada solo para dos episodios.
5. El archivo de pronósticos no es el pronóstico emitido días antes: la anticipación medida es un mínimo de lo que el modelo puede dar en tiempo real, y puede no coincidir con él.
6. Las cifras de costo del caso de negocio no se contrastaron con registros contables.

# Conclusiones

1. VIGIA mide por minuto la inclinación del cable, la temperatura del conductor y del aire, la humedad y la corriente en seis puntos, con 96,6 a 98 % de completitud desde el 14 de abril de 2026. Los vacíos son del sistema y no de los sensores. El viento se mide desde julio en cuatro estaciones, la precipitación en ninguna, y la tensión, la flecha y el espesor de hielo los estima el proveedor.
2. La inclinación sigue una normal lineal con la temperatura del conductor, con una dispersión de 0,030 a 0,075°. La regla de $4\\sigma$, con el aire a 2 °C o menos y dos lecturas seguidas, encuentra cinco episodios en 2026, tres en la torre 825 y dos en la 821, y en esas torres no depende de los umbrales.
3. Dentro del archivo de pronósticos, el modelo de amenaza estuvo en Propicia antes o durante cuatro de los cinco episodios, y durante el episodio en tres: marcó la tormenta de julio desde hora y media antes de su primera carga y no marcó el evento del 21 de julio. Dio dos alarmas sin carga, en la torre 837, y no llegó a Sobre diseño.
4. Los supuestos de beneficio del W-0009 no se pueden verificar con un invierno. Los costos de las fallas y la inversión están informados; el mantenimiento y la operación, sin información. Se cumplen en parte cuatro de las cinco capacidades revisadas: la que no se cumple es medir la tensión. Se proponen seis indicadores intermedios.
5. Para que VIGIA apoye una decisión faltan un recolector diario de datos, la precipitación medida, el método del proveedor para la tensión y un protocolo de acciones acordado con el centro de control y con mantenimiento.

# Siguientes Pasos

| Acción propuesta | Justificación | Prioridad |
|--------------------------------------------|------------------------------------------------|------------|
| Un recolector diario de datos en el equipo del autor, con la clave fuera del repositorio | La interfaz de datos solo entrega las últimas 24 horas: lo que no se recoge queda solo en los paneles | Alta |
| Resolver con el proveedor el acceso a la interfaz (dirección IP y certificado) y la entrega de la historia desde marzo | Sin acceso no hay recolector | Alta |
| Pedir al proveedor el método de la tensión, la flecha y el espesor de hielo, y comparar su espesor con los episodios | Hoy no se sabe qué representan esas cifras | Alta |
| Confirmar si las estaciones miden precipitación, y reparar las de las torres 821 y 837 | Sin precipitación medida no se confirma el tipo de evento | Alta |
| Acordar con el centro de control y con mantenimiento un protocolo de acciones por estado del modelo y de los sensores | Es el eslabón que falta para decidir | Alta |
| Registrar los indicadores intermedios desde el invierno de 2027 | El beneficio no se mide con la ausencia de fallas | Alta |
| Guardar las corridas sucesivas del pronóstico durante el invierno de 2027 | Para medir la anticipación real | Media |
| Probar la regla fuera de la muestra con el invierno de 2027 | Los umbrales se fijaron con los episodios de 2026 | Media |
| Calcular la carga en kg/m de cada episodio con el tramo de cada sensor | Hoy está calculada para dos | Media |
| Definir el papel de los puntos 803 y 892, fuera de la Zona I | El W-0009 ubica los seis puntos en la Zona I | Media |
| Conseguir la versión vigente del W-0009 | La ficha de la iniciativa cita una versión 2, con 1,39 millones de USD de beneficio | Media |
| Medir en terreno el ángulo del sensor de la torre 821 | Su nivel cambió el 21 de mayo | Baja |

: Siguientes pasos

# Referencias

1. Adum, B., Welgaard, Ø., Berstad, A. K. y Radojčić, M. (2022). Using ice monitoring and modelling to increase reliability and optimise OHTL route planning. IWAIS 2022, Montreal. <https://www.mcgill.ca/iwais2022/files/iwais2022/paperid074.pdf>
2. Bjarnason, T. (2025). Landsnet and Laki Power tackle severe weather challenges in Iceland. POWER, 7 de marzo de 2025. <https://www.powermag.com/landsnet-and-laki-power-tackle-severe-weather-challenges-in-iceland>
3. Cazade, G. (2020). Icing forecast and detection operationally for the Province of Quebec grid. 100th AMS Annual Meeting, Boston. <https://ams.confex.com/ams/2020Annual/webprogram/Paper369740.html>
4. CIGRE Task Force 22.06.01 (2001). Guidelines for field measurement of ice loadings on overhead power line conductors (Technical Brochure 179).
5. Gridpulse (2026). GridPulse Connect API, versión 1.0 (05-05-2026). Documento del proveedor, confidencial.
6. Presupuesto y costo total del proyecto de monitoreo de línea (2026). Planilla interna.
7. Proingesa Ltda. (2026). Auditoría técnica de la línea 2x500 kV Cardones–Polpaico: Informe Ejecutivo Final (25081-C-LTR-INF-005, revisión 0, 29-04-2026), 6.1. Publicada por el Coordinador Eléctrico Nacional el 25-05-2026. <https://www.coordinador.cl/auditorias-tecnicas/documentos/auditoria-de-lineas-de-transmision/linea-cardones-polpaico-2x500-kv/>
8. SEC (2020). Pliego Técnico Normativo RPTD N°17, Sistema de gestión de integridad de instalaciones eléctricas (Res. Ex. N° 31.876 de 2020), 5.21.
9. W-0009 (2025). Vigilancia Integrada para Gestión de Infraestructura y Ambiente, versión 0, octubre de 2025, secciones 2 a 6. Documento interno.
10. Zapata, L. A. (2026). Modelo de amenaza meteorológica para líneas de transmisión, calibrado con pronóstico numérico, mediciones en torres y eventos documentados, versión 0.26. Informe técnico interno.

\\newpage

\`\`\`{=latex}
\\section*{\\texorpdfstring{\\begin{center}Anexo A\\\\[0.4em]\\large Hallazgos sobre la confiabilidad de los datos\\end{center}}{Anexo A. Hallazgos sobre la confiabilidad de los datos}}
\\addcontentsline{toc}{section}{Anexo A. Hallazgos sobre la confiabilidad de los datos}
\`\`\`

Este anexo registra lo encontrado sobre cuánto se puede confiar en cada dato del sistema. Se agrega un hallazgo cada vez que aparece; ninguno se borra: si se resuelve, cambia su estado. La última columna remite al hallazgo del estudio del modelo de amenaza (Zapata, 2026, Anexo C) cuando ya estaba registrado ahí.

| N.° | Hallazgo | Evidencia | Efecto | Estado |
|------|------------------------|------------------------|------------------------|------------|
| A-01 | Las lecturas de marzo y de las primeras semanas de abril son de la instalación | Saltos de 3 a 20° hasta el 13 de abril, y niveles distintos de los actuales (C-05 y C-31) | No sirven como datos | Resuelto: se usan desde el 14 de abril |
| A-02 | Los seis sensores forman dos tríos con los mismos vacíos | 803, 825 y 843 comparten siete vacíos desde el 14 de abril; 821, 837 y 892, cuatro, el mayor de 85 horas desde el 21 de mayo | Un vacío es del sistema, no del sensor | Abierto: preguntar al proveedor |
| A-03 | Hasta el 21 de mayo el sensor de la torre 821 leyó unos 17° menos | 27,4 % de sus lecturas secas queda fuera de la normal (C-32) | La regla usa el nivel actual, que corresponde a su vano | Abierto: medición en terreno |
| A-04 | El vano del sensor de las torres 837 y 843 es el de atrás | Ángulo calculado frente a la normal medida (C-35) | Corregido en la aplicación | Resuelto |
| A-05 | La tensión, la flecha y el espesor de hielo son estimaciones del proveedor | Están en la tabla de resultados de algoritmos, no en la de mediciones (C-27) | No hay tensión medida | Abierto: método del proveedor |
| A-06 | Las estaciones no registran precipitación y no tienen datos de ningún episodio | Inventario de los paneles (C-34) | No se confirma el tipo de precipitación | Abierto |
| A-07 | La estación de la torre 821 está detenida desde el 4 de noviembre de 2026 | El sistema muestra una estación virtual en su lugar (C-28) | Lo que muestra el sistema para ella no es medido | Abierto: en reparación |
| A-08 | La interfaz de datos entrega solo las últimas 24 horas, y su certificado no permitió conectarse | Documentación del proveedor; prueba del 26 de noviembre | Hace falta un recolector diario; la historia, por pedido al proveedor | Abierto |
| A-09 | Hay intervalos de 5 minutos con hasta 20 lecturas | Lecturas repetidas en un mismo minuto | Se promedian al exportar | Resuelto |
| A-10 | Dos de los seis puntos están fuera de la Zona I | Planilla de estructuras: 803 y 892 en la Zona III | No vigilan La Dormida | Abierto: definir su papel |
| A-11 | La altura de cada estación y la referencia de la dirección del viento no están documentadas | C-23 y C-25 | Todo análisis del viento por dirección supone el norte y la procedencia | Abierto |

: Hallazgos sobre la confiabilidad de los datos del sistema VIGIA

\\newpage

\`\`\`{=latex}
\\section*{\\texorpdfstring{\\begin{center}Anexo B\\\\[0.4em]\\large Inventario de los puntos de medición\\end{center}}{Anexo B. Inventario de los puntos de medición}}
\\addcontentsline{toc}{section}{Anexo B. Inventario de los puntos de medición}
\`\`\`

| Torre | Sensor en los paneles | Sensor en la interfaz | Estación en los paneles | Estación en la interfaz |
|--------|------------|------------|------------|------------|
| 803 | 10 | mos:299 | 4 | CHILE25_4 |
| 821 | 7 | mos:296 | 5 | CHILE25_5 |
| 825 | 12 | mos:301 | 2 | CHILE25_2 |
| 837 | 8 | mos:297 | 1 | CHILE25_1 |
| 843 | 9 | mos:298 | 3 | CHILE25_3 |
| 892 | 11 | mos:300 | 6 | CHILE25_6 |

: Identificadores de los puntos de medición en el sistema del proveedor

| Torre | Zona | Cota (m) | Tipo | Vano del sensor | Latitud | Longitud |
|--------|--------|--------|----------|----------|----------|----------|
| 803 | III | 315 | 5B | 803–804 | −33,0794 | −71,2213 |
| 821 | I | 1.549 | 5B | 821–820 | −33,1157 | −71,1414 |
| 825 | I | 1.648 | 5D | 825–826 | −33,1222 | −71,1354 |
| 837 | I | 1.548 | 5D | 837–836 | −33,0973 | −71,0689 |
| 843 | I | 1.117 | 5C | 843–842 | −33,0771 | −71,0511 |
| 892 | III | 517 | 5AAZ3 | 892–891 | −33,1895 | −70,8743 |

: Ubicación de los puntos de medición en la línea, según la planilla de estructuras

El sensor está sobre un subconductor de la fase inferior, a pocos metros de la torre, en el vano indicado. La estación meteorológica está montada en una pata de la torre y mira hacia ese vano.

\\newpage

\`\`\`{=latex}
\\section*{\\texorpdfstring{\\begin{center}Anexo C\\\\[0.4em]\\large Reproducción de los resultados\\end{center}}{Anexo C. Reproducción de los resultados}}
\\addcontentsline{toc}{section}{Anexo C. Reproducción de los resultados}
\`\`\`

Los datos y los scripts están fuera del repositorio, en \`working-papers/assets/\`:

1. \`vigia/data/sensor-history-2026-11-26.json\`: historia de los seis sensores, del 14-03 al 26-11-2026, en medias de 5 minutos. Se vuelve a generar desde los paneles con \`vigia/export-history.js\`.
2. \`threat-model/data/sensors-surface.json\` y \`threat-model/data/sensors-extra.json\`: archivo de pronósticos del IFS en las seis torres, del 14-03 al 21-07-2026 (\`threat-model/fetch-calibration.sh\`).
3. \`vigia/study-analysis.mjs\`: inventario, normal de cada sensor, episodios, robustez y contraste con el modelo. Escribe \`vigia/study-analysis.json\`.
4. \`vigia/study-figure.py\`: figura de los episodios.

La regla de detección es la de la aplicación (\`src/utilities/sensor-load.js\`, con sus pruebas en \`tests/sensor-load.test.mjs\`), y el modelo de amenaza, el de \`src/utilities/threat-model.js\` y \`threat-forecast.js\`. Orden de ejecución, desde la raíz del proyecto:

1. \`FRAMEWORK_DIR=<carpeta del framework> node --import ./scripts/framework-alias.mjs working-papers/assets/vigia/study-analysis.mjs\`
2. \`python3 working-papers/assets/vigia/study-figure.py\`
`;export{e as default};
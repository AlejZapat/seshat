var e=`---
title: "Modelo de amenaza meteorológica para líneas de transmisión, calibrado con pronóstico numérico, mediciones en torres y eventos documentados"
author: "Luis Alejandro Zapata"
date: "27-11-2026"
lang: es-CL
abstract: |
    Las líneas de transmisión en cordillera fallan con nieve húmeda, y cuando ocurrieron las dos fallas del sector La Dormida no existía un modelo que avisara esas condiciones. Este informe presenta un modelo de amenaza, construido desde cero, que compara, hora a hora y para cada estructura, la carga meteorológica pronosticada con la carga de diseño de la norma con que se construyó. Usa solo el pronóstico del modelo IFS (Integrated Forecasting System) del Centro Europeo de Previsiones Meteorológicas a Plazo Medio (ECMWF), que entrega Open-Meteo. Se calibró con seis torres instrumentadas del sector La Dormida, diez episodios chilenos con su consecuencia conocida y diecinueve eventos internacionales documentados por el Consejo Internacional de Grandes Redes Eléctricas (CIGRE). El hallazgo central es que la temperatura de bulbo húmedo separa la nieve que cargó el conductor de la lluvia sin carga, cosa que no logran la temperatura del aire ni la isoterma de 0 °C. Con ese criterio, las dos fallas chilenas quedan entre los tres episodios con más hielo de nueve (área bajo la curva, AUC, de daño de 0,86, frente a 0,29 del criterio de Admirat), y el criterio también ordena los eventos del mundo (AUC de 0,80 a 0,89). La comparación con el diseño se hace en peso, como lo define la norma. En el único episodio con carga medida, la masa modelada queda dentro del rango que da la inclinación del conductor. El viento se traslada a cada torre por cuantiles contra el Explorador Eólico, con la densidad del aire de la cota; frente a los sensores da de más, entre 1,4 y 4 veces. El informe define también cómo la aplicación usa el modelo: vigila la red en vez de consultar estructura por estructura, agrupa en episodios dónde y cuándo se llega a Propicia o Sobre diseño, y dice con qué certeza, según la práctica de la industria. Por último, calcula cuánto usa el cable y la torre de su capacidad en las 46 torres del sector, con los datos de diseño de la línea. Ese cálculo muestra que, con una velocidad de caída del copo de 1 m/s, el manguito de las tormentas grandes lleva cables sanos sobre su rotura, lo que no ocurrió; con 1,7 m/s, el valor con que se calibró la adherencia que usa el modelo y que este adopta, queda bajo la rotura y cerca de la estimación independiente del sitio.
toc: true
numbersections: true
header-includes:
  - \\usepackage{etoolbox}
  - \\AtBeginDocument{\\renewcommand{\\figurename}{Figura}}
  - \\AtBeginDocument{\\renewcommand{\\tablename}{Tabla}}
  - \\AtBeginDocument{\\gappto\\captionsspanish{\\renewcommand{\\tablename}{Tabla}}\\selectlanguage{spanish}}
  - \\pretocmd{\\tableofcontents}{\\clearpage}{}{}
  - \\apptocmd{\\tableofcontents}{\\clearpage}{}{}
  - \\AtBeginDocument{\\setcounter{table}{-1}}
---

# Portada {-}

| Campo | Valor |
|------------------------|------------------------------------------------------------------------|
| Autor(es) | Luis Alejandro Zapata |
| Fecha | 27-11-2026 |
| Versión | 0.27 (borrador de trabajo) |
| Clasificación | Uso interno, confidencial: contiene información de LatLon (LAT-36-10-03-V5) y registros de operación |
| Normativa de referencia | NSEG 5 E.n.71; Pliego RPTD N°11; Pliego RPTD N°17; IEC 60826:2017; ISO 12494:2017 |

# Resumen Ejecutivo

El sector La Dormida de la línea 2x500 kV Nueva Pan de Azúcar–Polpaico, una cresta de 900 a 1.650 m, tuvo dos fallas con nieve en tres años: el 14 de julio de 2022 y el 16 de junio de 2025. Cada una dejó la línea del orden de 10 a 12 días fuera de servicio, con unos USD 1,2 millones de reparación. Cuando ocurrieron, no existía un modelo que avisara esas condiciones. Después de las fallas, el autor desarrolló dos aproximaciones por índices: el motor del módulo de Clima, que pone Rojo 8,3 días por invierno en la cresta, y el Sistema de Alerta Meteorológica Preventiva para Líneas de Transmisión (SAMPLT), que en ocho inviernos nunca pasó de Amarillo y dejó en Verde las dos fallas. Ninguna de las dos sirve para decidir, y el modelo de este informe parte, en la práctica, desde cero.

Ninguna de las dos fallas se debió solo al clima: en 2022 los subconductores tenían desgaste en la grapa del separador-amortiguador, y en 2025 la cruceta tenía piezas faltantes y otras de una composición química distinta de la especificada. El modelo evalúa la carga sobre el activo sano y no se hace cargo de esas condiciones previas.

Este informe documenta un modelo nuevo con otro propósito: no predecir fallas, sino determinar qué condiciones meteorológicas son propicias para generar riesgo sobre los activos. Para cada estructura y cada hora, el modelo identifica la nieve húmeda, calcula el manguito que se acumula sobre el conductor y lo compara con la carga de diseño de la zona climática de la norma de la línea. El resultado es uno de tres estados: Normal, Propicia o Sobre diseño. Usa solo el pronóstico del modelo IFS (Integrated Forecasting System) del Centro Europeo de Previsiones Meteorológicas a Plazo Medio (ECMWF), que entrega Open-Meteo, el mismo que usará en operación. La aplicación lo usa para vigilar la red: agrupa en episodios dónde y cuándo el pronóstico llega a Propicia o Sobre diseño, y dice con qué certeza.

La calibración muestra que el criterio de fase decide el resultado. En la cresta, el pronóstico no separa la lluvia de la nieve húmeda por la temperatura del aire, porque su error en horas con precipitación (cerca de 1 °C) es del tamaño de la ventana de 0 a 2 °C de la literatura. La temperatura de bulbo húmedo sí las separa, con un umbral de −0,3 °C fijado solo con las torres instrumentadas. Con ese criterio, las dos fallas chilenas quedan entre los episodios con más hielo, y el mismo criterio ordena los eventos internacionales por su consecuencia. En el único episodio con carga medida, la masa modelada cae dentro del rango que da la inclinación del conductor.

El viento tenía otro problema: el pronóstico, con celdas de 9 km, no ve la exposición de la cresta, y con él ninguna torre llega a la mitad de la presión de diseño en diez años. Se trasladó a cada torre con el Explorador Eólico del Ministerio de Energía, un modelo de 1 km, y la presión se calcula con la densidad del aire de la cota. Así, la presión de diseño se supera en pocas torres y menos de un día por año, sobre todo el 22 de agosto de 2023; pero frente a los sensores el traslado da entre 1,4 y 4 veces el viento medido. El cálculo de la utilización en las 46 torres del sector dio una prueba física de la magnitud: con la velocidad de caída del copo de 1 m/s, el manguito de la tormenta de 2025 llevaría cables sanos sobre su rotura en cinco torres, y eso no ocurrió. Con 1,7 m/s, el valor con que se calibró la adherencia que usa el modelo (Nygaard et al., 2013), el manguito máximo baja a 2,4 kg/m, ningún cable pasa del 75 % de su rotura y el resultado coincide con la estimación independiente del sitio. El modelo adopta ese valor. Quedan abiertas la cota inferior para la nieve seca y la validación del viento, para las cuales la sección de Siguientes Pasos propone acciones.

# Introducción

## Antecedentes

La línea 2x500 kV Nueva Pan de Azúcar–Polpaico entró en operación en mayo de 2019. Entre las torres 815 y 860 cruza el sector La Dormida, diseñado en la Zona I de la norma NSEG 5 E.n.71, Reglamento de Instalaciones Eléctricas de Corrientes Fuertes: 60 kgf/m² de viento sobre el conductor desnudo, y 10 mm de hielo con 20 kgf/m² de viento a −10 °C (P1-LT-01-D129-V0; P2-LT-01-I002-V5). Dos fallas ocurrieron en ese sector:

- El 14 de julio de 2022 se cortaron subconductores ACAR 700 (aluminio reforzado con aleación de aluminio) en la grapa del separador-amortiguador de los vanos 825–826 y 836–837. El análisis de causa raíz atribuye la falla al desgaste por fretting (roce de pequeña amplitud entre el cable y la grapa): los cables cortados conservaban el 13,6 % y el 23,9 % de su capacidad mecánica, y el clima fue el desencadenante (W-0016, §4.1).
- El 16 de junio de 2025, un salto de hielo deformó la cruceta media del circuito 2 en la torre 820. La falla fue multicausal, con desviaciones de fabricación y construcción de la cruceta (LAT-36-10-03-V5, §2 y §6.1 a §6.8).

En las dos fallas pesó la condición del activo, y en las dos el clima fue el desencadenante. Cuando ocurrieron, no existía un modelo que avisara las condiciones meteorológicas de riesgo. Después de las fallas, el autor desarrolló dos aproximaciones por índices. La primera, del módulo de Clima, corre un motor de índices sobre el pronóstico del ECMWF IFS (modelo A). La segunda es SAMPLT, un sistema de seis índices con semáforo de cinco niveles (modelo B). Un estudio posterior las corrió sobre las dos fallas y sobre los inviernos de 2019 a 2026 con reanálisis (\`working-papers/assets/weather-study/REPORT.md\`; \`events/RESULTS.md\`):

- El modelo A pone Rojo o más en 17 de 19 fallas del inventario internacional, pero también en dos de los tres episodios sin falla, y en la torre 825 avisa Rojo 8,3 días por invierno. Casi siempre sube por un mismo índice, el de acumulación de nieve, cuyo nivel máximo se activa con 3 cm de nieve en 24 horas.
- El modelo B deja en Verde 11 de las 19 fallas, incluidas las dos de Chile, y en ocho inviernos de La Dormida nunca pasa de Amarillo. Trata la nieve bajo 0 °C como seca, sin acreción, y ata sus niveles de hielo a clases de diseño de 50 años de período de retorno.

En paralelo, LatLon reconstruyó la falla de 2025 con reanálisis, estimó el viento extremo de cada torre con el Explorador Eólico y, desde marzo de 2026, instaló sensores en seis torres del sector (LAT-36-10-03-V5). Esas mediciones son puntuales y no representan la línea, pero son la única observación directa del sitio.

El propósito del modelo nuevo es otro: no busca predecir fallas, sino determinar qué condiciones meteorológicas son propicias para generar riesgo sobre los activos de transmisión. Un modelo no se valida ni se descarta por anticipar o no una falla: se evalúa por el fundamento de sus umbrales y por la frecuencia con que señala cada nivel. El modelo responde además al requisito de evaluar riesgos con una escala que sirva para decidir, del Pliego Técnico Normativo RPTD N°17, del reglamento de seguridad de las instalaciones eléctricas de producción, transporte y distribución (Decreto N°109 de 2017 del Ministerio de Energía), puntos 5.13 y 5.14.

La primera integración del modelo en la aplicación, en la vista de la red, lo corría sobre las líneas elegidas, pero no informaba (decisions/assets.md, "Vigilancia de amenazas"): no decía si el resultado era pronóstico o histórico ni su fecha de referencia, fijaba el período en 7 días, consultaba cada línea completa en una sola petición (899 ubicaciones en la línea de La Dormida), no permitía consultar una sola estructura y no entregaba informe, recomendación de actuación ni gráficas. La pregunta que debe responder la aplicación es otra: dónde y cuándo, en lo que se vigila, el pronóstico lleva la carga sobre los conductores a condiciones propicias o sobre el diseño, con qué evidencia y con qué certeza; y después, qué hacer.

## Objetivos

### Objetivo general

Construir y calibrar un modelo que, con las variables meteorológicas pronosticadas por Open-Meteo para cada estructura, determine cuándo las condiciones son propicias para generar riesgo y cuándo superan la carga de diseño de la norma con que se construyó la estructura, y definir cómo la aplicación lo usa para vigilar la red.

### Objetivos específicos

1. Cuantificar el error del pronóstico ECMWF IFS frente a la temperatura medida en las torres instrumentadas, en las horas con precipitación (sesgo y error medio absoluto).
2. Definir un criterio de fase que separe las horas con carga medida en el conductor de las horas de lluvia sin carga en la torre 825, con un umbral fijado sin usar las fallas.
3. Comparar la acumulación modelada con la carga de diseño de la zona en la misma magnitud que define la norma, y medir cuántos días por invierno se supera.
4. Verificar que el hielo modelado crezca con la consecuencia documentada, en Chile y en los eventos internacionales (correlación de Spearman y área bajo la curva, AUC, de daño frente al criterio de Admirat).
5. Medir la frecuencia de cada estado en los inviernos 2017 a 2026 y el puesto de los días de falla entre todos los días de invierno.
6. Trasladar el viento del pronóstico a cada torre, comparar su presión con la de diseño, medir con qué frecuencia la supera y con qué frecuencia pasa del 60 % de ella, y contrastar el traslado con los anemómetros de las torres instrumentadas.
7. Definir cómo la aplicación vigila la red con el modelo, a partir de la práctica de la industria y de las lecciones del código de SAMPLT: qué se vigila, cómo se agrupan las estructuras y las horas en episodios, cómo se expresa la certeza y cómo se consulta el pronóstico sin pasar los límites del servicio (125 ubicaciones por petición y unas 600 por minuto).
8. Calcular la utilización del cable (tensión sobre su rotura) y de la torre (carga transversal y vertical sobre las de su hipótesis de diseño) en los dos eventos propios y en las 46 torres del sector, con los datos de diseño de la línea, y acotar la magnitud del manguito con una cota alta y una cota baja que respeten el episodio medido.

## Alcance y Limitaciones

El modelo cubre la nieve húmeda acumulada sobre el conductor, el viento sobre el conductor y la combinación de ambos, comparados con la zona climática de la norma de cada línea. Se calibró en un solo sitio, la cresta de La Dormida, con una sola fuente meteorológica, el ECMWF IFS de 9 km. El informe define además cómo la aplicación usa el modelo para vigilar la red; los incrementos de esa vigilancia, después de su primera versión, quedan en Siguientes Pasos.

Quedan fuera:

- El hielo en nube (rime), porque no tiene caso en el sitio: la cresta no bajó de 0 °C entre abril y julio de 2026. Entra con su primer caso.
- La lluvia engelante, el galope, el desprendimiento de hielo y la contaminación de aisladores con hielo salino, que no tienen un mecanismo modelado en esta versión.
- La condición del activo. El modelo evalúa el activo sano, tal como salió del diseño: no considera desgaste, piezas faltantes ni defectos de material o de montaje, y no puede hacerlo, porque esa información no está en sus entradas. La condición y la criticidad son otras capas del riesgo en el módulo de Activos (decisions/assets.md, "Propósito del modelo de clima" y "Requisitos: RPTD N°17").

Las limitaciones principales son el tamaño de la evidencia (dos fallas propias, siete episodios sin consecuencia y un episodio con carga medida) y la resolución del pronóstico, una celda de 9 km para un trazado de cresta.

# Estado del Arte

## Metodología de revisión

La revisión parte de la de SAMPLT (Zapata, SAMPLT, cap. 2), que se concentró en los Technical Brochures y Green Books de CIGRE y en las normas de la Comisión Electrotécnica Internacional (IEC) y de la Organización Internacional de Normalización (ISO). Aquí se amplía en cuatro direcciones: los documentos propios de la organización (análisis de causa raíz W-0016, estudio de LatLon LAT-36-10-03-V5 y criterios de diseño de la línea), la literatura sobre modelos de acreción de nieve húmeda, la literatura de hidrometeorología sobre la fase de la precipitación y la práctica de vigilancia y avisos de los servicios meteorológicos y de las empresas eléctricas, con el código de la herramienta SAMPLT. Cada evento se tomó de su fuente primaria y se verificó contra una segunda cuando fue posible; el inventario completo, con 41 filas y la sección de cada fuente, está en \`working-papers/assets/events/events.csv\`.

## Antecedentes de daño meteorológico

La tabla siguiente reúne una muestra de los eventos del inventario, elegida por su valor como referencia de mecanismo y magnitud. El nivel de consecuencia es el de la escala del inventario: 0, sin consecuencia; 1, salidas sin daño físico; 2, daño de componentes sin caída de torres; 3, caída de 1 a 9 torres; 4, caída de 10 torres o más, o cascada.

| Evento | Fecha | Mecanismo | Consecuencia documentada | Nivel | Fuente |
|----------------------|------------------|----------------------------|------------------------------------------|--------|------------------|
| La Dormida, Chile (CL-01) | 14-07-2022 | Nieve y bajas temperaturas sobre subconductores desgastados | Corte de subconductores; 10 a 12 días fuera de servicio | 2 | W-0016, §4.1 |
| La Dormida, Chile (CL-02) | 16-06-2025 | Acreción de nieve húmeda y salto de hielo | Cruceta deformada; 10 a 12 días fuera de servicio | 2 | LAT-36-10-03-V5, §6 |
| Quebec y noreste de EE.UU. (MU-01) | 4 a 10-01-1998 | Lluvia engelante | 3.104 torres o postes de transmisión rotos o colapsados | 4 | GB Winter, §1.5.1 |
| Reino Unido (MU-02) | 7 y 8-12-1990 | Nieve húmeda con viento | Más de 1.000 conductores rotos; más de un millón de clientes | 2 | GB Winter, §1.5.2 |
| Suecia (MU-11) | 10 a 12-02-1999 | Hielo con sal marina sobre aisladores | Cuatro líneas de 400 kV fuera en una hora | 1 | GB Winter, §1.5.5 |
| Niigata, Japón (MU-12) | 22-12-2005 | Nieve húmeda salina y galope | 650.000 hogares por 31 horas | 1 | GB Winter, §1.5.6 |
| China (MU-13) | 20-01 a 02-02-2008 | Lluvia engelante prolongada | 8.381 torres colapsadas; 36.740 líneas fuera | 4 | GB Winter, §1.5.7 |
| Cataluña, España (MU-14) | 08-03-2010 | Nieve húmeda | 33 torres de 110 y 132 kV colapsadas | 4 | GB Winter, §1.5.8; AEMET (2010) |
| Noruega (MU-15) | 01-2014 | Hielo en nube | Cable de guardia roto y torres parcialmente colapsadas | 3 | GB Winter, §1.5.9.3 |
| Eslovenia (MU-18) | 31-01 a 09-02-2014 | Lluvia engelante bajo inversión | 93 km de líneas de transmisión dañadas | 4 | GB Winter, §1.5.10.1 |
| Villeroux, Bélgica (MU-21, MU-22) | 1986 y 1997 | Lluvia engelante con galope | Galope sin daño | 0 | TB 322, §6.2 |

: Muestra de eventos del inventario

Tres observaciones del inventario orientan este trabajo. Primero, la nieve húmeda daña también donde la norma no exige hielo: Cataluña perdió 33 torres a menos de 500 m de altitud, donde su diseño no consideraba hielo (MU-14). Segundo, la condición del activo pesa en muchas fallas, no solo en las chilenas: en Sudáfrica (2012) cedieron cables de guardia envejecidos (MU-04), y la línea eslovena Beričevo–Divača falló en 1997, 1998 y 2014. Tercero, la fuente secundaria más citada contiene errores que se propagan: el Green Book de invierno fecha el evento de Cataluña el 3 de agosto de 2010, cuando ocurrió el 8 de marzo (AEMET, 2010), y SAMPLT lo describe como "nieve húmeda estival" (Zapata, SAMPLT, §2.2).

## Sistemas de alerta y modelos existentes

La literatura distingue dos familias de enfoques (Farzaneh y Chisholm, 2022, pp. 73 a 75), a las que la práctica agrega una tercera:

1. Monitoreo instrumentado: sensores de tensión, flecha, inclinación o cámaras que detectan la carga ya instalada sobre el conductor, incluido el Dynamic Line Rating. Su ventaja es la medición directa; su limitación, que detecta el fenómeno cuando ya ocurrió y en un solo punto. Las seis torres instrumentadas de La Dormida son de esta familia.
2. Pronóstico numérico con modelo físico de acreción: la práctica noruega anida modelos globales en modelos locales de hasta 800 m de resolución y estima la acreción antes de que ocurra (Nygaard, 2009, citado en Farzaneh y Chisholm, 2022, pp. 73 a 75), y Nygaard et al. (2013) recalibraron el modelo cilíndrico de nieve húmeda con 50 años de registros de Islandia: fijaron la velocidad de caída del copo en 1,7 m/s y mostraron que la adherencia inversa al viento subestima la carga extrema por un factor de 4, mientras que la inversa a su raíz la reproduce (Nygaard et al., 2013, secciones 5b, 6 y 7). En Italia, el sistema WOLF combina un modelo WRF (Weather Research and Forecasting) de 4 km, una identificación de nieve húmeda por ventana térmica o por razón de nieve, y un modelo de acreción de manguito (Vitali et al., 2024). El Green Book de líneas aéreas describe la misma cadena: condiciones horarias, identificación de nieve húmeda, acumulación y comparación con la carga de diseño (CIGRE, 2017, §7.3).
3. Índices de amenaza compuestos: traducen el pronóstico en índices por mecanismo y un semáforo, sin calcular la masa acumulada. Las dos aproximaciones previas del autor, SAMPLT (modelo B) y el motor del módulo de Clima (modelo A), son de esta familia. SAMPLT justificó la elección por reducir la dependencia de parámetros microfísicos difíciles de validar (Zapata, SAMPLT, §2.3).

El estudio de LatLon combina las familias 1 y 2 para un fin distinto, el diseño: reconstruye la falla de 2025 con reanálisis y modelos de acreción de Goodwin y Makkonen, y estima el viento extremo de período de retorno de 50 años en cada torre con el Explorador Eólico (LAT-36-10-03-V5, cap. 4 a 6 y Tabla 8-2). No es un sistema de alerta, pero aporta la base de comparación del sitio.

El modelo de este informe pertenece a la segunda familia. La razón para dejar la tercera es empírica: las dos aproximaciones previas por índices fallaron en direcciones opuestas al contrastarlos con la frecuencia de avisos y con los eventos propios (Introducción, Antecedentes), y sus umbrales no se pueden comparar con el diseño de la estructura, que es lo que el propósito exige.

## Criterios de nieve húmeda y fase de la precipitación

La nieve húmeda se adhiere al conductor cuando sus copos traen agua líquida. Los criterios publicados la identifican con la temperatura del aire o con la de bulbo húmedo, medidas en estaciones de superficie:

| Criterio | Condición de nieve húmeda | Fuente |
|----------------------------|----------------------------------------------------------|------------------------------------|
| Shōda (1953) | Temperatura del aire entre −1 y 1,5 °C con viento bajo 3 m/s | Citado en "Snow accretion on electric wires and its prevention", Journal of Glaciology |
| Admirat (2008) | Toda precipitación con temperatura del aire entre 0 y 2 °C | Admirat, en Farzaneh (ed.), 2008, cap. 4; CIGRE, 2017, §7.3.5 |
| Makkonen y Wichura (2010) | Nevada con bulbo húmedo entre −0,2 y 1,2 °C y temperatura del aire de 2 °C o menos | Citado en Simon et al., ALADIN |
| Nygaard et al. (2013) | Fracción líquida del copo; el Green Book lo resume como bulbo húmedo entre 0 y 1,2 °C | Nygaard et al., 2013; CIGRE, 2017, §7.3.5 |

: Criterios publicados de nieve húmeda

La hidrometeorología llegó a una conclusión convergente por otro camino. Ding et al. (2014) encontraron que la temperatura de bulbo húmedo discrimina el tipo de precipitación mejor que la temperatura del aire, y que el umbral entre lluvia y nieve sube con la altitud y depende de la humedad. Jennings et al. (2018), con 17,8 millones de observaciones del hemisferio norte, mostraron que la temperatura a la que la lluvia y la nieve son igual de frecuentes promedia 1,0 °C, varía entre −0,4 y 2,4 °C según la estación y es más cálida en climas continentales que en marítimos; los métodos que incorporan la humedad rinden mejor que los que usan solo la temperatura. La explicación física es la misma en ambos: en aire no saturado, el copo se enfría al evaporarse y llega sin fundirse con temperaturas del aire sobre 0 °C.

La práctica de las empresas va en la misma línea. Una patente de gestión de cortes por tormenta registra que todas las tormentas con daño de su muestra tuvieron bulbo húmedo medio de superficie cerca de 0 °C o algo bajo 0 °C, y que no todas las tormentas con baja razón entre nieve y agua produjeron daño (patente US 11.143.793). Tomaszewski et al. (2019) combinan el bulbo húmedo y el tipo de precipitación para identificar las condiciones de nieve húmeda y lluvia engelante que amenazan las líneas.

Una limitación común a todos estos criterios es que se definieron con temperatura medida en estaciones. Un modelo numérico en terreno complejo tiene errores del mismo orden que la ventana del criterio, y nada garantiza que el umbral de una estación sirva para la salida de un modelo en una cresta.

## Normas y guías aplicables

| Documento | Alcance principal | Uso en este informe |
|----------------------------|--------------------------------------------------------|--------------------------------------------|
| NSEG 5 E.n.71 (1971, derogada en 2020) | Zonas climáticas y cargas de diseño de líneas aéreas | Carga de diseño de La Dormida (Zona I): 10 mm de hielo con peso específico 1 |
| Pliego RPTD N°11 (2020, modificado en 2022) | Líneas de alta y extra alta tensión | Carga de hielo como peso del manguito (5.21.1); peso específico del hielo de 0,9 para las líneas diseñadas con este pliego (5.10.6 e) |
| Pliego RPTD N°17 (2020) | Sistema de gestión de integridad de instalaciones | Requisito de evaluar riesgos con una escala para decidir (5.13 y 5.14) |
| IEC 60826:2017 | Criterios de diseño de líneas aéreas | Ajuste de extremos de Gumbel (Anexo D) |
| ISO 12494:2017 | Engelamiento atmosférico de estructuras | Cilindro de referencia de 30 mm |
| CIGRE Green Book "Overhead Lines" (2017) | Cargas meteorológicas sobre líneas | Cadena de cálculo de la nieve húmeda (§7.3) |
| CIGRE Green Book de invierno (Farzaneh y Chisholm, 2022) | Tipos de hielo, casuística, monitoreo y pronóstico | Eventos internacionales (§1.5) |
| CIGRE TB 322 (2007) | Galope de conductores | Eventos de galope sin daño (§6.2) |

: Normas y guías aplicables

La prelación sigue la regla de la organización para transmisión en Chile: primero los pliegos RPTD, después las normas chilenas y del sector, y después la normativa internacional. La NSEG 5 está derogada, pero es la norma con que se diseñó la línea, y la amenaza se compara con el criterio con que se construyó cada activo (decisions/assets.md, "Base de diseño por norma").

## Vigilancia operativa y avisos basados en impactos

Para la vigilancia, la revisión buscó cómo los servicios meteorológicos y las empresas eléctricas pasan del pronóstico a una decisión sobre la red. La tabla siguiente resume lo que hace cada referente y lo que toma este trabajo.

| Referente | Qué hace | Qué toma este trabajo |
|------------------------------|------------------------------------------------------|------------------------------------------|
| OMM, Guidelines on Multi-hazard Impact-based Forecast and Warning Services (WMO-No. 1150) | Pronóstico basado en impactos: traduce la amenaza al impacto sobre un sector, con una matriz que cruza el nivel de impacto con la probabilidad. El riesgo combina la amenaza con la vulnerabilidad y la exposición, y los avisos se verifican con la retroalimentación de los usuarios (WMO, 2015; Met Office, 2022) | Hablar de la carga sobre el activo frente a su diseño, no del clima; la matriz, para las acciones; la verificación de los avisos |
| Met Office, avisos por matriz de impacto y probabilidad | Los niveles de aviso salen de una matriz acordada con los usuarios (Neal et al., 2014), y Taggart y Wilke (2025) proponen evaluarlos con puntajes consistentes | Niveles con significado operativo y avisos que se puedan evaluar |
| UConn y Eversource, Outage Prediction Model | Integra el pronóstico de alta resolución con la vegetación y la geografía para pronosticar el impacto de una tormenta y preposicionar cuadrillas, y trabaja en caracterizar la confianza del pronóstico (UConn y Eversource Energy Center, s. f.) | El producto es el impacto en la red, para decidir recursos, con el pronóstico combinado con los datos de la red |
| Statnett con Kjeller Vindteknikk (FRonT-LINES, modelo LineLoads) | Calcula y pronostica la carga de hielo en líneas en operación (Kjeller Vindteknikk et al., 2017). En la línea Sima–Samnanger midieron 69 kg/m con un diseño de 25 kg/m, y los vanos de prueba instrumentados llevaron a revisar las cargas de diseño (Adum et al., 2022) | La carga física contra el diseño, que es lo que hace el modelo, y la verificación con medición en terreno |
| Energiforsk, IceTools | El modelo noruego rindió peor en el terreno de Suecia (Sabelström y Hallgren, 2025) | Un modelo de carga se calibra en el lugar donde se usa |
| Hydro-Québec, SYGIVRE | Sistema automatizado de observación y alerta de engelamiento en zonas remotas, con sensores y cámaras (Cazade, 2020) | La observación como confirmación del pronóstico |
| ECMWF | Los pronósticos consecutivos saltan, y la coherencia entre corridas es una medida de confianza (Zsótér et al., 2009) | Comparar cada episodio con la corrida anterior |
| Diagrama de Hovmöller | Diagrama tiempo-espacio, de uso común en meteorología para ver cómo se mueve un fenómeno (Hovmöller, 1949) | Las estructuras a lo largo de la línea contra las horas |

: Práctica de la industria en vigilancia y avisos

Ninguno parte de elegir una torre: vigilan la red, traducen el clima en carga sobre el activo y dicen cuán seguros están. Por ahora, este trabajo no toma tres cosas: la probabilidad formal del pronóstico basado en impactos, porque no hay un ensamble corregido por cota (sección siguiente, lección 4); el modelo estadístico de fallas de UConn, que pide muchas tormentas con daños registrados cuando aquí hay dos; y la observación de SYGIVRE, hasta tener acceso a los datos de VIGIA, el piloto de monitoreo de la línea, con sus sensores y cámaras.

## Lecciones del código de SAMPLT

Además del documento que define el modelo B, SAMPLT es una herramienta que consulta el pronóstico para una estructura o en un barrido de la red. Su código (versión 1.2.0, revisado el 25 de noviembre de 2026) y el estudio que comparó sus modelos (\`working-papers/assets/weather-study/REPORT.md\`) dejan nueve lecciones para la vigilancia.

| N.° | Lección | Evidencia | Qué se hace |
|----|------------------------------|----------------------------------------|----------------------------------------|
| 1 | Una petición de más de 125 ubicaciones falla, y pasar de unas 600 por minuto también | \`BulkScan.js\`, ajustes del 17-07-2026 | Lotes de hasta 100 ubicaciones, con un límite de 500 por minuto, dos en paralelo y reintentos |
| 2 | La cuota diaria se agotaba con las pruebas | \`main.js\`, aviso de cuota agotada | Costo visible antes de consultar; lo consultado se guarda por corrida, y el aviso de cuota va en español |
| 3 | La cota decide la celda | La herramienta tenía unos 10 °C de error al agrupar por celda. En una prueba del 25-11-2026, la misma coordenada pedida a 548 m y a 1.548 m cayó en dos celdas distintas, con otro viento y otra humedad | Una ubicación por estructura, con su cota; no se agrupa por celda |
| 4 | El ensamble de Open-Meteo no corrige por cota | \`DataCollect.js\`: el modo se retiró por falsos negativos en cordillera | Sin probabilidades por ahora; la certeza sale del plazo y de la coherencia entre corridas |
| 5 | El peso de la consulta | 15 variables pesan 1,5 llamadas por ubicación (Open-Meteo, blog) | 4 variables: con 3 días de arranque y hasta 11 de pronóstico, una llamada por estructura |
| 6 | Pronóstico e histórico de modelos distintos | Pronóstico del IFS; histórico del reanálisis (ERA5 y afines) | Histórico del archivo de pronósticos del IFS, el mismo de la calibración |
| 7 | El Rojo sale casi siempre del índice de acumulación, como en el modelo A | Se activa con 3 cm de nieve en 24 h | El modelo calibrado de este informe |
| 8 | Contraseña para el barrido | Protegía la cuota de una herramienta pública | Sin contraseña: la aplicación es de uso local y muestra el costo (decisions/assets.md, "Vigilancia de amenazas") |
| 9 | Lo que funciona | Resumen con el peor momento y sus acciones, alerta por día, gráficas por variable con mínimo, máximo y promedio, informe imprimible, avisos de carga y de cuota | Se conserva en la vigilancia |

: Lecciones del código de SAMPLT

## Desprendimiento y tamaño del manguito de nieve húmeda

La acumulación no crece sin límite. La nieve se suelta del cable cuando las fuerzas aerodinámicas y el peso superan la adherencia al conductor y la cohesión entre copos, y lo gobiernan la temperatura del aire, el viento y la intensidad de la precipitación (Farzaneh y Chisholm, 2022, §5.2). De esa revisión interesan cuatro resultados:

1. La nieve seca, bajo cero, tiene poca adherencia: el viento se la lleva desde unos 2 m/s, así que solo se acumula en calma y rara vez da sobrecarga (§5.2.1.1).
2. La nieve húmeda se observa con el aire algo sobre cero, entre 0,5 y 2 °C, con cualquier viento, y puede no soltarse ni con viento fuerte. Si después la temperatura baja de 0 °C, se congela en el lugar y su adherencia crece mucho (§1.5 y §5.2.1.2).
3. El límite de cohesión depende del contenido de agua líquida del manguito. Los copos se adhieren con 15 a 40 % de agua líquida; sobre un valor crítico de 40 %, el manguito se rompe antes de llegar a unos 5 cm de diámetro (Sakamoto et al., 1988, y Admirat et al., 1988, citados en §4.1.1 y §5.2.2). Los manguitos naturales tienen de 20 a 30 % en Francia y de 10 a 50 % en Japón, y cerca del límite bajo crecen manguitos grandes.
4. Calcular ese contenido de agua exige un modelo termodinámico del manguito (Admirat et al., 1988; Poots y Skelton, 1995, citados en §5.2.3), que no se revisó en este trabajo.

La misma fuente documenta manguitos de nieve húmeda de 10 a 15 cm de diámetro con 5 a 12 kg/m, y uno de 17 cm con 16 kg/m, en líneas de Islandia con postes de madera, con conductores cortados y torres rotas (§1.5.3). En Chile no hay registro de un manguito de ese tamaño en una línea de transmisión .

## Síntesis crítica y brecha identificada

La revisión muestra que existe consenso sobre los mecanismos de daño y sobre la cadena de cálculo de la nieve húmeda, y que hay sistemas operativos que pronostican la acreción. Pero cuatro vacíos impiden usar lo existente tal cual en La Dormida:

1. Las dos aproximaciones previas por índices no se habían contrastado con la frecuencia de avisos sin daño ni con los eventos propios, y al hacerlo fallaron en direcciones opuestas.
2. Los criterios de fase se definieron con mediciones de estación y no se han verificado con la salida de un modelo numérico en una cresta, donde su error es del tamaño de la ventana del criterio.
3. Los modelos comparan el espesor del manguito con un espesor de diseño, aunque la norma define la carga de hielo como un peso, con una densidad que no es la de la nieve húmeda.
4. La herramienta de SAMPLT consulta el pronóstico estructura por estructura o en un barrido, sin vigilar la red ni decir con qué certeza avisa, cuando la práctica de la industria vigila, traduce el clima en carga sobre el activo y declara su confianza.

La brecha que cubre este informe es un modelo que compara la amenaza pronosticada con el diseño de cada estructura en la magnitud de la norma, con un criterio de fase calibrado para la fuente que usará en operación y validado contra la consecuencia y la frecuencia, y una vigilancia que lo aplique a la red con su certeza explícita.

# Metodología

## Enfoque

El enfoque es mixto. La física de la acumulación y la comparación con el diseño vienen de la literatura y de la norma; el criterio de fase y el factor de sitio del viento se calibran con datos. La calibración usa tres fuentes independientes entre sí, cada una con un papel distinto:

1. Las torres instrumentadas fijan el umbral de fase. Son las únicas que observan, en el sitio, si el conductor se cargó o no.
2. Los episodios de Chile con consecuencia conocida verifican el modelo en el sitio, con eventos que en su mayoría no se usaron para fijar el umbral.
3. Los eventos internacionales de CIGRE verifican si la relación entre el indicador y la consecuencia se traslada fuera del sitio.

Por decisión de diseño, las entradas del modelo son solo variables meteorológicas de Open-Meteo. Las mediciones de las torres, los estudios de LatLon y los eventos sirven para construir y calibrar el modelo, no como entradas, porque las torres son puntos y no representan la línea (decisions/assets.md, "Entradas del modelo de clima").

La vigilancia (objetivo específico 7) se definió por diseño: se revisaron la práctica de la industria y el código de SAMPLT (Estado del Arte), y el autor aprobó el enfoque el 25 de noviembre de 2026. Su construcción se verifica en la aplicación, con criterios de aceptación en cada incremento.

## Criterio de evaluación

El modelo no se evalúa por acertar fallas. Se evalúa con tres preguntas:

1. En el sitio, ¿separa las horas en que el conductor se cargó de las horas de lluvia sin carga?
2. ¿El indicador crece con la consecuencia documentada? Se mide con la correlación de rangos de Spearman entre el hielo modelado y el nivel de consecuencia, y con la probabilidad de que un evento con daño físico tenga más hielo modelado que uno sin daño (AUC de daño).
3. ¿Con qué frecuencia señala cada estado? Un modelo que avisa casi cada vez que nieva, o casi nunca, no sirve para decidir.

\\newpage

## Fuentes de datos

| Fuente | Contenido | Período | Uso |
|------------------------------|------------------------------------------------------|----------------------|----------------------------|
| Open-Meteo, Historical Forecast API, ECMWF IFS 9 km | Temperatura, humedad, precipitación y viento a 10 y 100 m, horarios, bajados a la cota de cada torre | 2017 a 2026 en las torres 825 y 820; marzo a julio de 2026 en las seis torres instrumentadas | Entrada del modelo y calibración |
| Open-Meteo, Historical Forecast API, GFS 0,25° | Isoterma de 0 °C, temperatura y humedad a 925 y 850 hPa | Desde 2021 | Solo contraste del criterio de fase |
| Open-Meteo, Historical Forecast API, ECMWF IFS 9 km | Viento a 10 y 100 m, ráfaga y temperatura, horarios | 2017 a 2026, en las cinco celdas del IFS de las torres 809 a 863 | Traslado del viento |
| Open-Meteo, archivo histórico ERA5 | Mismas variables de superficie | Días de cada evento internacional | Traslado al mundo |
| Torres instrumentadas (803, 821, 825, 837, 843 y 892) | Temperatura, humedad, viento, temperatura del conductor e inclinación cada 30 min | 14-03 a 21-07-2026 | Etiquetas de carga y lluvia |
| LatLon, LAT-36-10-03-V5 | Viento T50 por torre a la altura del conductor (Tabla 8-2) | Explorador Eólico, 1980 a 2017 | Contraste del traslado del viento |
| Explorador Eólico (Ministerio de Energía; Departamento de Geofísica, Universidad de Chile) | Viento horario reconstruido con WRF a 1 km, de 5,5 a 180 m sobre el suelo | 1980 a 2017, en cada una de las 55 torres 809 a 863 | Traslado del viento |
| Planilla de estructuras de la línea | Vano viento, vano peso, flecha y tensión del conductor en seis casos de carga, y vano regulador, por estructura | Diseño de la línea | Utilización del cable y de la torre |
| Criterios de diseño (P1-LT-01-D100-V07 y P1-LT-01-D129-V0) | Hipótesis de carga, factores de sobrecarga, límites de tensión del conductor e hipótesis climáticas de la Zona I | Diseño de la línea | Utilización del cable y de la torre |
| Inventario de eventos (\`events.csv\`) | 10 episodios de Chile y 31 eventos del mundo, con su consecuencia | 1980 a 2026 | Contraste con la consecuencia |

: Fuentes de datos

Los datos del pronóstico son pronósticos pasados de las primeras horas de cada corrida, no reanálisis: son los que el modelo habría visto en operación. El servicio de Open-Meteo corrige la temperatura de la celda a la cota de la torre; el viento y la precipitación son los de la celda. Las 24 torres de la cresta entre la 817 y la 840 caen en una sola celda del IFS, y las 55 torres del tramo, en cinco.

## Herramientas

El modelo y la calibración son scripts del estudio, fuera de la aplicación, en \`working-papers/assets/threat-model/\`: \`threat-model.mjs\` (el modelo, con sus pruebas en \`threat-model.test.mjs\`), \`sensors.py\` (etiquetas de las torres), \`calibrate.mjs\` (calibración), \`wind-study.py\` (viento) y \`fetch-calibration.sh\` y \`fetch-wind.sh\` (descarga). La utilización y la cota inferior de la nieve fría se calculan con \`utilization.mjs\`, \`section-utilization.mjs\` y \`cold-bound.mjs\`, sobre el modelo de la aplicación. El detalle de cómo reproducir cada resultado está en el Anexo B. La vigilancia está en la aplicación, en el módulo de Activos, y corre el modelo aprobado (\`src/utilities/threat-model.js\`).

## Normas aplicadas

- Zona climática de cada estructura: la de la planilla de estructuras, asignada en el diseño de la línea con la NSEG 5 E.n.71: Zona I en La Dormida, de la 815 a la 860 (P1-LT-01-D129-V0, que la fijó para el trazado de 2013, Anexo E; P2-LT-01-I002-V5).
- Carga de hielo: el peso del manguito sobre el conductor (Pliego RPTD N°11, 5.21.1), con el peso específico del hielo de la norma de la línea: 1 en la NSEG 5 E.n.71, la de La Dormida.
- Presión de viento: la fórmula de la norma, q = 0,613 v², con la densidad del nivel del mar en la acumulación; en la carga de viento, con la densidad del aire de la cota y la temperatura de cada hora, la corrección por densidad de IEC 60826:2017, como hace LatLon (LAT-36-10-03-V5, §4.1).
- Utilización: tensión admitida del conductor de 50 % de su rotura (P1-LT-01-D100-V07, §6.1.4; P1-LT-01-D129-V0, cap. 5) y factor de sobrecarga de 1,5 para la hipótesis de viento máximo (P1-LT-01-D100-V07, Tablas 6.1 a 6.3). El factor de la hipótesis de hielo no se encontró en esos criterios.
- Ajuste de extremos: Gumbel por máximos anuales con corrección por tamaño de muestra (IEC 60826:2017, Anexo D).

## Supuestos y simplificaciones

Los supuestos que siguen se declaran donde empiezan a aplicar, en el Desarrollo; aquí se resumen:

1. Conductor de referencia de 30 mm de diámetro, el cilindro de ISO 12494, para la acumulación y para la carga de diseño. La carga real depende del conductor de cada línea: en La Dormida, cuatro ACAR 700 MCM de 24,43 mm por fase. La razón entre la masa modelada y la de diseño cambia poco con el diámetro (0,27 con 30 mm y con 24,43 mm el 4 y 5 de julio).
2. Velocidad de caída de la nieve húmeda de 1,7 m/s (Yuter et al., 2006, citado en Nygaard et al., 2013, sección 5b), el valor con que Nygaard et al. calibraron la adherencia que usa este modelo. Hasta la versión 0.4 de este informe se usó 1 m/s (Admirat, 2008); la razón del cambio está en Resultados, Utilización en las 46 torres del sector.
3. Viento perpendicular al conductor, sin azimut de la línea.
4. Para la acumulación, viento a la altura del conductor desde el de 100 m, con ley potencial de exponente 0,16: es el viento con que se calibró la nieve. Para la carga de viento, el viento trasladado a cada torre con el Explorador Eólico.
5. Deshielo: el manguito se reinicia tras 4 horas seguidas con 2 °C o más (criterio de LatLon, LAT-36-10-03-V5, §5.2).
6. Bulbo húmedo con la fórmula de Stull (2011), ajustada a la presión del nivel del mar; en la cresta, a unos 830 hPa, se acepta ese error.
7. Peso específico del hielo de diseño de 1 (1.000 kg/m³), el de la NSEG 5. Se tomó de copias de su texto y del Decreto 4188 de 1955 que la precedió (Ley Chile); falta contrastarlo con la publicación oficial de la norma.
8. Los archivos de las torres están en hora local (UTC−3 hasta el 4 de abril de 2026 y UTC−4 después) y se pasaron a UTC; los sensores de línea se usan desde el 14 de abril, cuando terminó su instalación.
9. El Explorador Eólico representa un promedio de unos 10 minutos (LAT-36-10-03-V5, §4.1); la NSEG 5 no declara el período del viento de diseño, y el del viento medido por las estaciones de las torres no está documentado. Las comparaciones con el diseño se hacen en presión.
10. El traslado por cuantiles supone que la distribución del viento de 1980 a 2017 representa la de 2017 a 2026. El Explorador no declara la zona horaria de sus horas; para comparar distribuciones no importa.
11. En la utilización, el cambio de estado es elástico y parabólico, y usa la rotura nominal del conductor: cerca de la rotura deja de valer. El vano peso es el de la condición diaria, porque la planilla no trae el de la hipótesis de hielo. El activo se supone sano.

# Desarrollo y Análisis

## Estructura del modelo

El modelo recorre la serie horaria de una estructura y, en cada hora, evalúa tres mecanismos: la nieve húmeda acumulada, el viento sobre el conductor desnudo y el viento sobre el conductor con hielo. Cada mecanismo da un estado y el estado de la hora es el mayor de los tres:

- Normal: no hay condición de riesgo.
- Propicia: hay condiciones de nieve húmeda, el manguito acumulado es de 1 mm o más, o la presión del viento llega al 60 % de la de diseño.
- Sobre diseño: la carga modelada supera la de diseño de la zona de la estructura.

Sin diseño conocido no hay comparación: si la norma no fija un valor (la Zona IV de la NSEG 5, por ejemplo) o la estructura no tiene zona, el estado llega a Propicia y el modelo entrega la magnitud. Si el diseño no considera hielo (espesor de 0 mm, como la Zona III), el umbral es el de 1 mm de hielo, el de materialidad que usa LatLon (LAT-36-10-03-V5, Tabla 8-1). El viento se evalúa solo donde la estructura tiene su tabla de traslado (Viento: traslado del pronóstico a la torre); sin ella, el estado es solo el de la nieve.

## Condición de nieve

Hay nieve que puede adherirse al conductor cuando hay precipitación y la temperatura de bulbo húmedo a 2 m no supera un umbral. La temperatura de bulbo húmedo se calcula con la temperatura y la humedad relativa del pronóstico mediante la fórmula de Stull (2011):

$$T_w = T \\arctan\\left[0{,}151977\\,(H + 8{,}313659)^{1/2}\\right] + \\arctan(T + H) - \\arctan(H - 1{,}676331) + 0{,}00391838\\,H^{3/2}\\arctan(0{,}023101\\,H) - 4{,}686035\\tag{1}$$

Donde:

- $T_w$: temperatura de bulbo húmedo, en °C;
- $T$: temperatura del aire a 2 m, en °C;
- $H$: humedad relativa a 2 m, en %, como número (por ejemplo, 95);
- los arcos tangentes se evalúan en radianes.

La fórmula vale para humedades de 5 a 99 % y temperaturas de −20 a 50 °C, con un error medio absoluto menor que 0,3 °C a la presión del nivel del mar (Stull, 2011). La condición horaria de nieve es:

$$P > 0 \\quad \\text{y} \\quad T_w \\leq T_{w,u}\\tag{2}$$

Donde:

- $P$: precipitación de la hora, en mm;
- $T_{w,u}$: umbral de bulbo húmedo, en °C; el valor calibrado es −0,3 °C (Calibración del umbral de fase, en esta sección).

La condición (2) no tiene cota inferior: también acumula con nieve fría, cuya adherencia es menor. El único episodio medido no permite fijar esa cota, y muestra que el pronóstico no la puede aplicar: en sus horas de nieve, el bulbo húmedo del pronóstico fue 2 °C más bajo que el medido (Resultados, Sensibilidad a la cota inferior de la nieve fría).

## Acumulación sobre el conductor

La masa que gana el conductor en cada hora con la condición (2) sigue el modelo cilíndrico de nieve húmeda de ISO 12494, en la forma que describe el Green Book de líneas aéreas (CIGRE, 2017, §7.3.4):

$$\\frac{dM}{dt} = \\beta \\, w \\, V \\, D\\tag{3}$$

$$w = \\frac{F}{v_s}\\tag{4}$$

$$V = \\sqrt{U^2 + v_s^2}\\tag{5}$$

$$\\beta = \\min\\left(1,\\; U^{-1/2}\\right)\\tag{6}$$

Donde:

- $M$: masa del depósito por metro de conductor, en kg/m;
- $t$: tiempo, en s;
- $\\beta$: eficiencia de adherencia, adimensional (Nygaard et al., 2013);
- $w$: concentración de nieve en el aire, en kg/m³;
- $F$: flujo de precipitación, en kg/(m² s); 1 mm de agua por hora equivale a $1/3600$ kg/(m² s);
- $v_s$: velocidad de caída de la nieve húmeda, 1,7 m/s;
- $V$: velocidad de impacto de los copos, en m/s;
- $U$: velocidad del viento perpendicular al conductor a su altura, en m/s;
- $D$: diámetro del conductor con el depósito, en m.

El viento a la altura del conductor se obtiene del viento a 100 m del pronóstico:

$$U = U_{100}\\left(\\frac{h_c}{100}\\right)^{0{,}16}\\tag{7}$$

Donde:

- $U_{100}$: velocidad del viento a 100 m, en m/s;
- $h_c$: altura del conductor sobre el suelo, en m.

Se usa el viento a 100 m porque el de 10 m del pronóstico subestima la cresta (Resultados, Viento). La densidad del depósito depende del viento, porque el viento compacta la nieve:

$$\\rho_s = \\min\\left(750,\\; 300 + 20\\,U\\right)\\tag{8}$$

Donde:

- $\\rho_s$: densidad de la nieve húmeda depositada, en kg/m³. Según Nygaard et al. (2013), la relación con constante de 300 kg/m³ sale de 13 casos de Japón (Admirat y Sakamoto, 1988), y con casos de Francia se recalibró a 200 kg/m³ (Admirat, 2008); la constante debe fijarse según las condiciones del lugar. El tope de 750 kg/m³ limita la compactación.

El modelo acumula la masa $M$ y el área de la sección del depósito $A_s$, que crece cada hora en $\\Delta M / \\rho_s$, de modo que la densidad media del manguito resulta del viento de cada hora. El espesor radial equivalente del depósito sobre el conductor de diámetro $D_0$ es:

$$e = \\frac{1}{2}\\left(\\sqrt{D_0^2 + \\frac{4\\,A_s}{\\pi}} - D_0\\right)\\tag{9}$$

Donde:

- $e$: espesor radial del depósito, en m;
- $A_s$: área de la sección del depósito, en m² (volumen por metro de conductor);
- $D_0$: diámetro del conductor sin depósito, 0,030 m.

Para un cilindro sin viento ($\\beta = 1$, $V = v_s$), la ecuación (3) se reduce a $dM/dt = F\\,D$: el conductor recibe la precipitación que cae sobre su proyección horizontal. Con 1 mm/h y densidad de 300 kg/m³, el diámetro crece linealmente y el espesor aumenta 1,06 mm por hora; en 24 horas son 25,5 mm. Las pruebas del modelo verifican ese caso calculado a mano.

El depósito se reinicia cuando la temperatura del aire es de 2 °C o más durante 4 horas seguidas.

## Comparación con el diseño

La norma define la carga de hielo como el peso del manguito sobre el conductor (Pliego RPTD N°11, 5.21.1), con un peso específico del hielo propio de cada norma: 1 en la NSEG 5 E.n.71 y 0,9 en el Pliego RPTD N°11 (5.10.6 e). La NSEG 5 lo expresa así para la Zona I: al peso del conductor se agrega el de una capa de hielo de 10 mm de espesor y peso específico 1, que forma un manguito uniforme alrededor del conductor. La masa de diseño por metro de conductor es:

$$m_d = \\rho_h\\,\\frac{\\pi}{4}\\left[(D_0 + 2\\,e_d)^2 - D_0^2\\right]\\tag{10}$$

Donde:

- $m_d$: masa del manguito de diseño, en kg/m;
- $\\rho_h$: densidad del hielo de diseño de la norma, en kg/m³ (1.000 en la NSEG 5);
- $e_d$: espesor de hielo de diseño de la zona, en m (0,010 m en la Zona I de la NSEG 5).

En la Zona I de la NSEG 5, $m_d$ = 1,257 kg/m sobre el conductor de 30 mm. El estado del mecanismo de nieve es Sobre diseño cuando $M > m_d$. Se compara la masa y no el espesor porque comparar espesores trata un manguito de nieve húmeda, de unos 400 kg/m³, como si pesara lo mismo que uno de hielo de 1.000 kg/m³: con 20 mm de nieve húmeda el conductor todavía no carga lo que 10 mm de hielo.

La presión del viento sobre el conductor es:

$$q = \\frac{\\rho_a\\,U^2}{2\\,g}\\tag{11}$$

Donde:

- $q$: presión dinámica del viento, en kgf/m²;
- $\\rho_a$: densidad del aire, en kg/m³: 1,225 en la acumulación y, en la carga de viento, la de la cota y la temperatura de la hora, ecuación (18);
- $g$: aceleración de gravedad, 9,80665 m/s².

Con la densidad del nivel del mar, los 60 kgf/m² de la Zona I equivalen a 30,98 m/s, la relación de la NSEG 5; en la cresta, a 1.648 m y 0 °C, equivalen a 33,3 m/s. El estado del viento es Propicia cuando $q$ llega al 60 % de la presión de diseño de la zona, y Sobre diseño cuando la supera. Con hielo de 1 mm o más, el estado del hielo con viento es Sobre diseño cuando la fuerza del viento por metro de conductor, $q\\,(D_0 + 2e)$, supera la de diseño, $q_{hd}\\,(D_0 + 2e_d)$, con $q_{hd}$ la presión de viento con hielo de la zona (20 kgf/m² en la Zona I).

## Etiquetas de las torres instrumentadas

Las torres miden la inclinación del conductor junto a la grapa. La inclinación cambia con la temperatura del conductor (dilatación) y con la carga. Para separar la carga, se ajusta en las horas secas (humedad bajo 80 %) una recta de la inclinación contra la temperatura del conductor:

$$\\theta = a + b\\,T_c + r\\tag{12}$$

Donde:

- $\\theta$: inclinación medida, en grados;
- $T_c$: temperatura del conductor, en °C;
- $a$, $b$: coeficientes de la recta ajustada en las horas secas;
- $r$: residuo, en grados, que se atribuye a la carga.

El residuo se normaliza por su desviación estándar en las horas secas, $\\sigma_r$: $z = r/\\sigma_r$. Una hora tiene carga cuando $z \\geq 4$ y la temperatura medida es de 2 °C o menos; esta segunda condición separa la carga de nieve de otras perturbaciones aisladas, como el agua de lluvias intensas. En la torre 825, $\\sigma_r$ = 0,038°. La inclinación de la torre 821 no se usa: su dispersión en horas secas es unas 200 veces la de la 825. Los pluviómetros tampoco se usan: torres vecinas acumularon entre 14 y 1.200 mm en el mismo período.

## Calibración del umbral de fase

El umbral se fija con la torre 825, la única con carga medida, y con las horas en que el pronóstico tiene precipitación de 0,1 mm o más. Las horas con carga del 4 y 5 de julio de 2026 tienen bulbo húmedo pronosticado entre −3,10 y −0,54 °C; las horas de lluvia sin carga de los demás episodios, de −0,11 °C hacia arriba. El umbral se toma en el punto medio del intervalo que separa ambos grupos, para dejar el mismo margen a cada lado:

$$T_{w,u} = \\frac{-0{,}54 + (-0{,}11)}{2} \\approx -0{,}3\\ ^{\\circ}\\mathrm{C}\\tag{13}$$

Cualquier umbral entre −0,54 y −0,11 °C separa los dos grupos en la torre 825. Las fallas no se usaron para elegirlo; la sensibilidad del resultado al umbral se analiza en la Discusión.

## Contraste con la consecuencia

Para cada episodio se toma el hielo máximo modelado en sus días, en la torre del evento, y se compara con el nivel de consecuencia del inventario con dos medidas. La primera es la correlación de rangos de Spearman. La segunda es la AUC de daño:

$$AUC = \\frac{1}{n_d\\,n_s}\\sum_{i \\in D}\\sum_{j \\in S}\\left[\\mathbb{1}(x_i > x_j) + \\tfrac{1}{2}\\,\\mathbb{1}(x_i = x_j)\\right]\\tag{14}$$

Donde:

- $D$, $S$: conjuntos de episodios con daño físico (nivel 2 o más) y sin daño (nivel 0 o 1);
- $n_d$, $n_s$: número de episodios de cada conjunto;
- $x_i$, $x_j$: hielo máximo modelado en cada episodio, en mm;
- $\\mathbb{1}(\\cdot)$: vale 1 si la condición se cumple y 0 si no.

La AUC es la probabilidad de que un episodio con daño tenga más hielo modelado que uno sin daño: 0,5 es el azar y 1, el orden perfecto. En Chile se usan los nueve episodios con fecha: dos fallas de nivel 2 y siete episodios sin consecuencia, cinco de ellos confirmados por el autor en los registros de operación (Anexo A). En el mundo se usan los 19 eventos con lugar y fecha suficientes, con ERA5 y sin diseño conocido.

## Frecuencia en los inviernos

El modelo se corre en continuo sobre la serie de 2017 a 2026 en las torres 825 (conductor a 16,2 m) y 820 (63,0 m), con la Zona I. Se cuentan los días de mayo a septiembre, en hora de Chile (UTC−4), con cada estado, y se ubica el día de cada falla entre los 1.530 días de invierno según su hielo máximo.

## Carga medida desde la inclinación

El aumento de inclinación del 4 y 5 de julio de 2026 en la torre 825 (0,78° sobre lo esperado por la temperatura del conductor) se convierte en carga por metro de subconductor con un modelo mecánico del tramo. La fase es de cuatro subconductores ACAR 700 MCM: 354,6 mm², 24,43 mm de diámetro, 0,976 kg/m, 71,8 kN de ruptura, módulo de elasticidad final de 6.100 kg/mm² y dilatación de $2{,}3 \\cdot 10^{-5}$ 1/°C (ficha de Sterlite). El sensor está en la fase inferior del vano 825–826, a 8,5 m de la torre en horizontal: 5,5 m de cadena de aislación y 3 m desde la grapa de retención. Ese vano es el primero del tramo 825–828, entre dos torres de anclaje, con suspensiones en las 826 y 827.

La tensión cambia con la temperatura y la carga de modo que el largo del conductor se conserve:

$$\\sum_i \\frac{S_i^3}{24}\\left(\\frac{w_i^2}{H^2} - \\frac{w_0^2}{H_0^2}\\right) = \\sum_i S_i\\left[\\frac{H - H_0}{E\\,A} + \\alpha\\,(T_c - T_0)\\right]\\tag{15}$$

Donde:

- $S_i$: largo del vano $i$ del tramo, en m;
- $w_i$: peso por metro del subconductor en el vano $i$, con su carga, en N/m; $w_0$, sin carga;
- $H$, $H_0$: tensión horizontal del tramo y la de la condición diaria (1.436 daN por subconductor, 20 % de la ruptura, a $T_0$ = 15 °C; planilla de la línea, caso LC #1), en N;
- $E\\,A$: rigidez axial del subconductor, en N;
- $\\alpha$: coeficiente de dilatación térmica, en 1/°C;
- $T_c$: temperatura del conductor, en °C.

Es la ecuación de cambio de estado de los criterios de diseño de la línea (P1-LT-01-D100-V07, §6.1.4) en forma parabólica, con vanos de carga distinta. Se calcula en dos casos extremos para las cadenas de suspensión: libres, con la misma tensión en todos los vanos del tramo, y fijas, con el vano del sensor como si estuviera anclado en sus dos extremos. La inclinación en el sensor sale de la catenaria de su vano, con constante $H/w_i$. El desnivel entre amarres es el del terreno más la diferencia de altura total de las torres, lo que supone la misma distancia de la cima a la fase inferior en todas.

El modelo se verifica con las torres 837 y 843, cuyos sensores están en vanos entre dos anclajes (836–837 y 842–843), donde el caso de las cadenas no importa. Sin carga, da 22,4° y 26,1° de inclinación a 15 °C, frente a 22,3° y 26,2° medidos, y una sensibilidad térmica de 0,013 y 0,014 °/°C, frente a 0,012 y 0,016 °/°C. En la torre 825 da 0,8° (medidos, 1,2°), y la sensibilidad térmica medida, 0,014 °/°C, cae entre la de cadenas libres (0,007) y la de cadenas fijas (0,037), a 0,23 del camino hacia las fijas. Esa fracción se usa para interpolar la carga entre los dos casos.

La carga que explica los 0,78° depende también de cuántos vanos del tramo se cargaron, porque si todo el tramo se carga, la tensión sube casi en proporción y la forma de la catenaria cambia poco. La torre 837, a 1.548 m, no registró carga, así que la línea de nieve estuvo entre 1.548 y 1.648 m.

## Viento: traslado del pronóstico a la torre

El pronóstico no resuelve la exposición de cada torre en la cresta: las 55 torres del tramo comparten cinco celdas del IFS, y el viento de una celda es el mismo para todas sus torres. Una primera versión trasladó el viento con un factor de sitio constante, la razón entre el viento de 50 años de LatLon en cada torre y el del pronóstico en su celda. En los extremos calza por construcción, pero en el resto del rango no: en la torre 825, el percentil 99 del pronóstico a 100 m multiplicado por su factor (3,3) da 20 m/s, frente a 5,4 m/s medidos. La relación entre la celda y la cresta cambia con la intensidad del viento, y el nivel Propicia depende justamente de la parte media del rango.

El traslado usa toda la distribución. La fuente del lado de la torre es el Explorador Eólico, la simulación del modelo WRF a 1 km del Ministerio de Energía, reconstruida hora a hora de 1980 a 2017 (Ministerio de Energía, 2018); es la misma fuente de los vientos de 50 años de LatLon. Se bajó la serie en las coordenadas de cada una de las 55 torres, en los dos niveles que encierran la altura de su conductor, y se interpoló entre ellos:

$$U_s(h_c) = U_1 + (U_2 - U_1)\\,\\frac{\\ln(h_c/h_1)}{\\ln(h_2/h_1)}\\tag{16}$$

Donde:

- $U_s(h_c)$: viento de la torre a la altura del conductor, en m/s;
- $h_c$: altura del conductor sobre el suelo, la distancia mínima de la planilla de diseño, en m;
- $h_1$, $h_2$: niveles del Explorador que encierran $h_c$, de 5,5 a 180 m, en m;
- $U_1$, $U_2$: viento del Explorador en esos niveles, en m/s.

El viento del pronóstico a 100 m se traslada a la torre igualando probabilidades de no excedencia, el método de mapeo por cuantiles (Panofsky y Brier, 1968; Themeßl et al., 2011):

$$U_t = F_s^{-1}\\left(F_p(U_{100})\\right)\\tag{17}$$

Donde:

- $U_t$: viento trasladado de la torre a la altura del conductor, en m/s;
- $U_{100}$: viento del pronóstico a 100 m en la celda de la torre, en m/s;
- $F_p$: distribución empírica del viento del pronóstico en la celda, de 2017 a 2026;
- $F_s^{-1}$: cuantil del viento de la torre del Explorador, de 1980 a 2017, con la ecuación (16).

Las probabilidades se asignan con la posición de Weibull, $k/(n+1)$: el máximo del pronóstico, de unos 10 años, se iguala con el cuantil de la misma probabilidad del Explorador, de 38 años, y no con su máximo. Sobre el máximo del pronóstico, el viento se traslada con la razón del último par. La aplicación guarda, por torre, la tabla de pares simplificada con el algoritmo de Douglas y Peucker (1973), con un error de 0,1 m/s como máximo frente a la tabla completa: de 14 a 42 pares por torre. La tabla simplificada da los mismos días sobre el diseño que la completa, y a lo más un día distinto sobre el 60 % en cuatro torres.

La presión se calcula con la ecuación (11) y la densidad del aire de la cota y la temperatura de cada hora:

$$\\rho_a = \\frac{p_0\\,(1 - 2{,}25577 \\cdot 10^{-5}\\,z)^{5{,}25588}}{R_d\\,(T + 273{,}15)}\\tag{18}$$

Donde:

- $\\rho_a$: densidad del aire, en kg/m³;
- $p_0$: presión de la atmósfera estándar al nivel del mar, 101.325 Pa;
- $z$: cota de la torre, en m;
- $R_d$: constante del aire seco, 287,05 J/(kg·K);
- $T$: temperatura del aire a 2 m del pronóstico, en °C.

Para contrastar la fuente con LatLon, el viento de 50 años de cada torre se calcula con el ajuste de Gumbel por máximos anuales de IEC 60826:2017, Anexo D:

$$V_T = \\bar{x} + \\frac{s}{C_1}\\left(y_T - C_2\\right), \\qquad y_T = -\\ln\\left[-\\ln\\left(1 - \\frac{1}{T}\\right)\\right]\\tag{19}$$

Donde:

- $V_T$: viento de período de retorno $T$, en m/s;
- $\\bar{x}$, $s$: media y desviación estándar de los máximos anuales, en m/s;
- $C_1$, $C_2$: coeficientes de corrección por tamaño de muestra; con los 38 años del Explorador, 1,1362 y 0,5423, interpolados entre 35 y 40 años;
- $T$: período de retorno, 50 años.

El nivel Propicia del viento se fija por frecuencia: se cuentan los días de 2017 a 2026 en que la presión trasladada pasa el 50, 60, 70 y 80 % de la presión de diseño de la zona, y se elige el umbral con esos números.

## Vigilancia de la red

El modelo da un estado por estructura y por hora. La vigilancia define cómo lo usa la aplicación en operación, con el enfoque que aprobó el autor el 25 de noviembre de 2026 a partir de la práctica de la industria y de las lecciones de SAMPLT (Estado del Arte; decisions/assets.md, "Vigilancia de amenazas"):

1. Vigilar en vez de consultar. Se define qué vigilar, y la aplicación mantiene su pronóstico al día con cada corrida del IFS y lo guarda.
2. Episodios en vez de estructuras sueltas. Las estructuras contiguas y las horas seguidas en Propicia o Sobre diseño forman un episodio, con su tramo, su inicio, su fin, su plazo, su mecanismo y su máximo frente al diseño.
3. Certeza explícita, con el plazo y la coherencia entre corridas. El IFS es horario hasta las 90 horas, cada 3 horas hasta las 144 y cada 6 horas después (Open-Meteo, ECMWF API), y sus corridas consecutivas saltan (Zsótér et al., 2009). Por eso cada episodio dice qué cambió frente a la corrida anterior consultada: si es nuevo, se mantiene, empeora o mejora, según su estado, sin umbrales dentro de un mismo estado. El viento trasladado a la torre se declara como cota alta: un episodio que solo se debe al viento, o al hielo con viento, lleva esa marca, porque frente a los anemómetros el traslado coincide en tres de seis torres, da entre 1,8 y 3,3 veces en las otras y no da de menos en ninguna (Resultados, Contraste del Explorador con los anemómetros).
4. Riesgo, no solo amenaza: la amenaza se combina con la condición del activo y su criticidad (decisions/assets.md, "Requisitos: RPTD N°17"). El modelo de amenaza sigue midiendo contra el diseño.
5. Acciones según el riesgo y el plazo, definidas por la organización, y un boletín por corrida.
6. El modelo rinde cuentas: qué eventos señaló, con cuánta anticipación y cuántos días por invierno pasa en cada estado.

Lo que pidió el autor el 24 de noviembre de 2026 (una línea completa o un tramo, un horizonte de 72 horas o más, y pronóstico o histórico) se mantiene, como definición de qué vigilar y como consulta puntual.

La primera versión vigila una línea o un tramo entre dos estructuras, con un horizonte de 1, 3, 7, 10 o 15 días y la corrida vigente del IFS. La consulta sigue las lecciones de SAMPLT: una ubicación por estructura con su cota, lotes de hasta 100 ubicaciones con un límite de 500 por minuto, cuatro variables y el costo a la vista antes de consultar. Lo consultado se guarda por corrida, y una estructura no se vuelve a consultar mientras su corrida siga vigente. Los episodios son los componentes conexos de la grilla de estructuras por horas en Propicia o Sobre diseño, en la que son vecinas la estructura contigua y la hora contigua, y se dibujan en un diagrama de las estructuras a lo largo de la línea contra las horas (Hovmöller, 1949). La evidencia de una estructura vuelve a correr el modelo con su serie guardada, sin otra consulta. Los incrementos siguientes se eligen después de probar cada uno (Siguientes Pasos).

## Utilización del cable y de la torre

Los estados del modelo comparan la carga meteorológica con la hipótesis climática de la zona, que es la carga que la norma manda suponer al calcular, sin factores de seguridad. Pasar esa hipótesis no dice qué elemento está comprometido ni cuánto margen le queda, porque el cable y la torre tienen márgenes distintos. Para que el resultado sirva para decidir, se calcula cuánto usa cada elemento de su capacidad, con los datos de diseño de la línea: la planilla de estructuras y los criterios de diseño (P1-LT-01-D100-V07, §6.1.4 y §6.1.5; P1-LT-01-D129-V0, Tabla 4.4).

El cálculo supone el activo sano, como salió del diseño. Su condición previa (desgaste, defectos de fabricación o de montaje) no está en las entradas del modelo ni puede estarlo (Discusión, Amenaza y condición del activo).

La carga por metro de subconductor combina el peso propio, el del manguito y el viento sobre el conductor con manguito:

$$p = \\sqrt{(w_c + w_h)^2 + (q\\,D)^2}\\tag{20}$$

Donde:

- $p$: carga resultante por metro de subconductor, en daN/m;
- $w_c$: peso del conductor, en daN/m;
- $w_h$: peso del manguito, en daN/m, de la masa que acumula el modelo;
- $q$: presión del viento de la torre, en daN/m²;
- $D$: diámetro del conductor con el manguito, en m.

La tensión horizontal del cable en cada hora sale de la ecuación de cambio de estado en el vano regulador de la estructura (forma parabólica; P1-LT-01-D100-V07, §6.1.4), desde la condición diaria de la planilla, a 15 °C y sin viento:

$$H_2^2\\left[H_2 - H_1 + \\frac{E A\\,p_1^2\\,a_r^2}{24\\,H_1^2} + E A\\,\\alpha\\,(t_2 - t_1)\\right] = \\frac{E A\\,p_2^2\\,a_r^2}{24}\\tag{21}$$

Donde:

- $H_1$ y $H_2$: tensión horizontal en la condición diaria y en la hora evaluada, en daN;
- $p_1$ y $p_2$: carga resultante por metro en esas dos condiciones, en daN/m, con la ecuación (20);
- $t_1$ y $t_2$: temperatura en esas dos condiciones, en °C;
- $a_r$: vano regulador, en m;
- $E A$: rigidez axial final del conductor, en daN;
- $\\alpha$: coeficiente de dilatación lineal, en 1/°C.

La utilización del cable es la razón entre esa tensión y la de rotura:

$$u_c = \\frac{H_2}{T_r}\\tag{22}$$

Donde:

- $u_c$: utilización del cable, adimensional;
- $T_r$: tensión de rotura del conductor, en daN.

El diseño admite $u_c$ de hasta 0,5 (P1-LT-01-D100-V07, §6.1.4; P1-LT-01-D129-V0, cap. 5). Un valor de $u_c$ sobre 0,5 dice que el cable pasó su tensión admitida; un valor cercano a 1, que se acerca a su rotura.

Las cargas que el conductor entrega a la torre, por subconductor, son la transversal y la vertical:

$$F_t = a_v\\,q\\,D\\tag{23}$$

$$F_v = a_p\\,(w_c + w_h)\\tag{24}$$

Donde:

- $F_t$ y $F_v$: carga transversal y carga vertical, en daN;
- $a_v$: vano viento de la estructura, en m;
- $a_p$: vano peso de la estructura, en m.

Cada una se divide por la misma carga en la hipótesis de diseño que la gobierna: la transversal, por la de viento máximo (58,86 daN/m² sobre el conductor desnudo); la vertical, por la de hielo con viento (10 mm de hielo de 0,981 daN/dm³). El resultado es la fracción de la hipótesis que se usa. La torre debe resistir, sin deformación permanente, la hipótesis de viento máximo multiplicada por un factor de sobrecarga de 1,5 (P1-LT-01-D100-V07, Tablas 6.1 a 6.3): una carga transversal de hasta 1,5 veces la de la hipótesis sigue dentro de lo que la torre debe resistir.

El método se comprobó contra la planilla de diseño. En las torres 819, 820, 821 y 825, la ecuación (21) reproduce las tensiones de los casos de temperatura máxima, viento máximo y viento medio con 1 a 2 % de diferencia.

Los datos del conductor son los del ACAR 700 MCM: 24,43 mm de diámetro, 0,976 kg/m, 354,6 mm², módulo final de 6.100 kg/mm², $\\alpha$ de $2{,}3 \\times 10^{-5}$ 1/°C y rotura de 7.180 daN. La acumulación se corre sobre ese diámetro y no sobre el cilindro de referencia de 30 mm.

## Estados por la tensión del cable

El estado Sobre diseño compara la carga con la hipótesis climática de la zona, y no dice qué elemento se compromete. Donde se conocen los datos del cable, la aplicación lo reemplaza por dos estados que salen de la ecuación (21): la tensión horizontal de cada hora, con el manguito, el viento de la torre y la temperatura, sobre la rotura del conductor.

| Estado | Condición | Fundamento |
|----------------------|--------------------------------|--------------------------------|
| Normal | Sin manguito, viento bajo el 60 % de su presión de diseño y cable bajo el 50 % de su rotura | |
| Propicia | Manguito de 1 mm o más, o viento desde el 60 % de su presión de diseño, con el cable bajo el 50 % | Calibración de la fase |
| Sobre el límite de diseño | Cable sobre el 50 % de su rotura | Pliego RPTD N°11, 5.10.2; criterio de diseño de la línea (P1-LT-01-D129-V0, cap. 5) |
| Sobre el límite con hielo | Cable sobre el 70 % de su rotura | Pliego RPTD N°11, 5.10.3 |

: Estados del modelo donde se conocen los datos del cable

Los datos que exige son el conductor de la línea (diámetro, peso, sección, módulo de elasticidad, coeficiente de dilatación y rotura) y, por estructura, el vano regulador y la tensión diaria. La acumulación se calcula ahí sobre el conductor real. Donde faltan, el estado sigue siendo Sobre diseño. La torre no tiene todavía un estado propio: su capacidad sale de los árboles de carga, que están por conseguirse.

## Cota inferior para la nieve fría

El criterio de fase calibrado no tiene cota inferior: toda precipitación con bulbo húmedo de −0,3 °C o menos acumula, también la nieve seca de las horas más frías, que según la literatura no se adhiere con viento (Estado del Arte, Desprendimiento y tamaño del manguito de nieve húmeda). Para medir cuánto pesa ese supuesto, el modelo se corrió con una cota inferior $T_{w,i}$ del bulbo húmedo pronosticado, bajo la cual no hay acreción, con cuatro valores: −3,1, −2,5, −1,7 y −1,0 °C.

La cota no se ajusta a un valor único. Se informa el rango entre el modelo sin cota, que es la cota alta del manguito, y el modelo con la cota inferior más exigente que todavía respeta el único episodio medido, que es la cota baja.

# Resultados

## Temperatura del pronóstico en la cresta

| Torre (cota) | Todas las horas | Horas con precipitación | Con precipitación y pronóstico de 3 °C o menos |
|------------------|----------------------|----------------------|------------------------------|
| 825 (1.648 m) | −3,1 (3,3) | −0,7 (1,2) | −0,8 (1,0) |
| 837 (1.548 m) | −2,6 (2,9) | −0,4 (0,8) | −0,1 (0,6) |
| 821 (1.549 m) | −3,6 (4,0) | −0,7 (1,8) | −0,9 (1,6) |
| 843 (1.117 m) | −2,4 (2,7) | −0,6 (1,2) | sin horas suficientes |

: Temperatura del pronóstico menos la medida, en °C, con el error medio absoluto entre paréntesis (14-04 a 21-07-2026)

Con tiempo seco el pronóstico queda de 2 a 4 °C más frío que la cresta, por las inversiones térmicas nocturnas que la celda no resuelve. Con precipitación, el aire se mezcla y la diferencia baja a menos de 1 °C. Ese error, con precipitación, es del tamaño de la ventana de 0 a 2 °C de Admirat: con la temperatura del aire del pronóstico, una hora de lluvia a 1,5 °C y una de nieve húmeda a 0,5 °C no se distinguen.

## Separación de la nieve y la lluvia en la cresta

| Episodio (2026) | Horas con carga | Temperatura del pronóstico | Bulbo húmedo del pronóstico | Isoterma de 0 °C sobre la torre | Temperatura medida |
|----------------|--------|------------------|------------------|------------------|------------------|
| 4 y 5 de julio | 9 | −1,7 a 1,8 °C | −3,1 a −0,5 °C | 72 a 352 m | 0,2 a 1,0 °C |
| 20 y 21 de julio | 0 | 0,1 a 4,0 °C | −0,1 a 2,8 °C | 132 a 632 m | 1,1 a 4,0 °C |
| 16 al 18 de julio | 0 | 1,5 a 4,9 °C | 0,7 a 3,9 °C | 312 a 932 m | 2,3 a 6,0 °C |
| 10 de junio | 0 | 1,2 a 4,5 °C | 0,2 a 3,3 °C | 262 a 632 m | 2,0 a 5,2 °C |

: Torre 825, horas con precipitación pronosticada de 0,1 mm o más

La temperatura del aire del pronóstico y la isoterma de 0 °C del GFS se traslapan entre el episodio con carga y los de lluvia. El bulbo húmedo no: las horas con carga quedan en −0,5 °C o menos y las de lluvia, en −0,1 °C o más (Figura 1). El 4 y 5 de julio el aire era más seco (humedad pronosticada de 54 a 97 %, frente a 84 a 100 % en la lluvia del 20 y 21 de julio), y en aire más seco el copo se enfría al evaporarse y llega sin fundirse. Es el mecanismo que describen Ding et al. (2014) y Jennings et al. (2018).

![Temperatura del aire y bulbo húmedo del pronóstico en las horas con precipitación de la torre 825, en el episodio con carga medida y en las lluvias sin carga (2026). La franja gris es la ventana de 0 a 2 °C de Admirat; la línea punteada, el umbral de −0,3 °C.](figures/wet-bulb-separation.png)

En la cresta, el episodio del 4 y 5 de julio fue nieve húmeda y no hielo en nube, como se había interpretado con el reanálisis ERA5. El pronóstico da de 0,2 a 1,6 mm/h esas horas, frente a 0 a 0,3 mm/h de ERA5, y la temperatura medida (0,2 a 1,0 °C) cae en la ventana de Admirat. Además, la cresta no bajó de 0 °C entre abril y julio de 2026 (mínima de 0,2 °C en la torre 825), y sin aire bajo 0 °C no hay gotas sobreenfriadas que formen hielo en nube.

| Criterio | Carga del 4 y 5 de julio | Lluvia del 10 de junio | Lluvia del 16 al 18 de julio | Lluvia del 20 y 21 de julio |
|----------------------------------|----------|----------|----------|----------|
| Admirat con el pronóstico (0 a 2 °C) | 2,2 | 2,7 | 0,6 | 38,8 |
| Bulbo húmedo de −0,3 °C o menos | 8,1 | 0 | 0 | 0 |
| Bulbo húmedo de 0 °C o menos | 8,1 | 0 | 0 | 4,8 |
| Bulbo húmedo de 0,5 °C o menos | 8,1 | 2,7 | 0 | 19,4 |

: Manguito máximo modelado en la torre 825, en mm

Con el criterio de Admirat, el modelo acumula 39 mm en la lluvia del 20 y 21 de julio y apenas 2 mm en el único episodio con carga. Con el bulbo húmedo de −0,3 °C, el resultado se invierte: 8,1 mm con carga y nada en las tres lluvias.

En la torre 837, 100 m más abajo, el mismo criterio da 6,5 mm el 4 y 5 de julio, y su conductor no registró carga (de 3,7 a 7,9 mm con umbrales de −0,5 a 0,5 °C). El pronóstico baja la temperatura a la cota de cada torre, pero no ubica el límite de la nieve entre los 1.548 y los 1.648 m.

## Episodios de Chile

| Episodio | Nivel | Torre | Admirat con el pronóstico | Bulbo húmedo de −0,3 °C o menos |
|----------------------------------|--------|--------|------------------|------------------|
| CL-01, 14-07-2022 | 2 | 825 | 8,7 / 0,42 | 26,7 / 1,71 |
| CL-02, 16-06-2025 | 2 | 820 | 2,0 / 0,07 | 33,3 / 2,52 |
| CL-05, 21 al 23-06-2024 | 0 | 825 | 53,5 / 4,89 | 38,5 / 2,89 |
| CL-03, 4 y 5-07-2026 | 0 | 825 | 2,2 / 0,08 | 8,1 / 0,34 |
| CL-07, 9 al 11-07-2022 | 0 | 825 | 29,6 / 2,01 | 7,5 / 0,29 |
| CL-08, 02-08-2024 | 0 | 825 | 10,4 / 0,48 | 4,9 / 0,20 |
| CL-06, 4 y 5-07-2020 | 0 | 825 | 43,1 / 3,43 | 1,3 / 0,04 |
| CL-09, 12-06-2025 | 0 | 820 | 0 / 0 | 0 / 0 |
| CL-10, 20 y 21-07-2026 | 0 | 825 | 38,8 / 2,87 | 0 / 0 |

: Manguito máximo en los días de cada episodio, en mm y kg/m

| Criterio | Spearman | AUC de daño |
|------------------------------------------|----------|----------|
| Admirat con ERA5 | −0,31 | 0,29 |
| Admirat con el pronóstico | −0,41 | 0,21 |
| Bulbo húmedo de −0,5 °C o menos | 0,73 | 1,00 |
| Bulbo húmedo de −0,3 °C o menos | 0,52 | 0,86 |
| Bulbo húmedo de 0 °C o menos | 0,52 | 0,86 |
| Bulbo húmedo de 0,5 °C o menos | 0,52 | 0,86 |

: Hielo modelado frente a la consecuencia, nueve episodios de Chile

Con Admirat, la relación está invertida: los episodios sin consecuencia tienen más hielo que las fallas, y el pronóstico no lo corrige respecto de ERA5 (Figura 2). El problema era el criterio, no la fuente. Con el bulbo húmedo, las dos fallas quedan entre los tres episodios con más hielo con cualquier umbral entre −0,5 y 0,5 °C. La tabla usa el máximo de los días de cada episodio; a la hora de cada falla, el modelo estaba así:

| Falla (hora local) | Estado | Manguito |
|------------------|--------------|--------------|
| CL-01, 14-07-2022, 00:30 | Normal | 0 |
| CL-01, 14-07-2022, 05:17 | Propicia | 7,0 mm; 0,31 kg/m |
| CL-02, 16-06-2025, 08:45 | Sobre diseño | 29,5 mm; 2,09 kg/m |
| CL-02, 16-06-2025, 11:15 | Sobre diseño | 33,3 mm; 2,52 kg/m |

: Estado del modelo a la hora de cada falla, bulbo húmedo de −0,3 °C o menos

En 2022, la primera falla ocurrió antes de que el modelo acumulara hielo y la segunda con un cuarto de la masa de diseño; el estado Sobre diseño llegó más tarde en el episodio. Es consistente con la causa raíz: subconductores con el 13,6 % y el 23,9 % de su capacidad mecánica se cortan con poca o ninguna carga (W-0016, §4.1). En 2025, las dos fallas ocurrieron con el modelo Sobre diseño. Siete de los nueve episodios no se usaron para fijar el umbral; CL-03 y CL-10 son los de las torres.

![Masa máxima modelada en los días de cada episodio de Chile, con el criterio de Admirat y con el de bulbo húmedo. La línea punteada es la masa del manguito de diseño de la Zona I (1,26 kg/m).](figures/chile-episodes-ice.png)

## Traslado a los eventos internacionales

| Criterio (con ERA5) | Spearman | AUC de daño |
|--------------------------------------|----------|----------|
| Admirat | 0,52 | 0,80 |
| Bulbo húmedo de −0,5 °C o menos | 0,59 | 0,82 |
| Bulbo húmedo de −0,3 °C o menos | 0,57 | 0,80 |
| Bulbo húmedo de 0 °C o menos | 0,56 | 0,81 |
| Bulbo húmedo de 0,5 °C o menos | 0,57 | 0,89 |
| Bulbo húmedo de 1 °C o menos | 0,55 | 0,86 |

: Hielo modelado frente a la consecuencia, 19 eventos internacionales (14 con daño físico)

El bulbo húmedo iguala o mejora a Admirat también en el mundo, con cualquier umbral. Pero el umbral que mejor rinde con ERA5 en el mundo está cerca de 0,5 °C, no en −0,3 °C. Con −0,3 °C se pierden casos de nieve húmeda tibia: el Reino Unido en 1990 (MU-02) queda con 0 mm, y con 0,5 °C, con 22,5 mm. Sin cota inferior, el criterio también acumula en tormentas frías: la lluvia engelante de Quebec en 1998 (MU-01) llega a 113 mm con −0,3 °C, y MU-08, en Islandia, a 90 mm.

## Magnitud en el episodio medido

| Caso | Carga |
|----------------------------------------------------------------------|----------|
| Cadenas libres, todo el tramo 825–828 cargado | 4,56 |
| Cadenas libres, vanos sobre 1.550 m cargados (825–826 y 826–827) | 0,25 |
| Cadenas libres, solo el vano 825–826 cargado (línea de nieve sobre 1.600 m) | 0,23 |
| Cadenas fijas, vano 825–826 cargado | 0,75 |
| Estimación central, interpolada con la sensibilidad térmica medida | 0,35 |
| Modelo de amenaza sobre el ACAR 700 (0,34 sobre el cilindro de 30 mm) | 0,29 |

: Carga adicional por metro de subconductor que explica 0,78° en la torre 825 (vano hacia la 826), en kg/m

Cargar todo el tramo exigiría de 3,8 a 4,6 kg/m y contradice la falta de carga en la torre 837. Con la línea de nieve que indica la 837, la carga medida está entre 0,23 y 0,75 kg/m, con una estimación central de 0,35 kg/m. El modelo, con 0,29 kg/m, cae dentro del rango y queda alrededor de 17 % bajo la estimación central: acierta el orden de magnitud en el único episodio medido.

## Frecuencia en diez inviernos

| Torre | Propicia o más | Sobre diseño, en masa | Sobre diseño, si se comparara el espesor | Día de la falla |
|--------|------------|------------|------------|----------------------------------------|
| 825 | 12,0 | 1,9 | 3,0 | 14-07-2022: 26,7 mm y 1,71 kg/m, puesto 19 de 1.530 días |
| 820 | 6,3 | 1,1 | 1,8 | 16-06-2025: 33,3 mm y 2,52 kg/m, puesto 4 de 1.530 días |

: Días por invierno en cada estado, mayo a septiembre de 2017 a 2026, bulbo húmedo de −0,3 °C o menos

Comparar en masa reduce los días Sobre diseño en la torre 825 de 3,0 a 1,9 por invierno. En diez inviernos, la torre 825 tiene 52 episodios con manguito de 1 mm o más, 11 sobre 10 mm y 6 de 30 a 52 mm: agosto de 2017, junio de 2018, julio de 2022 (la falla), junio de 2024 (CL-05), junio de 2025 (la tormenta de CL-02) y agosto de 2025.

## Viento

El método anterior, con el viento a 100 m llevado a la altura del conductor con exponente 0,16 y la densidad del nivel del mar, no llega al 50 % de la presión de diseño en ninguna de las 55 torres entre 2017 y 2026: no ve el viento de la cresta.

El Explorador, en la ubicación de cada torre y con la ecuación (19), reproduce dentro del 5 % el viento de 50 años de LatLon en 21 de las 55 torres, y difiere en más del 20 % en 11, hasta un 42 %. LatLon agrupó las 55 torres en 14 celdas y dio a cada grupo el valor de un punto (LAT-36-10-03-V5, Tabla 4-1). El viento cambia mucho en un kilómetro, como advierte el propio informe de LatLon, así que el traslado usa la serie de cada torre.

| Torre | Medido | Trasladado | Pronóstico a 100 m | Máximo del 15 y 16-07-2026: medido, trasladado y pronóstico |
|--------|----------------------|----------------------|----------------------|------------------------|
| 821 | 1,4 / 3,4 / 5,9 / 8,3 | 2,6 / 5,1 / 8,5 / 17,9 | 1,4 / 2,5 / 3,6 / 5,2 | Sin medición |
| 825 | 1,7 / 3,3 / 5,4 / 9,3 | 2,6 / 5,8 / 19,3 / 25,5 | 1,5 / 3,0 / 6,1 / 8,7 | 6,5 / 25,5 / 8,7 |
| 837 | 1,9 / 6,7 / 14,3 / 17,9 | 2,6 / 6,4 / 19,2 / 22,8 | 1,7 / 3,6 / 7,3 / 8,7 | 16,2 / 22,8 / 8,7 |
| 843 | 0,8 / 2,1 / 6,7 / 11,9 | 1,5 / 3,3 / 10,0 / 14,7 | 1,4 / 3,0 / 5,9 / 8,8 | 10,8 / 14,7 / 8,8 |

: Viento medido, trasladado y del pronóstico en las torres instrumentadas: mediana, percentiles 90 y 99 y máximo, en m/s (14-04 a 21-07-2026)

Frente a los anemómetros, el traslado da de más, y el pronóstico sin trasladar da de menos en las torres expuestas. En los dos días de más viento del período, el 15 y 16 de julio de 2026, el traslado da 1,4 veces el máximo medido en las torres 837 y 843, el doble en presión, y 3,9 veces en la 825; el pronóstico a 100 m da la mitad del medido en la 837. La correlación horaria del traslado con lo medido va de 0,19 en la torre 821 a 0,75 en la 837.

| Umbral, fracción de la presión de diseño | Días por año, promedio de las 55 torres | Máximo y torre | Torres con 1 día o más por año |
|------------|--------------|--------------|------------|
| 50 % | 1,6 | 8,1 (862) | 27 |
| 60 % | 0,8 | 5,2 (862) | 10 |
| 70 % | 0,4 | 2,6 (862) | 8 |
| 80 % | 0,2 | 1,2 (831) | 5 |
| 100 % | 0,03 | 0,5 (862) | 0 |

: Días por año con la presión trasladada sobre cada fracción de la presión de diseño (2017 a 2026)

La presión trasladada supera la de diseño en 8 torres. En siete de ellas (826, 828, 830, 831, 832, 836 y 857) ocurre el 22 de agosto de 2023, el 2 de agosto de 2024 o ambos días; la 862, de Zona III, la supera además el 26 de abril de 2022, el 18 de junio de 2024 y el 15 de julio de 2026. El día de más presión es el 22 de agosto de 2023, con 1,29 veces la de diseño en la torre 828. El 2 de agosto de 2024 es el episodio CL-08, sin eventos en la línea. Con el umbral del 60 %, el viento es Propicia 0,8 días por año en promedio y hasta 5,2 en la torre más expuesta.

La densidad de la cota baja la presión entre 9 y 17 %: su media es de 1,017 kg/m³ en la torre 825, a 1.648 m, y de 1,110 kg/m³ en la 863, a 792 m.

## Contraste del Explorador con los anemómetros

El Explorador Eólico (1980 a 2017) y los anemómetros (2026) no se traslapan, así que se comparan sus distribuciones. Para cada una de las seis torres instrumentadas se tomaron, en cada uno de los 38 años, las horas de los mismos días del calendario en que el anemómetro tiene datos, y se calcularon la mediana, los percentiles 90 y 99 y el máximo. El Explorador se tomó a la distancia entre el cable y el suelo que da la planilla de estructuras para cada torre; la altura de la estación sobre el terreno no está documentada.

| Torre | Días medidos | Medido en 2026: mediana, percentil 99 y máximo (m/s) | Explorador, mediana de 38 años (m/s) | Explorador sobre lo medido | Años del Explorador bajo lo medido, en el percentil 99 |
|------|------|------------------|------------------|------------------|------------------|
| 803 | 102 | 1,1; 4,2; 6,5 | 1,9; 7,8; 11,7 | 1,8; 1,9; 1,8 veces | 0 de 38 |
| 821 | 67 | 1,3; 6,1; 8,3 | 4,3; 18,2; 23,4 | 3,3; 3,0; 2,8 veces | 0 de 38 |
| 825 | 104 | 1,7; 5,3; 9,3 | 4,1; 17,2; 22,8 | 2,4; 3,2; 2,5 veces | 0 de 38 |
| 837 | 50 | 1,9; 14,1; 17,9 | 2,6; 12,5; 15,9 | 1,3; 0,9; 0,9 veces | 26 de 38 |
| 843 | 110 | 0,8; 5,9; 11,9 | 1,9; 8,6; 12,0 | 2,3; 1,5; 1,0 veces | 1 de 38 |
| 892 | 119 | 0,9; 6,1; 10,1 | 1,4; 6,0; 8,7 | 1,5; 1,0; 0,9 veces | 21 de 38 |

: Viento medido en 2026 frente al del Explorador Eólico en los mismos días del calendario, a la altura del conductor

El año 2026 no fue calmo: en esos días, el pronóstico a 100 m da entre 0,91 y 1,40 veces la mediana de los nueve años anteriores, según la celda y el estadístico.

El resultado no es uniforme. En las torres 837 y 892, el Explorador coincide con lo medido en el percentil 99 y en el máximo, y en la 843, en el máximo. En la torre 803 da 1,8 a 1,9 veces lo medido, y en las torres 821 y 825, entre 2,4 y 3,3 veces; en esas tres, ninguno de los 38 años baja hasta el nivel medido. En ninguna torre el Explorador queda bajo el máximo medido por más de un 10 %. La diferencia no sigue la cota: la torre 837 está en la cresta, como la 821 y la 825, y la 803 y la 892, en la parte baja. Tres observaciones muestran que la torre 825 no recibe el viento de las tormentas del norte que sí miden las torres 837 y 843:

1. En la tormenta del 15 y 16 de julio de 2026, la torre 837 midió hasta 16,4 m/s con viento del norte y del noroeste, y la 843, hasta 12,9 m/s del noreste. La torre 825, la de mayor cota del sector, midió 7,3 m/s como máximo, y del sur y del sureste: la dirección contraria.
2. En las muestras en que la torre 837 pasa de 8 m/s (mediana de 10,9 m/s), la 825 marca una mediana de 3,4 m/s.
3. De las 4.942 muestras de la torre 825, solo 221 vienen del norte o del noreste, las direcciones de las tormentas en las otras dos torres.

Para explicar la diferencia se probaron, en orden, tres causas: que la propia torre apantalle la estación, que el relieve la tape, y que el anemómetro mida mal. La primera es la estructura. Cada torre instrumentada tiene un sensor en un subconductor inferior de la fase inferior, que mide la inclinación y la temperatura del cable (la tensión, la flecha y el espesor de hielo no se miden: los calcula el sistema del proveedor), y una estación meteorológica montada en una pata de la torre, a unos 8 m del sensor, casi en su mismo plano horizontal y mirando hacia ese vano. El anemómetro es el de la estación: está a la altura del conductor, pero sobre la estructura. Si la estructura lo apantallara, el viento que llega por detrás de la estación, desde el lado opuesto al vano del sensor, se mediría débil. La Tabla siguiente clasifica cada muestra de 30 minutos según de dónde viene el viento respecto del vano del sensor.

| Torre | Vano del sensor y su rumbo | Muestras del 1 % más fuerte | De ellas, con viento por detrás de la estación | Máximo por detrás (m/s) | Máximo de frente (m/s) |
|------|------------------|------------|------------|------------|------------|
| 803 | Hacia la 804, 101° (este) | 49 | 4 | 5,5 | 3,3 |
| 821 | Hacia la 820, 322° (noroeste) | 29 | 20 | 9,3 | 7,7 |
| 825 | Hacia la 826, 83° (este) | 50 | 22 | 13,0 | 6,2 |
| 837 | Hacia la 836, 246° (suroeste) | 23 | 0 | 9,1 | 7,4 |
| 843 | Hacia la 842, 223° (suroeste) | 53 | 41 | 15,3 | 5,8 |
| 892 | Hacia la 891, 311° (noroeste) | 57 | 34 | 9,0 | 11,4 |

: Viento medido según su procedencia respecto del vano del sensor, en muestras de 30 minutos

La prueba descarta el apantallamiento por la estructura en las torres 821, 825, 843 y 892: sus vientos más fuertes llegan justamente por detrás de la estación, y la torre no los frena. En la 892 y la 843, además, el Explorador coincide con lo medido aunque 34 de 57 y 41 de 53 de sus muestras más fuertes llegan por detrás. En la torre 837 no hay viento fuerte por detrás, y en la 803, solo 4 de 49 muestras; pero eso no distingue el apantallamiento de la estructura de otras causas. En la 837 las tormentas vienen del norte y llegan por un costado del vano (las 23 muestras más fuertes), y en la 803 lo que hay detrás de la estación es un cerro (ver más abajo). El vano del sensor de las torres 837 y 843 es el de atrás, hacia la 836 y la 842: lo fija el ángulo que mide el sensor (Anexo C, C-35). La prueba tiene una salvedad: la referencia de la dirección del viento de los archivos no está documentada, y se supuso respecto del norte.

Descartada la estructura, se probó el relieve. Con un modelo digital de elevación de unos 30 m de resolución (Terrain Tiles, datos de la misión SRTM), que frente a la cota de 126 torres de la línea difiere 2,3 m en promedio y 6,5 m de desviación estándar, se calculó para cada torre el ángulo del horizonte cada 10°: el mayor ángulo de elevación del terreno visto desde la torre hasta 1 km. Es una forma simple de los parámetros de abrigo del terreno a barlovento de Winstral y Marks (2002). Un ángulo positivo indica que el terreno tapa esa dirección; uno negativo, que la torre lo domina. Se contrastó con la razón, hora a hora, entre el viento medido y el del pronóstico a 100 m, según la dirección medida.

| Torre | Terreno hasta 1 km | Viento medido frente al terreno | ¿El relieve explica lo medido? |
|------|------------------------|------------------------|-------------|
| 803 | Tapada del suroeste al noroeste, con 14 a 20° de horizonte; abierta al norte y al este | Mide del 29 al 42 % del viento del pronóstico desde las direcciones tapadas, y el 79 % desde el norte | Sí |
| 821 | Tapada hacia el sureste, con 18 a 25°; abierta al norte y al noroeste | Su viento más fuerte llega del sector tapado; sin horas suficientes para la razón | No |
| 825 | Despejada en todas las direcciones: 5° como máximo | Mide del 55 al 89 % del pronóstico en todos los sectores con datos | No |
| 837 | Domina el terreno en casi todo el contorno | El Explorador coincide con lo medido | Sí |
| 843 | Tapada hacia el este, con 10 a 19° | Sin relación entre el horizonte y la razón | No se observa |
| 892 | Plano: menos de 2° en casi todo el contorno, y 6° hacia el noreste | El Explorador coincide con lo medido | Sí |

: Abrigo del terreno por dirección en las torres instrumentadas, frente al viento medido

La torre 803 es el caso claro. Según la planilla de estructuras, su vano hacia la 804 mide 1.272 m, tiene una flecha de 141 m y cruza una quebrada; el sensor está en ese vano. A su espalda, la torre 802 está a 444 m y 146 m más arriba, y hay una cortina de árboles. El viento que le llega desde ese cerro se mide entre un tercio y dos quintos del pronóstico. La torre 825, en cambio, está en una zona completamente despejada, lo que se confirmó en terreno, y aun así el Explorador da ahí cerca del triple de lo medido.

La tercera causa, que el anemómetro mida mal, se comprobó con el cable, que no depende de él. El sensor del cable y la estación están a unos 8 m, y el cable responde al viento, porque la carga transversal le sube la tensión y le cambia la inclinación. En la torre 837, donde el viento fuerte está medido, la inclinación se aparta de su valor de horas secas tanto más cuanto más viento marca la estación: en promedio, 0,5 desviaciones con menos de 3 m/s, 2,6 con 6 a 10 m/s y 14 con 10 m/s o más. En las 29 horas en que la torre 837 midió 10 m/s o más, sin nieve posible, la estación de la torre 825 marcó 4,2 m/s en promedio, y su cable se apartó 1,5 desviaciones: lo que corresponde a un viento débil. El cable de la 825 sí responde cuando su estación marca viento, con 1,2 desviaciones en promedio y hasta 6,9 entre 6 y 10 m/s. Los dos equipos coinciden también en la temperatura ambiente, con una correlación de 0,99 y una diferencia media de 0,6 °C. Dos equipos independientes dicen lo mismo, y eso se toma como el dato cierto: en la torre 825 el viento a la altura del conductor es el que mide la estación, y el Explorador da ahí cerca del triple. La comprobación tiene dos límites: la respuesta del cable se mide en desviaciones propias de cada vano, que no son iguales entre torres (el cable de la torre 843 casi no responde), y en la torre 821 no se puede hacer, porque su inclinación no sirve.

El contraste queda entonces así. El Explorador coincide con el máximo medido en tres torres (837, 843 y 892) y da entre 1,8 y 3,3 veces en otras tres (803, 821 y 825). La estructura no explica la diferencia. El relieve explica la de la torre 803. En la torre 825, en la cresta y despejada, el cable confirma lo que mide la estación: la diferencia es un error del Explorador en ese punto, por exceso. En la torre 821 no se puede comprobar con el cable, y su diferencia queda sin causa establecida. La torre 821 no aporta a la tormenta de julio: su registro termina el 6 de julio. El contraste no valida el traslado, y tampoco lo descarta. Sí respalda tratarlo como cota alta, porque en ninguna de las seis torres da menos que lo medido en la cola. En las torres 803 y 843 hay además una diferencia de altura: la distancia entre el cable y el suelo de la planilla (61,7 y 105 m) supera la altura de la estructura (57,5 y 48,5 m), porque sus vanos cruzan quebradas, y la estación está en la torre, más abajo que el nivel del Explorador con que se compara. El efecto es acotado: en la torre 821, pasar de 27,9 a 20 m cambia la razón de 3,0 a 2,8 veces en el percentil 99. Los extremos de 38 años no tienen contraste posible con cuatro meses de medición. El contraste que falta es el del cable con viento fuerte y sin hielo, con su inclinación por minuto y con la tensión que estima el sistema del proveedor, que no dependen de la exposición de la estación.

El exceso del traslado casi no toca los estados del cable. Se recalculó la tensión del cable de las torres 825 y 820 en los diez inviernos con el viento trasladado a la mitad, a un tercio y sin viento: los días por invierno sobre el 50 y el 70 % de la rotura no cambian, y los máximos de las tormentas bajan 3 puntos como mucho (de 69 a 66 % en junio de 2024, y de 67 a 64 % en el evento de 2025). El manguito domina la carga, y su acumulación no usa el viento trasladado. Lo que sí depende del traslado es el estado del viento solo: los días en Propicia por viento pasan de 0,3 y 0,2 por invierno a ninguno con la mitad del viento.

## Utilización en los dos eventos

La Tabla siguiente da la utilización en la torre de cada evento, con el modelo sin cota inferior. La torre 825 tiene vano regulador de 525,8 m, vano viento de 170 m y vano peso de 101 m; la 820, de 1.046,5 m, 671 m y 104 m.

| Magnitud | Hipótesis de diseño | EV-001, torre 825 | EV-002, torre 820 |
|--------------------------------------|----------------------|----------------------|----------------------|
| Cable con viento máximo | 35 y 36 % de la rotura | | |
| Cable con hielo de 10 mm y viento | 45 y 46 % de la rotura | | |
| Manguito a la hora de las fallas | 1,08 kg/m | 0 y 0,25 kg/m | 1,85 kg/m |
| Cable a la hora de las fallas | Admitido: 50 % | 24 y 28 % | 58 % |
| Manguito máximo del episodio | | 2,21 kg/m (34 mm) | 2,25 kg/m (33 mm) |
| Cable, máximo del episodio | | 60 % | 67 % |
| Carga vertical máxima | 100 % (hipótesis de hielo) | 155 % | 157 % |
| Carga transversal máxima | 100 % (viento máximo); la torre resiste 150 % | 61 % | 98 % |

: Utilización del cable y de la torre en los dos eventos, con el modelo sin cota inferior

A la hora de las dos fallas de 2022, el cable de la torre 825 estaba bajo la hipótesis de diseño. Los máximos de los dos episodios ponen el cable entre el 60 y el 67 % de su rotura: sobre el límite de diseño (50 %) y bajo la rotura.

## Utilización en las 46 torres del sector

El cálculo se repitió en las 46 torres de la Zona I (815 a 860), cada una con sus datos de diseño y con el pronóstico de su ubicación. Se corrió con dos velocidades de caída del copo: 1 m/s, la que usó el modelo hasta la versión 0.4 de este informe, y 1,7 m/s, la que usan Nygaard et al. (2013, sección 5b) para calibrar la adherencia $U^{-0,5}$ y que el modelo adopta.

| Magnitud en las 46 torres | EV-001, 1 m/s | EV-001, 1,7 m/s | EV-002, 1 m/s | EV-002, 1,7 m/s |
|------------------------------|------------|------------|------------|------------|
| Manguito máximo, mediana (kg/m) | 2,80 | 1,52 | 2,45 | 1,28 |
| Manguito máximo, mayor valor (kg/m) | 4,68 | 2,50 | 4,69 | 2,37 |
| Diámetro exterior, mayor valor (cm) | 13,3 | 9,9 | 13,0 | 9,4 |
| Cable, mediana (% de la rotura) | 66 | 48 | 62 | 45 |
| Cable, mayor valor (% de la rotura) | 99 | 65 | 115 | 75 |
| Torres con el cable sobre el 50 % | 39 | 16 | 25 | 22 |
| Torres con el cable sobre el 70 % | 19 | 0 | 22 | 2 |
| Torres con el cable sobre su rotura | 0 | 0 | 5 | 0 |
| Carga vertical, mayor valor (veces la hipótesis de hielo) | 2,75 | 1,69 | 2,75 | 1,63 |
| Torres con más del doble de la carga vertical de la hipótesis | 9 | 0 | 21 | 0 |

: Utilización en las 46 torres de la Zona I, con dos velocidades de caída del copo

En la torre 836, con vano peso de 526 m, el manguito de EV-002 con 1 m/s pone 2.851 kg sobre cada subconductor, frente a 1.082 kg de la hipótesis de hielo: 11,4 t por fase de cuatro subconductores, donde el diseño consideró 4,3 t. Con 1,7 m/s son 1.665 kg por subconductor y 6,7 t por fase.

El mismo cálculo da la masa del manguito que lleva un cable sano a una fracción de su rotura, sin viento y a 0 °C, en los vanos reguladores de 363 m o más:

| Tensión del cable | Manguito (kg/m) | Diámetro exterior a 400 kg/m³ (cm) |
|--------------------|--------------------|--------------------|
| 50 % de la rotura (límite del diseño) | 1,5 a 1,9 | 7,3 a 8,2 |
| 70 % de la rotura | 2,6 a 3,3 | 9,4 a 10,5 |
| Rotura | 4,2 a 5,9 | 11,8 a 13,9 |

: Manguito que lleva un cable sano a cada fracción de su rotura

Con 1 m/s, el modelo dice que en EV-002 los cables sanos de cinco torres superaron su rotura y que 21 torres recibieron más del doble de la carga vertical de su hipótesis de hielo. Eso no ocurrió: en 2025 no se cortó ningún cable, y la única estructura dañada fue la cruceta de la torre 820, que tenía defectos de fabricación. El resultado no tiene sentido físico. Como el modelo evalúa el activo sano, los cables y las torres sanos que no fallaron dan una cota superior del manguito: menos de 4,2 a 5,9 kg/m, según el vano.

Con 1,7 m/s, el resultado es coherente con lo observado por tres vías independientes:

1. Ningún cable pasa del 75 % de su rotura y ninguna torre recibe el doble de su hipótesis de hielo, pero 22 torres quedan sobre el límite de diseño del cable en EV-002. La carga supera el diseño sin llegar a la rotura de un elemento sano, lo que es compatible con que fallara solo el elemento con defecto.
2. El manguito mayor del sector, 2,4 a 2,5 kg/m, coincide con la estimación de LatLon: 2,3 kg/m en 2022 y 1,9 a 2,5 kg/m en 2025.
3. En el episodio medido, el modelo da 0,29 kg/m, dentro del rango de la inclinación (0,23 a 0,75) y más cerca de su valor central (0,35) que con 1 m/s (0,48).

La prueba descarta 1 m/s, pero no demuestra que 1,7 m/s sea exacto. El cálculo usa el vano peso de la condición diaria y un cambio de estado elástico, que cerca de la rotura deja de valer. La calibración se repitió con 1,7 m/s. No cambian el umbral de fase (ninguna de las tres lluvias acumula), la correlación con la consecuencia en Chile (Spearman de 0,52 y AUC de 0,86) ni los puestos de los días de falla (19 y 4 de 1.530). Cambian las masas y la frecuencia: los días Sobre diseño por invierno bajan de 2,6 a 1,9 en la torre 825 y de 1,5 a 1,1 en la 820.

## Frecuencia de los estados del cable

| Torre | Días por invierno sobre el 50 % | Sobre el 70 % | Sobre la rotura | Sobre diseño, con la hipótesis climática |
|--------|------------|------------|------------|------------|
| 825 | 1,8 | 0,4 | 0 | 1,9 |
| 820 | 0,8 | 0,3 | 0 | 1,1 |

: Días por invierno en cada estado del cable, mayo a septiembre de 2017 a 2026

El viento solo no lleva el cable sobre el 50 % en ninguno de esos días: siempre hay manguito. Los días mayores son el 11 al 14 de junio de 2018 (91 % en las dos torres, antes de la puesta en servicio de la línea, sin registro con que contrastarlo), el 22 y 23 de junio de 2024 (69 % en la torre 825; episodio CL-05, sin consecuencia) y el 16 y 17 de junio de 2025 (67 % en la torre 820; la falla de la cruceta). Dos episodios con la misma tensión tuvieron consecuencias distintas: el estado dice que la carga pasó un límite del cable sano, no que algo vaya a fallar. Las fallas de 2022 ocurrieron con el cable al 24 y al 28 % de su rotura, y ningún estado de amenaza las marca.

\\newpage

## Sensibilidad a la cota inferior de la nieve fría

| Cota inferior | EV-001, torre 825 | EV-002, torre 820 | Episodio medido, torre 825 |
|----------------------|----------------------|----------------------|----------------------|
| Ninguna | 2,21 | 2,25 | 0,29 |
| −3,1 °C | 1,23 | 2,25 | 0,25 |
| −2,5 °C | 0,71 | 2,25 | 0,15 |
| −1,7 °C | 0,25 | 2,25 | 0,13 |
| −1,0 °C | 0,25 | 0,13 | 0,04 |

: Manguito máximo del episodio según la cota inferior del bulbo húmedo, en kg/m por subconductor

El episodio medido tuvo una carga de 0,23 a 0,75 kg/m (Magnitud en el episodio medido): admite una cota inferior de hasta −3,1 °C, y con −2,5 °C el modelo queda bajo lo medido.

El mismo episodio permite contrastar el criterio de nieve húmeda de la literatura con lo medido en la torre. Nygaard et al. (2013) identifican la nieve húmeda por su fracción de agua líquida, e informan que más del 95 % de sus casos ocurre con bulbo húmedo de 0 a 1 °C. En la torre 825, las 9 horas con carga medida en el cable tuvieron un bulbo húmedo medido de −0,3 a 0,7 °C, con viento de menos de 1 m/s: el criterio se cumple. El pronóstico, en cambio, dio en esas horas un bulbo húmedo de −3,0 a −0,5 °C.

| Bulbo húmedo medido en la torre | Horas de nieve del modelo | Precipitación del pronóstico (mm) |
|----------------------|----------------------|----------------------|
| Bajo −1 °C | 0 | 0,0 |
| De −1 a 0 °C | 3 | 2,2 |
| De 0 a 1 °C | 7 | 5,9 |
| Sobre 1 °C | 0 | 0,0 |

: Horas que el modelo cuenta como nieve en el período de los sensores, según el bulbo húmedo medido en la torre 825

En esas 10 horas, las únicas de nieve del período, el bulbo húmedo del pronóstico fue en promedio 2,1 °C más bajo que el medido, con diferencias de 0,3 a 3,8 °C. De ahí salen dos conclusiones. La primera: el criterio de la literatura es correcto en el sitio, pero no se puede aplicar con este pronóstico, porque su error es mayor que la ventana de 1 °C que habría que distinguir. La segunda: las horas que el pronóstico da por frías, con bulbo húmedo de −2,5 a −3,1 °C, fueron en la torre nieve húmeda cerca de 0 °C, y el cable se cargó en ellas. Una cota inferior sobre el bulbo húmedo del pronóstico descartaría nieve que sí se adhirió. Es un solo episodio, y leve: no cierra el rango del evento de 2022, pero pone la evidencia del lado del modelo sin cota.

Los dos eventos responden distinto. En EV-001, de 36,6 mm de precipitación con bulbo húmedo de −0,3 °C o menos, 28,6 mm caen bajo −1,7 °C, con el aire entre −3,8 y 0,0 °C: es nieve fría, y con la cota de −3,1 °C el manguito baja de 2,21 a 1,23 kg/m y el cable, del 60 al 44 % de su rotura. En EV-002, los 35,1 mm caen con bulbo húmedo entre −0,3 y −1,7 °C y el aire entre −1,4 y 0,5 °C, 31,5 mm de ellos en 6 horas: es nieve húmeda, y ninguna cota hasta −1,7 °C cambia el resultado.

El estudio de LatLon da, para los mismos eventos, 2,27 kg/m en 2022 (Makkonen, con 600 kg/m³) y de 1,93 a 2,47 kg/m en 2025 (masa combinada de Goodwin y Makkonen, con deshielo entre 0 y 4 °C), y declara que son valores modelados, sin validación observacional (LAT-36-10-03-V5, §5.2 y §6.4). Con esas masas, la ecuación (21) deja el cable al 61 % de su rotura en 2022 y entre el 58 y el 68 % en 2025.

## Del agua caída al manguito

La masa que gana el cable no es la nieve que cae sobre su ancho. Según la ecuación de acumulación (Desarrollo, Acumulación sobre el conductor), en cada hora el cable capta la precipitación que cae sobre su diámetro, multiplicada por el efecto del viento, que le trae la nieve que pasa de lado, y reducida por la adherencia; y el manguito, al engrosar, capta más. La Tabla siguiente separa esos factores en los tres episodios, con el viento de la acreción ponderado por la precipitación.

| Episodio | Nieve (mm de agua) | Viento (m/s) | Solo lo que cae en vertical (kg/m) | Con viento y adherencia, sobre el cable desnudo (kg/m) | Modelo, con el manguito creciendo (kg/m) |
|------------------|------------|--------|------------|------------|------------|
| EV-001, torre 825 | 36,6 en 31 h | 2,9 | 0,89 | 1,04 | 2,21 |
| EV-002, torre 820 | 35,1 en 9 h | 3,8 | 0,86 | 1,10 | 2,25 |
| Medido, torre 825 | 8,1 en 10 h | 2,5 | 0,20 | 0,22 | 0,29 |

: De la precipitación al manguito en los tres episodios

La mitad de la masa de los dos eventos viene del crecimiento del diámetro: el manguito modelado pasa de 2,4 a 9 cm y capta el doble que el cable desnudo. Por eso la densidad cambia también la masa, y no solo el espesor: con menos densidad el manguito es más grueso y capta más.

Para leer una masa como un tamaño, la Tabla siguiente da el diámetro exterior de un manguito sobre el conductor de 2,44 cm, con tres densidades: la que resulta en el modelo (unos 400 kg/m³), la de nieve húmeda de LatLon (600 kg/m³) y la del hielo (900 kg/m³).

| Masa (kg/m) | A 400 kg/m³ (cm) | A 600 kg/m³ (cm) | A 900 kg/m³ (cm) |
|--------------------------------|------------|------------|------------|
| 0,35 (medido, estimación central) | 4,1 | 3,7 | 3,3 |
| 1,08 (hipótesis de diseño) | 6,4 | 5,4 | 4,6 |
| 1,23 (EV-001, cota baja) | 6,7 | 5,7 | 4,8 |
| 2,27 (LatLon, 2022) | 8,8 | 7,4 | 6,2 |
| 2,2 (EV-001 y EV-002, modelo) | 8,7 | 7,3 | 6,1 |
| 2,5 (mayor del sector) | 9,2 | 7,7 | 6,4 |

: Diámetro exterior del manguito según su masa y su densidad

La masa es sensible a dos supuestos del modelo: la densidad del depósito y la velocidad de caída del copo, fija en 1,7 m/s. La densidad no tiene medición en el sitio. Con las otras dos relaciones de la literatura, el manguito de EV-001 va de 1,69 kg/m, con los 700 kg/m³ constantes que Nygaard et al. (2013) midieron en Islandia y usaron al calibrar la adherencia, a 2,60 kg/m, con la constante de 200 kg/m³; el de EV-002, de 1,73 a 2,63 kg/m. En el episodio medido las tres dan entre 0,26 y 0,31 kg/m, dentro del rango medido, así que ese episodio no las distingue.

| Episodio | Modelo, con 1,7 m/s (kg/m) | Con 600 kg/m³ (kg/m) | Con caída de 1 m/s (kg/m) | Con caída de 2 m/s (kg/m) |
|------------------|------------|------------|------------|------------|
| EV-001 | 2,21 | 1,79 | 4,17 | 1,89 |
| EV-002 | 2,25 | 1,83 | 4,56 | 1,86 |
| Medido (0,23 a 0,75) | 0,29 | 0,26 | 0,48 | 0,25 |

: Sensibilidad del manguito máximo a la densidad y a la velocidad de caída del copo

La velocidad de caída es el supuesto que más pesa, y actúa en los dos eventos: con 1 m/s, la masa casi se duplica. Nygaard et al. (2013, secciones 5b y 7) usan 1,7 m/s, de las mediciones de Yuter et al. (2006), y advierten que pasar de 2 a 1 m/s casi duplica la acreción. Con ese valor calibraron la adherencia $U^{-0,5}$; usarla con 1 m/s, como hacía el modelo, combinaba dos supuestos que la fuente no combinó.

# Discusión

## Interpretación

El resultado central es que, con el pronóstico como entrada, el criterio de fase decide si el modelo sirve. La misma física de acumulación, con la misma precipitación, da una relación invertida con la consecuencia si la nieve se identifica por la temperatura del aire, y una relación correcta si se identifica por el bulbo húmedo. La razón está en el error del pronóstico en la cresta: con precipitación es de alrededor de 1 °C, el ancho de la ventana de Admirat. El bulbo húmedo incorpora la humedad, y en estos episodios la humedad del pronóstico distingue el aire seco en que la nieve sobrevive del aire saturado en que se funde.

El umbral calibrado, −0,3 °C, está bajo las ventanas publicadas para estaciones: de −0,2 a 1,2 °C en Makkonen y Wichura, de 0 a 1,2 °C en Nygaard. Con esas ventanas, el modelo perdería la carga del 4 y 5 de julio de 2026, cuyas horas tienen bulbo húmedo pronosticado de −3,1 a −0,5 °C, y la falla de 2025, con −1,6 a −1,0 °C en las horas de mayor precipitación. Ya con el reanálisis ERA5, el criterio de Nygaard no avisaba ninguna de las dos fallas de Chile (\`events/RESULTS.md\`, §3.1). Se infiere que el pronóstico queda frío y seco en la cresta cuando precipita, y que el umbral absorbe ese sesgo: es un umbral del pronóstico en el sitio, no una propiedad de la nieve. Los eventos internacionales lo confirman, porque con ERA5 el mejor umbral está cerca de 0,5 °C, dentro de las ventanas publicadas.

En el viento, el resultado es que el pronóstico no sirve sin trasladar: su celda promedia la cresta con los valles. El traslado al Explorador recupera la exposición de cada torre, pero hereda las incertidumbres de esa fuente, y los anemómetros de las torres lo respaldan en tres de seis torres: en las otras tres, el Explorador da entre 1,8 y 3,3 veces lo medido: en la 803 la causa es el relieve; en la 825, un exceso del Explorador, que el cable confirma; y en la 821 no está establecida (Resultados, Contraste del Explorador con los anemómetros).

La comparación en masa corrige un error de unidades de los modelos anteriores, que comparaban el espesor del manguito con el espesor de hielo de diseño. La norma define una carga de peso, y la nieve húmeda pesa menos de la mitad que el hielo de diseño. El efecto es grande: los días Sobre diseño en la torre 825 bajan de 4,7 a 2,8 por invierno.

## Cumplimiento de los objetivos

| Objetivo específico | Resultado | Cumplimiento |
|----------------------------------------|----------------------------------------------------|------------|
| 1. Error del pronóstico con precipitación | Sesgo de −0,4 a −0,7 °C y error medio absoluto de 0,8 a 1,8 °C en la cresta | Cumplido |
| 2. Criterio de fase que separe carga y lluvia | Bulbo húmedo de −0,3 °C o menos separa las horas en la torre 825; falla en la 837 | Cumplido en la torre 825; parcial en el tramo |
| 3. Comparación con el diseño en la magnitud de la norma | Masa frente a 1,257 kg/m; 1,9 y 1,1 días Sobre diseño por invierno | Cumplido; el peso específico de la NSEG 5, por contrastar con su publicación oficial |
| 4. Hielo frente a la consecuencia | AUC de 0,86 en Chile y de 0,80 en el mundo con el umbral calibrado | Cumplido |
| 5. Frecuencia en los inviernos | 12,0 y 6,3 días Propicia por invierno; fallas en los puestos 19 y 4 de 1.530 días | Cumplido; la magnitud absoluta no |
| 6. Viento trasladado a la torre | Presión de diseño superada 0,03 días por año en promedio, y el 60 % de ella, 0,8 días; el traslado da entre 1,4 y 4 veces el viento medido en la tormenta de julio de 2026; frente a cuatro meses de anemómetros, el Explorador coincide con el máximo medido en tres torres y da entre 1,8 y 3,3 veces en otras tres | Parcial: calculado; no validado |
| 7. Vigilancia de la red | Enfoque definido con la práctica de la industria y las lecciones de SAMPLT, y aprobado por el autor; la primera versión consulta en lotes de hasta 100 ubicaciones y 500 por minuto | Parcial: diseño aprobado; la construcción y la prueba con una línea completa, pendientes |
| 8. Utilización del cable y de la torre | Calculada en las 46 torres del sector. Con 1,7 m/s, manguito mayor de 2,4 a 2,5 kg/m en los dos eventos y cable hasta el 75 % de su rotura; en EV-001, torre 825, entre 1,23 y 2,21 kg/m según la nieve fría se adhiera | Cumplido en el método, comprobado contra la planilla; la magnitud tiene una sola medición, y leve |

: Cumplimiento de los objetivos específicos

## Sensibilidad al umbral

La AUC de Chile vale 0,86 con cualquier umbral entre −0,3 y 0,5 °C y sube a 1,00 con −0,5 °C. La diferencia es un solo episodio, CL-05 (21 al 23 de junio de 2024), con muchas horas de bulbo húmedo pronosticado entre −0,5 y 0 °C. Una variación de 0,2 °C es menor que el error del pronóstico, así que esa diferencia no es una razón para preferir −0,5 °C; elegirlo sería ajustar el umbral a las fallas. El umbral de −0,3 °C se fijó solo con las torres, en el punto medio del intervalo que las separa.

## Incertidumbre y límites

1. La magnitud absoluta del manguito está calibrada con un solo episodio. En él, el modelo (0,29 kg/m) cae dentro del rango que da la inclinación (0,23 a 0,75 kg/m) y queda alrededor de 17 % bajo la estimación central (0,35 kg/m); el rango es amplio porque depende de cuántos vanos se cargaron y de cuánto se mueven las cadenas de suspensión. En el otro extremo, la torre 825 tiene seis episodios de 42 a 74 mm en diez inviernos, del orden del Reino Unido en 1990, y la línea tuvo una sola falla en esa torre, lo que sugiere sobrestimación en las tormentas grandes. Las causas probables son la precipitación del pronóstico en la cresta, que puede estar sobrestimada por el realce orográfico de la celda, y la falta de cota inferior para la nieve fría, menos adherente. Lo validado es el orden de los episodios frente a la consecuencia, no el espesor.
2. El estado Sobre diseño no equivale a falla. Las estructuras se diseñan con factores de carga, y con hielo el conductor admite hasta el 70 % de su tensión de ruptura (Pliego RPTD N°07, 4.3 h). Que el estado se dé 1,9 días por invierno sin falla en la mayoría de ellos es compatible con ese margen, pero también con la sobrestimación del punto anterior; los datos no permiten separar ambas explicaciones.
3. La evidencia es corta: dos fallas, siete episodios sin consecuencia y un episodio con carga medida. Una AUC de 0,86 con dos casos positivos tiene una incertidumbre grande; el resultado es una señal consistente, no una medida precisa.
4. La resolución espacial limita el modelo. Las 24 torres de la cresta comparten la celda del pronóstico; solo la temperatura cambia con la cota. La torre 837, 100 m más abajo que la 825, recibe 6,5 mm sin carga medida: el límite de la nieve pasa entre ambas y el pronóstico no lo ubica.
5. El tramo de la Zona I se construyó con torres de suspensión de la familia de la Zona II (sufijo Z2 en la planilla de estructuras), como propuso P1-LT-01-D129-V0 para su tramo. La presión de diseño real de esas torres no es la que el modelo toma de la zona; el modelo usa la zona asignada en el diseño de la línea. Ese estudio calculó la hipótesis de hielo con 1 mm y no con 10 mm, y no analizó la variante con que se construyó la línea entre la 815 y la 842 (Anexo E).
6. La fórmula de Stull supone la presión del nivel del mar y humedades hasta 99 %; en la cresta la presión es de unos 830 hPa y el pronóstico llega a 100 %. El error que agrega es menor que el del pronóstico, pero no se cuantificó.
7. El viento trasladado no está validado. Frente a cuatro meses de anemómetros, el Explorador coincide con el máximo medido en las torres 837, 843 y 892, y da entre 1,8 y 3,3 veces lo medido en las torres 803, 821 y 825. El relieve explica la diferencia de la torre 803, tapada por un cerro; en la torre 825, en la cresta y despejada, la inclinación del cable confirma el viento débil que mide la estación, así que ahí el Explorador da de más; en la torre 821 no se pudo comprobar (Resultados, Contraste del Explorador con los anemómetros). El período de integración de las muestras de 30 minutos no está documentado, y el del Explorador tampoco. Mientras no se resuelva, el estado del viento es una cota alta: los días sobre la presión de diseño son pocos y caen en fechas que se pueden comprobar con los registros de operación.
8. La vigilancia no da probabilidades. El ensamble de Open-Meteo no corrige por cota (Estado del Arte, Lecciones del código de SAMPLT), así que la certeza se expresa con el plazo y la coherencia entre corridas, que son medidas indirectas. El límite de 125 ubicaciones por petición es empírico y el servicio no lo documenta: se confirma con la consulta de una línea completa.
9. La magnitud del manguito en las tormentas grandes no está medida. La velocidad de caída del copo es el supuesto que más pesa: con 1 m/s, el modelo lleva cables sanos sobre su rotura en EV-002, lo que no ocurrió; con 1,7 m/s (Nygaard et al., 2013), el manguito mayor del sector es de 2,4 a 2,5 kg/m en los dos eventos. En EV-001 se suma la duda de si la nieve fría se adhiere. La literatura documenta manguitos de 10 a 17 cm en Islandia, con densidades de 700 kg/m³ y vientos de 25 a 30 m/s que no son los de La Dormida; en Chile no hay registro de manguitos así en líneas de transmisión. Un número único espera más episodios con carga medida.
10. La cota superior que dan los elementos sanos es necesaria, no suficiente: descarta una magnitud, pero no fija otra. El cambio de estado es elástico y usa la rotura nominal, y el vano peso es el de la condición diaria.

\\newpage

## Comparación con SAMPLT y con el modelo del módulo de Clima

| Aspecto | Modelo A (módulo de Clima) | Modelo B (SAMPLT) | Este modelo |
|----------------------|----------------------|----------------------|----------------------|
| Fundamento | Índices con umbrales de nieve acumulada | Seis índices con semáforo de cinco niveles | Acumulación física comparada con el diseño de la norma |
| Fase de la precipitación | Temperatura y nevada del pronóstico | Nieve bajo 0 °C tratada como seca | Bulbo húmedo calibrado en el sitio |
| Comparación con el diseño | No | Clases de hielo de ISO 12494 | Masa frente a la carga de la zona de la estructura |
| Fallas de Chile | Rojo en las dos | Verde en las dos | Puestos 19 y 4 de 1.530 días de invierno |
| Frecuencia en la torre 825 | 8,3 días en Rojo por invierno | Nunca sobre Amarillo | 1,9 días Sobre diseño por invierno |
| Contraste con eventos | 17 de 19 fallas en Rojo; también episodios sin falla | Verde en 11 de 19 fallas | AUC de 0,80 a 0,89 en el mundo |

: Comparación de los tres modelos

SAMPLT contrastó su modelo con siete casos internacionales reconstruidos en forma cualitativa (Zapata, SAMPLT, §7.1). La revisión del inventario encontró problemas en seis de ellos: un patrón tratado como evento, datos supuestos o sin fuente, un caso sin fecha ni magnitud y uno reconstruido para que cumpliera la condición del propio índice (\`events/README.md\`, §4). Este modelo agrega lo que esa prueba no tenía: episodios sin consecuencia para medir la frecuencia, eventos propios, mediciones en el sitio y la fuente exacta de cada dato.

## Amenaza y condición del activo

Las dos fallas de Chile ocurrieron con componentes debilitados: subconductores con fretting en 2022 y una cruceta con desviaciones de fabricación en 2025. Las horas lo muestran: la primera falla de 2022 ocurrió con el modelo en Normal, sin hielo modelado, mientras que las de 2025 ocurrieron Sobre diseño (Resultados, Episodios de Chile). Un modelo de amenaza no puede anticipar cuál estructura fallará, porque la resistencia del activo no está en sus entradas. Ninguna de las dos fallas se debió solo al clima, y el modelo no se hace cargo de esas condiciones previas ni puede hacerlo: evalúa la carga sobre el activo sano. La capacidad residual de los cables cortados en 2022 (13,6 % y 23,9 %) es la que quedó a la vista después del corte, y no dice cuánto había antes ni separa el desgaste de la carga de nieve. El modelo aporta la primera de las tres capas del riesgo que define el módulo de Activos: la amenaza, que se combina después con la condición del activo y su criticidad (decisions/assets.md, "Requisitos: RPTD N°17"). La resistencia de las torres frente al hielo tampoco está bien documentada: el estudio que las verificó en 2014 usó 1 mm de hielo en lugar de 10 mm y no cubre la variante con que se construyó la línea entre la 815 y la 842 (Anexo E).

# Conclusiones

1. El pronóstico ECMWF IFS, bajado a la cota de cada torre, queda en la cresta de La Dormida entre 0,4 y 0,7 °C más frío que la temperatura medida en las horas con precipitación, con un error medio absoluto de 0,8 a 1,8 °C. Ese error es del tamaño de la ventana de 0 a 2 °C de los criterios de nieve húmeda basados en la temperatura del aire, que por eso no sirven con el pronóstico en el sitio.
2. La temperatura de bulbo húmedo del pronóstico separa las horas con carga medida de las horas de lluvia sin carga en la torre 825, cosa que no hacen la temperatura del aire ni la isoterma de 0 °C. El umbral, −0,3 °C, se fijó solo con las torres. El criterio falla en la torre 837, 100 m más abajo, donde el pronóstico no ubica el límite de la nieve.
3. Comparada en peso, como la define la norma, la acumulación supera la carga de diseño de la Zona I 1,9 días por invierno en la torre 825 y 1,1 en la 820. Comparar espesores sube esa cifra a 3,0 en la torre 825.
4. Con el bulbo húmedo, el hielo modelado crece con la consecuencia: AUC de daño de 0,86 en los nueve episodios de Chile, frente a 0,29 del criterio de Admirat, y de 0,80 a 0,89 en los 19 eventos internacionales, frente a 0,80. La forma del criterio se traslada; el umbral depende del modelo meteorológico y del lugar.
5. En diez inviernos, el modelo marca Propicia 12,0 días por invierno en la torre 825 y 6,3 en la 820, y los días de las dos fallas quedan en los puestos 19 y 4 de 1.530. El orden de los episodios es consistente con la consecuencia. En el único episodio con carga medida, la masa modelada (0,29 kg/m) cae dentro del rango que da la inclinación (0,23 a 0,75 kg/m) y alrededor de 40 % sobre su estimación central; en las tormentas grandes, la frecuencia de manguitos de 40 mm o más sugiere que el modelo sobrestima.
6. El viento del pronóstico no ve la cresta: con él, ninguna torre llega a la mitad de la presión de diseño en diez años. Trasladado a cada torre por cuantiles contra el Explorador Eólico, y con la densidad del aire de la cota, supera la presión de diseño 0,03 días por año en promedio, sobre todo el 22 de agosto de 2023, y pasa el 60 % de ella 0,8 días por año, el umbral adoptado para Propicia. Frente a los sensores da entre 1,4 y 4 veces el viento medido, así que es una cota alta, no un resultado validado.
7. La aplicación usa el modelo para vigilar la red, como los referentes de la industria, y no para consultar estructura por estructura. Agrupa en episodios dónde y cuándo el pronóstico llega a Propicia o Sobre diseño, con la evidencia contra el diseño, y expresa la certeza con el plazo y la coherencia entre corridas, porque el ensamble disponible no corrige por cota. La consulta respeta los límites del servicio que enseñó SAMPLT, con lotes de hasta 100 ubicaciones, 500 por minuto y una ubicación por estructura con su cota; falta confirmarlos con una línea completa.
8. La utilización del cable y de la torre se puede calcular con los datos de diseño de la línea: el cambio de estado reproduce las tensiones de la planilla con 1 a 2 % de diferencia. A la hora de las fallas de 2022, el cable de la torre 825 estaba al 24 y al 28 % de su rotura, bajo la hipótesis de diseño (45 %). En las 46 torres del sector, la velocidad de caída del copo de 1 m/s da un resultado sin sentido físico: en EV-002, cables sanos sobre su rotura en cinco torres, que no se cortaron. Con 1,7 m/s, el valor con que Nygaard et al. (2013) calibraron la adherencia, el manguito mayor es de 2,4 a 2,5 kg/m en los dos eventos, ningún cable pasa del 75 % de su rotura, y el resultado coincide con la estimación de LatLon y con el episodio medido. Con ese cálculo, la aplicación reemplaza el estado Sobre diseño, donde se conocen los datos del cable, por dos estados con los límites de la norma: sobre el 50 % y sobre el 70 % de la rotura. En diez inviernos, el cable pasa el 50 % entre 0,8 y 1,8 días por invierno y nunca llega a su rotura. La torre queda sin estado propio hasta contar con sus árboles de carga.

# Siguientes Pasos

| Acción propuesta | Justificación | Prioridad |
|----------------------------------------------|----------------------------------------------------|----------|
| Contrastar el peso específico del hielo de la NSEG 5 (1) con su publicación oficial, y guardarlo con cada norma en el catálogo de la aplicación | Se tomó de copias del texto; cada norma fija el suyo (0,9 en el Pliego RPTD N°11) | Alta |
| Acotar la carga medida con un sensor en otro vano del tramo 825–828, o con la tensión mecánica medida en la grapa | La inclinación de un solo punto deja la carga entre 0,23 y 0,75 kg/m, según cuántos vanos se cargaron y cuánto se mueven las cadenas | Media |
| Documentar la altura de la fase inferior de cada tipo de torre | El cálculo mecánico supone la misma distancia de la cima a la fase inferior en todas; cambia el desnivel entre amarres | Media |
| Medir el bulbo húmedo en la torre en más episodios de nieve, con la interfaz de datos de los sensores, y decidir la fase con él donde haya estación | La literatura da la ventana (0 a 1 °C), pero el pronóstico se aparta 2 °C de lo medido en las horas de nieve: con él no se puede aplicar una cota inferior | Alta |
| Sumar las mediciones del invierno de 2027 de las torres instrumentadas | Un segundo episodio con carga probaría el umbral fuera de la muestra con que se fijó | Media |
| Calibrar un segundo sitio antes de usar el umbral fuera de La Dormida | El umbral absorbe el sesgo del pronóstico en esta cresta | Media |
| Contrastar el viento con la inclinación del cable por minuto y con la tensión que estima el sistema del proveedor, en horas de viento fuerte y sin hielo, cuando se tengan por la interfaz de datos de los sensores; y documentar la referencia de la dirección del viento de las estaciones | En tres de seis torres, el Explorador da entre 1,8 y 3,3 veces el viento medido; la causa de la torre 821 no está establecida, y el viento se declara como cota alta mientras no haya un contraste que no dependa de la exposición de la estación | Alta |
| Bajar las series del Explorador Eólico de las demás líneas | Sin ellas, la aplicación no evalúa el viento fuera de las torres 809 a 863 | Media |
| Recalibrar la acumulación con el viento trasladado | La nieve se calibró con el viento a 100 m llevado con exponente 0,16; el trasladado cambia la masa | Baja |
| Consultar los registros de operación del 22-08-2023, 26-04-2022, 18-06-2024 y 15-07-2026 | Son los días en que el viento trasladado superó el diseño; el 02-08-2024 (CL-08) no tuvo eventos | Alta |
| Informar a LatLon que los archivos de las torres están en hora local | Su contraste del 4 y 5 de julio supuso UTC y quedó desfasado unas 4 horas | Baja |
| Identificar los casos de carga LC #2 y LC #6 de la planilla, y obtener la tensión, el vano peso y el factor de sobrecarga de la hipótesis de hielo con viento | La planilla no trae la hipótesis de hielo, y la Tabla 4.4 de P1-LT-01-D129-V0 la da con 0,1 cm de hielo donde la norma pide 10 mm (Anexo E) | Alta |
| Pedir a la empresa el documento que zonificó y verificó la variante (815 a 842) y el tramo 845 a 850, y el espesor de hielo del modelo de PLS-CADD de la línea construida | El estudio de 2014 calculó el hielo con 1 mm y no cubre esas 34 estructuras; con 10 mm, 13 de las 44 con árbol quedan fuera de los casos de su árbol de carga (Anexo E) | Alta |
| Medir la carga en más episodios (invierno de 2027) o la tensión en una grapa | Es la única forma de acotar la magnitud del manguito en una tormenta grande | Alta |
| Revisar el criterio de nieve húmeda de Nygaard et al. (2013): fracción líquida del copo, que en el 95 % de sus casos equivale a un bulbo húmedo entre 0 y 1 °C | El umbral calibrado aquí, −0,3 °C, corrige el sesgo del pronóstico en la cresta, pero no descarta la nieve seca | Media |
| Revisar el modelo de agua líquida del manguito (Admirat et al., 1988; Poots y Skelton, 1995) | Daría un criterio de desprendimiento para acotar EV-002 | Media |
| Definir los estados de la torre con sus árboles de carga definitivos, y llevar los datos del cable a las demás líneas | El cable ya tiene estados propios; la torre y las líneas sin conductor identificado siguen con la hipótesis climática | Alta |
| Consultar una línea completa contra Open-Meteo, una vez y con el visto bueno del autor | Confirma el límite de 125 ubicaciones por petición, que es empírico, y el peso de las consultas largas | Alta |
| Construir la vigilancia por incrementos después de su primera versión: coherencia entre corridas; vigilancia continua de varios tramos; acciones según estado y plazo, con un boletín por corrida; histórico con las fallas registradas; desempeño del modelo por evento y por invierno; riesgo con la condición del activo y su criticidad; dirección del viento y tablas de viento para toda la red; y observación con los sensores y las cámaras de VIGIA | Cada incremento suma una parte del enfoque de la vigilancia; el orden se decide con el autor después de probar el anterior | Media |

: Siguientes pasos

# Referencias

1. AEMET (2010). Análisis preliminar de la situación de nevadas en Cataluña de 7-8 de marzo de 2010. Agencia Estatal de Meteorología. https://www.aemet.es/documentos/es/noticias/2010/03/Analisis_preliminar_nevadas_Cataluna_08-03-2010.pdf
2. Admirat, P. (2008). Wet snow accretion on overhead lines. En M. Farzaneh (ed.), Atmospheric Icing of Power Networks (cap. 4). Springer. https://doi.org/10.1007/978-1-4020-8531-4_4
3. CIGRE (2017). Overhead Lines (CIGRE Green Books), §5.6 y §7.3. Springer.
4. CIGRE Task Force B2.11.06 (2007). State of the art of conductor galloping (Technical Brochure 322), §6.2.
5. Ding, B., Yang, K., Qin, J., Wang, L., Chen, Y. y He, X. (2014). The dependence of precipitation types on surface elevation and meteorological conditions and its parameterization. Journal of Hydrology, 513, 154-163. https://doi.org/10.1016/j.jhydrol.2014.03.038
6. Farzaneh, M. y Chisholm, W. A. (2022). Techniques for protecting overhead lines in winter conditions (CIGRE Green Books), §1.5 y pp. 73 a 75. Springer. https://doi.org/10.1007/978-3-030-87455-1
7. IEC (2017). IEC 60826:2017, Design criteria of overhead transmission lines, Anexo D y corrección de la presión del viento por densidad del aire.
8. ISO (2017). ISO 12494:2017, Atmospheric icing of structures.
9. Jennings, K. S., Winchell, T. S., Livneh, B. y Molotch, N. P. (2018). Spatial variation of the rain–snow temperature threshold across the Northern Hemisphere. Nature Communications, 9, 1148. https://doi.org/10.1038/s41467-018-03629-7
10. LatLon (2026). Estudio meteorológico Línea CL-PLEX1, Etapa 1, Sector La Dormida, Informe Final (LAT-36-10-03-V5), §2, §3.2, cap. 4, §5.2, §6 y Tablas 4-1, 8-1 y 8-2. Documento confidencial.
11. NSEG 5 E.n.71 (1971). Reglamento de Instalaciones Eléctricas de Corrientes Fuertes (Res. Ex. N° 692 de 1971), zonas climáticas y peso específico del hielo; derogada en 2020. Consultada en copias de su texto, no en la publicación oficial; el mismo peso específico figura en el Decreto 4188 de 1955 que la precedió (Biblioteca del Congreso Nacional, Ley Chile, idNorma 1038346).
12. Nygaard, B. E. K. et al. (2013). Modeling wet snow accretion on power lines: improvements to previous methods using 50 years of observations. Journal of Applied Meteorology and Climatology, 52(10), 2189-2203.
13. W-0016 (05-10-2026). Análisis de causa raíz de los separadores-amortiguadores, §4.1. Documento interno.
14. Consultoría Colombiana S.A. (2014). P1-LT-01-D129-V0, Análisis nueva zonificación climática del proyecto, cap. 4 a 7, Tablas 4.2 a 4.4 y 6.1 a 6.3 y Figura 4-1 (Anexo E); P1-LT-01-D100-V07, Criterios básicos de diseño, §6.1.4 (ecuación de cambio de estado y condición diaria); planilla de estructuras de la línea (vanos, vanos reguladores, flechas y tensiones por caso de carga).
15. P2-LT-01-I002-V5. Criterios de diseño de la línea del norte (valores de las zonas de la NSEG 5).
16. SEC. Pliego Técnico Normativo RPTD N°07, Franja y distancia de seguridad, 4.3 h.
17. SEC (2020, modificado en 2022). Pliego Técnico Normativo RPTD N°11, Líneas de alta y extra alta tensión (Res. Ex. N° 33.277 de 2020; Res. Ex. N° 11.682 de 2022), 5.10.6 e y 5.21.1.
18. SEC (2020). Pliego Técnico Normativo RPTD N°17, Sistema de gestión de integridad de instalaciones eléctricas (Res. Ex. N° 31.876 de 2020), 5.13 y 5.14.
19. Simon, A., Španiel, O., Derková, M. y Somfalvi-Tóth, K. Forecasting of wet snow and freezing rain accretion on power lines (presentación, ALADIN). Cita el criterio de Makkonen y Wichura (2010).
20. Stull, R. (2011). Wet-bulb temperature from relative humidity and air temperature. Journal of Applied Meteorology and Climatology, 50(11), 2267-2269. https://doi.org/10.1175/JAMC-D-11-0143.1
21. Tomaszewski, M., Ruszczak, B., Michalski, P. y Zator, S. (2019). The study of weather conditions favourable to the accretion of icing that pose a threat to transmission power lines. International Journal of Critical Infrastructure Protection, 25, 139-151.
22. United States Patent and Trademark Office. Patente US 11.143.793, Storm outage management system.
23. Vitali, B., Bonanno, R. y Lacavalla, M. (2024). Monitoring and forecasting wet-snowfall and snow sleeves accretion on overhead power lines in the Italian western Alps. EMS Annual Meeting 2024, EMS2024-520.
24. Snow accretion on electric wires and its prevention. Journal of Glaciology (autores, volumen y año por verificar). Cita el criterio de Shōda (1953).
25. Zapata, L. A. (2026). Sistema de Alerta Meteorológica Preventiva para Líneas de Transmisión, Basado en Pronóstico Numérico (SAMPLT), cap. 2, §2.2, §2.3 y §7.1.
26. Sterlite Technologies. Technical data sheet ACAR 700 MCM (ungreased), STL/230AL1/125AL2/ASTM Rev. 00.
27. Ministerio de Energía y Departamento de Geofísica, Universidad de Chile (2018). Explorador Eólico 2018: descripción y guía de uso. https://eolico.minenergia.cl/downloads/docs_eolico_2018.pdf
28. Panofsky, H. A. y Brier, G. W. (1968). Some applications of statistics to meteorology. Pennsylvania State University.
29. Themeßl, M. J., Gobiet, A. y Leuprecht, A. (2011). Empirical-statistical downscaling and error correction of daily precipitation from regional climate models. International Journal of Climatology, 31(10), 1530-1544. https://doi.org/10.1002/joc.2168
30. Douglas, D. H. y Peucker, T. K. (1973). Algorithms for the reduction of the number of points required to represent a digitized line or its caricature. Cartographica, 10(2), 112-122. https://doi.org/10.3138/FM57-6770-U75U-7727
31. Adum, B., Welgaard, Ø., Berstad, A. K. y Radojčić, M. (2022). Using ice monitoring and modelling to increase reliability and optimise OHTL route planning. IWAIS 2022, Montreal.
32. Cazade, G. (2020). Icing forecast and detection operationally for the Province of Quebec grid. 100th AMS Annual Meeting, Boston.
33. Hovmöller, E. (1949). The trough-and-ridge diagram. Tellus, 1(2), 62-66. https://doi.org/10.1111/j.2153-3490.1949.tb01260.x
34. Kjeller Vindteknikk, Statnett, STRI, VTT, UiT y MET Norway (2017). Development of a reliable modeling system for the calculation of rime ice loads on overhead transmission lines. EMS Annual Meeting 2017, EMS2017-659.
35. Met Office (2022). Accelerating impact-based forecasting through the Weather and Climate Science for Service Partnership programme.
36. Neal, R. A., Boyle, P., Grahame, N., Mylne, K. y Sharpe, M. (2014). Ensemble based first guess support towards a risk-based severe weather warning service. Meteorological Applications. https://doi.org/10.1002/met.1377
37. Open-Meteo. ECMWF API (resolución temporal del IFS de 9 km), Pricing y Terms. https://open-meteo.com/en/docs/ecmwf-api (consultado el 25-11-2026).
38. Open-Meteo (blog). Weather data for multiple locations at once. https://openmeteo.substack.com/p/weather-data-for-multiple-locations
39. Sabelström, H. y Hallgren, C. (2025). IceTools: snow and ice loads on overhead power lines. Energiforsk, informe 2025:1135.
40. Taggart, R. J. y Wilke, D. J. (2025). Warnings based on risk matrices: a coherent framework with consistent evaluation. Natural Hazards and Earth System Sciences, 25, 2657. https://doi.org/10.5194/nhess-25-2657-2025
41. UConn y Eversource Energy Center (s. f.). Predicting outages. https://www.eversource.uconn.edu/predicting-outages
42. WMO (2015). WMO Guidelines on Multi-hazard Impact-based Forecast and Warning Services (WMO-No. 1150). Ginebra.
43. Zsótér, E., Buizza, R. y Richardson, D. (2009). "Jumpiness" of the ECMWF and Met Office EPS control and ensemble-mean forecasts. Monthly Weather Review, 137, 3823-3836. https://doi.org/10.1175/2009MWR2960.1
44. Zapata, L. A. (2026). SAMPLT, versión 1.2.0, código fuente (\`BulkScan.js\`, \`main.js\` y \`DataCollect.js\`). Documento interno.
45. Winstral, A. y Marks, D. (2002). Simulating wind fields and snow redistribution using terrain-based parameters to model snow accumulation and melt over a semi-arid mountain catchment. Hydrological Processes, 16(18), 3585-3603. https://doi.org/10.1002/hyp.1238
46. Terrain Tiles (Mapzen). Modelo digital de elevación en formato Skadi, datos de la misión SRTM de 1 segundo de arco. Consultado el 26-11-2026 en https://registry.opendata.aws/terrain-tiles
47. Dirección Meteorológica de Chile (2026). El Clima Hoy, 4 de agosto de 2026: lluvias históricas y sistemas frontales asociados a río atmosférico persistente. <https://climatologia.meteochile.gob.cl/application/publicaciones/documentoPdf/climaHoy/climaHoy20260804.pdf>
48. Proingesa Ltda. (2026). Auditoría técnica de la línea 2x500 kV Cardones–Polpaico: Informe Ejecutivo Final (25081-C-LTR-INF-005, revisión 0, 29-04-2026), 2.1, 4.1, 5.4, 6.1 y 6.2; e Informe de Acción Inmediata (25081-C-LTR-INF-007, revisión 0, 17-04-2026), 6.1, 8.2 y 9.1. Publicada por el Coordinador Eléctrico Nacional el 25-05-2026. <https://www.coordinador.cl/auditorias-tecnicas/documentos/auditoria-de-lineas-de-transmision/linea-cardones-polpaico-2x500-kv/>

\\newpage

\`\`\`{=latex}
\\section*{\\texorpdfstring{\\begin{center}Anexo A\\\\[0.4em]\\large Episodios de Chile\\end{center}}{Anexo A. Episodios de Chile}}
\\addcontentsline{toc}{section}{Anexo A. Episodios de Chile}
\`\`\`

### A.1 Episodios usados en la calibración {-}

| Código | Fecha | Tipo | Nivel | Torre | Fuente o confirmación |
|--------|------------------|----------------------------------|--------|--------|----------------------------------------|
| CL-01 | 14-07-2022 | Falla: corte de subconductores en la grapa del separador | 2 | 825 | W-0016, §4.1; LAT-36-10-03-V5, §5.2 |
| CL-02 | 16-06-2025 | Falla: cruceta deformada por salto de hielo | 2 | 820 | LAT-36-10-03-V5, §2 y §6 |
| CL-03 | 4 y 5-07-2026 | Carga medida en el conductor, sin falla | 0 | 825 | Torres instrumentadas; LAT-36-10-03-V5, §6.5 |
| CL-05 | 21 al 23-06-2024 | Episodio sin falla | 0 | 825 | Usuario, registros de operación |
| CL-06 | 4 y 5-07-2020 | Episodio sin falla | 0 | 825 | Usuario, registros de operación |
| CL-07 | 9 al 11-07-2022 | Episodio sin falla, tres días antes de CL-01 | 0 | 825 | Usuario, registros de operación |
| CL-08 | 02-08-2024 | Episodio sin falla | 0 | 825 | Usuario, registros de operación |
| CL-09 | 12-06-2025 | Episodio sin falla, cuatro días antes de CL-02 | 0 | 820 | Usuario, registros de operación |
| CL-10 | 20 y 21-07-2026 | Lluvia sin carga medida | 0 | 825 | Torres instrumentadas |

: Episodios de Chile

Los episodios CL-05 a CL-09 entraron al inventario porque la primera versión del modelo, con el reanálisis ERA5 y el criterio de Admirat, los marcó Sobre diseño; el autor confirmó que en esos días no hubo eventos en la línea. CL-04, el único caso chileno de los documentos de CIGRE, no tiene fecha y no se usa.

\\newpage

\`\`\`{=latex}
\\section*{\\texorpdfstring{\\begin{center}Anexo B\\\\[0.4em]\\large Reproducción de los resultados\\end{center}}{Anexo B. Reproducción de los resultados}}
\\addcontentsline{toc}{section}{Anexo B. Reproducción de los resultados}
\`\`\`

### B.1 Archivos {-}

Los scripts, los datos y la bitácora del estudio están en \`working-papers/assets/threat-model/\`, y el inventario de eventos, en \`working-papers/assets/events/\`. Este informe y sus figuras están en \`src/data/assets/weather-threat/\`, de donde los lee la aplicación. Todo queda fuera de git. Las rutas de la tabla son desde la carpeta del estudio, salvo la del inventario.

| Archivo | Contenido |
|----------------------------------------|----------------------------------------------------------|
| \`threat-model.mjs\` | El modelo: condición de nieve, acumulación, comparación con el diseño y estados |
| \`threat-model.test.mjs\` | Pruebas con casos calculados a mano |
| \`fetch-calibration.sh\` | Descarga de los pronósticos pasados de Open-Meteo (se corre en el equipo del autor) |
| \`sensors.py\` | Etiquetas de las torres instrumentadas (\`sensor-labels.json\`) |
| \`calibrate.mjs\` | Calibración completa (\`calibration.json\`) |
| \`figures.py\` | Figuras del informe (\`src/data/assets/weather-threat/figures/\`) |
| \`load-inversion.py\` | Carga del conductor desde la inclinación medida |
| \`fetch-wind.sh\` | Descarga del viento horario del pronóstico en las cinco celdas de las torres 809 a 863 (se corre en el equipo del autor) |
| \`data/explorador/\` | Series del Explorador Eólico de cada torre, bajadas del sitio del Ministerio de Energía |
| \`wind-study.py\` | Traslado del viento, contraste con los sensores y frecuencias (\`wind-study.json\`), y tabla de traslado de cada torre (\`wind-transfer.json\`) |
| \`utilization.mjs\` | Utilización del cable y de la torre en los dos eventos |
| \`section-utilization.mjs\` | Utilización en las 46 torres de la Zona I, con dos velocidades de caída del copo, y manguito que lleva el cable a cada fracción de su rotura |
| \`cold-bound.mjs\` | Sensibilidad del manguito a la cota inferior de la nieve fría |
| \`REPORT.md\` | Bitácora del estudio, con las versiones anteriores y sus correcciones |
| \`working-papers/assets/events/events.csv\` | Inventario de eventos con su fuente y su nivel de consecuencia |

: Archivos del estudio

### B.2 Orden de ejecución {-}

Desde la carpeta del estudio:

1. En el equipo del autor, \`sh fetch-calibration.sh\`, que deja los datos en \`data/\`.
2. \`node threat-model.test.mjs\`, que verifica el modelo.
3. \`python3 sensors.py\`, que genera las etiquetas de las torres.
4. \`node calibrate.mjs\`, que produce todas las tablas de Resultados.
5. \`python3 figures.py\`, que dibuja las figuras desde \`calibration.json\`.
6. \`python3 load-inversion.py\`, que verifica el modelo mecánico y convierte la inclinación en carga.
7. En el equipo del autor, \`sh fetch-wind.sh\`; las series del Explorador Eólico se bajan del sitio del Ministerio de Energía, una por torre, a \`data/explorador/\`.
8. \`python3 wind-study.py\`, que produce las tablas del viento y la tabla de traslado de cada torre.
9. \`node utilization.mjs\`, \`node section-utilization.mjs\` y \`node cold-bound.mjs\`, que producen las tablas de utilización y de la cota inferior. La segunda necesita \`sh fetch-section.sh\`, que baja el pronóstico de las 46 torres.

\\newpage

\`\`\`{=latex}
\\section*{\\texorpdfstring{\\begin{center}Anexo C\\\\[0.4em]\\large Hallazgos sobre la confiabilidad de los datos y del modelo\\end{center}}{Anexo C. Hallazgos sobre la confiabilidad de los datos y del modelo}}
\\addcontentsline{toc}{section}{Anexo C. Hallazgos sobre la confiabilidad de los datos y del modelo}
\`\`\`

Este anexo registra lo que se encontró, durante el estudio, sobre cuánto se puede confiar en cada dato y en cada parte del modelo. Cada hallazgo dice qué se encontró, con qué evidencia, qué efecto tiene y en qué estado queda. Se agrega un hallazgo cada vez que aparece; ninguno se borra: si se resuelve, cambia su estado.

### C.1 Datos de entrada {-}

| N.° | Hallazgo | Evidencia | Efecto | Estado |
|----|------------------------|------------------------|------------------------|-------------|
| C-01 | El pronóstico tiene un error de cerca de 1 °C en la cresta cuando precipita, del tamaño de la ventana de 0 a 2 °C de la literatura | Temperatura medida en las torres frente a la del pronóstico (Resultados, Temperatura del pronóstico en la cresta) | La fase no se puede decidir con la temperatura del aire | Resuelto: bulbo húmedo con umbral de −0,3 °C, que absorbe el sesgo del sitio |
| C-02 | El pronóstico no ubica el límite de la nieve entre torres vecinas | La torre 837, 100 m bajo la 825, recibe 6,5 mm de manguito modelado sin carga medida | El modelo puede marcar nieve en torres donde llovió | Abierto: límite de la resolución de 9 km |
| C-03 | El pronóstico no ve el viento de la cresta | Sin trasladar, ninguna torre llega a la mitad de la presión de diseño en diez años | El viento del pronóstico no sirve sin trasladar | Resuelto en parte: traslado por cuantiles al Explorador Eólico |
| C-04 | Los archivos de las torres instrumentadas vienen en hora local | Amanecer, ocaso y centro de la radiación solar de cada estación | Un contraste que los suponga en UTC queda desfasado unas 4 horas | Resuelto: se pasan a UTC |
| C-05 | Los sensores de línea no sirven antes del 14 de abril de 2026 | Saltos de 3 a 20° de inclinación entre el 16 de marzo y el 13 de abril, durante la instalación | Se pierde el primer mes de datos | Resuelto: se usan desde el 14 de abril |
| C-06 | La inclinación de la torre 821 no sirve como señal de carga | No guarda relación estable con la temperatura del conductor | La torre 821 no aporta al contraste de la carga | Abierto |
| C-07 | El anemómetro de cada torre está en la estación meteorológica, montada en una pata de la torre a la altura del conductor y mirando hacia el vano del sensor: se planteó que la estructura lo apantalla cuando el viento viene del lado opuesto | Descripción de la instalación; en la tormenta del 15 y 16 de julio de 2026, la torre 825 (vano hacia el este) midió 7,3 m/s del sur mientras la 837 (vano hacia el suroeste) medía 16,4 m/s del norte. Prueba posterior: en las torres 821, 825 y 843, 20 de 29, 22 de 50 y 41 de 53 muestras del 1 % más fuerte llegan por detrás de la estación | El apantallamiento por la estructura no explica el viento bajo de las torres 821 y 825 | Descartado en las torres 821, 825, 843 y 892; sin poder de prueba en la 837, donde el viento fuerte llega por un costado, ni en la 803, donde detrás de la estación hay un cerro (ver C-22) |
| C-08 | El período de integración del viento no está documentado en ninguna fuente | Ni el Explorador Eólico ni la norma NSEG 5 lo declaran (LAT-36-10-03-V5, 4.1); los anemómetros entregan una muestra cada 30 minutos | La comparación con la presión de diseño mezcla promedios de duración desconocida | Abierto |
| C-09 | El Explorador Eólico no tiene el nivel de 5,5 m en su reconstrucción | El sitio rechaza la petición con ese nivel | En 196 torres con el conductor bajo 10 m se usa el viento de 10 m, por el lado alto | Resuelto, con esa salvedad |
| C-10 | La reconstrucción de 1980 a 2017 del Explorador es estadística, y sus extremos no tienen contraste | LAT-36-10-03-V5, 4.3; el viento de 50 años da hasta 4,3 veces la presión de diseño en torres que operan desde 2019 | Los extremos de viento de la red son una cota alta, no un resultado | Abierto |
| C-11 | La planilla de estructuras no trae la hipótesis de hielo con viento, y uno de sus casos de carga no se identificó | Seis casos por estructura; el sexto equivale a un viento de unos 190 Pa a 15 °C | La tensión y el vano peso con hielo se calculan, no se leen | Abierto |
| C-12 | Las estimaciones de manguito de LatLon son modeladas, no medidas | El propio informe lo declara (LAT-36-10-03-V5, 5.2 y 6.4) | Sirven de comparación, no de calibración | Cerrado: así se usan |
| C-22 | El Explorador Eólico da entre 1,8 y 3,3 veces el viento medido en las torres 803, 821 y 825, y coincide con el máximo medido en la 837, la 843 y la 892 | Distribución de 38 años en los mismos días del calendario (Resultados, Contraste del Explorador con los anemómetros); en ningún año baja al nivel medido en esas tres torres. Las torres 803 y 892 se agregaron después: el hallazgo partió con cuatro torres | El traslado del viento puede dar hasta el triple en la mitad de las torres; no se sabe en cuáles. En ninguna da menos que lo medido en la cola. Afecta el estado del viento solo y el del hielo con viento; los estados del cable no cambian aunque el viento baje a un tercio | Resuelto en la torre 803: la tapa un cerro del suroeste al noroeste, y desde ahí mide un tercio del viento del pronóstico (modelo de elevación de 30 m). Resuelto en la torre 825: la inclinación del cable confirma el viento de la estación, así que el Explorador da ahí cerca del triple por exceso. Abierto en la torre 821: el terreno no la tapa, la estructura tampoco, y su inclinación no sirve; espera la inclinación por minuto y la tensión estimada por el sistema del proveedor |
| C-23 | La referencia de la dirección del viento de las estaciones no está documentada | Los archivos dan grados sin indicar si son respecto del norte ni si son de procedencia | Todo análisis por dirección supone el norte y la procedencia | Abierto |
| C-24 | Las torres de transposición van de a pares en paralelo, una por circuito, y la red las guarda como estructuras consecutivas | Planilla de estructuras: las torres 823 y 824 (tipo 5TR) tienen la misma progresiva, están a 32 m una de la otra y solo la 823 trae vano adelante; hay seis pares en la línea (12 torres) y otros seis en dos líneas más. Confirmado por el autor en terreno | La red tiene un tramo de 32 m que no existe entre las torres de cada par, y le falta el vano de la torre anterior a la segunda del par. Los vanos de viento, de peso y regulador vienen de la planilla y no cambian; sí cambia lo que se calcule con torres consecutivas: el trazado, la longitud y el rumbo de esos vanos | Resuelto en la red (26-11): la segunda torre de cada par guarda la secuencia de la primera, y entre las dos no hay vano. Son 12 pares en tres líneas, no seis en una. No afectó los resultados de este informe |
| C-25 | La altura de la estación meteorológica sobre el terreno no está documentada | El Explorador se comparó a la distancia entre el cable y el suelo de la planilla, que en las torres 803 y 843 supera la altura de la estructura (61,7 frente a 57,5 m, y 105 frente a 48,5 m) | La comparación con el Explorador no es a la altura exacta del anemómetro. En la torre 821, pasar de 27,9 a 20 m cambia la razón de 3,0 a 2,8 veces: no altera la lectura | Abierto: falta la altura de montaje de cada estación |
| C-27 | La tensión del cable no se mide: la estima el sistema del proveedor | Sus paneles leen del sensor la inclinación, la temperatura del conductor, la corriente, la temperatura ambiente y la humedad, y toman la tensión, la flecha y el espesor de hielo de una tabla de resultados de algoritmos. Confirmado por el autor | No hay una tensión medida con que contrastar el modelo: la del proveedor es otra estimación, hecha con la misma inclinación. Sus resultados empiezan el 22 de julio de 2026, después del episodio medido, y traen valores sin filtrar (tensiones de 10.000.000.000 y flechas negativas) | Abierto: falta conocer su método |
| C-28 | La estación meteorológica de la torre 821 está detenida desde el 4 de noviembre de 2026, y el sistema la reemplaza por una estación virtual | Panel del sistema de monitoreo, 26 de noviembre de 2026; confirmado por el autor: falla solo la estación, no el sensor del cable | Los datos de viento de la torre 821 tienen vacíos, y parte de lo que muestra el sistema para ella no es medido | Abierto: en reparación |
| C-29 | El estudio usó los datos de los sensores hasta el 21 de julio de 2026; el sistema de monitoreo tiene mediciones por minuto desde marzo hasta hoy | Inventario del sistema, 26 de noviembre de 2026: entre 342.000 y 363.000 mediciones por sensor. Los algoritmos del proveedor marcan hielo el 8 de agosto de 2026 en las torres 821 y 837 | "El único episodio con carga medida" vale para el período revisado, de marzo al 21 de julio. Agosto y septiembre de 2026 no se han revisado, y pueden tener más episodios | Revisado en parte (26-11): del 21 de julio al 30 de septiembre, la torre 825 no tiene otro aumento de inclinación comparable al del 5 de julio; el mayor es el del 21 de julio (C-30). Falta revisar marzo a noviembre con los datos por minuto y las demás torres |
| C-30 | El modelo no marcó el evento del 21 de julio de 2026 | Entre las 13:45 y las 14:55, hora local, la inclinación del cable de la torre 825 subió de 1,01° a 1,43° en la media de 5 minutos (máximo de un minuto, 1,61°) y cayó en menos de 5 minutos, con el aire entre 0,5 y 0,6 °C, el conductor sobre 1,1 °C y 99 % de humedad; en la torre 821 el aire bajó a −0,5 °C. Equivale a 0,12 a 0,37 kg/m por subconductor (0,17 a 0,55 en el minuto de máximo). El pronóstico dio lluvia con 1,5 a 2,3 °C, y el modelo, Normal. El autor lo describe como lluvia engelante; hay tres fotos del sensor, posteriores al máximo | Una carga de unos 70 minutos, del orden de la mitad de la del 5 de julio, pasó sin aviso. Con estos datos no se puede establecer el tipo de precipitación: el conductor no estuvo bajo 0 °C. Es el segundo episodio con carga medida | Abierto: el registro del evento está en el Anexo D, escrito para consultarlo con un especialista en meteorología |
| C-31 | La historia del sistema de monitoreo trae lecturas previas al montaje de los sensores | En marzo de 2026 la inclinación de las torres 825, 843 y 803 está en otro nivel (4,56°, 5,84° y 1,69°, frente a 1,2°, 26,1° y 20,0° desde abril). Consulta a los paneles, 26 de noviembre de 2026 | Sin descartarlas, la recta de la inclinación normal y su desviación quedan mal en la historia completa. Los archivos que usó el estudio no las traían | Tratado en la aplicación: antes del ajuste se descartan las lecturas secas que se apartan de la mediana más de 4 veces la desviación robusta |
| C-32 | La inclinación de la torre 821 registra el episodio del 4 y 5 de julio de 2026 cuando se descartan sus lecturas anómalas | Las lecturas que quedan fuera del ajuste (27 % de las secas) no son ruido: hasta el 21 de mayo de 2026 el sensor leyó unos 17,4° menos (cerca de 6,8°, frente a 24,2° después), y desde junio no vuelve a ese nivel. Con las lecturas del nivel actual, la desviación normal es de 0,033°, parecida a la de la torre 825 (0,030°), y la regla de carga da dos episodios: el 4 de julio de 21:00 a 21:35 UTC (+0,38°, con −1,0 °C) y el 5 de julio de 04:20 a 04:55 UTC (+0,28°, con −0,6 °C), dentro de las horas con carga de la torre 825. El 21 de julio no pasa el umbral (+0,10°) | La frase "la inclinación de la torre 821 no se usa" vale para los archivos de 30 minutos, sin filtrar. La calibración no cambia: se hizo con la torre 825 | Abierto. El autor confirma que el sensor se intervino el 21 de mayo de 2026 para verificarlo y que la intervención no resolvió el problema; no hay registro de qué se encontró ni una medición independiente del ángulo. En los dos episodios la inclinación sube y baja de forma gradual, en 5 a 10 lecturas, sin saltos. Comprobación posterior con la mecánica del cable (C-35): el nivel actual del sensor (24,21° a 0 °C) está a 0,66° del calculado para su vano (23,55°), como en las torres 892 y 825; el nivel anterior al 21 de mayo (cerca de 6,8°) no corresponde a ese vano. La intervención dejó el sensor en un nivel coherente. Falta la medición en terreno para tratar la 821 como segunda torre con carga medida |
| C-33 | Fuera de las torres 825 y 821, la historia de marzo a noviembre de 2026 no tiene episodios de carga | La regla de carga, con promedios de 5 minutos, no da ninguno en las torres 837, 843, 803 y 892. El único candidato, en la torre 837 el 28 de agosto de 2026 entre las 06:35 y las 06:50 UTC, se descartó: la inclinación alterna de una lectura a otra entre +0,35° y 0° sobre la normal, los saltos vienen desde una hora antes con más de 2 °C, la humedad es de 87 a 88 % y los algoritmos del proveedor no marcan hielo. La estación de esa torre no tiene viento medido a esa hora | Reemplaza la revisión por medias horarias del resto del invierno, que señalaba a la 837 el 7 de agosto y a la 892 el 9 de agosto: con promedios de 5 minutos no pasan el umbral. La regla exige ahora dos lecturas seguidas sobre el umbral, para no contar saltos del cable | Resuelto: candidato descartado; la causa de los saltos de la 837 no está establecida |
| C-34 | Las estaciones meteorológicas no cubren ningún episodio de carga medido, y el sistema de monitoreo no guarda su precipitación | Inventario de la tabla de datos meteorológicos de los paneles, 26 de noviembre de 2026: datos medidos por minuto desde el 24 de julio de 2026 en las estaciones de las torres 825, 843 y 892, y desde el 11 de julio en la de la 803; la de la 837, solo desde noviembre de 2026; la de la 821, casi sin datos (C-28). Ninguna estación tiene valores de precipitación medida: la precipitación que muestran los paneles es de la estación virtual | Los episodios del 4, 5 y 21 de julio de 2026 no tienen viento ni precipitación medidos en la torre. El viento medido sirve desde fines de julio y en cuatro de las seis torres | Abierto: consultar al proveedor si la precipitación medida se entrega por su interfaz de datos |
| C-35 | El vano del sensor de las torres 837 y 843 es el de atrás (hacia la 836 y la 842), no el de adelante | Ángulo del cable sin carga a 0 °C en el punto del sensor, calculado con el modelo mecánico del estudio, frente a la inclinación normal medida: torre 843, 25,86° calculado hacia la 842 y 10,49° hacia la 844, con 25,83° medido; torre 837, 22,21° hacia la 836 y 5,82° hacia la 838, con 22,10° medido. En las demás, con el vano informado: 821, 23,55° y 24,21°; 892, 11,07° y 10,35°; 825, 0,24° y 1,03°; 803, 18,51° y 19,77°. El autor lo confirmó en las fotos de la cámara de la 837; en la 843 las dos vistas son casi iguales. La estación meteorológica mira siempre hacia el vano del sensor, por condición de la instalación (autor) | El análisis del viento por procedencia usaba el vano de adelante en esas dos torres. Repetido con el de atrás: en la 843, 41 de 53 muestras fuertes llegan por detrás de la estación (antes, ninguna), y en la 837 las 23 llegan por un costado. La verificación del modelo mecánico ya usaba los vanos de atrás | Resuelto: corregido en la aplicación (1.17.2) y en la tabla del viento por procedencia |
| C-36 | La hora de las fallas de EV-002 difiere entre fuentes | El registro del estudio (fuente CL-02) da 08:45 en el circuito 2 y 11:15 en el circuito 1; una nota de prensa de 2025 sobre el anuncio de la auditoría técnica de la línea da 08:58 y 11:17 | Ninguno en el modelo: las horas de cada fuente caen en la misma hora UTC | Abierto: confirmar con el estudio de análisis de falla del Coordinador |
| C-37 | El estudio de zonificación de 2014 (P1-LT-01-D129-V0) numera las torres como el diseño de 2013 y analizó el trazado sin la variante con que se construyó la línea | Coordenadas de su Tabla 6.2 frente a la planilla: la T819 y las T828 a T837 son la 843 y la 851 a la 860 (0,0 a 0,1 m), y la T820 está a 18 m de la 844; las T802 a T816 quedan a 0,5 a 2,5 km de la estructura construida más cercana. Su Figura 4-1 muestra la variante y su capítulo 4 declara el trazado sin variantes | Comparar por número confunde torres distintas: las notas de trabajo compararon la T820 (tipo D) con la 820 (tipo 5B), que no está en el estudio. Solo 12 de las 46 estructuras de la Zona I están en posiciones analizadas | Resuelto: la correspondencia se hace por coordenadas (Anexo E, E.5). Abierto: falta el documento que verificó la variante |

: Hallazgos sobre los datos de entrada

\\newpage

### C.2 Modelo {-}

| N.° | Hallazgo | Evidencia | Efecto | Estado |
|----|------------------------|------------------------|------------------------|-------------|
| C-13 | El criterio de Admirat invierte la relación con la consecuencia cuando se aplica al pronóstico | AUC de daño de 0,21 en los episodios de Chile | Marca más hielo en las lluvias que en las fallas | Resuelto: bulbo húmedo |
| C-14 | El episodio del 4 y 5 de julio de 2026 fue nieve húmeda, no hielo en nube | La cresta no bajó de 0 °C entre abril y julio de 2026 | El hielo en nube queda fuera del modelo hasta su primer caso | Cerrado |
| C-15 | La velocidad de caída del copo de 1 m/s no correspondía a la adherencia que usa el modelo | Nygaard et al. (2013) calibraron esa adherencia con 1,7 m/s; con 1 m/s, el evento de 2025 ponía cables sanos sobre su rotura en cinco torres | El manguito de las tormentas grandes salía cerca del doble | Resuelto: 1,7 m/s desde la versión 0.5 |
| C-16 | La magnitud del manguito tiene una sola medición, y leve | Un episodio con carga medida: 0,23 a 0,75 kg/m | La magnitud en tormentas grandes no está validada | Abierto: espera más episodios; el sistema del proveedor estima un espesor de hielo y una tensión, todavía sin contrastar |
| C-17 | El criterio de fase no tiene cota inferior | Acumula también la nieve fría, que según la literatura no se adhiere con viento. Contraste posterior con el criterio de Nygaard et al. (2013): en el episodio medido, las horas con carga tuvieron un bulbo húmedo medido de −0,3 a 0,7 °C, y el del pronóstico fue 2,1 °C más bajo en promedio | En el evento de 2022, el manguito va de 1,23 a 2,21 kg/m según se adhiera o no. Las horas que el pronóstico da por frías pueden ser nieve húmeda en la torre | Abierto: se informa como rango; la evidencia del único episodio medido favorece el modelo sin cota, porque una cota sobre el bulbo húmedo del pronóstico descartaría nieve que sí se adhirió |
| C-18 | La capacidad residual de los cables cortados en 2022 es la que quedó después del corte | 13,6 % y 23,9 % de la capacidad mecánica (W-0016, 4.1) | No dice cuánto había antes ni separa el desgaste de la carga de nieve | Cerrado: no se usa como evidencia de la carga |
| C-19 | El modelo evalúa el activo sano | Las dos fallas tuvieron causas previas: desgaste en 2022 y defectos de fabricación en 2025 | Las fallas de 2022 ocurrieron con el cable al 24 y al 28 % de su rotura: ningún estado las marca | Cerrado: es el alcance del modelo |
| C-20 | El cálculo de la tensión del cable es elástico y usa la rotura nominal | Reproduce la planilla con 1 a 2 % de diferencia en las condiciones de diseño | Cerca de la rotura deja de valer | Abierto |
| C-21 | El estado Sobre diseño no decía qué elemento se compromete | Compara con la hipótesis climática, sin factores de seguridad | No servía para decidir | Resuelto para el cable; abierto para la torre, que espera sus árboles de carga |
| C-26 | La densidad del manguito no tiene medición en el sitio, y la literatura da tres relaciones | Nygaard et al. (2013): 300 + 20 U de 13 casos de Japón, 200 + 20 U con casos de Francia, y 700 kg/m³ constantes medidos en Islandia, con que calibraron la adherencia; la constante debe fijarse según el lugar | El manguito de EV-001 va de 1,69 a 2,60 kg/m según la relación (2,21 con la del modelo); el episodio medido no las distingue | Abierto: espera una medición del diámetro y de la masa del manguito |
| C-38 | La masa del manguito de diseño sobre el conductor de la línea se usó como 1,06 kg/m; ese valor está en daN/m y equivale a 1,08 kg/m | 10 mm de hielo de 0,981 daN/dm³ sobre 24,43 mm son 1,061 daN/m. \`section-utilization.mjs\`, \`sleeve-size.mjs\` y dos tablas de Resultados (Utilización en los dos eventos; Del agua caída al manguito) usaban 1,06 kg/m. El modelo de la aplicación calcula la masa con su fórmula y no tiene el error | Las razones frente a la hipótesis de diseño quedaban alrededor de 1 % altas, y la carga de diseño, 1 % baja | Resuelto el 26 de noviembre de 2026, con aprobación del autor: los dos scripts calculan la masa con la fórmula del modelo. Cambian tres cifras de Resultados (la vertical mayor, de 2,78 a 2,75 veces la hipótesis con 1 m/s, y de 1,71 y 1,64 a 1,69 y 1,63 con 1,7 m/s), la masa de diseño (1,08 kg/m) y dos diámetros; ninguna conclusión |

: Hallazgos sobre el modelo

\\newpage

\`\`\`{=latex}
\\section*{\\texorpdfstring{\\begin{center}Anexo D\\\\[0.4em]\\large Registro del evento del 21 de julio de 2026\\end{center}}{Anexo D. Registro del evento del 21 de julio de 2026}}
\\addcontentsline{toc}{section}{Anexo D. Registro del evento del 21 de julio de 2026}
\`\`\`

Este anexo registra una carga breve en el cable, medida con temperatura cercana a 0 °C, para consultarla con un especialista en meteorología. No hubo falla ni daño. Se puede leer sin el resto del informe.

### D.1 Resumen {-}

El martes 21 de julio de 2026, cerca de las 14:00, hora local, el cable de la línea Nueva Pan de Azúcar - Polpaico, de 500 kV, se cargó en el sector La Dormida durante unos 70 minutos y volvió a su estado normal sin intervención. La carga apareció en media hora, se mantuvo otra media hora y se desprendió en menos de cinco minutos.

Durante el fenómeno, el aire estuvo entre 0,5 y 0,6 °C en la torre donde se midió la carga, y bajó hasta −0,5 °C en una torre vecina. La humedad fue de 99 %, con niebla densa. El conductor, con corriente, no bajó de 1,1 °C.

El fenómeno se registra por dos razones. Es una observación directa, minuto a minuto, de una acumulación sobre el cable que aparece, crece y se va en poco tiempo. Y el pronóstico del tiempo no la anticipó, así que el modelo de este informe no la marcó (Anexo C, C-30).

No se sabe qué tipo de precipitación fue. El autor, que lo observó, lo describió como lluvia engelante; nadie con formación en meteorología lo ha revisado. Este anexo reúne lo medido para que un especialista lo pueda identificar.

### D.2 Dónde y con qué se midió {-}

El sector La Dormida está en la cordillera de la Costa de Chile central, entre las regiones de Valparaíso y Metropolitana. La línea cruza ahí un cordón de 1.500 a 1.650 m de altitud. Es de doble circuito, con cuatro subconductores por fase; cada subconductor es un cable de aluminio de 24,43 mm de diámetro y 0,976 kg/m.

Cada torre instrumentada tiene un sensor montado sobre un subconductor inferior de la fase inferior, a pocos metros de la torre. Mide cada minuto la inclinación del cable, la temperatura del conductor, la temperatura y la humedad del aire, y la corriente, y toma una foto por hora.

| Torre | Latitud | Longitud | Altitud (m) | Qué aporta al registro |
|--------|----------|----------|----------|----------------------------------------------|
| 821 | −33,1157 | −71,1414 | 1.549 | Temperaturas; su inclinación no sirve como señal de carga |
| 825 | −33,1222 | −71,1354 | 1.648 | Temperaturas, inclinación y fotos |
| 837 | −33,0973 | −71,0689 | 1.548 | Temperaturas; su inclinación es ruidosa |

: Torres con mediciones cercanas a 0 °C durante el evento

Cuando el cable recibe peso, se hunde, y su ángulo junto a la torre aumenta: eso es lo que mide la inclinación. En las horas previas al fenómeno, la inclinación de la torre 825 fue de 1,01° en promedio, con una variación de 0,05° entre medias de 5 minutos.

### D.3 Cronología {-}

Las horas son locales, cuatro horas menos que la hora universal. Los valores son medias de 5 minutos.

| Hora | Qué ocurre |
|----------------|------------------------------------------------------------------------|
| 12:15 | El aire empieza a enfriarse en las tres torres; en la 825 está a 1,9 °C |
| 13:10 | El aire baja de 0 °C en la torre 821 |
| 13:40 a 13:55 | Mínimo del aire: −0,5 °C en la 821, 0,5 °C en la 825 y 0,9 °C en la 837. Conductor entre 1,1 y 1,5 °C |
| 13:45 | La inclinación de la 825 empieza a subir (1,12°) |
| 13:50 a 14:15 | Sube y se mantiene entre 1,29° y 1,43°; máximo de un minuto, 1,61° |
| 14:15 a 14:20 | Cae a 1,17° en un solo intervalo de 5 minutos; el aire de la 821 vuelve a pasar de 0 °C |
| 14:20 a 14:55 | Queda un resto, entre 1,07° y 1,18° |
| 15:00 | Inclinación de vuelta en su valor normal; aire a 1,0 °C en la 825 |

: Cronología del evento del 21 de julio de 2026

![Inclinación del cable de la torre 825, y temperatura del aire y del conductor en las torres 821, 825 y 837, el 21 de julio de 2026, en medias de 5 minutos. Las líneas verticales marcan la hora de las tres fotos.](figures/event-2026-07-21.png)

El aumento de inclinación fue de 0,42° en la media de 5 minutos y de 0,60° en el máximo de un minuto. Con el cálculo mecánico del vano que usa este informe (Resultados, Magnitud en el episodio medido), eso equivale a un peso adicional de 0,12 a 0,37 kg por metro de subconductor, con una estimación central de 0,18 kg/m, y de 0,17 a 0,55 kg/m en el minuto de máximo. El rango es ancho porque depende de cuántos vanos se cargaron y de cuánto se mueven las cadenas de aisladores. Como referencia, el otro episodio medido en la misma torre, el 5 de julio de 2026, fue de 0,23 a 0,75 kg/m.

### D.4 Fotos {-}

Las tres fotos son del sensor de la torre 825 y miran a lo largo del vano. Las tomó el autor desde el sistema de monitoreo. Las tres son posteriores al máximo y al desprendimiento: no hay foto entre las 13:45 y las 14:20.

![Foto de las 14:40. Niebla densa; una franja clara a lo largo de la parte inferior del conductor más cercano; gotas colgando del subconductor vecino; manchas blancas en el suelo.](figures/event-2026-07-21-photo-1440.jpg)

![Foto de las 15:40. Niebla algo menos densa; una hilera de gotas o de pequeños carámbanos bajo el conductor más cercano; suelo con manchas blancas.](figures/event-2026-07-21-photo-1540.jpg)

![Foto de las 16:35. Niebla más densa; no se distingue depósito en el cable.](figures/event-2026-07-21-photo-1635.jpg)

En ninguna de las tres se ve un manguito que rodee el conductor: los alambres de la capa exterior se distinguen en su parte superior.

### D.5 Contexto meteorológico disponible {-}

El 21 de julio cierra un temporal de precipitación que afectó a la zona central entre el 14 y el 21 de julio de 2026 (Dirección Meteorológica de Chile, 2026).

El pronóstico del modelo IFS (Integrated Forecasting System) del Centro Europeo de Previsiones Meteorológicas a Plazo Medio, con celdas de 9 km, dio para la torre 825, entre las 12 y las 16 h: lluvia de 0,5 a 1,2 mm por hora; temperatura a 2 m de 1,5 a 2,3 °C; isoterma de 0 °C entre 1.830 y 1.950 m; 2,2 a 2,9 °C en el nivel de 850 hPa, a unos 1.475 m, y 7,9 a 8,1 °C en el de 925 hPa; viento del norte-noroeste de 3 a 5 m/s a 10 m, con rachas de 15 a 20 m/s; y nubosidad baja de 98 a 100 %. Lo medido en la torre 825 fue entre 1 y 1,5 °C más frío que ese pronóstico.

No hay medición de precipitación ni de viento para esas horas: la base de datos de las estaciones meteorológicas de las torres empieza el 24 de julio, y los archivos exportados antes terminan el 21 de julio a las 12:30.

### D.6 Lo que se puede afirmar y lo que no {-}

Con lo medido se puede afirmar:

1. El cable de la torre 825 recibió un peso adicional durante unos 70 minutos, con un máximo cerca de las 14:15.
2. Ocurrió con el aire entre 0,5 y 0,6 °C y 99 % de humedad en esa torre, y con el aire bajo 0 °C en la torre 821, a unos 900 m de distancia y 100 m más abajo.
3. El conductor, que llevaba entre 220 y 250 A por subconductor, estuvo siempre sobre 1,1 °C.
4. El peso se fue en menos de cinco minutos, cuando el aire empezaba a subir.
5. El pronóstico dio lluvia y temperatura sobre 1,5 °C: no anticipó el fenómeno.

Con lo medido no se puede afirmar:

1. Qué tipo de precipitación fue.
2. Si el depósito fue hielo, nieve húmeda o una mezcla.
3. Qué pasó en las partes sin corriente: las torres, el cable de guardia y los aisladores.

### D.7 Tres explicaciones posibles {-}

Se dejan planteadas sin elegir una. Para cada una se indica qué dato la apoya y cuál la contradice.

| Explicación | Qué la apoya | Qué la contradice o falta |
|------------------------|----------------------------------------|----------------------------------------|
| Nieve húmeda: copos parcialmente derretidos que se adhieren | El aire a 0,5 °C con 99 % de humedad cae en la ventana en que la literatura ubica la nieve húmeda, con bulbo húmedo de 0 a 1 °C (Nygaard et al., 2013). El depósito crece rápido y se cae al subir la temperatura. Un episodio parecido se midió en la misma torre el 5 de julio | El pronóstico dio lluvia. Las fotos no muestran un manguito |
| Lluvia engelante: gotas líquidas que se congelan al tocar una superficie bajo 0 °C | Es como la describió el autor. El aire estuvo bajo 0 °C en la torre 821. Las fotos muestran gotas o carámbanos colgando | El conductor no bajó de 1,1 °C. En la torre 825 el aire estuvo sobre 0 °C. El perfil pronosticado no muestra una capa cálida sobre una capa bajo cero, aunque es un modelo y no un sondeo |
| Hielo en nube: gotas de niebla subenfriadas que se congelan al chocar | Niebla densa y humedad de 99 % | Requiere aire bajo 0 °C, y en la torre 825 estuvo sobre cero |

: Explicaciones posibles del evento, con lo que apoya y lo que contradice a cada una

### D.8 Preguntas para el especialista {-}

1. Con estas temperaturas, esta humedad y estas fotos, ¿qué tipo de precipitación es la más probable?
2. ¿Qué observación permitiría confirmarlo: un sondeo, un radar o un registro del tipo de precipitación en una estación cercana?
3. ¿Hay antecedentes documentados de lluvia engelante en Chile central, o en el país?
4. ¿Qué habría que medir en las torres para distinguir estos fenómenos la próxima vez?

### D.9 Datos {-}

Los datos son del sistema de monitoreo de los sensores, consultado el 26 de noviembre de 2026 con autorización del autor. Están en \`working-papers/assets/vigia/\`, fuera del repositorio:

1. \`data/event-2026-07-21-5min.csv\`: torres 821, 825 y 837, de 11:30 a 16:30, hora local, en medias de 5 minutos.
2. \`data/event-2026-07-21-hourly.csv\`: los seis sensores, del 21 al 22 de julio, en medias por hora.
3. \`data/episode-2026-07-04-tower-825-hourly.json\`: el episodio del 4 y 5 de julio en la torre 825, como referencia.
4. \`event-figure.py\`: el script de la figura de este anexo.
5. \`photos/\`: las tres fotos.

### D.10 Límites de este registro {-}

1. La carga se midió en una sola torre. Las otras dos con temperaturas cercanas a 0 °C no tienen una inclinación utilizable.
2. El peso se estima a partir de la inclinación, con un cálculo del vano; no es una medición directa.
3. La temperatura del aire es la del sensor montado en el cable, a pocos metros de un conductor con corriente.
4. Las fotos no cubren el momento del máximo.
5. La hora de cada foto es la del nombre de su archivo.

\\newpage

\`\`\`{=latex}
\\section*{\\texorpdfstring{\\begin{center}Anexo E\\\\[0.4em]\\large Error en la hipótesis de hielo del estudio de zonificación de 2014\\end{center}}{Anexo E. Error en la hipótesis de hielo del estudio de zonificación de 2014}}
\\addcontentsline{toc}{section}{Anexo E. Error en la hipótesis de hielo del estudio de zonificación de 2014}
\`\`\`

Este anexo documenta un error en el estudio que en 2014 pasó a la Zona I un tramo de la línea en La Dormida, y lo que ese error significa para las torres construidas. Se puede leer sin el resto del informe.

### E.1 Resumen {-}

El estudio P1-LT-01-D129-V0 (Consultoría Colombiana S.A., 2014) pasó de la Zona III a la Zona I de la norma NSEG 5 E.n.71 un tramo de 27 torres sobre 1.000 m de altitud, y verificó con PLS-CADD, el programa de diseño de líneas, que las torres elegidas resistieran las cargas de la nueva zona. Para la Zona I, la norma pide una hipótesis de hielo de 10 mm de espesor radial con viento de 20 kgf/m². El estudio lo dice en sus Tablas 4.2 y 4.3, pero la tabla de casos de clima con que calculó, la Tabla 4.4, tiene 0,1 cm: 1 mm.

Las cargas que el estudio informa corresponden a 1 mm. Con ese espesor, el manguito pesa 0,08 kg/m; con 10 mm, 1,08 kg/m, más que el propio conductor (0,976 kg/m). La verificación se hizo con un manguito unas 13 veces más liviano que el de la norma, y con él ninguna torre llegó a sus cargas de trabajo.

Hay un segundo hallazgo. El estudio analizó el trazado de diciembre de 2013, sin variantes, y la línea se construyó con una variante. Por coordenadas, 12 de las 46 estructuras de la Zona I de la línea construida (815 a 860) están en posiciones que el estudio analizó: la 843, la 844 y de la 851 a la 860. Las otras 34 no están en él; entre ellas, la 820, donde se deformó una cruceta en 2025, y tres de las seis torres instrumentadas.

Con los 10 mm de la norma y los datos de diseño de la línea construida, 13 de las 44 estructuras de la Zona I que tienen árbol de carga quedan fuera de los casos que su árbol verifica, con hasta 140 % de utilización; con 1 mm, ninguna. La tensión del cable, en cambio, queda bajo el 50 % de su rotura en los dos casos.

El autor confirmó que no existe una versión posterior del estudio. La auditoría técnica de la línea de 2026 pide validar y cerrar técnicamente esta rezonificación, sin mencionar el espesor del hielo.

### E.2 El estudio {-}

| Campo | Valor |
|--------------------|------------------------------------------------------------------------|
| Código | P1-LT-01-D129-V0 |
| Título | Análisis nueva zonificación climática del proyecto |
| Autor | Consultoría Colombiana S.A., Bogotá |
| Fecha | Revisión 00 de marzo de 2014; portada de mayo de 2014 |
| Línea | 2x500 kV Nueva Pan de Azúcar–Polpaico, Lote 3 |
| Alcance | Abscisas 367.326,56 a 385.417,27: 27 torres sobre 1.000 m, el 2,4 % del proyecto (cap. 4) |

: Datos del estudio de zonificación de 2014

Su capítulo 5, "Mínimo impacto en los diseños", busca mantener en la Zona I las torres de suspensión de la familia de la Zona II. Para eso:

1. Fija los casos de clima del tramo (Tabla 4.4), entre ellos el viento máximo de 60 kgf/m² y el hielo con viento.
2. Revisa el plantillado, es decir, la ubicación y el tipo de cada torre sobre el perfil: cambia el tipo de tres torres, agrega cuerpos a otras tres y pone o aumenta contrapesos en siete (Tablas 6.1 y 6.2).
3. Limita la tensión del cable con hielo al 50 % de su rotura.
4. Calcula con PLS-CADD las cargas de cada tipo de torre y las compara con las de sus árboles de carga (Tabla 6.3). Un árbol de carga da, por punto de amarre, las cargas vertical, transversal y longitudinal que un tipo de torre resiste en cada hipótesis.
5. Anuncia una verificación estructural con hielo por el método 4 de PLS-CADD, que requiere los archivos de diseño de las torres. El documento no presenta su resultado.

### E.3 El error {-}

La Tabla 4.2 del estudio resume la norma: en la Zona I, viento de 20 kgf/m² con hielo de 10 mm de espesor radial, a −10 °C. La Tabla 4.3 lo repite: la condición más desfavorable entre 60 kgf/m² sobre el conductor desnudo y 20 kgf/m² sobre el conductor cubierto por una capa de hielo uniforme de 10 mm.

La Tabla 4.4 da los siete casos de clima del tramo, con las columnas de la tabla de casos de clima de PLS-CADD. El caso 7, hielo con viento, es este:

| Dato del caso 7 | Tabla 4.4 | Norma (Tablas 4.2 y 4.3) |
|------------------------------|------------------------|------------------------|
| Presión del viento | 196,2 Pa (20 kgf/m²) | 20 kgf/m² |
| Temperatura | −10 °C | −10 °C |
| Peso específico del hielo | 0,981 daN/dm³ (1 kgf/dm³) | 1 kgf/dm³ |
| Espesor del hielo | 0,1 cm | 10 mm |

: Caso de hielo con viento de la Tabla 4.4 de P1-LT-01-D129-V0, frente a la norma

Todo coincide salvo el espesor. La columna está en centímetros ("Wire Ice Thickness (cm)"), y 0,1 cm es 1 mm; el valor de la norma es 1,0 cm. Sobre el conductor de la línea, un ACAR 700 MCM de 24,43 mm de diámetro y 0,976 kg/m, la diferencia es esta:

| Espesor | Manguito (kg/m) | Conductor con hielo (kg/m) | Diámetro con hielo (mm) |
|------------------|----------------|----------------|----------------|
| 1 mm (Tabla 4.4) | 0,080 | 1,056 | 26,4 |
| 10 mm (norma) | 1,082 | 2,058 | 44,4 |

: Peso y diámetro del conductor con el hielo de la Tabla 4.4 y con el de la norma

### E.4 Cómo se sabe que el cálculo usó 1 mm {-}

Una cifra en una tabla puede ser un error de transcripción que no llegó al cálculo. Las cargas de la Tabla 6.3, que salen de PLS-CADD, muestran que llegó.

En una torre de suspensión sin ángulo, la carga transversal es, casi toda, el viento sobre el conductor, y ese viento es proporcional al diámetro. Por eso la razón entre la carga transversal con hielo y viento y la de viento máximo depende solo del espesor e del hielo: 196,2 × (24,43 + 2e) / (588,6 × 24,43), con e en milímetros. Con 1 mm da 0,361; con 10 mm, 0,606.

| Tipo de torre | Hielo con viento (kg) | Viento máximo (kg) | Razón | Teórica con 1 mm | Teórica con 10 mm |
|------------|------------|------------|------------|------------|------------|
| A | 973,29 | 2.687,36 | 0,362 | 0,361 | 0,606 |
| AA | 1.286,65 | 3.558,82 | 0,362 | 0,361 | 0,606 |

: Carga transversal máxima de PLS-CADD en las torres de suspensión (P1-LT-01-D129-V0, Tabla 6.3), frente a la razón teórica

Las dos razones son las de 1 mm. La carga vertical apunta a lo mismo: con hielo y viento es casi igual a la de viento máximo (tipo A: 2.367 y 2.435 kg; tipo AA: 3.141 y 3.230 kg), cuando 10 mm de hielo más que duplican el peso del conductor (de 0,976 a 2,058 kg/m).

### E.5 El estudio analizó otro trazado {-}

El estudio numera las torres como el diseño de 2013 (T802 a T837), y la línea construida tiene otra numeración: la torre 837 de la planilla de estructuras no es la T837 del estudio. La correspondencia se hace por coordenadas, porque la Tabla 6.2 del estudio y la planilla usan las mismas (UTM, datum WGS84, huso 19 sur).

| Posiciones de la Tabla 6.2 | Estructura construida más cercana | Distancia | Lectura |
|------------------------|------------------------|------------|------------------------------------|
| T819 y T828 a T837 (11) | 843 y 851 a 860 | 0,0 a 0,1 m | Misma posición, cota y tipo; mismos cuerpos, salvo en la 843 |
| T820 | 844 | 18 m | Casi la misma posición, tipo D en los dos |
| T821 a T827 (7) | 844 a 850 | 60 a 290 m | Plantilladas de nuevo; la línea pasa hasta 289 m más al norte |
| T802 a T805 y T814 a T816 (7) | 814, 815, 840 y 841 | 0,5 a 2,5 km | Otro trazado: la línea construida no pasa por ahí |

: Posiciones del plantillado de P1-LT-01-D129-V0 frente a la línea construida

![Planta del sector: la línea construida en la Zona I (815 a 860) y las posiciones del plantillado de P1-LT-01-D129-V0 (Tabla 6.2), según su distancia a la estructura construida más cercana.](figures/d129-template-vs-built.png)

La línea construida ya está separada del trazado del estudio en la 815, baja hacia el sur por terreno más alto y vuelve a él justo en la 843, que es la T819. El propio estudio muestra ese desvío: en su Figura 4-1, el recuadro "Diseño con variantes" dibuja un trazado en forma de U al sur del de 2013, que vuelve a él en la T819. Y su capítulo 4 dice que la zonificación consideró "el alineamiento definido a la fecha, (sin variantes)". El desvío es más alto: entre la 815 y la 842 la línea construida llega a 1.648 m (torres 823 a 825), y en ese tramo el trazado del estudio no pasa de 1.214 m.

De las 46 estructuras de la Zona I de la planilla, 12 están en posiciones que el estudio analizó (843, 844 y 851 a 860) y 34 no (815 a 842 y 845 a 850). Entre estas últimas están la 820, donde se deformó la cruceta en 2025, y las torres instrumentadas 821, 825 y 837. La T820 del estudio, tipo D, está a 18 m de la 844 construida, tipo 5D; las notas de trabajo de este informe la habían comparado con la 820, tipo 5B, que es otra torre (Anexo C, C-37).

### E.6 Qué cambia con los 10 mm de la norma {-}

El cálculo se repitió en las 46 estructuras de la Zona I de la planilla, sin hielo, con 1 mm y con 10 mm, con los datos de diseño de cada una: vano peso, vano viento, vano regulador y tensión en la condición diaria. La carga es por fase, con sus cuatro subconductores, a −10 °C y con 20 kgf/m² de viento sobre el conductor con hielo. Se compara con el árbol de carga de su tipo en la Tabla 6.3 del estudio: las torres de suspensión 5AZ2 y 5AAZ2 con los árboles A y AA, y las de retención 5B, 5C y 5D con los B, C y D. La transversal se calcula solo en las de suspensión; en las de retención la domina la tensión del cable por el ángulo de la línea. Las dos torres de transposición (823 y 824, tipo 5TR) no tienen árbol en esa tabla.

| Magnitud en las 44 estructuras con árbol | Sin hielo | 1 mm | 10 mm |
|--------------------------------------------------|------------|------------|------------|
| Carga vertical, mayor valor (% del árbol de hielo con viento) | 68 | 73 | 143 |
| Estructuras con la vertical sobre ese árbol | 0 | 0 | 10 |
| Carga transversal en las 23 de suspensión, mayor valor (% del árbol de hielo con viento) | 72 | 78 | 131 |
| Estructuras de suspensión con la transversal sobre ese árbol | 0 | 0 | 6 |
| Estructuras fuera de los dos casos de su árbol | 0 | 0 | 13 |
| Cable, % de su rotura | 21 a 28 | 23 a 29 | 36 a 48 |

: Estructuras de la Zona I de la línea construida frente a sus árboles de carga, sin hielo, con el hielo de la Tabla 4.4 y con el de la norma

Una estructura queda fuera de los dos casos de su árbol cuando ni el de hielo con viento ni el de viento máximo cubren a la vez su carga vertical y su transversal; en las de retención, solo la vertical. La utilización es la del caso que más la favorece. Con 10 mm son estas:

| Estructura | Tipo | Vertical (% del árbol de hielo con viento) | Transversal (% del mismo árbol) | Utilización (%) | Posición analizada en el estudio |
|----------|----------|------------|------------|----------|------------|
| 817 | 5AAZ2 | 132 | 89 | 131,7 | No |
| 819 | 5AAZ2 | 100 | 45 | 100,2 | No |
| 826 | 5AAZ2 | 115 | 40 | 115,1 | No |
| 830 | 5D | 113 | — | 112,7 | No |
| 834 | 5AZ2 | 87 | 131 | 109,8 | No |
| 838 | 5AAZ2 | 113 | 47 | 112,6 | No |
| 840 | 5B | 103 | — | 102,9 | No |
| 843 | 5C | 125 | — | 122,1 | Sí (T819) |
| 847 | 5AAZ2 | 105 | 44 | 104,9 | No |
| 849 | 5AZ2 | 82 | 113 | 103,6 | No |
| 853 | 5AZ2 | 80 | 130 | 100,7 | Sí (T830) |
| 857 | 5C | 143 | — | 139,7 | Sí (T834) |
| 860 | 5AAZ2 | 102 | 86 | 101,5 | Sí (T837) |

: Estructuras de la Zona I fuera de los casos de su árbol de carga con 10 mm de hielo

Con el hielo que usó el estudio, ninguna estructura llega a su árbol y la verificación se cumple con margen (hasta 73 %). Con el de la norma, 13 de 44 quedan fuera de lo que su árbol verifica: en seis la utilización pasa de 110 %, hasta 139,7 % en la 857; en una llega a 109,8 %, y en seis queda entre 100 y 105 %. La 857 está en el tramo donde la línea construida repite el plantillado del estudio, con los mismos vecinos: en ella, con 10 mm, la verificación del propio estudio no se habría cumplido.

Quedar fuera del árbol no es fallar. El árbol da cargas de trabajo, y la torre se diseña para ellas multiplicadas por un factor de sobrecarga que, para la hipótesis de hielo, no está ni en el estudio ni en los criterios de diseño de la línea (P1-LT-01-D100-V07). Lo que se pierde es margen, y nadie lo ha cuantificado: el estudio anuncia una verificación estructural con hielo que no presenta (E.2).

El cable no cambia la conclusión: con 10 mm su tensión sube a entre 36 y 48 % de la rotura, bajo el límite de 50 % del estudio. El error afecta la verificación de las torres, no la del cable.

El cálculo tiene tres límites. La carga es solo la del conductor, sin cadena ni herrajes, así que es un mínimo. El vano peso es el de la condición diaria: con 10 mm de hielo, la constante de catenaria queda entre 2 y 8 % sobre la de esa condición, así que el vano peso cambia poco, pero las estructuras entre 100 y 105 % quedan en el límite. Y los árboles son los de la Tabla 6.3, mientras el autor consigue los definitivos.

### E.7 La auditoría y el estudio meteorológico de 2026 {-}

La auditoría técnica de la línea, a cargo de Proingesa Ltda. y publicada por el Coordinador Eléctrico Nacional en mayo de 2026, trata este estudio:

1. Identifica la rezonificación de La Dormida en un documento de 27 estructuras sobre 1.000 m, que nombra como P1-LT-01-D129-V0, y un modelo de PLS-CADD de la línea con 43 estructuras en el sector, entre la 815 y la 858. Anota la diferencia sin conciliarla (INF-005, 2.1 y 4.1; INF-007, 6.1 y 9.1).
2. Pide validar y cerrar técnicamente la rezonificación: confirmar la condición climática del tramo y su efecto en las cargas de diseño (INF-005, 6.1; INF-007, acción AI-VT-01).
3. Pide verificar que el modelo de PLS-CADD sea el de la línea construida, con la numeración de lo instalado, porque los modelos usan la de la ingeniería de detalle, que no es correlativa (INF-007, acción AI-VT-02).
4. Considera que el hielo, el viento y combinaciones como el salto de hielo no quedaron bien representados ni en el diseño de 2013 ni en la rezonificación de 2014, y pide estudios con períodos de retorno mayores y revisar las torres expuestas a viento y hielo (INF-005, 5.4 y 6.2).
5. No da un espesor de hielo ni menciona la Tabla 4.4.

Este anexo agrega lo que la auditoría no cuantificó: el error concreto de la hipótesis de hielo (E.3 y E.4), la razón de la diferencia entre 27 y 43 estructuras, que es la variante (E.5), y su efecto en las estructuras construidas (E.6).

El estudio meteorológico de LatLon de 2026 toma del texto del estudio de 2014 que el diseño consideró un manguito de 10 mm (LAT-36-10-03-V5, cap. 2). También contrasta su lista de torres con viento sobre la referencia, numeradas como las del cliente (placas 809 a 863), con las seis torres a las que el estudio de 2014 cambió el tipo o los cuerpos (4.4), sin decir cómo hizo corresponder las dos numeraciones. Por coordenadas, cuatro de esas seis son otras estructuras de la línea construida (las T828, T830, T832 y T837 son la 851, la 853, la 855 y la 860), y dos no se construyeron donde el estudio las ubicó (T822 y T823).

### E.8 Lo que se puede afirmar y lo que no {-}

Se puede afirmar:

1. La Tabla 4.4 del estudio da 0,1 cm de hielo en el caso de hielo con viento; la norma y el mismo estudio piden 10 mm.
2. Las cargas de la Tabla 6.3 se calcularon con 1 mm.
3. El estudio analizó el trazado de 2013, sin la variante con que se construyó la línea. De las 46 estructuras de la Zona I, 12 están en posiciones que analizó.
4. Con los 10 mm de la norma, 13 de las 44 estructuras con árbol quedan fuera de los casos de su árbol; con 1 mm, ninguna.
5. Con 10 mm, la tensión del cable queda bajo el 50 % de su rotura.

No se puede afirmar:

1. Con qué hipótesis de hielo se verificaron las estructuras de la variante (815 a 842) y las del tramo plantillado de nuevo (845 a 850): entre los antecedentes de este informe no hay un documento de su verificación.
2. Qué espesor de hielo tiene el modelo de PLS-CADD de la línea construida, que la auditoría recibió.
3. Cuánto margen queda hasta la falla de cada torre: faltan el factor de sobrecarga de la hipótesis de hielo y la verificación estructural.
4. Si el error tuvo que ver con las fallas de 2022 y 2025, que tuvieron causas previas (Discusión, Amenaza y condición del activo). Este anexo no establece esa relación.

### E.9 Preguntas para la empresa y para el diseñador {-}

1. ¿Qué documento zonificó y verificó la variante (815 a 842) y el tramo 845 a 850, y con qué casos de clima?
2. ¿Qué espesor de hielo tiene el caso de hielo con viento del modelo de PLS-CADD de la línea construida?
3. ¿De qué caso de los árboles de la familia de la Zona II salen las cargas que la Tabla 6.3 usa para el hielo, si la Zona II no tiene hielo en la norma? ¿Cuál es su factor de sobrecarga?
4. ¿Se hizo la verificación estructural con hielo por el método 4 de PLS-CADD que anuncia el capítulo 5, y con qué espesor?

### E.10 Datos y límites {-}

Los datos son el estudio (\`working-papers/assets/references/P1-LT-01-D129-V0.pdf\`) y la planilla de estructuras de la línea (\`working-papers/assets/samples/structures.xlsx\`). Las tablas del estudio son imágenes: sus valores se transcribieron a la vista desde las páginas impresas 9 a 11 y 16 a 18. El script \`working-papers/assets/threat-model/d129-ice-check.py\` hace las tres pruebas (E.4 a E.6), guarda sus resultados en \`d129-ice-check.json\` y dibuja la figura de E.5. Las referencias de la auditoría y de LatLon están en la lista de Referencias.

1. Los valores del estudio se transcribieron a mano.
2. La Tabla 6.2 lista 26 posiciones y el capítulo 4 habla de 27 torres; la diferencia no cambia la correspondencia.
3. Las cargas de la Tabla 6.3 son las mayores de cada tipo de torre, no las de cada torre.
4. La carga por fase es solo la del conductor, y el vano peso es el de la condición diaria (E.6).
5. Los árboles de carga son los de la Tabla 6.3; el autor está consiguiendo los definitivos.
`;export{e as default};
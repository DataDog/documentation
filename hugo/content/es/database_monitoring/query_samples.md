---
description: Obtener información sobre las consultas que se están ejecutando y encontrar
  outliers problemáticos
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /database_monitoring/data_collected/
  tag: Documentación
  text: Datos recopilados
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Solucionar problemas
title: Explorar ejemplos de consulta
---

La página de [muestras][1] te ayuda a comprender cuáles consultas se estaban ejecutando en un momento dado. Compara cada ejecución con el rendimiento medio de la consulta y las consultas relacionadas.

La página de muestras presenta un snapshot de un momento de ejecución de las consultas y de las consultas finalizadas recientemente. Dado que se trata del snapshot de un momento específico, no muestra necesariamente una representación de todas las consultas, pero puede indicar proporciones.

## Buscar y filtrar

La página de muestras presenta consultas en todos los productos de bases de datos compatibles juntos (a diferencia de la página de las métricas de consultas, en la que puedes seleccionar la base de datos que quieres consultar). Filtra por la faceta `source` para ver los datos de una base de datos concreta (Postgres o MySQL).

Introduce etiquetas (tags) en el campo de búsqueda para filtrar la lista de muestras de consultas o utiliza las facetas que aparecen a la izquierda. Las facetas incluyen:

- **Core** (Núcleo): Servicios, orígenes de productos de bases de datos (Postgres o MySQL), host y duración.
- **Network** (Red): Dirección IP del cliente y puertos de las aplicaciones o proxies que se conectan a la base de datos.
- **Database* (Base de datos): Nombres de bases de datos, un deslizador de costes del plan de explicación, índices, un deslizador de recuento de filas para el número de filas devueltas o afectadas por consultas, sentencias de consultas y usuarios.
- **Facetas específicas de Postgres y MySQL**

Haz clic en **Options** (Opciones) para añadir columnas a la tabla. Haz clic en los encabezados de las columnas para ordenarlas por una determinada métrica.

### Coste del plan de explicación

El coste del plan de explicación es una medida sin unidades que la base de datos utiliza para comparar dos planes entre sí. Se corresponde aproximadamente con el número de elementos de los bloques o páginas de la base de datos, pero es útil sobre todo para comparar dos planes en términos relativos, no en los términos absolutos de un único plan. El cálculo del coste del plan de explicación ayuda a la base de datos a elegir el plan que va a utilizar.

La página de muestras de consultas permite filtrar, ordenar y comparar los costes del plan de explicación de varias consultas. En este contexto, el coste del plan de explicación no debe tomarse de forma absoluta. Una consulta con un coste del plan de explicación de 8,5 no tiene necesariamente un mejor rendimiento que otra con un coste de 8,7. Pero si dos consultas tienen costes muy diferentes cuando se esperaría que fueran similares, puede ser beneficioso investigar por qué. Además, puedes ordenar tus consultas por coste para ver cuáles son las más caras, independientemente de factores externos como la latencia de red.

### Índices

Puedes filtrar las consultas con planes de explicación por índice de base de datos, para ver qué consultas utilizan un índice específico. También puedes encontrar índices utilizados con poca frecuencia, seleccionando un periodo de tiempo largo, como una semana (que es una buena representación de muestras de consultas a lo largo del tiempo) y buscando los índices menos utilizados (el número más bajo en la lista de facetas de índices). A continuación, puedes considerar si el rendimiento obtenido por tener ese índice justifica el coste de mantenerlo en la base de datos.

### Recuento de filas

Filtra u ordena para encontrar consultas que devuelvan o afecten a un gran número de filas, en el periodo de tiempo seleccionado.

### Duración

Filtra u ordena para encontrar las consultas que tardan más en ejecutarse durante el periodo de tiempo seleccionado. Si quieres optimizar el rendimiento general, puedes localizar al responsable de estas consultas lentas e intentar mejorarlas.

### Detalles de la muestra

Haz clic en una consulta de la tabla para abrir su página de detalles de las muestras. Utiliza los cuadros Source (Origen), Host y Client IP (IP del cliente) en la parte superior, para filtrar la página de muestras de consultas por los valores de esta muestra o para consultar otra información de Datadog como el dashboard del host o las métricas del tráfico de red de la IP del cliente.

{{< img src="database_monitoring/dbm_sd_actions.png" alt="Cuadros de acciones de los detalles de las muestras" style="width:100%;">}}

Por ejemplo, abriendo la página de tráfico de red y agrupando por servicio, puedes ver qué servicio ejecuta la consulta desde esa IP.

Los gráficos muestran las métricas de rendimiento de la consulta, el número de ejecuciones, la duración y las filas por consulta durante el periodo de tiempo especificado, si se trata de una [consulta principal][2], con una línea que indica el rendimiento del snapshot de la muestra que estás consultando. Si las métricas no están disponibles porque no se trata de una consulta principal, los gráficos están vacíos.

{{< img src="database_monitoring/dbm_sd_graphs.png" alt="Gráficos de métricas del rendimiento de las consultas con un indicador para esta consulta" style="width:100%;">}}

La sección Plan de explicación muestra las estadísticas de duración y coste de la muestra actual y los promedios y p90 de todos los snapshots recopilados a lo largo del periodo de tiempo.

El plan de explicación también muestra medidas para cada nodo (paso) del plan: coste inicial, coste total, filas del plan y amplitud del plan. Pasa el cursor sobre el encabezado de la columna para ver una descripción de cada medida.

{{< img src="database_monitoring/dbm_sd_explain_plan.png" alt="Estadísticas y métricas de pasos de muestras del plan de explicación" style="width:100%;">}}

## Explorar otras visualizaciones

Además de la vista de la lista predeterminada, puedes ver los datos de las muestras de consultas como series temporales, listas principales o tablas haciendo clic en uno de los botones **Visualize as** (Visualizar como). Esto puede revelar interesantes maneras de ver los datos. Por ejemplo, para ver las consultas más lentas que se ejecutan en un centro de datos, selecciona **Timeseries** (Serie temporal), agrupa por `Statement` y grafica la duración media:

{{< img src="database_monitoring/dbm_qs_timeseries_viz.png" alt="Buscar las consultas más lentas" style="width:100%;">}}

O puedes encontrar un outlier, como por ejemplo una consulta que generalmente se ejecuta rápidamente, pero que algunas veces se ejecuta lentamente, creando gráficos de su duración p90 o p99.

Utiliza las visualizaciones de tablas para elaborar resúmenes de tipo informe y compartirlos con los demás. Por ejemplo, crea una tabla de las consultas con peor rendimiento (duración p75) e incluye los valores del coste medio del plan para cada consulta:

{{< img src="database_monitoring/dbm_qs_p75_duration_table.png" alt="Tabla de consultas con duración p75" style="width:100%;">}}

Utiliza el botón **Export** (Exportar) para compartir los datos con tu equipo de ingenieros e iniciar un debate sobre dónde centrar los esfuerzos de mejora.

## Dashboards de Database Monitoring (Monitorización de bases de datos)

Para acceder rápidamente a los dashboards que muestran visualizaciones de métricas de infraestructuras relacionadas con bases de datos y de consultas, haz clic en el enlace **Dashboards** en la parte superior de la página. Utiliza los dashboards predefinidos o clónalos y personalízalos para adaptarlos a tus necesidades.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/samples
[2]: /es/database_monitoring/data_collected/#which-queries-are-tracked
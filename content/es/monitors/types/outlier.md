---
aliases:
- /es/guides/outliers
- /es/monitors/monitor_types/outlier
- /es/monitors/create/types/outlier/
description: Alerta sobre los miembros de un grupo que se comportan de forma diferente
  a los demás
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Consultar el estado de tu monitor
- link: /watchdog/insights/
  tag: Documentación
  text: Detección outlier en Watchdog Insights
kind: documentación
title: Monitor outlier
---

## Información general

La detección outlier es una función algorítmica que permite detectar cuándo un grupo específico se comporta de forma diferente en comparación con sus pares. Por ejemplo, podrías detectar que un servidor web de un grupo está procesando un número inusual de solicitudes, o que se están produciendo muchos más errores 500 en una zona de disponibilidad de AWS que en las demás.

{{< img src="monitors/monitor_types/outliers/outliers-metric-alert.png" alt="alerta de métrica outliers" style="width:80%;">}}

## Creación de un monitor

Para crear un [monitor outlier][3] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> Outlier* (Monitores --> Nuevo monitor --> Outlier).

### Definir la métrica

Cualquier métrica que informe actualmente a Datadog está disponible para monitores. Para más información, consulta la página [Monitor de métrica][2].

El monitor outlier requiere una métrica con un grupo (hosts, zonas de disponibilidad, particiones, etc.) que tenga tres o más miembros, que muestren un comportamiento uniforme.

### Definir condiciones de alerta

* Activar una alerta distinta para cada outlier `<GROUP>`
* durante los últimos `5 minutes`, `15 minutes`, `1 hour`, etc. o `custom` para fijar un valor entre 1 minuto y 24 horas.
* Utilizando el algoritmo `MAD`, `DBSCAN`, `scaledMAD`, o `scaledDBSCAN`
* tolerancia: `0.33`, `1.0`, `3.0`, etc.
* %: `10`, `20`, `30`, etc. (solo para algoritmos `MAD`)

Al configurar un monitor outlier, el intervalo de tiempo es una consideración importante. Si el intervalo temporal es demasiado amplio, es posible que no recibas la alerta a tiempo. Si el intervalo temporal es demasiado corto, las alertas no son tan resistentes a los picos puntuales.

Para asegurarte de que tu alerta está correctamente calibrada, ajusta el intervalo de tiempo en el gráfico de previsualización y utiliza el botón de retroceso (<<) para mirar hacia atrás en el tiempo en outliers que habrían activado una alerta. Además, puedes utilizar esta función para ajustar tus parámetros a un algoritmo outlier específico.

{{< img src="monitors/monitor_types/outliers/outliers-new-monitor-graph-calibrate.png" alt="calibración de gráfico del nuevo monitor outlier" style="width:80%;">}}

#### Algoritmos

Datadog ofrece dos tipos de algoritmos de detección outlier: `DBSCAN`/`scaledDBSCAN` y `MAD`/`scaledMAD`. Es recomendado utilizar el algoritmo por defecto, DBSCAN. Si tienes problemas para detectar los outliers correctos, ajusta los parámetros de DBSCAN o prueba con el algoritmo MAD. Los algoritmos escalados pueden ser útiles si tus métricas son a gran escala y están muy agrupados.

{{< tabs >}}
{{% tab "DBSCAN" %}}

[DBSCAN][1] (agrupación espacial basada en la densidad de aplicaciones con ruido) es un popular algoritmo de agrupación. Tradicionalmente, DBSCAN toma:

1. Un parámetro `ε` que especifica un umbral de distancia por debajo del cual se considera que dos puntos están próximos.
2. El número mínimo de puntos que tienen que estar dentro del `ε-radius` de un punto para que ese punto pueda empezar a aglomerarse.

Datadog utiliza una forma simplificada de DBSCAN para detectar outliers en series temporales. Cada grupo se considera un punto en *d* dimensiones, donde *d* es el número de elementos de la serie temporal. Cualquier punto puede aglomerarse, y cualquier punto que no esté en el mayor clúster se considera un outlier. El umbral de distancia inicial se establece creando una nueva mediana de las series temporales, tomando la mediana de los valores de las series temporales existentes en cada punto temporal. Se calcula la distancia euclidiana entre cada grupo y la serie mediana. El umbral se establece como la mediana de estas distancias, multiplicada por una constante de normalización.

**Parámetros**<br>
Esta implementación de DBSCAN toma un parámetro, `tolerance`, la constante por la que se multiplica el umbral inicial para obtener el parámetro de distancia ε de DBSCAN. Establece el parámetro de tolerancia de acuerdo con la similitud de comportamiento que esperas de tus grupos; los valores más grandes permiten una mayor tolerancia en cuanto a la desviación de un grupo con respecto a sus pares.

[1]: https://en.wikipedia.org/wiki/DBSCAN
{{% /tab %}}
{{% tab "MAD" %}}

La [MAD][1] (desviación absoluta mediana) es una medida robusta de la variabilidad y puede considerarse el análogo robusto de la desviación típica. Los estadísticos robustos describen los datos de un modo que no se ve influido por outliers.

**Parámetros**<br>
Para utilizar MAD para tu monitor outlier, configura los parámetros `tolerance` y `%`.

La tolerancia especifica el número de desviaciones que un punto (independientemente de los grupos) debe alejarse de la mediana para que se considere un outlier. Este parámetro debe ajustarse en función de la variabilidad esperada de los datos. Por ejemplo, si los datos se encuentran generalmente dentro de un pequeño rango de valores, entonces debe ser pequeño. De lo contrario, si los puntos pueden variar mucho, entonces establece una escala más alta para que las variabilidades no desencadenen falsos positivos.

El porcentaje se refiere al porcentaje de puntos del grupo considerados como outliers. Si se supera este porcentaje, todo el grupo se marca como outlier.

[1]: https://en.wikipedia.org/wiki/Median_absolute_deviation
{{% /tab %}}
{{% tab "Scaled" %}}

DBSCAN y MAD tienen versiones escaladas (scaledDBSCAN y scaledMAD). En la mayoría de las situaciones, los algoritmos escalados se comportan igual que sus homólogos normales. Sin embargo, si los algoritmos DBSCAN/MAD están identificando outliers dentro de un grupo estrechamente agrupado de métricas, y deseas que el algoritmo de detección outlier escale con la magnitud global de las métricas, prueba los algoritmos escalados.

{{% /tab %}}
{{< /tabs >}}

##### DBSCAN frente a MAD

¿Qué algoritmo deberías utilizar? Para la mayoría de los sitios outlier, cualquier algoritmo funciona bien con la configuración predeterminada. Sin embargo, hay casos sutiles en los que un algoritmo es más apropiado.

En la siguiente imagen, un grupo de hosts está vaciando sus buffers al mismo tiempo, mientras que un host está vaciando su buffer un poco más tarde. DBSCAN lo detecta como un outlier mientras que MAD no. Este es un caso en el que se prefiere usar MAD, ya que la sincronización del grupo es solo un artefacto de que los hosts se reinician al mismo tiempo. Por otro lado, si en lugar de buffers, las métricas representaran un trabajo programado que debería sincronizarse a través de hosts, DBSCAN sería la elección correcta.

{{< img src="monitors/monitor_types/outliers/outliers-flushing.png" alt="vaciamiento de outliers" style="width:80%;">}}

### Condiciones de alerta avanzadas

Para obtener instrucciones detalladas sobre las opciones avanzadas de alerta (resolución automática, retraso de nuevo grupo, etc.), consulta la página [Configuración de monitor][3].

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][4].

## API

Para crear monitores outlier mediante programación, consulta la [Referencia de la API de Datadog][5]. Datadog recomienda [exportar un JSON del monitor][6] para crear la consulta para la API.

## Solucionar problemas

Los algoritmos outlier están configurados para identificar grupos que se comportan de forma diferente a sus compañeros. Si tus grupos muestran un comportamiento de "bandas" como el que se muestra a continuación (tal vez cada banda representa un fragmento diferente), Datadog recomienda el etiquetado de cada banda con un identificador, y configurar alertas de detección outlier en cada banda por separado.

{{< img src="monitors/monitor_types/outliers/outliers-banding.png" alt="bandas de outliers" style="width:80%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/outlier
[2]: /es/monitors/types/metric/#define-the-metric
[3]: /es/monitors/configuration/#advanced-alert-conditions
[4]: /es/monitors/notify/
[5]: /es/api/v1/monitors/#create-a-monitor
[6]: /es/monitors/manage/status/#settings
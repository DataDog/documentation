---
aliases:
- /es/monitors/monitor_types/real_user_monitoring
- /es/monitors/create/types/real_user_monitoring/
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Explorar tus datos de RUM
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado de tu monitor
kind: documentación
title: Monitor Real User Monitoring
---

## Información general

[Real User Monitoring (RUM)][1] de Datadog proporciona visibilidad en tiempo real de la actividad individual de los usuarios en aplicaciones web y móviles. Aborda casos de uso de seguimiento del rendimiento, gestión de errores, análisis y asistencia. 

Después de activar RUM para tu organización, puedes crear un monitor de RUM para que te avise cada vez que un tipo de evento RUM específico supera un umbral predefinido durante un periodo de tiempo determinado.

## Crear un monitor de RUM

Para crear un monitor de RUM en Datadog, primero ve a [**Monitors** > **New Monitor** > **Real User Monitoring**][2] (Monitores > Nuevo monitor > Real User Monitoring).

<div class="alert alert-info"><strong>Nota</strong>: Existe un límite predeterminado de 1000 monitores de RUM por cada cuenta. Si estás alcanzando este límite, considera la posibilidad de utilizar <a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">alertas múltiples</a> o <a href="/help/">ponte en contacto con el servicio de asistencia.</div>

### Definir la consulta de búsqueda

A medida que amplías tus filtros de búsqueda, el gráfico situado sobre la barra de búsqueda se actualiza.

1. Crea una consulta de búsqueda utilizando la misma lógica que en una [búsqueda del Explorador RUM][3].
2. Elige monitorizar un recuento de eventos RUM, una [faceta][4] o una [medida][5].
    * **Monitorizar un recuento de eventos RUM**: utiliza la barra de búsqueda (opcional) y **no** selecciones una faceta o medida. Datadog evalúa el número de eventos RUM en un marco temporal seleccionado y luego lo compara con las condiciones del umbral.
    * **Monitorizar una faceta**: si seleccionas una [faceta][4], el monitor alerta sobre el `Unique value count` de la faceta.
    * **Monitorizar sobre una medida**: si seleccionas una [medida][5], el monitor alerta sobre el valor numérico de la faceta RUM (similar a un monitor de métricas). Selecciona un tipo de agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` o `max`).
3. Agrupar eventos RUM por múltiples dimensiones (opcional):
  Todos los eventos RUM que coinciden con la consulta se agregan a grupos basados en el valor de hasta cuatro facetas. Cuando hay varias dimensiones, los valores máximos se determinan según la primera dimensión, luego según la segunda dimensión dentro de los valores máximos de la primera dimensión, y así sucesivamente hasta la última dimensión. El límite de dimensiones depende del número total de dimensiones:
   * **1 faceta**: 1000 valores máximos
   * **2 facetas**: 30 valores máximos por faceta (900 grupos como máximo)
   * **3 facetas**: 10 valores máximos por faceta (1000 grupos como máximo)
   * **4 facetas**: 5 valores máximos por faceta (625 grupos como máximo)



4. Configurar la estrategia de agrupación de alertas (opcional).
   * **Alerta simple**: las alertas simples agregan todas las fuentes de información. Recibirás una alerta cuando el valor agregado cumpla las condiciones establecidas. Si la consulta tiene un `group by` y seleccionas **Alerta simple**, recibirás una alerta cuando uno o varios valores de grupo superen el umbral. Puedes utilizar esta estrategia para reducir el ruido de una notificación.
   * **Alerta múltiple**: las alertas múltiples aplican la alerta a cada fuente en función de tus parámetros de grupo. Se genera un evento de alerta para cada grupo que cumple las condiciones establecidas. Por ejemplo, puedes agrupar una consulta por `@browser.name` para recibir una alerta distinta para cada navegador, cuando el número de errores es elevado.

   {{< img src="monitors/monitor_types/rum/define-the-search-query.png" alt="Define the search query" (Definir la consulta de la búsqueda) style="width:80%;" >}}

5. Añade múltiples consultas y aplica fórmulas y funciones (opcional):

    * **Consultas múltiples**: haz clic en **Add Query** (Añadir consulta) para analizar la relación entre múltiples conjuntos diferentes de datos RUM.
    * **Fórmulas y funciones**: después de añadir las consultas deseadas, haz clic en el icono **Add Function** (Añadir función) para añadir un cálculo matemático. El siguiente ejemplo calcula la tasa de error en una página de carrito utilizando la fórmula `(a/b)*100`.

   {{< img src="monitors/monitor_types/rum/rum_multiple_queries_2.png" alt="A monitor configured to alert on the error rate of a cart page. This monitor has two queries (a and b) and contains a formula: (a/b)*100." (Monitor configurado para emitir alertas sobre la tasa de error de una página de carrito. El monitor tiene dos consultas (a y b) y contiene la fórmula (a/b)*100. style="width:80%;" >}}

### Definir tus condiciones de alerta

Se activa una alerta cada vez que una métrica supera un umbral.

* Se activa cuando la métrica es `above`, `above or equal to`, `below` o `below or equal to`.
* El umbral durante los últimos `5 minutes`, `15 minutes`, la última `1 hour` o el último`custom` para establecer un valor entre 5 minutos y 48 horas.
* Umbral de alerta `<NUMBER>`.
* Umbral de advertencia `<NUMBER>`.

#### Sin datos y por debajo de las alertas

Para recibir un notificación cuando una aplicación deja de enviar eventos RUM, establece la condición en `below 1`. Esto notifica cuando ningún evento RUM coincide con la consulta del monitor en un periodo de tiempo determinado en todos los grupos agregados.

Cuando se divide el monitor por cualquier dimensión (etiqueta o faceta) y se utiliza una condición `below`, la alerta se activa **si y sólo si** existen eventos RUM para un grupo determinado y el recuento está por debajo del umbral o si no existen eventos RUM para **todos** los grupos.

#### Ejemplos de alertas

Por ejemplo, este monitor se activa si y sólo si no existen eventos RUM para todas las aplicaciones:

  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_application_id.png" alt="The monitor configuration page with the search query left blank, set to the count of all RUM events and grouped by @application.id over the last 5 minutes. The Set alert conditions section is configured to trigger when the value is below the threshold of 1, and if data is missing for more than 5 minutes it is configured to evaluate as zero" (Página de configuración del monitor con la consulta de búsqueda vacía, configurada con el conteo de todos los eventos RUM, agrupados por @application.id durante los últimos 5 minutos. La sección Configurar condiciones de alerta está configurada para activarse cuando el valor es inferior al umbral de 1 y, si no hay datos durante más de 5 minutos, está configurada para evaluar la cantidad como 0) style="width:70%;" >}}

Y este monitor se activa si no existen logs para la aplicación `Shop.ist`:

  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_shopist.png" alt="The monitor configuration page with Application Id:Shopist entered in the search query, set to the count of all RUM events matching that application over the last 5 minutes. The Set alert conditions section is configured to trigger when the value is below the threshold of 1, and if data is missing for more than 5 minutes it is configured to evaluate as zero" (Página de configuración del monitor con Id:Shopist de la aplicación ingresado en la consulta de búsqueda, configurada con el conteo de todos los eventos RUM que coinciden con esa aplicación durante los últimos 5 minutos. La sección Configurar condiciones de alerta está configurada para activarse cuando el valor es inferior al umbral de 1 y, si no hay datos durante más de 5 minutos, está configurada para evaluar la cantidad como 0) style="width:70%;" >}}

#### Condiciones de alerta avanzadas

Para obtener más información sobre las opciones avanzadas de alerta, como el retraso en la evaluación, consulte [Configurar monitores][6].

### Notificaciones

Para obtener más información sobre la sección **Configurar notificaciones y automatizaciones**, consulta [Notificaciones][7].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/
[2]: https://app.datadoghq.com/monitors/create/rum
[3]: /es/real_user_monitoring/explorer/search/
[4]: /es/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[5]: /es/real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[6]: /es/monitors/configuration/#advanced-alert-conditions
[7]: /es/monitors/notify/
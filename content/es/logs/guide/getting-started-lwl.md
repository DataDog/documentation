---
algolia:
  tags:
  - Logging Without Limits
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Obtener más información sobre el Explorador de logs
- link: /logs/explorer/#patterns
  tag: Documentación
  text: Para familiarizarte con la vista de patrones de logs
- link: /logs/live_tail/
  tag: Documentación
  text: Explorar Live Tail
- link: /logs/logs_to_metrics/
  tag: Documentación
  text: Aprender a generar métricas a partir de logs consumidos
kind: Guía
title: Guía Logging Without LimitsTM
---

{{< img src="logs/lwl_marketecture_20231030.png" alt="Logging without LimitsTM" >}}

## Información general

Las aplicaciones basadas en la nube pueden generar logs a un ritmo de millones por minuto. Pero como tus logs no son todos igual de valiosos en todo momento, Datadog [Logging without LimitsTM][1] proporciona flexibilidad desacoplando [consumo e indexado de logs][2].

Esta guía identifica componentes clave de Logging Without LimitsTM como [patrones](#2-identify-high-volume-logging-patterns), [filtros de exclusión](#3-create-a-log-pattern-exclusion-filter), [métricas basadas en logs](#4-generate-metrics-to-track-excluded-logs) y [monitores](#create-an-anomaly-detection-monitor) que pueden ayudar a organizar mejor el Explorador de logs y monitorizar tus KPI a lo largo del tiempo.

## 1. Identificar tu estado de servicio con más logs

Tu estado de servicio con más logs contiene varios logs, algunos de los cuales pueden ser irrelevantes para solucionar problemas. Por ejemplo, es posible que quieras investigar todos los logs de códigos de respuesta 4xx y 5xx, pero excluir todos los logs de códigos de respuesta 200 del Explorador de logs, para agilizar la resolución de problemas durante una interrupción importante o un evento. Si primero identificas el estado del servicio correspondiente, podrás averiguar rápidamente qué estado de servicio genera más logs y es mejor excluir de la [vista del Explorador de logs][3].

{{< img src="logs/guide/getting-started-lwl/identify_logging_service.mp4" alt="Identifica un estado de servicio con más logs" video=true style="width:100%;">}}

**Para identificar tu estado de servicio con más logs**:

1. En el Explorador de logs, selecciona **Graph view** (Vista de gráficos), situada junto a la barra de búsqueda.
2. Debajo de la barra de búsqueda, configura el grupo `*` de recuento por `service` y limítalo a `top 10`.
3. Selecciona **Top List** (Lista principal), en el menú desplegable situado junto a Hide controls (Ocultar controles).
4. Haz clic en el primer servicio de la lista y selecciona **Search for** (Buscar), en el menú desplegable. Esto genera una búsqueda, visible en la barra de búsqueda de arriba, basada en tu faceta de servicio.
5. Cambia de la agrupación por `service` a la agrupación por `status`. Esto genera una lista de estados principales de tus servicios.
6. Haz clic en el primer estado de la lista y selecciona **Search for** (Buscar), en el menú desplegable. Esto añade tu faceta de estado a la búsqueda.

**Nota**: Estos pasos pueden aplicarse a cualquier consulta de gestión de logs de gran volumen para generar una lista principal. Puedes agrupar por cualquier faceta, como `host` o `network.client.ip`, en lugar de `service` o `status`.

## 2. Identificar patrones de gestión de logs de gran volumen

Ahora que ya has identificado tu estado de servicio con más logs, cambia a la [vista de patrones][4], situada junto a la vista de gráficos en la parte superior izquierda del Explorador de logs, a fin de ver automáticamente los patrones de tus logs para el contexto seleccionado.

Un contexto se compone de un intervalo de tiempo y una consulta de búsqueda. Cada patrón viene con secciones resaltadas para llevarte directamente a sus funciones características. Un minigráfico muestra una cronología aproximada del volumen de sus logs para ayudarte a identificar en qué se diferencia ese patrón de otros. Las secciones de logs que varían dentro del patrón se resaltan para ayudarte a identificar rápidamente las diferencias entre las líneas de logs.

Haz clic en el patrón del log que quieres excluir, para ver un ejemplo de logs subyacentes.

{{< img src="logs/guide/getting-started-lwl/patterns_context_panel.jpg" alt="Contexto de los patrones" style="width:100%;">}}

La vista de patrones es útil para identificar y filtrar patrones ruidosos. Muestra el número de logs que coinciden con un patrón, divididos por servicio y estado. Haz clic en el primer patrón para ver un log detallado de eventos relacionados con tu estado. Un panel contextual se rellena con información sobre el patrón de tu estado más ruidoso.

## 3. Crear un filtro de exclusión de patrones de logs

El panel contextual de patrones enumera todas las instancias (eventos) de un patrón de log y crea una consulta personalizada de búsqueda basada en el patrón seleccionado. Utiliza esta consulta en un filtro de exclusión para eliminar esos logs de tu índice.

**Para crear un filtro de exclusión**:

1. Haz clic en un patrón en la lista de vistas de patrones.
2. Haz clic en el botón **Add Exclusion Filter** (Añadir filtro de exclusión), situado en la esquina superior derecha. Este botón se deshabilita si menos de la mitad de los logs de este patrón caen en un único índice.
3. La página de configuración de índices de logs se abre en una nueva pestaña con un filtro de exclusión precargado para el índice, en el que aparecen la mayoría de los logs de ese patrón.
4. El filtro de exclusión se rellena automáticamente con una consulta de búsqueda generada y asociada al patrón. Introduce el nombre del filtro, define un porcentaje de exclusión y guarda el nuevo filtro de exclusión.

{{< img src="logs/guide/getting-started-lwl/exclusion_filter_new.mp4" alt="Filtro de exclusión" video=true style="width:100%;">}}

**Nota**: Si un log coincide con varios filtros de exclusión, sólo se aplica la regla del primer filtro de exclusión. Un log no es muestreado o excluido varias veces por diferentes filtros de exclusión.

En este ejemplo, el servicio `email-api-py` con el estado `INFO` y el patrón `response code from ses 200` se filtra con un filtro de exclusión. La eliminación de cualquier patrón de gestión de logs de gran volumen similar a este del Explorador de logs te ayuda a reducir el ruido y a identificar problemas más rápidamente. Sin embargo, estos logs **sólo** son excluidos de la indexación. Se siguen consumiendo y están disponibles para su visualización en [Live Tail][5] y pueden enviarse a [archivos de logs][6] o utilizarse para [generar métricas][7].

{{< img src="logs/guide/getting-started-lwl/live_tail.png" alt="Página de Live Tail que muestra una lista de logs y el menú desplegable del intervalo de tiempo" style="width:100%;">}}

Los filtros de exclusión pueden deshabilitarse en cualquier momento, cambiando la opción de deshabilitación situada a la derecha del filtro. También pueden modificarse y eliminarse, situándose sobre el filtro y seleccionando la opción para editar o eliminar.

## 4. Generar métricas para realizar un seguimiento de los logs excluidos

Una vez que un patrón de logs se excluye del Explorador de logs, puedes seguir realizando un seguimiento de los KPI a lo largo del tiempo, en el nivel de consumo, mediante la creación de una nueva [métrica personalizada basada en logs][8].

### Añadir una nueva métrica basada en logs

**Para generar una nueva métrica basada en logs en tu patrón de logs**:

1. Ve a la página [Generar métricas][9].
1. Haz clic en **New Metric** (Nueva métrica), en la esquina superior derecha.
1. Introduce un nombre para tu métrica. loguear Los nombres de métricas basadas en logs deben seguir la convención de nomenclatura para métricas.
1. En **Define Query** (Definir consulta), introduce la consulta de búsqueda que has copiado y pegado en el filtro de exclusión de patrones. Por ejemplo: `service:web-store status:info "updating recommendations with customer_id" "url shops"`, como en el ejemplo anterior.
1. Selecciona el campo del que quieres hacer un seguimiento: selecciona `*` para generar un recuento de todos los logs que coinciden con tu consulta o introduce una medida (por ejemplo, `@duration`) para agregar un valor numérico y crear su correspondiente recuento, mínimo, máximo, suma y media de métricas agregadas.
1. Añade dimensiones al grupo: selecciona atributos de logs o claves de etiqueta para aplicarlos a las métricas basadas en logs para transformarlos en etiquetas (tags) siguiendo el formato de `<KEY>:<VALUE>`. Las métricas basadas en logs se consideran métricas personalizadas. Evita agrupar por atributos no limitados o de cardinalidad extremadamente alta como marcas de tiempo, ID de usuario, ID de solicitud o ID de sesión, para evitar un impacto negativo en tu facturación.

### Crear un monitor de detección de anomalías

La [detección de anomalías][10] es una función algorítmica que identifica cuándo una métrica se comporta de forma diferente a como lo ha hecho en el pasado. La creación de un monitor de detección de anomalías para tus logs excluidos te avisa de cualquier cambio según tus condiciones de alerta configuradas.

**Para configurar un monitor de detección de anomalías**:

1. Ve a la página [Nuevo Monitor][11].
1. Selecciona **Anomaly* (Anomalía).
1. Introduce la métrica basada en logs definida en la sección anterior.
1. Configura las condiciones de alerta y añade la información adicional necesaria para que tú o tu equipo sepan qué está ocurriendo.
1. Haz clic en **Create** (Crear).

Cuando se detecta una anomalía, se envía una alerta a todos los que están etiquetados. Esta alerta también se puede encontrar en la página de [monitores activados][12].

## Revisión

En esta guía has aprendido a utilizar Logging without LimitsTM para:

1. [Identificar tu estado de servicio con más logs](#1-identify-your-most-logged-service-status)
2. [Identificar patrones de gestión de logs de gran volumen](#2-identify-high-volume-logging-patterns)
3. [Crear un filtro de exclusión de patrones de logs](#3-create-a-log-pattern-exclusion-filter)
4. [Generar métricas para realizar un seguimiento de logs excluidos](#4-generate-metrics-to-track-excluded-logs)
  * [Añadir una nueva métrica basada en logs](#add-a-new-log-based-metric)
  * [Crear un monitor de detección de anomalías](#create-an-anomaly-detection-monitor)

Para obtener más información sobre Logging Without LimitsTM y cómo utilizar mejor algunas funciones como el Explorador de logs, Live Tail y los patrones de logs, consulta los siguientes enlaces.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/logging-without-limits/
[2]: /es/logs/
[3]: https://app.datadoghq.com/logs
[4]: https://app.datadoghq.com/logs/patterns
[5]: /es/logs/live_tail/
[6]: /es/logs/archives/
[7]: /es/metrics/
[8]: /es/logs/logs_to_metrics/
[9]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[10]: /es/monitors/types/anomaly/
[11]: https://app.datadoghq.com/monitors/create
[12]: https://app.datadoghq.com/monitors#/triggered
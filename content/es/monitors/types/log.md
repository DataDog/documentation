---
aliases:
- /es/monitors/monitor_types/log
- /es/monitors/create/types/log/
further_reading:
- link: /logs/
  tag: Documentación
  text: Descripción general de gestión de logs
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado del monitor
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utiliza consultas con notación CIDR para filtrar tus logs de tráfico de red
kind: documentación
title: Monitor de logs
---

## Información general

Log Management es crucial para gestionar logs generados por varios sistemas, lo que permite solucionar problemas de forma eficiente, resolver cuestiones y hacer auditorías de seguridad. Los logs contienen detalles de transacciones que ayudan a identificar y resolver problemas rápidamente. Los sistemas de Log Management correlacionan logs con los datos de observabilidad para una rápida detección de la causa raíz. Los logs son esenciales para las investigaciones de seguridad, y los sistemas de Log Management ayudan en la detección de amenazas, el seguimiento del cumplimiento y la monitorización de la seguridad.

Una vez que [la gestión de logs está habilitada][1] para tu organización, puedes crear un monitor de logs para alertarte cuando un tipo específico de log supere un umbral definido por el usuario durante un periodo determinado. El monitor de logs solo evalúa [logs indexados][2].

## Creación de un monitor

Para crear un [monitor de logs][1] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> Logs* (Monitores --> Nuevo monitor --> Logs).

<div class="alert alert-info"><strong>Nota</strong>: Existe un límite predeterminado de 1000 monitores de log por cada cuenta. Si estás por alcanzar este límite, considera la posibilidad de utilizar <a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">alertas múltiples</a> o <a href="/help/">ponte en contacto con el servicio de asistencia</a>.</div>

### Definir la consulta de búsqueda

A medida que se defines la consulta de búsqueda, el gráfico situado sobre los campos de búsqueda se actualiza.

1. Crea una consulta de búsqueda utilizando la misma lógica que en una [búsqueda del Log Explorer][4].
2. Elige monitorizar en base a un recuento de logs, una [faceta][5], un atributo o una [medida][3]:
    * **Monitorizar en base a un recuento de logs**: utiliza la barra de búsqueda (opcional) y **no** selecciones un atributo o medida. Datadog evalúa el número de logs en un marco temporal seleccionado y luego lo compara con las condiciones del umbral.
    * **Monitorizar en base a una faceta o un atributo**: si se selecciona un atributo, el monitor alerta sobre el `Unique value count` del atributo. Por ejemplo, si tienes un atributo como `user.email`, el recuento de valores únicos es el número de correos electrónicos de usuario únicos. Se puede utilizar cualquier atributo en un monitor, pero solo las facetas se muestran en el autocompletado.
    * **Monitorizar en base a una medida**: si seleccionas una [medida][6], el monitor alerta sobre el valor numérico de la faceta de log (similar a un monitor de métricas), además, se debe seleccionar una agregación (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` o `max`).
3. Agrupar logs por múltiples dimensiones (opcional):

   Todos los logs que coinciden con la consulta se agregan a grupos basados en el valor de hasta cuatro facetas de log. Cuando hay varias dimensiones, los valores máximos se determinan según la primera dimensión, luego según la segunda dimensión dentro de los valores máximos de la primera dimensión, y así sucesivamente, hasta la última dimensión. El límite de dimensiones depende del número total de dimensiones:
   * **1 faceta**: 1000 valores máximos
   * **2 facetas**: 30 valores principales por faceta (900 grupos como máximo)
   * **3 facetas**: 10 valores principales por faceta (como máximo 1000 grupos)
   * **4 facetas**: 5 valores principales por faceta (625 grupos como máximo)
4. Configura la estrategia de agrupación de alertas (opcional):
    * **Alerta simple**: las alertas simples agregan todas las fuentes de información. Recibirás una alerta cuando el valor agregado cumpla las condiciones establecidas. Esto funciona mejor para monitorizar una métrica de un solo host o la suma de una métrica a través de muchos hosts. Esta estrategia puede seleccionarse para reducir el ruido de notificación.
    * **Alerta múltiple**: las alertas múltiples aplican la alerta a cada fuente en función de tus parámetros de grupo. Se genera un evento de alerta para cada grupo que cumple las condiciones establecidas. Por ejemplo, puedes agrupar `system.disk.in_use` por `device` para recibir una alerta distinta por cada dispositivo que se ejecuta por fuera del espacio.

### Definir tus condiciones de alerta

* Se activa cuando la métrica es `above`, `above or equal to`, `below`, o `below or equal to`
* el umbral durante los últimos `5 minutes`, `15 minutes`, `1 hour`, etc. o `custom` para fijar un valor entre `5 minutes` y `2 days`.
* Umbral de alerta `<NUMBER>`
* Umbral de advertencia `<NUMBER>`

#### Alertas en escenarios sin datos y por debajo del umbral

`NO DATA` es un estado que se da cuando ningún log coincide con la consulta del monitor durante el periodo.

Para recibir una notificación cuando todos los grupos que coinciden con una consulta específica han dejado de enviar logs, establece la condición en `below 1`. Esto notifica cuando ningún log coincide con la consulta del monitor en un plazo determinado en todos los grupos agregados.

Cuando se divide el monitor por cualquier dimensión (etiqueta o faceta) y se utiliza una condición `below`, la alerta se activa **si y solo si** hay logs para un grupo dado, y el recuento está por debajo del umbral; o si no hay logs para **todos** los grupos.

**Ejemplos**:

* Este monitor se activa si y solo si no hay logs para todos los servicios:
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Monitor a continuación divido por servicio" style="width:60%;" >}}
* Este monitor se activa si no hay logs para el servicio `backend`:
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Monitor a continuación por servicio de backend" style="width:60%;" >}}

#### Condiciones de alerta avanzadas

Para obtener instrucciones detalladas sobre las opciones avanzadas de alerta (retraso de evaluación, retraso de nuevo grupo, etc.), consulta la página [Configuración del monitor][7].

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][8].

#### Ejemplos de log y lista de los principales valores de incumplimiento

Cuando se activa un monitor de logs, se pueden añadir muestras o valores al mensaje de notificación. Los logs sin mensaje no se incluyen en las muestras. Para añadir el contenido de un atributo de log al mensaje del monitor, utiliza [variables de plantilla][9] de monitor de log directamente en el cuerpo del mensaje del monitor.

| Configuración del monitor                    | Puede añadirse al mensaje de notificación |
|----------------------------------|--------------------------------------|
| Recuento de log de alertas simples no agrupadas | Hasta 10 ejemplos de log.                |
| Recuento de log de alertas simples agrupadas   | Hasta 10 valores de facetas o medidas.    |
| Recuento de log de alertas múltiples agrupadas    | Hasta 10 ejemplos de log.                |
| Medida de alertas simples no agrupadas   | Hasta 10 ejemplos de log.                |
| Medida de alertas simples agrupadas     | Hasta 10 valores de facetas o medidas.    |
| Medida de log de alertas múltiples agrupadas  | Hasta 10 valores de facetas o medidas.    |

Están disponibles para notificaciones enviadas a Slack, Jira, webhooks, Microsoft Teams, Pagerduty y direcciones de correo electrónico. **Nota**: Los ejemplos no se muestran para notificaciones de recuperación.

Para desactivar los ejemplos de log, desactiva la casilla situada en la parte inferior de la sección **Say what's happening** (Di lo que está pasando). El texto que aparece junto a la casilla se basa en la agrupación de tu monitor (como se ha indicado anteriormente).

#### Ejemplos

Incluye una tabla con los 10 valores más altos:
{{< img src="monitors/monitor_types/log/top_10_breaching_values.png" alt="Los 10 valores más altos" style="width:60%;" >}}

Incluye una muestra de 10 logs en la notificación de alerta:
{{< img src="monitors/monitor_types/log/10_sample_logs.png" alt="Los 10 valores en infracción" style="width:60%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/
[2]: /es/logs/log_configuration/indexes/
[3]: https://app.datadoghq.com/monitors#create/log
[4]: /es/logs/explorer/search/
[5]: /es/logs/explorer/facets/
[6]: /es/logs/explorer/facets/#measures
[7]: /es/monitors/configuration/#advanced-alert-conditions
[8]: /es/monitors/notify/
[9]: /es/monitors/notify/variables/?tab=is_alert#matching-attributetag-variables
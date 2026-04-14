---
description: Aprende estrategias de agregación de alerta única y alertas múltiples
  para gestionar el ruido de las alertas y garantizar notificaciones procesables para
  tu sistema de monitorización.
further_reading:
- link: /monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations
  tag: Documentación
  text: Más información sobre la configuración de notificaciones y automatizaciones
- link: /monitors/guide/monitor_aggregators/
  tag: Documentación
  text: Agregadores de monitores
title: Agregación de alertas
---

## Información general

Para garantizar la salud y el rendimiento del sistema se requieren notificaciones oportunas y procesables. Sin embargo, la eficacia de las alertas depende no solo del momento oportuno, sino también del número de alertas generadas. La agregación de alertas es esencial para gestionar este equilibrio.

Por ejemplo, si gestionas un sitio de comercio electrónico y surgen problemas, ¿quieres una alerta resumida o varias alertas específicas que indiquen cada aspecto del fallo?   
La respuesta dependerá de la arquitectura de tu sistema, de la naturaleza del problema y del flujo de trabajo de tu equipo. Comprender la agregación de alertas puede ayudarte a garantizar que los equipos estén al tanto de los problemas sin recibir un exceso de notificaciones.

Esta guía explora varias capacidades y estrategias de agregación de alertas para diferentes casos.

## Tipos de agregación de alertas 

Por defecto, Datadog envía una alerta por cada grupo monitorizado. Sin embargo, puedes optar por recibir una única notificación, independientemente del número de grupos monitorizados que superen el umbral.

Considera este ejemplo. Tienes una consulta de monitor agrupada por varios atributos. En este caso, la consulta está agrupada por `topic` y `partition`.

{{< img src="/monitors/guide/alert_aggregation/monitor_query_multi_alert.png" alt="Ejemplo de consulta de monitor agrupada por tema y patición" style="width:100%;" >}}

### Alerta única

Un monitor de alerta única agrega tus alertas en una única alerta.
{{< img src="monitors/guide/alert_aggregation/simple_alert_notification.png" alt="Configuración de notificaciones de un monitor de alerta única)" style="width:100%;" >}}

Utilizando el ejemplo, no importa qué `topic` o `partition` supera el umbral, el monitor envía una única alerta. Todas las notificaciones se agregan en una sola alerta.

Para obtener más información, consulta [Configurar monitores - Alerta simple][1].

### Alerta múltiple

Un monitor de alertas múltiples envía una notificación para cada combinación única de grupos.  
{{< img src="/monitors/guide/alert_aggregation/multi_alert_notification.png" alt="Configuración de notificaciones de un monitor de alertas múltiples" style="width:100%;" >}}
Utilizando el ejemplo, el monitor envía una notificación cada vez que una combinación de `topic` y `partition` supera el umbral.  
Con los monitores de alertas múltiples, utiliza [variables][2] para proporcionar una mayor especificidad a tus notificaciones. Ayudan a personalizar los mensajes en función del grupo específico que activa la alerta.

Para obtener más información, consulta [Configurar monitores - Alertas múltiples][3].

## Casos prácticos

{{% collapse-content title="Alerta simple" level="h4" expanded=false %}}
#### Escenario
Estás supervisando un sistema de generación de logs basado en Kafka, agrupado por `error-logs` y `user-events`. Si alguna partición tiene un retraso de mensajes de más de 500, necesitas saberlo, pero no necesitas recibir varias alertas si varias particiones se están retrasando.

#### Ventajas de la agregación
Una alerta simple es útil para los equipos que no quieren recibir notificaciones excesivas, pero que necesitan actuar cuando surgen problemas.  
Sin embargo, si varias particiones se están retrasando al mismo tiempo, es posible que no veas todas las particiones afectadas en una sola notificación.

{{% /collapse-content %}}

{{% collapse-content title="Alertas múltiples" level="h4" expanded=false %}}
Las alertas múltiples son geniales cuando un servicio es propiedad de varios equipos (cada equipo es responsable de un componente específico). Dependiendo del componente que causa el problema, se notificará a un equipo diferente.

#### Escenario
Estás ejecutando un sistema de procesamiento de pedidos de comercio electrónico y los mensajes se envían al tema "order-events".

#### Ventajas de la agregación
Si hay varias particiones retrasadas (por ejemplo, la partición 1 y la partición 3), necesitas alertas separadas, ya que las distintas particiones pueden corresponder a distintos tipos de pedidos (como nacionales frente a internacionales).

Este nivel de detalle ayuda a los ingenieros a responder con rapidez y precisión.

{{% /collapse-content %}}


## Cómo hacerlo con la API

Si gestionas tus monitores con la API, utiliza la variable `notify_by` para que tu monitor sea un monitor de alerta única o de alertas múltiples.

| Tipo de alerta     | Ejemplo de configuración                  |
|-------------------|----------------------------------------|
| Alerta única      | `"notify_by": ["*"]`                     |
| Alerta múltiple       | `"notify_by": [<group>]`por ejemplo, `"notify_by": ["topic"]` |

Para obtener más información, consulta la [documentación de la API][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/configuration/?tab=thresholdalert#simple-alert
[2]: /es/monitors/notify/variables/?tab=is_alert#triggered-variables
[3]: /es/monitors/configuration/?tab=thresholdalert#multi-alert
[4]: /es/api/latest/monitors/#create-a-monitor
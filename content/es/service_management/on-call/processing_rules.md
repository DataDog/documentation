---
further_reading:
- link: /service_management/on-call/
  tag: Documentación
  text: Datadog On-Call
title: Reglas de procesamiento
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">On-Call no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Información general

Las reglas de procesamiento de On-Call permiten a los equipos personalizar sus estrategias de respuesta para distintos tipos de eventos entrantes. Esto permite a los equipos añadir eventos y niveles de urgencia a las políticas de escalado basadas en los metadatos de evento. Las páginas de baja urgencia no activan los procesos de escalada.

Datadog crea una regla de procesamiento por defecto cuando se [incorpora un Equipo a On-Call][1].

## Ver las reglas de procesamiento de tu equipo

Para ver la regla de procesamiento de tu Equipo de On-Call, haz clic en el nombre del Equipo en la [lista de Equipos][2].

## Sintaxis de consulta

Las reglas de procesamiento siguen la sintaxis de consulta común de Datadog. Entre los atributos admitidos se incluyen:

* `tags`: las etiquetas establecidas en la alerta entrante. Por ejemplo, `tags.env:prod`.
* `groups`: comprueba si la alerta entrante se refiere a un grupo específico de monitor. Por ejemplo, `groups:"service:checkout-service"`.
* `priority`: valor del campo de prioridad del monitor. Los valores posibles son 1, 2, 3, 4 o 5. Por ejemplo, `priority:(1 OR 2)`.
* `alert_status`: valor del estado del monitor. Los valores posibles son `error`, `warn`, `success`. Ejemplo de uso: `alert_status:(error OR warn)`.

Si no debe aplicarse ningún filtro específico, utiliza `*`.

## Orden

El orden de las reglas de procesamiento es importante. El sistema va de arriba a abajo y se detiene en la primera regla coincidente. Si ninguna consulta o filtro de tiempo coincide con la alerta entrante, se utiliza la regla de procesamiento por defecto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
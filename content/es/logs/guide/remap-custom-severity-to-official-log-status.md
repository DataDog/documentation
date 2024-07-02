---
aliases:
- /es/logs/faq/how-to-remap-custom-severity-values-to-the-official-log-status
further_reading:
- link: logs/log_collection/#custom-log-collection
  tag: Documentación
  text: Más información sobre la recopilación de logs con el Agent
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
kind: guía
title: Reasignación de valores de gravedad personalizados al estado del log oficial
---

Por defecto, la [Reasignación de estado de logs][1] se basa en los [estándares de gravedad de Syslog][2].
Sin embargo, puede haber otros sistemas que tengan valores de gravedad diferentes y que quieras reasignar al estado de log oficial.
Esto es posible gracias al [Procesador de categorías][3] que define una asignación entre tus valores personalizados y los esperados.

En esta página, se describe cómo puedes hacerlo con 2 ejemplos: niveles de Bunyan y logs de acceso web.

## Logs de acceso web

El código de estado de la solicitud puede utilizarse para determinar el estado del log. Las integraciones de Datadog utilizan la siguiente asignación:

* 2xx: OK
* 3xx: Aviso
* 4xx: Advertencia
* 5xx: Error

Supón que el código de estado de tu log se almacena en el atributo `http.status_code`.
Añade un procesador de categoría en tu pipeline que cree un nuevo atributo para reflejar la asignación anterior:

{{< img src="logs/guide/category_processor.png" alt="Procesador de categorías " >}}

A continuación, añade un reasignador de estado que utilice el atributo recién creado:

{{< img src="logs/guide/log_status_remapper.png" alt="reasignador de estado de log" >}}

## Niveles de Bunyan

Los niveles de Bunyan son similares a los de Syslog, pero sus valores se multiplican por 10.

* 10 = TRAZA
* 20 = DEPURACIÓN
* 30 = INFORMACIÓN
* 40 = ADVERTENCIA
* 50 = ERROR
* 60 = FATAL

Supón que el nivel de Bunyan se almacena en el atributo `bunyan_level`.
Añade un procesador de categorías en tu pipeline que cree un nuevo atributo para reflejar la asignación anterior:

{{< img src="logs/guide/category_processor_bunyan.png" alt="Procesador de categorías Bunyan" >}}

A continuación, añade un reasignador de estado que utilice el atributo recién creado:

{{< img src="logs/guide/status_remapper_bunyan.png" alt="reasignador de estado de log Bunyan" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/processors/#log-status-remapper
[2]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[3]: /es/logs/log_configuration/processors/#category-processor
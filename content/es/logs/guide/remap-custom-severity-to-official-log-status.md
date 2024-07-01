---
aliases:
- /es/logs/FAQ/cómo reasignar los valores de seguridad personalizados al estado oficialloguear-status
further_reading:
- link: logs/log_collection/#custom-loguear-collection
  tag: Documentación
  text: Más información sobre la recogida de loguear con el Agent
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
kind: guía
title: Reasignación de valores de gravedad personalizados al estado oficial loguear
---

Por defecto, [loguear Status Remapper][1] se basa en los [Estándares de severidad Syslog][2].
Sin embargo, puede haber otros sistemas que tengan valores de gravedad diferentes y que quieras reasignar al estado oficial de loguear.
Esto es posible gracias al [Procesador de Categorías][3] que define un mapeo entre tus valores personalizados y los esperados.

Esta página describe cómo hacerlo con 2 ejemplos: Niveles Bunyan y acceso web logs.

## Acceso web logs

El código de estado de la solicitud puede utilizarse para determinar el estado de loguear. Datadog integraciones utilice la siguiente asignación:

* 2xx: OK
* 3xx: Aviso
* 4xx: Advertencia
* 5xx: Error

Suponga que el código de estado de su loguear se almacena en el atributo `http.status_code`.
Añada un procesador de categoría en su canalización que cree un nuevo atributo para reflejar la asignación anterior:

{{< img src="logs/guide/category_processor.png" alt="Category Processor " >}}

A continuación, añada un remapeador de estado que utilice el atributo recién creado:

{{< img src="logs/guide/log_status_remapper.png" alt="loguear status remapper" >}}

## Niveles Bunyan

Los niveles de Bunyan son similares a los de Syslog, pero sus valores se multiplican por 10.

* 10 = rastrear
* 20 = DEBUG
* 30 = INFO
* 40 = ADVERTENCIA
* 50 = ERROR
* 60 = FATAL

Suponga que el nivel de bunyan se almacena en el atributo `bunyan_level`.
Añada un Procesador de Categorías en su Pipeline que cree un nuevo atributo para reflejar el mapeo anterior:

{{< img src="logs/guide/category_processor_bunyan.png" alt="category Processor bunyan" >}}

A continuación, añada un remapeador de estado que utilice el atributo recién creado:

{{< img src="logs/guide/status_remapper_bunyan.png" alt="loguear status remapper bunyan" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/processors/#log-status-remapper
[2]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[3]: /es/logs/log_configuration/processors/#category-processor
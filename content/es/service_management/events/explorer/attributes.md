---
disable_toc: false
further_reading:
- link: /service_management/events/explorer/facets
  tag: Documentación
  text: Más información sobre las facetas de eventos
- link: logs/processing/pipelines
  tag: Documentación
  text: Pipelines de procesamiento de logs
title: Atributos reservados
---

## Información general

Los atributos se utilizan para las facetas y etiquetas, que luego se utilizan para filtrar y buscar en el Events Explorer. 

## Lista de atributos reservados

En esta lista se describen los atributos reservados ingeridos de manera automática con eventos.

| Atributo | Descripción                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | El nombre del host de origen como se define en las métricas. Datadog recupera de manera automática las etiquetas de host correspondientes del host coincidente en Datadog y las aplica a tus eventos. El Agent establece este valor de manera automática.                          |
| `source`  | Corresponde al nombre de la integración, o a la tecnología de la que procede el evento. Cuando coincide con el nombre de una integración, Datadog instala de manera automática los analizadores y facetas correspondientes. Por ejemplo: `nginx` y `postgresql`, entre otros. |
| `status`  | Corresponde al nivel o gravedad de un evento.      |
| `service` | El nombre de la aplicación o servicio que genera los eventos. |
| `message` | De manera predeterminada, Datadog ingiere el valor del atributo `message` como el cuerpo de la entrada del evento. |   

Para buscar una etiqueta que tiene la misma clave que un atributo reservado, utiliza la sintaxis de búsqueda `tags`. 
Ejemplo: `tags:("status:<status>")`

Para crear una faceta en una etiqueta que tenga la misma clave que un atributo reservado:
1. Utiliza el [procesador de reasignación][1] para reasignar la etiqueta a otro atributo o etiqueta.
2. Crea una [faceta][2] en la etiqueta o atributo nuevo.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/processors/?tab=ui#remapper
[2]: /es/service_management/events/explorer/facets
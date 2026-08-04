---
disable_toc: false
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Empezando con las búsquedas en Datadog
- link: /logs/explorer/search_syntax/
  tag: Documentación
  text: Sintaxis de búsqueda de Log Management
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: métricas
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Procesador de filtros
---

{{< product-availability >}}

## Información general

Este procesador descarta todos los logs o métricas ({{< tooltip glossary="preview" case="title" >}}) que no coinciden con la consulta de filtro especificada. Si se descarta un log o una métrica, los datos no se envían a ningún procesador o destino posterior.

## Instalación

Para configurar el procesador de filtros:

- Define una **consulta de filtro**.
  - Los logs o métricas que coinciden con la [consulta](#filter-query-syntax) se envían al componente siguiente.
  - Los logs o métricas que no coinciden con la consulta se descartan.

## Sintaxis de las consultas de filtro

Cada procesador tiene una consulta de filtro correspondiente en sus campos. Los procesadores solo procesan logs o métricas que coinciden con tu consulta de filtro.

A continuación se ofrecen ejemplos de consultas de filtro:

{{< tabs >}}
{{% tab "Logs" %}}

- `NOT (status:debug)`: Filtra los logs que no tienen el estado `DEBUG`.
- `status:ok service:flask-web-app`: esto filtra todos los logs con el estado `OK` de tu servicio`flask-web-app`.
    - Esta consulta también se puede escribir como: `status:ok AND service:flask-web-app`.
- `host:COMP-A9JNGYK OR host:COMP-J58KAS`: esta consulta de filtro solo coincide con los logs de hosts etiquetados.
- `user.status:inactive`: Filtra los logs con el estado `inactive` anidado bajo el atributo `user`.
- `http.status:[200 TO 299]` o `http.status:{300 TO 399}`: Estos dos filtros representan la sintaxis para consultar un rango para `http.status`. Los rangos se pueden utilizar en cualquier atributo.

Obtén más información sobre la escritura de consultas de filtros de logs en [Sintaxis de búsqueda de logs][1].

[1]: /es/observability_pipelines/search_syntax/logs/

{{% /tab %}}

{{% tab "Métricas" %}}

- `NOT system.cpu.user`: Filtra las métricas que no tienen el campo `name:system.cpu.user`.
- `system.cpu.user OR system.cpu.user.total`: Esta consulta de filtro solo coincide con las métricas que tienen `name:system.cpu.user` o `name:system.cpu.user.total`.
- `tags:(env\:prod OR env\:test)`: Filtra las métricas con `env:prod` o `env:test` en `tags`.

Obtén más información sobre la escritura de consultas de filtros de métricas en [Sintaxis de búsqueda de métricas][1].

[1]: /es/observability_pipelines/search_syntax/metrics/

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
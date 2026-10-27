---
description: Envíe sus fuentes de registros existentes a Datadog y traduzca las búsquedas,
  alertas y paneles que creó en Splunk.
further_reading:
- link: /logs/log_collection/
  tag: Documentación
  text: Recopilación de registros e Integrations
- link: /logs/explorer/search_syntax/
  tag: Documentación
  text: Sintaxis de búsqueda de registros
- link: /logs/log_configuration/indexes/
  tag: Documentación
  text: Índices de registros
title: Migración
---
## Descripción general {#overview}

La migración a Datadog Log Management consta de dos partes: enviar sus registros a Datadog y recrear las búsquedas, alertas y paneles de los que dependen sus equipos.

## Envíe sus registros a Datadog {#send-your-logs-to-datadog}

Configure el [Datadog Agent][1] para recopilar registros de archivos, contenedores y fuentes de red. Las [Integrations][2] que admiten la recopilación de registros incluyen sus propias configuraciones de registro.

## Traduzca sus consultas y activos {#translate-your-queries-and-assets}

Una vez que sus registros estén en Datadog, utilice [Query Translation][3] para convertir Splunk Processing Language (SPL) a la [sintaxis de búsqueda de registros][4] de Datadog. Traduzca una sola consulta a la vez, o traduzca las consultas en alertas y paneles de Splunk de forma masiva y utilícelas para crear monitores y paneles de Datadog. Query Translation solo admite Splunk como plataforma fuente.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/logs/
[2]: /es/integrations/
[3]: /es/logs/migration/query_translation/
[4]: /es/logs/explorer/search_syntax/
---
categories:
- lenguajes
- rastreo
custom_kind: integración
dependencies: []
description: Envía métricas de tiempo de ejecución desde tus aplicaciones de Go con
  bibliotecas de cliente de Datadog.
doc_link: https://docs.datadoghq.com/integrations/go/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/go-logging/
  tag: Blog
  text: Cómo recopilar, estandarizar y centralizar logs de Golang
- link: https://www.datadoghq.com/blog/go-memory-metrics/
  tag: Blog
  text: Métricas de memoria de Go desmitificadas
git_integration_title: go
has_logo: true
integration_id: go
integration_title: Go
integration_version: ''
is_public: true
manifest_version: '1.0'
name: go
public_title: Integración de Datadog con Go
short_description: Envía métricas de tiempo de ejecución desde tus aplicaciones de
  Go con bibliotecas de cliente de Datadog.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

La integración de Go te permite recopilar y monitorizar logs, trazas (traces) y métricas personalizadas de tu aplicación de Go.

## Configuración

### Recopilación de métricas

Consulta la documentación específica para [recopilar métricas personalizadas de Go con DogStatsD][1].

### Recopilación de trazas

Consulta la documentación específica para [instrumentar tu aplicación de Go][2] a fin de enviar sus trazas a Datadog.

### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

Consulta la documentación específica para [configurar la recopilación de logs de Go][3] a fin de reenviar tus logs a Datadog.

### Recopilación de perfiles

Consulta la documentación específica para [habilitar el generador de perfiles de Go][4].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "go" >}}


### Eventos

La integración de Go no incluye eventos.

### Checks de servicios

La integración de Go no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=go
[2]: https://docs.datadoghq.com/es/tracing/setup/go/
[3]: https://docs.datadoghq.com/es/logs/log_collection/go/
[4]: https://docs.datadoghq.com/es/profiler/enabling/go/
[5]: https://docs.datadoghq.com/es/help/
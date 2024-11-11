---
categories:
- lenguajes
custom_kind: integration
dependencies: []
description: Envía métricas de tiempo de ejecución desde tus aplicaciones .NET con
  bibliotecas cliente de Datadog.
doc_link: https://docs.datadoghq.com/integrations/dotnet/
draft: false
further_reading: []
git_integration_title: dotnet
has_logo: true
integration_id: dotnet
integration_title: .NET
integration_version: ''
is_public: true
manifest_version: '1.0'
name: dotnet
public_title: Integración de Datadog y .NET
short_description: Envía métricas de tiempo de ejecución desde tus aplicaciones .NET
  con bibliotecas cliente de Datadog.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

La integración .NET te permite recopilar y monitorizar logs, trazas (traces) y métricas personalizadas de tu aplicación .NET.

## Configuración

### Recopilación de métricas

Consulta la documentación específica para [recopilar métricas de .NET personalizadas con DogStatsD][1].

### Recopilación de trazas

Consulta la documentación específica para [instrumentar tu aplicación .NET][2] para enviar sus trazas a Datadog.

### APM

Disponible para la versión 6.0 o posteriores del Agent

Consulta la documentación específica para [configurar la recopilación de logs de .NET][3] para reenviar tus logs a Datadog.

### Recopilación de perfiles

Consulta la documentación específica para [activar el generador de perfiles de .NET][4].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "dotnet" >}}


### Eventos

La integración .NET no incluye eventos.

### Checks de servicio

La integración .NET no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=net
[2]: https://docs.datadoghq.com/es/tracing/setup/dotnet/
[3]: https://docs.datadoghq.com/es/logs/log_collection/csharp/
[4]: https://docs.datadoghq.com/es/profiler/enabling/dotnet/
[5]: https://docs.datadoghq.com/es/help/
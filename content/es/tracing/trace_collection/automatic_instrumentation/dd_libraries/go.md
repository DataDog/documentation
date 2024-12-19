---
aliases:
- /es/tracing/go/
- /es/tracing/languages/go
- /es/agent/apm/go/
- /es/tracing/setup/go
- /es/tracing/setup_overview/go
- /es/tracing/setup_overview/setup/go
- /es/tracing/trace_collection/dd_libraries/go
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: Código fuente
  text: Código fuente
- link: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
  tag: Sitio externo
  text: Página del paquete
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
title: Rastreo de aplicaciones Go
type: lenguaje de código múltiple
---

## Requisitos de compatibilidad

El rastreador Go requiere Go `v1.18 o superiores` y el Datadog Agent v5.21.1 o anteriores`. Para ver la lista completa de versiones de Go y de compatibilidad de marcos de trabajo de Datadog (incluidas las versiones heredadas y de mantenimiento), consulta la página de [requisitos de compatibilidad][1].

## Para empezar

Antes de empezar, asegúrate de haber [instalado y configurado el Agent][5].

### Habilitar integraciones de Go para crear tramos (spans)

Datadog ofrece una serie de paquetes conectables que proporcionan asistencia inmediata para la instrumentación de una serie de bibliotecas y marcos. En la página de [requisitos de compatibilidad][1] encontrarás una lista de estos paquetes. Importa estos paquetes en tu aplicación y sigue las instrucciones de configuración que aparecen junto a cada [integración][1].

## Configuración

Si es necesario, configura la biblioteca de rastreo para que envíe datos de telemetría sobre el rendimiento de la aplicación, incluida la configuración del etiquetado unificado de servicios. Para ver más detalles, consulta la [configuración de bibliotecas][3].

Para obtener instrucciones de configuración y detalles sobre el uso de la API, consulta la [documentación de la API][4] de Datadog.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/compatibility_requirements/go
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /es/tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[5]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
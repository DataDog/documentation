---
app_id: rum-javascript
app_uuid: d2496eee-ced1-4bf2-a85d-b8277b4952cf
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- lenguajes
- métricas
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_javascript/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_javascript
integration_id: rum-javascript
integration_title: JavaScript
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_javascript
public_title: JavaScript
short_description: Monitorizar aplicaciones JavaScript y generar métricas utilizando
  Datadog RUM
supported_os:
- todos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Lenguajes
  - Categoría::Métricas
  - Categoría::Rastreo
  - Sistema operativo compatible::Todos
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar aplicaciones JavaScript y generar métricas utilizando Datadog
    RUM
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: JavaScript
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Con la [integración JavaScript][1] de Datadog resuelve rápidamente los problemas de rendimiento de los componentes de JavaScript:

- Depurando la causa raíz de los cuellos de botella en el rendimiento, como un tiempo de respuesta lento del servidor, un recurso que bloquea la presentación o un error dentro de un componente.
- Correlacionando automáticamente los datos de rendimiento de JavaScript con los recorridos de los usuarios, las llamadas AJAX al servidor y los logs.
- Alertando a tus equipos de ingeniería cuando las métricas del rendimiento esenciales de JavaScript (como Core Web Vitals) están por debajo de un umbral que resulta en una mala experiencia de usuario.


Monitoriza tus aplicaciones JavaScript de extremo a extremo:

- Realizando un seguimiento y visualizando los recorridos de los usuarios en todo el stack tecnológico.
- Depurando la causa raíz de los tiempos de carga lentos, que pueden ser un problema con tu código, rendimiento de red o infraestructura subyacente de JavaScript.
- Analizando y contextualizando cada sesión de usuario con atributos como ID de usuario, correo electrónico, nombre, etc.
- Unificando la monitorización del stack tecnológico completo en una sola plataforma para equipos de desarrollo frontend y backend.


## Configuración

### Recopilar eventos RUM

Para empezar a recopilar eventos de Real User Monitoring de tu aplicación, consulta [Monitorización de navegadores][2].

### Recopilar trazas (traces)

Para empezar a enviar las trazas de tu aplicación JavaScript a Datadog, consulta [Conectar RUM y trazas][3].

### Recopilar logs

Para empezar a reenviar logs de tu aplicación JavaScript a Datadog, consulta [Recopilación de logs de navegadores][4].

## Datos recopilados

### Métricas

La integración JavaScript no incluye métricas. Para generar métricas personalizadas desde tu aplicación RUM, consulta [Generar métricas][5].

### Eventos 

Para obtener más información sobre eventos y atributos, consulta [Datos de navegador RUM recopilados][6]. 

### Checks de servicios

La integración JavaScript no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

## Referencias adicionales

Más enlaces, artículos y documentación útiles: 

- [Monitorización de navegadores][2]



[1]: https://app.datadoghq.com/integrations/rum-javascript
[2]: https://docs.datadoghq.com/es/real_user_monitoring/browser/
[3]: https://docs.datadoghq.com/es/real_user_monitoring/connect_rum_and_traces/?tabs=browserrum
[4]: https://docs.datadoghq.com/es/logs/log_collection/javascript/
[5]: https://docs.datadoghq.com/es/real_user_monitoring/generate_metrics
[6]: https://docs.datadoghq.com/es/real_user_monitoring/browser/data_collected/
[7]: https://docs.datadoghq.com/es/help/
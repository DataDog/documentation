---
app_id: rum-angular
app_uuid: 0dd38c9b-921d-4252-8c46-c7a6d83c5778
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- rastreo
custom_kind: integración
dependencies:
- https://github.com/Datadog/integraciones-extras/blob/master/rum_angular/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_angular
integration_id: rum-angular
integration_title: Angular
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_angular
public_title: Angular
short_description: Monitorizar aplicaciones Angular y generar métricas utilizando
  Datadog RUM
supported_os:
- todos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Métricas
  - Categoría::Rastreo
  - Sistema operativo compatible::Todos
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar aplicaciones Angular y generar métricas utilizando Datadog
    RUM
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Angular
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Con la [integración Angular][1] de Datadog resuelve rápidamente los problemas de rendimiento de los componentes de Angular:

- Depurando la causa raíz de los cuellos de botella en el rendimiento, como un tiempo de respuesta lento del servidor, un recurso que bloquea la presentación o un error dentro de un componente.
- Correlacionando automáticamente los datos de rendimiento de Angular con los recorridos de los usuarios, las llamadas AJAX al servidor y los logs.
- Alertando a tus equipos de ingeniería cuando las métricas del rendimiento esenciales de Angular (como Core Web Vitals) están por debajo de un umbral que resulta en una mala experiencia de usuario.


Monitoriza tus aplicaciones Angular de extremo a extremo:

- Realizando un seguimiento y visualizando los recorridos de los usuarios en todo el stack tecnológico.
- Depurando la causa raíz de los tiempos de carga lentos, que pueden ser un problema con tu código, rendimiento de red o infraestructura subyacente de Angular.
- Analizando y contextualizando cada sesión de usuario con atributos como ID de usuario, correo electrónico, nombre, etc.
- Unificando la monitorización del stack tecnológico completo en una sola plataforma para equipos de desarrollo frontend y backend.






## Configuración

### Recopilar eventos RUM

Para empezar a recopilar Real User Monitorización eventos de su aplicación, consulte [Navegador Monitorización][2]. 

### Recopilar trazas (traces)

Tu aplicación Angular envía automáticamente trazas a Datadog.

### Recopilar logs

Para empezar a reenviar logs de tu aplicación Angular a Datadog, consulta [Recopilación de logs de JavaScript][3].

## Datos recopilados

### Métricas

La integración Angular no incluye métricas. Para generar métricas personalizadas desde tu aplicación RUM, consulta [Generar métricas][4].

### Eventos 

Para obtener más información sobre eventos y atributos, consulta [Datos de navegador RUM recopilados][5].

### Checks de servicios

La integración Angular no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][6].



[1]: https://app.datadoghq.com/integrations/rum-angular
[2]: https://docs.datadoghq.com/es/real_user_monitoring/browser/
[3]: https://docs.datadoghq.com/es/logs/log_collection/javascript/
[4]: https://docs.datadoghq.com/es/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/es/real_user_monitoring/browser/data_collected/
[6]: https://docs.datadoghq.com/es/help/
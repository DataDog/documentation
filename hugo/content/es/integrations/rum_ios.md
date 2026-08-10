---
app_id: rum-ios
app_uuid: 53933f32-091c-4b8d-83a5-bd53ac9eacdb
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- mobile
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_ios/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_ios
integration_id: rum-ios
integration_title: iOS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_ios
public_title: iOS
short_description: Monitorizar aplicaciones iOS y generar métricas utilizando Datadog
  RUM
supported_os:
- ios
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Métricas
  - Categoría::Móvil
  - Categoría::Rastreo
  - Sistema operativo compatible::iOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar aplicaciones iOS y generar métricas utilizando Datadog
    RUM
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: iOS
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Con la [integración iOS][1] en Datadog, puedes dedicar menos tiempo a resolver problemas y más a lanzar nuevas funciones:

- Depurando la causa raíz de problemas de rendimiento lento y bloqueos de aplicaciones en bibliotecas de terceros, solicitudes de red o archivos multimedia de gran tamaño. 
- Mejorando la capacidad de respuesta de las aplicaciones, configurando indicadores de nivel de servicio (SLI) y diagnosticando problemas con dashboards predefinidos, métricas en tiempo real e informes de fallos desofuscados.
- Agrupando de forma inteligente errores de aplicación de gran volumen en un conjunto manejable de problemas únicos.

Correlaciona el impacto de la experiencia del usuario en tu empresa:

- Analizando los datos críticos de la experiencia del usuario móvil, como el compromiso con la pantalla por datos demográficos, versiones o cualquier atributo personalizado, para alcanzar tus indicadores de rendimiento clave (KPI) empresariales.
- Correlacionando automáticamente cada recorrido de usuario con una cronología de eventos y atributos de sesión como ID, actividad celular, URL de referencia, etc.
- Comprendiendo las tendencias de comportamiento de los usuarios con análisis personalizables y mapas geográficos.

Monitoriza el estado de extremo a extremo de tu aplicación iOS: 

- Pasando de los datos sobre la experiencia del usuario a trazas (traces) de backend, métricas de tiempo de ejecución y logs para obtener el contexto completo al investigar problemas.
- Depurando fallos más rápidamente mediante la unificación de métricas trazas y logs del lado del cliente y del lado del servidor.
- Unificando la monitorización de stacks tecnológicos completos en una única plataforma para los equipos de frontend y backend.

## Configuración

### Recopilar eventos RUM

Para empezar a recopilar eventos de Real User Monitoring de tu aplicación, consulta [Monitorización de iOS][2].

### Recopilar trazas

Para empezar a enviar tus trazas de aplicaciones iOS a Datadog, consulta [Recopilación de trazas de iOS][3]. Además, puedes [conectar RUM y trazas][4].

### Recopilar logs

Para empezar a reenviar logs de tu aplicación iOS a Datadog, consulta [Recopilación de logs de iOS][5].

## Datos recopilados

### Métricas

La integración iOS no incluye métricas. Para generar métricas personalizadas desde tu aplicación RUM, consulta [Generar métricas][6].

### Eventos 

Para obtener más información sobre eventos y atributos, consulta [Datos RUM iOS recopilados][7].

### Checks de servicios

La integración iOS no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

Más enlaces, artículos y documentación útiles: 

- [Monitorización iOS y tvOS][9]


[1]: https://app.datadoghq.com/integrations/rum-ios
[2]: https://docs.datadoghq.com/es/real_user_monitoring/ios/?tabs=swift#setup
[3]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ios/?tab=cocoapods
[4]: https://docs.datadoghq.com/es/real_user_monitoring/connect_rum_and_traces/?tab=iosrum#setup-rum
[5]: https://docs.datadoghq.com/es/logs/log_collection/ios/
[6]: https://docs.datadoghq.com/es/real_user_monitoring/generate_metrics
[7]: https://docs.datadoghq.com/es/real_user_monitoring/ios/data_collected/
[8]: https://docs.datadoghq.com/es/help/
[9]: https://docs.datadoghq.com/es/real_user_monitoring/ios/
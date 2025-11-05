---
app_id: rum-android
app_uuid: a70b6926-49a8-4f90-8190-315170e97e4f
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- métricas
- apm
- la red
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_android/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_android
integration_id: rum-android
integration_title: Android
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_android
public_title: Android
short_description: Monitorizar aplicaciones Android y generar métricas utilizando
  Datadog RUM
supported_os:
- android
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Métricas
  - Categoría::Móvil
  - Categoría::Red
  - Categoría::Rastreo
  - Sistema operativo compatible::Android
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar aplicaciones Android y generar métricas utilizando Datadog
    RUM
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Documentación
    url: https://docs.datadoghq.com/real_user_monitoring/android/
  support: README.md#Soporte
  title: Android
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Con la [integración Android][1] Datadog puedes dedicar menos tiempo a resolver problemas y más a lanzar nuevas funciones:

- Depuración de la causa raíz de problemas de rendimiento lento y bloqueos de aplicaciones en bibliotecas de terceros, solicitudes de red o archivos multimedia de gran tamaño.
- Mejora de la capacidad de respuesta de las aplicaciones, configurando indicadores de nivel de servicio (SLI) y diagnosticando problemas con dashboards, métricas en tiempo real e informes de fallos desofuscados.
- Agrupación inteligente de errores de aplicación de gran volumen en un conjunto manejable de problemas únicos.

Correlaciona el impacto de la experiencia del usuario en tu empresa:

- Analizando los datos críticos de la experiencia del usuario móvil, como el compromiso con la pantalla por datos demográficos, versiones o cualquier atributo personalizado, para alcanzar tus indicadores de rendimiento clave (KPI) empresariales.
- Correlacionando automáticamente cada recorrido de usuario con una cronología de eventos y atributos de sesión como ID, actividad celular, URL de referencia, etc.
- Comprendiendo las tendencias de comportamiento de los usuarios con análisis personalizables y mapas geográficos.

Monitoriza la salud de extremo a extremo de tu aplicación:

- Pasando de los datos sobre la experiencia del usuario a trazas (traces) de backend, métricas de tiempo de ejecución y logs para obtener el contexto completo al investigar problemas.
- Depurando fallos más rápidamente mediante la unificación de métricas trazas y logs del lado del cliente y del lado del servidor.
- Unificando la monitorización de stacks tecnológicos completos en una única plataforma para los equipos de frontend y backend.

## Configuración

### Recopilar eventos RUM

Para empezar a recopilar eventos de Real User Monitoring de tu aplicación, consulta [Monitorización de Android y TV Android][2].

### Recopilar trazas

Para empezar a enviar tus trazas de aplicaciones Android a Datadog, consulta [Recopilación de trazas de Android][3]. Además, puedes [conectar RUM y trazas][4].

### Recopilar logs

Para empezar a reenviar logs de tu aplicación Android a Datadog, consulta [Recopilación de logs de Android][5].

## Datos recopilados

### Métricas

La integración Android no incluye métricas. Para generar métricas personalizadas desde tu aplicación RUM, consulta [Generar métricas][6].

### Eventos

Para obtener más información sobre eventos y atributos, consulta [Datos RUM Android recopilados][7].

### Checks de servicio

La integración Android no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de Android y TV Android][9]

[1]: https://app.datadoghq.com/integrations/rum-android
[2]: https://docs.datadoghq.com/es/real_user_monitoring/android/?tabs=kotlin#setup
[3]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/android
[4]: https://docs.datadoghq.com/es/real_user_monitoring/connect_rum_and_traces/?tab=androidrum#setup-rum
[5]: https://docs.datadoghq.com/es/logs/log_collection/android/?tab=kotlin
[6]: https://docs.datadoghq.com/es/real_user_monitoring/generate_metrics
[7]: https://docs.datadoghq.com/es/real_user_monitoring/android/data_collected/
[8]: https://docs.datadoghq.com/es/help/
[9]: https://docs.datadoghq.com/es/real_user_monitoring/android/
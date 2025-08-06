---
app_id: rum-roku
app_uuid: 0ab4b7a1-f017-4b3c-ab0f-eab5d476f132
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- métricas
- la red
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_roku/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_roku
integration_id: rum-roku
integration_title: Roku
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_roku
public_title: Roku
short_description: Monitorizar canales Roku y generar métricas utilizando Datadog
  RUM
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Métricas
  - Categoría::Red
  - Categoría::Rastreo
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar canales Roku y generar métricas utilizando Datadog RUM
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Documentación
    url: https://docs.datadoghq.com/real_user_monitoring/roku/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-roku-with-rum/
  support: README.md#Soporte
  title: Roku
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Con la [integración Roku][1] en Datadog, puedes dedicar menos tiempo a resolver problemas y más a lanzar nuevas funciones:

- Depuración de la causa raíz de problemas de rendimiento lento y bloqueos de aplicaciones, solicitudes de red o archivos multimedia de gran tamaño.
- Mejora de la capacidad de respuesta de las aplicaciones, configurando indicadores de nivel de servicio (SLI) y diagnosticando problemas con dashboards predefinidos y métricas en tiempo real.
- Agrupación inteligente de errores de aplicación de gran volumen en un conjunto manejable de problemas únicos.

Correlaciona el impacto de la experiencia del usuario en tu empresa:

- Analizando los datos críticos de la experiencia del usuario, como el compromiso con la pantalla por datos demográficos, versiones o cualquier atributo personalizado, para alcanzar tus indicadores de rendimiento clave (KPI) empresariales.
- Comprendiendo las tendencias de comportamiento de los usuarios con análisis personalizables y mapas geográficos.

Monitoriza el estado de extremo a extremo de tu aplicación:

- Pasando de los datos sobre la experiencia del usuario a trazas (traces) de backend, métricas de tiempo de ejecución y logs para obtener el contexto completo al investigar problemas.
- Depurando fallos más rápidamente mediante la unificación de métricas trazas y logs del lado del cliente y del lado del servidor.
- Unificando la monitorización de stacks tecnológicos completos en una única plataforma para los equipos de frontend y backend.

## Configuración

### Recopilar eventos RUM

Para empezar a recopilar eventos de Real User Monitoring de tu aplicación, consulta [Monitorización de Roku][2]. También puedes [conectar RUM y trazas][3]. 

### Recopilar logs

Para empezar a reenviar logs de tu aplicación Roku a Datadog, consulta [Recopilación de logs de Roku][4].

## Datos recopilados

### Métricas

La integración Roku no incluye métricas. Para generar métricas personalizadas desde tu aplicación RUM, consulta [Generar métricas][5].

### Eventos

Para obtener más información sobre eventos y atributos, consulta [Datos RUM Roku recopilados][6].

### Checks de servicio

La integración Roku no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- Documentación [Monitorización del canal de RUM Roku][2]
- Entrada de blog [Monitorizar tus canales Roku con Datadog RUM][8]

[1]: https://app.datadoghq.com/integrations/rum-roku
[2]: https://docs.datadoghq.com/es/real_user_monitoring/roku/
[3]: https://docs.datadoghq.com/es/real_user_monitoring/connect_rum_and_traces/?tab=rokurum#setup-rum
[4]: https://docs.datadoghq.com/es/logs/log_collection/roku/
[5]: https://docs.datadoghq.com/es/real_user_monitoring/generate_metrics
[6]: https://docs.datadoghq.com/es/real_user_monitoring/roku/data_collected/
[7]: https://docs.datadoghq.com/es/help/
[8]: https://www.datadoghq.com/blog/monitor-roku-with-rum/
---
app_id: rum-expo
app_uuid: 6894cf91-e7a2-4600-966b-20a0c99ff08d
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
- https://github.com/DataDog/integrations-extras/blob/master/rum_expo/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_expo
integration_id: rum-expo
integration_title: Expo
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_expo
public_title: Expo
short_description: Monitorizar aplicaciones Expo y generar métricas utilizando Datadog
  RUM
supported_os:
- android
- ios
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Métricas
  - Categoría::Móvil
  - Categoría::Red
  - Categoría::Rastreo
  - Sistema operativo compatible::Android
  - Sistema operativo compatible::iOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar aplicaciones Expo y generar métricas utilizando Datadog
    RUM
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Documentación
    url: https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/
  - resource_type: Documentación
    url: https://docs.datadoghq.com/real_user_monitoring/error_tracking/expo/
  support: README.md#Soporte
  title: Expo
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Con la [integración Expo][1] en Datadog podrás dedicar menos tiempo a la resolución de problemas y más a la publicación de nuevas funciones:

- Depurando la causa raíz de problemas de rendimiento lento y bloqueos de aplicaciones en bibliotecas de terceros, solicitudes de red o archivos multimedia de gran tamaño.
- Mejorando la capacidad de respuesta de las aplicaciones, configurando indicadores de nivel de servicio (SLI) y diagnosticando problemas con dashboards predefinidos, métricas en tiempo real e informes de fallos desofuscados.
- Agrupando de forma inteligente errores de aplicación de gran volumen en un conjunto manejable de problemas únicos.

Correlaciona el impacto de la experiencia del usuario en tu empresa:

- Analizando los datos críticos de la experiencia del usuario móvil, como el compromiso con la pantalla por datos demográficos, versiones o cualquier atributo personalizado, para alcanzar tus indicadores de rendimiento clave (KPI) empresariales.
- Correlacionando automáticamente cada recorrido de usuario con una cronología de eventos y atributos de sesión como ID, actividad celular, URL de referencia, etc.
- Comprendiendo las tendencias de comportamiento de los usuarios con análisis personalizables y mapas geográficos.

Monitoriza el estado de extremo a extremo de tu aplicación Expo: 

- Pasando de los datos sobre la experiencia del usuario a trazas (traces) de backend, métricas de tiempo de ejecución y logs para obtener el contexto completo al investigar problemas.
- Depurando fallos más rápidamente mediante la unificación de métricas trazas y logs del lado del cliente y del lado del servidor.
- Unificando la monitorización de stacks tecnológicos completos en una única plataforma para los equipos de frontend y backend.

## Configuración

### Recopilar eventos RUM

Para empezar a recopilar eventos de Real User Monitoring de tu aplicación, consulta [Monitorización de Expo][2].

### Recopilar trazas

Tu aplicación Expo envía automáticamente trazas a Datadog.

### Recopilar logs

Para empezar a reenviar logs de tu aplicación Expo a Datadog, consulta [Recopilación de logs de Expo][3].

## Datos recopilados

### Métricas

La integración Expo no incluye métricas. Para generar métricas personalizadas desde tu aplicación RUM, consulta [Generar métricas][4].

### Eventos

Para obtener más información sobre eventos y atributos, consulta [Monitorización de RUM Expo][5].

### Checks de servicio

La integración Expo no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][6].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización Expo][5]
- [Informes de fallos y seguimiento de errores de Expo][7]

[1]: https://app.datadoghq.com/integrations/rum-expo
[2]: https://docs.datadoghq.com/es/real_user_monitoring/reactnative/expo/#setup
[3]: https://docs.datadoghq.com/es/real_user_monitoring/reactnative/#manual-instrumentation
[4]: https://docs.datadoghq.com/es/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/es/real_user_monitoring/reactnative/expo/
[6]: https://docs.datadoghq.com/es/help/
[7]: https://docs.datadoghq.com/es/real_user_monitoring/error_tracking/expo/
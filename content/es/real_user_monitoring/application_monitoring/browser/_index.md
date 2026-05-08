---
aliases:
- /es/real_user_monitoring/browser/
description: Monitoriza datos reales de usuarios y el rendimiento del frontend con
  el kit de desarrollo de software (SDK) del navegador de Datadog RUM para optimizar
  las experiencias web e identificar problemas en toda la pila.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Más información sobre el Explorador RUM
- link: /logs/log_collection/javascript/
  tag: Documentación
  text: Información sobre el SDK del navegador para logs de Datadog
title: Monitorización del Navegador RUM
---

## Información general

Datadog Real User Monitoring (RUM) te permite visualizar y analizar el rendimiento en tiempo real y los recorridos de cada usuario de tu aplicación.

## Iniciar la monitorización de las aplicaciones del navegador

Para empezar con RUM para el navegador, crea una aplicación y configura el SDK del navegador.

{{< whatsnext desc="Esta sección incluye los siguientes temas:" >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Lado del cliente</u>: instrumenta cada una de las aplicaciones web basadas en el navegador, despliega la aplicación y, a continuación, configura los parámetros de inicialización que deseas rastrear y utiliza la configuración avanzada para gestionar mejor los datos y contexto que recopila RUM.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Autoinstrumentación</u>: inyecta un scriplet de RUM SDK JavaScript en las respuestas HTML de tus aplicaciones web enviadas a través de un servidor web o proxy.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/advanced_configuration">}}<u>Configuración avanzada</u>: configura el SDK de RUM Browser para modificar la recopilación de datos, anular los nombres de vistas, gestionar las sesiones de usuario y controlar el muestreo de las necesidades de tu aplicación.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/data_collected">}}<u>Datos recopilados</u>: revisa los datos que recopila el SDK del navegador.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_page_performance">}}<u>Monitorización del rendimiento de página</u>: monitoriza los tiempos de vista para comprender el rendimiento de tu aplicación desde la perspectiva de un usuario. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/optimizing_performance">}}<u>Optimización del rendimiento</u>: usa la página de optimización de RUM para identificar y resolver problemas de rendimiento del navegador con un análisis de Core Web Vitals y visualización de experiencia del usuario.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance">}}<u>Monitorización de rendimiento del recurso</u>: monitoriza el rendimiento del recurso de navegador y vincula los datos de RUM con trazas de backend para obtener una visibilidad integral.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/collecting_browser_errors">}}<u>Recopilación de errores de navegador</u>: conoce cómo recopilar y rastrear los errores de frontend desde varias fuentes usando el SDK de errors RUM Browser SDK, incluida la recopilación manual de errores y los límites de errores React.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/tracking_user_actions">}}<u>Rastreo de acciones de usuario</u>: rastrea y analiza las interacciones de usuario en tu aplicación de navegador con la detección de clics automática y la información de rendimiento de la acción.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/frustration_signals">}}<u>Señales de frustración</u>: identifica los puntos de fricción de usuarios con señales de frustración de RUM (incluidos clics repetidos, clic sin resultados y clics de error) para mejorar la experiencia del usuario y reducir el abandono.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/troubleshooting">}}<u>Solución de problemas</u>: soluciones comunes de problemas del SDK del navegador.{{< /nextlink >}}
{{< /whatsnext >}}
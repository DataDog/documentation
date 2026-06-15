---
aliases:
- /es/real_user_monitoring/browser/
description: Realice seguimiento de los datos reales de usuario y del rendimiento
  del frontend con Datadog RUM Browser SDK para optimizar las experiencias web e identificar
  problemas en toda la pila.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Aprenda sobre RUM Explorer.
- link: /logs/log_collection/javascript/
  tag: Documentación
  text: Aprenda sobre Datadog Browser SDK for Logs.
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centro de aprendizaje
  text: Introducción a RUM (Real User Monitoring)
title: Seguimiento del navegador RUM
---
## Visión general {#overview}

Datadog Real User Monitoring (RUM) le permite visualizar y analizar el rendimiento en tiempo real y los recorridos de los usuarios individuales de su aplicación.

## Comience a hacer seguimiento de aplicaciones de navegador {#start-monitoring-browser-applications}

Para comenzar con RUM for Browser, cree una aplicación y configure el Browser SDK.

{{< whatsnext desc="Esta sección incluye los siguientes temas:" >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Client-Side</u>: Instrumente cada una de sus aplicaciones web basadas en navegador, despliegue la aplicación, luego configure los parámetros de inicialización que desea rastrear y utilice la configuración avanzada para gestionar de forma más exhaustiva los datos y el contexto que RUM recopila.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Auto-Instrumentación</u>: Inyecte un script JavaScript del SDK de RUM en las respuestas HTML de sus aplicaciones web que se sirven a través de un servidor web o proxy.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring">}}<u>Agentic Onboarding</u>: (En Vista Previa) Realice una configuración guiada por IA que detecte el marco de su proyecto y añada el SDK de RUM con un solo aviso. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/advanced_configuration">}}<u>Configuración Avanzada</u>: Configure el RUM Browser SDK para modificar la recopilación de datos, sobrescribir nombres de vistas, gestionar sesiones de usuario y controlar el muestreo según las necesidades de su aplicación.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins">}}<u>Build Plugins</u>: Integre los build plugins de Datadog con su empaquetador de JavaScript para automatizar las cargas de mapas del código fuente, la desofuscación de nombres de acción y otras tareas de RUM en el momento de la construcción.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/data_collected">}}<u>Datos Recopilados</u>: Revise los datos que recopila el Browser SDK.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_page_performance">}}<u>Monitoring Page Performance</u>: Haga seguimiento de los tiempos de visualización para entender el rendimiento de su aplicación desde la perspectiva del usuario. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/optimizing_performance">}}<u>Optimizing Performance</u>: Utilice la página de Optimización de RUM para identificar y solucionar problemas de rendimiento del navegador mediante el análisis de Core Web Vitals y la visualización de la experiencia del usuario.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance">}}<u>Monitoring Resource Performance</u>: Haga seguimiento del rendimiento de los recursos del navegador y vincule los datos de RUM con las trazas del backend para lograr una visibilidad completa de extremo a extremo.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/collecting_browser_errors">}}<u>Collecting Browser Errors</u>: Aprenda a recolectar y hacer seguimiento de los errores del frontend desde múltiples fuentes utilizando el RUM Browser SDK, incluyendo la recolección manual de errores y los límites de error de React.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/tracking_user_actions">}}<u>Tracking User Actions</u>: Rastree y analice las interacciones de los usuarios en su aplicación de navegador con detección automática de clics y análisis del rendimiento de las acciones.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/frustration_signals">}}<u>Frustration Signals</u>: Identifique los puntos de fricción del usuario con las señales de frustración de RUM (incluyendo clics de rabia, clics muertos y clics de error) para mejorar la experiencia del usuario y reducir el abandono.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/troubleshooting">}}<u>Troubleshooting</u>: Problemas comunes del Browser SDK.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectura adicional{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
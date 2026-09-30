---
aliases:
- /es/real_user_monitoring/browser/
description: Haga un seguimiento de los datos de usuario reales y del rendimiento
  del frontend con el SDK de navegador Datadog RUM para optimizar las experiencias
  web e identificar problemas en toda la pila.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Obtenga información sobre el Explorador de RUM
- link: /logs/log_collection/javascript/
  tag: Documentación
  text: Obtenga información sobre el SDK de navegador de Datadog para logs
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centro de aprendizaje
  text: Introducción a Real User Monitoring (RUM)
title: Supervisión de navegador de RUM
---
## Descripción general {#overview}

Datadog Real User Monitoring (RUM) le permite visualizar y analizar el rendimiento en tiempo real y los recorridos de los usuarios individuales de su aplicación.

{{< skill-callout
    title="Configure RUM con un agente"
    text="Copy this prompt into your AI coding agent to use the `dd-orchestrator` skill for guided RUM setup."
    action_name="copy_dd_orchestrator_rum_setup_prompt"
    lang="text" >}}
Utilizando la habilidad en https://github.com/datadog-labs/agent-skills/blob/main/dd-orchestrator/SKILL.md configure Datadog RUM en mi proyecto
{{< /skill-callout >}}

## Comience a hacer un seguimiento de las aplicaciones de navegador {#start-monitoring-browser-applications}

Para comenzar con RUM para navegador, cree una aplicación y configure el SDK de navegador.

{{< whatsnext desc="Esta sección incluye los siguientes temas:" >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Lado del cliente</u>: Aplique la instrumentación a cada una de sus aplicaciones web basadas en navegador, implemente la aplicación, luego configure los parámetros de inicialización que desea rastrear y utilice la configuración avanzada para administrar aún más los datos y el contexto que recopila RUM.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Instrumentación automática</u>: Inyecte un scriptlet de JavaScript del SDK de RUM en las respuestas HTML de sus aplicaciones web que se sirven a través de un servidor web o proxy.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring">}}<u>Onboarding con agentes</u>: (En vista previa) Realice una configuración guiada por IA que detecta el framework de su proyecto y agrega el SDK de RUM con un solo prompt. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/advanced_configuration">}}<u>Configuración avanzada</u>: Configure el SDK de navegador RUM para modificar la recopilación de datos, anular los nombres de visualización, administrar sesiones de usuario y controlar el muestreo según las necesidades de su aplicación.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins">}}<u>Complementos de compilación</u>: Integre los complementos de compilación de Datadog con su empaquetador de JavaScript para automatizar la carga de mapas del código fuente, la desofuscación de nombres de acciones y otras tareas de RUM en el momento de la compilación.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/data_collected">}}<u>Datos recopilados</u>: Revise los datos que recopila el SDK de navegador.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_page_performance">}}<u>Seguimiento del rendimiento de la página</u>: Haga un seguimiento de los tiempos de visualización para comprender el rendimiento de su aplicación desde la perspectiva del usuario. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/optimizing_performance">}}<u>Optimización del rendimiento</u>: Utilice la página de optimización de RUM para identificar y solucionar problemas de rendimiento del navegador con el análisis de Core Web Vitals y la visualización de la experiencia del usuario.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance">}}<u>Monitoreo del rendimiento de recursos</u>: Haga un seguimiento del rendimiento de los recursos del navegador y vincule los datos de RUM con los traces del backend para obtener una visibilidad completa de extremo a extremo.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/collecting_browser_errors">}}<u>Recopilación de errores del navegador</u>: Aprenda a recopilar y rastrear errores de frontend de múltiples fuentes utilizando el SDK de navegador RUM, incluyendo la recopilación manual de errores y los límites de error de React.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/tracking_user_actions">}}<u>Seguimiento de acciones del usuario</u>: Realice un seguimiento y analice las interacciones del usuario en su aplicación de navegador con detección automática de clics e información sobre el rendimiento de las acciones.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/frustration_signals">}}<u>Señales de frustración</u>: Identifique los puntos de fricción del usuario con las señales de frustración de RUM (incluyendo clics de rabia, clics muertos y clics de error) para mejorar la experiencia del usuario y reducir el abandono.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/troubleshooting">}}<u>Solución de problemas</u>: Solución de problemas comunes del SDK de navegador.{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
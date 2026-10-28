---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /es/workflows
- /es/service_management/workflows
description: Orqueste y automatice procesos de extremo a extremo con flujos de trabajo
  que conectan acciones en toda su infraestructura y herramientas.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Introducción a Workflow Automation
- link: https://learn.datadoghq.com/courses/automating-meaningful-actions
  tag: Centro de aprendizaje
  text: Automatización de acciones significativas con Datadog Workflow Automation
- link: https://www.datadoghq.com/blog/cloud-siem-cases/
  tag: Blog
  text: Convierta las señales de seguridad en investigaciones estructuradas con Case
    Management en Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: Blog
  text: Integre ServiceNow ITSM con Datadog para acelerar Incident Response
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Convierta los comentarios en acciones en toda su organización de ingeniería
    con Datadog Forms
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatice procesos de extremo a extremo y responda rápidamente a los eventos
    con Datadog Workflow Automation
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: Blog
  text: Automatice tareas de seguridad comunes y manténgase a la vanguardia de las
    amenazas con Datadog Workflows y Cloud SIEM
- link: https://www.datadoghq.com/blog/soar/
  tag: Blog
  text: Automatice la protección de identidad, la contención de amenazas y la inteligencia
    de amenazas con los flujos de trabajo de Datadog SOAR
- link: https://www.datadoghq.com/blog/azure-workflow-automation/
  tag: Blog
  text: Remedie rápidamente los problemas en sus aplicaciones de Azure con Datadog
    Workflow Automation
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: Blog
  text: Cree flujos de trabajo y aplicaciones de Datadog en minutos con nuestro asistente
    de IA
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: Blog
  text: Cómo creamos una única aplicación para automatizar tareas repetitivas con
    Datadog Workflow Automation, Datastore y App Builder
- link: https://www.datadoghq.com/blog/datadog-agent-builder/
  tag: Blog
  text: 'Presentamos Bits Agent Builder: cree flujos de trabajo agénticos para la
    respuesta y remediación de alertas'
- link: https://www.datadoghq.com/blog/build-datadog-workflows-ai-agents/
  tag: Blog
  text: Construya y ejecute flujos de trabajo de Datadog desde Bits Chat o agentes
    de IA
title: Workflow Automation
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/852419580/rendition/1080p/file.mp4?loc=external&signature=fb7ae8df018e24c9f90954f62ff3217bc1b904b92e600f3d3eb3f5a9d143213e" poster="/images/poster/workflow_automation.png" >}}

Datadog Workflow Automation le permite orquestar y automatizar sus procesos de extremo a extremo. Cree flujos de trabajo compuestos por [acciones][1] que se conectan a su infraestructura y herramientas. Estas acciones también pueden realizar operaciones lógicas y de datos, lo que le permite crear flujos complejos con ramificaciones, decisiones y operaciones de datos.

## Configure acciones de flujo de trabajo {#configure-workflow-actions}

Datadog Workflow Automation ofrece más de 2000 acciones en diversas herramientas, junto con acciones específicas de flujo de trabajo como la acción HTTP y el operador de datos JavaScript. Estas acciones le permiten realizar cualquier tarea necesaria en su flujo de trabajo.

## Comience con plantillas {#start-with-blueprints}

Datadog le proporciona flujos preconfigurados en forma de [plantillas][2] listas para usar. Docenas de plantillas le ayudan a crear procesos en torno a la gestión de incidentes, DevOps, gestión de cambios, seguridad y remediación.

## Automatice tareas críticas {#automate-critical-tasks}

Active sus flujos de trabajo desde monitores, señales de seguridad o Dashboards, o actívelos manualmente. Esta flexibilidad le permite responder con el flujo de trabajo adecuado en el momento en que se percata de un problema que afecta la salud de su sistema. La automatización de tareas críticas con Datadog Workflow Automation ayuda a mantener sus sistemas en funcionamiento al mejorar el tiempo de resolución y reducir la posibilidad de errores.

## Dashboard de descripción general de Workflows {#workflows-overview-dashboard}

El Dashboard de descripción general de Workflows proporciona una visión de alto nivel de sus flujos de trabajo y ejecuciones de Datadog. Para encontrar el Dashboard, vaya a su [lista de Dashboards][3] y busque `Workflows Overview`.

{{< img src="actions/workflows/workflows-dashboard.png" alt="El Dashboard de descripción general de Workflows" style="width:100%;" >}}

## Ejemplos {#examples}

A continuación, se muestran algunos ejemplos de flujos de trabajo que puede crear:
- Automatice el escalado de sus grupos de Auto Scaling de AWS cuando los monitores que rastrean métricas críticas de estos grupos de Auto Scaling entren en estado de alerta.
- Cree automáticamente cuadernos de investigación de IPs maliciosas para que sean detectadas por Security Signals y, luego, bloquee estas IPs en CloudFlare con el clic de un botón.
- Ejecute flujos de trabajo para volver a versiones estables de su aplicación directamente desde los Dashboards que utiliza para rastrear el estado de sus sistemas.
- Administre indicadores de funciones (feature flags) actualizando automáticamente sus archivos de configuración de indicadores de funciones en GitHub y automatizando el proceso de solicitud de extracción (pull request) y fusión.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#workflows** en el [Datadog Community Slack][4].

[1]: /es/actions/actions_catalog/
[2]: /es/workflows/build/#build-a-workflow-from-a-blueprint
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://chat.datadoghq.com/
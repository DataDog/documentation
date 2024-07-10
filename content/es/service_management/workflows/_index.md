---
algolia:
  tags:
  - flujo de trabajo
  - flujos de trabajo
  - automatización del flujo de trabajo
aliases:
- /es/workflows
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Empezando con Workflow Automation
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatiza de principio a fin procesos y responde rápidamente a eventos con
    Datadog Workflows
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: Blog
  text: Automatiza tareas de seguridad habituales y protégete frente a las amenazas
    con Datadog Workflows y Cloud SIEM
- link: https://www.datadoghq.com/blog/azure-workflow-automation/
  tag: Blog
  text: Soluciona rápidamente los problemas de tus aplicaciones Azure con Datadog
    Workflow Automation
title: Workflow Automation
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation no es compatible con tu <a href="/getting_started/site">sitio Datadog</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/852419580/rendition/1080p/file.mp4?loc=external&signature=fb7ae8df018e24c9f90954f62ff3217bc1b904b92e600f3d3eb3f5a9d143213e" poster="/images/poster/workflow_automation.png" >}}

Workflow Automation de Datadog te permite orquestar y automatizar procesos de principio a fin. Construye flujos de trabajo compuestos por [actions (acciones)][1] que se conectan a tu infraestructura y herramientas. Estas acciones también pueden realizar operaciones lógicas y de datos, lo que te permite crear flujos complejos con ramas, decisiones y operaciones de datos.

## Configurar acciones del flujo de trabajo

Datadog Workflow Automation proporciona más de 400 acciones a través de varias herramientas, junto con acciones específicas de Workflow como la acción HTTP y el operador de datos JavaScript. Estas acciones te permiten realizar cualquier tarea necesaria en tu flujo.

## Empezar con planos

Datadog te proporciona flujos preconfigurados en forma de [blueprints (planos)][2] listos para usar. Docenas de planos ayuda para crear procesos en torno a la gestión de incidentes, DevOps, gestión de cambios, seguridad y corrección.

## Automatiza las tareas críticas

Activa tus flujos de trabajo desde monitores, señales de seguridad o dashboards, o actívalos manualmente. Esta flexibilidad te permite responder con el flujo de trabajo adecuado en el momento en que detectas un problema que afecta a la salud de tu sistema. La automatización de tareas críticas con Workflow Automation Datadog ayuda a mantener tus sistemas en funcionamiento al mejorar el tiempo de resolución y reducir la posibilidad de errores.

## Dashboard de información general de Workflows

El dashboard de información general de Workflows proporciona una visión general de alto nivel de tus flujos de trabajo y ejecuciones Datadog. Para encontrar el dashboard, ve a tu [Dashboard list (lista de dashboard)][3] y busca `Workflows Overview` (información general de Workflows).

{{< img src="service_management/workflows/workflows-dashboard.png" alt="El dashboard de información general de Workflows" style="width:100%;" >}}

## Ejemplos

A continuación encontrarás algunos ejemplos de flujos de trabajo que puedes crear:
- Automatiza el escalado de tus Grupos de autoescalado AWS cuando los monitores de seguimiento de métricas críticos de estos Grupos de autoescalado pasen al estado de alerta.
- Crear automáticamente notebooks de investigación de IP maliciosas para ser detectadas por Security Signals, y, luego, bloquear estas IP en CloudFlare con el clic de un botón.
- Ejecuta flujos de trabajo para volver a versiones estables de tu aplicación directamente desde la página dashboards que utilizas para realizar un seguimiento del estado de tus sistemas.
- Gestiona las banderas de funciones actualizando automáticamente tus archivos de configuración de banderas de funciones en GitHub y automatizando la solicitud de extracción y el proceso de fusión.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/workflows/actions_catalog/
[2]: /es/workflows/build/#build-a-workflow-from-a-blueprint
[3]: https://app.datadoghq.com/dashboard/lists
---
aliases:
- /es/guides/eventcorrelation/
- /es/guides/markdown/
- /es/events
further_reading:
- link: /api/latest/events/
  tag: Documentación
  text: API de eventos de Datadog
- link: /service_management/events/guides/recommended_event_tags/
  tag: Documentación
  text: Prácticas recomendadas para etiquetar eventos
- link: https://www.datadoghq.com/blog/identify-sensitive-data-leakage-in-apm-rum-with-sensitive-data-scanner/
  tag: Blog
  text: Detecta y elimina datos confidenciales en eventos con Sensitive Data Scanner
- link: https://app.datadoghq.com/event/configuration/quick-start
  tag: Aplicación
  text: Guía de inicio rápido
is_beta: true
kind: documentation
title: Event Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Event Management no es compatible con este sitio.</div>
{{< /site-region >}}

{{< img src="service_management/events/correlation/event_management.png" alt="¿Qué es Event Management?" style="width:100%;" >}}

## Información general

Ingiere, enriquece y normaliza, y correlaciona (consulta la versión beta pública) tus eventos de cualquier fuente para obtener información práctica. Datadog crea de manera automática eventos a partir de varios productos, incluidos monitores, Watchdog y Error Tracking. También puedes realizar un seguimiento de los eventos que se generan a partir del Agent e integraciones instaladas. Event Management también puede ingerir eventos de cualquier fuente, incluido eventos de alerta de terceros, solicitudes de cambio, despliegues, cambios de configuración.

La recopilación de eventos es compatible con más de 100 integraciones de Datadog, incluido [Kubernetes][1], [Docker][2], [Jenkins][3], [Chef][4], [Puppet][5], [Amazon ECS][6] o [Autoscaling][7], [Sentry][8] y [Nagios][9]. 

## Componentes

{{< whatsnext desc="Características de Event Management:">}}
    {{< nextlink href="/service_management/events/ingest/" >}}<u>Ingesta de eventos</u>: aprende a enviar eventos a Datadog{{< /nextlink >}}
     {{< nextlink href="/service_management/events/pipelines_and_processors/">}}<u>Pipelines y procesadores</u>: enriquece y normaliza tus eventos{{< /nextlink >}}
    {{< nextlink href="/service_management/events/explorer/" >}}<u>Events Explorer</u>: visualiza, busca y envía notificaciones de eventos que llegan a Datadog{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/usage/" >}}<u>Uso de eventos</u>: analiza, investiga y monitoriza eventos {{< /nextlink >}}
    {{< nextlink href="/service_management/events/correlation/" >}}<u>Correlación</u>: reduce la fatiga de alertas y la cantidad de tickets/notificaciones que recibes {{< /nextlink >}}

{{< /whatsnext >}}

## Lectura adicional

{{< nombre parcial="whats-next/whats-next.html" >}}


[1]: /es/agent/kubernetes/#event-collection
[2]: /es/agent/docker/#events
[3]: /es/integrations/jenkins/#events
[4]: /es/integrations/chef/#report-handler
[5]: /es/integrations/puppet/#events
[6]: /es/integrations/amazon_ecs/#events
[7]: /es/integrations/amazon_auto_scaling/#events
[8]: /es/integrations/sentry/
[9]: /es/integrations/nagios/#events
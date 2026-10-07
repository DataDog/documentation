---
algolia:
  tags:
  - monitors
  - alerts
aliases:
- /es/guides/monitors/
- /es/guides/monitoring/
- /es/guides/alerting/
- /es/guides/monitors/the-conditions
- /es/monitoring
cascade:
  algolia:
    rank: 70
    tags:
    - alerts
    - alerting
    - monitoring
description: Cree monitores, configure notificaciones y automatizaciones, y administre
  sus monitores mediante la plataforma de Alerting
further_reading:
- link: /api/v1/monitors/
  tag: Documentación
  text: API de monitores de Datadog
- link: https://learn.datadoghq.com/courses/apm-monitors-and-alerting
  tag: Centro de aprendizaje
  text: APM Monitors y Alerting
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva sobre la creación de monitores eficaces
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: blog
  text: 'Monitoreo 101: Alerting sobre lo que importa'
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: blog
  text: Dirija sus alertas de seguimiento con las reglas de notificación de seguimiento
    de Datadog.
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: blog
  text: Detecte y solucione problemas de ECS más rápido con monitores predeterminados
    y el Explorador de ECS
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: blog
  text: 'Optimización de Datadog a escala: observabilidad rentable en Zendesk'
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: blog
  text: Detecte nombres de personas en registros con ML en Sensitive Data Scanner
- link: https://www.datadoghq.com/blog/how-to-audit-and-clean-up-monitors/
  tag: blog
  text: Cómo auditar y limpiar monitores de manera eficaz
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: Notas de la versión
  text: ¡Eche un vistazo a las últimas versiones de Alerting de Datadog! (Se requiere
    inicio de sesión en la aplicación).
title: Monitors
---
## Descripción general {#overview}

Datadog Monitors proporcionan una visibilidad vital de su infraestructura, permitiendo la detección proactiva y la respuesta en tiempo real a problemas de rendimiento e interrupciones. Al configurar Datadog Monitors para realizar un seguimiento de métricas y umbrales clave, las organizaciones pueden recibir alertas inmediatas y solucionar problemas antes de que afecten a los clientes o provoquen tiempos de inactividad del sistema.

Supervise cambios críticos mediante la verificación de métricas, la disponibilidad de integraciones y los puntos finales de red a través de la plataforma de Alerting. Con Datadog Monitors, usted puede:
- Simplificar los procesos de monitoreo y respuesta
- Mejorar la eficiencia operativa
- Optimizar el rendimiento

## Comience {#get-started}

La forma más rápida de comenzar con Datadog Monitors es con [Monitor templates][1]. Se trata de una colección de Datadog Monitors dentro de Datadog que están preconfigurados por Datadog y sus socios de integración.

También puede crear sus propios Datadog Monitors desde cero en entornos de laboratorio en el Centro de aprendizaje, o en su aplicación siguiendo la guía Getting Started with Monitors.

{{< whatsnext desc="Utilice los siguientes recursos para crear un Monitor:" >}}
    {{< nextlink href="/getting_started/monitors/" >}}Getting Started with Monitors: Guía sobre cómo crear un Monitor basado en métricas{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}Cree un Monitor desde Monitor Types{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-monitors" >}}Centro de aprendizaje: Cree un Monitor en un entorno de laboratorio sandbox{{< /nextlink >}}
{{< /whatsnext >}}

## Analice datos agregados {#analyze-aggregate-data}

Los datos deben estar bien comprendidos, ser granulares, estar etiquetados por contexto y ser duraderos. Utilice diferentes tipos de datos para alertas y diagnósticos, según el nivel de urgencia. Instrumente todas las aplicaciones y recopile la mayor cantidad de datos relevantes posible para obtener mediciones integrales y observabilidad de sistemas complejos.

Mida el estado de sus aplicaciones y el estado de su infraestructura con Datadog. Utilice datos de toda la plataforma Datadog para crear alertas sobre posibles problemas.

## Alerta sobre lo que importa {#alert-on-what-matters}

Configure [Monitor Notifications][2] para mantener a su equipo informado sobre los problemas y proporcionar orientación para la resolución de problemas. Dirija las notificaciones a las personas correctas, aproveche las variables de plantilla para incluir detalles y adjunte instantáneas al enviar las alertas por correo electrónico o Slack.

Reduzca la fatiga por alertas para que los equipos puedan concentrarse en resolver las alertas cuando sea importante. Cree [downtimes][3] para silenciar las alertas durante el mantenimiento de la aplicación.

## ¿Qué sigue? {#whats-next}

Los monitores y las alertas son herramientas esenciales para garantizar la confiabilidad, el rendimiento y la disponibilidad de los sistemas y aplicaciones de TI. Ayudan a mantener la eficiencia operativa, mejorar la experiencia del usuario y mitigar los riesgos potenciales al permitir la detección y respuesta rápidas a los problemas antes de que se intensifiquen. Obtenga más información sobre las funciones de Monitor: 
1. [Programe downtimes para silenciar Monitors.][4]
1. [Organice y administre Monitors.][5]
1. [Investigue las alertas a través de la página de estado.][6]
1. [Resuelva los Monitors mal configurados en la Monitor Quality page.][7]

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/templates
[2]: /es/monitors/notify
[3]: /es/monitors/downtimes
[4]: /es/monitors/downtimes/?tab=bymonitorname
[5]: /es/monitors/manage
[6]: /es/monitors/status/status_page
[7]: /es/monitors/quality/
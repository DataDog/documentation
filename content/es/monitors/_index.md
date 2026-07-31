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
  sus monitores utilizando la plataforma de Alerting
further_reading:
- link: /api/v1/monitors/
  tag: Documentación
  text: API de Monitores de Datadog
- link: https://dtdg.co/fe
  tag: Habilitación en Fundamentos
  text: Únase a una sesión interactiva sobre cómo crear monitores efectivos
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Monitoreo 101: Alertando sobre lo que importa'
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirija sus alertas de monitores con las reglas de notificación de monitores
    de Datadog
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: Blog
  text: Detecte y remedie problemas de ECS más rápido con monitores predeterminados
    y el Explorador de ECS
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: Blog
  text: 'Optimizando Datadog a gran escala: Observabilidad rentable en Zendesk'
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Detecte nombres humanos en registros con ML en el Escáner de Datos Sensibles
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: Notas de la versión
  text: ¡Consulte los últimos lanzamientos de Alerting de Datadog! (Se requiere inicio
    de sesión en la aplicación).
- link: https://learn.datadoghq.com/courses/apm-monitors-and-alerting
  tag: Centro de Aprendizaje
  text: Monitores APM y Alerting
title: Monitores
---
## Resumen {#overview}

Los Monitores de Datadog proporcionan visibilidad vital en su infraestructura, permitiendo la detección proactiva y la respuesta en tiempo real a problemas de rendimiento y caídas. Al configurar monitores para rastrear métricas clave y umbrales, las organizaciones pueden recibir alertas inmediatas y abordar problemas antes de que afecten a los clientes o causen tiempo de inactividad del sistema.

Monitorea cambios críticos al verificar métricas, disponibilidad de integración y puntos de conexión de red a través de la plataforma de Alerting. Con los Monitores de Datadog puedes:
- Simplificar los procesos de monitoreo y respuesta
- Mejorar la eficiencia operativa
- Optimizar el rendimiento

## Comenzar {#get-started}

La forma más rápida de comenzar con los Monitores de Datadog es con [plantillas de Monitores][1]. Estas son una colección de monitores dentro de Datadog que están preconfigurados por Datadog y socios de integración.

También puedes construir tus propios monitores desde cero en entornos de laboratorio en el Centro de Aprendizaje, o en tu aplicación siguiendo la guía de Introducción a los Monitores.

{{< whatsnext desc="Utiliza los siguientes recursos para crear un monitor:" >}}
    {{< nextlink href="/getting_started/monitors/" >}}Introducción a los Monitores: Guía sobre cómo construir un monitor basado en métricas{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}Crea un monitor a partir de Tipos de Monitores{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-monitors" >}}Centro de Aprendizaje: Construye un monitor en un entorno de laboratorio sandbox{{< /nextlink >}}
{{< /whatsnext >}}

## Analiza datos agregados {#analyze-aggregate-data}

Los datos deben ser bien entendidos, granulares, etiquetados por contexto y de larga duración. Utiliza diferentes tipos de datos para alertas y diagnósticos, según el nivel de urgencia. Instrumenta todas las aplicaciones y recopila la mayor cantidad de datos relevantes posible para mediciones completas y observabilidad de sistemas complejos.

Mide la salud de tus aplicaciones y el estado de tu infraestructura con Datadog. Utiliza datos de toda la plataforma de Datadog para crear alertas sobre problemas potenciales.

## Alerta sobre lo que importa {#alert-on-what-matters}

Configura [Monitor Notifications][2] para mantener a tu equipo informado sobre problemas y proporcionar orientación para la solución de problemas. Dirige las notificaciones a las personas correctas, aprovecha las variables de plantilla para incluir detalles y adjunta capturas de pantalla al enviar las alertas por correo electrónico o Slack.

Reduce la fatiga de alertas para que los equipos puedan concentrarse en resolver alertas cuando es necesario. Crea [downtimes][3] para silenciar alertas durante el mantenimiento de la aplicación.

## ¿Qué sigue? {#whats-next}

Los monitores y alertas son herramientas esenciales para garantizar la confiabilidad, el rendimiento y la disponibilidad de los sistemas y aplicaciones de TI. Ayudan a mantener la eficiencia operativa, mejorar la experiencia del usuario y mitigar riesgos potenciales al permitir la detección y respuesta rápida a problemas antes de que se agraven. Aprende más sobre las características de los monitores: 
1. [Schedule downtimes to mute monitors.][4]
1. [Organize and manage monitors.][5]
1. [Investigate alerts through the status page.][6]
1. [Resolve misconfigured monitors on the Monitor Quality page.][7]

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/templates
[2]: /es/monitors/notify
[3]: /es/monitors/downtimes
[4]: /es/monitors/downtimes/?tab=bymonitorname
[5]: /es/monitors/manage
[6]: /es/monitors/status/status_page
[7]: /es/monitors/quality/
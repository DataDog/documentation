---
algolia:
  tags:
  - monitores
  - alertas
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
    - alertas
    - alertar
    - monitorización
description: Crea monitores, configura notificaciones y automatizaciones, y gestiona
  tus monitores utilizando la plataforma de alertas
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: Notas de la versión
  text: ¡Mira cuáles son las últimas versiones de las alertas de Datadog! (Es necesario
    iniciar sesión en la aplicación).
- link: https://dtdg.co/fe
  tag: Establecer las bases
  text: Participa en una sesión interactiva sobre la creación de monitores eficaces
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Introducción a la monitorización: alertar sobre lo importante'
- link: /api/v1/monitors/
  tag: Documentación
  text: API de monitores de Datadog
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Enruta tus alertas de monitores con las reglas de notificación de monitores
    de Datadog
title: Monitores
---

## Información general

Los monitores de Datadog proporcionan una visibilidad vital de tu infraestructura, lo que permite una detección proactiva y una respuesta en tiempo real a los problemas de rendimiento y las interrupciones. Al configurar monitores para realizar un seguimiento de métricas y umbrales clave, las organizaciones pueden recibir alertas inmediatas y abordar los problemas antes de que afecten a los clientes o provoquen una caída del sistema.

Monitoriza cambios críticos comprobando las métricas, la disponibilidad de la integración y los endpoints de red a través de la plataforma de alerta. Con los monitores de Datadog puedes:
- Simplificar la monitorización y los procesos de respuesta
- Mejorar la eficacia operativa
- Optimizar el rendimiento

## Para empezar

La forma más rápida de empezar con los monitores de Datadog es con [Monitores recomendados][1]. Se trata de una colección de monitores dentro de Datadog que están preconfigurados por Datadog y los socios de integración.

También puedes crear tus propios monitores desde cero en los entornos de laboratorio en el Centro de aprendizaje, o en tu aplicación siguiendo la guía Empezando con monitores.

{{< whatsnext desc="Use the following resources to create a monitor:" >}}
    {{< nextlink href="/getting_started/monitors/" >}}Empezando con los monitores: Guía sobre cómo crear un monitor basado en métricas{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}Crear un monitor desde Tipos de monitores{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-monitors" >}}Centro de aprendizaje: Crear un monitor en un entorno de laboratorio de espacio aislado{{< /nextlink >}}
{{< /whatsnext >}}

## Analizar datos agregados

Los datos deben ser bien comprendidos, detallados, etiquetados por contexto y duraderos. Utiliza distintos tipos de datos para alertas y diagnósticos, en función del nivel de urgencia. Instrumenta todas las aplicaciones y recopila tantos datos relevantes como sea posible para realizar mediciones exhaustivas y observar los sistemas complejos.

Mide el estado de tus aplicaciones y el estado de tu infraestructura con Datadog. Utiliza datos de toda la plataforma de Datadog para crear alertas sobre posibles problemas.

## Alertas sobre lo que importa

Configura [notificaciones de monitor][2] para mantener a tu equipo informado de los problemas y ofrecer una guía para solucionar problemas. Dirige las notificaciones a las personas adecuadas, aprovecha las variables de plantilla para incluir detalles y adjunta snapshots cuando envíes las alertas por correo electrónico o Slack.

Reduce la fatiga de las alertas para que los equipos puedan centrarse en resolver las alertas pertinentes. Crea [tiempos de inactividad][3] para silenciar las alertas durante el mantenimiento de las aplicaciones.

## Próximos pasos

Los monitores y las alertas son herramientas esenciales para garantizar la fiabilidad, el rendimiento y la disponibilidad de los sistemas y aplicaciones de TI. Ayudan a mantener la eficiencia operativa, se mejora la experiencia del usuario y se mitigan los riesgos potenciales al permitir una rápida detección y respuesta a los problemas antes de que se agraven. Más información sobre las funciones del monitor: 
1. [Programa tiempos de inactividad para silenciar monitores.][4].
1. [Organiza y gestiona monitores.][5]
1. [Investiga las alertas a través de la página de estado.][6].
1. [Soluciona errores de configuración de monitores en la page (página) Calidad de monitores][7].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/recommended
[2]: /es/monitors/notify
[3]: /es/monitors/downtimes
[4]: /es/monitors/downtimes/?tab=bymonitorname
[5]: /es/monitors/manage
[6]: /es/monitors/status/status_page
[7]: /es/monitors/quality/
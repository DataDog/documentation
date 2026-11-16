---
description: Inicie una Bits Investigation a partir de una anomalía en un gráfico
  vital de RUM, o deje que Bits investigue automáticamente las alertas de seguimiento
  de RUM.
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: Documentación
  text: Bits en RUM
- link: /bits_ai/bits_investigation/investigate_issues/
  tag: Documentación
  text: Investigue problemas con Bits Investigation
- link: /monitors/types/real_user_monitoring/
  tag: Documentación
  text: Seguimientos de RUM
title: Investigue regresiones y Alerts con Bits AI
---
## Descripción general {#overview}

Cuando una métrica de rendimiento se degrada repentinamente, puede llegar a la causa raíz de dos maneras:

- [Investigue una anomalía](#investigate-an-anomaly-on-a-vital-chart) que RUM detecta en un gráfico de métricas vitales.
- [Habilite las investigaciones automáticas](#automatically-investigate-rum-monitor-alerts) en sus seguimientos de RUM, para que Bits comience a investigar tan pronto como un seguimiento emita una alerta.

## Investigue una anomalía en un gráfico vital {#investigate-an-anomaly-on-a-vital-chart}

RUM ejecuta la detección de anomalías en los gráficos de Core Web Vitals de la página de resumen de RUM para aplicaciones de navegador. Cuando una métrica vital se degrada inesperadamente, RUM resalta el intervalo de tiempo de la anomalía en el gráfico y muestra un botón de **Anomalía · Investigar** debajo de él.

{{< img src="real_user_monitoring/bits_ai/anomaly-investigate.png" alt="Un gráfico de First Contentful Paint con una ventana anómala resaltada en rosa y un botón de Anomalía · Investigar debajo del gráfico." style="width:50%;" >}}

Para iniciar una investigación, haga clic en **Anomalía · Investigar**. Se abre una Bits Investigation en una nueva pestaña con la métrica vital, la consulta y vista activas, el marco de tiempo del gráfico y el inicio y fin de la anomalía. Bits compara la ventana anómala con los períodos circundantes para explicar qué cambió y qué versiones, páginas o segmentos de usuarios se vieron afectados.

**Nota**: Solo se resaltan las degradaciones, como un aumento en Largest Contentful Paint o Cumulative Layout Shift. Las mejoras no se marcan como anomalías.

## Investigue automáticamente las alertas del seguimiento de RUM {#automatically-investigate-rum-monitor-alerts}

Bits Investigation es compatible con [seguimientos de RUM][1]. Cuando habilita las investigaciones automáticas en un seguimiento de RUM, Bits inicia una investigación cada vez que el seguimiento pasa al estado de alerta, por lo que la causa raíz y su evidencia están listas cuando su ingeniero de guardia abre la alerta.

Para habilitar investigaciones automáticas en un seguimiento de RUM:

1. Cree o edite un [seguimiento de RUM][2].
2. En **Configurar notificaciones y automatizaciones**, cambie **Investigar con Bits** a **Habilitado**.
3. Guarde el seguimiento.

{{< img src="real_user_monitoring/bits_ai/monitor-auto-investigate.png" alt="La configuración Investigar con Bits en el editor de seguimientos, cambiada a Habilitado para investigar automáticamente las alertas del seguimiento." style="width:100%;" >}}

También puede iniciar una investigación manualmente desde una alerta individual de un seguimiento de RUM. Para conocer todos los puntos de entrada disponibles y las condiciones que activan las investigaciones automáticas, consulte [Investigar problemas][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/real_user_monitoring/
[2]: https://app.datadoghq.com/monitors/create/rum
[3]: /es/bits_ai/bits_investigation/investigate_issues/#enable-automatic-investigations
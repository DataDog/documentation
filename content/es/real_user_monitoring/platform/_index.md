---
description: Aprende a aprovechar las capacidades de la plataforma Datadog para maximizar
  las capacidades de RUM.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Información sobre el navegador RUM
title: Plataforma
---

## Información general

Una vez que hayas empezado a recopilar datos para tus aplicaciones RUM, puedes aprovechar las capacidades de la plataforma Datadog para visualizar, monitorizar y analizar datos en RUM y en el resto de tu stack conectado. 

## Crear dashboards
Utiliza [dashboards][1] para rastrear, analizar y mostrar el rendimiento clave y las métricas de uso.

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="Dashboard de RUM" >}}

## Configurar monitors
Configura [monitors][2] para notificar a tus equipos y gestionar las alertas de un vistazo en la plataforma Alertar.

{{< img src="monitors/monitor_types/rum/rum_multiple_queries_2.png" alt="Un monitor configurado para alertar sobre la tasa de error de una página de carrito. Este monitor tiene dos consultas (a y b) y contiene una fórmula: (a/b)*100." style="width:80%;" >}}

## Generar métricas personalizadas
Genera [métricas personalizadas][3] para rastrear los KPI de la aplicación durante un largo periodo de tiempo de hasta 15 meses.

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="Generar una métrica personalizada en RUM" width="80%" >}}

## Conectar RUM y trazas
[Conecta RUM y trazas (traces)][4] para vincular las solicitudes del frontend a sus trazas del backend correspondiente y localizar problemas en cualquier lugar de tu stack.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_trace_tab.png" alt="RUM y Trazas" style="width:100%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/platform/dashboards
[2]: /es/monitors/types/real_user_monitoring/
[3]: /es/real_user_monitoring/platform/generate_metrics
[4]: /es/real_user_monitoring/platform/connect_rum_and_traces
---
aliases:
- /es/logs/explore
- /es/logs/patterns
- /es/logs/graph
- /es/logs/analytics
- /es/logs/explorer/list
- /es/logs/explorer/patterns
- /es/logs/explorer/transactions/
description: Busque en todos sus registros y realice análisis de registros
further_reading:
- link: logs/explorer/live_tail
  tag: Documentación
  text: Previsualice sus registros en Live Tail
- link: logs/explorer/saved_views/
  tag: Documentación
  text: Configure automáticamente su Log Explorer
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Agregue una URL de Log Explorer a su portapapeles
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/
  tag: Blog
  text: Envíe registros de flujo de Amazon VPC a Amazon Kinesis Data Firehose y Datadog
- link: https://www.datadoghq.com/blog/ai-powered-log-parsing
  tag: Blog
  text: Acelere las investigaciones con parseo de registros impulsado por IA
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: Centro de Aprendizaje
  text: Comenzando con Log Explorer
title: Log Explorer
---
## Resumen {#overview}

El [**Log Explorer**][1] es su base de operaciones para la solución de problemas y exploración de registros Ya sea que comience desde cero, desde un [Saved View][2], o llegue aquí desde cualquier otro contexto, como notificaciones de Monitors o widgets de dashboard, puede buscar y filtrar, agrupar, visualizar y exportar registros en Log Explorer

{{< img src="/logs/explore.png" alt="Explore sus registros ingeridos" style="width:100%;">}}

## Buscar y filtrar {#search-and-filter}

{{< ui >}}Search{{< /ui >}} y {{< ui >}}Filter{{< /ui >}} en los registros para reducir, ampliar o cambiar su enfoque en un subconjunto de registros adaptados a su interés actual

  - Para aprender más sobre cómo buscar registros en Log Explorer, lea [Search Logs][3]
  - Para comenzar a crear consultas y usar facetas en Log Explorer, lea [Log Search Syntax][4]
  - Para aprender cómo [Watchdog Insights][9] revela registros anómalos y valores anómalos en registros de errores dentro de su contexto de búsqueda, lea [Watchdog Insights for Logs][5]

## Analice {#analyze}

{{< ui >}}Group{{< /ui >}} sus registros consultados en entidades de nivel superior como campos, patrones y transacciones para derivar o consolidar información 

Para comenzar a identificar patrones y agregar registros por subconjuntos de eventos, consulte [Log Analytics][6]

## Visualice {#visualize}

{{< ui >}}Visualize{{< /ui >}} el resultado de sus filtros y agregaciones para comprender mejor sus registros y reunir información decisiva Por ejemplo, puede ver sus registros en una lista para organizar sus datos de registro en columnas, o en un gráfico de series temporales para medir sus datos de registro a lo largo del tiempo 

Para comenzar a visualizar datos de registro en Log Explorer, consulte [Log Visualizations][7]

## Exporte {#export}

También puede {{< ui >}}export{{< /ui >}} su vista de Log Explorer para reutilizarla más tarde o en diferentes contextos 

Para aprender cómo exportar sus consultas y visualizaciones de registros, consulte [Export Logs][8]

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /es/logs/explorer/saved_views/
[3]: /es/logs/explorer/search
[4]: /es/logs/explorer/search_syntax/
[5]: /es/logs/explorer/insights
[6]: /es/logs/explorer/analytics
[7]: /es/logs/explorer/visualize
[8]: /es/logs/explorer/export
[9]: /es/watchdog/insights
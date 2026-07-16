---
aliases:
- /es/synthetics/dashboards/browser_test
description: Más información sobre el dashboard de rendimiento de los tests del navegador
  Synthetic predefinido.
further_reading:
- link: /continuous_testing/explorer/
  tag: Documentación
  text: Más información sobre la Monitorización Synthetic y el Explorador de resultados
    de tests
title: Dashboard de rendimiento de los tests del navegador Synthetic
---

## Información general

El [dashboard de rendimiento de los tests del navegador][1] proporciona información sobre las ejecuciones de tests del navegador, el análisis del navegador, el rendimiento de la web y otros eventos. Muestra:

- **Análisis de tests del navegador Synthetic**: Consulta un desglose de la tasa de éxito por tipo de navegador, una lista de alertas de tests del navegador y la duración media de los tests por tipo de navegador y localización.

  {{< img src="synthetics/dashboards/browser_test_analysis.png" alt="Sección Análisis de tests del navegador en el dashboard de rendimiento de tests del navegador Synthetic" style="width:100%" >}}

- **Rendimiento en la web de tests Synthetic**: Si tienes Datadog RUM habilitado, utiliza la [integración RUM][2] para examinar Core Web Vitals y una lista de recursos de tests de proveedores externos.

  {{< img src="synthetics/dashboards/browser_test_web_performance.png" alt="Sección Rendimiento en la web de tests Synthetic en el dashboard de rendimiento de tests del navegador Synthetic" style="width:100%" >}}

- **Eventos**: Explora eventos destacados de tus alertas de tests Synthetic.

  {{< img src="synthetics/dashboards/browser_test_events.png" alt="Sección Eventos en el en el dashboard de rendimiento de tests del navegador Synthetic" style="width:100%" >}}


{{< img src="synthetics/dashboards/browser_test_performance.png" alt="Dashboard de rendimiento de tests del navegador predefinido" style="width:100%" >}}

Para obtener más información sobre los datos mostrados, consulta [Métricas de monitorización Synthetic][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /es/synthetics/guide/explore-rum-through-synthetics/
[3]: /es/watchdog/
[4]: /es/synthetics/metrics/
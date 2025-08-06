---
description: Te contamos cómo utilizar las métricas de uso estimado de los tests de
  Synthetics.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Prácticas recomendadas para crear tests de extremo a extremo.
- link: /synthetics/api_tests
  tag: Documentación
  text: Crear un test de API
- link: /synthetics/multistep
  tag: Documentación
  text: Crear un test de API multipaso
- link: /synthetics/browser_tests
  tag: Documentación
  text: Crear un test de navegador
title: Utilizar métricas de uso estimado
---

## Información general

Los tests de Synthetics vienen con [métricas de uso estimado][1] que te permiten llevar un seguimiento de tu uso. Gracias a ellas conseguirás lo siguiente:

* Saber cómo cambia tu uso a lo largo del tiempo.
* Visualiza qué equipos, aplicaciones o servicios contribuyen en mayor medida a su uso de Synthetic Monitoring.
* Recibir alertas cuando se producen picos de uso imprevistos que repercutirán en tu factura

Para visualizar o alertar sobre el uso de Synthetic Monitoring, utiliza las siguientes consultas:

* [Tests de API simples][2] y [multipaso][3]: `sum:datadog.estimated_usage.synthetics.api_test_runs{*}.as_count()`

* [Tests de navegador][4]: `sum:datadog.estimated_usage.synthetics.browser_test_runs{*}.as_count()`.

  **Nota:** El precio de los navegadores {{< tooltip glossary="test run">}}s se basa en el número de pasos. Consulta la [Documentación sobre precios][7] para obtener más información.

Para conseguir una mayor precisión, acota o agrupa las métricas por las etiquetas asociadas al test; por ejemplo, `team` o `application`.

Puedes representar las métricas en un gráfico y monitorizarlas tomando como referencia umbrales fijos. También tienes la posibilidad de aplicar algoritmos de machine learning para [detectar anomalías][5] o [hacer predicciones][6], con el fin de no recibir alertas cuando se produce un aumento esperado del uso.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/billing/usage_metrics/#types-of-usage
[2]: /es/synthetics/api_tests
[3]: /es/synthetics/multistep
[4]: /es/synthetics/browser_tests
[5]: /es/monitors/types/anomaly/
[6]: /es/monitors/types/forecasts
[7]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#synthetic-monitoring-api--browser-what-counts-as-a-browser-test-run
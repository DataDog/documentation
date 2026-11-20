---
description: Obtenga información sobre las métricas de uso estimado generadas a partir
  de sus pruebas Synthetic.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Mejores prácticas para crear pruebas de extremo a extremo
- link: /synthetics/api_tests
  tag: Documentación
  text: Crear una prueba de API
- link: /synthetics/multistep
  tag: Documentación
  text: Crear una prueba de API en varios pasos
- link: /synthetics/browser_tests
  tag: Documentación
  text: Crear una prueba de navegador
title: Utilice métricas de uso estimado
---
## Descripción general {#overview}

Las pruebas Synthetic incluyen [métricas de uso estimado][1] que le permiten realizar un seguimiento de su uso. Estas métricas le permiten, en particular:

* Comprender cómo evoluciona su uso a lo largo del tiempo.
* Visualizar qué equipos, aplicaciones o servicios contribuyen más a su uso de Synthetic Monitoring.
* Alerte sobre los picos de uso inesperados que pueden afectar su facturación.

Para visualizar su uso de Synthetic Monitoring o alertar sobre él, utilice las siguientes consultas:

* [Pruebas de API individuales][2] y [pruebas de API en varios pasos][3]: `sum:datadog.estimated_usage.synthetics.api_test_runs{*}.as_count()`

* [Pruebas de navegador][4]: `sum:datadog.estimated_usage.synthetics.browser_test_runs{*}.as_count()`.

  **Nota:** El precio de los  {{< tooltip glossary="test_run">}}s de las pruebas de navegador se basa en la cantidad de pasos. Consulte la [documentación de precios][7] para obtener más información.

Para un mayor nivel de refinamiento, use etiquetas asociadas a su prueba, como `team` o `application`, para definir el contexto de estas métricas o agruparlas. 

Puede graficar y monitorear estas métricas frente a umbrales estáticos, así como utilizar algoritmos basados en aprendizaje automático como [detección de anomalías][5] o [pronóstico][6] para asegurarse de no recibir alertas por un crecimiento de uso esperado.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/billing/usage_metrics/estimated_usage_metrics/#types-of-usage
[2]: /es/synthetics/api_tests
[3]: /es/synthetics/multistep
[4]: /es/synthetics/browser_tests
[5]: /es/monitors/types/anomaly/
[6]: /es/monitors/types/forecasts
[7]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#synthetic-monitoring-api--browser-what-counts-as-a-browser-test-run
---
aliases:
- /es/synthetics/dashboards/test_summary
further_reading:
- link: /continuous_testing/explorer/
  tag: Documentación
  text: Más información sobre la Monitorización Synthetic y el Explorador de resultados
    de tests
title: Dashboard de resumen de tests Synthetic
---

## Información general

El [dashboard de resumen de tests][1] proporciona información sobre los tests que se ejecutan en Synthetic, los tests Synthetic en tus pipelines CI/CD y las localizaciones privadas. Muestra:

- **Monitorización Synthetic y uso de tests**: Consulta un desglose de tu test Synthetic por entorno, equipo y tipo de test.

  {{< img src="synthetics/dashboards/test_summary_dashboard.png" alt="Dashboard de resumen de tests Synthetics predefinido" style="width:100%" >}}

- **Automatización de tests**: Observa las ejecuciones de tests Synthetic realizados en tus pipelines CI/CD por tipo y equipo.

  {{< img src="synthetics/dashboards/test_automation.png" alt="Sección Tests continuos e integraciones CI/CD en el dashboard de resumen de tests Synthetics" style="width:100%" >}}

- **Localizaciones privadas**: Consulta el número de workers Synthetic por localización privada, concurrencia media y número medio de tests extraídos.

  {{< img src="synthetics/dashboards/private_locations.png" alt="Sección Localizaciones privadas en el dashboard de resumen de tests Synthetics" style="width:100%" >}}


Para obtener más información sobre los datos mostrados, consulta [Métricas de monitorización Synthetic][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30696/synthetics---test-summary
[2]: /es/watchdog/
[3]: /es/synthetics/metrics/
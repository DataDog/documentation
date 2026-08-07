---
aliases:
- /es/synthetics/dashboards/api_test
further_reading:
- link: /continuous_testing/explorer/
  tag: Documentación
  text: Más información sobre la Monitorización Synthetic y el Explorador de resultados
    de tests
title: Dashboard de rendimiento de los tests de API Synthetic
---

## Información general

El [dashboard de rendimiento de los tests de API][1] proporciona información sobre tu stack tecnológico y tus eventos. Muestra:

- **Tipos de tests de API**: Consulta el tiempo de respuesta medio, la latencia o el tiempo de búsqueda de tus niveles de red, junto con los tiempos de transacción y el tiempo de respuesta por localización y tipo de test.

  {{< img src="synthetics/dashboards/api_test_performance_dashboard_2_2024.png" alt="Dashboard de rendimiento de los tests de API Synthetics predefinido" style="width:100%" >}}

- **Eventos**: Consulta eventos activados para todos tus tests de API y filtra tests específicos utilizando las variables de plantilla en la parte superior del dashboard.

  {{< img src="synthetics/dashboards/api_test_performance_events_2_2024.png" alt="Sección Eventos en el dashboard de rendimiento de los tests de API Synthetics" style="width:100%" >}}


Para obtener más información sobre los datos mostrados, consulta [Métricas de monitorización Synthetic][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30695/synthetics---api-test-performance
[2]: /es/watchdog/
[3]: /es/synthetics/metrics/
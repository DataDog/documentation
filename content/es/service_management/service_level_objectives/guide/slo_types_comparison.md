---
further_reading:
- link: /service_management/service_level_objectives/
  tag: Documentación
  text: Información general de Objetivos de nivel de servicio (SLOs)
- link: /service_management/service_level_objectives/metric/
  tag: Documentación
  text: SLOs basados en métricas
- link: /service_management/service_level_objectives/monitor/
  tag: Documentación
  text: SLOs basados en métricas
- link: /service_management/service_level_objectives/time_slice/
  tag: Documentación
  text: SLOs de fracción de tiempo
kind: Guía
title: Comparación de tipos de SLO
---

## Información general

Al crear SLOs, puedes elegir entre los siguientes tipos:
- **Metric-based SLOs** (SLOs basados en métricas): puede utilizarse cuando se desea que el cálculo del SLI se base en el recuento, el SLI se calcula como la suma de los eventos buenos dividida por la suma del total eventos.
- **Monitor-based SLOs** (SLOs basados en monitor): se puede utilizar cuando se desea que el cálculo del SLI se base en el tiempo, el SLI se basa en el tiempo de actividad de monitor. Los SLOs basados en monitor deben basarse en un monitor Datadog nuevo o existente, cualquier ajuste debe hacerse en el monitor subyacente (no puede hacerse a través de la creación de SLO).
- **Time Slice SLOs** (SLOs de fracción de tiempo): se puede utilizar cuando se desea que el cálculo SLI se base en el tiempo, el SLI se basa en tu definición personalizada de tiempo de actividad (cantidad de tiempo que tu sistema muestra un buen comportamiento dividido por el tiempo total). Los SLOs de fracción de tiempo no requieren un monitor Datadog, puedes probar diferentes filtros y umbrales de métrica, y explorar instantáneamente la caída del sistema durante la creación de SLO.

<div class="alert alert-info">La duración del historial admitida para los SLOs basados en métrica y de fracción de tiempo coincide con la duración de tu cuenta métrica (por defecto, es de 15 meses).</div>

## Cuadro comparativo

|                                                                       | **Metric-based SLO** (SLO basado en métricas)                                                                                                                      | **Monitor-based SLO** (SLO basado en monitor)                                                                                                                                               | **Time Slice SLO** (SLO de fracción de tiempo)                                                                   |
|-----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **Supported data types** (tipos de datos admitidos)                                              | Métricas con tipo de recuento, tasa o distribución                                                                                         | Tipos de monitores de métrica, monitores de Synthetic y checks de servicio                                                                                                        | Todos los tipos de métrica (incluidas métricas gauge)                                           |
| **Functionality for SLO with Groups** (Funcionalidad para grupos con SLO)                                               | SLO calculado en base a todos los grupos<br><br>Puede ver todos los grupos en el panel lateral SLO y SLO widget                                                                                                                  | Admitido para SLOs con una sola alerta múltiple monitor<br><br> **Opción 1:** SLO calculado basado en todos los grupos (puede ver todos los grupos en el panel lateral SLO y SLO widget)<br>**Opción 2:** SLO calculado basado en hasta 20 grupos seleccionados (puede ver todos los grupos seleccionados en el panel lateral SLO y SLO widget)                                                                                                                                | SLO calculado en base a todos los grupos<br><br>Puede ver todos los grupos en el panel lateral SLO y SLO widget                                                           |
| **SLO side panel** (panel lateral SLO) | Puedes establecer una ventana de tiempo personalizada para ver hasta 15 meses de historial de SLO.                                                                                                | Puedes establecer una ventana de tiempo personalizada para ver hasta 3 meses de historial de SLO.                                                                                                                     | Puedes establecer una ventana de tiempo personalizada para ver hasta 15 meses de historial de SLO.                                         |
| **SLO alerting ([Error Budget][1] or [Burn Rate][2] Alerts)** (Alerta de SLO [presupuesto de errores][1] o alertas de [tasa de consumo][2])         | Disponible                                                                                                      | Disponible solo para SLOs basados en tipos de monitores de métrica (no disponible para monitores Synthetic o checks de servicio)                                                      | Disponible                                                    |
| [**SLO Status Corrections**(Correcciones de estado de SLO)][3]                                       | Los períodos de corrección se ignoran en el cálculo del estado SLO.                                                              | Los períodos de corrección se ignoran en el cálculo del estado SLO.                                                                                        | Los períodos de corrección se cuentan como tiempo de actividad en el cálculo del estado de SLO. |
| **SLO widgets ([SLO lista widget ][10] o [SLO widget][9])**                                                  | Puede ver hasta 15 meses de datos históricos con el SLO widget                                                                                                           | Puede ver hasta 3 meses de datos históricos con el SLO widget                                                                                                                           | Puede ver hasta 15 meses de datos históricos con el SLO widget                                                         |
| **[SLO Data Source][5] (up to 15 months of historical data)** ([Fuente de datos SLO][5] [hasta 15 meses de datos históricos])                                              | Disponible                                                                | No disponible                                                                                                                                     | Disponible                                                |
| **Handling missing data in the SLO calculation** (Manejo de datos que faltan en el cálculo SLO)                      | Los datos que faltan se ignoran en los cálculos del estado SLO y del presupuesto de errores.                                                                       | Los datos que faltan se tratan en función de la [underlying Monitor's configuration (configuración de monitor subyacente)][6]                                                                                        | Los datos que faltan se tratan como tiempo de actividad en los cálculos del estado SLO y del presupuesto de errores.        |
| **Uptime Calculations** (cálculos del tiempo de actividad)                                          |  N/A                                                                                  |  Los cálculos del tiempo de actividad se basan en el monitor subyacente <br><br>Si hay grupos, el tiempo de actividad general requiere que *todos* los grupos tengan tiempo de actividad.| El [uptime (tiempo de actividad)][7] se calcula por períodos de tiempo discretos, no por ventanas de tiempo continuas<br><br>Si hay grupos, el tiempo de actividad general requiere que *todos* los grupos tengan tiempo de actividad. |
| **[Calendar View][11] on SLO Manage Page** ([vista de calendario][11] en la página de gestión de SLO)                                   | Disponible                                                                                                                                | No disponible                                                                                                                                                      | Disponible                                                                            |
| **Public [APIs][8] and Terraform Support** (API públicas[8] y Asistencia Terraform)                                   | Disponible                                                                                                                                 | Disponible                                                                                                                                                     | Disponible                                                                            |

## Referencias adicionales

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/service_management/service_level_objectives/error_budget/
[2]: https://docs.datadoghq.com/es/service_management/service_level_objectives/burn_rate/
[3]: https://docs.datadoghq.com/es/service_management/service_level_objectives/#slo-status-corrections
[4]: https://docs.datadoghq.com/es/service_management/service_level_objectives/#slo-widgets
[5]: https://docs.datadoghq.com/es/dashboards/guide/slo_data_source/
[6]: https://docs.datadoghq.com/es/service_management/service_level_objectives/monitor/#missing-data
[7]: /es/service_management/service_level_objectives/time_slice/#uptime-calculations
[8]: https://docs.datadoghq.com/es/api/latest/service-level-objectives/
[9]: https://docs.datadoghq.com/es/dashboards/widgets/slo/
[10]: https://docs.datadoghq.com/es/dashboards/widgets/slo_list/
[11]: https://docs.datadoghq.com/es/service_management/service_level_objectives/#slo-calendar-view
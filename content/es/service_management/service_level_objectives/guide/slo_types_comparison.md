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
  text: SLOs basados en monitores
- link: /service_management/service_level_objectives/time_slice/
  tag: Documentación
  text: SLOs de fracción de tiempo
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: Blog
  text: Mejores prácticas para gestionar tus SLOs con Datadog
title: Comparación de tipos de SLO
---

## Información general

Al crear SLOs, puedes elegir entre los siguientes tipos:
- **SLOs basados en métricas**: pueden utilizarse cuando quieres que el cálculo SLI se base en el recuento. El SLI se calcula como la suma de los eventos correctos dividida por la suma del total de eventos.
- **SLOs basados en monitores**: pueden utilizarse cuando quieres que el cálculo del SLI se base en el tiempo. El SLI se basa en el tiempo de actividad del monitor. Estos SLOs deben basarse en un monitor de Datadog nuevo o existente, cualquier ajuste debe hacerse en el monitor subyacente (no puede hacerse a través de la creación de un SLO).
- **SLOs de fracción de tiempo**: pueden utilizarse cuando quieres que el cálculo del SLI se base en el tiempo, el SLI se basa en tu definición personalizada de tiempo de actividad (cantidad de tiempo que el sistema muestra un buen comportamiento dividido por el tiempo total). Los SLOs de fragmento de tiempo no requieren un monitor de Datadog, puedes probar diferentes filtros de métrica y umbrales y explorar instantáneamente la caída del sistema durante la creación de un SLO.

<div class="alert alert-info">La duración del historial admitida para los SLOs basados en métricas y de fracción de tiempo coincide con la duración de la métrica de tu cuenta (por defecto, es de 15 meses).</div>

## Cuadro comparativo

|                                                                       | **SLO basado en métricas**                                                                                           | **SLO basado en monitores**                                                                                                                                               | **SLO de fracción de tiempo**                                                                   |
|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **Tipos de datos admitidos**                                              | Métricas con tipo de recuento, tasa o distribución                                                              | Tipos de monitores de métrica, monitores de Synthetic y checks de servicio                                                                                                        | Todos los tipos de métrica (incluidas métricas gauge) |
| **Funcionalidad para SLOs con grupos**                                 | SLO calculado en base a todos los grupos<br><br>Puede ver todos los grupos en el panel lateral SLO y SLO widget                 | Admitido para SLOs con una sola alerta múltiple monitor<br><br> **Opción 1:** SLO calculado basado en todos los grupos (puede ver todos los grupos en el panel lateral SLO y SLO widget)<br>**Opción 2:** SLO calculado basado en hasta 20 grupos seleccionados (puede ver todos los grupos seleccionados en el panel lateral SLO y SLO widget)                                                                                                                                | SLO calculado en base a todos los grupos<br><br>Puede ver todos los grupos en el panel lateral SLO y SLO widget |
| **Panel lateral de SLOs** | Puedes establecer una ventana de tiempo personalizada para ver hasta 15 meses de historial de SLO.    | Puedes establecer una ventana de tiempo personalizada para ver hasta 3 meses de historial de SLO.                         | Puedes establecer una ventana de tiempo personalizada para ver hasta 15 meses de historial de SLO.                                         |
| Alerta de SLO del [presupuesto de errores][1] o alertas de [tasa de consumo][2])**         | Disponible<br><br>Si hay grupos presentes, se puede alertar en función sólo del SLO global                                                                                                      | Disponible sólo para SLOs basados en tipos de monitores de métricas (no disponible para monitores Synthetic o checks de servicios)<br><br>Si hay grupos presentes, se puede alertar en función sólo del SLO global                                                      | Disponible<br><br>Si hay grupos presentes, se puede alertar en función de los grupos o del SLO global   |
| [**Correcciones de estado de SLOs**][3]                                       | Los períodos de corrección se ignoran en el cálculo del estado SLO.                                                     | Los períodos de corrección se ignoran en el cálculo del estado SLO.                                                                                                          | Los períodos de corrección se cuentan como tiempo de actividad en el cálculo del estado de SLO. |
| **Widgets de SLOs ([widget de lista de SLOs][10] o [widget de SLO][9])**            | Puede ver hasta 15 meses de datos históricos con el SLO widget                                                | Puede ver hasta 3 meses de datos históricos con el SLO widget                                                                                                      | Puede ver hasta 15 meses de datos históricos con el SLO widget  |
| **[Fuente de datos de SLOs][5] (hasta 15 meses de datos históricos)**         | Disponible                                                                                                      | No disponible                                                                                                                                                       | Disponible                                             |
| **Manejo de datos que faltan en el cálculo de SLOs**                      | Los datos que faltan se ignoran en los cálculos del estado SLO y del presupuesto de errores.                                            | Los datos que faltan se tratan en función de la [underlying Monitor's configuration (configuración de monitor subyacente)][6]                                                                                        | Los datos que faltan se tratan como tiempo de actividad en los cálculos del estado SLO y del presupuesto de errores.        |
| **Cálculos del tiempo de actividad**                                               |  N/A                                                                                                           |  Los cálculos del tiempo de actividad se basan en el monitor subyacente <br><br>Si hay grupos, el tiempo de actividad general requiere que *todos* los grupos tengan tiempo de actividad.| El [uptime (tiempo de actividad)][7] se calcula por períodos de tiempo discretos, no por ventanas de tiempo continuas<br><br>Si hay grupos, el tiempo de actividad general requiere que *todos* los grupos tengan tiempo de actividad. |
| **[Vista de calendario][11] en la página de gestión de SLOs**                            | Disponible                                                                                                      | No disponible                                                                                                                                                       | Disponible                                                                            |
| **API públicas[8] y asistencia Terraform**                            | Disponible                                                                                                      | Disponible                                                                                                                                                           | Disponible                                                                            |

## Prácticas recomendadas para elegir un tipo de SLO

- Siempre que sea posible, utiliza SLOs basados en métricas. La práctica recomendada consiste en contar con SLOs en los que el presupuesto de errores refleje el número de eventos incorrectos que te quedan antes de incumplir tu SLO. Tus cálculos de SLOs también se evaluarán por volumen, en función del número de eventos.
- En cambio, si quieres un SLO que realice un seguimiento del tiempo de actividad y utilice un cálculo SLI basado en el tiempo, utiliza los SLOs de fracción de tiempo. A diferencia de los SLOs basados en monitores, los SLOs de fracción de tiempo no requieren que mantengas un monitor subyacente para tu SLO.
- Por último, considera los SLOs basados en monitores para los casos de uso que no están cubiertos por los SLOs de fracción de tiempo, que incluyen SLOs basados en monitores que no tienen en cuenta las métricas o en varios monitores.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

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
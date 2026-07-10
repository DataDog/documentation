---
title: Consultar y configurar alertas sobre el uso de APM
---

Datadog ofrece diferentes planes de precios que se adaptan a tus necesidades. Para obtener más información, consulta la [página de Precios][1].
Para comprender cómo funciona la facturación de APM y el rastreo distribuido, accede a la documentación sobre APM en la página de [Facturación de APM][2].

## Página de uso

Si eres administrador, puedes ver el uso de tu cuenta en la [Página de uso][3], que se actualiza cada 24 horas.

| Dimensión          | Descripción                                                                                    |
|--------------------|------------------------------------------------------------------------------------------------|
| Hosts de APM          | Muestra el percentil 99 de todos los hosts de APM distintos durante todas las horas del mes en curso.       |
| Tareas de Fargate de la APM  | Muestra el promedio de las distintas tareas de Fargate durante períodos de 5 minutos del mes en curso.   |
| Tramos (spans) incorporados     | Muestra la suma de bytes incorporados de los tramos incorporados en el mes en curso.                      |
| Tramos indexados      | Muestra la suma de tramos indexados que se han indexado en el mes en curso.                                   |

Cada host de APM y tarea de Fargate de APM te garantiza un volumen incorporado e indexado:
- Tramos ingeridos: 150 GB de tramos ingeridos por host de APM y 10 GB de tramos ingeridos por tarea de Fargate de la APM.
- Tramos indexados: 1 millón de tramos indexados por host de APM y 65 000 tramos indexados por tarea de Fargate de la APM.

## Configurar alertas basadas en el volumen incorporado o indexado

### Define una alerta para el número de bytes incorporados

Para garantizar que el uso de los tramos incorporados no supere la cuota incluida con los hosts de APM y las tareas de Fargate de la APM, configura los monitores para recibir alertas cuando el uso mensual se acerque a la cuota que te corresponde.

1. Crea un [monitor de métricas][8].
2. Introduce `datadog.estimated_usage.apm.ingested_bytes` para la consulta de métrica.
3. Define el período de evaluación del monitor como `current month (MTD)`. De este modo, te aseguras de que el monitor está analizando el uso del último mes. Para obtener más información sobre períodos acumulativos, consulta la documentación sobre [monitores][9].
4. Define el **umbral de alerta** y un **umbral de aviso** opcional para recibir una notificación cuando el volumen incorporado alcance el 80 % o el 90 % de tu cuota.
5. Pon un nombre al monitor. Define la notificación que se enviará a tu equipo cuando los volúmenes incorporados sean demasiado altos.

{{< img src="account_management/billing/monitor_usage_apm.png" alt="Página de configuración de un monitor de métricas que muestra datadog.estimated_usage.apm.ingested_bytes como la consulta de métrica" width="80%" >}}

Para reducir de manera eficaz los volúmenes incorporados, consulta esta [guía][7] o la documentación sobre [mecanismos de incorporación][10].

### Define una alerta para los tramos indexados

Del mismo modo, puedes establecer alertas para asegurarte de que el presupuesto de tus tramos indexados no supera unos límites determinados. Crea un monitor de métricas mediante la métrica `datadog.estimated_usage.apm.indexed_spans` para recibir alertas cuando el volumen de tramos indexados del último mes supere el umbral que establezcas.

Para reducir el número de tramos indexados, comprueba la configuración de tus filtros de retención. Obtén más información sobre los filtros de retención en la documentación sobre [retención de trazas][11].

[1]: https://www.datadoghq.com/pricing
[2]: /es/account_management/billing/apm_distributed_tracing/
[3]: https://app.datadoghq.com/account/usage
[4]: https://app.datadoghq.com/monitors#create/metric
[5]: /es/monitors/types/apm/?tab=traceanalytics#monitor-creation
[6]: https://app.datadoghq.com/apm/traces?viz=timeseries
[7]: /es/tracing/guide/trace_ingestion_volume_control/
[8]: https://app.datadoghq.com/monitors/create/metric
[9]: /es/monitors/configuration/?tab=thresholdalert#cumulative-time-windows
[10]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[11]: /es/tracing/trace_pipeline/trace_retention/
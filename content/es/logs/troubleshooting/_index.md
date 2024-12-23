---
title: Solucionar problemas de logs
---

Si experimentas un comportamiento inesperado en logs de Datadog, hay algunos problemas comunes que puedes investigar y esta guía puede ayudarte a resolver los problemas rápidamente. Si sigues teniendo problemas, ponte en contacto con el [servicio de asistencia de Datadog][1] para obtener más ayuda.

## Logs faltantes - Cuota diaria de logs alcanzada

No has realizado ningún cambio en la configuración de tus logs, pero el [Explorador de logs][2] muestra que faltan logs para hoy. Esto puede deberse a que has alcanzado tu cuota diaria.

{{< img src="logs/troubleshooting/daily_quota_reached.png" alt="Gráfico de barras que muestra los logs faltantes y un mensaje que avisa que se ha alcanzado la cuota diaria" style="width:90%" >}}

Para obtener más información sobre cómo configurar, actualizar o eliminar la cuota, consulta [Establecer cuota diaria][3].

## Logs faltantes - Marca de tiempo fuera de la ventana de consumo

Los logs con una marca de tiempo de más de 18 horas en el pasado se descartan en la entrada.
Soluciona el problema en el origen comprobando qué `service` y `source` se ven afectados por la métrica `datadog.estimated_usage.logs.drop_count`.

## No se puede analizar la clave de marca de tiempo de logs JSON

Si no puedes convertir la marca de tiempo de logs JSON a un [formato de fecha reconocido][4] antes de que se consuman en Datadog, sigue estos pasos para convertir y asignar las marcas de tiempo utilizando el [procesador aritmético][5] y el [reasignador de fechas de logs][6] de Datadog:

1. Ve a la página [Pipelines][7].

2. En **Pipelines**, sitúate sobre **Preprocessing for JSON logs* (Preprocesamiento de logs JSON) y haz clic en el icono del lápiz.

3. Elimina `timestamp` de la lista de asignación de atributos reservados. El atributo no está siendo analizado como marca de tiempo oficial del log durante el preprocesamiento.

{{< img src="logs/troubleshooting/preprocessing_json_timestamp.png" alt="Cuadro de configuración del preprocesamiento de logs JSON con los atributos, que incluyen la marca de tiempo por defecto" style="width:90%" >}}

2. Configura el [procesador aritmético][5] para que la fórmula multiplique tu marca de tiempo por 1000 para convertirla en milisegundos. El resultado de la fórmula es un nuevo atributo.

3. Configura el [reasignador de fechas de logs][6] para que utilice el nuevo atributo como marca de tiempo oficial.

Ve al [Explorador de logs][2] para ver los nuevos logs JSON con sus marcas de tiempo asignadas.

## Logs truncados

Los logs de más de 1 MB se truncan.
Soluciona el problema en el origen comprobando qué `service` y `source` se ven afectados por las métricas `datadog.estimated_usage.logs.truncated_count` y `datadog.estimated_usage.logs.truncated_bytes`.

[1]: /es/help/
[2]: https://app.datadoghq.com/logs
[3]: /es/logs/log_configuration/indexes/#set-daily-quota
[4]: /es/logs/log_configuration/pipelines/?tab=date#date-attribute
[5]: /es/logs/log_configuration/processors/?tab=ui#arithmetic-processor
[6]: /es/logs/log_configuration/processors/?tab=ui#log-date-remapper
[7]: https://app.datadoghq.com/logs/pipelines
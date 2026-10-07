---
title: Solucionar problemas de logs
---

Si experimentas un comportamiento inesperado en logs de Datadog, hay algunos problemas comunes que puedes investigar y esta guía puede ayudarte a resolver los problemas rápidamente. Si sigues teniendo problemas, ponte en contacto con el [servicio de asistencia de Datadog][1] para obtener más ayuda.

## Logs faltantes - Restricciones de acceso a los datos

No puedes ver ningún log en el [Explorador de logs][2] o [Live Tail][3]. Esto puede ocurrir si tu rol forma parte de una consulta de restricción.

Para obtener más información sobre la configuración de los controles de acceso a datos RBAC a logs, consulta [Consultas de restricciones de checks][4].

## Logs faltantes - Cuota diaria de logs alcanzada

No has realizado ningún cambio en tu configuración de log, pero el [Log Explorer][2] muestra que faltan logs para hoy. Esto puede deberse a que has alcanzado tu cuota diaria.

{{< img src="logs/troubleshooting/daily_quota_reached.png" alt="Gráfico de barras que muestra los logs faltantes y un mensaje que avisa que se ha alcanzado la cuota diaria" style="width:90%" >}}

Para obtener más información sobre cómo configurar, actualizar o eliminar la cuota, consulta [Establecer cuota diaria][5].

## Logs faltantes: marca temporal fuera de la ventana de consumo

Los logs con una marca temporal de más de 18 horas en el pasado se descartan en la entrada.
Soluciona el problema en el origen comprobando qué `service` y `source` se ven afectados por la métrica `datadog.estimated_usage.logs.drop_count`.

## No se puede analizar la clave de marca temporal de logs JSON

Si no puedes convertir la marca temporal de logs JSON a un [formato de fecha reconocido][6] antes de que se ingieran en Datadog, sigue estos pasos para convertir y asignar las marcas de tiempo utilizando el [procesador aritmético][5] y el [reasignador de fechas de logs][6] de Datadog:

1. Ve a la página [Pipelines][9].

2. En **Pipelines**, sitúate sobre **Preprocessing for JSON logs* (Preprocesamiento de logs JSON) y haz clic en el icono del lápiz.

3. Elimina `timestamp` de la lista de asignación de atributos reservados. El atributo no está siendo analizado como marca temporal oficial del log durante el preprocesamiento.

{{< img src="logs/troubleshooting/preprocessing_json_timestamp.png" alt="Cuadro de configuración del preprocesamiento de logs JSON con los atributos, que incluyen la marca temporal por defecto" style="width:90%" >}}

2. Configura el [procesador aritmético][7] para que la fórmula multiplique tu marca temporal por 1000 para convertirla en milisegundos. El resultado de la fórmula es un nuevo atributo.

3. Configura el [reasignador de fechas de logs][8] para que utilice el nuevo atributo como marca de tiempo oficial.

Ve a [Log Explorer][2] para ver los nuevos logs JSON con su marca temporal asignada.

## Logs truncados

Los logs de más de 1 MB se truncan. Soluciona el problema en origen comprobando qué `service` y `source` se ven afectados con las métricas `datadog.estimated_usage.logs.truncated_count` y `datadog.estimated_usage.logs.truncated_bytes`.

## Mensajes de logs truncados

Existe un truncamiento adicional en los campos que sólo se aplica a logs indexados: el valor se trunca a 75 KiB para el campo de mensaje y a 25 KiB para los campos que no son de mensaje. Datadog almacena el texto completo y sigue siendo visible en las consultas normales de lista en el Explorador de logs. Sin embargo, la versión truncada se muestra al realizar una consulta agrupada, como cuando se agrupan logs por ese campo truncado o se realizan operaciones similares que muestran ese campo específico.

[1]: /es/help/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/logs/livetail
[4]: /es/logs/guide/logs-rbac-permissions/?tab=ui#check-restriction-queries
[5]: /es/logs/log_configuration/indexes/#set-daily-quota
[6]: /es/logs/log_configuration/pipelines/?tab=date#date-attribute
[7]: /es/logs/log_configuration/processors/?tab=ui#arithmetic-processor
[8]: /es/logs/log_configuration/processors/?tab=ui#log-date-remapper
[9]: https://app.datadoghq.com/logs/pipelines
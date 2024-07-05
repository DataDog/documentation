---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: /logs/faq/log-parsing-best-practice
  tag: Documentación
  text: Prácticas recomendadas para el análisis de logs
kind: Guía
title: Monitorizar y consultar logs sin analizar
---

## Información general
El análisis de logs es fundamental para poder utilizar Datadog Log Management en toda su capacidad en consultas, monitores, agregaciones o enriquecimientos automáticos, como el analizador de datos sensibles.
Al aumentar el volumen de logs, puede resultar difícil identificar y corregir los patrones de logs que no son analizados por los pipelines.

Para identificar y controlar el volumen de logs sin analizar en tu organización necesitas:

1. [Detectar los logs sin analizar](#detect-unparsed-logs)
2. [Consultar si existen logs sin analizar](#query-for-unparsed-logs)
3. [Crear una métrica para realizar un seguimiento de los logs sin analizar](#create-a-metric-to-track-for-unparsed-logs)
4. [Monitorizar el volumen de logs sin analizar](#monitor-the-volume-of-unparsed-logs)


## Detectar los logs sin analizar
Para determinar si un log específico ha sido analizado por tus pipelines, ábrelo y observa el panel Event Attributes (Atributos de eventos). Si el log no ha sido analizado, en lugar de mostrar los atributos extraídos de tu log, el panel mostrará un mensaje indicando que no se han extraído atributos:

{{< img src="logs/guide/unparsed-logs/unparsed-log.jpg" alt="Detalles de logs sin analizar" style="width:90%;">}}


Puedes comenzar analizando los logs sin analizar mediante la creación de [pipelines personalizados][1] o el uso de una [integración de logs][2] como origen del log, para aprovechar la configuración automática de pipelines.

## Consultar si existen logs sin analizar
Si tienes muchos logs, lo que hace que sea inviable verificarlos individualmente, puedes consultar si existen logs sin analizar utilizando el filtro `datadog.pipelines:false` en el [Explorador de logs][3]:

{{< img src="logs/guide/unparsed-logs/datadog-pipeline-false-log-explorer.jpg" alt="Consultar si existen logs sin analizar" style="width:90%;">}}

Este filtro devuelve todos los logs indexados sin atributos personalizados después del procesamiento del pipeline.
La [agregación de patrones][4] muestra una vista agregada de los patrones comunes en logs sin analizar, lo que puede ayudarte a crear pipelines personalizados.

## Crear una métrica para realizar un seguimiento de los logs sin analizar
La consulta de logs sin analizar te permite seleccionar logs indexados sin analizar. También es una buena práctica asegurarse de que se analicen incluso los logs que no indexas, para que el contenido de tus [archivos][5] esté estructurado.

Para logs sin analizar, crea una [métrica personalizada][6] utilizando la consulta `datadog.pipelines:false`:

{{< img src="logs/guide/unparsed-logs/logs-unparsed-metric.jpg" alt="Generar una métrica para logs no analizados" style="width:90%;">}}

Como para cualquier métrica basada en logs, puedes añadir dimensiones en el campo `group by`. El ejemplo anterior muestra la agrupación por `service` y `team`. Para definir la propiedad de un log, debes agrupar por las dimensiones que estás utilizando.
## Monitorizar el volumen de logs sin analizar
Para garantizar que en tu organización existe un control del análisis de logs, aplica una cuota para el volumen logs sin analizar. Este enfoque se aproxima a lo que proponen las [cuotas diarias][7] para índices.

Para monitorizar el volumen de logs sin analizar:
1. Crea un [monitor de métricas][8].
2. Utiliza la métrica `logs.unparsed` creada anteriormente.
3. Define la cuota por `team`.
4. Asegúrate de que las [condiciones de alerta][9] corresponden a los casos de los que quieres recibir alertas.

{{< img src="logs/guide/unparsed-logs/monitor-unparsed-logs-team.jpg" alt="Consultar logs sin analizar" style="width:90%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/logs/log_configuration/pipelines
[2]: /es/integrations/#cat-log-collection
[3]: /es/logs/explorer/
[4]: /es/logs/explorer/#patterns
[5]: /es/logs/archives/?tab=awss3
[6]: /es/logs/logs_to_metrics/
[7]: /es/logs/indexes#set-daily-quota
[8]: /es/monitors/types/metric/?tab=threshold#overview
[9]: /es/monitors/types/metric/?tab=threshold#set-alert-conditions
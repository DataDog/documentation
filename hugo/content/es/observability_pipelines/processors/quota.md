---
description: Aprenda a usar el procesador de cuotas para medir el tráfico de registros
  y conservar, descartar o enrutar registros después de alcanzar su cuota diaria.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador de cuotas
---
{{< product-availability >}}

## Descripción general {#overview}

El procesador de cuotas mide el tráfico de registros para los registros que coinciden con el filtro que usted especifica. Utiliza una ventana fija de 24 horas que se restablece a la medianoche UTC. Cuando se alcanza la cuota diaria configurada dentro de la ventana, el procesador puede conservar o descartar registros adicionales, o enviarlos a un depósito de almacenamiento. Por ejemplo, puede configurar este procesador para descartar nuevos registros o activar una alerta sin descartar registros después de que el procesador haya recibido 10 millones de eventos de un determinado servicio en las últimas 24 horas.

También puede usar la partición basada en campos, como `service`, `env`, `status`. Cada campo único utiliza un depósito de cuota separado con su propio límite de cuota diaria. Consulte [Ejemplo de partición](#partition-example) para obtener más información.

**Nota**: La canalización utiliza el nombre de la cuota para identificar la misma cuota en múltiples implementaciones de Remote Configuration del Worker.

### Límites {#limits}

- Cada canalización puede tener hasta 1000 depósitos. Si necesita aumentar el límite de depósitos, [contacte a soporte][5].
- El procesador de cuotas está sincronizado en todos los Workers de una organización de Datadog. Para la sincronización, existe un límite de tasa predeterminado de 100 Workers por organización (300 para versiones de worker 2.16+). Cuando hay más de este límite de Workers para una organización:
    - El procesador continúa ejecutándose, pero no se sincroniza correctamente con los otros Workers, lo que puede resultar en el envío de registros después de que se haya alcanzado el límite de cuota.
    - El Worker imprime errores `Failed to sync quota state`.
    - [Contacte a soporte][5] si desea aumentar el número predeterminado de Workers por organización.
- El procesador de cuotas sincroniza periódicamente los conteos entre los Workers unas pocas veces por minuto. Por lo tanto, el límite establecido en el procesador puede superarse, dependiendo del número de Workers y del rendimiento de los registros. Datadog recomienda establecer un límite que sea al menos un orden de magnitud superior al volumen de registros que se espera que reciba el procesador por minuto. Puede utilizar un procesador de limitación (throttle) con el procesador de cuota para controlar estas breves ráfagas limitando el número de registros permitidos por minuto.

## Configuración {#setup}

Para configurar el procesador de cuota:
1. Ingrese un nombre para el procesador de cuota.
1. Defina un {{< ui >}}filter query{{< /ui >}}. Solo los registros que coinciden con la consulta de filtro especificada se cuentan para el límite diario. Consulte [Sintaxis de búsqueda][6] para obtener más información.
    - Los registros que coinciden con el filtro de cuota y están dentro de la cuota diaria se envían al siguiente paso en la canalización.
    - Los registros que no coinciden con el filtro de cuota se envían al siguiente paso en la canalización.
1. En el menú desplegable {{< ui >}}Unit for quota{{< /ui >}}, seleccione si desea medir la cuota por el número de `Events` o por el `Volume` en bytes.
1. Establezca el límite de cuota diaria y seleccione la unidad de magnitud para la cuota deseada.
1. Opcional: Haga clic en {{< ui >}}Add Field{{< /ui >}} si desea establecer una cuota en un campo de servicio o región específico.
   1. Ingrese el nombre del campo por el que desea realizar la partición. Consulte el [ejemplo de partición](#partition-example) para obtener más información.
      1. Seleccione {{< ui >}}Ignore when missing{{< /ui >}} si desea que la cuota se aplique solo a los eventos que coinciden con la partición. Consulte el [ejemplo de ignorar cuando falta](#example-for-the-ignore-when-missing-option) para obtener más información.
      1. Opcional: Haga clic en {{< ui >}}Overrides{{< /ui >}} si desea establecer cuotas diferentes para el campo particionado.
         - Haga clic en {{< ui >}}Download as CSV{{< /ui >}} para ver un ejemplo de cómo estructurar el CSV.
         - Arrastre y suelte su CSV de anulaciones para cargarlo. También puede hacer clic en {{< ui >}}Browse{{< /ui >}} para seleccionar el archivo y cargarlo. Consulte el [ejemplo de anulaciones](#overrides-example) para obtener más información.
   1. Haga clic en {{< ui >}}Add Field{{< /ui >}} si desea agregar otra partición.
1. En el menú desplegable {{< ui >}}When quota is met{{< /ui >}}, seleccione si desea {{< ui >}}drop events{{< /ui >}}, {{< ui >}}keep events{{< /ui >}} o {{< ui >}}send events to overflow destination{{< /ui >}} cuando se haya alcanzado la cuota.
   1. Si selecciona {{< ui >}}send events to overflow destination{{< /ui >}}, se agrega un destino de desbordamiento con las siguientes opciones de almacenamiento en la nube: **Amazon S3**, **Azure Blob** y **Google Cloud**.
   1. Seleccione el almacenamiento en la nube al que desea enviar los registros de desbordamiento. Consulte las instrucciones de configuración para su almacenamiento en la nube: [Amazon S3][2], [Azure Blob Storage][3] o [Google Cloud Storage][4].

### Ejemplos {#examples}

#### Ejemplo de partición {#partition-example}

Use {{< ui >}}Partition by{{< /ui >}} si desea establecer una cuota en un servicio o región específicos. Por ejemplo, si desea establecer una cuota de 10 eventos por día y agrupar los eventos por el campo `service`, ingrese `service` en el campo {{< ui >}}Partition by{{< /ui >}}.

#### Ejemplo para la opción "ignorar cuando falte" {#example-for-the-ignore-when-missing-option}

Seleccione {{< ui >}}Ignore when missing{{< /ui >}} si desea que la cuota se aplique solo a los eventos que coincidan con la partición. Por ejemplo, si el Worker recibe el siguiente conjunto de eventos:

```
{"service":"a", "source":"foo", "message": "..."}
{"service":"b", "source":"bar", "message": "..."}
{"service":"b", "message": "..."}
{"source":"redis", "message": "..."}
{"message": "..."}
```

Y se selecciona {{< ui >}}Ignore when missing{{< /ui >}}, entonces el Worker:
- crea un conjunto para los registros con `service:a` y `source:foo`
- crea un conjunto para los registros con `service:b` y `source:bar`
- ignora los últimos tres eventos

La cuota se aplica a los dos conjuntos de registros y no a los últimos tres eventos.

Si no se selecciona {{< ui >}}Ignore when missing{{< /ui >}}, la cuota se aplica a los cinco eventos.

#### Ejemplo de anulaciones {#overrides-example}

Si realiza la partición por `service` y tiene dos servicios: `a` y `b`, puede usar anulaciones para aplicarles diferentes cuotas. Por ejemplo, si desea que `service:a` tenga un límite de cuota de 5,000 bytes y `service:b` tenga un límite de 50 eventos, las reglas de anulación se ven así:

| Servicio | Tipo   | Límite |
| ------- | ------ | ----- |
|  `a`    | Bytes  | 5,000 |
|  `b`    | Eventos | 50    |

## Métricas de estado {#health-metrics}

Para [métricas de componentes][7] y [métricas de búfer del procesador][8] emitidas por todos los procesadores, consulte la documentación de [métricas de uso de Pipelines][9].

### Métricas de cuota {#quota-metrics}

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- La etiqueta `component_type` es `quota` para estas métricas.

`pipelines.quota_reached_events_total`
: **Descripción**: La cantidad de eventos descartados porque se recibieron después de alcanzar el límite de cuota configurado.
: **Tipo de métrica**: conteo

`pipelines.quota_reached_event_bytes_total`
: **Descripción**: El tamaño, en bytes, de los eventos descartados porque se recibieron después de alcanzar el límite de cuota configurado.
: **Tipo de métrica**: conteo

`pipelines.quota_overflow_destination_sent_events_total`
: **Descripción**: La cantidad de eventos enrutados a un destino de desbordamiento secundario cuando se alcanzó un límite de cuota.
: **Tipo de métrica**: count

`pipelines.quota_fill`
: **Descripción**: El nivel de llenado actual de un depósito de cuota de limitación de tasa; el valor varía de `0` a `100`.
: **Tipo de métrica**: gauge

`pipelines.quotas_usage`
: **Descripción**: Nivel de llenado agregado en todos los depósitos de cuota; el valor varía de `0` a `100`.
: **Tipo de métrica**: gauge

`pipelines.quota_limit_events`
: **Descripción**: El rendimiento máximo de eventos configurado por intervalo para una regla de cuota.
: **Tipo de métrica**: gauge

`pipelines.quota_limit_bytes`
: **Descripción**: El rendimiento máximo de bytes configurado por intervalo para una regla de cuota.
: **Tipo de métrica**: gauge

`pipelines.quotas_count`
: **Descripción**: El número de depósitos de cuota de limitación de tasa activos que se están rastreando actualmente.
: **Tipo de métrica**: gauge

[1]: /es/monitors/types/metric/?tab=threshold
[2]: /es/observability_pipelines/destinations/datadog_archives/
[3]: /es/observability_pipelines/destinations/azure_storage/
[4]: /es/observability_pipelines/destinations/google_cloud_storage/
[5]: /es/help/
[6]: /es/observability_pipelines/search_syntax/logs/
[7]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[9]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
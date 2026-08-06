---
aliases:
- /es/observability_pipelines/guide/set_quotas_for_data_sent_to_a_destination/
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/setup/
  tag: Documentación
  text: Configurar Observability Pipelines
- link: /observability_pipelines/legacy/working_with_data/
  tag: Documentación
  text: Trabajar con datos en Observability Pipelines
- link: /monitors/configuration/
  tag: Documentación
  text: Más información sobre la configuración de monitores
is_beta: true
private: true
title: (LEGACY) Establecer cuotas para los datos enviados a un destino
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfnNnV823zAgOCowCYuXJE5cDtRqIipKsYcNpaOo1LKpGfppA/viewform" btn_hidden="false" header="Request Access!">}}
La transformación de <code>cuotas</code> está en fase beta privada.
{{< /callout >}}

## Información general

Utiliza la transformación de `quota` de Observability Pipelines para limitar el volumen de datos o el número de eventos enviados a un destino durante un periodo de tiempo determinado. Esto puede protegerte contra los aumentos inesperados de los datos, que podrían repercutir en tus costes operativos. Con la transformación, puedes configurar diferentes formas de gestionar los datos cuando se haya alcanzado la cuota. Por ejemplo, puedes:

- Definir un límite suave configurando un monitor para generar alertas cuando se haya alcanzado la cuota.
- Redirigir los datos enviados después del límite de cuota a otro destino, como un almacenamiento en frío.
- Muestrear los datos enviados después del límite de cuota, para que se envíen menos datos al destino.
- Descartar los datos enviados después del límite de cuota.

También puedes utilizar varias transformaciones de `quota` para definir diferentes límites de advertencia y alerta. Por ejemplo, utiliza la primera transformación de `quota` para definir un límite en un nivel de advertencia y enviar una notificación de advertencia cuando se alcance el límite. Luego, utiliza una segunda transformación de `quota` para definir un límite duro. Cuando se alcance el límite duro, puedes enviar una notificación de alerta y empezar a muestrear los datos enviados después del límite o redirigirlos a otro destino.

Esta guía te explica cómo:

- [Configurar la transformación de cuotas](#set-up-the-quota-transform)
- [Configurar un monitor para generar alertas cuando se alcance la cuota](#set-up-a-metric-monitor)
- [Dirigir los logs enviados después del límite a `datadog_archives`](#route-logs-sent-after-the-limit-to-datadog_archives)

## Configurar la transformación de cuotas

1. Ve a [Observability Pipelines][1].
1. Haz clic en tu pipeline.
1. Haz clic en **Edit draft** (Editar borrador).
1. Haz clic en **+ Add Component** (+ Añadir componente).
1. Haz clic en la pestaña **Transformaciones**.
1. Haz clic en el cuadro **Cuota**.
1. Introduce un nombre para el componente.
1. Selecciona una o varias entradas para la transformación.
1. En la sección **Límites**:
    a. Selecciona el tipo de unidad. La unidad del límite de cuota puede ser el número de eventos o el volumen de datos.
    b. Introduce el límite en el campo **Máx**.
1. Introduce el periodo de tiempo en el campo **Ventana**.
    Por ejemplo, para configurar la transformación para enviar hasta 2GB de logs por día al destino, configura:
    - **Bytes** como tipo de unidad
    - `2000000000`en el campo **Máx**
    - `24h` en el campo **Ventana**

1. Haz clic en **Guardar**.
1. Para cada destino o transformación que ingiera logs desde la transformación de `quota`, haz clic en cuadro del componente y añade `<transform_name>.dropped` para el ID de entrada de los datos enviados una vez alcanzado el límite.

### Tratamiento de los datos enviados después del límite

El siguiente ejemplo muestra una configuración con la transformación de `quota`. En la configuración, los datos enviados después del límite de cuota van al destino `print_dropped`, donde se imprimen en la consola y se descartan. También puedes [muestrear][2] estos datos o redirigirlos a otro [destino][3], en lugar de descartarlos.

```yaml
sources:
 generate_syslog:
   type: demo_logs
   format: syslog
   interval: 1
transforms:
 parse_syslog:
   type: remap
   inputs:
     - generate_syslog
   source: |
     # Parse the message as syslog
     . = parse_syslog!(.message)
     .environment = "demo"
     .application = "opw"
 quota_example:
   type:
     quota
   inputs:
     - parse_syslog
   limit:
     type: bytes
     bytes:
       max: 20000
   window:
     1h
sinks:
 print_syslog:
   type: console
   inputs:
     - quota_1
   encoding:
     codec: json
  print_dropped:
    type: console
    inputs:
      - quota_example.dropped
    encoding:
      codec: json

```

Para obtener más información sobre las fuentes, las transformaciones y los sumideros del ejemplo, consulta [Configuraciones][4].

## Configurar un monitor para generar alertas cuando se alcanza la cuota

### Métricas de cuota

Puedes utilizar las siguientes métricas de transformación de `quota` para configurar monitores:

- `quota_limit_events` (gauge [indicador])
- `quota_limit_bytes` (gauge [indicador])
- `component_errors_total` (counter [contador])

Para el [ejemplo de configuración](#handling-data-sent-after-the-limit) anterior, utiliza la siguiente combinación de métricas y etiquetas (tags) para buscar todos los eventos enviados y descartados después del límite.

- Métrica: `vector.component_sent_event_bytes_total`
    - Etiquetas: `component_id:quota_example` y `output:dropped`

Si la configuración especifica el tipo de `event`, utiliza la siguiente combinación de métricas y etiquetas para mostrar todos los eventos enviados después del límite.

- Métrica: `vector.component_sent_events_total`
    - Etiquetas: `component_id:quota_example` y `output:dropped`

### Configurar un monitor de métricas

Para configurar un monitor que genere alertas cuando se alcanza la cuota:

1. Ve a la página [Nuevo monitor][5].
1. Selecciona **Métrica**.
1. Deja el método de detección como **Alerta de umbral**.
1. En el campo **Definir la métrica**:  
    a. Introduce `vector.component_sent_event_bytes_total` para la métrica.
    b. En el campo **desde**, añade `component_id:<transform_name>,output:dropped`, donde `<transform_name>` es el nombre de tu transformación de `quota`.
    c. En el campo **sumar por**, introduce `host`.
    d. Sal de la configuración para evaluar la `sum` de la consulta sobre los `last 5 minutes`.
1. En la sección **Definir condiciones de alerta**:
    a. Deja que el ajuste se active cuando el valor evaluado se encuentre `above` del umbral para cualquier `host`.
    b. Introduce `1` para el **Umbral de alerta**. Esto significa que si la consulta de la métrica es mayor que 1, el monitor generará una alerta.
Para obtener más información, consulta [Monitores de métricas][6].
1. En la sección **Configurar notificaciones y automatizaciones**:
    a. Introduce un nombre para tu monitor.
    b. Introduce un mensaje de notificación. Para obtener más información sobre cómo personalizar tu mensaje, consulta [Notificaciones][7] y [Variables][8].
    c. Selecciona a quién y a qué servicios se envían los notificaciones.
1. También puedes configurar [reenvíos de notificaciones][9], etiquetas, equipos y una [prioridad][10] para tu monitor. 
1. En la sección **Definir permisos y notificaciones de auditoría**, puedes definir [permisos][11] y notificaciones de auditoría.
1. Haz clic en **Crear**.

## Dirigir los logs enviados después del límite a `datadog_archives`

El destino `datadog_archives` de Observability Pipelines formatea los logs en un formato rehidratable en Datadog y luego los envía a [Archivos de logs][12]. Para configurar `datadog_archives`, consulta [Enrutar logs en un formato rehidratable en Datadog a Amazon S3][13].

El siguiente ejemplo de configuración es similar al [ejemplo de configuración](#handling-data-sent-after-the-limit) anterior, excepto que el tipo de destino es `datadog_archives`. Todos los logs enviados a Observability Pipelines una vez alcanzada la cuota se dirigen a los archivos.

```yaml
sources:
 generate_syslog:
   type: demo_logs
   format: syslog
   interval: 1
transforms:
 parse_syslog:
   type: remap
   inputs:
     - generate_syslog
   source: |
     # Parse the message as syslog
     . = parse_syslog!(.message)
     .environment = "demo"
     .application = "opw"
 quota_archiving_example:
   type:
     quota
   inputs:
     - parse_syslog
   limit:
     type: bytes
     bytes:
       max: 200000
   window:
     1m
sinks:
 archive_dropped:
   type: datadog_archives
   inputs:
     - quota_archiving_example.dropped
    bucket: "<DD_ARCHIVES_BUCKET>"
    service: "<STORAGE_SERVICE>"
```

## Para leer más
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/legacy/reference/transforms/#sample
[3]: /es/observability_pipelines/legacy/reference/sinks/
[4]: /es/observability_pipelines/legacy/configurations/
[5]: https://app.datadoghq.com/monitors/create
[6]: /es/monitors/types/metric/
[7]: /es/monitors/notify/
[8]: /es/monitors/notify/variables/
[9]: /es/monitors/notify/#renotify
[10]: /es/monitors/notify/#metadata
[11]: /es/monitors/configuration/#permissions
[12]: /es/logs/log_configuration/archives/
[13]: /es/observability_pipelines/legacy/guide/route_logs_in_datadog_rehydratable_format_to_amazon_s3/
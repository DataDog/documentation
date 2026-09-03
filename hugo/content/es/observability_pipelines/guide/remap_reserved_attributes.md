---
description: Aprenda a reasignar el valor de los atributos de registro reservados,
  como servidor, fuente y servicio, con el procesador Edit Fields o Custom Processor
  en Observability Pipelines.
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/edit_fields/
  tag: Documentación
  text: Obtenga más información sobre el procesador Edit Fields
- link: /observability_pipelines/processors/custom_processor/
  tag: Documentación
  text: Obtenga más información sobre el procesador Custom Processor
title: Reasignar atributos reservados
---
## Descripción general {#overview}

Los procesadores de Observability Pipelines le permiten agregar, editar y eliminar campos de registro. La reasignación de atributos o la reescritura de valores garantiza que sus registros se procesen y estandaricen correctamente. Para la mayoría de los casos de uso de procesamiento, utilice el procesador Edit Fields para agregar, reasignar o eliminar campos de sus registros. Para casos de uso avanzados, utilice el Custom Processor para modificar campos condicionalmente o reescribir el valor de un campo.

En Datadog, los [atributos reservados][1] son campos de registro que se reservan para un procesamiento específico en la plataforma. Los atributos reservados incluyen ` host`, `source`, `status`, `service`, `trace_id` y `message`. Los atributos reservados se aplican al enrutar registros a los siguientes destinos de Observability Pipelines:

- Datadog Logs
- Amazon S3 (para archivos de registro)
- Azure Blob Storage (para archivos de registro)
- Google Cloud Storage (para archivos de registro)

Existen restricciones en Observability Pipelines sobre cómo puede modificar los atributos reservados. Por ejemplo, los atributos reservados no se pueden renombrar usando el procesador Rename Field, sino que deben reasignarse. Esta guía lo lleva a través de los pasos para reasignar el valor de los atributos reservados.

Si su configuración específica utiliza una fuente Splunk HEC y un destino Datadog, consulte [Reasignar atributos de fuente y servicio al usar la fuente Splunk HEC y el destino Datadog](#remap-source-and-service-attributes-when-using-the-splunk-hec-source-and-datadog-destination).

## Reasignar el valor de los atributos reservados {#remap-the-value-of-reserved-attributes}

Para cambiar o anular el valor de un campo de atributo reservado existente, Datadog recomienda dos enfoques utilizando Observability Pipelines. El primero utiliza el procesador Edit Fields y el segundo utiliza el Custom Processor.

### Utilice un procesador Edit Fields para asignaciones de campos básicas {#use-an-edit-fields-processor-for-basic-field-assignments}

1. Utilice un procesador {{< ui >}}Remove field{{< /ui >}} para eliminar el atributo reservado del registro.
2. Utilice un procesador {{< ui >}}Add field{{< /ui >}} para volver a agregar el atributo reservado al registro con el nombre de campo y la asignación de valor correctos.

**Nota**: En cuanto al orden de los procesadores, el procesador {{< ui >}}Add Field{{< /ui >}} debe ir inmediatamente después del procesador {{< ui >}}Remove Field{{< /ui >}} para garantizar un remapeo de campos correcto.

#### Ejemplo {#example}
La imagen del procesador {{< ui >}}Remove field{{< /ui >}} a continuación elimina el campo `service` con nombre incorrecto del registro.

{{< img src="observability_pipelines/guide/remap_attributes/remove_field_remap.png" alt="Un procesador de eliminación de campos que descarta la etiqueta de servicio y un procesador de adición de campos que agrega el campo servicio con el valor payment-app" style="width:50%;" >}}

La imagen del procesador {{< ui >}}Add field{{< /ui >}} a continuación vuelve a agregar el campo `service` con el valor correcto.

{{< img src="observability_pipelines/guide/remap_attributes/add_field_remap.png" alt="Un procesador de eliminación de campos que descarta la etiqueta de servicio y un procesador de adición de campos que agrega el campo servicio con el valor payment-app." style="width:50%;" >}}

### Utilice el Custom Processor para asignaciones dinámicas o manuales {#use-the-custom-processor-for-dynamic-or-manual-assignments}

Utilice el {{< ui >}}Custom Processor{{< /ui >}} para reescribir el valor del atributo reservado.

#### Asigne dinámicamente el valor utilizando la sintaxis de plantilla para hacer referencia al valor de otro campo. {#dynamically-assign-the-value-using-template-syntax-to-reference-another-fields-value}

El siguiente script del Custom Processor reescribe el campo `service` y asigna dinámicamente el valor de `app_id` al valor del campo `service`.

```
.service = {{.app_id}}
```

En la imagen de ejemplo a continuación, la entrada muestra `service` con el valor `wrongstatus`. Después de procesar el registro con el script, la salida muestra `service` con el valor de `streaming-service`, que es el valor de `app_id`.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_dynamically_assign.png" alt="Un Custom Processor que muestra una entrada con el valor de estado incorrecto y la salida que muestra el estado correcto." style="width:100%;" >}}

#### Reescriba manualmente el valor de un atributo con un nombre estático {#manually-rewrite-the-value-of-an-attribute-with-a-static-name}

El siguiente script del Custom Processor establece el campo `status` en el valor estático `info`.

```
.status = "info"
```

En la imagen de ejemplo a continuación, la entrada muestra `status` con el valor `wrongstatus`. Después de procesar el registro con el script, la salida muestra `status` con `info` como asignado.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_statically_assign.png" alt="Un Custom Processor que muestra una entrada con el valor de estado incorrecto y la salida que muestra el estado correcto." style="width:100%;" >}}

## Reasigne los atributos de fuente y servicio al usar la fuente Splunk HEC y el destino Datadog {#remap-source-and-service-attributes-when-using-the-splunk-hec-source-and-datadog-destination}

Siga las instrucciones en esta sección para reasignar los valores `source` y/o `service` si está usando una fuente Splunk HEC y un destino Datadog. Debe seguir estas instrucciones para reasignar esos atributos porque:

 - Lo que Splunk llama `service` es lo que Datadog llama el atributo `source`.
 - Lo que Splunk llama `sourcetype` es lo que Datadog llama el atributo `ddsource`.

**Nota**: Si desea reasignar otros atributos reservados, como `env` y `hostname`, siga las instrucciones de [Reasignar el valor de atributos reservados](#remap-the-value-of-reserved-attributes).

Puede usar el [Custom Processor](#remap-service-and-source-attributes-using-the-custom-processor) o [Edit Fields](#remap-service-and-source-attributes-using-edit-fields) para:

1. Reasigne el campo `service` del registro de entrada al nombre de campo `source`.
1. Reasigne el campo `source` del registro de entrada al nombre de campo `ddsource`.

### Reasigne los atributos de servicio y fuente usando el Custom Processor {#remap-service-and-source-attributes-using-the-custom-processor}

Este es un ejemplo de registro de entrada de la fuente Splunk HEC:

```json
{
  "service": "wrongService"
  "source": "wrongSource"
}
```

Suponga que estos son los valores correctos que desea para el registro enviado a Datadog:

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}

Use this Custom Processor script to remap the `service` and `source` to the correct values:

```json
  .source = "cdn-logs"
  .ddsource = "akamai"
  del(.service)
```

Después de procesar el registro con el script, la salida muestra:

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}
```

En la imagen de ejemplo a continuación, la entrada muestra `source` y `service` con el valor `wrongstatus`. Después de procesar el registro con el script, se muestran los valores correctos.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_splunkhec_dd.png" alt="Un Custom Processor que muestra una entrada con el valor de estado incorrecto y la salida que muestra el estado correcto." style="width:100%;" >}}

### Reasigne los atributos de servicio y fuente usando Edit Fields {#remap-service-and-source-attributes-using-edit-fields}

Este es un ejemplo de registro de entrada de la fuente Splunk HEC:

```json
{
  "service": "wrongService"
  "source": "wrongSource"
}
```

Suponga que estos son los valores correctos que desea para el registro enviado a Datadog:

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}
```

Haga lo siguiente para reasignar los atributos `source` y `service` a los valores correctos:

1. Use un procesador {{< ui >}}Remove field{{< /ui >}} para descartar el campo `source`.
    - Ingrese `source` en el campo {{< ui >}}Field to drop{{< /ui >}}.
    {{< img src="observability_pipelines/guide/remap_attributes/remove_field_source.png" alt="Un procesador de eliminación de campo que elimina el campo fuente" style="width:50%;" >}}
1. Utilice un procesador {{< ui >}}Add field{{< /ui >}} para agregar el campo `ddsource` con el valor `akamai`.
    - Ingrese `ddsource` en el campo {{< ui >}}Field to add{{< /ui >}}.
    - Ingrese `akamai` en el campo {{< ui >}}Value to add{{< /ui >}}.
    {{< img src="observability_pipelines/guide/remap_attributes/add_field_ddsource.png" alt="Un procesador de adición de campo que agrega el campo ddsource" style="width:50%;" >}}
1. Utilice un procesador {{< ui >}}Remove field{{< /ui >}} para eliminar el campo `service`.
    - Ingrese `service` en el campo {{< ui >}}Field to drop{{< /ui >}}.
    {{< img src="observability_pipelines/guide/remap_attributes/remove_field_service.png" alt="Un procesador de eliminación de campo que elimina el campo servicio" style="width:50%;" >}}
1. Utilice un procesador {{< ui >}}Add field{{< /ui >}} para agregar el campo `source` con el valor `cdn-logs`.
    - Ingrese `source` en el campo {{< ui >}}Field to add{{< /ui >}}.
    - Ingrese `cdn-logs` en el campo {{< ui >}}Value to add{{< /ui >}}.
    {{< img src="observability_pipelines/guide/remap_attributes/add_field_source.png" alt="Un procesador de adición de campo que agrega el campo ddsource" style="width:50%;" >}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes
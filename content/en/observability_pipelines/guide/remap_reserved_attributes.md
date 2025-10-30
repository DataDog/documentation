---
title: Remap Reserved Attributes
disable_toc: false
further_reading:
- link: "/observability_pipelines/processors/edit_fields/"
  tag: "Documentation"
  text: "Learn more about the Edit Fields processor"
- link: "/observability_pipelines/processors/custom_processor/"
  tag: "Documentation"
  text: "Learn more about the Custom Processor processor"
---

## Overview

Observability Pipelines' processors enable you to add, edit, and remove log fields. Remapping attributes or rewriting values ensures your logs are processed and standardized properly. For the majority of processing use cases, use the Edit Fields processor to add, remap, or remove fields from your logs. For advanced use cases, use the Custom Processor to conditionally modify fields or rewrite a field's value.

In Datadog, [reserved attributes][1] are log fields that are set aside for specific processing in the platform. Reserved attributes include ` host`, `source`, `status`, `service`, `trace_id`, and `message`. Reserved attributes are applied when routing logs to the following Observability Pipelines destinations:

- Datadog Logs
- Amazon S3 (for Log Archives)
- Azure Blob Storage (for Log Archives)
- Google Cloud Storage (for Log Archives)

There are restrictions in Observability Pipelines on how you can modify reserved attributes. For example, reserved attributes cannot be renamed using the Rename Field processor, but must be remapped instead. This guide walks you through the steps to remap the value of reserved attributes.

If your specific setup uses a Splunk HEC source and Datadog destination, see [Remap source and service attributes when using the Splunk HEC source and Datadog destination](#remap-source-and-service-attributes-when-using-the-splunk-hec-source-and-datadog-destination).

## Remap the value of reserved attributes

To change or override the value of an existing reserved attribute field, Datadog recommends two approaches using Observability Pipelines. The first uses the Edit Fields processor, and the second uses the Custom Processor.

### Use an Edit Fields processor for basic field assignments

1. Use a **Remove field** processor to drop the reserved attribute from the log.
2. Use an **Add field** processor to add the reserved attribute back to the log with your correct field name and value assignment.

**Note**: In terms of the processor order, the **Add Field** processor should go immediately after the **Remove Field** processor to ensure correct field remapping.

#### Example
The **Remove field** processor image below removes the improperly named `service` field from the log.

{{< img src="observability_pipelines/guide/remap_attributes/remove_field_remap.png" alt="A remove field processor that drops the service tag and an add field processor that adds the service field with the value payment-app" style="width:50%;" >}}

The **Add field** processor image below re-adds the `service` field back with the correct value.

{{< img src="observability_pipelines/guide/remap_attributes/add_field_remap.png" alt="A remove field processor that drops the service tag and an add field processor that adds the service field with the value payment-app" style="width:50%;" >}}

### Use the Custom Processor for dynamic or manual assignments

Use the **Custom Processor** to rewrite the reserved attribute's value.

#### Dynamically assign the value using template syntax to reference another field's value.

The following Custom Processor script rewrites the `service` field and dynamically assigns the value of `app_id` to the `service` field's value.

```
.service = {{.app_id}}
```

In the below example image, the input shows `service` with the value `wrongstatus`. After processing the log with the script, the output shows `service` with the value of `streaming-service`, which is `app_id`'s value.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_dynamically_assign.png" alt="A custom processor showing an input the incorrect status value and the output showing the correct status" style="width:100%;" >}}

#### Manually rewrite the value of an attribute with a static name

The following Custom Processor script sets the `status` field to the static value `info`.

```
.status = "info"
```

In the below example image, the input shows `status` with the value `wrongstatus`. After processing the log with the script, the output shows `status` with `info` as assigned.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_statically_assign.png" alt="A custom processor showing an input the incorrect status value and the output showing the correct status" style="width:100%;" >}}

## Remap source and service attributes when using the Splunk HEC source and Datadog destination

Follow the instructions in this section to remap the `source` and/or `service` values if you are using a Splunk HEC source and Datadog destination. You must follow these instructions to remap those attributes because:

 - Splunk's `service` is what Datadog calls the `source` attribute.
 - Splunk's `sourcetype` is what Datadog calls the `ddsource` attribute.

**Note**: If you want to remap other reserved attributes, such as `env` and `hostname`, follow the [Remap the value of reserved attributes](#remap-the-value-of-reserved-attributes) instructions.

You can use the [Custom Processor](#remap-service-and-source-attributes-using-the-custom-processor) or [Edit Fields](#remap-service-and-source-attributes-using-edit-fields) to:

1. Remap the input log's `service` field to the `source` field name.
1. Remap the input log's `source` field to the `ddsource` field name.

### Remap service and source attributes using the Custom Processor

This is an example input log from the Splunk HEC source:

```json
{
  "service": "wrongService"
  "source": "wrongSource"
}
```

Assume these are the correct values you want for the log sent to Datadog:

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

After processing the log with the script, the output shows:

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}
```

In the below example image, the input shows `source` and `service` with the value `wrongstatus`. After processing the log with the script, the correct values are shown.

{{< img src="observability_pipelines/guide/remap_attributes/custom_processor_splunkhec_dd.png" alt="A custom processor showing an input the incorrect status value and the output showing the correct status" style="width:100%;" >}}

### Remap service and source attributes using Edit Fields

This is example input log from the Splunk HEC source:

```json
{
  "service": "wrongService"
  "source": "wrongSource"
}
```

Assume these are the correct values you want for the log sent to Datadog:

```json
{
  "ddsource": "akamai",
  "source": "cdn-logs"
}
```

Do the following to remap the `source` and `service` attributes to the correct values:

1. Use a **Remove field** processor to drop the `source` field`.
    - Enter `source` in the **Field to drop** field.
    {{< img src="observability_pipelines/guide/remap_attributes/remove_field_source.png" alt="A remove field processor that removes the source field" style="width:50%;" >}}
1. Use an **Add field** processor to add the `ddsource` field with the value `akamai`.
    - Enter `ddsource` in the **Field to add** field.
    - Enter `akamai` in the **Value to add** field.
    {{< img src="observability_pipelines/guide/remap_attributes/add_field_ddsource.png" alt="An add field processor that adds the ddsource field" style="width:50%;" >}}
1. Use a **Remove field** processor to drop the `service` field.
    - Enter `service` in the **Field to drop** field.
    {{< img src="observability_pipelines/guide/remap_attributes/remove_field_service.png" alt="A remove field processor that removes the service field" style="width:50%;" >}}
1. Use an **Add field** processor to add the `source` field with the value `cdn-logs`.
    - Enter `source` in the **Field to add** field.
    - Enter `cdn-logs` in the **Value to add** field.
    {{< img src="observability_pipelines/guide/remap_attributes/add_field_source.png" alt="An add field processor that adds the ddsource field" style="width:50%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
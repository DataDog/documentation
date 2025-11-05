---
title: OCSF Processor
description: Learn how to set up the OCSF processor.
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Cloud SIEM provides out-of-the-box [Open Cybersecurity Framework (OCSF) support][1] (with editable settings) for certain integrations. You can also add custom mappings with the OCSF processor to normalize your security logs according to the OCSF framework.

This document explains how to set up the OCSF processor, which is configured in [Log Management pipelines][2].

To use the OCSF processor, you need to:

1. [Create a log pipeline](#create-a-log-pipeline) that filters for the logs you want to remap to OCSF.
1. Within each pipeline, [create a sub-pipeline](#create-sub-pipelines) for each OCSF target event class.
1. [Add processors for pre-processing](#add-processors-for-pre-processing-logs), if needed.
1. [Add and configure the OCSF processor](#configure-the-ocsf-processor) in that log pipeline.

## Use an OCSF processor

### Create a log pipeline

Create separate log pipelines for each log source you want to remap to OCSF. For example, if you want to remap your Windows, AWS CloudTrail, and Okta logs to OCSF, you must:

1. Create a pipeline for your Windows logs, a pipeline for AWS CloudTrail logs, and a pipeline for Okta logs.
1. Within each of those pipelines, [create sub-pipelines](#create-sub-pipelines) for every target class.

To create a log pipeline:

1. Navigate to [Log Pipelines][3].
1. Click **New Pipeline**.
1. Enter a query to filter for logs you want to send to the OCSF processor.
1. Enter a name for the pipeline.
1. (Optional) Add tags and a description to indicate the purpose of the pipeline. Pipeline tags do not affect logs, but can be used to filter and search pipelines within the Pipelines page.
1. Click **Create**.

### Create sub-pipelines

Within the pipeline that filters for logs by source (for example, Okta), create a sub-pipeline for each OCSF target class. For example, if you want to normalize all your Okta Authentication and Detection Findings logs to OCSF, create the following in your Okta pipeline:

- A sub-pipeline for the OCSF class Authentication, where you filter for all Okta authentication events and logs
- A sub-pipeline for the OCSF class Detection Finding, where you filter all Okta detection events logs

To create a sub-pipeline:

1. Click the down arrow next to the pipeline you created for the source.
1. Click **Add Nested Pipeline**.
1. Enter a query to filter for logs you want to send to the OCSF processor. For example, if you want to filter for Okta detection events, use the query: `[@eventType:(security.threat.detected OR user.risk.*)]`.
1. Enter a name for the sub pipeline, such as `Okta OCSF sub-pipeline for class Detection Finding [2004]`.
1. (Optional) Add tags and a description to indicate the purpose of the pipeline. Pipeline tags do not affect logs, but can be used to filter and search pipelines within the Pipelines page.
1. Click **Create**.

### Add processors for pre-processing logs

In [Log Management pipelines][2], the order of pipelines matter. If you have to pre-process your logs before they get remapped to OCSF, the pre-processing must occur before the OCSF processor. For example, if the logs you want to remap to OCSF have an attribute that is encoded in base64, you must decode the attribute in a different pipeline and processor, before remapping it using the OCSF processor.

Depending on your use case, you can add processors to reformat your logs in the sub-pipeline for a target class or in a separate pipeline. For example:

- If pre-processing logs is required for several target classes, add processors to reformat your logs in a separate pipeline before the logs are sent to the OCSF processor.
- If pre-processing logs is only required for one target class, add processors to reformat logs in the sub-pipeline for that target class.

See [Processors][4] for more information on the processors you can use to reformat your logs if needed.

### Configure the OCSF processor

#### Add an OCSF processor

1. Click the down arrow next to the pipeline for you log source.
1. Click **Add Processor**.
1. Select **OCSF Processor**.
1. Enter a name for the processor, such as `Okta auth logs`.
1. Select the OCSF schema version and class you want to use in the dropdown menus.
1. (Optional) Select the profile in the dropdown menu.

#### Define mapping

##### Class attribute configuration

The OCSF Processor remaps attributes, including [enumerated (ENUM) attributes][5]. After you select the OCSF schema version and class, the **Define Mapping (OCSF Schema Class Attributes)** section shows attributes that you can configure. You can filter and search for specific attributes or choose to see only required, recommended, or optional attributes. If you do not see an attribute that you want to configure, you can manually add it.

ENUM attributes are configured in the [ENUM attribute configuration](#enum-attribute-configuration) section.

1. For each target attribute, in the **Source attribute** column, enter the attribute name from the source log that corresponds to the OSCF attribute.
    - You must fill out the **Source attribute** for all required fields.
    - You can add multiple fields for **Source attribute**. For example, Okta's `user.system.start` logs have either the `eventType` or `legacyEventType` field. You can map both fields to the same OCSF field.
    - You can also map a field to itself. For example, if you pre-processed a log to decode a base64 value and also added that value to the correct OCSF attribute, you can map that field to itself. In the below image, is remapped to itself because the source attribute entered is the same as the target attribute.
    {{< img src="security/security_monitoring/ocsf/remap_to_itself.png" alt="The attribute configuration table showing the entered source attributed as the same as the OCSF attribute" style="width:100%;" >}}
    - **Notes**:
      - Required root-level attributes cannot be deleted.
    {{< img src="security/security_monitoring/ocsf/required_root_level.png" alt="The attribute configuration table a message saying that root-level attributes cannot be deleted" style="width:100%;" >}}
1. (Optional) Click **Add Field** if you want to add additional attributes to be mapped. If you want to explore the attributes you can add, click **OCSF Schema Documentation** next to the **Schema configuration** header.
1. Enter the path to the attribute, such as `actor.user.name`, and select the attribute from the dropdown menu.
    - **Note**: If the attribute is not in the dropdown menu, you can manually enter the path to the attribute to add it. The attribute must be in the [OCSF Schema][6] documentation.
1. Click **add**.
    - If you see the error `Invalid OCSF attribute`, check the [OCSF documentation][6] to make sure you have the correct path.
    - If you see the error `ENUM attribute`, you have to enter the attribute in the [ENUM attribute configuration](#enum-attribute-configuration) section.

##### ENUM attribute configuration

[Enumeration (ENUM) attributes][5] are defined as specific numerical values. For example, the `severity_id` in the [Authentication [3002]][7] class is an enum attribute where numbers from `0` to `6`, and `99` each represent a severity level. The values of a source log's severity field must be mapped to the OCSF `severity_id`'s values listed in [Authentication [3002]][7].

Some enum attributes have a sibling string attribute associated with the enum attribute. For example, `severity_id:1` has the sibling string attribute `severity:Informational`. The sibling string attribute is automatically populated for the target attribute when the enum value is selected.

{{< img src="security/security_monitoring/ocsf/sibling_string_attribute.png" alt="The ocsf.severity_id attribute showing the sibling string already populated with Informational" style="width:100%;" >}}

An example of mapping severity values:
| Log value | OCSF severity ID | OCSF severity  |
|-----------|------------------|----------------|
| `INFO`    | 1                | `Informational`|
| `WARN`    | 3                | `Medium`       |
| `ERROR`   | 4                | `High`         |

In the **ENUM Attribute Configuration** section of the processor, you define the source log attribute that corresponds to the different attribute IDs. Some attributes are pre-populated based on the class selected.

1. Click the down arrow next to the enum attribute that you want to configure.
1. In the **Matching query** field, enter the log attribute that corresponds to this OSCF attribute, such as `severity:info`.
1. In the **ID** dropdown menu, select the number that corresponds to the log attribute's value.
1. (Optional) Enter a name for the sibling string attribute. See [Enum attributes][5] for more information.
1. Click **Add**.
1.  If you added the enum value `Other (99)`, you must enter the fallback values in the **Other fallback value(s)** field.
1. Repeat steps 1 to 6 until all required enum attributes are filled out.
1. (Optional) Click **Add Field** if you want to manually add enum attributes to be mapped.
    1. Enter the path to the attribute, such as `ocsf.actor.user.name`.
    1. Click **add**.
        - If you get an error, see [Errors when manually adding an attribute](#errors-when-manually-adding-an-attribute) for more information.
1. Click **Create** to add the processor.

#### Errors when manually adding an attribute

##### Value is already added

If you see the error `This value has already been added`, the attribute you are trying to add has already been added.

##### Unrecognized ENUM attribute, add as class attribute

If you see the error `Unrecognized ENUM attribute, add as a class attribute`, you are trying to add a class attribute in the ENUM attribute configuration section. To resolve the issue, add the class attribute in the [Define mapping (class attribute)](#class-attribute-configuration) section.

##### Unrecognized class attribute, add as ENUM attribute

If you see the error `Unrecognized class attribute, add as an ENUM attribute`, you are trying to add an ENUM attribute in the class attribute configuration section. To resolve the issue, add the ENUM attribute in the [ENUM attribute configuration](#enum-attribute-configuration) section.

##### Invalid OCSF attribute

If you see the error `Invalid OCSF attribute`, check the [OCSF Schema][6] to ensure that you are adding an attribute in the schema.

[1]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/#supported-out-of-the-box-ocsf-pipelines
[2]: /logs/log_configuration/pipelines/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /logs/log_configuration/processors/
[5]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#enum-attributes
[6]: https://schema.ocsf.io/
[7]: https://schema.ocsf.io/1.2.0/classes/authentication

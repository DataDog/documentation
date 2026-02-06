---
aliases:
- /logs/faq/partner_log_integration
- /developers/integrations/log_integration/
further_reading:
- link: /integrations/#cat-log-collection
  tag: Documentation
  text: See existing Datadog Log integrations
- link: /logs/explorer/facets/
  tag: Documentation
  text: Learn about log facets
- link: /logs/explorer/
  tag: Documentation
  text: Learn about the Log Explorer
- link: /logs/log_configuration/pipelines/
  tag: Documentation
  text: Learn about log pipelines
title: Create a Log Pipeline
description: Learn how to create a Datadog Log Integration Pipeline.
---
## Overview

Log pipelines parse, filter, and enrich incoming logs to make them searchable and actionable within Datadog. For Technology Partners, pipelines ensure that their logs are delivered in a structured, meaningful format right out of the box. For end users, prebuilt pipelines reduce the need to create custom parsing rules, allowing them to focus on troubleshooting and monitoring. Log pipelines are required for integrations that submit logs to Datadog.

{{< img src="developers/integrations/pipeline_library.png" alt="Browse the integration pipeline library" style="width:100%;" >}}

This guide explains how to create a log pipeline, including best practices and requirements. For a hands-on learning experience, check out related courses in the Datadog Learning Center:
   - [Process Logs Out of the Box with Integration Pipelines][1]
   - [Build and Manage Log Pipelines][2] 

### Core concepts

Below are important concepts to understand before building your pipeline. See [Log Pipelines][3] to learn more.

- **Processors**: The building blocks that transform or enrich logs. See [Processors][4] to learn more.

- **Facets**: Provide a straightforward filtering interface for logs and improve readability by exposing clear, human-friendly labels for important attributes. See [Facets][5] to learn more.

- **Nested pipelines**: Pipelines within a pipeline that allow you to split processing into separate paths for different log types or conditions.

- **Order matters**: Pipelines run from top to bottom, so the sequence of processors matters for achieving the desired log transformation.

## Building an integration log pipeline

To get started, make sure you're a registered Technology Partner with access to a Datadog developer instance. If you haven't joined yet, see [Join the Datadog Partner Network][6].

1. [Create a pipeline that filters by your integration's log source](#create-a-pipeline).
2. [Add processors to normalize and enrich logs](#add-processors).
3. [Create custom facets to improve user filtering and exploration](#define-custom-facets).
4. [Validate and test the pipeline](#validate-and-test-your-log-pipeline).
5. [Review log pipeline requirements](#review-requirements-checklist).
6. [Export the pipeline and include it in your integration submission](#export-and-add-your-pipeline-to-the-integration-submission).

### Create a pipeline

1. Navigate to the [**Pipelines**][7] page and select **New Pipeline**.
2. In the **Filter** field, filter by your integration's logs source (`source:<logs_source>`). Your logs source can be found in the **Data** tab when viewing your integration in the Developer Platform.
3. (Optional) Add tags and a description.
4. Click **Create**.

### Add processors

To add a processor, open your newly created pipeline and select **Add Processor**. Use the following guidance to determine which processors to configure:

1. Parse raw logs (if needed). 
   - If your logs are not in JSON format, add a [Grok Parser][8] to extract attributes before remapping or enrichment.
      - To maintain optimal grok parsing performance, avoid wildcard matchers.
   - Skip this step if logs are already sent to Datadog in JSON format.
2. Normalize logs with Datadog Standard Attributes in mind.
   - Map incoming attributes to [Datadog Standard Attributes][9] so logs are consistent across the platform. For example, an attribute for a client IP value should be remapped to `network.client.ip`.
   - For reserved attributes (`date`, `message`, `status`, `service`), use the dedicated processors: [Date Remapper][10], [Message Remapper][11], [Status Remapper][12], [Service Remapper][13].
      - **Important**: Remappers must be explicitly added for these attributes, even if the incoming value matches Datadog defaults. Organization-level overrides can change default behavior.
   - At a minimum, add a Date Remapper to map the log timestamp to the reserved `date` attribute.
   - For non-reserved standard attributes, use the general [Remapper][14].
      - Unless updating an existing integration log pipeline, disable **Preserve source attribute** to prevent duplicate values.
3. Enrich logs as needed. 
   - For a list of all log processors, see the [Processors][4] documentation.
   - Consider adding processors that provide context or derived attributes, such as:
      - [Geo IP Parser][15] to add geolocation data based on an IP address field.
      - [Category Processor][16] to group logs by predefined rules.
      - [Arithmetic Processor][17] to compute numeric values from existing attributes.
      - [String Builder Processor][18] to concatenate multiple attributes into a single field.

### Define custom facets

After logs are normalized and enriched, the next step is to create custom facets, which map individual attributes to user-friendly fields in Datadog.

Custom facets provide users with a consistent interface for filtering logs and power autocomplete in the Logs Explorer, making it easier to discover and aggregate important information. They also allow attributes with low readability to be renamed with clear, user-friendly labels. For example, transforming `@deviceCPUper` into `Device CPU Utilization Percentage`.

Facets can be qualitative (for basic filtering and grouping) or quantitative, known as measures (for aggregation operations, such as averaging or range filtering). Create facets for attributes that users are most likely to filter, search, or group by in the Logs Explorer. See [Facets][5] to learn more.

**Note**: You do not need to create facets for [Datadog Standard Attributes][9]. These attributes are mapped to predefined facets, which Datadog automatically generates when a pipeline is published.

After you've identified the attributes that can benefit from facets, follow these steps for each:

1. Navigate to the [Logs Explorer][19].
2. Click **Add** in the facets panel.
3. Choose whether to create a **Facet** or **Measure**, then expand **Advanced options**.
4. Define the **Path**.
   - Custom facets must include a prefix matching your logs source.
   - For example, a facet on `project_name` should use the path `@<logs_source>.project_name`.
5. Edit the **Display Name** to be user-friendly.
   - For example, the facet path `@<logs_source>.project_name` should have the display name `Project Name`.
6. Select the correct **Type** (and **Unit** if defining a Measure).
7. Add a **Group**, which should match your integration name. 
   - Use this same group for all additional custom facets in the integration.
8. Add a **Description** explaining the facet.
9. Click **Add** to save.
10. Navigate back to the pipeline definition and add a [Remapper][14] to align the raw attribute with the prefixed path used by the facet.

### Review requirements checklist

Prior to testing your pipeline, review the following requirements to avoid common mistakes.

- **Log pipelines must not be empty**: Every pipeline must contain at least one processor. At a minimum, include a Date Remapper.
- **Add dedicated remappers for `date`, `message`, `status`, and `service`**: Remappers must be explicitly added for these attributes, even if the incoming value matches Datadog defaults. Organization-level overrides can change default behavior.
- **Disable `Preserve source attribute` when using a general [Remapper][14]**: Enable this option only if the attribute is required for downstream processing, or if you are updating an existing pipeline and need to maintain backward compatibility.
- **Do not duplicate existing Datadog facets**: To avoid confusion with existing out-of-the-box Datadog facets, do not create custom facets that overlap with [Datadog Standard Attributes][9].
- **Use a custom prefix for custom facets**: Attributes that do not map to a [Datadog Standard Attribute][9] must include a unique prefix when being mapped to a custom facet. Use the general [Remapper][14] to add a prefix.
- **Group custom facets**: Assign all custom facets to a group that matches your integration's name.
- **Match facet data types**: Ensure the facet's data type (String, Boolean, Double, or Integer) matches the type of the attribute it maps to. Mismatched types can prevent the facet from working correctly.
- **Protect Datadog API and application keys**: Never log API keys. Keys should only be passed in request headers, not in log messages.

### Validate and test your log pipeline

Test your pipeline to confirm that logs are being parsed, normalized, and enriched correctly. For more complex pipelines, the [Pipeline Scanner][20] may be helpful.

1. Generate new logs that flow through the pipeline.
   - Pipelines are automatically triggered if Datadog ingests a log matching the filter query.
   - If the pipeline is not triggered, ensure it is enabled with the toggle.
2. Verify custom facets in the [Logs Explorer][19] by checking that they appear and filter results as expected.
3. Inspect individual logs in the Log Details panel to ensure:
   - `service`, `source`, and `message` attributes are set correctly.
	- Tags are applied as expected.

### Export and add your pipeline to the integration submission

The final step is to export the pipeline and upload the files to the Developer Platform.

1. Hover over your pipeline and select the **Export Pipeline** icon.
   {{< img src="developers/integrations/export_pipeline.png" alt="Click the Export Pipeline icon to export your log pipeline in Datadog" width="50%">}}
2. Review the pipeline and click **Select Facets**.
3. Select only the custom facets created for this integration and click **Add Sample Logs**.
   - Facets for [Datadog Standard Attributes][9] are automatically created by Datadog.
4. Add sample logs.
   - These samples must be in the format in which logs are sent to the Datadog Logs API or ingested with the Datadog Agent.
   - Ensure samples have coverage for variations of remappers. For example, if you've defined a category processor, add samples that trigger different category values.
5. Click **Export**.
   - Two YAML files are generated: one for the pipeline definition and one that Datadog uses internally for testing. 
6. Upload the two YAML files to the Developer Platform, under **Data** > **Submitted Data** > **Logs**.
   {{< img src="developers/integrations/data_tab.png" alt="The Data tab in the Integration Developer Platform" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.datadoghq.com/courses/integration-pipelines
[2]: https://learn.datadoghq.com/courses/log-pipelines
[3]: /logs/log_configuration/pipelines/
[4]: /logs/log_configuration/processors/
[5]: /logs/explorer/facets/
[6]: /developers/integrations/?tab=integrations#join-the-datadog-partner-network
[7]: https://app.datadoghq.com/logs/pipelines
[8]: /logs/log_configuration/processors/?tab=ui#grok-parser
[9]: /standard-attributes/?product=log
[10]: /logs/log_configuration/processors/?tab=ui#log-date-remapper
[11]: /logs/log_configuration/processors/?tab=ui#log-message-remapper
[12]: /logs/log_configuration/processors/?tab=ui#log-status-remapper
[13]: /logs/log_configuration/processors/?tab=ui#service-remapper
[14]: /logs/log_configuration/processors/?tab=ui#remapper
[15]: /logs/log_configuration/processors/?tab=ui#geoip-parser
[16]: /logs/log_configuration/processors/?tab=ui#category-processor
[17]: /logs/log_configuration/processors/?tab=ui#arithmetic-processor
[18]: /logs/log_configuration/processors/?tab=ui#string-builder-processor
[19]: https://app.datadoghq.com/logs
[20]: /logs/log_configuration/pipeline_scanner/
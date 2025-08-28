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

Log pipelines parse, filter, and enrich incoming logs to make them searchable and actionable within Datadog. For integration developers, pipelines ensure users receive structured, meaningful logs right out of the box in Datadog. For end users, prebuilt pipelines mean less time defining custom parsing rules and more time focusing on troubleshooting and monitoring.

This guide explains how to create a log pipeline for integrations that send logs into Datadog, including best practices and required configuration. For a hands-on learning experience, check out related courses in the Datadog Learning Center:
   - [Process Logs Out of the Box with Integration Pipelines][20]
   - [Build and Manage Log Pipelines][35] 

### Core concepts

Below are important concepts to understand before building your pipeline. See [Log Pipelines][13] to learn more.

- **Processors**: The building blocks that transform or enrich logs. See [Processors][10] to learn more.

- **Facets**: Provide a straightforward filtering interface for logs and improve readability by exposing clear, human-friendly labels for important attributes. See [Facets][12] to learn more.

- **Nested pipelines**: Pipelines within a pipeline that allow you to split processing into separate paths for different log types or conditions.

- **Order matters**: Pipelines run from top to bottom, so the sequence of processors matters for achieving the desired log transformation.

## Building an integration log pipeline

1. Create a pipeline that filters on your integration's logs source.
2. Add processors to normalize and enrich incoming logs.
3. Create facets to improve user filtering.

### Create a pipeline

1. Navigate to the [**Pipelines**][3] page and select **New Pipeline**.
2. In the **Filter** field, filter by your integration's logs source (e.g., `source:okta`). Your logs source can be found in the **Data** tab when viewing your integration in the Developer Platform.
3. (Optional) Add tags and a description for clarity.
4. Click **Create**.

### Add processors
To add a processor, open your newly created pipeline and select **Add Processor**. Use the following guidance to determine which processors to configure:

1. Parse raw logs (if needed). 
   - If your logs are not in JSON format, add a [Grok Parser][8] to extract attributes before remapping or enrichment.
      - To maintain optimal grok parsing performance, avoid wildcard matchers.
   - Skip this step if logs are already sent to Datadog in JSON format.
2. Normalize logs with Datadog's Standard Attributes in mind.
   - Map incoming attributes to [Datadog’s Standard Attributes][6] so logs are consistent across the platform. For example, an attribute for a client IP value should be remapped to `network.client.ip`.
   - For reserved attributes (`date`, `message`, `status`, `service`), use the dedicated processors: [Date Remapper][4], [Message Remapper][29], [Status Remapper][25], [Service Remapper][7].
      - **Important**: Remappers must be explicitly added for these attributes, even if the incoming value matches Datadog defaults. Organization-level overrides can change default behavior.
   - At minimum, add a Date Remapper to map the log timestamp to the reserved `date` attribute.
   - For non-reserved standard attributes, use the general [Remapper][5].
      - Unless updating an existing integration log pipeline, disable **Preserve source attribute** to avoid duplicate values.
3. Enrich logs as needed. 
   - For a list of all log processors, see the [Processors][10] documentation.
   - Consider adding processors that provide context or derived attributes, such as:
      - [Geo IP Parser][30] to add geolocation data based on an IP address field.
      - [Category Processor][19] to group logs by predefined rules.
      - [Arithmetic Processor][31] to compute numeric values from existing attributes.
      - [String Builder Processor][32] to concatenate multiple attributes into a single field.

### Create custom facets
Once logs are normalized and enriched, the next step is to make them easier to explore in the [Logs Explorer][16] by creating custom facets. 
   - Facets can be either qualitative (string or categorical values used for filtering and grouping) or quantitative (numeric values treated as measures for aggregation), as described in [Facets][34].
   - While not strictly required, custom facets provide key benefits:
      - They give users a simple, consistent interface for filtering logs. Facets also power autocomplete in the Logs Explorer, making it easier to discover and aggregate important information.
      - They allow attributes with low readability to be renamed with clear, user-friendly labels. For example, `@deviceCPUper` → `Device CPU Utilization Percentage`.

**Note**: Facets for [standard attributes][6] are created automatically by Datadog when a pipeline is published.

#### Steps to create a custom facet
1. Navigate to the [Logs Explorer][33].
2. Click **Add** in the facets panel.
3. Choose whether to create a **Facet** or **Measure**, then expand **Advanced options**.
4. Define the **Path**.
   - Custom facets must include a prefix matching your logs source.
   - For example, a facet on `project_name` should use the path `@<logs_source>.project_name`.
5. Edit the **Display Name** to be user-friendly.
   - For example, the facet path `@<logs_source>.project_name` should have the display name `Project Name`.
6. Select the correct **Type** (and **Unit** if defining a Measure).
7. Add a **Group**, which should match your integration name. 
   - Use this same group for all additional custom facets in the integration
8. Add a **Description** explaining the facet.
9. Click **Add** to save.
10. Navigate back to the pipeline definition and add a [Remapper][5] to align the raw attribute with the prefixed path used by the facet.

### Validate the pipeline
After adding processors and facets, validate the pipeline to confirm that logs are being parsed, normalized, and enriched correctly.

1. Generate new logs that flow through the pipeline.
2. Verify custom facets in the [Logs Explorer][33] by checking that they appear and filter results as expected.
3. Inspect individual logs in the Log Details panel to ensure:
   - `service`, `source`, and `message` attributes are set correctly.
	- Custom and standard tags are applied as expected.

### Export and submit your pipeline
The final step is to export the pipeline so it can be included with your integration submission.

1. Hover over your pipeline and select the **Export Pipeline** icon.
   {{< img src="developers/integrations/export_pipeline.png" alt="Click the Export Pipeline icon to export your log pipeline in Datadog" width="50%">}}
2. Review the pipeline and click **Select Facets**.
3. Select only the custom facets created for this integration and click **Add Sample Logs**.
   - Standard facets for [standard attributes][6] will automatically be created by Datadog.
4. Add sample logs.
   - These samples must be in the format in which logs will be sent to Datadog Logs API or ingested via the Datadog Agent.
   - Ensure samples have coverage for variations of remappers. For example, if you've defined a category processor, add samples that trigger different category values.
5. Click **Export**.
   - Two YAML files will be generated: one for the pipeline definition and one that Datadog will use internally for testing. 
6. Upload the two YAML files to the Developer Platform, under **Data** > **Submitted Data** > **Logs**.
   {{< img src="developers/integrations/data_tab.png" alt="The Data tab in the Integration Developer Platform" style="width:100%;" >}}

##### Submission Checklist
Review the following requirements before submitting your integration log pipeline to avoid common mistakes.

Log pipelines must not be empty.
: Every pipeline must contain at least one processor. At minimum, include a Date Remapper.

Disable `Preserve source attribute` when using a general [Remapper][5].
: Enable this option only if the attribute is required for downstream processing, or if you are updating an existing pipeline and need to maintain backward compatibility.

Do not duplicate existing Datadog facets.
: To avoid confusion with existing out-of-the-box Datadog facets, do not create custom facets that overlap with [Datadog Standard Attributes][6].

Use a custom prefix for custom facets.
: Attributes that do not map to a [Datadog Standard Attribute][6] must include a unique prefix if being mapped to a custom facet. Use the general [Remapper][5] to add a prefix.

Group custom facets.
: Assign all custom facets to a group that matches your integration’s name.

Match facet data types.
: Ensure the facet’s data type (String, Boolean, Double, or Integer) matches the type of the attribute it maps to. Mismatched types can prevent the facet from working correctly.

Protect Datadog API and application keys.
: Never log API keys. Keys should only be passed in request headers, not in log messages.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/latest/logs/#send-logs
[2]: https://docs.datadoghq.com/getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://docs.datadoghq.com/standard-attributes/?product=log
[7]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#service-remapper
[8]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#grok-parser
[9]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#log-message-remapper
[10]: https://docs.datadoghq.com/logs/log_configuration/processors/
[11]: https://docs.datadoghq.com/logs/explorer/facets/#units
[12]: https://docs.datadoghq.com/logs/explorer/facets/
[13]: https://docs.datadoghq.com/logs/log_configuration/pipelines/
[14]: https://docs.datadoghq.com/glossary/#facet
[15]: https://docs.datadoghq.com/glossary/#measure
[16]: https://docs.datadoghq.com/logs/explorer/
[17]: https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#standard-attributes
[18]: https://docs.datadoghq.com/developers/integrations/?tab=integrations
[19]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#category-processor
[20]: https://learn.datadoghq.com/courses/integration-pipelines
[21]: https://partners.datadoghq.com/
[22]: https://docs.datadoghq.com/developers/integrations/
[23]: https://docs.datadoghq.com/logs/log_collection/?tab=http#additional-configuration-options
[24]: https://docs.datadoghq.com/logs/explorer/search_syntax/#arrays
[25]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#log-status-remapper
[26]: https://docs.datadoghq.com/getting_started/tagging/#overview
[27]: https://docs.datadoghq.com/logs/explorer/facets/#units
[28]: https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=date#date-attribute
[29]: http://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#log-message-remapper
[30]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#geoip-parser
[31]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#arithmetic-processor
[32]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#string-builder-processor
[33]: https://app.datadoghq.com/logs
[34]: https://docs.datadoghq.com/logs/explorer/facets/#overview
[35]: https://learn.datadoghq.com/courses/log-pipelines
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

This guide walks Technology Partners through creating a log pipeline for your integrations that sends logs to Datadog. A log pipeline is required to process, structure, and enrich logs for optimal usability.

## Best practices
1. Use supported Datadog log [endpoints][23].
- The integration must use one of Datadog's supported log ingestion endpoints.
- Alternatively, use the [Logs Ingestion HTTP endpoint][1] to send logs to Datadog.
2. Support all Datadog sites.
- Ensure users can select between different Datadog sites when applicable.
- Refer to [Getting Started with Datadog Sites][2] for site-specific details.
- The Datadog site endpoint for log ingestion is: `http-intake.logs`.{{< region-param key="dd_site" code="true" >}}.
3. Allow users to attach custom tags.
- Tags should be set as key-value attributes in the JSON body of the log payload.
- If logs are sent using API, tags can also be set using the `ddtags=<TAGS>` query parameter
4. Set the integration's logs source tag.
- Define the source tag as the integration name, such as source: okta.
- The source tag must:
  - Be lowercase
  - Not be user-editable (use for pipelines and dashboards)
5. Avoid sending logs with arrays in the JSON body.
- While arrays are supported they cannot be faceted, which limits filtering
6. Protect Datadog API and application keys.
- Never log Datadog API keys. These should only be passed in the request header or HTTP path.
- Do not use application keys for log ingestion

## Create log integration assets
Log integration assets consist of:
1. [Pipelines][13] - Process and structure logs.
2. [Facets][12] - Attributes used for filtering and searching logs.
Technology Partner integrations must follow Datadog's [standard naming convention][17] to ensure compatibility with out-of-the-box dashboards. 

<div class="alert alert-warning">To be reviewed by Datadog's integration team, log integrations must include assets and have pipeline processors or facets.</div>

### Pipelines overview

Logs sent to Datadog are processed in [log pipelines][13] using pipeline processors. These processors allow users to parse, remap, and extract attribute information, enriching and standardizing logs for use across the platform.

#### Create a pipeline
1. Navigate to the [**Pipelines**][3] page and select New Pipeline.
2. In the Filter field, enter the unique source tag for the logs. For example, `source:okta` for the Okta integration.
3. [Optional] Add tags and a description for clarity.
4. Click **Create**.

Important: Ensure logs sent through the integration are tagged before being ingested.

#### Add pipeline processors
1. Review [Datadog's Standard Attributes][6] for log structuring best practices.
   > Standard Attributes are reserved attributes that apply across the platform.  
3. Click **Add Processor** and choose from the following options:
   - Attribute Remapper - Maps from custom log attributes to standard Datadog attributes.
   - Service Remapper - Ensures logs are linked to the correct service name.
   - Date Remapper - Assigns the correct timestamp to logs.
   - Status Remapper - Maps log statuses to standard Datadog attributes.
   - Message Remapper - Assigns logs to the correct message attribute.
4. If logs are not in JSON format, use a grok parser processor to extract attributes. Grok processors parse out attributes and enrich logs prior to remapping or further processing.

For advanced processing, consider:
- Arithmetic Profecessor - Performs calculations on log attributes.
- String Builder Processor - Concatenates multiple string attributes.

Tips
- Remove original attributes when remapping log attributes by using `preserveSource:false`. This helps avoid confusion and removes duplicates.
- To maintain optimal grok parsing performance, avoid wildcard matchers.

Use processors within your pipelines to enrich and restructure your data, and generate log attributes. For a list of all log processors, see the [Processors][10] documentation.

##### Requirements

Map the application's logs attributes to Datadog's Standard Attributes
: Use the [Attribute Remapper][5] to map attribute keys to [Datadog Standard Attributes][6] where possible. For example, an attribute for a network service client IP value should be remapped to `network.client.ip`.

Map the log `service` tag to the name of the service producing telemetry
: Use the [Service Remapper][7] to remap the `service` attribute. When source and [service][26] share the same value, remap the `service` tag to the `source` tag. `service` tags must be lowercase. 

Map the log's internal timestamp to its official Datadog timestamp
: Use the [Date Remapper][4] to define the official timestamp for logs. If a log's timestamp does not map to a [standard date attribute][28], Datadog sets its timestamp to the time of ingestion.

Map the custom status attributes of the logs to the official Datadog `status` attribute
: Use a [Status Remapper][25] to remap the `status` of a log, or a [Category Processor][19] for statuses mapped to a range (as with HTTP status codes).

Map the custom message attribute of the logs to the official Datadog `message` attribute
: Use the [message remapper][9] to define the official message of the log if application logs do not map to the standard message attribute. This allows users to search for logs using free text.

Set a namespace for custom attributes within your logs
: Generic log attributes that do not map to a [Datadog Standard Attribute][6] must be namespaced if they are mapped to [Facets][14]. For example, `file` would be remapped to `integration_name.file`.
Use the [Attribute Remapper][5] to set attribute keys to a new namespaced attribute. 

1. Expand the newly created pipeline and click **Add Processor** to begin building your pipeline using processors.
2. If the integration's logs aren't in JSON format, add the [Grok Processor][8] to extract attribute information. Grok processors parse out attributes and enrich logs prior to remapping or further processing.
3. After extracting log attributes, remap them to [Datadog's Standard Attributes][6] where possible using [Attribute Remappers][5].
4. Set the timestamp of an integration's logs to be its official Datadog timestamp using the [Date Remapper][4].
5. For more advanced processing and data transformations, make use of additional [processors][10].  
For example, the `Arithmetic Processor` can be used to calculate information based off of attributes, or the `String Builder Processor` can concatenate multiple string attributes. 

**Tips**
* Remove original attributes when remapping log attributes by using `preserveSource:false`. This helps avoid confusion and removes duplicates.
* To maintain optimal grok parsing performance, avoid wildcard matchers such as `%{data:}` and `%{regex(".*"):}`. Make your parsing statements as specific as possible.
* Take the free course [Going Deeper with Logs Processing][20] for an overview on writing processors and leveraging standard attributes. 

### Facets overview

Facets are specific qualitative or quantitative attributes that can be used to filter and narrow down search results. While facets are not strictly necessary for filtering search results, they play a crucial role in helping users understand the available dimensions for refining their search. 

Facets for standard attributes are automatically added by Datadog when a pipeline is published. Review if the attribute should be remapped to a [Datadog Standard Attribute][6]. 

Not all attributes are meant to be used as a facet. The need for facets in integrations is focused on two things:
* Facets provide a straightforward interface for filtering logs. They are leveraged in Log Management autocomplete features, allowing users to find and aggregate key information found in their logs.
* Facets allow for attributes with low readability to be renamed with a label that is easier to understand. For example: `@deviceCPUper` → `Device CPU Utilization Percentage`.

You can create [facets][12] in the [Log Explorer][16].

#### Create facets

Correctly defining facets is important as they improve the usability of indexed logs in analytics, monitors, and aggregation features across Datadog's Log Management product. 

They allow for better findability of application logs by populating autocomplete features across Log Management.

<div class="alert alert-info">Quantitative facets, called "Measures", allow users to filter logs over a range of numeric values using relational operators.  
For example, a measure for a latency attribute allows users to search for all logs greater-than a certain duration. </div>

##### Requirements

Attributes mapped to custom facets must be namespaced first
: Generic custom attributes that do not map to [Datadog Standard Attribute][6] must be namespaced when used with custom [facets][14]. An [Attribute Remapper][5] can be used to namespace an attribute with the integration's name.  
For example, remapping `attribute_name` to `integration_name.attribute_name`.

Custom facets must not duplicate an existing Datadog Facet
: To avoid confusion with existing out-of-the-box Datadog facets, do not create custom facets that duplicate any existing facets already mapped to [Datadog Standard Attributes][6].

Custom facets must be grouped under the `source` name
: When creating a custom facet a group should be assigned. Set the `Group` value to the `source`, same as the integration's name.

Custom facets must have the same data type as the mapped attribute
: Set the facet data type (String, Boolean, Double, or Integer) to the same type as the Attribute mapped to it. Mismatched types prevent the facet from being used as intended and can cause it to populate incorrectly.

**Add a facet or measure**

1. Click on a log that contains the attribute you want to add a facet or measure for. 
2. In the log panel, click the Cog icon next to the attribute.
3. Select **Create facet/measure for @attribute**.
4. For a measure, to define the unit, click **Advanced options**. Select the unit based on what the attribute represents.
**Note**: Define the [unit][11] of a measure based on what the attribute represents.
5. Specify a facet **Group** to help navigate the Facet List. If the facet group does not exist, select **New group**, enter the name of the group matching the source tag, and add a description for the new group.
6. To create the facet, click **Add**.

#### Configure and edit facets

1. In the log panel, click the Cog icon next to the attribute that you want to configure or group.
2. Select **Edit facet/measure for @attribute**. If there isn't a facet for the attribute yet, select **Create facet/measure for @attribute**.
3. Click **Add** or **Update** when done.

**Tips**
* Measures should have a unit where possible. Measures can be assigned a [unit][27]. Two families of units are available, `TIME` and `BYTES`, with units such as `millisecond` or `gibibyte`.
* Facets can be assigned a description. A clear description of the facet can help users understand how to best use it.
* If you remap an attribute and keep the original using the `preserveSource:true` option, define a facet on only a single one.
* When manually configuring facets in a pipeline's `.yaml` configuration files, note they are assigned a `source`. This refers to where the attribute is captured from and can be `log` for attributes or `tag` for tags.

## Export your log pipeline

Hover over the pipeline you would like to export and select **export pipeline**. 

{{< img src="developers/integrations/export_pipeline.png" alt="Click the Export Pipeline icon to export your log pipeline in Datadog" width="50%">}}

Exporting your log pipeline includes two YAML files:
-**pipeline-name.yaml**: The log pipeline, including custom facets, attribute remappers, and grok parsers.
-**pipeline_name_test.yaml**: The raw sample logs provided and an empty section result.

Note: Depending on your browser, you may need to adjust your setting to allow file downloads.

## Upload your log pipeline
Navigate to the Integration Developer Platform, and under the **Data** tab > **Submitted logs**, specify the log source and upload the two files exported from the previous step.

"placeholder for image of data page in pub plat"


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/latest/logs/#send-logs
[2]: https://docs.datadoghq.com/getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://docs.datadoghq.com/standard-attributes?product=log+management
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
[20]: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
[21]: https://partners.datadoghq.com/
[22]: https://docs.datadoghq.com/developers/integrations/create_a_tile/?tab=buildatileontheintegrationspage#open-a-pull-request
[23]: https://docs.datadoghq.com/logs/log_collection/?tab=http#additional-configuration-options
[24]: https://docs.datadoghq.com/logs/explorer/search_syntax/#arrays
[25]: https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#log-status-remapper
[26]: https://docs.datadoghq.com/getting_started/tagging/#overview
[27]: https://docs.datadoghq.com/logs/explorer/facets/#units
[28]: https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=date#date-attribute

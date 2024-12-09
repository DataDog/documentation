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

This page walks Technology Partners through creating a log pipeline. A log pipeline is required if your integration sends logs to Datadog.


When developing your integration to send logs to Datadog follow these guidelines to ensure the best experience for your users.

## Best practices

Before creating a log pipeline, consider the following guidelines and best practices:

The integration must use supported Datadog logs endpoints
: Your integration must use one of the [supported endpoints][23] exposed by Datadog for log ingestion. You can otherwise use the [Logs Ingestion HTTP endpoint][1] to send logs to Datadog.

The integration must support all Datadog sites
: Users must be able to choose between the different Datadog sites whenever applicable. See [Getting Started with Datadog Sites][2] for more information about site differences. </br></br> Your Datadog site endpoint is `http-intake.logs`.{{< region-param key="dd_site" code="true" >}}.

Allow users to attach custom tags while setting up your integration
: Tags can be set as key-value attributes in the JSON body of your integration's log payload. Datadog recommends allowing users to set custom tags for an integration. If the integration [sends logs through the API][1], tags can optionally be set using the `ddtags=<TAGS>` query parameter.

Set the integration's logs `source` tag to the integration name
: Datadog recommends setting the `source` tag to `<integration_name>` (`source:okta`) for an application. `source` must be set before sending logs to Datadog's endpoints as it cannot be remapped in the Datadog UI. </br></br> The `source` tag must be in lowercase and must not be editable by users as it is used to enable integration pipelines and dashboards.

Avoid sending logs that contain arrays in the JSON body whenever possible 
: While it's possible to send array data in your logs, Datadog recommends avoiding arrays as they cannot be [faceted][24].

Do not log Datadog API Keys
: Datadog API Keys can either be passed in the Header or as part of the HTTP Path of your API requests. For examples, see [Send Logs API documentation][1]. Avoid logging the API Key in your setup.

Do not use Datadog Application Keys
: Datadog Application Keys are not required to send logs using the HTTP endpoint. 

## Create log integration assets

You can create and design your log integration assets directly within your Datadog partner account.

Log integrations consist of two sets of assets: [pipelines][13] and associated [facets][12]. Centralizing logs from various technologies and applications can produce many unique attributes. To use out-of-the-box dashboards, Technology Partner Integrations should rely on Datadog's [standard naming convention][17] when creating integrations.

After finalizing your Datadog Integration design and successfully sending logs to Datadog's log endpoint(s), define your log pipelines and facets to enrich and structure your integration's Logs.

For information about becoming a Datadog Technology Partner, and gaining access to an integration development sandbox, read [Build an Integration][18].

<div class="alert alert-warning">To be reviewed by Datadog's integration team, log integrations must include assets and have pipeline processors or facets.</div>

### Pipelines overview

Logs sent to Datadog are processed in [log pipelines][13] using pipeline processors. These processors allow users to parse, remap, and extract attribute information, enriching and standardizing logs for use across the platform.

#### Create a pipeline

Create a log pipeline to process specified logs with pipeline processors.


1. From the [**Pipelines**][3] page, click **+ New Pipeline**.
2. In the **Filter** field, enter the unique `source` tag that defines the log source for the Technology Partner's logs. For example, `source:okta` for the Okta integration. 
**Note**: Make sure that logs sent through the integration are tagged with the correct source tags before they are sent to Datadog.
3. Optionally, add tags and a description.
4. Click **Create**.

After you set-up a pipeline, add processors to enrich and structure the logs further.
#### Add pipeline processors

Before defining your pipeline processors, review [Datadog's Standard Attributes][6].

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
: Generic log attributes that do not map to a [Datadog Standard Attribute][6] must be namespaced if they are mapped to [Facets][14].
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
: To avoid confusion with existing out-of-the-box Datadog facets, avoid creating custom facets that duplicate an existing facets mapped to [Datadog Standard Attributes][6].

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

## Review and deploy the integration

Datadog reviews the log integration based on the guidelines and requirements documented on this page and provides feedback to the Technology Partner through GitHub. In turn, the Technology Partner reviews and makes changes accordingly.

To start a review process, export your log pipeline and relevant custom facets using the **Export** icon on the [Logs Configuration page][3]. 

{{< img src="developers/integrations/export_pipeline.png" alt="Click the Export Pipeline icon to export your log pipeline in Datadog" width="50%">}}

Include sample raw logs with **all** the attributes you expect to be sent into Datadog by your integration. Raw logs comprise of the raw messages generated directly from the source application **before** they are sent to Datadog.

Exporting your log pipeline includes two YAML files:

* One with the log pipeline, which includes custom facets, attribute remappers, and grok parsers. The exported file is named `pipeline-name.yaml`.
* One with the raw sample logs provided and an empty `result` section. The exported file is named `pipeline-name_test.yaml`.

**Note**: Depending on your browser, you may need to adjust your settings to allow file downloads.

After you've downloaded these files, navigate to your [integration's pull request][22] on GitHub and add them in the **Assets** > **Logs** directory. If a Logs folder does not exist yet, you can create one.

Validations are run automatically in your pull request, and validate your pipelines against the raw samples provided. These will produce a result that you can set as the `result` section of your `pipeline-name_test.yaml` file.
Once the validations runs again, if no issues are detected, the logs validation should succeed.

Three common validation errors are:
1. The `id` field in both YAML files: Ensure that the `id` field matches the `app_id` field in your integration's `manifest.json` file to connect your pipeline to your integration. 
2. Not providing the `result` of running the raw logs you provided against your pipeline. If the resulting output from the validation is accurate, take that output and add it to the `result` field in the YAML file containing the raw example logs.
3. If you send `service` as a parameter, instead of sending it in the log payload, you must include the `service` field below your log samples within the yaml file.

After validations pass, Datadog creates and deploys the new log integration assets. If you have any questions, add them as comments in your pull request. Datadog team members respond within 2-3 business days.

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

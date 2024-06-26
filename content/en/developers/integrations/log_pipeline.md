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
kind: documentation
title: Create a Log Pipeline
description: Learn how to create a Datadog Log integration.
---
## Overview

This page walks Technology Partners through creating a log pipeline. A log pipeline is required if your integration is sending in logs. 

## Log integrations

Use the [Logs Ingestion HTTP endpoint][1] to send logs to Datadog.

## Development process

### Guidelines

When creating a log pipeline, consider the following best practices:

Map your data to Datadog's standard attributes
: Centralizing logs from various technologies and applications can generate tens or hundreds of different attributes in a Log Management environment. Integrations must rely as much as possible on the [standard naming convention][17].

Set the `source` tag to the integration name.
: Datadog recommends that the `source` tag is set to `<integration_name>` and that the `service` tag is set to the name of the service that produces the telemetry. For example, the `service` tag can be used to differentiate logs by product line. </br></br> For cases where there aren't different services, set `service` to the same value as `source`. The `source` and `service` tags must be non-editable by the user because the tags are used to enable integration pipelines and dashboards. The tags can be set in the payload or through the query parameter, for example, `?ddsource=example&service=example`. </br></br> The `source` and `service` tags must be in lowercase. 

The integration must support all Datadog sites.
: The user must be able to choose between the different Datadog sites whenever applicable. See [Getting Started with Datadog Sites][2] for more information about site differences. </br></br> Your Datadog site endpoint is `http-intake.logs`.{{< region-param key="dd_site" code="true" >}}.

Allow users to attach custom tags while setting up the integration.
: Datadog recommends that manual user tags are sent as key-value attributes in the JSON body. If it's not possible to add manual tags to the logs, you can send the tags using the `ddtags=<TAGS>` query parameter. See the [Send Logs API documentation][1] for examples.

Send data without arrays in the JSON body whenever possible. 
: While it's possible to send some data as tags, Datadog recommends sending data in the JSON body and avoiding arrays. This allows you more flexibility with the operations you can carry out on the data in Datadog Log Management. 

Do not log Datadog API keys.
: Datadog API keys can either be passed in the header or as part of the HTTP path. See [Send Logs API documentation][1] for examples. Datadog recommends using methods that do not log the API key in your setup.

Do not use Datadog application keys.
: The Datadog application key is different from the API key and is not required to send logs using the HTTP endpoint. 

## Set up the log integration assets in your Datadog partner account 

For information about becoming a Datadog Technology Partner, and gaining access to an integration development sandbox, read [Build an Integration][18].

### Log pipeline requirements

Logs sent to Datadog are processed in [log pipelines][13] to standardize them for easier search and analysis.

To set up a log pipeline:

1. From the [**Pipelines**][3] page, click **+ New Pipeline**.
2. In the **Filter** field, enter a unique `source` tag that defines the log source for the Technology Partner's logs. For example, `source:okta` for the Okta integration. **Note**: Make sure that logs sent through the integration are tagged with the correct source tags before they are sent to Datadog.
3. Optionally, add tags and a description.
4. Click **Create**.

You can add processors within your pipelines to restructure your data and generate attributes.

**Requirements:**

- Use the [date remapper][4] to define the official timestamp for logs.
- Use a status remapper to remap the `status` of a log, or a [category processor][19] for statuses mapped to a range (as with HTTP status codes).
- Use the attribute [remapper][5] to remap attribute keys to standard [Datadog attributes][6]. For example, an attribute key that contains the client IP must be remapped to `network.client.ip` so Datadog can display Technology Partner logs in out-of-the-box dashboards. Remove original attributes when remapping by using `preserveSource:false` to avoid duplicates.
- Use the [service remapper][7] to remap the `service` attribute or set it to the same value as the `source` attribute.
- Use the [grok processor][8] to extract values in the logs for better searching and analytics. To maintain optimal performance, the grok parser must be specific. Avoid wildcard matches.
- Use the [message remapper][9] to define the official message of the log and make certain attributes searchable by full text.

For a list of all log processors, see [Processors][10].

**Tip**: Take the free course [Going Deeper with Logs Processing][20] for an overview on writing processors and leveraging standard attributes. 

### Facet requirements

You can optionally create [facets][12] in the [Log Explorer][16]. Facets are specific attributes that can be used to filter and narrow down search results. While facets are not strictly necessary for filtering search results, they play a crucial role in helping users understand the available dimensions for refining their search.

Measures are a specific type of facet used for searches over a range. For example, adding a measure for latency duration allows users to search for all logs above a certain latency. 
**Note**: Define the [unit][11] of a measure facet based on what the attribute represents.

To add a facet or measure:

1. Click on a log that contains the attribute you want to add a facet or measure for. 
2. In the log panel, click the Cog icon next to the attribute.
3. Select **Create facet/measure for @attribute**.
4. For a measure, to define the unit, click **Advanced options**. Select the unit based on what the attribute represents.
5. Click **Add**.

To help navigate the facet list, facets are grouped together. For fields specific to the integration logs, create a **single group with the same name** as the `source` tag. 

1. In the log panel, click the Cog icon next to the attribute that you want in the new group.
2. Select **Edit facet/measure for @attribute**. If there isn't a facet for the attribute yet, select **Create facet/measure for @attribute**.
3. Click **Advanced options**.
4. In the **Group** field, enter the name of the group matching the source tag and a description of the new group, and select **New group**.
5. Click **Update**.

**Guidelines**
- Before creating a new facet for an integration, review if the attribute should be remapped to a [standard attribute][6] instead. Facets for standard attributes are added automatically by Datadog when the log pipeline is published.
- Not all attributes are meant to be used as a facet. Non-faceted attributes are still searchable. The need for facets in integrations is focused on three things:
1. Facets that are measures allow for associated units with an attribute. For example an attribute "response_time" could have a unit of "ms" or "s". 
2. Facets provide a straightforward filtering interface for logs. Each facet is listed under the group heading and usable for filtering.
3. Facets allow for attributes with low readability to be renamed with a label that is easier to understand. For example: @deviceCPUper → Device CPU Utilization Percentage

**Requirements:**
- Use standard attributes as much as possible.
- All facets that are not mapped to reserved or standard attributes should be namespaced with the integration name.
- A facet has a source. It can be `log` for attributes or `tag` for tags.
- A facet has a type (String, Boolean, Double or Integer) which matches the type of the attribute. If the type of the value of the attribute does not match the one of the facet, the attribute is not indexed with the facet.
- Double and Integer facets can have a unit. Units are composed of a family (such as time or bytes) and of a name (such as millisecond or gibibyte).
- A facet is stored in groups and has a description.
- If you remap an attribute and keep both, define a facet on a single one.

## Review and deploy the integration

Datadog reviews the log integration based on the guidelines and requirements documented on this page and provides feedback to the Technology Partner through GitHub. In turn, the Technology Partner reviews and makes changes accordingly.

To start a review process, export your log pipeline and relevant custom facets using the **Export** icon on the [Logs Configuration page][3]. 

{{< img src="developers/integrations/export_pipeline.png" alt="Click the Export Pipeline icon to export your log pipeline in Datadog" width="50%">}}

Include sample raw logs with all the attributes you expect to be sent into Datadog by your integration. Raw logs comprise of the raw messages generated directly from the source before they have been ingested by Datadog.

Exporting your log pipeline includes two YAML files:

- One with the log pipeline, which includes custom facets, attribute remappers, and grok parsers.
- One with the raw example logs with an empty result. 

Note: Depending on your browser, you may need to adjust your settings to allow file downloads.

After you've downloaded these files, navigate to your [integration's pull request][22] on GitHub and add them in the **Assets** > **Logs** directory. If a Logs folder does not exist yet, you can create one.

Validations are run automatically in your pull request. 

Three common validation errors are:
1. The `id` field in both YAML files: Ensure that the `id` field matches the `app_id` field in your integration's `manifest.json` file to connect your pipeline to your integration. 
2. Not providing the result of running the raw logs you provided against your pipeline. If the resulting output from the validation is accurate, take that output and add it to the `result` field in the YAML file containing the raw example logs.
3. If you send `service` as a parameter, instead of sending it in the log payload, you must include the `service` field below your log samples within the yaml file.


Once validations pass, Datadog creates and deploys the new log integration assets. If you have any questions, add them as comments in your pull request. A Datadog team member will respond within 2-3 business days.

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

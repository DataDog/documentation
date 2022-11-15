---
title: Log Integration Guidelines for Datadog Partners
kind: faq
private: true
---

## Overview

This guide walks Datadog Partners through the following steps on how to create a partner log integration.

1. [Send logs to Datadog](#send-logs-to-datadog)
2. [Set up the log integration assets in your Datadog partner account](#set-up-the-log-integration-assets-in-your-datadog-partner-account)
3. [Review and deploy the integration](#review-and-deploy-the-integration)

## Send logs to Datadog

Send logs to Datadog using the log ingestion HTTP endpoint. See the [Send Logs API documentation][1] for more information on the endpoint. 

The following are guidelines for building the integration:

1. The `source` and `service` tags must be in lowercase. 

2. Set the `source` tag to the integration name.

    Datadog recommends that the `source` tag be set to `<integration_name>` and that the `service` tag be set to the name of the service that produces the telemetry. For example, the `service` tag can be used to differentiate logs by product line. 
    
    For cases where there aren't different services, set `service` to the same value as `source`. The `source` and `service` tags must be non-editable by the user because the tags are used to enable integration pipelines and dashboards. The tags can be set in the payload or through the query parameter, for example, `?ddsource=example&service=example`.

3. The integration must support all Datadog sites.

    The user must be able to choose between the different Datadog sites whenever applicable. See [Getting Started with Datadog Sites][2] for more information about site differences. The endpoints for each site are as follows:
    | Site    | HTTP Endpoint                           |
    | ------- | --------------------------------------- |
    | US1     | http-intake.logs.datadoghq.com          |
    | US3     | http-intake.logs.us3.datadoghq.com      |
    | US5     | http-intake.logs.us5.datadoghq.com      |
    | US1-FED | http-intake.logs.ddog-gov.datadoghq.com |
    | EU1     | http-intake.logs.datadoghq.eu           |

4. Allow the user to attach custom tags while setting up the integration.

    Datadog recommends that manual user tags be sent as key-value attributes in the JSON body. If it's not possible to add manual tags to the logs, you can send the tags using the `ddtags=<TAGS>` query parameter. See the [Send Logs API documentation][1] for examples.

5. Send data without arrays in the JSON body whenever possible. 

    While it's possible to send some data as tags, Datadog recommends that data be sent in the JSON body and that arrays are avoided. This gives users greater flexibility with the operations they can carry out on the data in the Datadog log platform. 

6. Do not log Datadog API keys.

    Datadog API keys can either be passed in the header or as part of the HTTP path. See [Send Logs API documentation][1] for examples. Datadog recommends using methods that do not log the API key in your setup.

7. Do not use Datadog application keys.

    The Datadog application key is different from the API key and is not required to send logs using the HTTP endpoint. 

## Set up the log integration assets in your Datadog partner account 

### Set up the log pipeline 

Logs sent to Datadog are processed in log pipelines to standardize them for easier search and analysis. To set up the pipeline:

1. Navigate to [Logs Pipelines][3].
2. Click **Add a new pipeline**.
3. In the **Filter** field, enter the unique `source` that defines the log source for the partner logs. For example, `source:okta` for the Okta integration. **Note**: Make sure that logs sent through the integration are tagged with the correct source tags before they are sent to Datadog.
4. Optionally, add tags and a description.
5. Click **Create**.

Within your pipelines, you can add processors to restructure your data and generate attributes. For example:

- Use the [date remapper][4] to define the official timestamp for logs.
- Use the attribute [remapper][5] to remap attribute keys to [Datadog standard attributes][6]. For example, an attribute key that contains the client IP must be remapped to `network.client.ip` so that Datadog can display partner logs in out-of-the-box dashboards.
- Use the [service remapper][7] to remap the `service` attribute or to set it to the same value as the `source` attribute.
- Use the [grok processor][8] to extract values in the logs for better searching and analytics. 
- Use the [message remapper][9] to define the official message of the log and to make certain attributes full text searchable.

See [Processors][10] for more information and a list of all log processors.

### Set up facets in the Log Explorer

All fields that customers might use to search and analyze logs need to be added as facets. Facets are also used in dashboards. 

There are two types of facets:

- A facet is used to get relative insights and to count unique values.
- A measure is a type of facet used for searches over a range.  For example, adding a measure for latency duration allows users to search for all logs above a certain latency. **Note**: Define the [unit][11] of a measure facet based on what the attribute represents.

To add a new facet or measure:
1. Click on a log that contains the attribute you want to add a facet or measure for. 
2. In the log panel, click the cog next to the attribute.
3. Select **Create facet/measure for @attribute**.
4. For a measure, to define the unit, click **Advanced options**. Select the unit based on what the attribute represents.
4. Click **Add**.

Group similar facets together to easily navigate the facet list. For fields specific to the integration logs, create a group with the same name as the `source` tag. 

1. In the log panel, click the cog next to the attribute that you want in the new group.
2. Select **Edit facet/measure for @attribute**. If there isn't a facet for the attribute yet, select **Create facet/measure for @attribute**.
3. Click **Advanced options**.
4. In the **Group** field, enter the name of the new group, and select **New group**.
5. Click **Update**.

See [Logs Facets documentation][12] for more information.

See the [default standard attribute list][6] for the Datadog standard attributes that go under their own specific groups. 

## Review and deploy the integration

Datadog reviews the partner integration and provides feedback to the partner. In turn, the partner reviews and makes changes accordingly. This review process is done over email.

Once reviews are complete, Datadog creates and deploys the new log integration assets.

[1]: /api/latest/logs/?code-lang=go#send-logs
[2]: /getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: /logs/log_configuration/processors/?tab=ui#remapper
[6]: /logs/log_configuration/attributes_naming_convention/#default-standard-attribute-list
[7]: /logs/log_configuration/processors/?tab=ui#service-remapper
[8]: /logs/log_configuration/processors/?tab=ui#grok-parser
[9]: /logs/log_configuration/processors/?tab=ui#log-message-remapper
[10]: /logs/log_configuration/processors/
[11]: /logs/explorer/facets/#units
[12]: /logs/explorer/facets/

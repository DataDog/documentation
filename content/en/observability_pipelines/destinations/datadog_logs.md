---
title: Datadog Logs Destination
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Datadog Logs destination to send logs to Datadog Log Management. You can also use [AWS PrivateLink](#aws-privatelink) to send logs from Observability Pipelines to Datadog.

## Setup

Set up the Datadog Logs destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

#### Optional settings

##### Route logs to multiple Datadog organizations

If you want to route to multiple Datadog organizations, click **Route to Multiple Organizations**.

- If you haven't added any organizations yet, enter organization details as described in the [Add a Datadog organization](#add-an-organization) section.
- If you have already added organizations, you can:
  - Click on an organization in the table to edit or delete it.
  - Use the search bar to find a specific organization by name, filter query, or Datadog site, and then select the organization to edit or delete it.
  - Click **Save** to add the organization.

###### Add an organization

1. Enter a name for the organization.
	- **Note**: The name does not have to correspond to the actual name of the Datadog organization.
1. Define a filter query.
1. Select the Datadog organization's site.
1. Enter the identifier for the API key for that Datadog organization.
	- **Note**: Only enter the identifier for the API key. Do **not** enter the actual API key.
1. Click **Save**.

##### Buffering options

Toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
- If left disabled, the maximum size for buffering is 500 events.
- If enabled:
	1. Select the buffer type you want to set (**Memory** or **Disk**).
	1. Enter the buffer size and select the unit.

### Set secrets

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no secret identifiers for this destination.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 4,250,000       | 5                   |

{{< site-region region="us,ap1,ap2" >}}

## AWS PrivateLink

To send logs from Observability Pipelines to Datadog using AWS PrivateLink, see [Connect to Datadog over AWS PrivateLink][1] for setup instructions. The two endpoints you need to set up are:

- Logs (User HTTP intake): {{< region-param key=http_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Note**: The `obpipeline-intake.datadoghq.com` endpoint is used for Live Capture and is not available as a PrivateLink endpoint.

[1]: /agent/guide/private-link/?tab=crossregionprivatelinkendpoints

{{< /site-region >}}
{{< site-region region="us3" >}}

## Azure Private Link

To send logs from Observability Pipelines to Datadog using Azure Private Link, see [Connect to Datadog over Azure Private Link][1] for setup instructions. The two endpoints you need to set up are:

- Logs (User HTTP intake): `http-intake.logs.us3.datadoghq.com`
- Remote Configuration: `config.us3.datadoghq.com`

**Note**: The `obpipeline-intake.datadoghq.com` endpoint is used for Live Capture and is not available as a Private Link endpoint.

[1]: /agent/guide/azure-private-link/?site=us3

{{< /site-region >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching

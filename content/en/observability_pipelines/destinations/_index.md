---
title: Destinations
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Use the Observability Pipelines Worker to send your processed logs to different destinations.

Select and set up your destinations when you [set up a pipeline][2]. This is step 4 in the pipeline setup process:

1. Navigate to [Observability Pipelines][1].
1. Select a template.
1. Select and set up your source.
1. Select and set up your destinations.
1. Set up your processors.
1. Install the Observability Pipelines Worker.

{{< whatsnext desc="The available Observability Pipelines destinations are:" >}}
    {{< nextlink href="observability_pipelines/destinations/#amazon-opensearch" >}}Amazon OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/amazon_s3" >}}Amazon S3{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/azure_storage" >}}Azure Storage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#datadog-log-management" >}}Datadog Log Management{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#elasticsearch" >}}Elasticsearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#google-chronicle" >}}Google Chronicle{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/google_cloud_storage" >}}Google Cloud Storage{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#opensearch" >}}OpenSearch{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#rsyslog-or-syslog-ng" >}}Rsyslog or Syslog-ng{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#splunk-http-event-collector-hec" >}}Splunk HTTP Event Collector (HEC){{< /nextlink >}}
    {{< nextlink href="observability_pipelines/destinations/#sumo-logic-hosted-collector" >}}Sumo Logic Hosted Collector{{< /nextlink >}}
{{< /whatsnext >}}

### Event batching {#event-batching-intro}

Observability Pipelines destinations send events in batches to the downstream integration. A batch of events is flushed when one of the following parameters is met:

- Maximum number of events
- Maximum number of bytes
- Timeout (seconds)

For example, if a destination's parameters are:

- Maximum number of events = 2
- Maximum number of bytes = 100,000
- Timeout (seconds) = 5

And the destination receives 1 event in a 5-second window, it flushes the batch at the 5-second timeout.

If the destination receives 3 events within 2 seconds, it flushes a batch with 2 events and then flushes a second batch with the remaining event after 5 seconds. If the destination receives 1 event that is more than 100,000 bytes, it flushes this batch with the 1 event.

**Note**: The Syslog destination does not batch events.

## Amazon OpenSearch

Set up the Amazon OpenSearch destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching](#event-batching-intro) for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

## Datadog Log Management

### Set up the destination

{{% observability_pipelines/destination_settings/datadog %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching](#event-batching-intro) for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 4,250,000       | 5                   |

## Elasticsearch

Set up the Elasticsearch destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/elasticsearch %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching](#event-batching-intro) for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

## Google Chronicle

Set up the Google Chronicle destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/chronicle %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching](#event-batching-intro) for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 1,000,000       | 15                  |

## OpenSearch

Set up the OpenSearch destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/opensearch %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching](#event-batching-intro) for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

## Rsyslog or Syslog-ng

Set up the Rsyslog or Syslog-ng destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/syslog %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

### How the destination works

#### Event batching

The Syslog destination does not batch events.

## Splunk HTTP Event Collector (HEC)

Set up the Splunk HEC destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/splunk_hec %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching](#event-batching-intro) for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 1,000,000       | 1                   |

## Sumo Logic Hosted Collector

Set up the Sumo Logic destination and its environment variables when you [set up a pipeline][2]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/sumo_logic %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching](#event-batching-intro) for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/set_up_pipelines/
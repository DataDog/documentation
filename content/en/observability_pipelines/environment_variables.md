---
title: Environment Variables
disable_toc: false
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Some Observability Pipelines components require setting up environment variables. This document lists the environments variables for the different sources, processors, and destinations.

## Component environment variables

{{< tabs >}}
{{% tab "Sources" %}}

### Amazon Data Firehose
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

### Amazon S3
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_s3 %}}

### Datadog Agent
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

### Fluent
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

### Google Pub/Sub
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

### HTTP Client
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

### HTTP Server
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

### Kafka
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

### Logstash
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

### Splunk HEC
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

### Splunk TCP
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

### Sumo Logic
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

### Syslog
{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}

{{% tab "Processors" %}}

### Add environment variables

- Allowlist
  - The allowlist is a comma-separated list of environment variables you want to pull values from and use with this processor.
  - Stored in the environment variable `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST`.

{{% /tab %}}
{{% tab "Destinations" %}}

### Amazon OpenSearch
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

### Chronicle
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

### CrowdStrike NG-SIEM
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

### Datadog
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

### Datadog Archives
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

### Elasticsearch
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

### Microsoft Sentinel
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

### New Relic
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

### OpenSearch
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

### SentinelOne
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

### Socket
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

### Splunk HEC
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

### Sumo Logic
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

### Syslog
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

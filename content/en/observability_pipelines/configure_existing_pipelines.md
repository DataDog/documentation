---
title: Configure Existing Pipelines
kind: documentation
disable_toc: false
---

## Overview

For existing pipelines in Observability Pipelines, you can update processors in the Observability Pipelines UI. But if you want to update source and destination environment variables, you need to manually update the Worker with the new values.

## Update an existing pipeline

1. Navgate to [Observability Pipelines][LINK].
1. Select the pipeline you want to update.
1. Click **Edit Pipeline in the top right corner.

### Source environment variables

These are the source environment variables that you can update:

{{< tabs >}}
{{% tab "Splunk HEC" %}}

`SPLUNK_TOKEN`
: The Splunk HEC token for the Splunk indexer from where you want to send logs to the Observability Pipelines Worker.

`SPLUNK_HEC_ENDPOINT_URL`
: The Observability Pipelines Worker listens to this Splunk HTTP endpoint to receive logs originally intended for the Splunk indexer. For example `https://<your_account>.splunkcloud.com:8088`.  
**Note**: `/services/collector/event` is automatically appended to the endpoint.

{{% /tab %}}
{{% tab "Splunk TCP" %}}

`DD_OP_SOURCE_SPLUNK_TCP_ADDRESS`
: The Observbaility Pipelines Worker listens to this socket address to receive logs from the Splunk Forwarder.

{{% /tab %}}
{{% tab "Sumo Logic" %}}

`DD_OP_SOURCE_SUMO_LOGIC_ADDRESS`
: The Observability Pipelines Worker listens to this socket address to receive logs from the Sumo Logic Hosted Collector.

{{% /tab %}}
{{% tab "Datadog" %}}

`DD_OP_SOURCE_DATADOG_AGENT_ADDRESS`
: The Observability Pipelines Worker listens to this socket address to receive logs from the Datadog Agent.

{{% /tab %}}
{{< /tabs >}}

### Destination environment variables

These are the destination environment variables that you can update:

{{< tabs >}}
{{% tab "Splunk HEC" %}}

`DD_OP_DESTINATION_SPLUNK_HEC_TOKEN`
: The Splunk HEC token for the Splunk indexer you want to send logs from the Observability Pipelines Worker to.

`DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL`
: TKTK

{{% /tab %}}
{{% tab "Sumo Logic" %}}

`DD_OP_DESTINATION_SUMO_LOGIC_HTTP_COLLECTOR_URL`
: The Sumo Logic collection endpoint.

{{% /tab %}}
{{% tab "Datadog" %}}

TKTK

{{% /tab %}}
{{% tab "Datadog Log Archives" %}}

`DD_OP_DESTINATION_DATADOG_ARCHIVES_BUCKET`
: The name of the S3 bucket for storing archives.

`DD_OP_DESTINATION_ARCHIVES_REGION`
: The AWS region of the target service.

`DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_ACCESS_KEY_ID`
: The AWS access key ID for the S3 archive bucket.

`DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_SECRET_KEY`
: The AWS secret access key ID for the S3 archive bucket.

{{% /tab %}}
{{< /tabs >}}

### Update the Worker

You need to manually update your Worker with the new values for the environment variables. 

#### Example

For example, if you want to update the following Splunk source variables:

- `SPLUNK_TOKEN=<new_token>`
- `SPLUNK_HEC_ENDPOINT_URL=<new_url>`

And also update the following Datadog Log Archives destination variables:
- `DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_ACCESS_KEY_ID=<new_access_key_id>`
- `DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_SECRET_ACCESS_KEY=<new_access_key>`

Run the following command for your environment to update the Worker:

{{< tabs >}}
{{% tab "Docker" %}}

```
docker run -i -e DD_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
	-e DD_OP_PIPELINE_ID=dbfdba26-e14b-11ee-893c-da7ad0900002 \
	-e DD_SITE=datadoghq.com \
    -e SPLUNK_TOKEN=<new_token> \
    -e SPLUNK_HEC_ENDPOINT_URL=<new_url> \
	-e DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_ACCESS_KEY_ID=<new_access_key_id> \
	-e DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_SECRET_ACCESS_KEY=<new_access_key> \
	-p 8282:8282 \
	datadog/observability-pipelines-worker run
```

{{% /tab %}}
{{% tab "Amazon EKS" %}}
  
TKTK

{{% /tab %}}
{{% tab "Azure AKS" %}}  

TKTK

{{% /tab %}}

{{% tab "Google GKE" %}}  

TKTK

{{% /tab %}}
{{% tab "Linux (APT)" %}}

TKTK

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

TKTK

{{% /tab %}}
{{% tab "CloudFormation" %}}

TKTK

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

TKTK
  
{{% /tab %}}
{{< /tabs >}}

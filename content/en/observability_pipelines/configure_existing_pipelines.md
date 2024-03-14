---
title: Configure Existing Pipelines
kind: documentation
disable_toc: false
---

## Overview

For existing pipelines in Observability Pipelines, you can update processors in the Observability Pipelines UI. But if you want to update source and destination environment variables, you need to manually update the Worker with the new values.

## Update an existing pipeline

1. Navigate to [Observability Pipelines][LINK].
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

Select the environment your Worker is running in:

{{< tabs >}}
{{% tab "Docker" %}}

The general command to update the Worker is:

```
docker run -i -e DD_API_KEY=<datadog_api_key> \
	-e DD_OP_PIPELINE_ID=<op_pipeline-id> \
	-e DD_SITE=<datadog_site> \
        -e <source_env_variable> \
        -e <destination_env_variable> \
	-p 8282:8282 \
	datadog/observability-pipelines-worker run
```

You need to replace the following placeholders:
- `<datadog_api_key>` with the Datadog API key.
- `<op_pipeline_id>` with the pipeline ID. To get the pipeline ID:
    - Navigate to your pipeline.
    - Click FILL IN
- `<datadog_site>` with {{< region-param key="dd_site" code="true" >}}. Make sure you have the correct site region selected in the upper right side of the page to show the site region URL you need to use.
- `<source_env_variable>` with the source environment variables if you are updating it.
- `<destination_env_variable>` with the destination environment variables if you are updating it.

#### Example

For example, if you want to update the following Splunk source variables:
- `SPLUNK_TOKEN=<new_token>`
- `SPLUNK_HEC_ENDPOINT_URL=<new_url>`

And also update the following Datadog Log Archives destination variables:
- `DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_ACCESS_KEY_ID=<new_access_key_id>`
- `DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_SECRET_ACCESS_KEY=<new_access_key>`

You need to run the following command to update the Worker.

```
docker run -i -e DD_API_KEY=<datadog_api_key> \
	-e DD_OP_PIPELINE_ID=<op_pipeline-id> \
	-e DD_SITE=<datadog_site> \
        -e SPLUNK_TOKEN=<new_token> \
        -e SPLUNK_HEC_ENDPOINT_URL=<new_splunk_hec_url> \
	-e DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_ACCESS_KEY_ID=<new_aws_access_key_id> \
	-e DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_SECRET_ACCESS_KEY=<new_aws_access_key> \
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
{{% tab "Linux" %}}

TKTK

{{% /tab %}}
{{% tab "CloudFormation" %}}

TKTK

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

TKTK

{{% /tab %}}
{{< /tabs >}}

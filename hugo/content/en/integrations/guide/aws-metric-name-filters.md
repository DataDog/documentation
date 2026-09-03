---
title: Configure AWS Metric Name Filters with the API
description: "Use the Datadog API to preview and configure AWS CloudWatch metric name filters."
further_reading:
- link: "/api/latest/aws-integration/#update-an-aws-integration"
  tag: "API"
  text: "Update an AWS integration"
- link: "/api/latest/aws-integration/#get-aws-metric-name-filter-preview"
  tag: "API"
  text: "Get AWS metric name filter preview"
- link: "/getting_started/integrations/aws/#filter-metrics-by-metric-name"
  tag: "Documentation"
  text: "Filter AWS metrics by metric name"
---

AWS metric name filters control which CloudWatch metric names Datadog collects for a namespace in an AWS account integration. Use an **include** filter to collect only matching Datadog metric names, or an **exclude** filter to collect all metric names except matching ones.

Metric name filters apply after the namespace is enabled for metric collection. Each filter applies to one CloudWatch namespace, and each namespace can use only one filter mode: `include_only` or `exclude_only`.

<div class="alert alert-info">
Metric name filters cannot remove <code>aws.ec2.cpuutilization</code> or <code>aws.lambda.invocations</code>. Datadog always collects these required metrics.
</div>

## Before you begin

You need:

- A Datadog API key and application key with the `aws_configuration_read` and `aws_configuration_edit` permissions.
- The AWS account ID for the integration you want to update.
- Your Datadog site. Your site is {{< region-param key="dd_site" code="true" >}}.

Set these environment variables before running the examples:

```shell
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APPLICATION_KEY>"
export AWS_ACCOUNT_ID="<AWS_ACCOUNT_ID>"
```

## Find the AWS account config ID

The update and preview endpoints use the Datadog AWS account config ID, not the AWS account ID. To find the config ID, call the [List all AWS integrations][1] endpoint and filter by AWS account ID:

```shell
curl -X GET "https://api.${DD_SITE}/api/v2/integration/aws/accounts?aws_account_id=${AWS_ACCOUNT_ID}" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

In the response, use the `data.id` value for the matching account config:

```shell
export AWS_ACCOUNT_CONFIG_ID="<AWS_ACCOUNT_CONFIG_ID>"
```

## Preview saved filters

To preview the effect of the filters already saved on an account config, call the [Get AWS metric name filter preview][2] endpoint:

```shell
curl -X GET "https://api.${DD_SITE}/api/v2/integration/aws/accounts/${AWS_ACCOUNT_CONFIG_ID}/metric_name_filter_preview" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

The response lists each affected namespace, the filter patterns that matched metric names, and whether each resulting Datadog metric name is filtered.

## Preview a proposed filter

To preview filters before saving them, call the [Preview AWS metric name filter][3] endpoint. This request does not update the account config.

The following example previews an include filter for EC2 network metrics:

```shell
curl -X POST "https://api.${DD_SITE}/api/v2/integration/aws/accounts/${AWS_ACCOUNT_CONFIG_ID}/metric_name_filter_preview" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF
{
  "data": {
    "type": "metric_name_filter_preview",
    "attributes": {
      "metric_name_filters": [
        {
          "namespace": "AWS/EC2",
          "include_only": [
            "aws.ec2.network_*"
          ]
        }
      ]
    }
  }
}
EOF
```

Use `exclude_only` instead of `include_only` to preview collecting all metric names for a namespace except matching patterns:

```json
{
  "namespace": "AWS/EC2",
  "exclude_only": [
    "aws.ec2.network_*"
  ]
}
```

Filter patterns support lowercase letters, numbers, `.`, `_`, and `*`.

## Save metric name filters

To save filters, update the AWS account integration config and set `data.attributes.metrics_config.metric_name_filters`.

The following example saves an include filter for EC2 network metrics:

```shell
curl -X PATCH "https://api.${DD_SITE}/api/v2/integration/aws/accounts/${AWS_ACCOUNT_CONFIG_ID}" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF
{
  "data": {
    "type": "account",
    "attributes": {
      "aws_account_id": "${AWS_ACCOUNT_ID}",
      "metrics_config": {
        "metric_name_filters": [
          {
            "namespace": "AWS/EC2",
            "include_only": [
              "aws.ec2.network_*"
            ]
          }
        ]
      }
    }
  }
}
EOF
```

When updating an existing account config, preserve any existing `metrics_config` fields you want to keep in the request body.

## Verify the saved filters

After saving the filters, call the [Get AWS metric name filter preview][2] endpoint again to confirm which metric names are filtered:

```shell
curl -X GET "https://api.${DD_SITE}/api/v2/integration/aws/accounts/${AWS_ACCOUNT_CONFIG_ID}/metric_name_filter_preview" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

You can also call the [Get an AWS integration by config ID][4] endpoint and confirm the saved filters are present under `data.attributes.metrics_config.metric_name_filters`.

[1]: /api/latest/aws-integration/#list-all-aws-integrations
[2]: /api/latest/aws-integration/#get-aws-metric-name-filter-preview
[3]: /api/latest/aws-integration/#preview-aws-metric-name-filter
[4]: /api/latest/aws-integration/#get-an-aws-integration-by-config-id

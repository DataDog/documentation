---
title: Changes to AWS Metric Tag Filtering
private: true
description: "How AWS metric tag filters move from namespace scoping to resource-type scoping, which metrics change behavior, and how to migrate off the v1 filtering API."
further_reading:
- link: "/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS integration"
- link: "/api/latest/aws-integration/"
  tag: "API"
  text: "AWS Integration API"
---

## Overview

Datadog is changing how AWS metric tag filters are stored and evaluated. Previously, a tag filter was scoped to a CloudWatch **namespace** and written as a comma-separated list of tag terms. These filters move into a single field that supports:

- Scoping a filter to a specific AWS **resource type** (for example, an ELB load balancer or an SQS queue) instead of an entire namespace
- Writing richer tag expressions with explicit `AND`, `OR`, and `NOT` operators instead of a flat comma-separated list

For most organizations, this change requires no action, and existing filters are preserved through the migration. A few cases change how specific metrics are scoped. For details, see the [Metric behavior changes](#metric-behavior-changes) section.

As part of this change, the v1 AWS integration tag filtering API is deprecated. See the [Migrate off the v1 filtering API](#migrate-off-the-v1-filtering-api) section.

## Timeline

- **Resource-type scoping (available November 17, 2026)**: AWS metric tag filters move from CloudWatch namespace scoping to resource-type scoping. Your existing filters are preserved, and most organizations see no change in collected metrics. For the cases that do change, see the [Metric behavior changes](#metric-behavior-changes) section. Starting November 17, 2026, you can view and configure resource-type tag filters in the [AWS integration configuration][2] and through the [v2 AWS Integration API][1] (`resource_type_tag_filters`).
- **v1 filtering API and `tag_filters` sunset (March 17, 2027)**: The v1 filtering API and the v2 `tag_filters` field manage the same legacy filters, and both are sunset on this date. After the sunset, `resource_type_tag_filters` is the only supported way to manage AWS metric tag filtering through the API, for all configuration paths, including Terraform.

## Why this change

A CloudWatch namespace can contain metrics for more than one kind of resource. Scoping a filter to an entire namespace means a filter cannot target a single resource type, and the comma-separated format cannot express anything beyond a flat list of terms.

Resource-type scoping lets a filter apply to one specific resource type, and the new expression format supports boolean logic. The result is more precise control over which AWS metrics Datadog collects.

## Who is affected

You are affected if both of the following are true:

- You have the Datadog AWS integration installed.
- You have one or more AWS metric tag filters configured.

Most affected organizations see no change in collected metrics. To determine whether any of your filters fall into a case that changes behavior, review the [Metric behavior changes](#metric-behavior-changes) section.

## Metric behavior changes

After resource-type scoping takes effect for your organization, your existing filters continue to apply, except in the following cases, where a metric can no longer be scoped the same way.

### Step Functions account-level and service-integration metrics

Some Step Functions (`AWS/States`) metrics are reported at the account level and are not tied to a specific resource. Because a resource-type filter has no resource to match on, it no longer drops these metrics, and Datadog collects them. Service-integration metrics are also not associated with a specific AWS resource type, so the same filter no longer drops them either.

If you had a Step Functions tag filter before migration, that filter no longer drops the following metrics:

_Account-level metrics:_

- `aws.states.consumed_capacity`
- `aws.states.throttled_events`
- `aws.states.provisioned_bucket_size`
- `aws.states.provisioned_refill_rate`

_Service-integration metrics:_

- `aws.states.service_integrations_succeeded`
- `aws.states.service_integrations_failed`
- `aws.states.service_integrations_timed_out`
- `aws.states.service_integrations_started`
- `aws.states.service_integrations_scheduled`
- `aws.states.service_integration_time`
- `aws.states.service_integration_run_time`
- `aws.states.service_integration_schedule_time`

### Step Functions Lambda-invocation metrics

Step Functions metrics that describe Lambda invocations resolve to the `lambda/function` resource type. They match your **AWS Lambda** tag filter instead of your Step Functions filter. This affects:

- `aws.states.lambda_functions_succeeded`
- `aws.states.lambda_functions_failed`
- `aws.states.lambda_functions_timed_out`
- `aws.states.lambda_functions_started`
- `aws.states.lambda_functions_scheduled`
- `aws.states.lambda_function_time`
- `aws.states.lambda_function_run_time`
- `aws.states.lambda_function_schedule_time`

### Amazon DocumentDB and Amazon Neptune metrics

Amazon DocumentDB and Amazon Neptune metrics resolve to the `rds` resource type, so your **Amazon RDS** tag filter also applies to them. If your RDS filter excludes resources, Datadog stops collecting matching DocumentDB and Neptune metrics.

## Filter term normalization

When a legacy comma-separated filter moves to the new expression format, the commas become `AND` operators and some terms are normalized. For example, the legacy filter `datadog:monitored,env:prod team` becomes `datadog:monitored AND env:prod_team`, where the space in `prod team` is converted to an underscore. The filter continues to match the same metrics; only its stored text changes. No action is required.

## Migrate off the v1 filtering API

The v1 AWS integration tag filtering API is deprecated and is scheduled for sunset on March 17, 2027:

- **Endpoint**: `/api/v1/integration/aws/filtering`
- **Reference**: [AWS Integration API documentation][1]

Manage your AWS metric tag filters through the [AWS integration configuration][2] in Datadog, or through the [v2 AWS Integration API][1]. After the sunset date, the v1 endpoint no longer creates, updates, or deletes filters. Your existing filters are preserved; manage them through the supported paths instead.

Alongside the v1 API, the `tag_filters` field in the v2 AWS metrics configuration is deprecated in favor of the `resource_type_tag_filters` field. The v1 endpoint and the `tag_filters` field manage the same legacy filters, so the same sunset applies to both. The `tag_filters` field continues to apply during the migration, but configure new filters using `resource_type_tag_filters` instead. After you set `resource_type_tag_filters` for an account, `tag_filters` no longer controls which metrics are collected for that account.

### If you use Terraform

If you manage AWS tag filters with the Datadog Terraform provider, no action is required for the API migration. Datadog Terraform provider version 4.30.0 and later supports resource-type tag filters through the `resource_type_tag_filters` block on the `datadog_integration_aws_account` resource. The `tag_filters` block is deprecated in favor of `resource_type_tag_filters`, and the two are mutually exclusive on an account. On earlier provider versions, your existing `tag_filters` configuration is left untouched and continues to apply without errors or drift.

<div class="alert alert-warning">After resource-type scoping takes effect for your organization, your Terraform <code>tag_filters</code> continue to control filtering until you make a manual change to the resource-type tag filters through the Datadog UI or v2 API. After that point, your Terraform <code>tag_filters</code> no longer control which metrics are filtered. To keep managing filters in Terraform, move your configuration to <code>resource_type_tag_filters</code>.</div>

## Next steps

1. Review your AWS metric tag filters on Step Functions, Amazon RDS, and AWS Lambda against the cases in the [Metric behavior changes](#metric-behavior-changes) section.
2. Confirm that the metrics listed in the [Metric behavior changes](#metric-behavior-changes) section are collected or filtered the way you expect, and update any dashboards or monitors that rely on them.
3. If you call the v1 filtering endpoint from scripts, CI jobs, or other integrations, move those calls to the [AWS integration configuration][2] or the v2 AWS Integration API.

## Need help?

If you need help identifying which of your filters, monitors, or dashboards are affected, contact [Datadog Support][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/aws-integration/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: /help/

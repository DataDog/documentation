---
title: Migrating AWS Metric Tag Filters to Resource-Type Scoping
private: true
description: "How AWS metric tag filters move from namespace scoping to resource-type scoping, which metrics change behavior, and how to migrate off the v1 filtering API."
further_reading:
- link: "/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS integration"
- link: "/integrations/guide/aws-metric-name-filters/"
  tag: "Documentation"
  text: "AWS metric tag filters"
- link: "/api/latest/aws-integration/"
  tag: "API"
  text: "AWS Integration API"
---

## Overview

Datadog is changing how AWS metric tag filters are stored and evaluated. Today, a tag filter is scoped to a CloudWatch **namespace** and written as a comma-separated list of tag terms. These filters move into a single field that supports:

- Scoping a filter to a specific AWS **resource type** (for example, an ELB load balancer or an SQS queue) instead of an entire namespace.
- Richer tag expressions using explicit `AND`, `OR`, and `NOT` operators instead of a flat comma-separated list.

For most organizations this change is transparent and requires no action. Existing filters are preserved through the migration. A few cases change how specific metrics are scoped, and those cases are described in [Metric behavior changes](#metric-behavior-changes).

As part of this change, the **v1** AWS integration tag filtering API is deprecated. See [Migrate off the v1 filtering API](#migrate-off-the-v1-filtering-api).

## Why this change

A CloudWatch namespace can contain metrics for more than one kind of resource. Scoping a filter to an entire namespace means a filter cannot target a single resource type, and the comma-separated format cannot express anything beyond a flat list of terms.

Resource-type scoping lets a filter apply to one specific resource type, and the new expression format supports boolean logic. The result is more precise control over which AWS metrics Datadog collects.

## Who is affected

You are affected if both of the following are true:

- You have the Datadog AWS integration installed.
- You have one or more AWS metric tag filters configured.

Most affected organizations see no change in collected metrics. Review [Metric behavior changes](#metric-behavior-changes) to determine whether any of your filters fall into a case that changes behavior.

## Metric behavior changes

After your organization is migrated, your existing filters continue to apply, except in the cases below, where a metric can no longer be scoped the same way.

### Step Functions account-level and service-integration metrics

Some Step Functions (`AWS/States`) metrics are reported at the account level and are not tied to a specific resource. Because a resource-type filter has no resource to match on, it no longer drops these metrics, and they start being collected.

If you have a tag filter on Step Functions today, the following metrics are no longer dropped by that filter:

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

Step Functions metrics that describe Lambda invocations resolve to the `lambda/function` resource type. They now match your **AWS Lambda** tag filter instead of your Step Functions filter. This affects:

- `aws.states.lambda_functions_succeeded`
- `aws.states.lambda_functions_failed`
- `aws.states.lambda_functions_timed_out`
- `aws.states.lambda_functions_started`
- `aws.states.lambda_functions_scheduled`
- `aws.states.lambda_function_time`
- `aws.states.lambda_function_run_time`
- `aws.states.lambda_function_schedule_time`

### Amazon DocumentDB and Amazon Neptune metrics

Amazon DocumentDB and Amazon Neptune metrics resolve to the `rds` resource type, so your **Amazon RDS** tag filter now also applies to them. If your RDS filter excludes resources, matching DocumentDB and Neptune metrics can stop being collected.

## Filter term normalization

When a legacy comma-separated filter moves to the new expression format, some terms are normalized. For example, an embedded space is converted to an underscore. The filter continues to match the same metrics; only its stored text changes. No action is required.

## Migrate off the v1 filtering API

The v1 AWS integration tag filtering API is deprecated:

- Endpoint: `https://api.datadoghq.com/api/v1/integration/aws/filtering`
- Reference: [AWS Integration API documentation][1]

Manage your AWS metric tag filters through the [AWS integration configuration][2] in Datadog, or through the v2 AWS Integration API. After the v1 endpoint is sunset, requests to it no longer take effect. Existing filters are not deleted; you manage them through the supported paths instead.

### If you use Terraform

If you manage AWS tag filters with the Datadog Terraform provider, no action is required for the API migration yet. Support for the new resource-type filters in the Datadog Terraform provider follows in an upcoming release. Until then, your existing `tag_filters` configuration is left untouched and continues to apply without errors or drift.

After your organization is migrated, your Terraform `tag_filters` continue to control filtering until you make a manual change to the resource-type tag filters through the Datadog UI or v2 API. After that point, your Terraform `tag_filters` no longer control which metrics are filtered.

## What you need to do

1. Review your AWS metric tag filters on Step Functions, Amazon RDS, and AWS Lambda against the cases in [Metric behavior changes](#metric-behavior-changes).
2. Confirm the metrics listed above are collected or filtered the way you expect, and update any dashboards or monitors that rely on them.
3. If you call the v1 filtering endpoint from scripts, CI jobs, or other integrations, move those calls to the [AWS integration configuration][2] or the v2 AWS Integration API.

## Get help

If you need help identifying which of your filters, monitors, or dashboards are affected, contact [Datadog Support][3].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/aws-integration/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: /help/

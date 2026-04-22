---
title: Deprecation of Application Load Balancer Metrics Under the aws.elb Namespace
private: true
description: "Deprecation of AWS Application Load Balancer metrics in the aws.elb.* namespace: affected metrics, timeline, and migration steps."
further_reading:
- link: "/integrations/amazon_elb/"
  tag: "Documentation"
  text: "Amazon ELB integration"
- link: "/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS integration"
---

## Overview

This guide applies only to Datadog customers contacted by [Datadog Support][2] about a legacy behavior in the Datadog AWS integration. In your account, AWS Application Load Balancer (ALB) metrics are reported under both the `aws.applicationelb.*` and `aws.elb.*` namespaces. Datadog is removing this legacy dual-reporting so that ALB metrics are reported only under `aws.applicationelb.*`, which is the correct and intended namespace.

**Classic ELB metrics are not affected.** They continue to report under `aws.elb.*` as they do today.

If you use ALB metrics in monitors, dashboards, or notebooks that reference the `aws.elb.*` namespace, update those queries before the change takes effect.

## Why this change

When AWS introduced Application Load Balancers in 2016, Datadog began reporting ALB metrics under both `aws.applicationelb.*` and `aws.elb.*` to help customers migrating from Classic ELB to ALB. This dual-reporting has not been enabled for new customers since 2018.

Classic ELB and ALB report different, overlapping sets of metrics. Having the same metric names appear under two namespaces has led to confusion about what each metric represents. Removing the legacy dual-reporting makes monitoring clearer and more consistent.

## Timeline

The deprecation of legacy ALB metrics under `aws.elb.*` is scheduled for June 2026, no earlier than June 1. Use the time before then to review and update any affected monitors, dashboards, or notebooks.

## Who is affected

You are affected if all of the following are true:

- You have the Datadog AWS integration installed.
- You collect metrics from the `AWS/ApplicationELB` namespace.
- You use Application Load Balancers in one or more integrated AWS accounts.
- Your organization is in the US1 Datadog site.

**Note**: Datadog Support contacts all impacted customers directly. If you haven't been contacted, this deprecation doesn't apply to your account.

## How to identify affected queries

Metrics under `aws.elb.*` can come from either Classic ELB or Application Load Balancer. Use the tags on each metric to determine the source:

- Metrics tagged with `loadbalancer:app/*` originate from an Application Load Balancer. **These are affected.** After the change, they no longer report under `aws.elb.*`. Equivalent metrics are available under `aws.applicationelb.*`.
- Metrics tagged with `loadbalancername:*` originate from Classic ELB. **These are not affected.**

**Note**: Both Classic ELB and ALB use the `name:` tag with the load balancer's name as the value. You cannot use `name` alone to distinguish the source.

## Find affected monitors, dashboards, and notebooks

To find monitors, dashboards, and notebooks that reference an affected metric:

1. Go to the [Metrics Summary page][1] in Datadog.
2. Search for a metric from the [Metrics to update](#metrics-to-update-application-load-balancer) table below, such as `aws.elb.peak_lcus`.
3. In the metric detail panel, open **Related Assets**.
4. Review the list of monitors, dashboards, and notebooks that use the metric.
5. Update each asset as described in [What to do](#what-to-do).

If you need help identifying affected assets across your organization, contact [Datadog Support][2].

## What to do

Review your monitors, dashboards, and notebooks for queries that reference the `aws.elb.*` namespace. Based on the intent of each query, take the corresponding action:

| Query intent | Action |
| --- | --- |
| Monitor Classic ELB only | No change needed. Classic ELB metrics continue to report under `aws.elb.*`. |
| Monitor Application Load Balancer | Update queries to use the `aws.applicationelb.*` namespace instead of `aws.elb.*`. |
| Monitor both Classic ELB and Application Load Balancer | Separate the queries. Keep `aws.elb.*` for Classic ELB, and create new queries that use `aws.applicationelb.*` for Application Load Balancer. |

**Note**: Replacement metric names under `aws.applicationelb.*` match the legacy `aws.elb.*` names exactly, except for the two JWT metrics listed in the table. Those metrics have an added underscore between `jwt` and `validation` in the new name.

## Affected metrics

The sections below list every metric under `aws.elb.*`: 68 to update, 9 to verify, and 24 unaffected.

### Metrics to update (Application Load Balancer)

Today, these ALB metrics are reported under `aws.elb.*`. After the change, they are no longer reported in that namespace. Update your queries to the equivalent `aws.applicationelb.*` metric.

{{% collapse-content title="View all 68 metrics" level="h4" expanded=false %}}

| Current metric (`aws.elb.*`) | Replacement metric (`aws.applicationelb.*`) |
| --- | --- |
| `aws.elb.active_connection_count` | `aws.applicationelb.active_connection_count` |
| `aws.elb.active_zonal_shift_host_count` | `aws.applicationelb.active_zonal_shift_host_count` |
| `aws.elb.anomalous_host_count` | `aws.applicationelb.anomalous_host_count` |
| `aws.elb.app_cookie_non_stickiness_count` | `aws.applicationelb.app_cookie_non_stickiness_count` |
| `aws.elb.byoip_util_percentage` | `aws.applicationelb.byoip_util_percentage` |
| `aws.elb.client_tlsnegotiation_error_count` | `aws.applicationelb.client_tlsnegotiation_error_count` |
| `aws.elb.consumed_lcus` | `aws.applicationelb.consumed_lcus` |
| `aws.elb.desync_mitigation_mode_non_compliant_request` | `aws.applicationelb.desync_mitigation_mode_non_compliant_request` |
| `aws.elb.dropped_invalid_header_request_count` | `aws.applicationelb.dropped_invalid_header_request_count` |
| `aws.elb.elbauth_error` | `aws.applicationelb.elbauth_error` |
| `aws.elb.elbauth_failure` | `aws.applicationelb.elbauth_failure` |
| `aws.elb.elbauth_latency` | `aws.applicationelb.elbauth_latency` |
| `aws.elb.elbauth_refresh_token_success` | `aws.applicationelb.elbauth_refresh_token_success` |
| `aws.elb.elbauth_success` | `aws.applicationelb.elbauth_success` |
| `aws.elb.elbauth_user_claims_size_exceeded` | `aws.applicationelb.elbauth_user_claims_size_exceeded` |
| `aws.elb.excessive_low_reputation_packets` | `aws.applicationelb.excessive_low_reputation_packets` |
| `aws.elb.forwarded_invalid_header_request_count` | `aws.applicationelb.forwarded_invalid_header_request_count` |
| `aws.elb.grpc_request_count` | `aws.applicationelb.grpc_request_count` |
| `aws.elb.healthy_state_dns` | `aws.applicationelb.healthy_state_dns` |
| `aws.elb.healthy_state_routing` | `aws.applicationelb.healthy_state_routing` |
| `aws.elb.httpcode_elb_3xx` | `aws.applicationelb.httpcode_elb_3xx` |
| `aws.elb.httpcode_elb_5_0_0` | `aws.applicationelb.httpcode_elb_5_0_0` |
| `aws.elb.httpcode_elb_5_0_2` | `aws.applicationelb.httpcode_elb_5_0_2` |
| `aws.elb.httpcode_elb_5_0_3` | `aws.applicationelb.httpcode_elb_5_0_3` |
| `aws.elb.httpcode_elb_5_0_4` | `aws.applicationelb.httpcode_elb_5_0_4` |
| `aws.elb.httpcode_target_2xx` | `aws.applicationelb.httpcode_target_2xx` |
| `aws.elb.httpcode_target_3xx` | `aws.applicationelb.httpcode_target_3xx` |
| `aws.elb.httpcode_target_4xx` | `aws.applicationelb.httpcode_target_4xx` |
| `aws.elb.httpcode_target_5xx` | `aws.applicationelb.httpcode_target_5xx` |
| `aws.elb.httpfixed_response` | `aws.applicationelb.httpfixed_response` |
| `aws.elb.httpredirect` | `aws.applicationelb.httpredirect` |
| `aws.elb.httpredirect_url_limit_exceeded` | `aws.applicationelb.httpredirect_url_limit_exceeded` |
| `aws.elb.ipv_6processed_bytes` | `aws.applicationelb.ipv_6processed_bytes` |
| `aws.elb.ipv_6request_count` | `aws.applicationelb.ipv_6request_count` |
| `aws.elb.jwtvalidation_failure_count` | `aws.applicationelb.jwt_validation_failure_count` |
| `aws.elb.jwtvalidation_success_count` | `aws.applicationelb.jwt_validation_success_count` |
| `aws.elb.lambda_internal_error` | `aws.applicationelb.lambda_internal_error` |
| `aws.elb.lambda_target_processed_bytes` | `aws.applicationelb.lambda_target_processed_bytes` |
| `aws.elb.lambda_user_error` | `aws.applicationelb.lambda_user_error` |
| `aws.elb.low_reputation_packets_dropped` | `aws.applicationelb.low_reputation_packets_dropped` |
| `aws.elb.low_reputation_requests_denied` | `aws.applicationelb.low_reputation_requests_denied` |
| `aws.elb.mitigated_host_count` | `aws.applicationelb.mitigated_host_count` |
| `aws.elb.new_connection_count` | `aws.applicationelb.new_connection_count` |
| `aws.elb.non_sticky_request_count` | `aws.applicationelb.non_sticky_request_count` |
| `aws.elb.peak_lcus` | `aws.applicationelb.peak_lcus` |
| `aws.elb.peak_lcus.maximum` | `aws.applicationelb.peak_lcus.maximum` |
| `aws.elb.peak_lcus.samplecount` | `aws.applicationelb.peak_lcus.samplecount` |
| `aws.elb.peak_lcus.sum` | `aws.applicationelb.peak_lcus.sum` |
| `aws.elb.processed_bytes` | `aws.applicationelb.processed_bytes` |
| `aws.elb.rejected_connection_count` | `aws.applicationelb.rejected_connection_count` |
| `aws.elb.request_count_per_target` | `aws.applicationelb.request_count_per_target` |
| `aws.elb.reserved_lcus` | `aws.applicationelb.reserved_lcus` |
| `aws.elb.rule_evaluations` | `aws.applicationelb.rule_evaluations` |
| `aws.elb.target_connection_error_count` | `aws.applicationelb.target_connection_error_count` |
| `aws.elb.target_control_active_channel_count` | `aws.applicationelb.target_control_active_channel_count` |
| `aws.elb.target_control_channel_error_count` | `aws.applicationelb.target_control_channel_error_count` |
| `aws.elb.target_control_new_channel_count` | `aws.applicationelb.target_control_new_channel_count` |
| `aws.elb.target_control_processed_bytes` | `aws.applicationelb.target_control_processed_bytes` |
| `aws.elb.target_control_request_count` | `aws.applicationelb.target_control_request_count` |
| `aws.elb.target_control_request_reject_count` | `aws.applicationelb.target_control_request_reject_count` |
| `aws.elb.target_control_work_queue_length` | `aws.applicationelb.target_control_work_queue_length` |
| `aws.elb.target_response_time.average` | `aws.applicationelb.target_response_time.average` |
| `aws.elb.target_response_time.maximum` | `aws.applicationelb.target_response_time.maximum` |
| `aws.elb.target_response_time.p50` | `aws.applicationelb.target_response_time.p50` |
| `aws.elb.target_response_time.p90` | `aws.applicationelb.target_response_time.p90` |
| `aws.elb.target_response_time.p95` | `aws.applicationelb.target_response_time.p95` |
| `aws.elb.target_response_time.p99` | `aws.applicationelb.target_response_time.p99` |
| `aws.elb.target_tlsnegotiation_error_count` | `aws.applicationelb.target_tlsnegotiation_error_count` |
| `aws.elb.unhealthy_routing_request_count` | `aws.applicationelb.unhealthy_routing_request_count` |
| `aws.elb.unhealthy_state_dns` | `aws.applicationelb.unhealthy_state_dns` |
| `aws.elb.unhealthy_state_routing` | `aws.applicationelb.unhealthy_state_routing` |

{{% /collapse-content %}}

### Metrics to verify (may be affected)

These metric names exist in both Classic ELB and Application Load Balancer. Whether they are affected depends on which type of load balancer they originate from. Use the tag logic in [How to identify affected queries](#how-to-identify-affected-queries) to determine the source.

**Note**: Three of the overlap metrics change behavior when migrated, beyond the namespace swap:

- **`aws.elb.request_count`** → `aws.applicationelb.request_count`: the legacy metric is a rate (divided by 60); the replacement is a count. After migrating, add `.as_rate()` or adjust the query to treat the metric as a count.
- **`aws.elb.httpcode_elb_4xx`** and **`aws.elb.httpcode_elb_5xx`** → `aws.applicationelb.httpcode_elb_4xx` and `aws.applicationelb.httpcode_elb_5xx`: when sourced from an ALB today, the legacy metrics report values 60 times higher than the true rate. Datadog divides by 60 only for Classic ELB. The replacement metrics report correctly as counts. After migrating, expect different numbers; add `.as_rate()` or keep the query as a count.

| Metric name | Affected when source is |
| --- | --- |
| `aws.elb.healthy_host_count` | Application Load Balancer |
| `aws.elb.healthy_host_count.maximum` | Application Load Balancer |
| `aws.elb.healthy_host_count.minimum` | Application Load Balancer |
| `aws.elb.httpcode_elb_4xx` | Application Load Balancer |
| `aws.elb.httpcode_elb_5xx` | Application Load Balancer |
| `aws.elb.request_count` | Application Load Balancer |
| `aws.elb.un_healthy_host_count` | Application Load Balancer |
| `aws.elb.un_healthy_host_count.maximum` | Application Load Balancer |
| `aws.elb.un_healthy_host_count.minimum` | Application Load Balancer |

### Metrics not affected (Classic ELB)

These Classic ELB metrics continue to report under `aws.elb.*` with no change required.

{{% collapse-content title="View all 24 unaffected metrics" level="h4" expanded=false %}}

- `aws.elb.backend_connection_errors`
- `aws.elb.consumed_lbcapacity_units`
- `aws.elb.desync_mitigation_mode_non_compliant_request_count`
- `aws.elb.estimated_albactive_connection_count`
- `aws.elb.estimated_albactive_connection_count.average`
- `aws.elb.estimated_albconsumed_lcus`
- `aws.elb.estimated_albnew_connection_count`
- `aws.elb.estimated_processed_bytes`
- `aws.elb.healthy_host_count_deduped`
- `aws.elb.httpcode_backend_2xx`
- `aws.elb.httpcode_backend_3xx`
- `aws.elb.httpcode_backend_4xx`
- `aws.elb.httpcode_backend_5xx`
- `aws.elb.latency`
- `aws.elb.latency.maximum`
- `aws.elb.latency.minimum`
- `aws.elb.latency.p50`
- `aws.elb.latency.p95`
- `aws.elb.latency.p99`
- `aws.elb.spillover_count`
- `aws.elb.spillover_count.maximum`
- `aws.elb.surge_queue_length`
- `aws.elb.surge_queue_length.average`
- `aws.elb.un_healthy_host_count_deduped`

{{% /collapse-content %}}

## Get help

If you need help determining which of your monitors, dashboards, or notebooks are affected by this change, contact [Datadog Support][2]. The support team can help identify affected assets in your organization and guide you through migrating queries.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /help/

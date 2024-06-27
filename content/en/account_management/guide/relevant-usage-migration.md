---
title: Relevant Usage Migration Guide
---

## Overview

On October 1, 2024, two API endpoints will change:
- [Get hourly usage by product family][1]
- [Get usage across your account][2]

The RUM and Indexed Logs products are affected. See the following section for each API endpoint you use, and review the upcoming updates to determine what changes to make to your automation. 

## Get hourly usage by product family

The October 1, 2024 change to the [Get hourly usage by product family][1] endpoint deprecates legacy keys and provides more granular information about your RUM usage.

The following new keys describe RUM usage:
- `rum_replay_session_count`
- `rum_lite_session_count`
- `rum_browser_legacy_session_count`
- `rum_browser_replay_session_count`
- `rum_browser_lite_session_count`
- `rum_mobile_legacy_session_count_android`
- `rum_mobile_legacy_session_count_flutter`
- `rum_mobile_legacy_session_count_ios`
- `rum_mobile_legacy_session_count_reactnative`
- `rum_mobile_legacy_session_count_roku`
- `rum_mobile_lite_session_count_android`
- `rum_mobile_lite_session_count_flutter`
- `rum_mobile_lite_session_count_ios`
- `rum_mobile_lite_session_count_reactnative`
- `rum_mobile_lite_session_count_roku`

### RUM

RUM usage in the [Get hourly usage by product family][1] v2 endpoint will be shown under one RUM product family with three keys representing SKUs that your RUM usage may be billed on:
- `rum`
- `rum_replay`
- `rum_lite`

 Legacy product families and usage types will be deprecated and displayed as null in the Hourly Usage by Product Family v2 endpoint.

 #### Current response structure

 A current example of a response for the [Get hourly usage by product family][1] v2 endpoint follows:
 {{< code-block lang="json">}}
 {
  "data": [
     {
      "id": "abcd",
      "type": "usage_timeseries",
      "attributes": {
        "product_family": "rum",
        "org_name": "Test Org",
        "public_id": "abcd",
        "region": "us",
        "timestamp": "2024-04-01T00:00:00+00:00",
        "measurements": [
          {
            "usage_type": "browser_rum_units",
            "value": 100
          },
          {
            "usage_type": "mobile_rum_units",
            "value": null
          }
        ]
      }
    },
{
      "id": "abcd",
      "type": "usage_timeseries",
      "attributes": {
        "product_family": "rum_browser_sessions",
        "org_name": "Test Org",
        "public_id": "abcd",
        "region": "us",
        "timestamp": "2024-04-01T00:00:00+00:00",
        "measurements": [
          {
            "usage_type": "replay_session_count",
            "value": 100
          },
          {
            "usage_type": "session_count",
            "value": 100
          }
        ]
      }
    },
    {
      "id": "abcd",
      "type": "usage_timeseries",
      "attributes": {
        "product_family": "rum_mobile_sessions",
        "org_name": "Test Org",
        "public_id": "abcd",
        "region": "us",
        "timestamp": "2024-04-01T00:00:00+00:00",
        "measurements": [
          {
            "usage_type": "session_count",
            "value": 0
          },
          {
            "usage_type": "session_count_android",
            "value": 100
          },
          {
            "usage_type": "session_count_flutter",
            "value": 0
          },
          {
            "usage_type": "session_count_ios",
            "value": 0
          },
          {
            "usage_type": "session_count_reactnative",
            "value": 0
          },
          {
            "usage_type": "session_count_roku",
            "value": 0
          }
        ]
      }
    }
{{< /code-block >}}

## Get usage across your account

The October 1, 2024 change to the [Get usage across your account][2] endpoint deprecates legacy keys and provides more granular information about your RUM and Indexed Logs usage.

### RUM

The following keys will be deprecated:
- `rum_units_agg_sum`
- `browser_rum_units_agg_sum`
- `mobile_rum_units_agg_sum`
- `browser_rum_lite_session_count_agg_sum`
- `browser_replay_session_count_agg_sum`
- `browser_legacy_session_count_agg_sum`
- `mobile_rum_lite_session_count_agg_sum`
- `rum_browser_and_mobile_session_count_agg_sum`
- `browser_rum_legacy_and_lite_session_count_agg_sum`
- `rum_total_session_count_agg_sum`
- `rum_session_count_agg_sum`
- `mobile_rum_session_count_agg_sum`
- `mobile_rum_session_count_ios_agg_sum`
- `mobile_rum_session_count_android_agg_sum`
- `mobile_rum_session_count_reactnative_agg_sum`
- `mobile_rum_session_count_flutter_agg_sum`
- `mobile_rum_session_count_roku_agg_sum`
- `rum_indexed_events_count_agg_sum`

The following new keys describe RUM usage:
- `rum_replay_session_count`
- `rum_lite_session_count`
- `rum_browser_legacy_session_count`
- `rum_browser_replay_session_count`
- `rum_browser_lite_session_count`
- `rum_mobile_legacy_session_count_android`
- `rum_mobile_legacy_session_count_flutter`
- `rum_mobile_legacy_session_count_ios`
- `rum_mobile_legacy_session_count_reactnative`
- `rum_mobile_legacy_session_count_roku`
- `rum_mobile_lite_session_count_android`
- `rum_mobile_lite_session_count_flutter`
- `rum_mobile_lite_session_count_ios`
- `rum_mobile_lite_session_count_reactnative`
- `rum_mobile_lite_session_count_roku`

RUM usage in the [Get usage across your account][2] v1 endpoint will include three keys representing SKUs that your RUM usage may be billed on:
- `rum`
- `rum_replay`
- `rum_lite`

The SKUs that are not active for your org will be null. The 13 usage types will provide granular usage summaries under the RUM SKU.

A current example of a response for the [Get usage across your account][2] v1 endpoint follows:
{{< code-block lang="json">}}
{
  "usage": {
    "rum_session_count_agg_sum": 7441533,
    "mobile_rum_session_count_flutter_agg_sum": 0,
    "mobile_rum_session_count_ios_agg_sum": 0,
    "rum_total_session_count_agg_sum": 7618504,
    "rum_browser_and_mobile_session_count_agg_sum": 7441533,
    "mobile_rum_session_count_android_agg_sum": 0,
    "mobile_rum_session_count_reactnative_agg_sum": 0,
    "mobile_rum_session_count_roku_agg_sum": 0,
     },
    { ... // Summary usage by sub-organization }
{{< /code-block >}}

### Indexed Logs

Keys that represent total usage across all retentions will be deprecated and displayed as null. These keys are: 
- `indexed_events_count_sum`
- `live_indexed_events_agg_sum`
- `rehydrated_indexed_events_agg_sum`

The usage across all retention periods can continue be calculated by summing the individual per-retention keys. 

A current example of a response for the [Get usage across your account][2] v1 endpoint follows:
{{< code-block lang="json">}}
{
  "usage": {
    "rehydrated_indexed_events_agg_sum": 150,
    "live_indexed_events_agg_sum": 150,
    "logs_indexed_logs_usage_agg_sum_15_day": 100,
    "logs_indexed_logs_usage_agg_sum_3_day": 100,
    "logs_indexed_logs_usage_agg_sum_30_day": 100
  },
  "orgs": [
{
      "name": "Sub-Org 1",
      "public_id": "abcd",
      "uuid": "abcd",
      "region": "eu",
      "usage": {
        "indexed_events_count_sum": 200,
        "live_indexed_events_sum": 100,
        "rehydrated_indexed_events_sum": 100,
        "logs_indexed_logs_usage_sum_15_day": 100,
        "logs_indexed_logs_usage_sum_30_day": 100
      }
    },
{
{ … // Summary usage by sub-organization }
{{< /code-block >}}

[1]: /api/latest/usage-metering/#get-hourly-usage-by-product-family
[2]: /api/latest/usage-metering/#get-usage-across-your-account

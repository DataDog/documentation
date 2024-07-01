---
title: Migrate Indexed Logs and RUM in the Hourly Usage and Summary Usage APIs
---

## Overview

On October 1, 2024, two API endpoints will change:
- [Get hourly usage by product family][1]
- [Get usage across your account][2]

The RUM and Indexed Logs products are affected. See the following section for each API endpoint you use, and review the upcoming updates to determine what changes to make to your automation. 

## Get hourly usage by product family

The October 1, 2024 change to the [Get hourly usage by product family][1] endpoint deprecates legacy keys and provides more granular information about your RUM usage.

### RUM

The following legacy keys will be deprecated:
- `rum_browser_sessions` product family:
  - `replay_session_count`
  - `session_count`
- `rum_mobile_sessions` product family:
  - `session_count`
  - `session_count_android`
  - `session_count_flutter`
  - `session_count_ios`
  - `session_count_reactnative`
  - `session_count_roku`
- `rum` product_family:
  - `browser_rum_units`
  - `mobile_rum_units`
  - `rum_units`

The following new keys will be added:
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

RUM usage in the **Get hourly usage by product family** v2 endpoint will be shown under one _RUM_ product family with three keys representing SKUs that your RUM usage may be billed on:
- `rum`
- `rum_replay`
- `rum_lite`

 Legacy product families and usage types will be deprecated and displayed as null in the **Get hourly usage by product family** v2 endpoint.

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
  ]
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
}
{{< /code-block >}}

#### Upcoming response structure

After October 1, 2024, the [Get hourly usage by product family][1] v2 endpoint will have the following example structure:

{{< highlight json "hl_lines=7 14 17 22 27 31 85 99" >}}
{
  "data": [
     {
      "id": "abcd",
      "type": "usage_timeseries",
      "attributes": {
// One existing product family (rum) ; rum_browser_sessions and rum_mobile_sessions product families are deprecated below
        "product_family": "rum",
        "org_name": "Test Org",
        "public_id": "abcd",
        "region": "us",
        "timestamp": "2024-04-01T00:00:00+00:00",
        "measurements": [
// Three new keys representing SKUs that your RUM usage may be billed on.
          {
              "usage_type": "rum_total_session_count", 
// SKU that your usage may be billed on. Null if the SKU is not active for your org
              "usage": null
           },
           {
             "usage_type": "rum_replay_session_count", 
// SKU that your usage may be billed on. Null if the SKU is not active for your org
              "usage": 50
           },
           {
              "usage_type": "rum_lite_session_count", 
// SKU that your usage may be billed on. Null if the SKU is not active for your org
              "usage": 50
            }

// 13 possible usage types representing granular RUM usage data
            {
              "usage_type": "browser_legacy_session_count",
              "usage": 0
            },
            {
              "usage_type": "browser_lite_session_count",
              "usage": 50
            },
            {
              "usage_type": "browser_replay_session_count",
              "usage": 50
            },
            {
              "usage_type": "mobile_legacy_session_count_android",
              "usage": 0
            },
            {
              "usage_type": "mobile_legacy_session_count_flutter",
              "usage": 0
            },
            {
              "usage_type": "mobile_legacy_session_count_ios",
              "usage": 0
            },
            {
              "usage_type": "mobile_legacy_session_count_reactnative",
              "usage": 0
            },
            {
              "usage_type": "mobile_legacy_session_count_roku",
              "usage": 0
            },
            {
              "usage_type": "mobile_lite_session_count_android",
              "usage": 0
            },
            {
              "usage_type": "mobile_lite_session_count_flutter",
              "usage": 0
            },
            {
              "usage_type": "mobile_lite_session_count_ios",
              "usage": 0
            },
            {
              "usage_type": "mobile_lite_session_count_reactnative",
              "usage": 0
            },
            {
              "usage_type": "mobile_lite_session_count_roku",
              "usage": 0
            } 

// Legacy usage types are nulled out
          {
            "usage_type": "browser_rum_units",
            "value": null
          },
          {
            "usage_type": "mobile_rum_units",
            "value": null
          },
          {
            "usage_type": "rum_units",
            "value": null
          }

// One existing product family (rum) ; rum_browser_sessions and rum_mobile_sessions product families are nulled
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
            "value": null
          },
          {
            "usage_type": "session_count",
            "value": null
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
            "value": null
          },
          {
            "usage_type": "session_count_android",
            "value": null
          },
          {
            "usage_type": "session_count_flutter",
            "value": null
          },
          {
            "usage_type": "session_count_ios",
            "value": null
          },
          {
            "usage_type": "session_count_reactnative",
            "value": null
          },
          {
            "usage_type": "session_count_roku",
            "value": null
          }
        ]
      }
    }
{{< /highlight >}}

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
- `rum_replay_session_count_agg_sum`
- `rum_lite_session_count_agg_sum`
- `rum_browser_legacy_session_count_agg_sum`
- `rum_browser_replay_session_count_agg_sum`
- `rum_browser_lite_session_count_agg_sum`
- `rum_mobile_legacy_session_count_android_agg_sum`
- `rum_mobile_legacy_session_count_flutter_agg_sum`
- `rum_mobile_legacy_session_count_ios_agg_sum`
- `rum_mobile_legacy_session_count_reactnative_agg_sum`
- `rum_mobile_legacy_session_count_roku_agg_sum`
- `rum_mobile_lite_session_count_android_agg_sum`
- `rum_mobile_lite_session_count_flutter_agg_sum`
- `rum_mobile_lite_session_count_ios_agg_sum`
- `rum_mobile_lite_session_count_reactnative_agg_sum`
- `rum_mobile_lite_session_count_roku_agg_sum`


RUM usage in the **Get usage across your account** v1 endpoint will include three keys representing SKUs that your RUM usage may be billed on:
- `rum`
- `rum_replay`
- `rum_lite`

The SKUs that are not active for your org will be null. The 13 usage types will provide granular usage summaries under the RUM SKU.

#### Current response structure

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
}
{{< /code-block >}}

#### Upcoming response structure

After October 1, 2024, the [Get usage across your account][2] v1 endpoint will have the following example structure:

{{< highlight json "hl_lines=3 8 23" >}}
{
  "usage": {
// Three keys representing SKUs that your RUM usage may be billed on 
    "rum_total_session_count_agg_sum": null,
    "rum_replay_session_count_agg_sum": 50,  
    "rum_lite_session_count_agg_sum": null,

// RUM usage types representing granular RUM usage data
    "rum_browser_legacy_session_count_agg_sum": 0,
    "rum_browser_lite_session_count_agg_sum": 183911,
    "rum_browser_replay_session_count_agg_sum": 5576,
    "rum_mobile_legacy_session_count_android_agg_sum": 0,
    "rum_mobile_legacy_session_count_flutter_agg_sum": 0,
    "rum_mobile_legacy_session_count_ios_agg_sum": 0,
    "rum_mobile_legacy_session_count_reactnative_agg_sum": 0,
    "rum_mobile_legacy_session_count_roku_agg_sum": 0,
    "rum_mobile_lite_session_count_android_agg_sum": 0,
    "rum_mobile_lite_session_count_flutter_agg_sum": 0,
    "rum_mobile_lite_session_count_ios_agg_sum": 0,
    "rum_mobile_lite_session_count_reactnative_agg_sum": 0,
    "rum_mobile_lite_session_count_roku_agg_sum": 0

// Legacy usage keys are nulled
   "rum_session_count_agg_sum": null,
   "mobile_rum_session_count_flutter_agg_sum": null,
   "mobile_rum_session_count_ios_agg_sum": null,
   "rum_browser_and_mobile_session_count_agg_sum": null,
   "mobile_rum_session_count_android_agg_sum": null,
   "mobile_rum_session_count_reactnative_agg_sum": null,
   "mobile_rum_session_count_roku_agg_sum": null

  }
},
{… // Summary usage by sub-organization}
{{< /highlight >}}

### Indexed Logs

Keys that represent total usage across all retentions will be deprecated and displayed as null. These keys are: 
- `indexed_events_count_sum`
- `live_indexed_events_agg_sum`
- `rehydrated_indexed_events_agg_sum`

The usage across all retention periods can continue be calculated by summing the individual per-retention keys. 

#### Current response structure

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
  ]
{ … // Summary usage by sub-organization }
}
{{< /code-block >}}

#### Upcoming response structure

After October 1, 2024, the [Get usage across your account][2] v1 endpoint will have the following example structure:

{{< highlight json "hl_lines=3-5 17-20 31-34" >}}
{
  "usage": {
// Usage keys across retention period are nulled
    "rehydrated_indexed_events_agg_sum": null,
    "live_indexed_events_agg_sum": null,
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
 // Deprecated intermediate groupings are nulled
        "indexed_events_count_sum": null,
        "live_indexed_events_sum": null,
        "rehydrated_indexed_events_sum": null,
        "logs_indexed_logs_usage_sum_15_day": 100,
        "logs_indexed_logs_usage_sum_30_day": 100
      }
    },
{
       "name": "Sub-Org 2",
      "public_id": "abcd",
      "uuid": "abcd",
      "region": "eu",
      "usage": {
   // Deprecated intermediate groupings are nulled
        "indexed_events_count_sum": null,
        "live_indexed_events_sum": null,
        "rehydrated_indexed_events_sum": null,
        "logs_indexed_logs_usage_sum_15_day": 100,
        "logs_indexed_logs_usage_sum_30_day": 100
      }
    },
    { … // Summary usage by sub-organization }
{{< /highlight >}}

[1]: /api/latest/usage-metering/#get-hourly-usage-by-product-family
[2]: /api/latest/usage-metering/#get-usage-across-your-account

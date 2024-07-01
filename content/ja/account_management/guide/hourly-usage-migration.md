---
title: Migrating from the V1 Hourly Usage APIs to V2
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentation
  text: Plan and Usage Settings
---

## Summary
Users of the v1 APIs should recognize familiar concepts in the v2 hourly usage API,
just represented in a slightly different format.

The most notable differences between the v1 API and the v2 API are that the v2 API:
* Consolidates all products to one endpoint
* Follows the JSON:API standard
* Is paginated
* Can return data for multiple organizations and regions per request

Each difference is discussed in further detail in the following sections.

## Consolidated Product Families
The v2 API introduces the concepts of product family and usage type. Product families are
groupings of one or more usage types. Usage types are usage measurements for a given organization
and time period. The initial set of product families mostly aligns with the v1 APIs,
with the full mapping outlined below. There is also a special `all` product family that retrieves
the usage for all other product families.

The families and usage types:
- **all**
    * _Contains all other product families_
- **analyzed_logs**
    * `analyzed_logs`
- **application_security**
    * `app_sec_host_count`
- **audit_trail**
    * `enabled`
- **serverless**
    * `func_count`
    * `invocations_sum`
- **ci_app**
    * `ci_pipeline_indexed_spans`
    * `ci_test_indexed_spans`
    * `ci_visibility_pipeline_committers`
    * `ci_visibility_test_committers`
- **cloud_cost_management**
    * `host_count`
- **csm_container_enterprise**
    * `cws_count`
    * `compliance_count`
    * `total_count`
- **csm_host_enterprise**
    * `total_host_count`
    * `compliance_hosts`
    * `cws_hosts`
    * `aas_host_count`
    * `azure_host_count`
    * `aws_host_count`
    * `gcp_host_count`
- **cspm**
    * `aas_host_count`
    * `azure_host_count`
    * `compliance_host_count`
    * `container_count`
    * `host_count`
- **cws**
    * `cws_container_count`
    * `cws_host_count`
- **dbm**
    * `dbm_host_count`
    * `dbm_queries_count`
- **fargate**
    * `avg_profiled_fargate_tasks`
    * `tasks_count`
- **infra_hosts**
    * `agent_host_count`
    * `alibaba_host_count`
    * `apm_azure_app_service_host_count`
    * `apm_host_count`
    * `aws_host_count`
    * `azure_host_count`
    * `container_count`
    * `gcp_host_count`
    * `heroku_host_count`
    * `host_count`
    * `infra_azure_app_service`
    * `opentelemetry_host_count`
    * `vsphere_host_count`
- **incident_management**
    * `monthly_active_users`
- **indexed_logs**
    * `logs_indexed_events_3_day_count`
    * `logs_live_indexed_events_3_day_count`
    * `logs_rehydrated_indexed_events_3_day_count`
    * `logs_indexed_events_7_day_count`
    * `logs_live_indexed_events_7_day_count`
    * `logs_rehydrated_indexed_events_7_day_count`
    * `logs_indexed_events_15_day_count`
    * `logs_live_indexed_events_15_day_count`
    * `logs_rehydrated_indexed_events_15_day_count`
    * `logs_indexed_events_30_day_count`
    * `logs_live_indexed_events_30_day_count`
    * `logs_rehydrated_indexed_events_30_day_count`
    * `logs_indexed_events_45_day_count`
    * `logs_live_indexed_events_45_day_count`
    * `logs_rehydrated_indexed_events_45_day_count`
    * `logs_indexed_events_60_day_count`
    * `logs_live_indexed_events_60_day_count`
    * `logs_rehydrated_indexed_events_60_day_count`
    * `logs_indexed_events_90_day_count`
    * `logs_live_indexed_events_90_day_count`
    * `logs_rehydrated_indexed_events_90_day_count`
    * `logs_indexed_events_180_day_count`
    * `logs_live_indexed_events_180_day_count`
    * `logs_rehydrated_indexed_events_180_day_count`
    * `logs_indexed_events_360_day_count`
    * `logs_live_indexed_events_360_day_count`
    * `logs_rehydrated_indexed_events_360_day_count`
    * `logs_indexed_events_custom_day_count`
    * `logs_live_indexed_events_custom_day_count`
    * `logs_rehydrated_indexed_events_custom_day_count`
- **indexed_spans**
    * `indexed_events_count`
    * `ingested_spans`
    * `ingested_events_bytes`
- **iot**
    * `iot_device_count`
- **lambda_traced_invocations**
    * `lambda_traced_invocations_count`
- **logs**
    * `billable_ingested_bytes`
    * `indexed_events_count`
    * `ingested_events_bytes`
    * `logs_forwarding_events_bytes`
    * `logs_live_indexed_count`
    * `logs_live_ingested_bytes`
    * `logs_rehydrated_indexed_count`
    * `logs_rehydrated_ingested_bytes`
- **network_flows**
    * `indexed_events_count`
- **network_hosts**
    * `host_count`
- **observability_pipelines**
    * `observability_pipelines_bytes_processed`
- **online_archive**
    * `online_archive_events_count`
- **profiling**
    * `avg_container_agent_count`
    * `host_count`
- **rum**
    * `browser_rum_units`
    * `mobile_rum_units`
    * `rum_units`
- **rum_browser_sessions**
    * `replay_session_count`
    * `session_count`
- **rum_mobile_sessions**
    * `session_count`
    * `session_count_android`
    * `session_count_ios`
    * `session_count_reactnative`
    * `session_count_flutter`
- **sds**
    * `logs_scanned_bytes`
    * `total_scanned_bytes`
- **snmp**
    * `snmp_devices`
- **synthetics_api**
    * `check_calls_count`
- **synthetics_browser**
    * `browser_check_calls_count`
- **synthetics_mobile**
    * `test_runs`
- **timeseries**
    * `num_custom_input_timeseries`
    * `num_custom_output_timeseries`
    * `num_custom_timeseries`


This list shows how the families and usage types above map to the v1 hourly usage endpoints. Usage type and datapoint are the same, except where explicitly noted otherwise:

ENDPOINT | PRODUCT FAMILY
`<base_url>/api/v1/usage/hosts` | infra_hosts
: `agent_host_count`
: `alibaba_host_count`
: `apm_azure_app_service_host_count`
: `apm_host_count`
: `aws_host_count`
: `azure_host_count`
: `container_count`
: `gcp_host_count`
: `heroku_host_count`
: `host_count`
: `infra_azure_app_service`
: `opentelemetry_host_count`
: `vsphere_host_count`

`<base_url>/api/v1/usage/logs` | logs
: `billable_ingested_bytes`
: `indexed_events_count`
: `ingested_events_bytes`
: `logs_live_indexed_count`
: `logs_live_ingested_bytes`
: `logs_rehydrated_indexed_count`
: `logs_rehydrated_ingested_bytes`

`<base_url>/api/v1/usage/timeseries` | timeseries
: `num_custom_input_timeseries`
: `num_custom_output_timeseries`
: `num_custom_timeseries`

`<base_url>/api/v1/usage/indexed-spans` | indexed_spans
: `indexed_events_count`

`<base_url>/api/v1/usage/synthetics`
: Deprecated. See synthetics_api and synthetics_browser for synthetics usage

`<base_url>/api/v1/usage/synthetics_api` | synthetics_api
: `check_calls_count`

`<base_url>/api/v1/usage/synthetics_browser` | synthetics_browser
: `browser_check_calls_count`

`<base_url>/api/v1/usage/fargate` | fargate
: `avg_profiled_fargate_tasks`
: `tasks_count`

`<base_url>/api/v1/usage/aws_lambda` | serverless
: `func_count`
: `invocations_sum`

`<base_url>/api/v1/usage/rum_sessions?type=browser` | rum_browser_sessions
: `replay_session_count`
: `session_count`

`<base_url>/api/v1/usage/rum_sessions?type=mobile` | rum_mobile_sessions
: `session_count`
: `session_count_android`
: `session_count_ios`
: `session_count_reactnative`

`<base_url>/api/v1/usage/network_hosts` | network_hosts
: `host_count`

`<base_url>/api/v1/usage/network_flows` | network_flows
: `indexed_events_count`

`<base_url>/api/v1/usage/logs-by-retention` | indexed_logs
: **Note:** The usage type and datapoint are separate for this URL, because the retention value is included in the usage type.
: **Usage Type:** `logs_indexed_events_<retention>_count` **Datapoint:** `indexed_events_count`
: **Usage Type:** `logs_live_indexed_events_<retention>_count` **Datapoint:** `live_indexed_events_count`
: **Usage Type:** `logs_rehydrated_indexed_events_<retention>_count` **Datapoint:** `rehydrated_indexed_events_count`
: **Usage Type:** In `usage_type`, replace `<retention>` with one of : `3_day`, `7_day`, `15_day`, `30_day`, `45_day`, `60_day`, `90_day`, `180_day`, `365_day`, `custom` **Datapoint:** `retention`

`<base_url>/api/v1/usage/analyzed_logs` | analyzed_logs
: `analyzed_logs`

`<base_url>/api/v1/usage/snmp` | snmp
: `snmp_devices`

`<base_url>/api/v1/usage/profiling` | profiling
: `host_count`

`<base_url>/api/v1/usage/ingested-spans` | ingested_spans
: `ingested_events_bytes` 

`<base_url>/api/v1/usage/incident-management` | incident_management
: `monthly_active_users`

`<base_url>/api/v1/usage/iot` | iot
: `iot_device_count`

`<base_url>/api/v1/usage/cspm` | cspm
: `aas_host_count`
: `azure_host_count`
: `compliance_host_count`
: `container_count`
: `host_count`

`<base_url>/api/v1/usage/audit_logs` | audit_logs
: `lines_indexed`

`<base_url>/api/v1/usage/cws` | cws
: `cws_container_count`
: `cws_host_count`

`<base_url>/api/v1/usage/dbm` | dbm
: `dbm_host_count`
: `dbm_queries_count`

`<base_url>/api/v1/usage/sds` | sds
: `logs_scanned_bytes`
: `total_scanned_bytes`

`<base_url>/api/v1/usage/rum` | rum
: `browser_rum_units`
: `mobile_rum_units`
: `rum_units`

`<base_url>/api/v1/usage/ci-app` | ci_app
: `ci_pipeline_indexed_spans`
: `ci_test_indexed_spans`
: `ci_visibility_pipeline_committers`
: `ci_visibility_test_committers`

`<base_url>/api/v1/usage/online-archive` | online_archive
: `online_archive_events_count`

`<base_url>/api/v2/usage/lambda_traced_invocations` | lambda_traced_invocations
: `lambda_traced_invocations_count`

`<base_url>/api/v2/usage/application_security` | application_security
: `app_sec_host_count`

`<base_url>/api/v2/usage/observability_pipelines` | observability_pipelines
: `observability_pipelines_bytes_processed`

## JSON:API Compliant Format

Response bodies and parameter names conform to the [JSON:API specification][1]. All data
available in the v1 APIs is still available. See the example below of the mapping from the v1 hosts
API to the v2 hourly usage API.

### V1 API: [Get hourly usage for hosts and containers][2]

#### Request

`https://api.datadoghq.com/api/v1/usage/hosts?start_hr=2022-06-01T00&end_hr=2022-06-01T01`

##### Notes

* Product is an element of the path `hosts`.
* Time bounds are controlled by the parameters `start_hr` and `end_hr`.

#### Response

```json
{
  "usage": [
    {
      "agent_host_count": 1,
      "alibaba_host_count": 2,
      "apm_azure_app_service_host_count": 3,
      "apm_host_count": 4,
      "aws_host_count": 5,
      "azure_host_count": 6,
      "container_count": 7,
      "gcp_host_count": 8,
      "heroku_host_count": 9,
      "host_count": 10,
      "infra_azure_app_service": 11,
      "opentelemetry_host_count": 12,
      "vsphere_host_count": 13,
      "hour": "2022-06-01T00",
      "org_name": "Customer Inc",
      "public_id": "abc123"
    }
  ]
}
```

##### Notes

* Usage for each hour is represented as an object in the usage array.
* Usage types are keys in the object, and measured usage for those usage types are the corresponding values.
* Hour, organization name, and public ID are also fields in the object.

### V2 API: Get hourly usage by product family

#### Request

`https://api.datadoghq.com/api/v2/usage/hourly_usage?filter[timestamp][start]=2022-06-01T00&filter[timestamp][end]=2022-06-01T01&filter[product_families]=infra_hosts`

##### Notes

* Product is passed as a query parameter `filter[product_families]=infra_hosts`.
* Time bounds are controlled by the parameters `filter[timestamp][start]` and `filter[timestamp][end]`.

#### Response

```json
{
  "data": [
    {
      "attributes": {
        "org_name": "Customer Inc",
        "public_id": "abc123",
        "timestamp": "2022-06-01T00:00:00+00:00",
        "region": "us",
        "measurements": [
          {
            "usage_type": "agent_host_count",
            "value": 1
          },
          {
            "usage_type": "alibaba_host_count",
            "value": 2
          },
          {
            "usage_type": "apm_azure_app_service_host_count",
            "value": 3
          },
          {
            "usage_type": "apm_host_count",
            "value": 4
          },
          {
            "usage_type": "aws_host_count",
            "value": 5
          },
          {
            "usage_type": "azure_host_count",
            "value": 6
          },
          {
            "usage_type": "container_count",
            "value": 7
          },
          {
            "usage_type": "gcp_host_count",
            "value": 8
          },
          {
            "usage_type": "heroku_host_count",
            "value": 9
          },
          {
            "usage_type": "host_count",
            "value": 10
          },
          {
            "usage_type": "infra_azure_app_service",
            "value": 11
          },
          {
            "usage_type": "opentelemetry_host_count",
            "value": 12
          },
          {
            "usage_type": "vsphere_host_count",
            "value": 13
          }
        ],
        "product_family": "infra_hosts"
      },
      "type": "usage_timeseries",
      "id": "ec3e0318b98d15c2ae8125e8bda0ff487cd08d80b120fb340c9322ee16f28629"
    }
  ]
}
```

#### Notes

* Objects in the data array represent hourly usage, for each product and each organization.
    * V1 APIs did not support multiple products or multiple organizations per request.
* Usage measurements are represented in the nested `measurements` array.
* Usage measurement objects have the fields `usage_type` and `value`.
* `hour`, `org_name`, and `public_id` are also fields in the `attributes` object.

## Pagination

The v2 hourly usage API is paginated. Responses are limited to 500 pages, with a page containing usage data for one
product family, for one hour, for one organization. Pagination allows the API to support other features such as multiple
products per request, multiple organizations per request, and unlimited time ranges.

If a result has more pages, the record ID of the next page is returned in the field
`meta.pagination.next_record_id`. Clients should then pass that id in the parameter `pagination[next_record_id]`. There
are no more pages to retrieve when the `meta.pagination.next_record_id` field is not set.

### Code example
```
response := GetHourlyUsage(start_time, end_time, product_families)
cursor := response.metadata.pagination.next_record_id
WHILE cursor != null BEGIN
sleep(5 seconds)  # Avoid running into rate limit
response := GetHourlyUsage(start_time, end_time, product_families, next_record_id=cursor)
cursor := response.metadata.pagination.next_record_id
END
```

## Multi-organization responses

The v2 API supports retrieving usage data for all of your child organizations in all regions in one request. Use the
parameter `filter[include_descendants]` to request data for child organizations.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://jsonapi.org/format/
[2]: /api/latest/usage-metering/#get-hourly-usage-for-hosts-and-containers


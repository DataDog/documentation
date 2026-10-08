---
title: Usage Metering
description: The usage metering API allows you to get hourly, daily, and monthly usage across multiple facets of Datadog. This API is available to all Pro and…
breadcrumbs: Docs > API > Usage Metering
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Usage Metering

The usage metering API allows you to get hourly, daily, and
monthly usage across multiple facets of Datadog.
This API is available to all Pro and Enterprise customers.

**Note**: Usage data is delayed by up to 72 hours from when it was incurred.
It is retained for 15 months.

You can retrieve up to 24 hours of hourly usage data for multiple organizations,
and up to two months of hourly usage data for a single organization in one request.
Learn more on the [usage details documentation](https://docs.datadoghq.com/account_management/billing/usage_details/).

## [Get hourly usage attribution](/api/latest/usage-metering/get-hourly-usage-attribution/)

| Datadog site      | API endpoint                                                          |
| ----------------- | --------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/hourly-attribution     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/hourly-attribution |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/hourly-attribution |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/hourly-attribution      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/hourly-attribution |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/hourly-attribution |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/hourly-attribution      |

## [Get monthly usage attribution](/api/latest/usage-metering/get-monthly-usage-attribution/)

| Datadog site      | API endpoint                                                           |
| ----------------- | ---------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/monthly-attribution     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/monthly-attribution |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/monthly-attribution |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/monthly-attribution      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/monthly-attribution |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/monthly-attribution |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/monthly-attribution      |

## [Get billable usage across your account](/api/latest/usage-metering/get-billable-usage-across-your-account/)

| Datadog site      | API endpoint                                                        |
| ----------------- | ------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/billable-summary     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/billable-summary |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/billable-summary |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/billable-summary      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/billable-summary |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/billable-summary |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/billable-summary      |

## [Get all custom metrics by hourly average](/api/latest/usage-metering/get-all-custom-metrics-by-hourly-average/)

| Datadog site      | API endpoint                                                       |
| ----------------- | ------------------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/top_avg_metrics     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/top_avg_metrics |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/top_avg_metrics |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/top_avg_metrics      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/top_avg_metrics |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/top_avg_metrics |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/top_avg_metrics      |

## [Get usage across your account](/api/latest/usage-metering/get-usage-across-your-account/)

| Datadog site      | API endpoint                                               |
| ----------------- | ---------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/summary     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/summary |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/summary |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/summary      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/summary |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/summary |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/summary      |

## [Get hourly usage for logs by index](/api/latest/usage-metering/get-hourly-usage-for-logs-by-index/)

| Datadog site      | API endpoint                                                     |
| ----------------- | ---------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/logs_by_index     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/logs_by_index |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/logs_by_index |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/logs_by_index      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/logs_by_index |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/logs_by_index |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/logs_by_index      |

## [Get hourly logs usage by retention](/api/latest/usage-metering/get-hourly-logs-usage-by-retention/) (deprecated)

| Datadog site      | API endpoint                                                         |
| ----------------- | -------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/logs-by-retention     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/logs-by-retention |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/logs-by-retention |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/logs-by-retention      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/logs-by-retention |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/logs-by-retention |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/logs-by-retention      |

## [Get hourly usage for hosts and containers](/api/latest/usage-metering/get-hourly-usage-for-hosts-and-containers/) (deprecated)

| Datadog site      | API endpoint                                             |
| ----------------- | -------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/hosts     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/hosts |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/hosts |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/hosts      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/hosts |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/hosts |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/hosts      |

## [Get hourly usage for logs](/api/latest/usage-metering/get-hourly-usage-for-logs/) (deprecated)

| Datadog site      | API endpoint                                            |
| ----------------- | ------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/logs     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/logs |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/logs |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/logs      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/logs |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/logs |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/logs      |

## [Get hourly usage for custom metrics](/api/latest/usage-metering/get-hourly-usage-for-custom-metrics/) (deprecated)

| Datadog site      | API endpoint                                                  |
| ----------------- | ------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/timeseries     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/timeseries |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/timeseries |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/timeseries      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/timeseries |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/timeseries |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/timeseries      |

## [Get hourly usage for indexed spans](/api/latest/usage-metering/get-hourly-usage-for-indexed-spans/) (deprecated)

| Datadog site      | API endpoint                                                     |
| ----------------- | ---------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/indexed-spans     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/indexed-spans |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/indexed-spans |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/indexed-spans      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/indexed-spans |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/indexed-spans |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/indexed-spans      |

## [Get hourly usage for synthetics checks](/api/latest/usage-metering/get-hourly-usage-for-synthetics-checks/) (deprecated)

| Datadog site      | API endpoint                                                  |
| ----------------- | ------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/synthetics     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/synthetics |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/synthetics |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/synthetics      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/synthetics |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/synthetics |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/synthetics      |

## [Get hourly usage for synthetics API checks](/api/latest/usage-metering/get-hourly-usage-for-synthetics-api-checks/) (deprecated)

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/synthetics_api     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/synthetics_api |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/synthetics_api |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/synthetics_api      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/synthetics_api |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/synthetics_api |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/synthetics_api      |

## [Get hourly usage for synthetics browser checks](/api/latest/usage-metering/get-hourly-usage-for-synthetics-browser-checks/) (deprecated)

| Datadog site      | API endpoint                                                          |
| ----------------- | --------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/synthetics_browser     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/synthetics_browser |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/synthetics_browser |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/synthetics_browser      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/synthetics_browser |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/synthetics_browser |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/synthetics_browser      |

## [Get hourly usage for Fargate](/api/latest/usage-metering/get-hourly-usage-for-fargate/) (deprecated)

| Datadog site      | API endpoint                                               |
| ----------------- | ---------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/fargate     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/fargate |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/fargate |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/fargate      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/fargate |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/fargate |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/fargate      |

## [Get hourly usage for Lambda](/api/latest/usage-metering/get-hourly-usage-for-lambda/) (deprecated)

| Datadog site      | API endpoint                                                  |
| ----------------- | ------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/aws_lambda     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/aws_lambda |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/aws_lambda |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/aws_lambda      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/aws_lambda |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/aws_lambda |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/aws_lambda      |

## [Get hourly usage for RUM sessions](/api/latest/usage-metering/get-hourly-usage-for-rum-sessions/) (deprecated)

| Datadog site      | API endpoint                                                    |
| ----------------- | --------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/rum_sessions     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/rum_sessions |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/rum_sessions |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/rum_sessions      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/rum_sessions |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/rum_sessions |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/rum_sessions      |

## [Get hourly usage for network hosts](/api/latest/usage-metering/get-hourly-usage-for-network-hosts/) (deprecated)

| Datadog site      | API endpoint                                                     |
| ----------------- | ---------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/network_hosts     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/network_hosts |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/network_hosts |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/network_hosts      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/network_hosts |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/network_hosts |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/network_hosts      |

## [get hourly usage for network flows](/api/latest/usage-metering/get-hourly-usage-for-network-flows/) (deprecated)

| Datadog site      | API endpoint                                                     |
| ----------------- | ---------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/network_flows     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/network_flows |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/network_flows |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/network_flows      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/network_flows |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/network_flows |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/network_flows      |

## [Get hourly usage for analyzed logs](/api/latest/usage-metering/get-hourly-usage-for-analyzed-logs/) (deprecated)

| Datadog site      | API endpoint                                                     |
| ----------------- | ---------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/analyzed_logs     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/analyzed_logs |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/analyzed_logs |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/analyzed_logs      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/analyzed_logs |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/analyzed_logs |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/analyzed_logs      |

## [Get hourly usage for SNMP devices](/api/latest/usage-metering/get-hourly-usage-for-snmp-devices/) (deprecated)

| Datadog site      | API endpoint                                            |
| ----------------- | ------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/snmp     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/snmp |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/snmp |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/snmp      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/snmp |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/snmp |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/snmp      |

## [Get hourly usage for ingested spans](/api/latest/usage-metering/get-hourly-usage-for-ingested-spans/) (deprecated)

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/ingested-spans     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/ingested-spans |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/ingested-spans |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/ingested-spans      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/ingested-spans |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/ingested-spans |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/ingested-spans      |

## [Get hourly usage for incident management](/api/latest/usage-metering/get-hourly-usage-for-incident-management/) (deprecated)

| Datadog site      | API endpoint                                                           |
| ----------------- | ---------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/incident-management     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/incident-management |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/incident-management |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/incident-management      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/incident-management |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/incident-management |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/incident-management      |

## [Get hourly usage for IoT](/api/latest/usage-metering/get-hourly-usage-for-iot/) (deprecated)

| Datadog site      | API endpoint                                           |
| ----------------- | ------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/iot     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/iot |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/iot |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/iot      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/iot |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/iot |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/iot      |

## [Get hourly usage for CSM Pro](/api/latest/usage-metering/get-hourly-usage-for-csm-pro/) (deprecated)

| Datadog site      | API endpoint                                            |
| ----------------- | ------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/cspm     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/cspm |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/cspm |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/cspm      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/cspm |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/cspm |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/cspm      |

## [Get hourly usage for cloud workload security](/api/latest/usage-metering/get-hourly-usage-for-cloud-workload-security/) (deprecated)

| Datadog site      | API endpoint                                           |
| ----------------- | ------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/cws     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/cws |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/cws |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/cws      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/cws |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/cws |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/cws      |

## [Get hourly usage for database monitoring](/api/latest/usage-metering/get-hourly-usage-for-database-monitoring/) (deprecated)

| Datadog site      | API endpoint                                           |
| ----------------- | ------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/dbm     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/dbm |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/dbm |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/dbm      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/dbm |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/dbm |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/dbm      |

## [Get hourly usage for sensitive data scanner](/api/latest/usage-metering/get-hourly-usage-for-sensitive-data-scanner/) (deprecated)

| Datadog site      | API endpoint                                           |
| ----------------- | ------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/sds     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/sds |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/sds |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/sds      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/sds |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/sds |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/sds      |

## [Get hourly usage for RUM units](/api/latest/usage-metering/get-hourly-usage-for-rum-units/) (deprecated)

| Datadog site      | API endpoint                                           |
| ----------------- | ------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/rum     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/rum |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/rum |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/rum      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/rum |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/rum |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/rum      |

## [Get hourly usage for profiled hosts](/api/latest/usage-metering/get-hourly-usage-for-profiled-hosts/) (deprecated)

| Datadog site      | API endpoint                                                 |
| ----------------- | ------------------------------------------------------------ |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/profiling     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/profiling |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/profiling |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/profiling      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/profiling |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/profiling |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/profiling      |

## [Get hourly usage for CI visibility](/api/latest/usage-metering/get-hourly-usage-for-ci-visibility/) (deprecated)

| Datadog site      | API endpoint                                              |
| ----------------- | --------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/ci-app     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/ci-app |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/ci-app |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/ci-app      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/ci-app |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/ci-app |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/ci-app      |

## [Get hourly usage for online archive](/api/latest/usage-metering/get-hourly-usage-for-online-archive/) (deprecated)

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/online-archive     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/online-archive |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/online-archive |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/online-archive      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/online-archive |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/online-archive |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/online-archive      |

## [Get hourly usage for audit logs](/api/latest/usage-metering/get-hourly-usage-for-audit-logs/) (deprecated)

| Datadog site      | API endpoint                                                  |
| ----------------- | ------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/usage/audit_logs     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/usage/audit_logs |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/usage/audit_logs |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/usage/audit_logs      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/usage/audit_logs |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/usage/audit_logs |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/usage/audit_logs      |

## [Get the list of available daily custom reports](/api/latest/usage-metering/get-the-list-of-available-daily-custom-reports/) (deprecated)

| Datadog site      | API endpoint                                                      |
| ----------------- | ----------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/daily_custom_reports     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/daily_custom_reports |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/daily_custom_reports |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/daily_custom_reports      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/daily_custom_reports |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/daily_custom_reports |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/daily_custom_reports      |

## [Get specified daily custom reports](/api/latest/usage-metering/get-specified-daily-custom-reports/) (deprecated)

| Datadog site      | API endpoint                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/daily_custom_reports/{report_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/daily_custom_reports/{report_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/daily_custom_reports/{report_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/daily_custom_reports/{report_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/daily_custom_reports/{report_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/daily_custom_reports/{report_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/daily_custom_reports/{report_id}      |

## [Get the list of available monthly custom reports](/api/latest/usage-metering/get-the-list-of-available-monthly-custom-reports/) (deprecated)

| Datadog site      | API endpoint                                                        |
| ----------------- | ------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/monthly_custom_reports     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/monthly_custom_reports |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/monthly_custom_reports |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/monthly_custom_reports      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/monthly_custom_reports |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/monthly_custom_reports |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/monthly_custom_reports      |

## [Get specified monthly custom reports](/api/latest/usage-metering/get-specified-monthly-custom-reports/) (deprecated)

| Datadog site      | API endpoint                                                                    |
| ----------------- | ------------------------------------------------------------------------------- |
| app.datadoghq.com | **GET** https://api.datadoghq.com/api/v1/monthly_custom_reports/{report_id}     |
| us3.datadoghq.com | **GET** https://api.us3.datadoghq.com/api/v1/monthly_custom_reports/{report_id} |
| us5.datadoghq.com | **GET** https://api.us5.datadoghq.com/api/v1/monthly_custom_reports/{report_id} |
| app.datadoghq.eu  | **GET** https://api.datadoghq.eu/api/v1/monthly_custom_reports/{report_id}      |
| ap1.datadoghq.com | **GET** https://api.ap1.datadoghq.com/api/v1/monthly_custom_reports/{report_id} |
| ap2.datadoghq.com | **GET** https://api.ap2.datadoghq.com/api/v1/monthly_custom_reports/{report_id} |
| app.ddog-gov.com  | **GET** https://api.ddog-gov.com/api/v1/monthly_custom_reports/{report_id}      |

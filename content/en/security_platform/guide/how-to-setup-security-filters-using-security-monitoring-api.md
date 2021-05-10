---
title: How To Setup Security Filters By Using The Security Monitoring API
kind: guide
aliases:
  - /security_monitoring/guide/how-to-setup-security-filters-using-security-monitoring-api/
---

## Overview

The Security Monitoring product analyzes your ingested logs to detect threats in real time, such as by matching logs with threat intelligence, or by applying [Security Rules][1] to detect attacks or anomalies.

Datadog charges for analyzed logs based on the total number of gigabytes ingested and analyzed by the Datadog Security Monitoring service. By default, Security Monitoring analyzes all your ingested logs to maximize detection coverage. However, by using the [Security Monitoring API][2], you can programmatically setup Security Filters to configure which subset of ingested logs to analyze.

The following examples are covered in this guide:

* [Configure the default security filter to exclude certain logs](#add-an-exclusion-to-the-default-security-filter)
* [Create custom security filters to specify which log sources to analyze](#create-a-custom-security-filter)

## Prerequisites

* An API key and an application key **from an admin user** is required to use the API. These are available in your [Datadog account API key page][3]. Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog application key.

* This guide features `curl` examples. Install [curl][4] if you do not have it installed, or reference additional language examples for this API endpoint in the [API documentation][2].

## Examples

### Add an exclusion to the default Security Filter

By default, a single Security Filter exists that analyzes all ingested logs. It's named `all ingested logs` and has a query of `*`. You can customize it by adding an exclusion to exclude a subset of logs based on their tags. To do so, you first need to retrieve the list of Security Filters in order to get the filter's `id`.

**API call:**

```bash

curl -L -X GET 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'

```

**Response:**

```json

{
    "data": [
        {
            "attributes": {
                "is_enabled": true,
                "is_builtin": true,
                "name": "all ingested logs",
                "filtered_data_type": "logs",
                "exclusion_filters": [],
                "version": 1,
                "query": "*"
            },
            "type": "security_filters",
            "id": "l6l-rmx-mqx"
        }
    ]
}

```

In this example, the filter's `id` is `"l6l-rmx-mqx"`. You can then modify it to add an exclusion, for example exclude all the logs tagged with `env:staging`.

**Note**: `version` indicates the current version of the filter you want to update.

**API call:**

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/l6l-rmx-mqx' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
             "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 1
        },
        "type": "security_filters"
    }
}'
```

**Response:**

```json

{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 2,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}

```

### Create a custom Security Filter

You can also create custom Security Filters in order to restrict analysis to explicitly specified logs. For example, you can choose to analyze logs from AWS Cloudtrail with a filter that matches only `source:cloudtrail`.

**API call:**

```bash

curl -L -X POST 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "type": "security_filters",
        "attributes": {
            "is_enabled": true,
            "name": "cloudtrail",
            "exclusion_filters": [],
            "filtered_data_type": "logs",
            "query": "source:cloudtrail"
        }
    }
}'

```

**Response:**

```json

{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": false,
            "name": "cloudtrail",
            "filtered_data_type": "logs",
            "exclusion_filters": [],
            "version": 1,
            "query": "source:cloudtrail"
        },
        "type": "security_filters",
        "id": "qa6-tzm-rp7"
    }
}

```

Security Filters are inclusive, which means a given log is analyzed **if it matches at least one Security Filter**. If you're aiming to specify a subset of logs to analyze, you likely also would want to disable the default built-in filter named `all ingested logs`. You would do so by setting its `is_enabled` attribute to `false`, as follows:

**API call:**

```bash

curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/l6l-rmx-mqx' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
            "is_enabled": false,
            "version": 2
        },
        "type": "security_filters"
    }
}'

```

**Response:**

```json

{
    "data": {
        "attributes": {
            "is_enabled": false,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 3,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}

```

## Key security-relevant tags and attributes

If you aim to only analyze explicitly specified categories of logs, be cautious not to exclude logs that contain valuable security-relevant users and entities, or key sources of security logs. The tables below provide useful examples.

**Key users and entities**

| Name                  | Query                                            |
| --------------------- |--------------------------------------------------|
| All named events      | `@evt.name:*`                                    |
| All client IPs        | `@network.client.ip:*`                           |
| All destination IPs   | `@network.destination.ip:*`                      |
| All users             | `@usr.id:* OR @usr.name:* @usr.email:*`          |
| All hosts             | `host:* OR instance-id:*`                        |

**Key security sources**

| Name                  | Query                                            |
| --------------------- |--------------------------------------------------|
| AWS Security Logs     | `source:(cloudtrail OR guardduty OR route53)`    |
| AWS Network Logs      | `source:(vpc OR waf OR elb OR alb)`              |
| GCP Logs              | `source:gcp*`                                    |
| Azure Logs            | `source:azure*`                                  |
| Kubernetes Audit Logs | `source:kubernetes.audit`                        |
| Identity Provider Logs| `source:(okta OR gsuite OR auth0)`               |
| CDN Logs              | `source:(cloudfront OR cloudflare OR fastly)`    |
| Web Server Logs       | `source:(nginx* OR apache OR iis)`               |

[1]: /security_platform/detection_rules/security_monitoring
[2]: /api/v2/security-monitoring/
[3]: /api/v1/authentication/
[4]: https://curl.haxx.se/download.html

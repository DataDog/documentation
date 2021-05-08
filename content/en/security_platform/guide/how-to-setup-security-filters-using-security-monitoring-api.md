---
title: How To Setup Security Filters Using Security Monitoring API
kind: guide
aliases:
  - /security_monitoring/guide/how-to-setup-security-filters-using-security-monitoring-api/
---

## Overview

Use the [Security Monitoring API][1] to programmatically setup your Security Filters and choose which logs have to be analyzed with the [Security Monitoring Rules][2].

The following examples are covered in this guide:

* [Add an exclusion filter on the builtin filter](#add-an-exclusion-filter-on-the-builtin-filter)
* [Create a custom security filter](#create-a-custom-security-filter)

## Prerequisites

* An API key and an application key from an admin user is required to use the API. These are available in your [Datadog account API key page][3]. Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog application key.

* This guide features `curl` examples. Install [curl][4] if you do not have it installed, or reference additional language examples for this API endpoint in the [API documentation][1].


## Examples

### Add an exclusion filter on the builtin filter

The builtin filter enabled by default means that all the logs are analyzed with the [Security Monitoring Rules][2]. You can customize it by adding an exclusion filter to exclude some logs.
Before doing that, you first need to retrieve the list of Security Filters in order to get the filter `id`.

**API call:**

```bash

curl -L -X GET 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \

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

You can then modify it to add an exclusion filter, for example exclude all the logs for `env:staging`.
`version` indicates the current version of the filter you want to update.

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

### Create a custom security filter

You can also create some custom Security Filters in order to restrict the analysis to some specific logs.
For example you can choose to analyze only the logs from AWS cloudtrail with the filter `source:cloudtrail`

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

If you already defined an exclusion filter as in [Add an exclusion filter on the builtin filter](#add-an-exclusion-filter-on-the-builtin-filter), the logs analyzed will be the ones with either `source:cloudtrail` OR without `env:staging`, others are dropped.

**You need to deactivate the builtin filter which matches all the ingested logs if you only want your custom filter to be taken into account.**

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

[1]: /api/v2/security-monitoring/
[2]: /security_platform/detection_rules/security_monitoring
[3]: /api/v1/authentication/
[4]: https://curl.haxx.se/download.html

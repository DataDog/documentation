---
title: URL Parser
description: "Extract query parameters and other important parameters from a URL"
processor_type: url-parser
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

The URL parser processor extracts query parameters and other important parameters from a URL. When setup, the following attributes are produced:

{{< img src="logs/processing/processors/url_processor.png" alt="Url Processor" style="width:80%;" >}}

## Use cases

The URL Parser is used to extract useful information from URL, for example, logs coming from nginx can contain URLs which we automatically parse to extract filters, queries, sources.

## Before and after state of logs

{{% collapse-content title="Example: Parsing an URL in custom application logs" level="h4" %}}

**Before:**

```json
{
  "client": {
    "ip": "10.12.4.20"
  },
  "http": {
    "method": "GET",
    "url": "https://api.example.com/v1/orders?user_id=12345&limit=20",
    "status_code": 200
  },
  "timestamp": 1696945536000
}
```

**URL Parser**

We create a URL Parser processor and configure it to parse the http.url attribute. The processor extracts the URL into multiple structured attributes (scheme, host, path, query parameters, etc.).

**After processing:**

```json
{
  "client": {
    "ip": "10.12.4.20"
  },
  "http": {
    "method": "GET",
    "url": "https://api.example.com/v1/orders?user_id=12345&limit=20",
    "url_details": {
      "host": "api.example.com",
      "path": "/v1/orders",
      "port": 443,
      "queryString": {
        "user_id": "12345",
        "limit": "20"
      },
      "scheme": "https"
    },
    "status_code": 200
  },
  "timestamp": 1696945536000
}
```

The URL Parser automatically adds a new nested attribute (http.url_details) containing extracted components of the URL.

{{% /collapse-content %}}

## API

```json
{
  "type": "url-parser",
  "name": "Parse the URL from http.url attribute.",
  "is_enabled": true,
  "sources": ["http.url"],
  "target": "http.url_details"
}
```

| Parameter    | Type             | Required | Description                                                                                                          |
|--------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                                                                               |
| `name`       | String           | No       | Name of the processor.                                                                                               |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`.                                                                |
| `sources`    | Array of strings | No       | Array of source attributes. Default: `http.url`.                                                                      |
| `target`     | String           | Yes      | Name of the parent attribute that contains all the extracted details from the `sources`. Default: `http.url_details`. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


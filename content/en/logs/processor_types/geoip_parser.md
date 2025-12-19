---
title: GeoIP Parser
description: "Extract continent, country, subdivision, or city information from an IP address"
processor_type: geo-ip-parser
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

The geoIP parser takes an IP address attribute and extracts continent, country, subdivision, or city information (if available) in the target attribute path.

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="GeoIP Processor" style="width:80%;">}}

Most elements contain a `name` and `iso_code` (or `code` for continent) attribute. `subdivision` is the first level of subdivision that the country uses such as "States" for the United States or "Departments" for France.

For example, the geoIP parser extracts location from the `network.client.ip` attribute and stores it into the `network.client.geoip` attribute:

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="GeoIP example" style="width:60%;">}}

## Use cases

The most common use case is detecting the location of a specific user. For example, we use the GeoIP Parser for iOS logs to provide the user location of the user identified in the logs.

## Before and after state of logs
{{% collapse-content title="Example: Enriching logs with GeoIP information" level="h4" %}}

**Before:**

```json
{
  "network": {
    "client": {
      "ip": "203.0.113.42"
    }
  },
  "http": {
    "method": "GET",
    "url": "/checkout",
    "status_code": 200
  }
}
```

**GeoIP Parser**

We create a GeoIP Processor with source attribute network.client.ip and a target root attribute: network.client.geoip.

**After processing:**

```json
{
  "network": {
    "client": {
      "ip": "203.0.113.42",
      "geoip": {
        "country": {
          "iso_code": "US",
          "name": "United States"
        },
        "city": {
          "name": "New York"
        },
        "location": {
          "lat": 40.7128,
          "lon": -74.0060
        }
      }
    }
  },
  "http": {
    "method": "GET",
    "url": "/checkout",
    "status_code": 200
  }
}
```

{{% /collapse-content %}}

## API

Use the [Datadog Log Pipeline API endpoint][1] with the following geoIP parser JSON payload:

```json
{
  "type": "geo-ip-parser",
  "name": "Parse the geolocation elements from network.client.ip attribute.",
  "is_enabled": true,
  "sources": ["network.client.ip"],
  "target": "network.client.geoip"
}
```

| Parameter    | Type             | Required | Description                                                                                                               |
|--------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                                                                                    |
| `name`       | String           | No       | Name of the processor.                                                                                                    |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`.                                                                     |
| `sources`    | Array of strings | No       | Array of source attributes. Default: `network.client.ip`.                                                                  |
| `target`     | String           | Yes      | Name of the parent attribute that contains all the extracted details from the `sources`. Default: `network.client.geoip`.  |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/logs-pipelines/

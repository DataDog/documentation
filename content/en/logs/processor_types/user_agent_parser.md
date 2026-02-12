---
title: User-Agent Parser
description: "Extract OS, browser, device, and other user data from user-agent attributes"
processor_type: user-agent-parser
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

The user-agent parser processor takes a `useragent` attribute and extracts OS, browser, device, and other user data. When set up, the following attributes are produced:

{{< img src="logs/processing/processors/useragent_processor.png" alt="Useragent Processor" style="width:80%;">}}

**Note**: If your logs contain encoded user-agents (for example, IIS logs), configure this Processor to **decode the URL** before parsing it.

## Use Cases
The User Agent Parser allows to extract useful information such as, for example, browser, divide, OS from apache logs.


##Before and After state of the logs for the Processors

{{% collapse-content title="Example: Parsing the User Agent in custom application logs" level="h4" %}}

**Before:**

```json
{
  "client": {
    "ip": "10.12.4.20",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Safari/537.36"
  },
  "http": {
    "method": "GET",
    "url": "/v1/orders",
    "status_code": 200
  },
  "timestamp": 1696945536000
}
```

**User-Agent Parser**

We create a User-Agent Parser processor and configure it to parse the user_agent attribute.

**After processing:**

```json
{
  "client": {
    "ip": "10.12.4.20",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Safari/537.36"
  },
  "http": {
    "method": "GET",
    "url": "/v1/orders",
    "status_code": 200,
    "useragent_details": {
      "browser": {
        "family": "Chrome",
        "major": "118",
        "minor": "0",
        "patch": "5993",
        "patch_minor": "90"
      },
      "device": {
        "brand": "Apple",
        "category": "Desktop",
        "family": "Mac",
        "model": "Mac"
      },
      "os": {
        "family": "Mac OS X",
        "major": "10",
        "minor": "15",
        "patch": "7"
      }
    }
  },
  "timestamp": 1696945536000
}
```

The User-Agent Parser automatically adds a new nested attribute (http.useragent_details) containing extracted components of the User Agent.

{{% /collapse-content %}}

## API

Use the [Datadog Log Pipeline API endpoint][1] with the following user-agent parser JSON payload:

```json
{
  "type": "user-agent-parser",
  "name": "Parses <SOURCE_ATTRIBUTE> to extract all its User-Agent information",
  "is_enabled": true,
  "sources": ["http.useragent"],
  "target": "http.useragent_details",
  "is_encoded": false
}
```

| Parameter    | Type             | Required | Description                                                                                                                 |
|--------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                                                                                      |
| `name`       | String           | No       | Name of the processor.                                                                                                      |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`.                                                                      |
| `sources`    | Array of strings | No       | Array of source attributes. Default: `http.useragent`.                                                                      |
| `target`     | String           | Yes      | Name of the parent attribute that contains all the extracted details from the `sources`. Default: `http.useragent_details`. |
| `is_encoded` | Boolean          | No       | Define if the source attribute is url encoded or not. Default: `false`.                                                     |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/logs-pipelines/

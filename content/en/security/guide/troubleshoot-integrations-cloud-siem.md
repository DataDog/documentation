---
title: Troubleshooting integrations in Cloud SIEM
description: Investigate why out-of-the-box Cloud SIEM content are not working when sending data with Cribl, and explore options on how to fix your configuration so that dashboards and detection rules work as expected.
further_reading:
- link: "/security/cloud_siem/"
  tag: "Documentation"
  text: "Cloud SIEM"
- link: "/security/default_rules"
  tag: "Documentation"
  text: "Out-of-the-box Cloud SIEM detection rules"
- link: "/security/cloud_siem/detection_rules/"
  tag: "Documentation"
  text: "Create custom detection rules"
- link: "/logs/log_configuration/pipelines/"
  tag: "Documentation"
  text: "Log pipelines"
---

## Overview

Cloud SIEM applies detection rules to all processed logs to detect threats and surfaces them as security signals. For out-of-the-box content, such as dashboards, log pipelines, and detection rules, to work correctly, Datadog must receive logs with the right `ddsource` value and with the log content in the `message` field.

When you use Cribl Stream to route logs to Datadog, the default destination configuration causes logs to arrive in an unexpected format. Using passthrough, Cribl serializes the entire event as a JSON string and places it inside the `message` field. This prevents Datadog from parsing the logs correctly, so OOTB dashboards do not populate and detection rules do not fire.

This guide explains the root cause of this behavior and how to configure your Cribl Datadog destination to forward logs in the correct format.

## How Cribl sends data by default

When Cribl forwards logs to Datadog without a pipeline and using passthrough, and the **Message Field** in the Datadog destination is left blank, Cribl wraps the entire event—including the raw log line, timestamp, host, source, and any other fields—into a JSON string and places it inside the `message` field. For example:

```json
[
  {
    "message": "{\"_raw\":\"2024-01-15 INFO user=john action=login src=10.0.0.1\",\"_time\":1705276800,\"host\":\"web-01\",\"source\":\"crowdstrike\",\"level\":\"INFO\",\"user\":\"john\"}",
    "hostname": "web-01",
    "ddsource": "crowdstrike",
    "ddtags": "env:prod"
  }
]
```

In this format, the actual log content is buried inside a stringified JSON object under `_raw`. Because the `message` field Datadog receives is not the raw log line, Datadog's log pipelines cannot parse it correctly, and OOTB dashboards and detection rules do not apply.

## Configure Cribl to forward logs correctly

To fix this, configure the **Message Field** in your Cribl Datadog destination to use `_raw`. This tells Cribl to extract only the raw log content and send it as the `message` value, dropping the JSON wrapper. With this setting in place, Datadog receives the log in the correct format:

```json
[
  {
    "message": "2024-01-15 INFO user=john action=login src=10.0.0.1",
    "hostname": "web-01",
    "ddsource": "crowdstrike",
    "ddtags": "env:prod"
  }
]
```

In this format, Datadog can parse the log correctly through the appropriate log pipeline.

### Steps

1. In Cribl Stream, navigate to **Routing** and open your **Datadog destination** configuration.
2. Under the **Message Field** setting, enter `_raw`.
3. Ensure the `ddsource` field is set to the correct value for your log source (for example, `crowdstrike` for CrowdStrike Falcon logs). This value determines which Datadog log pipeline, dashboards, and detection rules are applied.
4. Save and deploy your changes.

For details on configuring the Datadog destination in Cribl, see the [Cribl documentation][https://docs.cribl.io/stream/destinations-datadog/#:~:text=Message%20field%3A%20Name%20of%20the%20event%20field%20that%20contains%20the%20message%20to%20send.%20If%20not%20specified%2C%20Cribl%20Stream%20sends%20a%20JSON%20representation%20of%20the%20whole%20event%20(regardless%20of%20whether%20Send%20logs%20as%20is%20set%20to%20JSON%20or%20plain%20text).].

## Verify your configuration

After updating your Cribl destination configuration:

1. Go to [Log Explorer][log-explorer].
2. Search for logs from your source, for example `source:crowdstrike`.
3. Open a log and confirm the `message` field contains the raw log line (not a JSON-wrapped string).
4. Confirm that log pipeline processing has been applied correctly by checking that the log's attributes are parsed as expected.

If logs are appearing and parsing correctly, your Cribl configuration is working as expected and OOTB Cloud SIEM content will apply.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[cribl-docs]: https://docs.cribl.io/stream/destinations-datadog/
[log-explorer]: https://app.datadoghq.com/logs
[signals-explorer]: https://app.datadoghq.com/security
[default-rules]: /security/default_rules
[custom-rules]: /security/cloud_siem/detection_rules/
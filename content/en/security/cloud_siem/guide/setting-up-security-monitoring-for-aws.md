---
title: Setting Up Cloud SIEM for AWS
aliases:
  - /security_platform/guide/setting-up-security-monitoring-for-aws
  - /security_platform/cloud_siem/guide/setting-up-security-monitoring-for-aws
---

## Overview

With Datadog Cloud SIEM, detection rules are applied to all processed logs. AWS service logs are collected with a Datadog Lambda function. This Lambda triggers on S3 Buckets and forwards logs to Datadog. Follow the setup instructions below to get started:

## Setup

1. Navigate to the [Security Configuration Setup page][1] in the Datadog app.
2. Select {{< ui >}}Cloud SIEM{{< /ui >}}.
3. Under {{< ui >}}Secure your cloud environment{{< /ui >}}, select AWS.
4. Complete the {{< ui >}}Detect threats with cloud logs{{< /ui >}} setup.
5. (Optional) Complete the {{< ui >}}Secure your hosts and containers{{< /ui >}} setup.
6. (Optional) Complete the {{< ui >}}Detect threats in additional logging sources{{< /ui >}} setup.


[1]: https://app.datadoghq.com/security/configuration

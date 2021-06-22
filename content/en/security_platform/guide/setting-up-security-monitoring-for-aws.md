---
title: Setting Up Security Monitoring for AWS
kind: guide
---

## Overview

With Datadog Security Monitoring, detection rules are applied to all processed logs. AWS service logs are collected with a Datadog Lambda function. This Lambda triggers on S3 Buckets and forwards logs to Datadog. Follow the setup instructions below to get started:

## Setup

1. Navigate to the [Security Configuration Setup page][1] in the Datadog app.
2. Select **Security Monitoring**.
3. Under **Secure your cloud environment**, select AWS.
4. Complete the **Detect threats with cloud logs** setup.
5. (Optional) Complete the **Secure your hosts and containers** setup.
6. (Optional) Complete the **Detect threats in additional logging sources** setup.


[1]: https://app.datadoghq.com/security/configuration

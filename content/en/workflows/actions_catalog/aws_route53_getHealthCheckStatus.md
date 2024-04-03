---
bundle: com.datadoghq.aws.route53
bundle_title: AWS Route53
description: Get the status of a health check.
icon:
  integration_id: amazon-route-53
  type: integration_logo
input: '#/$defs/GetHealthCheckStatusInputs'
inputFieldOrder:
- region
- healthCheckId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetHealthCheckStatusOutputs'
permissions:
- route53:GetHealthCheckStatus
source: amazon-route-53
title: Get health check status
---

Get the status of a health check.

{{< workflows >}}

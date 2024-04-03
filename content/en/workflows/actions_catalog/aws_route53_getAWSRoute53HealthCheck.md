---
bundle: com.datadoghq.aws.route53
bundle_title: AWS Route53
description: Gets details about a health check.
icon:
  integration_id: amazon-route-53
  type: integration_logo
input: '#/$defs/GetAWSRoute53HealthCheckInputs'
inputFieldOrder:
- region
- resourceId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetAWSRoute53HealthCheckOutputs'
permissions:
- route53:GetHealthCheck
- route53:ListTagsForResource
source: amazon-route-53
stability: stable
title: Describe health check
---

Gets details about a health check.

{{< workflows >}}

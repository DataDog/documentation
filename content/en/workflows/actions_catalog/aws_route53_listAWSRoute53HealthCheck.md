---
bundle: com.datadoghq.aws.route53
bundle_title: AWS Route53
description: Lists health checks.
icon:
  integration_id: amazon-route-53
  type: integration_logo
input: '#/$defs/ListAWSRoute53HealthCheckInputs'
inputFieldOrder:
- region
keywords:
- all
- list
output: '#/$defs/ListAWSRoute53HealthCheckOutputs'
permissions:
- route53:ListHealthChecks
- route53:ListTagsForResource
source: amazon-route-53
stability: stable
title: List health checks
---

Lists health checks.

{{< workflows >}}

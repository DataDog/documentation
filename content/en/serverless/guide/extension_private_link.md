---
title: Datadog Lambda Extension AWS PrivateLink Setup
kind: guide
further_reading:
    - link: '/agent/guide/private-link/'
      tag: 'Documentation'
      text: 'Connect to Datadog over AWS PrivateLink'

---

<div class="alert alert-info">
Datadog exposes AWS PrivateLink endpoints in <b>us-east-1</b>.
</div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog PrivateLink does not support the Datadog for Government site.</div>
{{< /site-region >}}

This guide walks you through how to set up the [Datadog Lambda Extension](1) inside a VPC using [AWS PrivateLink](2).

## Overview

The Datadog Lambda Extension is a companion process that augments your Lambda functions to collect data such as logs, traces and metrics and forwards them to Datadog. For functions running inside a Virtual Private Cloud (VPC) network access may be restricted by Subnet routing rules and Network ACLs, preventing access to Datadog's API. This article covers adding Datadog's AWS PrivateLink endpoints to your VPC, and related setup of the Datadog Lambda Extension.

## Connect VPC to Datadog PrivateLink Endpoints

Add Datadog's Private Link endpoints to your VPC, as described in [this guide](3). The Extension requires the Metric, Log, API and Trace endpoints. For regions outside us-east-1, you may want to set up [inter-region peering](4).

## Extension Configuration

By default, the Extension uses different API endpoints to the Datadog Agent. Override the endpoints by setting the following environment variables on the lambda.

```
DD_URL="https://agent.datadoghq.com"
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_LOGS_DD_URL="agent-http-intake.logs.datadoghq.com"
```

Alterntaively, the Extension can also be configured by adding a [datadog.yaml](5) file in the same folder as the lambda handler code.

```
dd_url: https://agent.datadoghq.com
logs_config:
    use_http: true
    logs_dd_url: agent-http-intake.logs.datadoghq.com
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/enhanced_lambda_metrics
[2]: https://aws.amazon.com/privatelink/
[3]: /agent/guide/private-link/?tab=metrics#aws-vpc-endpoint
[4]: /agent/guide/private-link/?tab=logs#inter-region-peering
[5]: /agent/guide/agent-configuration-files

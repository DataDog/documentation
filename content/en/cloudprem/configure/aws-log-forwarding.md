---
title: Forward AWS Logs to CloudPrem
description: Learn how to configure the Datadog Lambda Forwarder to send AWS service logs to your CloudPrem deployment
further_reading:
- link: "/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/"
  tag: "Documentation"
  text: "Send AWS Services Logs with the Datadog Lambda Function"
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "CloudPrem Ingress Configuration"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

By default, the [Datadog Forwarder Lambda function][1] sends AWS service logs to the Datadog intake (`api.datadoghq.com`). You can override this endpoint to route logs to your CloudPrem deployment instead, so that AWS service logs are stored and indexed in your own infrastructure.

## Prerequisites

- A running CloudPrem deployment with [ingress configured][2].
- The [Datadog Forwarder Lambda function][1] deployed in your AWS account.
- Network connectivity between the Lambda function and your CloudPrem internal load balancer. If the forwarder runs in a different VPC, configure [VPC peering][3] or a [Transit Gateway][4] to allow traffic to reach the CloudPrem ingress endpoint.

## Configuration

Set the following environment variables on the Datadog Forwarder Lambda function to redirect logs to your CloudPrem ingress endpoint:

| Environment variable | Description |
| --- | --- |
| `DD_URL` | The hostname of your CloudPrem internal load balancer (for example, `cloudprem-ingress.internal.example.com`). |
| `DD_PORT` | The port of your CloudPrem ingress endpoint. |
| `DD_NO_SSL` | Set to `true` if your CloudPrem ingress endpoint does not use TLS. |

### Example

For a CloudPrem ingress endpoint at `cloudprem-ingress.internal.example.com` on port `443` with TLS enabled:

{{< code-block lang="text" >}}
DD_URL=cloudprem-ingress.internal.example.com
DD_PORT=443
{{< /code-block >}}

For an endpoint without TLS on port `8080`:

{{< code-block lang="text" >}}
DD_URL=cloudprem-ingress.internal.example.com
DD_PORT=8080
DD_NO_SSL=true
{{< /code-block >}}

You can set these environment variables in the AWS Lambda console, through CloudFormation, or with the AWS CLI:

```shell
aws lambda update-function-configuration \
  --function-name <FORWARDER_FUNCTION_NAME> \
  --environment "Variables={DD_URL=cloudprem-ingress.internal.example.com,DD_PORT=443,DD_API_KEY=<YOUR_API_KEY>}"
```

## Verify the configuration

After updating the environment variables, trigger the Lambda function by generating logs from one of the configured AWS services. Check the CloudPrem indexer logs to confirm that logs are being received, or search for the forwarded logs in Datadog Log Explorer.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/guide/forwarder/
[2]: /cloudprem/configure/ingress/
[3]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
[4]: https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html

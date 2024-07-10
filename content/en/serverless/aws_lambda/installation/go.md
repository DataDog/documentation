---
title: Instrumenting Go Serverless Applications
further_reading:
    - link: '/serverless/configuration'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: '/serverless/guide/troubleshoot_serverless_monitoring'
      tag: 'Documentation'
      text: 'Troubleshoot Serverless Monitoring'
    - link: 'serverless/custom_metrics/'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from Serverless Applications'
aliases:
    - /serverless/datadog_lambda_library/go/
    - /serverless/installation/go
---

<div class="alert alert-warning">If your Go Lambda functions are still using runtime <code>go1.x</code> and you cannot migrate to the <code>provided.al2</code> runtime, you must <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_go">instrument using the Datadog Forwarder</a>. Otherwise, follow the instructions in this guide to instrument using the Datadog Lambda Extension.</div>

<div class="alert alert-warning">If your Lambda functions are deployed in a VPC without access to the public internet, you can send data either <a href="/agent/guide/private-link/">using AWS PrivateLink</a> for the <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog site</a>, or <a href="/agent/configuration/proxy/">using a proxy</a> for all other sites.</div>

## Installation

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

To install and configure the Datadog Serverless Plugin, follow these steps:

### Install the Datadog Serverless Plugin:

```sh
serverless plugin install --name serverless-plugin-datadog
```

### Update your `serverless.yml`:

```yaml
custom:
  datadog:
    site: <DATADOG_SITE>
    apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
```

To fill in the placeholders:
- Replace `<DATADOG_SITE>` with your [Datadog site][3] to send the telemetry to.
- Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][4] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can instead use `apiKey` and set the Datadog API key in plaintext.

For more information and additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container Image" %}}

1. Install the Datadog Lambda Extension

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `latest-alpine`. You can see a complete list of possible tags in the [Amazon ECR repository][1].

2. Set the required environment variables

    - Set `DD_SITE` to {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Set `DD_API_KEY_SECRET_ARN` to the ARN of the AWS secret where your [Datadog API key][2] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `DD_API_KEY` instead and set the Datadog API key in plaintext.
    - Optionally set `DD_UNIVERSAL_INSTRUMENTATION: true` to take advantage of [advanced configurations][3] such as capturing the Lambda request and response payloads and inferring APM spans from incoming Lambda events.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /serverless/configuration/
{{% /tab %}}
{{% tab "Custom" %}}
### Install the Datadog Lambda Extension

[Add the Lambda layer][1] of Datadog Lambda Extension to your Lambda functions, using the ARN format based on your AWS region and architecture:

```sh
# Use this format for x86-based Lambda deployed in AWS commercial regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# Use this format for arm64-based Lambda deployed in AWS commercial regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

# Use this format for x86-based Lambda deployed in AWS GovCloud regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# Use this format for arm64-based Lambda deployed in AWS GovCloud regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
```

Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`.

### Configure the required environment variables

- Set `DD_SITE` to {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
- Set `DD_API_KEY_SECRET_ARN` to the ARN of the AWS secret where your [Datadog API key][2] is securely stored. The key needs to be stored as a plaintext string string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `DD_API_KEY` instead and set the Datadog API key in plaintext.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### Install the Datadog Lambda library

```
go get github.com/DataDog/datadog-lambda-go
```

### Update your Lambda function code

```go
package main

import (
	"context"
	"net/http"
	"time"

	ddlambda "github.com/DataDog/datadog-lambda-go"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
	// Wrap your lambda handler
	lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, _ events.APIGatewayProxyRequest) (string, error) {
	// Trace an HTTP request
	req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
	client := http.Client{}
	client = *httptrace.WrapClient(&client)
	client.Do(req)

	// Submit a custom metric
	ddlambda.Metric(
		"coffee_house.order_value",      // Metric name
		12.45,                           // Metric value
		"product:latte", "order:online", // Associated tags
	)

	// Create a custom span
	s, _ := tracer.StartSpanFromContext(ctx, "child.span")
	time.Sleep(100 * time.Millisecond)
	s.Finish()
	return "ok", nil
}

}
```

## What's next?

- Congratulations! You can now view metrics, logs, and traces on the [Serverless Homepage][1].
- Turn on [threat monitoring][4] to get alerted on attackers targeting your service
- See the [troubleshooting guide][2] if you have trouble collecting the telemetry
- See the [advanced configurations][3] to
    - connect your telemetry using tags
    - collect telemetry for Amazon API Gateway, SQS, etc.
    - capture the Lambda request and response payloads
    - link errors of your Lambda functions to your source code
    - filter or scrub sensitive information from logs or traces

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /serverless/guide/troubleshoot_serverless_monitoring/
[3]: /serverless/configuration/
[4]: /security/application_security/enabling/serverless/?tab=serverlessframework


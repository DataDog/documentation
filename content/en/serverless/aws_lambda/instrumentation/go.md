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
    - /serverless/aws_lambda/installation/go
---

<div class="alert alert-danger">If your Go Lambda functions are still using runtime <code>go1.x</code> and you cannot migrate to the <code>provided.al2</code> runtime, you must <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_go">instrument using the Datadog Forwarder</a>. Otherwise, follow the instructions in this guide to instrument using the Datadog Lambda Extension.</div>

<div class="alert alert-info">Version 67+ of the Datadog Lambda Extension is optimized to significantly reduce cold start duration. <a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">Read more</a>.</div>

{{< callout url="https://www.datadoghq.com/product-preview/agentic-onboarding-for-serverless-applications/" btn_hidden="false" header="Agentically add Datadog to your Lambda Functions">}}
Agentic onboarding for Datadog Serverless is in Preview. Use your favorite AI coding tool such as Cursor or Claude to bulk-add Datadog monitoring to your Lambda functions.
{{< /callout >}}

## Setup

**Note**: Datadog recommends that you use Go tracer v1.73.1 for instrumenting AWS Lambda functions. Go tracer v2 is not supported.

{{< tabs >}}
{{% tab "Datadog UI" %}}
You can instrument your Go AWS Lambda application directly within Datadog. Navigate to the [Serverless > AWS Lambda][2] page and select [**Instrument Functions**][3].

For more information, see [Remote instrumentation for AWS Lambda][1].

[1]: /serverless/aws_lambda/remote_instrumentation
[2]: https://app.datadoghq.com/functions?cloud=aws
[3]: https://app.datadoghq.com/serverless/aws/lambda/setup
{{% /tab %}}
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

{{% tab "AWS CDK" %}}
{{< lambda-install-cdk language="go" >}}
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
{{% tab "Terraform" %}}

The [`lambda-datadog`][1] Terraform module wraps the [`aws_lambda_function`][2] resource and automatically configures your Lambda function for Datadog Serverless Monitoring by:

- Adding the Datadog Lambda layers
- Redirecting the Lambda handler
- Enabling the collection and sending of metrics, traces, and logs to Datadog

```tf
module "lambda-datadog" {
  source  = "DataDog/lambda-datadog/aws"
  version = "4.0.0"

  environment_variables = {
    "DD_API_KEY_SECRET_ARN" : "<DATADOG_API_KEY_SECRET_ARN>"
    "DD_ENV" : "<ENVIRONMENT>"
    "DD_SERVICE" : "<SERVICE_NAME>"
    "DD_SITE": "<DATADOG_SITE>"
    "DD_VERSION" : "<VERSION>"
  }

  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}

  # aws_lambda_function arguments
}
```

1. Replace the `aws_lambda_function` resource with the `lambda-datadog` Terraform module. Then, specify the `source` and `version` of the module.

2. Set the `aws_lambda_function` arguments:

   All of the arguments available in the `aws_lambda_function` resource are available in this Terraform module. Arguments defined as blocks in the `aws_lambda_function` resource are redefined as variables with their nested arguments.

   For example, in `aws_lambda_function`, `environment` is defined as a block with a `variables` argument. In the `lambda-datadog` Terraform module, the value for the `environment_variables` is passed to the `environment.variables` argument in `aws_lambda_function`. See [inputs][3] for a complete list of variables in this module.

3. Fill in the environment variable placeholders:

   - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your Datadog API key is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can instead use the environment variable `DD_API_KEY` and set your Datadog API key in plaintext.
   - Replace `<ENVIRONMENT>` with the Lambda function's environment, such as `prod` or `staging`
   - Replace `<SERVICE_NAME>` with the name of the Lambda function's service
   - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}}. (Ensure the correct [Datadog site][4] is selected on this page).
   - Replace `<VERSION>` with the version number of the Lambda function

4. Select the version of the Datadog Extension Lambda layer to use. If left blank the latest layer version will be used.

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /getting_started/site/
{{% /tab %}}
{{% tab "SST v3" %}}

To configure Datadog using SST v3, follow these steps:

```ts
const app = new sst.aws.Function("MyApp", {
  handler: "./src",
  runtime: "go",
  environment: {
    DD_ENV: "<ENVIRONMENT>",
    DD_SERVICE: "<SERVICE_NAME>",
    DD_VERSION: "<VERSION>",
    DATADOG_API_KEY_SECRET_ARN: "<DATADOG_API_KEY_SECRET_ARN>",
    DD_SITE: "<DATADOG_SITE>",
  },
  layers: [
    $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`,
  ],
});
```

Fill in the environment variable placeholders:

  - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your Datadog API key is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can instead use the environment variable `DD_API_KEY` and set your Datadog API key in plaintext.
  - Replace `<ENVIRONMENT>` with the Lambda function's environment, such as `prod` or `staging`
  - Replace `<SERVICE_NAME>` with the name of the Lambda function's service
  - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}}. (Ensure the correct [Datadog site][1] is selected on this page).
  - Replace `<VERSION>` with the version number of the Lambda function

[1]: /getting_started/site/

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
- Set `DD_API_KEY_SECRET_ARN` to the ARN of the AWS secret where your [Datadog API key][2] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `DD_API_KEY` instead and set the Datadog API key in plaintext.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### Install the Datadog Lambda library

```
go get github.com/DataDog/dd-trace-go/contrib/aws/datadog-lambda-go/v2
```

### Update your Lambda function code

```go
package main

import (
	"context"
	"net/http"
	"time"

  ddlambda "github.com/DataDog/dd-trace-go/contrib/aws/datadog-lambda-go/v2"
  "github.com/aws/aws-lambda-go/events"
  "github.com/aws/aws-lambda-go/lambda"
  httptrace "github.com/DataDog/dd-trace-go/contrib/net/http/v2"
  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
	// Wrap your lambda handler
	lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, _ events.APIGatewayProxyRequest) (string, error) {
	// Trace an HTTP request
	req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
	client := http.Client{}
	client = httptrace.WrapClient(&client)
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
```

## FIPS compliance

{{% svl-lambda-fips %}}

## AWS Lambda and VPC

{{% svl-lambda-vpc %}}

## What's next?

- Add custom tags to your telemetry by using the `DD_TAGS` environment variable
- Configure [payload collection][8] to capture your functions' JSON request and response payloads
- If you are using the Datadog Lambda Extension, turn off the Datadog Forwarder's Lambda logs
- See [Configure Serverless Monitoring for AWS Lambda][3] for further capabilities

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /serverless/guide/troubleshoot_serverless_monitoring/
[3]: /serverless/configuration/
[4]: /security/application_security/serverless/
[5]: https://github.com/DataDog/datadog-lambda-extension
[6]: https://github.com/DataDog/datadog-lambda-extension/issues
[7]: /tracing/trace_collection/custom_instrumentation/go/migration
[8]: /serverless/aws_lambda/configuration?tab=datadogcli#collect-the-request-and-response-payloads

---
title: Instrumenting Go Serverless Applications
kind: documentation
further_reading:
- link: 'serverless/datadog_lambda_library/go'
  tag: 'Documentation'
  text: 'Datadog Lambda Library for Go'
- link: 'serverless/distributed_tracing/'
  tag: 'Documentation'
  text: 'Tracing Serverless Applications'
- link: 'serverless/custom_metrics/'
  tag: 'Documentation'
  text: 'Submitting Custom Metrics from Serverless Applications'
- link: '/serverless/guide/troubleshoot_serverless_monitoring'
  tag: 'Documentation'
  text: 'Troubleshoot Serverless Monitoring'
aliases:
    - /serverless/datadog_lambda_library/go/
---

{{< img src="serverless/go-lambda-tracing.png" alt="Monitor Go Lambda Functions with Datadog"  style="width:100%;">}}

## Configuration

If your Go Lambda functions are still using runtime `go1.x`, you must either [migrate][1] to `provided.al2` or use the [Datadog Forwarder][2] instead of the Datadog Lambda Extension.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

The Datadog CLI modifies existing Lambda functions' configurations to enable instrumentation without requiring a new deployment. It is the quickest way to get started with Datadog's serverless monitoring.

You can also add the [instrumentation command](#instrument) to your CI/CD pipelines to enable instrumentation for all your serverless applications. Run the command _after_ your normal serverless application deployment, so that changes made by the Datadog CLI command are not overridden.

### Install

Install the Datadog CLI with NPM or Yarn:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Configure credentials

For a quick start, configure Datadog and [AWS credentials][1] using the [instrumentation command](#instrument). For production applications, provide credentials in a more secure manner by using environment variables. For example:

```bash
export DATADOG_API_KEY="<DD_API_KEY>"
export DATADOG_SITE="<DD_SITE>" # such as datadoghq.com, datadoghq.eu, us3.datadoghq.com or ddog-gov.com
export AWS_ACCESS_KEY_ID="<ACCESS KEY ID>"
export AWS_SECRET_ACCESS_KEY="<ACCESS KEY>"
```

### Instrument

**Note**: Instrument your Lambda functions in a dev or staging environment first. If the instrumentation needs to be reverted, run `uninstrument` with the same arguments that was used for instrumentation.

To instrument your Lambda functions, run the following command:

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -e <extension_version>
```

To fill in the placeholders:

-   Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
-   Replace `<aws_region>` with the AWS region name.
-   Replace `<extension_version>` with the desired version of the Datadog Lambda Extension. The latest version is `{{< latest-lambda-layer-version layer="extension" >}}`.

For example:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -e {{< latest-lambda-layer-version layer="extension" >}}
```

More information and additional parameters can be found in the [Datadog Serverless CLI][2].


[1]: https://aws.github.io/aws-sdk-go-v2/docs/getting-started/#get-your-aws-access-keys
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically adds the Datadog Lambda Library to your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

To install and configure the Datadog Serverless Plugin, follow these steps:

1. Install the Datadog Serverless Plugin:
	  ```sh
    yarn add --dev serverless-plugin-datadog
    ```
2. In your `serverless.yml`, add the following:
    ```yaml
    plugins:
      - serverless-plugin-datadog
    ```

<div class="alert alert-info">If you are instead deploying your Serverless Framework app <a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">by natively exporting a JSON object from a JavaScript file</a> (for example, by using a <code>serverless.ts</code> file), follow the <a href="https://docs.datadoghq.com/serverless/installation/go?tab=custom">custom installation instructions</a>.</div>

3. In your `serverless.yml`, also add the following section:
    ```yaml
    custom:
      datadog:
        apiKey: # Your Datadog API Key goes here.
    ```
    Find your Datadog API key on the [API Management page][3]. For additional settings, see the [plugin documentation][1].



[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}
### Install the Datadog Lambda Extension

Add the Datadog Lambda Extension layer for your Lambda function using the ARN in the following format:

{{< site-region region="us,us3,eu" >}}
```
// For x86 lambdas
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
// For arm64 lambdas
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:<EXTENSION_VERSION>
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```
// For x86 lambdas
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>
// For arm64 lambdas
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:<EXTENSION_VERSION>
```
{{< /site-region >}}

The latest `EXTENSION_VERSION` is {{< latest-lambda-layer-version layer="extension" >}}.

{{% /tab %}}
{{< /tabs >}}
### Install the Datadog Lambda library

Install the [Datadog Lambda library][3] locally by running the following command:

```
go get github.com/DataDog/datadog-lambda-go
```
### Set up tracing
1. Set the environment variable `DD_API_KEY` to your Datadog API key from [API Management][4].
2. Set the environment variable `DD_TRACE_ENABLED` to `true`.
1. Import the required packages in the file declaring your Lambda function handler.

    ```go
    package main

    import (
      "github.com/aws/aws-lambda-go/lambda"
      "github.com/DataDog/datadog-lambda-go"
      "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
      httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    )
    ```
1. Wrap your Lambda function handler using the wrapper provided by the Datadog Lambda library.

    ```go
    func main() {
      // Wrap your lambda handler like this
      lambda.Start(ddlambda.WrapFunction(myHandler, nil))
      /* OR with manual configuration options
      lambda.Start(ddlambda.WrapFunction(myHandler, &ddlambda.Config{
        BatchInterval: time.Second * 15
        APIKey: "my-api-key",
      }))
      */
    }
    ```
1. Use the included libraries to create additional spans, connect logs and traces, and pass trace context to other services.
    ```go
    func myHandler(ctx context.Context, event MyEvent) (string, error) {
      // Trace an HTTP request
      req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
      client := http.Client{}
      client = *httptrace.WrapClient(&client)
      client.Do(req)

      // Connect your Lambda logs and traces
      currentSpan, _ := tracer.SpanFromContext(ctx)
      log.Printf("my log message %v", currentSpan)

      // Create a custom span
      s, _ := tracer.StartSpanFromContext(ctx, "child.span")
      time.Sleep(100 * time.Millisecond)
      s.Finish()
    }
    ```

### Unified service tagging

Datadog recommends tagging your serverless applications with `DD_ENV`, `DD_SERVICE`, `DD_VERSION`, and `DD_TAGS`. See the [Lambda extension documentation][5] for more details.

## Explore

After configuring your function following the steps above, view your metrics, logs, and traces on the [Serverless homepage][6].

## Monitor custom business logic

If you would like to submit a custom metric, see the sample code below:

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  // Wrap your handler function
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // Submit a custom metric
  ddlambda.Metric(
    "coffee_house.order_value", // Metric name
    12.45, // Metric value
    "product:latte", "order:online" // Associated tags
  )

  req, err := http.NewRequest("GET", "http://example.com/status")

  // Add the datadog distributed tracing headers
  ddlambda.AddTraceHeaders(ctx, req)

  client := http.Client{}
  client.Do(req)
}
```

For more information, see the [Custom Metrics documentation][7].

If your Lambda function is running in a VPC, follow these [instructions][8] to ensure that the extension can reach Datadog API endpoints.


## Troubleshooting

If you have trouble collecting monitoring data after following the instructions above, see the [serverless monitoring troubleshooting guide][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/blogs/compute/migrating-aws-lambda-functions-to-al2/
[2]: /serverless/guide/datadog_forwarder_go
[3]: https://github.com/DataDog/datadog-lambda-go
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /serverless/libraries_integrations/extension/#tagging
[6]: https://app.datadoghq.com/functions
[7]: /serverless/custom_metrics?tab=go
[8]: /serverless/libraries_integrations/extension/#vpc
[9]: /serverless/guide/troubleshoot_serverless_monitoring/

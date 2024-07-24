---
title: Instrumenting Ruby Serverless Applications Using the Datadog Forwarder

---

## Overview

<div class="alert alert-warning">
If you are a new user of Datadog Serverless, follow the <a href="/serverless/installation/ruby">instructions to instrument your Lambda functions using the Datadog Lambda Extension</a> instead. If you have setup Datadog Serverless with the Datadog Forwarder before Lambda offered out-of-the-box functionality, use this guide to maintain your instance.
</div>

## Prerequisites

The [Datadog Forwarder Lambda function][1] is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs.

## Configuration

{{< tabs >}}
{{% tab "Datadog CLI" %}}

The Datadog CLI modifies existing Lambda functions' configurations to enable instrumentation without requiring a new deployment. It is the quickest way to get started with Datadog's serverless monitoring.

You can also add the command to your CI/CD pipelines to enable instrumentation for all your serverless applications. Run the command *after* your normal serverless application deployment, so that changes made by the Datadog CLI command are not overridden.

### Install

Install the Datadog CLI with NPM or Yarn:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrument

To instrument the function, run the following command with your [AWS credentials][1].

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder <forwarder_arn>
```

To fill in the placeholders:
- Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
- Replace `<aws_region>` with the AWS region name.
- Replace `<layer_version>` with the desired version of the Datadog Lambda Library. The latest version is `{{< latest-lambda-layer-version layer="ruby" >}}`.
- Replace `<forwarder_arn>` with the Forwarder ARN (see the [Forwarder documentation][2]).

For example:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="ruby" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][4] before you can instrument it with the Datadog CLI.

More information and additional parameters can be found in the [CLI documentation][3].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Plugin][1] automatically adds the Datadog Lambda library to your functions using layers, and configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Forwarder][2].

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][3] before you install the Datadog Serverless Plugin.

To install and configure the Datadog Serverless Plugin, follow these steps:

1. Install the Datadog Serverless Plugin:
	```
    yarn add --dev serverless-plugin-datadog
    ```
2. In your `serverless.yml`, add the following:
    ```
    plugins:
      - serverless-plugin-datadog
    ```
3. In your `serverless.yml`, also add the following section:
    ```
    custom:
      datadog:
        forwarderArn: # The Datadog Forwarder ARN goes here.
    ```
    More information on the Datadog Forwarder ARN or installation can be found [here][2]. For additional settings, see the [plugin documentation][1].


[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Custom" %}}

### Install

The Datadog Lambda Library can be installed as a layer or a gem. For most functions, Datadog recommends installing the library as a layer. If your Lambda function is deployed as a container image, you must install the library as a gem.

The minor version of the `datadog-lambda` gem always matches the layer version. For example, datadog-lambda v0.5.0 matches the content of layer version 5.

#### Using the layer

[Configure the layers][1] for your Lambda function using the ARN in the following format.

```
# For us,us3,us5,eu regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

The available `RUNTIME` options are `Ruby2-7`, and `Ruby3-2`. The latest `VERSION` is `{{< latest-lambda-layer-version layer="ruby" >}}`. For example:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby3-2:{{< latest-lambda-layer-version layer="ruby" >}}
```

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][4] before you can add the Datadog Lambda library as a layer.

#### Using the gem

If you cannot use the prebuilt Datadog Lambda layer, you can add the following to your Gemfile as an alternative:

```Gemfile
gem 'datadog-lambda'
gem 'ddtrace'
```

`ddtrace` contains native extensions that must be compiled for Amazon Linux to work with AWS Lambda. Datadog therefore recommends that you build and deploy your Lambda as a container image. If your function cannot be deployed as a container image and you would like to use Datadog APM, Datadog recommends installing the Lambda Library as a layer instead of as a gem.

Install `gcc`, `gmp-devel`, and `make` prior to running `bundle install` in your function's Dockerfile to ensure that the native extensions can be successfully compiled.

```dockerfile
FROM <base image>

# assemble your container image

RUN yum -y install gcc gmp-devel make
RUN bundle config set path 'vendor/bundle'
RUN bundle install
```

### Configure

Enable Datadog APM and wrap your Lambda handler function using the wrapper provided by the Datadog Lambda library.

```ruby
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Enable the instrumentation
end

def handler(event:, context:)
    Datadog::Lambda.wrap(event, context) do
        return { statusCode: 200, body: 'Hello World' }
    end
end
```

### Subscribe

Subscribe the Datadog Forwarder Lambda function to each of your function's log groups. This enables sending metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Subscribe the Datadog Forwarder to your function's log groups][3].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{< /tabs >}}

### Tag

Although it's optional, Datadog recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][2].

## Explore

After configuring your function following the steps above, view your metrics, logs, and traces on the [Serverless homepage][3].

### Monitor custom business logic

If you would like to submit a custom metric or span, see the sample code below:

```ruby
require 'ddtrace'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Enable the instrumentation
end

def handler(event:, context:)
    # Apply the Datadog wrapper
    Datadog::Lambda::wrap(event, context) do
        # Add custom tags to the lambda function span,
        # does NOT work when X-Ray tracing is enabled
        current_span = Datadog::Tracing.active_span
        current_span.set_tag('customer.id', '123456')

        some_operation()

        Datadog::Tracing.trace('hello.world') do |span|
          puts "Hello, World!"
        end

        # Submit a custom metric
        Datadog::Lambda.metric(
          'coffee_house.order_value', # metric name
          12.45, # metric value
          time: Time.now.utc, # optional, must be within last 20 mins
          "product":"latte", # tag
          "order":"online" # another tag
        )
    end
end

# Instrument the function
def some_operation()
    Datadog::Tracing.trace('some_operation') do |span|
        # Do something here
    end
end
```

For more information on custom metric submission, see [Serverless Custom Metrics][4]. For additional details on custom instrumentation, see the Datadog APM documentation for [custom instrumentation][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /serverless/forwarder
[2]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /serverless/custom_metrics?tab=ruby
[5]: /tracing/custom_instrumentation/ruby/

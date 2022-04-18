---
title: Instrumenting Ruby Serverless Applications
kind: documentation
further_reading:
- link: 'serverless/datadog_lambda_library/ruby'
  tag: 'Documentation'
  text: 'Datadog Lambda Library for Ruby'
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
    - /serverless/datadog_lambda_library/ruby/
---

## Prerequisites

The [Datadog Forwarder Lambda function][1] is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs.

## Installation

1. Install the Datadog Lambda Library

    The Datadog Lambda Library can be installed as a layer or a gem. For most functions, Datadog recommends installing the library as a layer. If your Lambda function is deployed as a container image, you must install the library as a gem.

    The minor version of the `datadog-lambda` gem always matches the layer version. For example, datadog-lambda v0.5.0 matches the content of layer version 5.

    - Option A: [Configure the layers][2] for your Lambda function using the ARN in the following format.

      ```
      # For regular regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}

      # For us-gov regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Ruby2-7:{{< latest-lambda-layer-version layer="ruby" >}}
      ```

      Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`.

    - Option B: If you cannot use the prebuilt Datadog Lambda layer, alternatively you can add the following to your Gemfile:

      ```Gemfile
      gem 'datadog-lambda'
      gem 'ddtrace'
      ```

      `ddtrace` contains native extensions that must be compiled for Amazon Linux to work with AWS Lambda. Datadog therefore recommends that you build and deploy your Lambda as a container image. If your function cannot be deployed as a container image and you would like to use Datadog APM, Datadog recommends installing the Lambda Library as a layer instead of as a gem.

      Install `gcc`, `gmp-devel`, and `make` prior to running `bundle install` in your function’s Dockerfile to ensure that the native extensions can be successfully compiled.

      ```dockerfile
      FROM <base image>

      # assemble your container image

      RUN yum -y install gcc gmp-devel make
      RUN bundle config set path 'vendor/bundle'
      RUN bundle install
      ```

2. Configure your Lambda functions

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

3. Subscribe the Datadog Forwarder to log groups

    Subscribe the Datadog Forwarder Lambda function to each of your function’s log groups to send metrics, traces and logs to Datadog.

    1. [Install the Datadog Forwarder if you haven't][1].
    2. [Subscribe the Datadog Forwarder to your function's log groups][3].


## What's next?

- Congratulations! You can now view metrics, logs, and traces on the [Serverless Homepage][4].
- See the sample code to [monitor custom business logic](#monitor-custom-business-logic)
- See the [troubleshooting guide][5] if you have trouble collecting the telemetry
- See the [advanced configurations][6] to
    - connect your telemetry using tags
    - collect telemetry for AWS API Gateway, SQS, etc.
    - capture the Lambda request and response payloads
    - link errors of your Lambda functions to your source code
    - filter or scrub sensitive information from logs or traces

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
        current_span = Datadog.tracer.active_span
        current_span.set_tag('customer.id', '123456')

        some_operation()

        Datadog.tracer.trace('hello.world') do |span|
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
    Datadog.tracer.trace('some_operation') do |span|
        # Do something here
    end
end
```

For more information on custom metric submission, see [here][7]. For additional details on custom instrumentation, see the Datadog APM documentation for [custom instrumentation][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/forwarder/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://app.datadoghq.com/functions
[5]: /serverless/guide/troubleshoot_serverless_monitoring/
[6]: /serverless/configuration
[7]: /serverless/custom_metrics?tab=ruby
[8]: /tracing/custom_instrumentation/ruby/

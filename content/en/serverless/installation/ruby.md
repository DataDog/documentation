---
title: Instrumenting Ruby Applications
kind: documentation
further_reading:
- link: 'serverless/serverless_tagging/'
  tag: 'Documentation'
  text: 'Tagging Serverless Applications'
- link: 'serverless/distributed_tracing/'
  tag: 'Documentation'
  text: 'Tracing Serverless Applications'
- link: 'serverless/custom_metrics/'
  tag: 'Documentation'
  text: 'Submitting Custom Metrics from Serverless Applications'
aliases:
    - /serverless/datadog_lambda_library/ruby/
---

## Required setup

If not already configured:

- Install the [AWS integration][1]. This allows Datadog to ingest Lambda metrics from AWS. 
- Install the [Datadog Forwarder Lambda function][2], which is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs. 

After you have installed the [AWS integration][1] and the [Datadog Forwarder][2], follow these steps to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

### Install

The Datadog Lambda Library can be installed as a layer or a gem. For most functions, Datadog recommends installing the library as a layer. If your Lambda function is deployed as a container image, you must install the library as a gem.

The minor version of the `datadog-lambda` gem always matches the layer version. E.g., datadog-lambda v0.5.0 matches the content of layer version 5.

#### Using the layer

[Configure the layers][3] for your Lambda function using the ARN in the following format.

```
# For regular regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

The available `RUNTIME` options are `Ruby2-5` and `Ruby2-7`. For `VERSION`, see the [latest release][4]. For example:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby2-7:5
```

If your Lambda function is configured to use code signing, you must add Datadog's Signing Profile ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) to your function's [Code Signing Configuration][5] before you can add the Datadog Lambda library as a layer.

#### Using the gem

Add the following to your Gemfile:

```Gemfile
gem 'datadog-lambda'
```

To use Datadog APM, you must also add `ddtrace` as a second dependency in your Gemfile.

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

### Configure the function

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

Subscribe the Datadog Forwarder Lambda function to each of your function’s log groups to send metrics, traces and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Subscribe the Datadog Forwarder to your function's log groups][6].

### Tag

Although it's optional, Datadog highly recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][7].

## Explore

After configuring your function following the steps above, view your metrics, logs, and traces on the [Serverless homepage][8].

## Monitor custom business logic

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

For more information on custom metric submission, see [here][9]. For additional details on custom instrumentation, see the Datadog APM documentation for [custom instrumentation][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: /serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[4]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[6]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[8]: https://app.datadoghq.com/functions
[9]: /serverless/custom_metrics?tab=ruby
[10]: /tracing/custom_instrumentation/ruby/

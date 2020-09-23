---
title: Instrumenting Ruby Applications
kind: documentation
further_reading:
    - link: 'serverless/installation/node'
      tag: 'Documentation'
      text: 'Installing Node.js Serverless Monitoring'
    - link: 'serverless/installation/ruby'
      tag: 'Documentation'
      text: 'Installing Ruby Serverless Monitoring'
---

After you have installed the [AWS integration][1] and the [Datadog Forwarder][2], choose one of the following methods to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

### Install the Datadog Lambda Library

The Datadog Lambda Library can be imported as a layer or a gem.

The minor version of the `datadog-lambda` gem always matches the layer version. E.g., datadog-lambda v0.5.0 matches the content of layer version 5.

#### Using the Layer

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

#### Using the Gem

Add the following line to your Gemfile. See the [latest release][5].

```
gem 'datadog-lambda'
gem 'ddtrace'
```

Keep in mind that `ddtrace` uses native extensions, which must be compiled for Amazon Linux before being packaged and uploaded to Lambda. For this reason, Datadog recommends using the layer.

### Subscribe the Datadog Forwarder to the Log Groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups to send metrics, traces and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Ensure the option DdFetchLambdaTags is enabled][6].
3. [Subscribe the Datadog Forwarder to your function's log groups][7].

## Explore Datadog Serverless Monitoring

After you have configured your function following the steps above, you should be able to view metrics, logs and traces on the [Serverless Homepage][8].

### Monitor Custom Business Metrics

If you would like to submit a custom metric or manually instrument a function, see the sample code below:

```ruby
require 'ddtrace'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Enable the instrumentation
end

def handler(event:, context:)
    # Apply the Datadog wrapper
    Datadog::Lambda::wrap(event, context) do
        some_operation()
        # Submit a custom metric
        Datadog::Lambda.metric(
            'coffee_house.order_value', # metric name
            12.45, # metric value
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
[Enable custom metric submission][3] to get started.

### Enable the AWS X-Ray Integration

Datadog’s integration with AWS X-Ray allows you to visualize end-to-end serverless transactions, so you can zero in on the source of any errors or slowdowns, and see how the performance of your functions impacts your users’ experience. Depending on your language and configuration, [choose between setting up Datadog APM or the AWS X-Ray integration][5] for your tracing needs.

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="Architecture diagram for tracing AWS Lambda with Datadog" >}}

[1]: /serverless/#1-install-the-cloud-integration
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[4]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[5]: https://rubygems.org/gems/datadog-lambda
[6]: https://docs.datadoghq.com/serverless/forwarder/#experimental-optional
[7]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://app.datadoghq.com/functions

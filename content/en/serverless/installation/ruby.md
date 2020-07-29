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

After you have [installed the AWS integration][1], follow the steps below to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

### Install the Datadog Lambda Library

The Datadog Lambda Library can be imported as a layer or a gem.

The minor version of the `datadog-lambda` gem always matches the layer version. E.g., datadog-lambda v0.5.0 matches the content of layer version 5.

#### Using the Layer

[Configure the layers][2] for your Lambda function using the ARN in the following format:

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

For example:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby2-7:5
```

The available `RUNTIME` options are `Ruby2-5` and `Ruby2-7`. For more information, see the [latest release][3].

#### Using the Gem

Add the following line to your Gemfile. See the [latest release][4].

```
gem 'datadog-lambda'
gem 'ddtrace'
```

Keep in mind that `ddtrace` uses native extensions, which must be compiled for Amazon Linux before being packaged and uploaded to Lambda. For this reason, Datadog recommends using the layer.

### Subscribe the Datadog Forwarder to the Log Groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups to send metrics, traces and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][5].
2. [Ensure the option DdFetchLambdaTags is enabled][6].
3. [Subscribe the Datadog Forwarder to your function's log groups][7].

## Explore Datadog Serverless Monitoring

After you have configured your function following the steps above, you should be able to view metrics, logs and traces on the [Serverless page][8]. If you need to submit a custom metric, refer to the sample code below:

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


[1]: /serverless/#1-install-the-cloud-integration
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[4]: https://rubygems.org/gems/datadog-lambda
[5]: https://docs.datadoghq.com/serverless/troubleshooting/installing_the_forwarder
[6]: https://docs.datadoghq.com/serverless/troubleshooting/installing_the_forwarder/#ddfetchlambdatags
[7]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#send-aws-service-logs-to-datadog
[8]: https://app.datadoghq.com/functions

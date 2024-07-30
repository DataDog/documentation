---
title: Troubleshoot AWS Lambda Monitoring
further_reading:
- link: '/serverless/installation/'
  tag: 'Documentation'
  text: 'Installing Serverless Monitoring'
- link: '/serverless/guide/#troubleshoot-your-installation'
  tag: 'Documentation'
  text: 'Troubleshoot Common Issues'
aliases:
  - /serverless/guide/troubleshoot_serverless_monitoring
  - /serverless/guide/troubleshooting
  - /serverless/troubleshooting
---

<div class="alert alert-info">Check out the additional <a href="/serverless/guide/#troubleshoot-your-installation">troubleshooting guides</a> for common issues such as the function code size is too large or webpack compatibility. This guide helps you troubleshoot general telemetry collection issues.</div>

## Understand the basics

To better understand the instructions from this guide, familiarize yourself with the [key concepts][1] first. A better understanding on how things work helps you identify the missing pieces and narrow down probable causes.

## Use the Datadog Lambda Extension instead of the Forwarder

If you are still using the [Datadog Forwarder Lambda function][2] for data collection, consider adopting the [Datadog Lambda Extension][3] instead. Because the technical limitations of the Forwarder Lambda cause a number of known issues, migrating to the Lambda Extension can resolve them automatically.

* If you are unsure whether your Lambda is using the Extension, check your Lambda function's [layer configurations][4] and see if any Lambda layer is named `Datadog-Extension`.

* If you are unsure whether your Lambda is using the Forwarder, check the [subscription filters][5] of your Lambda function's log group, and see if the log group is subscribed by a Lambda named `Datadog Forwarder` or something similar.

See this [comparison guide][6] to understand the benefits of using the Extension and this [migration guide][7] for the general migration steps. Test your changes in a dev or staging environment first!

To continue using the Forwarder, see this [Forwarder troubleshooting guide][8] for more help.

## Ensure the configurations are up-to-date and expected

Check out the [installation guides][9] with up-to-date instructions about applications you may have configured for Datadog monitoring in the past.

To ensure the actual changes made to your Lambda functions are expected, try setting up another testing function and configuring it following the instructions for _Datadog CLI_ or _Custom_. Compare the changes (such as handler, layers, environment variables, and tags) made on your real Lambda functions against the testing one.

## Collect debugging logs

Enable verbose debugging logs by setting the environment variable `DD_LOG_LEVEL` to `debug` on your Lambda functions. If you are using the [Datadog Forwarder Lambda function][2] for data forwarding from logs, also set `DD_LOG_LEVEL` to `debug` on the Forwarder Lambda function.

If you have issues with tracing, set the environment variable `DD_TRACE_DEBUG` to `true` for extra debugging logs from the Datadog Tracer.

To avoid unnecessary costs, disable the debugging logs after you collect enough data.

## Check the AWS integration

Datadog can collect metrics and resource tags from AWS through an [integration with AWS][10] (optional). If you are missing certain metrics from CloudWatch and Lambda resource tags, ensure that the AWS integration is properly configured.

## Ensure the tags are configured

If you have trouble applying the Datadog standard `service`, `env`, and `version` tags to the collected data, make sure the environment variables `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` are configured on your Lambda functions. For custom tags, ensure `DD_TAGS` is configured.

If you want to enrich the data collected with your AWS Lambda resource tags, make sure the [Datadog integration for AWS][10] is properly configured.

## Get help

For quick questions, post in the _#serverless_ channel of the [Datadog Slack community][11].

If you have followed all the troubleshooting steps above and want help from [Datadog Support][12], use one of the following methods to send relevant configuration information to support.

{{< tabs >}}
{{% tab "Serverless Flare" %}}
1. Create a [Zendesk ticket](https://help.datadoghq.com/hc/en-us/requests/new).
2. Download the latest version of the [Datadog CLI](https://github.com/DataDog/datadog-ci/#how-to-install-the-cli).

    ```sh
    npm install -g @datadog/datadog-ci
    ```

3. Use the Serverless Flare command from the root of your project directory to automatically collect and submit data about your Lambda function to Datadog Support.

    ```sh
    datadog-ci lambda flare -f <function_arn> -e <email> -c <case_id> --with-logs
    ```

<div class="alert alert-info">For more information about Serverless Flare, read the <a href="https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md#troubleshooting-serverless-instrumentation">command documentation</a>.</div>
{{% /tab %}}
{{% tab "Manually" %}}

Create a [Zendesk ticket](https://help.datadoghq.com/hc/en-us/requests/new), and include the following information in your ticket:

1. Basic information about your Lambda function: ARN, runtime, handler, layers, environment variables, and tags. Focus on one function first if you have the same issue with many.
2. If the Lambda function is configured to send data through logs using the Datadog Forwarder, include basic information about the Forwarder Lambda function. Also, provide the subscription filters configured on your Lambda function's log group.
3. The installation method you followed, such as _Serverless Framework_ or _AWS CDK_.
4. The alternative installation method you attempted, such as _Datadog CLI_ or _Custom_.
5. Debugging logs from your own Lambda function.
6. Debugging logs from the Datadog Forwarder Lambda function (if used).
7. The project configuration files, with **redacted hardcoded secrets**, such as `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json`, and `webpack.config.json`.
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/glossary/#datadog-serverless-for-aws-lambda-concepts
[2]: /logs/guide/forwarder/
[3]: /serverless/libraries_integrations/extension/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html
[6]: /serverless/guide/extension_motivation/
[7]: /serverless/configuration/#migrate-to-the-datadog-lambda-extension
[8]: /logs/guide/lambda-logs-collection-troubleshooting-guide/
[9]: /serverless/installation/
[10]: /integrations/amazon_web_services/
[11]: https://chat.datadoghq.com/
[12]: https://www.datadoghq.com/support/

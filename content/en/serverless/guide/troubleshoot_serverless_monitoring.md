---
title: Troubleshoot Serverless Monitoring
kind: documentation
further_reading:
- link: '/serverless/installation/'
  tag: 'Documentation'
  text: 'Installing Serverless Monitoring'
- link: '/serverless/guide/'
  tag: 'Documentation'
  text: 'Troubleshoot Common Issues'
---

This guide helps you troubleshoot general data collection issues for serverless monitoring, such as missing metrics, traces, logs or tags. Check out other [troubleshooting guides][1] for specific and common issues, such as function code size is too large, and webpack compatibility.

## Understand the basics

To better understand the instructions from this guide, be sure to familiarize yourself with the [key concepts][2] first. A better understanding on how things work helps you identify the missing pieces and narrow down probable causes.

## Use Datadog Lambda Extension instead of the Forwarder

If you are still using the [Datadog Forwarder Lambda function][3] for data collection, consider adopting the [Datadog Lambda Extension][4] instead. Many known issues due to the technical limitations from the Forwarder Lambda can be resolved automatically after migrating to the Lambda Extension.

If you are unsure whether your Lambda is using the Extension, check your Lambda function's [layer configurations][5] and see if any Lambda layer is named `Datadog-Extension`.

If you are unsure whether your Lambda is using the Forwarder, check the [subscription filters][6] of your Lambda function's log group, and see if the log group is subscribed by a Lambda named `Datadog Forwarder` or something similar.

See this [comparison guide][7] to understand the benefits of using the Extension and this [migration guide][8] for the general migration steps. Be sure to test the changes in your _dev_ or _staging_ environment first!

If you do want to continue using the Forwarder, see this [Forwarder troubleshooting guide][9] for additional help as well.

## Ensure the configurations are up-to-date and expected

Be sure to check out the [installation guides][10] for the up-to-date instructions, especially for applications configured for Datadog monitoring in the past, as things might have changed.

To ensure the actual changes made to your Lambda functions are expected, try setting up another testing function and configure it following the instructions for _Datadog CLI_ or _Custom_. Compare the changes, such as handler, layers, environment variables, and tags, made on your real Lambda functions against the testing one for differences.

## Collect the debugging logs

Enable verbose debugging logs by setting the environment variable `DD_LOG_LEVEL` to `debug` on your Lambda functions. If you are using the [Datadog Forwarder Lambda function][3] for data forwarding from logs, also set `DD_LOG_LEVEL` to `debug` on the Forwarder Lambda function. 

If you have issues with tracing, set the environment variable `DD_TRACE_DEBUG` to `true` for extra debugging logs from the Datadog tracer.

To avoid unnecessary costs, disable the debugging logs after collecting enough data.

## Check the AWS integration

Datadog can collect metrics and resource tags from AWS through the optional [integration with AWS][11]. If you are missing certain metrics from CloudWatch and Lambda resource tags, check whether the AWS integration is properly configured. 

## Ensure the tags are configured

If you have trouble applying the Datadog standard `service`, `env` and `version` tags to the collected data, make sure the environment variables `DD_SERVICE`, `DD_ENV` and `DD_VERSION` are configured on your Lambda functions. For custom tags, ensure `DD_TAGS` is configured.

If you want to enrich the data collected with your AWS Lambda resource tags, make sure the [Datadog integration for AWS][11] is properly configured.

## Get help

For quick questions, post in the _#serverless_ channel of the [Datadog community on Slack][12].

If you have followed all the troubleshooting steps above and need help from the [Datadog support][13] for a deeper investigation, be sure to include the following information in your ticket.

1. Basic information about your Lambda function -- ARN, runtime, handler, layers, environment variables and tags. Focus on one function first if you have the same issue with many.
1. If the Lambda function configured to send data through logs using the Datadog Forwarder Lambda function, be sure to include the basic information about the Forwarder Lambda function, as well as the subscription filters configured on your own Lambda function's log group.
1. The installation method followed, such as _Serverless Framework_ or _AWS CDK_.
1. The alternative installation method attempted, such as _Datadog CLI_ or _Custom_.
1. Debugging logs from your own Lambda function.
1. Debugging logs from the Datadog Forwarder Lambda function (if used).
1. The project configuration files, with **redacted hardcoded secrets**, such as `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json` and `webpack.config.json`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/guide/
[2]: /serverless/glossary/#datadog-serverless-for-aws-lambda-concepts
[3]: /serverless/libraries_integrations/forwarder/
[4]: /serverless/libraries_integrations/extension/
[5]: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html
[6]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html
[7]: /serverless/guide/extension_motivation/
[8]: /serverless/guide/forwarder_extension_migration/
[9]: /logs/guide/lambda-logs-collection-troubleshooting-guide/
[10]: /serverless/installation/
[11]: /integrations/amazon_web_services/
[12]: https://chat.datadoghq.com/
[13]: https://www.datadoghq.com/support/

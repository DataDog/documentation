---
title: Serverless Billing
kind: documentation
---

## Overview

Purchase Serverless function invocations on [Datadog Pro and Enterprise plans][1]. Datadog bills based on the sum of AWS Lambda invocations across the month for your accounts. Pro and Enterprise plans include 150,000 Indexed Spans and 5 custom metrics per billed million invocations. Contact [Sales][2] or your [Customer Success Manager][3] for more information about adding Serverless to your account.

**Note:** If you are using a previous billing model for Datadog's Serverless Monitoring and would like to move to invocation-based billing, contact your [Customer Success Manager][3].

## Serverless invocations

Datadog charges by calculating the sum of the your AWS Lambda function invocations at the end of the month.

For Serverless pricing information, see the [Datadog pricing page][1].

## Tracking usage

You can track the number of billable Serverless invocations in your account by checking the [Datadog Usage Page][4]. You can see both the Month-To-Date summary, as well as usage over time.

To control the functions whose invocations Datadog is monitoring, filter out particular functions by sorting by tag with the [UI](#ui) or by using the [API](#api). 

**Note**: It takes some time for the excluded functions to disappear from the [Datadog serverless page][8] and [Datadog usage page][4]. Verify the filtering rules by checking the [`aws.lambda.invocations`][9] metric for the filtered functions. When Datadog stops monitoring a function, the value of `aws.lambda.invocations` falls to 0.

### UI

To use the UI to control which AWS Lambda functions Datadog is monitoring, navigate to the [AWS Integration page][5] and add tags as `key:value` sets to the **to Lambdas with tag:** field.

To exclude functions with a given tag, add a `!` before the tag key. For example:

`!env:staging,!env:test1`

This filter excludes anything that is tagged with `env:staging` or `env:test1`.

### API

To use the API to control limit which AWS Lambda functions Datadog is monitoring, reference the [tag filter documentation][6].

## Troubleshooting

For technical questions, contact [Datadog support][7].

For billing questions, contact your [Customer Success][3] Manager.

[1]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /api/latest/aws-integration/#set-an-aws-tag-filter
[7]: /help/
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/metric/explorer?exp_metric=aws.lambda.invocations&exp_group=functionname&exp_agg=sum

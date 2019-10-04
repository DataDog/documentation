---
title: Serverless billing
kind: faq
---

## Overview

Purchase serverless functions on [Datadog Pro and Enterprise plans][1]. Datadog bills based on the average of your accounts hourly functions across the month.  Pro and Enterprise plans include 40 custom metrics per billed function. Contact [Sales][2] or your [Customer Success Manager][3] for more information about adding Serverless to your account.

## Serverless Functions

Every hour, Datadog records the number of functions that were executed one or more times and monitored by your Datadog account. At the end of the month, Datadog charges by calculating the average of the hourly number of functions recorded.

The billed number of functions is almost always significantly lower than the number you see on the Serverless page or in your AWS Console because of the average hourly metering. Functions that run infrequently are less likely to affect your bill, and sudden spikes in traffic won't cost you extra.

For Serverless pricing information, see the infrastructure section in [Datadogs pricing page][1].

## Tracking Usage

You can track the number of billable Serverless Functions in your account by checking the [Datadog Usage Page][4]. You can see both the Month-To-Date summary, as well as usage over time.

To control the number of functions Datadog is monitoring, filter out particular functions by sorting by tag with the [UI](#ui) or by using the [API](#api).

### UI

To use the UI to control the number of functions Datadog is monitoring, navigate to the [AWS Integration page][5] and add tags as `key:value` set to the **to Lambdas with tag:** field.

To add a blacklisted tag, include a `!` before the tag key. For example:

`!env:staging,!env:test1`

This filter excludes anything that is tagged with `env:staging` or `env:test1`.

### API

**Listing the current tag filter rules**
```
curl -X GET 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<api_key>&application_key=<app_key>' --data '{"account_id": "<aws_account_id>"}'

>{"filters":[{"tag_filter_str":"!copper:educated","namespace":"application_elb"}]}
```

**Setting the tag filter rule for a namespace**: namespace options are `"application_elb"`, `"elb"`, `"lambda"`, `"network_elb"`, `"rds"`, `"sqs"`, and `"custom"`.

```
curl -X POST 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<api_key>&application_key=<app_key>' --data '{"account_id": "<aws_account_id>", "namespace": "application_elb", "tag_filter_str": "!copper:educated"}'  -H "Content-Type: text/plain"
```

**Deleting the tag filter rule for a namespace**

```
curl -X DELETE 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<api_key>&application_key=<app_key>'  --data '{"account_id": "<aws_account_id>","namespace":"<namespace>"}'
```

## Troubleshooting

For technical questions, contact [Datadog support][6].

For billing questions, contact your [Customer Success][3] Manager.

[1]: https://www.datadoghq.com/pricing/#section-infrastructure
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /help

---
title: Serverless billing
kind: documentation
---

## Overview

Purchase Serverless functions on [Datadog Pro and Enterprise plans][1]. Datadog bills based on the average number of functions per hour across the month for your accounts. Pro and Enterprise plans include 150,000 Indexed Spans and 5 custom metrics per billed function. Contact [Sales][2] or your [Customer Success Manager][3] for more information about adding Serverless to your account.

**Note:** Indexed Spans were formerly known as Analyzed Spans and renamed with the launch of Tracing Without Limits on October 20th, 2020.

## Serverless functions

Every hour, Datadog records the number of functions that were executed one or more times and monitored by your Datadog account. At the end of the month, Datadog charges by calculating the average of the hourly number of functions recorded.

The billed number of functions is almost always significantly lower than the number you see on the Serverless page or in your AWS Console because of the average hourly metering. Functions that run infrequently are less likely to affect your bill, and sudden spikes in traffic won't cost you extra.

For Serverless pricing information, see the infrastructure section in [Datadog's pricing page][1].

## Tracking usage

You can track the number of billable Serverless functions in your account by checking the [Datadog Usage Page][4]. You can see both the Month-To-Date summary, as well as usage over time.

To control the number of functions Datadog is monitoring, filter out particular functions by sorting by tag with the [UI](#ui) or by using the [API](#api).

### UI

To use the UI to control limit which functions Datadog is monitoring, navigate to the [AWS Integration page][5] and add tags as `key:value` sets to the **to Lambdas with tag:** field.

To exclude functions with a given tag, add a `!` before the tag key. For example:

`!env:staging,!env:test1`

This filter excludes anything that is tagged with `env:staging` or `env:test1`.

### API

The AWS API is only supported for the US site's endpoint.

**Listing the current tag filter rules**:

```shell
curl -X GET 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<API_KEY>&application_key=<APPLICATION_KEY>' --data '{"account_id": "<AWS_ACCOUNT_ID>"}'

>{"filters":[{"tag_filter_str":"!copper:educated","namespace":"application_elb"}]}
```

**Setting the tag filter rule for a namespace**: namespace options are `"application_elb"`, `"elb"`, `"lambda"`, `"network_elb"`, `"rds"`, `"sqs"`, and `"custom"`.

```shell
curl -X POST 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<API_KEY>&application_key=<APPLICATION_KEY>' --data '{"account_id": "<AWS_ACCOUNT_ID>", "namespace": "application_elb", "tag_filter_str": "!copper:educated"}'  -H "Content-Type: text/plain"
```

**Deleting the tag filter rule for a namespace**:

```shell
curl -X DELETE 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<API_KEY>&application_key=<APPLICATION_KEY>'  --data '{"account_id": "<AWS_ACCOUNT_ID>","namespace":"<NAMESPACE>"}'
```

## Troubleshooting

For technical questions, contact [Datadog support][6].

For billing questions, contact your [Customer Success][3] Manager.

[1]: https://www.datadoghq.com/pricing/#section-infrastructure
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /help/

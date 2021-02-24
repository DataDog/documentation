---
title: Serverless billing
kind: documentation
---

## Overview

Purchase Serverless function invocations on [Datadog Pro and Enterprise plans][1]. Datadog bills based on the sum of AWS Lambda invocations across the month for your accounts. Pro and Enterprise plans include 150,000 Indexed Spans and 5 custom metrics per billed million invocations. Contact [Sales][2] or your [Customer Success Manager][3] for more information about adding Serverless to your account.

**Note:** Indexed Spans were formerly known as Analyzed Spans and renamed with the launch of Tracing Without Limits on October 20th, 2020.

## Serverless invocations

Datadog charges by calculating the sum of the your AWS Lambda function invocations at the end of the month.

For Serverless pricing information, see the [Datadog pricing page][1].

## Tracking usage

You can track the number of billable Serverless invocations in your account by checking the [Datadog Usage Page][4]. You can see both the Month-To-Date summary, as well as usage over time.

To control the functions whose invocations Datadog is monitoring, filter out particular functions by sorting by tag with the [UI](#ui) or by using the [API](#api).

### UI

To use the UI to control which functions Datadog is monitoring, navigate to the [AWS Integration page][5] and add tags as `key:value` sets to the **to Lambdas with tag:** field.

To exclude functions with a given tag, add a `!` before the tag key. For example:

`!env:staging,!env:test1`

This filter excludes anything that is tagged with `env:staging` or `env:test1`.

### API

{{< site-region region="us" >}}

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

{{< /site-region >}}

{{< site-region region="eu" >}}

**Listing the current tag filter rules**:

```shell
curl -X GET 'https://app.datadoghq.eu/api/v1/integration/aws/filtering?api_key=<API_KEY>&application_key=<APPLICATION_KEY>' --data '{"account_id": "<AWS_ACCOUNT_ID>"}'

>{"filters":[{"tag_filter_str":"!copper:educated","namespace":"application_elb"}]}
```

**Setting the tag filter rule for a namespace**: namespace options are `"application_elb"`, `"elb"`, `"lambda"`, `"network_elb"`, `"rds"`, `"sqs"`, and `"custom"`.

```shell
curl -X POST 'https://app.datadoghq.eu/api/v1/integration/aws/filtering?api_key=<API_KEY>&application_key=<APPLICATION_KEY>' --data '{"account_id": "<AWS_ACCOUNT_ID>", "namespace": "application_elb", "tag_filter_str": "!copper:educated"}'  -H "Content-Type: text/plain"
```

**Deleting the tag filter rule for a namespace**:

```shell
curl -X DELETE 'https://app.datadoghq.eu/api/v1/integration/aws/filtering?api_key=<API_KEY>&application_key=<APPLICATION_KEY>'  --data '{"account_id": "<AWS_ACCOUNT_ID>","namespace":"<NAMESPACE>"}'
```

{{< /site-region >}}

## Troubleshooting

For technical questions, contact [Datadog support][6].

For billing questions, contact your [Customer Success][3] Manager.

[1]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /help/

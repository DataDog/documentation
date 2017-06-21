---
last_modified: 2016/07/05
translation_status: translated
language: ja
title: Datadog-AWS Lambda Integration
integration_title: AWS Lambda
kind: integration
doclevel: basic
git_integration_title: amazon_lambda
---

<!--Amazon Lambda is a compute service that runs code in response to events and automatically manages the compute resources required by that code.

Enable this integration to begin collecting custom metrics from your Lambda functions, and see them in Datadog.

To send custom metrics to Datadog, you must print a log line from your Lambda, using the following format:
<code>MONITORING|unix_epoch_timestamp|value|metric_type|my.metric.name|#tag1:value,tag2</code>

For example, here is sample snippet for printing a valid custom metric, from your Lambda function (in Python):
<code>
unix_epoch_timestamp = int(time.time())
value = 42
metric_type = 'count'
metric_name = 'my.metric.name'
tags = ['tag1:value', 'tag2']
print('MONITORING|{0}|{1}|{2}|{3}|#{4}'.format(
    unix_epoch_timestamp, value, metric_type, metric_name, ','.join(tags)
))
</code>

Note: This integration requires the AWS permissions <code>logs:DescribeLogGroups</code>, <code>logs:DescribeLogStreams</code>, and <code>logs:FilterLogEvents</code> to be fully enabled. Also, counts and gauges are the only metrics types currently supported.-->

## Overview
Amazon Lambda は、そのコードで必要とされるコンピューティング・リソースを管理し、自動的にイベントに応答してコードを実行し、計算サービスです。

あなたのラムダ関数からカスタムメトリック収集を開始するには、この統合を有効にし、Datadogでそれらを参照してください。

カスタム指標は、この形式で印刷ログの行から収集されます。
<code>MONITORING|unix_epoch_timestamp|value|metric_type|my.metric.name|#tag1:value,tag2</code>

例えば、ここで有効なカスタムメトリックを印刷するためのサンプルです(Python言語で):
<code>
unix_epoch_timestamp = int(time.time())
value = 42
metric_type = 'count'
metric_name = 'my.metric.name'
tags = ['tag1:value', 'tag2']
print('MONITORING|{0}|{1}|{2}|{3}|#{4}'.format(
    unix_epoch_timestamp, value, metric_type, metric_name, ','.join(tags)
))
</code>

注：この統合は、AWSの権限<code>logs:DescribeLogGroups</code>, <code>logs:DescribeLogStreams</code>、および<code>logs:FilterLogEvents</code>完全に有効にすることが必要です。また、数とゲージはタイプが現在サポートされている唯一の指標があります。

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

Enable this integration to begin collecting custom metric from your Lambda functions, and see them in Datadog.

Custom metrics are collected from log lines printed with the following format:
<code>MONITORING|unix_epoch_timestamp|value|count|my.metric.name|#tag1:value,tag2</code>

Note: This integration requires the AWS permissions <code>logs:DescribeLogGroups</code>, <code>logs:DescribeLogStreams</code>, and <code>logs:FilterLogEvents</code> to be fully enabled. Also, counts and gauges are the only metrics types currently supported.-->

### Overview
Amazon Lambda は、そのコードで必要とされるコンピューティング・リソースを管理し、自動的にイベントに応答してコードを実行し、計算サービスです。

あなたのラムダ関数からカスタムメトリック収集を開始するには、この統合を有効にし、Datadogでそれらを参照してください。

カスタム指標は、この形式で印刷ログの行から収集されます。
<code>MONITORING|unix_epoch_timestamp|value|count|my.metric.name|#tag1:value,tag2</code>

注：この統合は、AWSの権限<code>logs:DescribeLogGroups</code>, <code>logs:DescribeLogStreams</code>、および<code>logs:FilterLogEvents</code>完全に有効にすることが必要です。また、数とゲージはタイプが現在サポートされている唯一の指標があります。

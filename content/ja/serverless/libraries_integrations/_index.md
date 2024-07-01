---
aliases:
- /ja/serverless/serverless_integrations
- /ja/serverless/datadog_lambda_library/
- /ja/serverless/libraries_integrations/library/
title: サーバーレスライブラリとインテグレーション
---

## サーバーレス開発ツールとのインテグレーション

{{< whatsnext desc="Datadog は、一般的なサーバーレス開発ツールと統合し、Datadog Lambda の拡張機能とライブラリをアプリケーションに自動的にインストールします。" >}}
    {{< nextlink href="/serverless/libraries_integrations/plugin/" >}}サーバーレスフレームワーク用 Datadog プラグイン{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cli/" >}}Datadog Lambda CLI{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cdk/" >}}AWS CDK 用 Datadog コンストラクト{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/macro/" >}}AWS SAM 用 Datadog サーバーレスマクロ{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog Lambda 拡張機能と Forwarder

{{< whatsnext desc="Lambda 関数からテレメトリーを送信するには、Lambda 拡張機能または Forwarder のいずれかが必要です。また、Amazon API Gateway など、Lambda 以外のサーバーレスリソースのログを収集するには、Forwarder が必要な場合があります。" >}}
    {{< nextlink href="/serverless/libraries_integrations/extension/" >}}Datadog Lambda 拡張機能{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring" >}}Datadog Forwarder Lambda 関数{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog Lambda ライブラリ

{{< whatsnext desc="特定のランタイムでは、テレメトリーを収集するために、Datadog Lambda 拡張機能に加えて、Datadog Lambda ライブラリが必要です。" >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-python" >}}Python 用 Datadog Lambda ライブラリ{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-js" >}}Node.js 用 Datadog Lambda ライブラリ{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-go" >}}Go 用 Datadog Lambda ライブラリ{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-rb" >}}Ruby 用 Datadog Lambda ライブラリ{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog AWS インテグレーション

{{< whatsnext desc="Lambda 関数から直接テレメトリーを収集するだけでなく、Datadog AWS インテグレーションを通じて、サーバーレスアプリケーションが利用するリソースのテレメトリーを収集することも可能です。" >}}
    {{< nextlink href="/integrations/amazon_lambda/" >}}AWS Lambda インテグレーション{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_step_functions/" >}}AWS Step Functions インテグレーション{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_appsync/" >}}AWS AppSync インテグレーション{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_api_gateway/" >}}Amazon API Gateway インテグレーション{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_sqs/" >}}Amazon SQS インテグレーション{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_sns/" >}}Amazon SNS インテグレーション{{< /nextlink >}}
{{< /whatsnext >}}
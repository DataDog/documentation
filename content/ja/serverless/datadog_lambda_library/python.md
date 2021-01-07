---
dependencies:
- "https://github.com/DataDog/datadog-lambda-python/blob/master/README.md"
kind: ドキュメント
title: Datadog Lambda Library for Python
---
![build](https://github.com/DataDog/datadog-lambda-python/workflows/build/badge.svg)
[![PyPI](https://img.shields.io/pypi/v/datadog-lambda)](https://pypi.org/project/datadog-lambda/)
![PyPI - Python Version](https://img.shields.io/pypi/pyversions/datadog-lambda)
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-python/blob/main/LICENSE)

Datadog Lambda Library for Python (2.7、3.6、3.7、3.8) は、拡張 Lambda メトリクス、分散型トレーシング、および AWS Lambda 関数からのカスタムメトリクス送信を可能にします。

**重要:** AWS Lambda は **2021 年 1 月 30 日**に[重大な変更](https://aws.amazon.com/blogs/compute/upcoming-changes-to-the-python-sdk-in-aws-lambda/)を受け取る予定です。Datadog Python Lambda レイヤーバージョン 7 以下を使用している場合は、最新にアップグレードしてください。

## インストール

[インストール手順](https://docs.datadoghq.com/serverless/installation/python/)に従って、Datadog で関数の拡張メトリクス、トレース、ログを表示します。

## カスタムメトリクス

[インストール](#installation)したら、Lambda 関数からカスタムメトリクスを送信できるはずです。

[AWS Lambda 関数からカスタムメトリクスを送信する](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=python#custom-metrics)手順を確認してください。

## トレーシング

[インストール](#installation)したら、Datadog で関数のトレースを表示できるようになり、関数のログが自動的にトレースに接続されるはずです。

トレース収集の詳細については、[AWS Lambda 関数からのトレースの収集](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=python#trace-collection)をご覧ください。

トレースとログの接続の詳細については、[ログとトレースの接続](https://docs.datadoghq.com/tracing/connect_logs_and_traces/python/)をご覧ください。

トレーサーの詳細については、[Datadog トレースクライアントの公式ドキュメント](http://pypi.datadoghq.com/trace/docs/index.html)をご覧ください。

## 拡張メトリクス

[インストール](#installation)したら、Lambda 関数の拡張メトリクスを Datadog で表示できるはずです。

[Datadog Lambda 拡張メトリクス](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=python#real-time-enhanced-lambda-metrics)の公式ドキュメントをご覧ください。

## 環境変数

### DD_FLUSH_TO_LOG

[Datadog Forwarder](https://github.com/DataDog/datadog-serverless-functions/tree/main/aws/logs_monitoring) を利用して CloudWatch ログを介してカスタムメトリクスを非同期に (Lambda 関数の実行に追加のレイテンシーなしで) 送信するには、`true` に設定します (推奨)。デフォルトは `false` です。`false` に設定する場合、`DD_API_KEY` と `DD_SITE` も設定する必要があります。

### DD_API_KEY

`DD_FLUSH_TO_LOG` が `false` に設定されている場合 (非推奨)、次のいずれかの環境変数を設定して Datadog API キーを定義する必要があります。

- DD_API_KEY - プレーンテキストの Datadog API キー、非推奨
- DD_KMS_API_KEY - KMS で暗号化された API キー。`kms:Decrypt` アクセス許可が必要です
- DD_API_KEY_SECRET_ARN - Secrets Manager から API キーを取得するための SecretARN。`secretsmanager:GetSecretValue` アクセス許可が必要です (顧客管理の CMK を使用している場合は `kms:Decrypt`)。
- DD_API_KEY_SSM_NAME - Systems Manager Parameter Store から API キーを取得するためのパラメーター名。`ssm:GetParameter` アクセス許可が必要です (顧客管理の CMK のある SecureString を使用している場合は `kms:Decrypt`)。

ランタイム時に API キーを指定またはオーバーライドすることもできます (非推奨)。

```python
# datadog_lambda パッケージをインポートした後、DD API キーをオーバーライドします
from datadog import api
api._api_key = "MY_API_KEY"
```

### DD_SITE

`DD_FLUSH_TO_LOG` が `false` に設定されており (非推奨)、データを Datadog EU サイトに送信する必要がある場合は、`DD_SITE` を `datadoghq.eu` に設定する必要があります。デフォルトは `datadoghq.com` です。

### DD_LOGS_INJECTION

[相関]https://docs.datadoghq.com/tracing/connect_logs_and_traces/python/)のためにログに Datadog トレース ID を挿入します。デフォルトは `true` です。

### DD_LOG_LEVEL

`debug` に設定すると、Datadog Lambda ライブラリからのデバッグログが有効になります。デフォルトは `info` です。

### DD_ENHANCED_METRICS

`aws.lambda.enhanced.invocations` や `aws.lambda.enhanced.errors` などの拡張 Datadog Lambda インテグレーションメトリクスを生成します。デフォルトは `true` です。

### DD_LAMBDA_HANDLER

オリジナルの Lambda ハンドラー。

### DD_TRACE_ENABLED

`true` に設定されている場合は、Datadog トレーサーを初期化します。デフォルトは `false` です。

### DD_MERGE_XRAY_TRACES

X-Ray トレースと Datadog トレースの両方を使用するときに、X-Ray トレースと Datadog トレースをマージするには、`true` に設定します。デフォルトは `false` です。

## 問題を開く

このパッケージでバグが発生した場合は、お知らせください。新しい問題を開く前に、重複を避けるために既存の問題を検索してください。

問題を開くときは、Datadog Lambda Library のバージョン、Python のバージョン、および取得できる場合はスタックトレースを含めてください。さらに、必要に応じて再現手順を含めてください。

機能リクエストの問題を開くこともできます。

## 寄稿

このパッケージに問題が見つかり、修正された場合は、[手順](CONTRIBUTING.md)に従ってプルリクエストを開いてください。

## ライセンス

特に明記されていない限り、このリポジトリ内のすべてのファイルは、Apache License Version 2.0 の下でライセンスされます。

この製品には、Datadog(https://www.datadoghq.com/) で開発されたソフトウェアが含まれています。Copyright 2019 Datadog, Inc.

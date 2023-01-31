---
dependencies:
- "https://github.com/DataDog/datadog-lambda-rb/blob/master/README.md"
kind: ドキュメント
title: Ruby 向け Datadog Lambda ライブラリ
---
![build](https://github.com/DataDog/datadog-lambda-rb/workflows/build/badge.svg)
[![RubyGem](https://img.shields.io/gem/v/datadog-lambda)](https://rubygems.org/gems/datadog-lambda)
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-rb/blob/main/LICENSE)

Ruby (2.5 および 2.7) 向け Datadog Lambda ライブラリは、拡張 Lambda メトリクス、分散型トレーシング、および AWS Lambda 関数からのカスタムメトリクス送信を可能にします。

## インストール

[インストール手順](https://docs.datadoghq.com/serverless/installation/ruby/)に従って、Datadog で関数の拡張メトリクス、トレース、ログを表示します。

## カスタムメトリクス

[インストール](#installation)したら、Lambda 関数からカスタムメトリクスを送信できるはずです。

[AWS Lambda 関数からカスタムメトリクスを送信する](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=ruby#custom-metrics)手順を確認してください。

## トレーシング

[インストール](#installation)したら、Datadog で関数のトレースを表示できるようになり、関数のログが自動的にトレースに接続されるはずです。

トレース収集の詳細については、[AWS Lambda 関数からのトレースの収集](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=ruby#trace-collection)をご覧ください。

トレーサーの詳細については、[Datadog トレースクライアントの公式ドキュメント](https://github.com/DataDog/dd-trace-rb/blob/main/docs/GettingStarted.md)をご覧ください。

トレースとログの接続の詳細については、[ログとトレースの接続](https://docs.datadoghq.com/tracing/connect_logs_and_traces/ruby/)をご覧ください。

## 環境変数

### DD_LOG_LEVEL

`debug` に設定すると、Datadog Lambda ライブラリからのデバッグログが有効になります。デフォルトは `info` です。

### DD_ENHANCED_METRICS

`aws.lambda.enhanced.invocations` や `aws.lambda.enhanced.errors` などの拡張 Datadog Lambda インテグレーションメトリクスを生成します。デフォルトは `true` です。

### DD_MERGE_DATADOG_XRAY_TRACES

X-Ray トレースと Datadog トレースの両方を使用するときに、X-Ray トレースと Datadog トレースをマージするには、`true` に設定します。デフォルトは `false` です。

## 未解決の問題

このパッケージでバグが発生した場合は、お知らせください。新しい問題を開く前に、重複を避けるために既存の問題を検索してください。

問題を開くときは、Datadog Lambda レイヤーのバージョン、Ruby のバージョン、および取得できる場合はスタックトレースを含めてください。さらに、必要に応じて再現手順を含めてください。

機能リクエストの問題を開くこともできます。

## 寄稿

このパッケージに問題が見つかり、修正された場合は、[手順](https://github.com/DataDog/dd-lambda-layer-rb/blob/main/CONTRIBUTING.md)に従ってプルリクエストを開いてください。

## ライセンス

特に明記されていない限り、このリポジトリ内のすべてのファイルは、Apache License Version 2.0 の下でライセンスされます。

この製品には、Datadog(https://www.datadoghq.com/) で開発されたソフトウェアが含まれています。Copyright 2019 Datadog, Inc.

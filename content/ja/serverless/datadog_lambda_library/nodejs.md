---
dependencies:
- "https://github.com/DataDog/datadog-lambda-js/blob/master/README.md"
kind: ドキュメント
title: Datadog Lambda Library for Node.js
---
![build](https://github.com/DataDog/datadog-lambda-js/workflows/build/badge.svg)
[![Code Coverage](https://img.shields.io/codecov/c/github/DataDog/datadog-lambda-js)](https://codecov.io/gh/DataDog/datadog-lambda-js)
[![NPM](https://img.shields.io/npm/v/datadog-lambda-js)](https://www.npmjs.com/package/datadog-lambda-js)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-js/blob/main/LICENSE)

Datadog Lambda Library for Node.js は、拡張 Lambda メトリクス、分散型トレーシング、および AWS Lambda 関数からのカスタムメトリクス送信を可能にします。

## インストール

[インストール手順](https://docs.datadoghq.com/serverless/installation/nodejs/)に従って、Datadog で関数の拡張メトリクス、トレース、ログを表示します。

## カスタムメトリクス

[インストール](#installation)したら、Lambda 関数からカスタムメトリクスを送信できるはずです。

[AWS Lambda 関数からカスタムメトリクスを送信する](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=nodejs#custom-metrics)手順を確認してください。

## トレーシング

[インストール](#installation)したら、関数のトレースを Datadog で表示できるはずです。

トレース収集の詳細については、[AWS Lambda 関数からのトレースの収集](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=nodejs#trace-collection)をご覧ください。

トレースとログの接続の詳細については、[Datadog トレースクライアントの公式ドキュメント](https://datadoghq.dev/dd-trace-js/)をご覧ください。

`fs` モジュールは、デフォルトで無効になっています。有効にするには、環境変数 `DD_TRACE_DISABLED_PLUGINS` を `''` または無効にするプラグインのコンマ区切りリストに設定する必要がありまし。対応プラグインの一覧は、[こちら](https://docs.datadoghq.com/tracing/compatibility_requirements/nodejs/) をご覧ください。

### トレースおよびログ相関

`console` または自動トレース ID 挿入でサポートされているロギングライブラリを使用している場合、デフォルトで、Datadog トレース ID は相関のためにログに自動的に挿入されます。他のロギングライブラリを使用している場合は、トレース ID を手動で挿入する必要があります。[ログとトレースの接続](https://docs.datadoghq.com/tracing/connect_logs_and_traces/nodejs/)で詳細をご覧ください。

この機能を無効にするには、環境変数 `DD_LOGS_INJECTION` を `false` に設定します。

## カスタムロガー

デフォルトの `console` の使用法の代わりに、独自のロガーを使用してレイヤーエラーをログに記録し、ログをデバッグできます。

たとえば、[Pino](https://getpino.io/) ロガーを使用する場合

```typescript
const { datadog } = require("datadog-lambda-js");
const logger = require("pino")();

// メッセージ文字列をオブジェクトのメタデータとメッセージに変換します
const messageToObject = (stringMessage) => {
  const { message, status, ...metadata } = JSON.parse(stringMessage);

  return [metadata, message];
};

async function myHandler(event, context) {
  // ...
}

// 独自のロガーを使います
module.exports.myHandler = datadog(myHandler, {
  logger: {
    debug: (message) => logger.debug(...messageToObject(message)),
    error: (message) => logger.error(...messageToObject(message)),
  },
});
```

## 環境変数

### DD_FLUSH_TO_LOG

[Datadog Forwarder](https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring) を利用して CloudWatch ログを介してカスタムメトリクスを非同期に (Lambda 関数の実行に追加のレイテンシーなしで) 送信するには、`true` に設定します (推奨)。デフォルトは `false` です。`false` に設定する場合、`DD_API_KEY` と `DD_SITE` も設定する必要があります。

### DD_API_KEY

`DD_FLUSH_TO_LOG` が `false` に設定されている場合 (非推奨)、次のいずれかの環境変数を設定して Datadog API キーを定義する必要があります。

- DD_API_KEY - プレーンテキストの Datadog API キー、非推奨
- DD_KMS_API_KEY - KMS で暗号化された API キー。`kms:Decrypt` アクセス許可が必要です

### DD_SITE

`DD_FLUSH_TO_LOG` が `false` に設定されており (非推奨)、データを Datadog EU サイトに送信する必要がある場合は、`DD_SITE` を `datadoghq.eu` に設定する必要があります。デフォルトは `datadoghq.com` です。

### DD_LOG_LEVEL

`debug` に設定すると、Datadog Lambda ライブラリからのデバッグログが有効になります。デフォルトは `info` です。

### DD_ENHANCED_METRICS

`aws.lambda.enhanced.invocations` や `aws.lambda.enhanced.errors` などの拡張 Datadog Lambda インテグレーションメトリクスを生成します。デフォルトは `true` です。

### DD_LAMBDA_HANDLER

オリジナルの Lambda ハンドラーの場所。

### DD_TRACE_ENABLED

`true` に設定されている場合は、Datadog トレーサーを初期化します。デフォルトは `false` です。

### DD_LOGS_INJECTION

相関のためにログに Datadog トレース ID を挿入します。デフォルトは `true` です。

### DD_MERGE_XRAY_TRACES

X-Ray トレースと Datadog トレースの両方を使用するときに、X-Ray トレースと Datadog トレースをマージするには、`true` に設定します。デフォルトは `false` です。

## 問題を開く

このパッケージでバグが発生した場合は、お知らせください。新しい問題を開く前に、重複を避けるために既存の問題を検索してください。

問題を開くときは、Datadog Lambda Layer のバージョン、Node のバージョン、および取得できる場合はスタックトレースを含めてください。さらに、必要に応じて再現手順を含めてください。

機能リクエストの問題を開くこともできます。

## 寄稿

このパッケージに問題が見つかり、修正された場合は、[手順](https://github.com/DataDog/dd-lambda-js/blob/main/CONTRIBUTING.md)に従ってプルリクエストを開いてください。

## コミュニティ

製品のフィードバックや質問については、[Slack の Datadog コミュニティ](https://chat.datadoghq.com/)の `#serverless` チャンネルに参加してください。

## ライセンス

特に明記されていない限り、このリポジトリ内のすべてのファイルは、Apache License Version 2.0 の下でライセンスされます。

この製品には、Datadog(https://www.datadoghq.com/) で開発されたソフトウェアが含まれています。Copyright 2019 Datadog, Inc.

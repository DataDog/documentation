---
dependencies:
- "https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md"
kind: ドキュメント
title: Datadog サーバーレス CLI
---
<div class="alert alert-warning">
この機能は公開ベータ版です。質問や問題がございましたら、リポジトリに<a href="https://github.com/DataDog/datadog-ci/issues">問題</a>を登録してお知らせください。
</div>

CLI を使用して、AWS Lambda 関数を Datadog でインスツルメントできます。現在、Python および Node.js ランタイムのみがサポートされています。

### はじめに

次のコマンドを使用して、AWS 認証情報 `AWS_ACCESS_KEY_ID` と `AWS_SECRET_ACCESS_KEY` をご使用の環境で使用できるようにするか、[AWS JS sdk][1] でサポートされている認証方法のいずれかを使用します。

```bash

export AWS_ACCESS_KEY_ID="<ACCESS KEY ID>"
export AWS_SECRET_ACCESS_KEY="<ACCESS KEY>"
```

[Datadog CI][2] をダウンロードします。

### コンフィギュレーション

コンフィギュレーションは JSON ファイルを使用して行われます。`--config` 引数を使用して `datadog-ci.json` を指定し、次のコンフィギュレーションファイル構造を指定します。

```json
{
    "lambda": {
        "layerVersion": 10,
        "functions": ["arn:aws:lambda:us-east-1:000000000000:function:autoinstrument"],
        "region": "us-east-1",
        "tracing": true,
        "mergeXrayTraces": true,
        "forwarder": "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
    }
}
```

#### コマンド

`instrument` を使用して、Datadog インスツルメンテーションを Lambda に適用します。このコマンドは、Datadog Lambda ライブラリを (Lambda レイヤーとして) インスツルメントされた Lambda 関数に自動的に追加し、そのコンフィギュレーションを変更します。

このコマンドは、既存の Lambda 関数で Datadog インスツルメンテーションを試す最も簡単な方法です。実稼働環境で使用するには、CI/CD パイプラインでこのコマンドを実行して、Lambda 関数がインスツルメンテーション用に常に更新されるようにします。

```bash
# ARN で指定された関数をインスツルメントします
datadog-ci lambda instrument --function arn:aws:lambda:us-east-1:000000000000:function:functionname --layerVersion 10

# 省略形を使用します
datadog-ci lambda instrument -f arn:aws:lambda:us-east-1:000000000000:function:functionname -v 10

# 名前で指定された複数の関数をインスツルメントします (--region を定義する必要があります)
datadog-ci lambda instrument -f functionname -f another-functionname -r us-east-1 -v 10

# すべての更新コマンドのドライラン
datadog-ci lambda instrument -f functionname -r us-east-1 -v 10 --dry
```

すべての引数:

| 引数 | 省略形 | 説明 | デフォルト |
| -------- | --------- | ----------- | ------- |
| --function | -f | インスツルメントする Lambda 関数の ARN、または Lambda 関数の名前 (--region を定義する必要があります) | |
| --region | -r | `--function` が ARN ではなく関数名で指定されている場合に使用するデフォルトのリージョン | |
| --layerVersion | -v | 適用する Datadog レイヤーのバージョン。これはランタイムによって異なります。最新のレイヤーバージョンを確認するには、[JS][3] または [python][4] datadog-lambda-layer リポジトリのリリースノートを確認してください。 | |
| --tracing |  | Lambda で dd-trace トレースを有効にするかどうか | true |
| --mergeXrayTraces | | dd-trace トレースを AWS X-Ray トレースに結合するかどうか。API ゲートウェイスパンのトレースに役立ちます。 | false |
| --flushMetricsToLogs | | Datadog Forwarder を介してメトリクスを[非同期](https://docs.datadoghq.com/serverless/custom_metrics?tab=python#enabling-asynchronous-custom-metrics)に送信するかどうか | true |
| --forwarder | | この関数の LogGroup をアタッチする [Datadog Forwarder](https://docs.datadoghq.com/serverless/forwarder/) の ARN。 | |
| --dry | -d | コマンドを実行している変更のプレビューが適用されます。 | false |

## コミュニティ

製品のフィードバックや質問については、[Slack の Datadog コミュニティ](https://chat.datadoghq.com/)の `#serverless` チャンネルに参加してください。

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-ci
[3]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[4]: https://github.com/DataDog/datadog-lambda-layer-python/releases

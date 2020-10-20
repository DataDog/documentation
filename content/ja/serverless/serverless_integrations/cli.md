---
dependencies:
- "https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md"
kind: ドキュメント
title: Datadog サーバーレス CLI
---
<div class="alert alert-warning">
この機能は公開ベータ版です。質問や問題がございましたら、リポジトリに<a href="https://github.com/DataDog/datadog-ci/issues">問題</a>を登録してお知らせください。
</div>

CLI を使用して、AWS Lambda 関数を Datadog でインスツルメントできます。

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

`instrument` を使用して、Datadog インスツルメンテーションを Lambda に適用します。

CLI は、`--function` (または省略形の `-f`) 引数を受け入れて、インスツルメントする関数を指定します。これは関数 ARN である必要があります。

```bash
datadog-ci lambda instrument --function arn:aws:lambda:us-east-1:000000000000:function:autoinstrument --layerVersion 10
# 省略形も使用できます
datadog-ci lambda instrument -f autoinstrument -f another-func -r us-east-1 -v 10
# すべての更新コマンドのドライラン
datadog-ci lambda instrument -f autoinstrument -r us-east-1 -v 10 --dry
```

すべての引数:

| 引数 | 省略形 | 説明 | デフォルト |
| -------- | --------- | ----------- | ------- |
| --function | -f | インスツルメントする関数を指定する | |
| --region | -r | 関数 ARN でリージョンが指定されていない場合に使用するデフォルトのリージョン | |
| --layerVersion | -v | 適用する Datadog レイヤーのバージョン。これはランタイムによって異なります。最新のレイヤーバージョンを確認するには、[JS][3] または [python][4] datadog-lambda-layer リポジトリのリリースノートを確認してください。 | |
| --tracing |  | Lambda で dd-trace トレースを有効にするかどうか。 | true |
| --mergeXrayTraces | | dd-trace トレースを AWS X-Ray トレースに結合するかどうか。API ゲートウェイスパンのトレースに役立ちます。 | false |
| --flushMetricsToLogs | | [Forwarder](https://docs.datadoghq.com/serverless/forwarder/) を介してメトリクスを Datadog に非同期で送信するかどうか | true |
| --forwarder | | この関数 LogGroup をアタッチする [Datadog Forwarder](https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring) の ARN。 | |
| --dry | -d | コマンドを実行している変更のプレビューが適用されます。 | false |

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-ci
[3]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[4]: https://github.com/DataDog/datadog-lambda-layer-python/releases

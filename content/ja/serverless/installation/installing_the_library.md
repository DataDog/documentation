---
title: Datadog Lambda ライブラリ
kind: ドキュメント
aliases:
  - /ja/infrastructure/serverless/datadog-lambda-layer
  - /ja/infrastructure/serverless/lambda_layer
  - /ja/infrastructure/serverless/lambda-layer
  - /ja/infrastructure/serverless/datadog_lambda_layer
  - /ja/infrastructure/serverless/datadog_lambda_layer/
  - /ja/serverless/troubleshooting/installing_the_layer
  - /ja/serverless/troubleshooting/installing_the_layer/
further_reading:
  - link: /integrations/amazon_lambda/
    tag: AWS Lambda インテグレーション
    text: AWS Lambda インテグレーション
---
{{< img src="serverless/datadog_lambda_library.png" alt="Datadog Lambda ライブラリ"  style="width:100%;">}}

Datadog Lambda ライブラリでは以下を実行します。

- 呼び出し、エラー、コールドスタートなどのリアルタイム[拡張 Lambda メトリクス][1]を生成する
- カスタムメトリクスの送信（同期および非同期）
- アップストリームのリクエストからダウンストリームのサービスにトレースヘッダーを自動的に伝播します。これにより、Lambda 関数、ホスト、コンテナ、および Datadog Agent を実行している他のインフラストラクチャ全体で完全に分散されたトレースが可能になります。
- `dd-trace` ライブラリをパッケージ化すると、Datadog のトレースライブラリを使用して Lambda 関数をトレースできるようになります。現在、Node.js、Python、Ruby で利用可能で、今後ランタイムは増える予定です。

Datadog では、Python、Node.js、および Ruby 用の Lambda レイヤーおよびオープンソースパッケージとして Lambda ライブラリを配布しています。プロジェクトに[パッケージ][7]を含めることで Go もサポートされます。Datadog は新しい言語とランタイムのサポートに取り組んでいます。ほかにも Datadog のサポートを希望するランタイムがある場合は、[Datadog のサポートチーム][8]までお問い合わせください。

# セットアップ

## AWS コンソール

Datadog Lambda レイヤー ARN には、リージョン、言語ランタイム、バージョンが含まれます。次の形式で作成します。

```text
arn:aws:lambda:<AWS_リージョン>:464622532012:layer:Datadog-<ランタイム>:<バージョン>
```

例:

```text
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:11
```

| 言語 | ランタイム                                        | リリース             |
| -------- | ---------------------------------------------- | -------------------- |
| Python   | `Python27`、`Python36`、`Python37`、`Python38` | [最新リリース][3] |
| Node.js  | `Node8-10`、`Node10-x`、`Node12-x`             | [最新リリース][4] |
| Ruby     | `Ruby`                                         | [最新リリース][5] |

**Golang:** Go バイナリは静的にリンクされているため、Datadog ではプロジェクトにインポートできる[パッケージ][7]を提供しています。Lambda レイヤーは必要ありません。

**Java:** Datadog では、プロジェクトにインポートできる[ライブラリ][15]を提供しています。Lambda レイヤーは必要ありません。

**注:** Datadog Lambda レイヤーとクライアントライブラリには依存関係として X-Ray SDK が含まれているため、プロジェクトに明示的にインストールする必要はありません。

インストール手順:  

1. AWS コンソールでレイヤーを追加する対象の Lambda 関数に移動します。
2. 関数のメインページで **Layers** をクリックします。
3. 下にスクロールして、**Add a Layer** をクリックします。
3. オプション **Provide a layer version ARN** を選択します。
4. 上記の表から Datadog Lambda レイヤー ARN を入力します。
5. 関数の**環境変数**セクションに移動して、Datadog API キーおよびその他のオプションを構成します（下記の表を参照）。

## Serverless Framework

このプラグインは、レイヤーを使用して Node.js と Python 用の Datadog Lambda ライブラリを関数にアタッチします。デプロイ時に、既存の関数をラップする新しいハンドラー関数を生成し、Lambda ライブラリを初期化します。

次のいずれかのコマンドでプラグインをインストールできます。

```bash
npm install --save-dev serverless-plugin-datadog  # NPM ユーザーの場合
yarn add --dev serverless-plugin-datadog          # Yarn ユーザーの場合
```

次に、`serverless.yml` に以下を追加します。

```yaml
plugins:
    - serverless-plugin-datadog
```

次のセクションを `serverless.yml` に追加してライブラリを構成します。デフォルト値と、フィールドが必須かどうかがリストされています。

```yaml
custom:
  datadog:
    # Lambda レイヤーを追加するか、ユーザーが独自に持ってくることを期待するか。デフォルトは true です。
    addLayers: true

    # ログレベル。拡張ログの場合は DEBUG に設定します。デフォルトは info です。
    logLevel: "info"

    # Datadog Forwarder Lambda 関数を使用して、ログを介してカスタムカスタムメトリクスを送信します (推奨)。 デフォルトは false です。
    flushMetricsToLogs: false

    # データ送信先の Datadog サイト。flushMetricsToLogs が false の場合にのみ必要です。デフォルトは datadoghq.com です。
    site: datadoghq.com # datadoghq.eu for Datadog EU

    # Datadog API キー。flushMetricsToLogs が false の場合にのみ必要です。
    apiKey: ""

    # KMS を使用して暗号化された Datadog API キー。flushMetricsToLogs が false の場合にのみ必要です。
    apiKMSKey: ""

    # Lambda 関数と API Gateway インテグレーションのトレースを有効にします。デフォルトは true です。
    enableXrayTracing: true

    # dd-trace、datadog の APM ライブラリを使用して、Lambda 関数のトレースを有効にします。datadog log forwarder をセットアップする必要があります。デフォルトは true です。
    enableDDTracing: true

    # 設定すると、プラグインは lambda の cloudwatch ロググループを指定された arn でフォワーダーにサブスクライブしようとします。
    forwarder: arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
```

[Datadog Forwarder][2] を利用して CloudWatch ログを介してカスタムメトリクスを送信する場合は、`flushMetricsToLogs: true` を設定することをお勧めします。

[Serverless Framework ドキュメント][1]

[1]: https://serverless.com/framework/docs/providers/aws/

<!--## AWS SAM

Lambda 関数および API ゲートウェイに、デフォルトで X-Ray トレーシングを有効にするには、`template.yaml` の [Globals セクション][1] に `Function::Tracing` と `Api::TracingEnabled` のキーを追加します。また、Datadog API キーと他の環境変数も追加します (以下の表を参照)。

```yaml
Globals:
    Function:
        Tracing: Active
        Environment:
            Variables:
                DD_API_KEY: YOUR_DATADOG_API_KEY
    Api:
        TracingEnabled: true
```

[AWS SAM ドキュメント][2]

[1]: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#globals-section
[2]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html-->

## ローカル開発

ソースから、またはランタイムの標準パッケージマネージャーを使用して、プロジェクトに直接 Datadog Lambda ライブラリを含めることもできます。

| 言語 | リポジトリ   | おおよそのサイズ |
| -------- | ------------ | ---------------- |
| Node.js  | [GitHub][9] | 2.6 MB           |
| Python   | [GitHub][10] | 10 MB            |
| Ruby     | [GitHub][11] | 2.3 MB           |
| Go       | [GitHub][12] | 68 KB            |
| Java     | [GitHub][14] | 51 KB            |


**注:** AWS SAM は、ローカル開発用に [Lambda レイヤーのダウンロード][13]をサポートしています。

## 環境変数

Lambda 関数に[環境変数][16]を追加することで、Datadog Lambda ライブラリを構成できます。

| 環境変数 | 説明                                                                              | 必須 | デフォルト         | 許容値                 |
| -------------------- | ---------------------------------------------------------------------------------------- | -------- | --------------- | ------------------------------- |
| `DD_API_KEY`         | Datadog API キー                                                                     | 〇      |                 | Datadog API キー                 |
| `DD_KMS_API_KEY`     | KMS を使用する場合は、`DD_API_KEY` の代わりに使用                                                 | ✕       |                 | KMS で暗号化された Datadog API キー   |
| `DD_SITE`            | Datadog の EU インスタンスを使用する場合に設定                                                  | ✕       | `datadoghq.com` | `datadoghq.eu`、`datadoghq.com` |
| `DD_FLUSH_TO_LOG`    | ゼロレイテンシー[非同期カスタムメトリクス][17]を有効化                                    | ✕       | `False`         | `True`、`False`                 |
| `DD_LOG_LEVEL`       | Datadog Lambda レイヤーの詳細ログを有効化                                        | ✕       | `INFO`          | `INFO`、`DEBUG`                 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]:  https://docs.datadoghq.com/ja/integrations/amazon_lambda/#real-time-enhanced-lambda-metrics
[2]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[3]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[4]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[5]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[6]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
[7]: https://github.com/DataDog/datadog-lambda-go/releases
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://github.com/DataDog/datadog-lambda-layer-js
[10]: https://github.com/DataDog/datadog-lambda-layer-python
[11]: https://github.com/DataDog/datadog-lambda-layer-rb
[12]: https://github.com/DataDog/datadog-lambda-go
[13]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-layers.html
[14]: https://github.com/DataDog/datadog-lambda-java/releases
[15]: https://github.com/DataDog/datadog-lambda-java
[16]: https://github.com/DataDog/datadog-lambda-layer-python#environment-variables
[17]:  https://docs.datadoghq.com/ja/integrations/amazon_lambda/#enabling-asynchronous-custom-metrics
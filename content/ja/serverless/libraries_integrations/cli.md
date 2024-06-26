---
aliases:
- /ja/serverless/datadog_lambda_library/
- /ja/serverless/serverless_integrations/cli/
dependencies:
- https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md
kind: documentation
title: Datadog サーバーレス CLI
---
CLI を使って、AWS Lambda 関数を Datadog でインスツルメントすることができます。CLI は既存の Lambda 関数のコンフィギュレーションを変更することでインスツルメンテーションを可能にするため、再デプロイは*必要ありません*。Datadog のサーバーレスモニタリングをはじめるにはこの方法が最速です。

CI/CD パイプラインにコマンドを追加して*すべて*のサーバーレスアプリケーションにインスツルメンテーションを有効化することも可能です。Datadog CLI コマンドによる変更が上書きされないよう、通常のサーバーレスアプリケーションのデプロイ*後*にコマンドを実行します。

## インストール

`datadog-ci lambda instrument` コマンドを使用して Lambda 関数をインスツルメントするには、以下に示す特定のランタイム用の手順に従います。

- [.NET](https://docs.datadoghq.com/serverless/installation/dotnet/?tab=datadogcli)
- [Go](https://docs.datadoghq.com/serverless/installation/go/?tab=datadogcli)
- [Java](https://docs.datadoghq.com/serverless/installation/java/?tab=datadogcli)
- [Node.js](https://docs.datadoghq.com/serverless/installation/nodejs/?tab=datadogcli)
- [Python](https://docs.datadoghq.com/serverless/installation/python/?tab=datadogcli)
- [Ruby](https://docs.datadoghq.com/serverless/installation/ruby/?tab=datadogcli)

## コマンド

### `instrument`

`datadog-ci lambda instrument` を実行して 、Datadog インスツルメンテーションを Lambda に適用します。このコマンドは、Datadog Lambda ライブラリおよび/または Datadog Lambda 拡張機能を Lambda レイヤーとして、インスツルメントされた Lambda 関数に追加し、そのコンフィギュレーションを変更します。

```bash

datadog-ci lambda instrument -f <function-name> -f <another-function-name> -r us-east-1 -v 81 -e 49

# フル ARN で指定された複数の関数をインスツルメントする
datadog-ci lambda instrument -f <lambda-arn> -f <another-lambda-arn> -f <a-third-lambda-arn> -v 81 -e 49

# インタラクティブモードで関数をインスツルメントする
datadog-ci lambda instrument -i

# 正規表現パターンにマッチする複数の関数をインスツルメントする
datadog-ci lambda instrument --functions-regex <valid-regex-pattern> -r us-east-1 -v 81 -e 49

# すべてのアップデートのドライラン
datadog-ci lambda instrument -f <function-name> -f <another-function-name> -r us-east-1 -v 81 -e 49 --dry-run
```

### `uninstrument`

`datadog-ci lambda uninstrument` を実行すると、Lambda 内の Datadog インスツルメンテーションを元に戻すことができます。このコマンドは、Datadog Lambda ライブラリや Datadog Lambda 拡張機能レイヤーなど、datadog-ci によって適用された Datadog の構成を自動的に削除してくれます。

```bash
# 名前で指定された複数の関数をアンインスツルメントする
datadog-ci lambda uninstrument -f <function-name> -f <another-function-name> -r us-east-1

# インタラクティブモードで関数をアンインスツルメントする
datadog-ci lambda uninstrument -i

# 正規表現にマッチする複数の関数をアンインスツルメントする
datadog-ci lambda uninstrument --functions-regex <valid-regex-pattern> -r us-east-1

# すべてのアップデートのドライラン
datadog-ci lambda uninstrument -f <function-name> -f <another-function-name> -r us-east-1 --dry-run
```

コンフィギュレーションセクションでその設定を確認します。

## コンフィギュレーション

### AWS 資格情報

`datadog-ci lambda` コマンドを実行する Lambda と CloudWatch サービスへのアクセスが構成された有効な [AWS 資格情報][1]が必要です。

### 環境変数

これらの環境変数は、`datadog-ci lambda instrument` を実行している環境で公開する必要があります。

| 環境変数         | 説明                                                                                                                                                                                                                                                                                                                                          | 例                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `DATADOG_API_KEY`            | Datadog API キー。Lambda 関数の構成に `DD_API_KEY` 環境変数を設定します。Datadog API キーの取得の詳細については、[API キーのドキュメント][5]を参照してください。                                                                                                                                                         | `export DATADOG_API_KEY=<API_KEY>`                                 |
| `DATADOG_API_KEY_SECRET_ARN` | AWS Secrets Manager に Datadog の API キーを格納するシークレットの ARN です。Lambda 関数の構成に `DD_API_KEY_SECRET_ARN` を設定します。注: `DD_KMS_API_KEY` が設定されている場合、 `DD_API_KEY_SECRET_ARN` は無視されます。Lambda の実行ロールに `secretsmanager:GetSecretValue` 権限を追加してください。                                           | `export DATADOG_API_KEY_SECRET_ARN=<SECRETS_MANAGER_RESOURCE_ARN>` |
| `DATADOG_KMS_API_KEY`        | KMS を使用して暗号化された Datadog API キー。Lambda 関数のコンフィギュレーションに `DD_KMS_API_KEY` 環境変数を設定します。注: `DD_KMS_API_KEY` が設定されている場合、`DD_API_KEY` は無視されます。                                                                                                                                                               | `export DATADOG_KMS_API_KEY=<KMS_ENCRYPTED_API_KEY>`               |
| `DATADOG_SITE`               | データを送信する Datadog サイトを設定します。Datadog Lambda Extension を使用する場合にのみ必要です。可能な値は、`datadoghq.com`、`datadoghq.eu`、`us3.datadoghq.com`、`us5.datadoghq.com`、`ap1.datadoghq.com`、`ddog-gov.com` です。デフォルトは `datadoghq.com` です。Lambda 関数設定に `DD_SITE` 環境変数を設定します。 | `export DATADOG_SITE="datadoghq.com"`                              |


### 引数

コンフィギュレーションは、コマンドライン引数または JSON コンフィギュレーションファイル (次のセクションを参照) を使って行うことができます。

#### `instrument`
以下の引数を `instrument` に渡してその行動を指定します。引数は、コンフィギュレーションファイルに設定されている値がある場合、これを上書きします。

| 引数                       | 省略形 | 説明                                                                                                                                                                                                                                                                                                                                   | デフォルト |
| ------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `--function`                   | `-f`      | **インスツルメント**する Lambda 関数の ARN、または Lambda 関数の名前 (`--region` を定義する必要があります)。                                                                                                                                                                                                                       |         |
| `--functions-regex`            |           | Lambda 関数名とマッチする正規表現パターン。                                                                                                                                                                                                                                                                                       |         |
| `--interactive`                | `-i`      | 関数がどのようにインスツルメントされるかを、ユーザーが対話的に選択できるようにします。インタラクティブモードを使用する場合は、代わりに情報の入力を求められるため、他のフラグを指定する必要はありません。                                                                                                                       |         |
| `--region`                     | `-r`      | `--function` が ARN ではなく関数名で指定されている場合に使用するデフォルトのリージョン。                                                                                                                                                                                                                                                |         |
| `--service`                    |           | 類似のワークロードに属する関連関数をグループ化するには、`--service` を使用します。`service` タグについて詳しくは、[こちら][8]を参照してください。                                                                                                                                                                                                                      |         |
| `--version`                    |           | `—version` タグを追加して、遅延、負荷、エラーのスパイクを新しいバージョンに関連付けることができます。`version` タグについて詳しくは [こちら][7]を参照してください。                                                                                                                                                                                                         |         |
| `--env`                        |           | ステージング環境、開発環境、本番環境を分けるには、`—env` を使用します。`env` タグについて詳しくは [こちら][6]を参照してください。                                                                                                                                                                                                                 |         |
| `--extra-tags`                 |           | Datadog の Lambda 関数にカスタムタグを追加します。`layer:api,team:intake` のようなカンマで区切られた `<key>:<value>` のリストである必要があります。                                                                                                                                                                                                   |         |
| `--profile`                    |           | インスツルメンテーションに使用する AWS 名前付きプロファイルの資格情報を指定します。AWS 名前付きプロファイルの詳細は[こちら][11]を参照してください。                                                                                                                                                                                                                               |         |
| `--layer-version`              | `-v`      | 適用する Datadog Lambda ライブラリレイヤーのバージョン。これはランタイムによって異なります。最新のレイヤーバージョンを確認するには、[JS][2] または [python][3] datadog-lambda-layer リポジトリのリリースノートを確認してください。                                                                                                                                                 |         |
| `--extension-version`          | `-e`      | 適用する Datadog Lambda Extension レイヤーのバージョン。`extension-version` が設定されている場合は、お使いの環境でも必ず `DATADOG_API_KEY` (または暗号化されている場合は `DATADOG_KMS_API_KEY` または `DATADOG_API_KEY_SECRET_ARN`) をエクスポートしてください。`extension-version` を使用する場合は、`forwarder` を省略します。Lambda Extension の詳細は[こちら][4]。 |         |
| `--tracing`                    |           | Lambda で dd-trace トレースを有効にするかどうか。                                                                                                                                                                                                                                                                                            | `true`  |
| `--merge-xray-traces`          |           | dd-trace トレースを AWS X-Ray トレースに結合するかどうか。API ゲートウェイスパンのトレースに役立ちます。                                                                                                                                                                                                                                                    | `false` |
| `--flush-metrics-to-logs`      |           | Datadog Forwarder 経由でメトリクスを[非同期で][10]送信するかどうか。このパラメーターを無効にすると、`DATADOG_API_KEY` (暗号化されている場合は `DATADOG_KMS_API_KEY` または `DATADOG_API_KEY_SECRET_ARN`) をエクスポートする必要があります。                                                                                                                    | `true`  |
| `--capture-lambda-payload`     |           | Lambda 呼び出しのペイロードとレスポンスをキャプチャして保存するかどうか。                                                                                                                                                                                                                                                                 | `false` |
| `--forwarder`                  |           | この関数の LogGroup をアタッチする [datadog forwarder][9] の ARN。                                                                                                                                                                                                                                                                  |         |
| `--dry-run`                    | `-d`      | コマンドを実行している変更のプレビューが適用されます。                                                                                                                                                                                                                                                                                                  | `false` |
| `--log-level`                  |           | Datadog Lambda ライブラリおよび/または Lambda 拡張機能から追加の出力をトラブルシューティングのために確認するには、`debug` を設定します。                                                                                                                                                                                                                 |         |
| `--source-code-integration`    | `-s`      | [Datadog ソースコードインテグレーション][12]を有効にするかどうか。これにより、Lambda に Git リポジトリの URL と、現在のローカルディレクトリの最新のコミットハッシュがタグ付けされます。**注**: Git リポジトリはリモートより先に存在してはいけませんし、ダーティであってはいけません。                                                                                     | `true`  |
| `--no-source-code-integration` |           | Datadog ソースコードインテグレーションを無効にします。                                                                                                                                                                                                                                                                                                     |         |
| `--upload-git-metadata`        | `-u`      | ソースコードインテグレーションの一部として、Git メタデータのアップロードを有効にするかどうか。Git メタデータのアップロードは、Datadog Github インテグレーションをインストールしていない場合のみ必要です。                                                                                                                                                           | `true`  |
| `--no-upload-git-metadata`     |           | ソースコードインテグレーションの一部として、Git メタデータのアップロードを無効にします。Datadog Github インテグレーションをインストールしている場合、このフラグを使用すると、Git メタデータのアップロードが不要になります。                                                                                                                                                  |         |
| `--apm-flush-deadline`         |           | タイムアウトが発生する前にスパンを送信するタイミングをミリ秒単位で決定するために使用されます。AWS Lambda の呼び出しの残り時間が設定された値よりも小さい場合、トレーサーは、現在のアクティブなスパンとすべての終了したスパンの送信を試みます。NodeJS と Python でサポートされています。デフォルトは `100` ミリ秒です。                              |         |
<br />

#### `uninstrument`
以下の引数を `uninstrument` に渡してその行動を指定します。引数は、コンフィギュレーションファイルに設定されている値がある場合、これを上書きします。

必要であれば、より早くアンインスツルメントできるように、`instrument` テーブルに記述された他の引数は無視されます。

| 引数            | 省略形 | 説明                                                                                                               | デフォルト |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- | ------- |
| `--function`        | `-f`      | **アンインスツルメント**する Lambda 関数の ARN、または Lambda 関数の名前 (`--region` を定義する必要があります)。 |         |
| `--functions-regex` |           | **アンインスツルメント**する Lambda 関数名とマッチする正規表現パターン。                                          |         |
| `--region`          | `-r`      | `--function` が ARN ではなく関数名で指定されている場合に使用するデフォルトのリージョン。                            |         |
| `--profile`         |           | アンインスツルメンテーションに使用する AWS 名前付きプロファイルの資格情報を指定します。AWS 名前付きプロファイルの詳細は[こちら][11]を参照してください。         |         |
| `--forwarder`       |           | この関数から削除する [datadog forwarder][9] の ARN。                                                       |         |
| `--dry-run`         | `-d`      | コマンドを実行している変更のプレビューが適用されます。                                                                              | `false` |

<br/>

### 構成ファイル

引数を指定する代わりに、プロジェクト内にコンフィギュレーションファイルを作成し、各デプロイで `datadog-ci lambda {instrument|uninstrument} --config datadog-ci.json` コマンドを実行します。`--config` 引数を使って `datadog-ci.json` を指定し、このコンフィギュレーションファイルの構造を使用します。

```json
{
    "lambda": {
        "layerVersion": 10,
        "extensionVersion": 8,
        "functions": ["arn:aws:lambda:us-east-1:000000000000:function:autoinstrument"],
        "region": "us-east-1",
        "tracing": true,
        "mergeXrayTraces": true,
        "captureLambdaPayload": true,
        "forwarder": "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder",
        "logLevel": "debug",
        "service": "some-service",
        "version": "b17s47h3w1n",
        "profile": "my-credentials",
        "environment": "staging",
        "extraTags": "layer:api,team:intake"
    }
}
```

## Lambda インスツルメンテーションのトラブルシューティング

Lambda 関数の Datadog モニタリングで発生した問題をトラブルシューティングするには、プロジェクトディレクトリの root で `datadog-ci lambda flare` コマンドを実行します。このコマンドは、環境変数やコンフィギュレーションファイルなど、Lambda 関数に関する重要なデータを収集します。これらのファイルは、提供された Zendesk のケース ID に一致するチケットを介して Datadog サポートに送信されます。

**注**: このコマンドは `datadog-ci lambda instrument` を使用して Lambda 関数をインスツルメントしてもしなくても動作します。

**例**
```bash
# Datadog サポートに単一関数でファイルを収集・送信する
datadog-ci lambda flare -f <function-arn> -c <case-id> -e <email-on-case-id>

# 最近の CloudWatch ログを含める
datadog-ci lambda flare -f <function-name> -r <AWS region> -c <case-id> -e <email-on-case-id> --with-logs

# ドライラン: データを収集するが、Datadog サポートには送信しない
datadog-ci lambda flare -f <function-arn> -c <case-id> -e <email-on-case-id> --with-logs --dry-run
```

**引数**

| 引数              | 省略形 | 説明                                                                                                                           | デフォルト |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `--function`          | `-f`      | データを収集する Lambda 関数の ARN、または Lambda 関数の名前 (`--region` が定義されている必要があります)。                   |         |
| `--region`            | `-r`      | `--function` が ARN ではなく関数名で指定されている場合に使用するデフォルトのリージョン。                                        |         |
| `--case-id`           | `-c`      | ファイル送信先の Datadog ケース ID。                                                                                             |         |
| `--email`             | `-e`      | 指定されたケース ID に関連付けられたメールアドレス。                                                                                      |         |
| `--with-logs`         |           | 指定した関数の最近の CloudWatch ログを収集します。                                                                            | `false` |
| `--start` および `--end` |           | 時間範囲内のログのみを収集します (`--with-logs` を含める必要があります)。どちらの引数も Unix Epoch からのミリ秒単位です。 |         |
| `--dry-run`           | `-d`      | Datadog サポートに送信される収集データをプレビューします。                                                                        | `false` |


## ヘルプ

製品のフィードバックや質問については、[Slack の Datadog コミュニティ](https://chat.datadoghq.com/)の `#serverless` チャンネルに参加してください。

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[4]: https://docs.datadoghq.com/ja/serverless/datadog_lambda_library/extension
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[6]: https://docs.datadoghq.com/ja/serverless/troubleshooting/serverless_tagging/#the-env-tag
[7]: https://docs.datadoghq.com/ja/serverless/troubleshooting/serverless_tagging/#the-version-tag
[8]: https://docs.datadoghq.com/ja/serverless/troubleshooting/serverless_tagging/#the-service-tag
[9]: https://docs.datadoghq.com/ja/serverless/forwarder/
[10]: https://docs.datadoghq.com/ja/serverless/custom_metrics?tab=python#enabling-asynchronous-custom-metrics
[11]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html#using-profiles
[12]: https://docs.datadoghq.com/ja/integrations/guide/source-code-integration

<!--
  This page is single-sourced:
  https://github.com/DataDog/documentation/blob/7007931530baf7da59310e7224a26dc9a71c53c5/local/bin/py/build/configurations/pull_config_preview.yaml#L301
->
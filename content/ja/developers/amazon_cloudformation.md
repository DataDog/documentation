---
dependencies:
  - 'https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md'
kind: documentation
title: Datadog-Amazon CloudFormation
---
[AWS CloudFormation] [1]では、環境内のすべてのAWSリソースを一度に記述、構成、プロビジョニングするためのテンプレートが提供されます。 Datadog-AWS CloudFormationリソースを使用すると、サポートされているDatadogリソースとのやり取りが可能です。以下の方法で始められます。

1. ターミナルで、[aws-cli tool] [2]を使用してDatadogリソースを登録します。

    ```shell
    aws cloudformation register-type \
        --region "<REGION>" \
        --type RESOURCE \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --schema-handler-package "<LINK_TO_S3>"
    ```

2. ターミナルで以下を実行して、新しく登録されたリソースのバージョンを表示します。

    ```shell
    aws cloudformation list-type-versions \
    --region "<REGION>" \
    --type RESOURCE \
    --type-name "<DATADOG_RESOURCE_NAME>"
    ```

3. ターミナルで以下を実行して、この新しく登録されたバージョンを`default`として設定します。

    ```shell
    aws cloudformation set-type-default-version \
        --region "<REGION>" \
        --type RESOURCE \
        --version-id <VERSION_ID> \
        --type-name "<DATADOG_RESOURCE_NAME>"
    ```

   次の必須プレースホルダーと組み合わせます。
    * `<REGION>`: AWSリージョン。
    * `<DATADOG_RESOURCE_NAME>`: 登録するリソースの名前。[下の表]（＃利用可能なリソース）を参照して、Datadogがサポートするリソースを確認してください。
    * `<LINK_TO_S3>`: リソースへのS3リンク。
      * S3リンク: `s3://datadog-cloudformation-resources/<RESOURCE_FOLDER>/<RESOURCE_FOLDER>-<RESOURCE_VERSION>.zip`
      * [利用可能なリソース]セクション（＃利用可能なリソース）を参照してください。サポート中のS3リンク最新例にリンクされています。
    * `VERSION_ID`: ステップ`2`のコマンドによって返されるリソースの基本バージョン。

4. AWSアカウントで、登録済みのDatadogリソースのいずれかを含む[AWSスタックを作成します] [3]。

使用可能なコマンドとワークフローの詳細については、公式の[AWSに関するドキュメント] [4]を参照してください。

## 利用可能なリソース

次のDatadogリソースは、AWSアカウント内で登録できます。特定のドキュメントを参照して、校正方法を確認してください。

| Resource                | Name                          | 説明                                             | フォルダー                      | S3パッケージリンク              |
|-------------------------|-------------------------------|---------------------------------------------------------|-----------------------------|-------------------------------|
| Datadog AWSインテグレーション | `Datadog::Integrations::AWS`  | [DatadogとAmazonウェブサービスのインテグレーションを管理する] [5] | `datadog-integrations-aws`  | [スキーマハンドラーのバージョン] [6]  |
| モニター                | `Datadog::Monitors::Monitor`  | [Datadogモニターの作成、更新および削除] [7]。       | `datadog-monitors-monitor`  | [スキーマハンドラーのバージョン] [8]  |
| ダウンタイム               | `Datadog::Monitors::Downtime` | [モニターのダウンタイムを有効または無効にする] [9]。     | `datadog-monitors-downtime` | [スキーマハンドラーのバージョン] [10] |
| ユーザー                    | `Datadog::IAM::User`          | [Datadogユーザーの作成と管理] [11]。                 | `datadog-iam-user`          | [スキーマハンドラーのバージョン] [12] |

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.html
[2]: https://aws.amazon.com/cli/
[3]: https://console.aws.amazon.com/cloudformation/home
[4]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[5]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-integrations-aws-handler
[6]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-integrations-aws-handler/CHANGELOG.md
[7]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-monitor-handler
[8]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-monitor-handler/CHANGELOG.md
[9]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtime-handler
[10]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtime-handler/CHANGELOG.md
[11]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-iam-user-handler
[12]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-iam-user-handler/CHANGELOG.md
[13]: https://docs.datadoghq.com/ja/help/
---
dependencies:
  - 'https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md'
kind: documentation
title: Datadog-Amazon CloudFormation
---
[AWS CloudFormation][1] では、環境内のすべての AWS リソースを一度に記述、構成、プロビジョニングするためのテンプレートが提供されます。Datadog-AWS CloudFormation リソースを使用すると、サポートされている Datadog リソースとのやり取りが可能です。以下の方法で開始します。

1. [aws-cli tool][2] を使用して、ターミナルで Datadog リソースを登録します。

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

3. ターミナルで以下を実行して、この新しく登録されたバージョンを `default` として設定します。

    ```shell
    aws cloudformation set-type-default-version \
        --region "<REGION>" \
        --type RESOURCE \
        --version-id <VERSION_ID> \
        --type-name "<DATADOG_RESOURCE_NAME>"
    ```

    次の必須プレースホルダーを使用します。
    * `<REGION>`: 使用している AWS リージョン。
    * `<DATADOG_RESOURCE_NAME>`: 登録するリソースの名前。Datadog がサポートするリソースについては、[下記の表](#利用可能なリソース)を参照してください。
    * `<LINK_TO_S3>`: リソースへの S3 リンク。
      * S3リンク: `s3://datadog-cloudformation-resources/<リソースフォルダー>/<リソースフォルダー>-<リソースバージョン>.zip`
      * [利用可能なリソース]セクション(#利用可能なリソース)を参照してください。サポート中の S3 リンクの最新例がリンクされています。
    * `VERSION_ID`: ステップ `2` のコマンドによって返されるリソースの基本バージョン。

4. AWS アカウントで、登録済みの Datadog リソースのいずれかを含む [AWS スタックを作成][3]します。

使用可能なコマンドとワークフローの詳細については、公式の [AWS ドキュメント][4]を参照してください。

## 利用可能なリソース

次の Datadog リソースは、AWS アカウント内で登録できます。それぞれの構成方法については、専用のドキュメントを参照してください。

| Resource                | Name                              | 説明                                             | フォルダー                      | S3 パッケージリンク              |
|-------------------------|-----------------------------------|---------------------------------------------------------|---------------------------------|-------------------------------|
| ダッシュボード              | `Datadog::Dashboards::Dashboard`  | [Datadog ダッシュボードの作成、更新および削除][5]。      | `datadog-dashboards-dashboard`  | [スキーマハンドラーのバージョン][6]  |
| Datadog AWSインテグレーション | `Datadog::Integrations::AWS`      | [Datadog と Amazon Web Service のインテグレーションを管理][7] | `datadog-integrations-aws`      | [スキーマハンドラーのバージョン][8]  |
| モニター                | `Datadog::Monitors::Monitor`      | [Datadog モニターの作成、更新および削除][9]。       | `datadog-monitors-monitor`      | [スキーマハンドラーのバージョン][10] |
| ダウンタイム               | `Datadog::Monitors::Downtime`     | [モニターのダウンタイムを有効化/無効化][11]。    | `datadog-monitors-downtime`     | [スキーマハンドラーのバージョン][12] |
| ユーザー                    | `Datadog::IAM::User`              | [Datadog ユーザーの作成と管理][13]。                 | `datadog-iam-user`              | [スキーマハンドラーのバージョン][14] |

## トラブルシューティング

ご不明な点は [Datadog サポート][15]までお問い合わせください。

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.html
[2]: https://aws.amazon.com/cli/
[3]: https://console.aws.amazon.com/cloudformation/home
[4]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[5]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-dashboards-dashboard-handler
[6]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-dashboards-dashboard-handler/CHANGELOG.md
[7]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-integrations-aws-handler
[8]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-integrations-aws-handler/CHANGELOG.md
[9]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-monitor-handler
[10]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-monitor-handler/CHANGELOG.md
[11]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtime-handler
[12]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtime-handler/CHANGELOG.md
[13]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-iam-user-handler
[14]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-iam-user-handler/CHANGELOG.md
[15]: https://docs.datadoghq.com/ja/help/
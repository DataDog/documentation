---
aliases:
- /ja/developers/amazon_cloudformation/
dependencies:
- https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md
kind: ガイド
title: Datadog-Amazon CloudFormation
---
[AWS CloudFormation][1] は、環境内のすべての AWS リソースを一度に記述、構成、プロビジョニングするためのテンプレートを提供します。Datadog-AWS CloudFormation リソースでは、サポートされている Datadog リソースとのやりとり、任意の Datadog データセンターへのリソースの送信、任意のリージョンにおける Datadog リソースを使用した拡張機能の非公開登録を行うことができます。

これらのリソースにアクセスするには、AWS マネジメントコンソール (UI)  または AWS コマンドラインインターフェイス (CLI) を使用します。

## AWS マネジメントコンソール

始めるには

1. アカウントで [AWS マネジメントコンソール][16]にサインインし、CloudFormation に移動します。

2. 左側のペインから "Public extensions" を選択し、"Third Party" でパブリッシャーをフィルタリングします。

3. 検索バーを使用して、"Datadog" プレフィックスでフィルタリングします。

  注: すべての公式 Datadog リソースは `Datadog::` で始まり、それが `Published by Datadog` であることを指定します。

4. 目的のリソース名を選択してそのスキーマに関する詳細情報を表示し、**Activate** をクリックします。

5. **Extension details** ページで、次のように指定します。
  - 拡張機能名
  - 実行ロール ARN
  - マイナーバージョンリリースの自動更新
  - コンフィギュレーション

6. リソースコンフィギュレーションについては、**クリアテキストの代わりに [AWS Secrets Manager][17] または同様のサービスを使用して Datadog API とアプリケーションキーを保存することを強くお勧めします**。

  AWS Secrets Manager を使用している場合は、コンフィギュレーションで API キーとアプリケーションキーを動的に参照できます。詳細については、[AWS ドキュメント][18]を参照してください。

  例:

  ```json
  {
    "DatadogCredentials": {
        "ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}",
        "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"
    }
  }
  ```
   米国以外のアカウントを使用している場合は `ApiURL` を指定します (デフォルトは `https://api.datadoghq.com`)。例えば、EU アカウントの場合は `https://api.datadoghq.eu` を使用します。

7. リソースを構成したら、アクティブ化された Datadog リソースのいずれかを含む [AWS スタックを作成][3]します。

使用可能なコマンドとワークフローの詳細については、公式の [AWS ドキュメント][4]を参照してください。

## AWS コマンドラインインターフェース

始めるには

1. `<RESOURCE_DIR>/resource-role.yaml` ファイルに基づいて CloudFormation リソースの実行ロールを作成します

1. [aws-cli tool][2] を使用して、ターミナルで Datadog リソースを登録します。

    ```shell
    aws cloudformation register-type \
        --region "<REGION>" \
        --type RESOURCE \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --schema-handler-package "<LINK_TO_S3>" \
        --execution-role-arn "<ROLE_ARN_FROM_STEP_1>"
    ```

1. ターミナルで以下を実行して、新しく登録されたリソースのバージョンを表示します。

    ```shell
    aws cloudformation list-type-versions \
    --region "<REGION>" \
    --type RESOURCE \
    --type-name "<DATADOG_RESOURCE_NAME>"
    ```

1. ターミナルで以下を実行して、この新しく登録されたバージョンを `default` として設定します。

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

1. ターミナルで以下を実行して、この新しく登録されたリソースコンフィギュレーションを設定します。

    ```shell
    aws cloudformation set-type-configuration \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --type RESOURCE \
        --configuration '{"DatadogCredentials": {"ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}", "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"}}'
    ```

1. AWS アカウントで、登録済みの Datadog リソースのいずれかを含む [AWS スタックを作成][3]します。

使用可能なコマンドとワークフローの詳細については、公式の [AWS ドキュメント][4]を参照してください。

## 利用可能なリソース

次の Datadog リソースは、AWS アカウント内で登録できます。それぞれの構成方法については、専用のドキュメントを参照してください。

| Resource                | 名前                                  | 説明                                             | フォルダー                              | S3 パッケージリンク              |
|---------------------------|---------------------------------------|---------------------------------------------------------|-------------------------------------|-------------------------------|
| ダッシュボード                   | `Datadog::Dashboards::Dashboard`      | [Datadog ダッシュボードの作成、更新および削除][5]。      | `datadog-dashboards-dashboard`      | [スキーマハンドラーのバージョン][6]  |
| Datadog AWSインテグレーション   | `Datadog::Integrations::AWS`          | [Datadog と Amazon Web Service のインテグレーションを管理][7] | `datadog-integrations-aws`          | [スキーマハンドラーのバージョン][8]  |
| モニター                   | `Datadog::Monitors::Monitor`          | [Datadog モニターの作成、更新および削除][9]        | `datadog-monitors-monitor`          | [スキーマハンドラーのバージョン][10] |
| ダウンタイム (**非推奨**) | `Datadog::Monitors::Downtime`         | [モニターのダウンタイムを有効化/無効化][11]     | `datadog-monitors-downtime`         | [スキーマハンドラーのバージョン][12] |
| ダウンタイムスケジュール         | `Datadog::Monitors::DowntimeSchedule` | [Datadog のダウンタイムのスケジュール][21]                        | `datadog-monitors-downtimeschedule` | [スキーマハンドラーのバージョン][22] |
| ユーザー                      | `Datadog::IAM::User`                  | [Datadog ユーザーの作成と管理][13]                   | `datadog-iam-user`                  | [スキーマハンドラーのバージョン][14] |
| SLO                       | `Datadog::SLOs::SLO`                  | [Datadog SLO の作成および管理][19]                    | `datadog-slos-slo`                  | [スキーマハンドラーのバージョン][20] |

## 対応地域

Datadog-Amazon CloudFormation のリソースは、以下の地域で CloudFormation Public Registry で利用可能です。

| コード            | 名前                      |
|-----------------|---------------------------|
| us-east-1       | アメリカ東部 (北バージニア)     |
| us-east-2       | アメリカ東部 (オハイオ州)            |
| us-west-1       | アメリカ西部 (北カリフォルニア)   |
| us-west-2       | アメリカ西部 (オレゴン州)          |
| ap-south-1      | アジア太平洋地域 (ムンバイ)     |
| ap-northeast-1  | アジア太平洋地域 (東京)      |
| ap-northeast-2  | アジア太平洋地域 (ソウル)      |
| ap-southeast-1  | アジア太平洋地域 (シンガポール)  |
| ap-southeast-2  | アジア太平洋地域 (シドニー)     |
| ca-central-1    | カナダ (中部)          |
| eu-central-1    | 欧州 (フランクフルト)        |
| eu-west-1       | 欧州 (アイルランド)          |
| eu-west-2       | 欧州 (ロンドン)           |
| eu-west-3       | 欧州 (パリ)            |
| eu-north-1      | 欧州 (ストックホルム)        |
| sa-east-1       | 南米 (サンパウロ) |

**注**: 他の地域のリソースを個人的に登録するには、提供されたパッケージを使用します。

## ヘルプ

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
[16]: https://aws.amazon.com/console/
[17]: https://aws.amazon.com/secrets-manager/
[18]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html#dynamic-references-secretsmanager
[19]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-slos-slo-handler
[20]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-slos-slo-handler/CHANGELOG.md
[21]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtimeschedule-handler
[22]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtimeschedule-handler/CHANGELOG.md
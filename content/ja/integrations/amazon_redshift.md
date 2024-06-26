---
aliases:
- /ja/integrations/awsredshift/
categories:
- aws
- cloud
- data stores
- log collection
dependencies: []
description: Amazon Redshift のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_redshift/
draft: false
git_integration_title: amazon_redshift
has_logo: true
integration_id: ''
integration_title: Amazon Redshift
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_redshift
public_title: Datadog-Amazon Redshift インテグレーション
short_description: Amazon Redshift のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Redshift は、ペタバイトスケールの高速なフルマネージド型データウェアハウスサービスです。あらゆるデータをシンプルかつコスト効率よく能率的に分析できます。

このインテグレーションを有効にすると、Datadog にすべての Redshift メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Redshift` が有効になっていることを確認します。
2. Amazon Redshift のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `redshift:DescribeClusters`: アカウント内のすべての Redshift クラスターを一覧表示します。
    - `redshift:DescribeLoggingStatus`: Redshift ログが格納されている S3 バケットを取得します。
    - `tag:GetResources`: Redshift クラスターのカスタムタグを取得します。

    詳細については、AWS ウェブサイト上の [Redshift ポリシー][4]を参照してください。

3. [Datadog - Amazon Redshift インテグレーション][5]をインストールします。

### 収集データ

#### ログの有効化

ログを収集するには、まず Redshift Cluster でログを有効にします。Redshift ログを Amazon S3 バケットに書き込み、[Lambda 関数で使用][6]します。詳細については、[コンソールを使用して監査を構成する][7]を参照してください。

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][8] をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、Redshift ログを収集する方法を以下の 2 つから選択します。

    - 自動: Datadog に権限を設定してアクセスを許可した場合、Redshift のログは自動的に管理されます。Datadog Forwarder Lambda 関数での自動ログ収集の構成については、[トリガーを自動的にセットアップする][9]を参照してください。
    - 手動: AWS コンソールで、Redshift のログが格納されている S3 バケットにトリガーを追加します。[手動インストール手順](#manual-installation-steps)を参照してください。

#### 手動インストールの手順

1. AWS アカウントで [Datadog Forwarder Lambda 関数][8] をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** トリガーを選択します。
4. Redshift のログが格納されている S3 バケットを選択します。
5. イベントの種類は `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][10]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][11]を参照してください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_redshift" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

Amazon Redshift インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Redshift インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-redshift
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tabs=awsconsole#collecting-logs-from-s3-buckets
[7]: https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html
[8]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tabs=awsconsole#automatically-set-up-triggers
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_redshift/amazon_redshift_metadata.csv
[13]: https://docs.datadoghq.com/ja/help/
---
aliases:
- /ja/integrations/awscodedeploy/
categories:
- automation
- aws
- cloud
- configuration & deployment
- log collection
- provisioning
dependencies: []
description: 行われているデプロイをリアルタイムで表示し、その所要時間を追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_codedeploy/
draft: false
git_integration_title: amazon_codedeploy
has_logo: true
integration_id: amazon-codedeploy
integration_title: AWS CodeDeploy
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_codedeploy
public_title: Datadog-AWS CodeDeploy インテグレーション
short_description: 行われているデプロイをリアルタイムで表示し、その所要時間を追跡。
version: '1.0'
---

{{< img src="integrations/amazon_codedeploy/monitor-aws-codedeploy-dashboard.png" alt="CodeDeploy デフォルトダッシュボード" popup="true">}}

## 概要

AWS CodeDeploy は、クラウドおよびオンプレミスのインスタンスにコードを自動的にデプロイするサービスです。

このインテグレーションを有効にすると、AWS CodeDeploy のデプロイイベントおよびメトリクスが Datadog に表示されます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. AWS CodeDeploy のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][2]に追加します。詳細については、AWS ウェブサイト上の [CodeDeploy ポリシー][3]を参照してください。

    | AWS アクセス許可                        | 説明                                                                   |
    | ------------------------------------- | ----------------------------------------------------------------------------- |
    | `codedeploy:ListApplications`         | すべての CodeDeploy アプリケーションをリストするために使用されます。                                    |
    | `codedeploy:ListDeploymentGroups`     | アプリケーション内のすべてのデプロイグループをリストするために使用されます (編集済み)。           |
    | `codedeploy:ListDeployments`          | アプリケーション内の特定のデプロイグループに含まれるデプロイをリストするために使用されます (編集済み)。|
    | `codedeploy:BatchGetDeployments`      | デプロイの詳細な説明を取得します (編集済み)。                          |
    | `codedeploy:BatchGetDeploymentGroups` | デプロイグループの詳細な説明を取得します。                             |

2. [Datadog - AWS CodeDeploy インテグレーション][4]をインストールします。

### ログの収集

#### ログの有効化

S3 バケットまたは CloudWatch のいずれかにログを送信するよう AWS CodeDeploy を構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_codedeploy` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、AWS CodeDeploy ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][6]
    - [CloudWatch ロググループに手動トリガーを追加][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_codedeploy" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS Codedeploy インテグレーションには、成功したデプロイ、失敗したデプロイ、および停止されたデプロイのイベントが含まれます。以下はイベントの例です。

{{< img src="integrations/amazon_codedeploy/aws_codedeploy_events.png" alt="AWS Codedeploy イベント" >}}

### サービスのチェック

AWS Codedeploy インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/codedeploy/latest/userguide/security-iam.html
[4]: https://app.datadoghq.com/integrations/amazon_codedeploy
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codedeploy/amazon_codedeploy_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
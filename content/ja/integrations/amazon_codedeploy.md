---
aliases:
  - /ja/integrations/awscodedeploy/
categories:
  - cloud
  - configuration & deployment
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: 行われているデプロイを表示し、その所要時間を追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_codedeploy/'
git_integration_title: amazon_codedeploy
has_logo: true
integration_title: Amazon CodeDeploy
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_codedeploy
public_title: Datadog-Amazon CodeDeploy インテグレーション
short_description: 行われているデプロイを表示し、その所要時間を追跡
version: '1.0'
---
{{< img src="integrations/amazon_codedeploy/monitor-aws-codedeploy-dashboard.png" alt="CodeDeploy default dashboard" responsive="true" popup="true">}}

## 概要

AWS CodeDeploy は、クラウドおよびオンプレミスのインスタンスにコードを自動的にデプロイするサービスです。

このインテグレーションを有効にすると、AWS CodeDeploy のデプロイイベントおよびメトリクスが Datadog に表示されます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### コンフィグレーション 

1. Amazon CodeDeploy のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][2]に追加します。CodeDeploy ポリシーの詳細については、[AWS Web サイトのガイド][3]を参照してください。

    | AWS アクセス許可                        | 説明                                                                   |
    |---------------------------------------|-------------------------------------------------------------------------------|
    | `codedeploy:ListApplications`         | すべての CodeDeploy アプリケーションをリストするために使用されます。                                    |
    | `codedeploy:ListDeploymentGroups`     | アプリケーション内のすべてのデプロイグループをリストするために使用されます (編集済み)。           |
    | `codedeploy:ListDeployments`          | アプリケーション内の特定のデプロイグループに含まれるデプロイをリストするために使用されます (編集済み)。|
    | `codedeploy:BatchGetDeployments`      | デプロイの詳細な説明を取得します (編集済み)。                          |
    | `codedeploy:BatchGetDeploymentGroups` | デプロイグループの詳細な説明を取得します。                             |

2. [Datadog - AWS CodeDeploy インテグレーション][4]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_codedeploy" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS Codedeploy インテグレーションには、成功したデプロイ、失敗したデプロイ、および停止されたデプロイのイベントが含まれます。以下はイベントの例です。

{{< img src="integrations/amazon_codedeploy/aws_codedeploy_events.png" alt="AWS Codedeploy Events" responsive="true">}}

### サービスのチェック
AWS Codedeploy インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_codedeploy.html
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_codedeploy
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codedeploy/amazon_codedeploy_metadata.csv
[6]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}
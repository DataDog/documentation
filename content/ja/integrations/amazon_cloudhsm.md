---
categories:
  - cloud
  - aws
  - ログの収集
ddtype: crawler
description: Datadog オーガニゼーションの HSM 監査ログを収集
has_logo: true
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_cloudhsm.md'
integration_title: AWS Cloudhsm
is_public: true
kind: インテグレーション
name: amazon_cloudhsm
public_title: Datadog-AWS Cloudhsm インテグレーション
short_description: Datadog オーガニゼーションの HSM 監査ログを収集
integration_id: amazon-cloudhsm
---
## 概要

アカウントの HSM は、AWS CloudHSM コマンドラインツールまたはソフトウェアライブラリからコマンドを受信すると、そのコマンドの実行を監査ログフォームに記録します。HSM 監査ログには、HSM の作成と削除、HSM へのログインとログアウト、およびユーザーとキーの管理など、クライアントで起動されたすべての管理コマンドが含まれます。このログは、HSM の状態を変更したアクションに関する信頼性の高い記録です。

Datadog は、CloudHSM ログを Datadog のログ管理ソリューションに送信する Lambda 関数を介して AWS CloudHSM と統合されます。

## セットアップ

### ログの収集

#### ログを有効にする

CloudHSM では監査ログがデフォルトで有効になっています。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][1]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから手動で CloudHSM ログを含む Cloudwatch ロググループにトリガーを追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="cloudwatch ロググループ"  popup="true" style="width:70%;">}}
   対応する CloudWatch ロググループを選択し、フィルター名を追加して (空にすることも可能)、トリガーを追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="cloudwatch トリガー"  popup="true" style="width:70%;">}}

完了したら、[Datadog Log セクション][2]に移動し、ログを確認します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: /ja/integrations/amazon_web_services/#create-a-new-lambda-function
[2]: https://app.datadoghq.com/logs
[3]: /ja/help/
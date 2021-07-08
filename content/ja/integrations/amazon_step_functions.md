---
categories:
  - cloud
  - aws
  - ログの収集
ddtype: crawler
dependencies: []
description: Amazon Step Functions のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_step_functions/'
draft: false
git_integration_title: amazon_step_functions
has_logo: true
integration_id: amazon-step-functions
integration_title: Amazon Step Functions
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_step_functions
public_title: Datadog-Amazon Step Functions インテグレーション
short_description: Amazon Step Functions のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon Step Functions (States) では、ビジュアルなワークフローを使用して、分散アプリケーションおよびマイクロサービスのコンポーネントを調整できます。

このインテグレーションを有効にすると、Datadog にすべての Step Functions メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。次に、AWS/Datadog ロールのポリシードキュメントに以下のアクセス許可を追加します。

```text
states:ListStateMachines,
states:DescribeStateMachine
```

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Step Functions (States)` をオンにします。ステートマシンが AWS Lambda を使用している場合は、`Lambda` がチェックされていることも確認してください。
2. [Datadog - Amazon Step Functions インテグレーション][3]をインストールします。

#### AWS Lambda メトリクスの増強

Step Functions ステートが Lambda 関数である場合、このインテグレーションをインストールすると、Lambda メトリクスに[タグ][4]が追加されます。これにより、Lambda 関数がどのステートマシンに属しているかを確認でき、[サーバーレスページ][5]でこれを視覚化できます。

### ログの収集

#### ログの有効化

ログを S3 バケットまたは CloudWatch に送信するように Amazon Step Functions を構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_step_functions` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログ コレクション AWS Lambda 関数][6]をまだ実行していない場合は、セットアップします。
2. lambda 関数がインストールされたら、AWS コンソールから手動で、ログを含む CloudWatch ロググループにトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][7]
    - [CloudWatch ロググループに手動トリガーを追加][8]

### トレースの収集

#### AWS X-Ray トレーシングを有効にする

AWS Step Functions の分散型トレーシングを有効にするには

1. [Datadog AWS X-Ray インテグレーション][9]を有効にします。
1. AWS コンソールにログインします。
2. **Step Functions** にアクセスします。
3. Step Functions の 1 つを選択して、**Edit** をクリックします。
4. ページの下部にある **Tracing** セクションまでスクロールし、**Enable X-Ray tracing** チェックボックスをオンにします。
5. 推奨: より詳細なトレースを行うには、関数に [AWS X-Ray トレーシングライブラリをインストール][10]してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_step_functions" >}}


### イベント

Amazon Step Functions インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Step Functions インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: /ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-step-functions
[4]: /ja/tagging/
[5]: /ja/graphing/infrastructure/serverless/
[6]: /ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: /ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: /ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: /ja/tracing/serverless_functions/enable_aws_xray
[10]: /ja/integrations/amazon_xray/#installing-the-x-ray-client-libraries
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[12]: /ja/help/
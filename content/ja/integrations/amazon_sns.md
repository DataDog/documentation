---
aliases:
  - /ja/integrations/awssns/
categories:
  - cloud
  - notification
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Amazon SNS メッセージを Datadog に、Datadog アラートを SNS に送信。
doc_link: https://docs.datadoghq.com/integrations/amazon_sns/
draft: false
git_integration_title: amazon_sns
has_logo: true
integration_id: amazon-sns
integration_title: Amazon SNS
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_sns
public_title: Datadog-Amazon SNS インテグレーション
short_description: Amazon SNS メッセージを Datadog に、Datadog アラートを SNS に送信。
version: '1.0'
---
{{< img src="integrations/amazon_sns/snsdashboard.png" alt="SNS ダッシュボード" popup="true">}}

## 概要

SNS を Datadog に接続すると、以下のことができます。

- SNS メッセージをイベントとしてストリームに表示できます。
- アラートおよびイベント通知を SNS に送信できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`SNS` をオンにします。

2. Amazon SNS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。SNS ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

    | AWS アクセス許可   | 説明                                             |
    | ---------------- | ------------------------------------------------------- |
    | `sns:ListTopics` | 取得可能なトピックを一覧表示するために使用されます。                        |
    | `sns:Publish`    | 通知 (モニターまたはイベントフィード) を公開するために使用されます。|

3. [Datadog - AWS SNS インテグレーション][5]をインストールします。

### イベント収集

#### SNS メッセージの受信

Datadog イベントストリームで SNS メッセージを受信するには

1. SNS マネジメントコンソールの Topics セクションで、目的のトピックを選択し、**Create Subscription** をクリックします。
2. HTTPS を選択し、次の Webhook URL を入力します。

    ```text
    ## Datadog US site
    https://app.datadoghq.com/intake/webhook/sns?api_key=<API KEY>

    ## Datadog EU site
    https://app.datadoghq.eu/intake/webhook/sns?api_key=<API KEY>
    ```

3. "Enable raw message delivery" はオフにします。

#### SNS 通知の送信

Datadog から SNS 通知を送信するには

1. AWS インテグレーションタイルで、SNS サービスと関連付けられている AWS アカウントを構成します。
2. [SNS インテグレーションをインストール][5]します。
3. これで、Datadog は構成された SNS トピックを検出し、@notifications (例: "@sns-topic-name") を表示します。

### ログの収集

SNS はログを提供しません。SNS に送信されるログとイベントが処理されます。

#### ログを Datadog に送信する方法

1. 新しい SNS サブスクリプションを構成します
2. メッセージの送信元のトピックを選択します
3. プロトコルとして "Lambda" を選択し、Datadog Forwarder Lambda 関数の arn を選択します

{{< img src="integrations/amazon_sns/aws_sns_log_collection_1.png" alt="AWS SNS ログの収集" popup="true" style="width:70%;">}}

{{< img src="integrations/amazon_sns/aws_sns_log_collection_2.png" alt="AWS SNS ログの収集 2" popup="true" style="width:70%;">}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_sns" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS SNS インテグレーションには、トピックサブスクリプションのイベントが含まれます。下のイベント例を参照してください。

{{< img src="integrations/amazon_sns/aws_sns_event.png" alt="AWS SNS イベント" >}}

### サービスのチェック

AWS SNS インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

Datadog では、Datadog から GovCloud または 中国のトピックへの SNS 通知をサポートしていません。

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_sns.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_sns
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sns/amazon_sns_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/
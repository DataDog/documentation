---
aliases:
- /ja/integrations/awssns/
categories:
- cloud
- notifications
- aws
- log collection
dependencies: []
description: Amazon SNS メッセージを Datadog に、Datadog アラートを SNS に送信。
doc_link: https://docs.datadoghq.com/integrations/amazon_sns/
draft: false
git_integration_title: amazon_sns
has_logo: true
integration_id: ''
integration_title: Amazon Simple Notification Service (SNS)
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_sns
public_title: Datadog-Amazon Simple Notification Service (SNS) インテグレーション
short_description: Amazon SNS メッセージを Datadog に、Datadog アラートを SNS に送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_sns/snsdashboard.png" alt="SNS ダッシュボード" popup="true">}}

## 概要

Amazon Simple Notification Service (SNS) を Datadog に接続すると、次のことが可能になります。

- SNS メッセージをイベントとしてストリームに表示できます。
- アラートおよびイベント通知を SNS に送信できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `SNS` が有効になっていることを確認します。

2. Amazon SNS のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。詳細については、AWS ウェブサイト上の [SNS ポリシー][4]を参照してください。

    | AWS アクセス許可   | 説明                                             |
    | ---------------- | ------------------------------------------------------- |
    | `sns:ListTopics` | 取得可能なトピックを一覧表示するために使用されます。                        |
    | `sns:Publish`    | 通知 (モニターまたはイベントフィード) を公開するために使用されます。|

3. [Datadog - Amazon SNS インテグレーション][5]をインストールします。

### イベント収集

#### SNS メッセージの受信

Datadog Event Stream の SNS メッセージは、`HTTPS` と `Email` の両方のプロトコルで受け取ることができます。`HTTPS` プロトコルを使用すると、Webhook URL で自動的にサブスクリプションを確認することができます。

`Email` プロトコルを使用する場合、Datadog がこの目的のために自動的に生成したメールアドレスの確認ステップを手動で行う必要があります。詳しくは [Amazon SNS のメールから Datadog のイベントを作成する][6]のガイドをお読みください。

Datadog Event Explorer で SNS メッセージを `HTTPS` で受信するには

1. SNS マネジメントコンソールの **Topics** セクションで、目的のトピックを選択し、**Create Subscription** をクリックします。
2. プロトコルとして `HTTPS` を選択し、`<API_KEY>` を有効な Datadog API キーの値に置き換えて、以下の Webhook URL を入力します。

    ```text
    ## Datadog US site
    https://app.datadoghq.com/intake/webhook/sns?api_key=<API_KEY>

    ## Datadog EU site
    https://app.datadoghq.eu/intake/webhook/sns?api_key=<API_KEY>
    ```

3. **Enable raw message delivery** のチェックは外したままにします。
4. **Create subscription** をクリックします。

#### SNS 通知の送信

Datadog から SNS 通知を送信するには

1. AWS インテグレーションページで、SNS サービスと関連付けられている AWS アカウントを構成します。
2. [SNS インテグレーション][5]をインストールします。
3. これで、Datadog は構成された SNS トピックを検出し、@notifications (例: `@sns-topic-name`) を有効にします。

### ログの収集

SNS はログを提供しません。SNS に送信されるログとイベントが処理されます。

#### ログを Datadog に送信する方法

1. 新しい SNS サブスクリプションを構成します。
2. メッセージの送信元のトピックを選択します。
3. Protocol には、**AWS Lambda** を選択します。
4. Endpoint には、Datadog Forwarder Lambda 関数の ARN を入力します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_sns" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

Amazon SNS インテグレーションには、トピックサブスクリプションのイベントが含まれます。下のイベント例を参照してください。

{{< img src="integrations/amazon_sns/aws_sns_event.png" alt="Amazon SNS イベント" >}}

### サービスのチェック

Amazon SNS インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

Datadog では、Datadog から中国のトピックへの SNS 通知をサポートしていません。

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html
[5]: https://app.datadoghq.com/integrations/amazon-sns
[6]: https://docs.datadoghq.com/ja/integrations/guide/events-from-sns-emails/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sns/amazon_sns_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
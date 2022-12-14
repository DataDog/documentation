---
categories:
- クラウド
- AWS
- ログの収集
dependencies: []
description: Amazon Security Lake のログを取り込みます。
doc_link: ''
draft: false
git_integration_title: amazon_security_lake
has_logo: true
integration_id: amazon-security-lake
integration_title: Amazon Security Lake
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_security_lake
public_title: Datadog-Amazon Security Lake インテグレーション
short_description: Amazon Security Lake のログを取り込みます。
version: '1.0'
---

## 概要

Amazon Security Lake は、セキュリティログやイベントデータを集計・管理するためのセキュリティデータレイクです。

このインテグレーションは、Amazon Security Lake に保存されたセキュリティログを Datadog に取り込み、さらなる調査やリアルタイムの脅威検出を行います。Amazon Security Lake の詳細については、[ドキュメント][1]をご覧ください。

## セットアップ

### 前提条件

1. Amazon Security Lake は、AWS アカウントまたは AWS 組織に対して構成する必要があります。詳しくは [AWS のドキュメント][1]をご参照ください。
2. [Datadog ログ管理][2]と [Datadog Cloud SIEM][3] の両方を利用している Datadog のアカウントが必要です。
3. まだの場合は、Amazon Security Lake がデータを保存している AWS アカウントに [Amazon Web Services インテグレーション][4]を設定します。

**注:** この AWS アカウントを統合して Amazon Security Lake の統合を使用したいだけであれば、[こちら][5]でメトリクスの収集を無効にすることができますので、Datadog はお客様の AWS インフラストラクチャーを監視せず、お客様は[インフラストラクチャーモニタリング][6]に対する請求を受けません。

### ログの収集
1. Datadog がセキュリティレイクに追加された新しいログファイルを取り込むことができるように、既存の `DatadogIntegrationRole` IAM ロールに次の IAM ポリシーを追加してください。
{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DatadogSecurityLakeAccess",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::aws-security-data-lake-*"
      }
  ]
}
{{< /code-block >}}

2. Amazon Security Lake の AWS コンソールで、Datadog のサブスクライバーを作成し、フォームに必要事項を入力します。AWS Security Lake のサブスクライバーの詳細については、[AWS のドキュメント][1]を参照してください。
   - サブスクライバー名に `Datadog` と入力します
   - Datadog に送信する `All log and event sources` または `Specific log and event sources` を選択します
   - データアクセスメソッドとして `S3` を選択します
3. 同じフォームに、サブスクライバー資格情報を入力します
   - “Account ID” に `464622532012` を入力します
   - “External ID” については、Datadog からこの値を取得する必要があります。新しいタブを開き、AWS アカウントの Datadog の [AWS インテグレーションページ][7]に移動します。“Account Details” タブに移動し、一番下までスクロールして External ID の値をコピーします。AWS のフォームに戻り、値を貼り付けます
   - “Subscriber role” には、`DatadogSecurityLakeRole` と入力します。**注:** DatadogIntegrationRole は、ステップ #1 で必要な権限を持っているので、このロールは実際には Datadog によって使用されません。
   - “API destination role” には、`DatadogSecurityLakeAPIDestinationRole` と入力します。
   - “Subscription endpoint” の場合、この値は使用している [Datadog サイト][8]に依存します。Datadog アカウントがホストされている場所に一致する以下の URL のいずれかを入力します。

| サイト    | サイト URL                                                    |
|---------|-------------------------------------------------------------|
| US1     | `https://api.datadoghq.com/api/intake/aws/securitylake`     |
| US3     | `https://api.us3.datadoghq.com/api/intake/aws/securitylake` |
| US5     | `https://api.us5.datadoghq.com/api/intake/aws/securitylake` |
| EU1     | `https://api.datadoghq.eu/api/intake/aws/securitylake`      |

   - "HTTPS key name" には、`DD-API-KEY` を入力します。
   - “HTTPS key value” については、Datadog からこの値を取得する必要があります。Datadog で新しいタブを開き、[API Keys ページ][9]に移動して既存の API キーを見つけるか、新しい Datadog API キーを作成します。API キーの値をコピーし、AWS のフォームに戻ってその値を貼り付けます。
4. “Create” をクリックすると、サブスクライバーの作成が完了します
3. 数分待つと、[Datadog のログエクスプローラー][10]で `source:amazon-security-lake` を指定して Amazon Security Lake からのログの探索を開始することができます。

このインテグレーションを利用したリアルタイムの脅威検出の方法については、[ブログ][11]をご覧ください。

## 収集データ

### メトリクス

Amazon Security Lake インテグレーションには、メトリクスは含まれません。

### イベント

Amazon Security Lake インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Security Lake インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### AWS アカウントと Datadog のインテグレーションに問題があります

[これらの手順][12]を確認し、AWS アカウントで Datadog 用の IAM ロールが正しく設定されていることを確認してください。

### Amazon Security Lake でサブスクライバーを作成する際に問題が発生しています

トラブルシューティングのガイダンスとして、サブスクライバーの作成に関する [AWS のドキュメント][1]を参照してください。

ご不明な点は、[Datadog のサポートチーム][13]までお問い合わせください。

[1]: https://docs.aws.amazon.com/security-lake/latest/userguide/
[2]: https://www.datadoghq.com/product/log-management/
[3]: https://www.datadoghq.com/product/cloud-security-management/cloud-siem/
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[5]: https://app.datadoghq.com/integrations/amazon-web-services?panel=metric-collection
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[7]: https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details
[8]: https://docs.datadoghq.com/ja/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://app.datadoghq.com/logs?query=source%3Aamazon-security-lake&cols=host%2Cservice%2C%40task_name%2C%40identity.user.type%2Caws.source%2C%40network.client.ip%2C%40identity.session.mfa%2C%40evt.name%2C%40connection_info.direction&index=%2A&messageDisplay=inline
[11]: https://www.datadoghq.com/blog/analyze-amazon-security-lake-logs-with-datadog
[12]: https://docs.datadoghq.com/ja/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[13]: https://docs.datadoghq.com/ja/help/
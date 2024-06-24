---
categories:
- クラウド
- AWS
- ログの収集
dependencies: []
description: AWS Verified Access ログを収集します。
doc_link: https://docs.datadoghq.com/integrations/aws_verified_access/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/verified-access-datadog/
  tag: ブログ
  text: AWS Verified Access と Datadog による企業アプリケーションのセキュリティ強化
git_integration_title: aws_verified_access
has_logo: true
integration_id: amazon-verified-access
integration_title: AWS Verified Access
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: aws_verified_access
public_title: Datadog-AWS Verified Access インテグレーション
short_description: AWS Verified Access ログを収集します。
version: '1.0'
---

## 概要

AWS Verified Access を使用すると、仮想プライベートネットワーク (VPN) の使用を必要とせずに、企業のアプリケーションへの安全なアクセスを提供することができます。Verified Access は、各アプリケーションのリクエストを評価し、指定されたセキュリティ要件を満たした場合にのみ、ユーザーが各アプリケーションにアクセスできるようにすることを支援します。


## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### ログの収集

#### Verified Access ログを有効にする

1. Amazon VPC のコンソールを開く
2. ナビゲーションペインで、**Verified Access instances** を選択します。
3. Verified Acccess インスタンスを選択します。
4. Verified Access インスタンスロギング構成タブで、**Modify Verified Access instance logging configuration** を選択します。
5. **Deliver to Amazon Cloudwatch Logs** をオンにします。宛先のロググループを選択します。

**注**: ロググループ名に `verified-access` という文字列を含めると、ログの自動パースが可能になります。

詳しくは、[Verified Access ログを有効にする][2]を参照してください。

#### ログを Datadog に送信する方法

**注**: Datadog の [Amazon Security Lake インテグレーション][3]を使用している場合、以下のステップに従う代わりに、そのインテグレーションを通じて Verified Access ログを送信することができます。

1. AWS アカウントで [Datadog Forwarder Lambda 関数][4] をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **CloudWatch Logs** トリガーを選択します。
4. Verified Access ログが含まれるロググループを選択します。
5. フィルター名を追加します。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][5]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][6]を参照してください。

## 収集データ

### メトリクス

AWS Verified Access インテグレーションには、メトリクスの収集は含まれていません。

### イベント

AWS Verified Access インテグレーションには、イベントは含まれません。

### ログ管理

AWS Verified Access インテグレーションには、[Verified Access ログ][7]が含まれます。

### サービスのチェック

AWS Verified Access インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/verified-access/latest/ug/access-logs-enable.html
[3]: https://docs.datadoghq.com/ja/integrations/amazon_security_lake/
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://app.datadoghq.com/logs
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[7]: https://docs.aws.amazon.com/verified-access/latest/ug/access-logs.html
[8]: https://docs.datadoghq.com/ja/help/
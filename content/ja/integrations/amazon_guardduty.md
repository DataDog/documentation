---
categories:
- cloud
- aws
- log collection
- security
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_guardduty.md
description: Amazon GuardDuty ログを収集します。
doc_link: /integrations/amazon_guardduty/
has_logo: true
integration_id: amazon-guardduty
integration_title: Amazon GuardDuty
is_public: true
custom_kind: integration
name: amazon_guardduty
public_title: Datadog-Amazon GuardDuty インテグレーション
short_description: Amazon GuardDuty ログを収集します。
version: '1.0'
---

## 概要

Datadog は、GuardDuty の調査結果を Datadog のログ管理ソリューションに送信する Lambda 関数を介して Amazon GuardDuty とインテグレーションします。

## セットアップ

### ログの収集

#### ログの有効化

1. [Datadog Forwarder Lambda 関数][1]をまだセットアップしていない場合は、セットアップします。

2. [Amazon EventBridge][2] で新しいルールを作成します。ルールに名前を付け、**Rule with an event pattern** を選択します。**Next** をクリックします。

3. GuardDuty Findings に一致するようにイベントパターンを構築します。**Event source** セクションで、`AWS events or EventBridge partner events` を選択します。**Event pattern** セクションでは、ソースに `AWS services` を、サービスに `GuardDuty` を、タイプに `GuardDuty Finding` を指定します。**Next** をクリックします。

4. Datadog Forwarder をターゲットとして選択します。ターゲットタイプに `AWS service`、ターゲットに `Lambda function` を設定し、ドロップダウンメニューの `Function` から Datadog forwarder を選択します。**Next** をクリックします。

5. 必要なタグを構成し、**Create rule** をクリックします。

#### ログを Datadog に送信する方法

1. AWS コンソールで、**Lambda** に移動します。

2. **Functions** をクリックし、Datadog forwarder を選択します。

3. Function Overview セクションで、**Add Trigger** をクリックします。ドロップダウンメニューから **EventBridge (CloudWatch Events)** を選択し、[ログの有効化セクション](#enable-logging)で作成したルールを指定します。

4. [Datadog ログエクスプローラー][3]で新しい GuardDuty Findings を確認することができます。

[1]: /ja/logs/guide/forwarder/
[2]: https://console.aws.amazon.com/events/home
[3]: https://app.datadoghq.com/logs
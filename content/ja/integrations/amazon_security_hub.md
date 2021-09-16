---
categories:
  - cloud
  - AWS
  - ログの収集
dependencies: []
description: Amazon Security Hub イベントをログとして取り込みます。
doc_link: ''
draft: false
git_integration_title: amazon_security_hub
has_logo: true
integration_id: amazon-security-hub
integration_title: Amazon Security Hub
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_security_hub
public_title: Datadog-Amazon Security Hub インテグレーション
short_description: Amazon Security Hub イベントをログとして取り込みます。
version: '1.0'
---
## 概要

AWS Security Hub は、AWS のセキュリティ状態の包括的なビューを提供し、セキュリティ業界の標準とベストプラクティスに照らして環境をチェックするのに役立ちます。

このインテグレーションにより、Datadog ですべての Security Hub ログを表示できます。

## セットアップ

Datadog は AWS EventBridge を使用して、SecurityHub イベントをログとして Datadog に転送します。

1. [Amazon EventBridge][1] に移動します。
2. Create a new rule ペインで、**Create rule** をクリックします。
3. Name and description ペインで、Name フィールドにルールの名前を入力し、必要に応じて、Description フィールドにルールの説明を入力します。
4. Define pattern ペインで、**Event pattern** を選択し、**Pre-defined pattern by service** を選択してイベントパターンを作成します。
5. Service provider リストから、**AWS** を選択します。
6. Service name リストから、**SecurityHub** を選択します。
7. Event type リストから、**All Events** を選択します。
8. Select event bus ペインで、**AWS default event bus** を選択します。
9. Select targets ペインで、Target リストから **Lambda function** を選択します。
10. [Datadog forwarder][2] を選択して、Datadog にログを送信します。
11. **作成**をクリックします。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://aws.amazon.com/eventbridge/
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/forwarder/
[3]: https://docs.datadoghq.com/ja/help/
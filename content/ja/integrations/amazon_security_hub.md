---
categories:
- cloud
- AWS
- ログの収集
dependencies: []
description: AWS Security Hub イベントをログとして取り込みます。
doc_link: ''
draft: false
git_integration_title: amazon_security_hub
has_logo: true
integration_id: amazon-security-hub
integration_title: AWS Security Hub
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_security_hub
public_title: Datadog-AWS Security Hub インテグレーション
short_description: AWS Security Hub イベントをログとして取り込みます。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS Security Hub は、AWS のセキュリティ状態の包括的なビューを提供し、セキュリティ業界の標準とベストプラクティスに照らして環境をチェックするのに役立ちます。

このインテグレーションにより、Datadog ですべての AWS Security Hub ログを表示できます。

**注**: Datadog のセキュリティシグナルを Security Hub に送信し、AWS 環境での追加イベントのオーケストレーションを行うことも可能です。[securityhub-eventbridge-example][1] リポジトリの指示に従ってセットアップしてください。

## 計画と使用

Datadog は Amazon EventBridge を使用して、Security Hub イベントをログとして Datadog に転送します。

1. [Amazon EventBridge][2] に移動します。
2. Create a new rule ペインで、**Create rule** をクリックします。
3. Name and description ペインで、Name フィールドにルールの名前を入力し、必要に応じて、Description フィールドにルールの説明を入力します。
4. Define pattern ペインで、**Event pattern** を選択し、**Pre-defined pattern by service** を選択してイベントパターンを作成します。
5. Service provider リストから、**AWS** を選択します。
6. Service name リストから、**SecurityHub** を選択します。
7. Event type リストから、**All Events** を選択します。
8. Select event bus ペインで、**AWS default event bus** を選択します。
9. Select targets ペインで、Target リストから **Lambda function** を選択します。
10. [Datadog forwarder][3] を選択して、Datadog にログを送信します。
11. **Create** をクリックします。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://github.com/DataDog/securityhub-eventbridge-example
[2]: https://aws.amazon.com/eventbridge/
[3]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/forwarder/
[4]: https://docs.datadoghq.com/ja/help/
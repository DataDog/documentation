---
categories:
- cloud
- aws
- ログの収集
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_cloudhsm.md
description: Datadog オーガニゼーションの HSM 監査ログを収集
has_logo: true
integration_id: amazon-cloudhsm
integration_title: AWS CloudHSM
is_public: true
kind: インテグレーション
name: amazon_cloudhsm
public_title: Datadog-AWS Cloudhsm インテグレーション
short_description: Datadog オーガニゼーションの HSM 監査ログを収集
---

## 概要

アカウントの HSM は、AWS CloudHSM コマンドラインツールまたはソフトウェアライブラリからコマンドを受信すると、そのコマンドの実行を監査ログフォームに記録します。HSM 監査ログには、HSM の作成と削除、HSM へのログインとログアウト、およびユーザーとキーの管理など、クライアントで起動されたすべての管理コマンドが含まれます。このログは、HSM の状態を変更したアクションに関する信頼性の高い記録です。

Datadog は、CloudHSM ログを Datadog のログ管理ソリューションに送信する Lambda 関数を通じて AWS CloudHSM と統合されます。

## セットアップ

### ログの収集

#### ログを有効にする

CloudHSM では監査ログがデフォルトで有効になっています。

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][1]をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **CloudWatch Logs** トリガーを選択します。
4. CloudHSM のログを含む CloudWatch のロググループを選択します。
5. フィルターの名前を入力します。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][2]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][3]を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: /ja/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[4]: /ja/help/
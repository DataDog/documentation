---
categories:
  - cloud
  - aws
  - log collection
  - security
ddtype: crawler
description: AWS GuardDuty ログを収集
doc_link: /integrations/amazon_guardduty/
has_logo: true
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_guardduty.md
integration_title: AWS GuardDuty
is_public: true
kind: インテグレーション
name: amazon_guardduty
public_title: Datadog-AWS GuardDuty インテグレーション
short_description: AWS GuardDuty ログを収集
version: '1.0'
integration_id: amazon-guardduty
---
## 概要

Datadog は、GuardDuty の調査結果を Datadog のログ管理ソリューションに送信する Lambda 関数を介して AWS GuardDuty と統合されます。

## セットアップ

### ログの収集

#### ログの有効化

1. **GuardDuty Finding** イベントタイプを使用して Cloudwatch で新しい規則を作成します。

    {{< img src="integrations/amazon_guardduty/aws_gd_1.png" alt="aws gd 1"  style="width:75%;" >}}

2. [Datadog ログコレクション AWS Lambda 関数][1]をまだセットアップしていない場合は、セットアップします。

3. Lambda 関数が作成されたら、Datadog Lambda 関数をターゲットとして定義します。

    {{< img src="integrations/amazon_guardduty/aws_gd_2.png" alt="aws gd 2"  style="width:75%;" >}}

4. 規則を保存します。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][1]をまだセットアップしていない場合は、セットアップします。

2. Lambda 関数をセットアップしたら、**CloudWatch Events** をトリガーとして選択し、`GuardDutyRule` を作成することで、GuardDuty をトリガーとして追加します。

    {{< img src="integrations/amazon_guardduty/aws_gd_3.png" alt="aws gd 3"  style="width:75%;">}}

3. 完了したら、[Datadog Log セクション][2]に移動し、ログを確認します。

[1]: /ja/integrations/amazon_web_services/#create-a-new-lambda-function
[2]: https://app.datadoghq.com/logs
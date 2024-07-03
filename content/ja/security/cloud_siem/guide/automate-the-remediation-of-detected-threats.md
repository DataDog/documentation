---
aliases:
- /ja/security_platform/guide/automate-the-remediation-of-detected-threats/
- /ja/security_platform/cloud_siem/guide/automate-the-remediation-of-detected-threats/
further_reading:
- link: /security/cloud_siem/investigate_security_signals
  tag: Documentation
  text: Start investigating signals in the Signals Explorer
title: Automate the Remediation of Detected Threats with Webhooks
---

## 概要

[Cloud SIEM][1] では、自動修復ワークフローのトリガーとなる検出ルールを設定することができます。Datadog の [Webhook インテグレーション][2]では、[検出ルール][3]がトリガーされたときに、自動化したいサービスにペイロードを配信する Webhookを設定します。すべての Webhook ペイロードには、トリガーとなったイベントに関する情報と、下流のサービスを開始するために使用できるカスタムメッセージが含まれています。Webhook の URL を持つすべてのサービスのコマンドを自動化できます。セキュリティオーケストレーションツールや自動化応答ツールが受信した HTTP リクエストを受け入れ、これらの Webhook は定義した任意のワークフローを開始します。

以下のセキュリティシナリオを選択して、修復の自動化を開始します。

## 誤って構成されたセキュリティグループを削除する

クラウド環境では、誤って構成されたリソースが作成されたらすぐに削除することが重要です。このシナリオでは [Webhook インテグレーション][2]を構成し、クラウドプロバイダーの API 管理サービスに [Webhook][2] を送信するよう設定します。

{{< img src="security/security_monitoring/guide/automate-the-remediation-of-detected-threats/automation-diagram.png" alt="クラウドプロバイダーの API に送信される Webhook の図" >}}

Once configured, if an AWS user creates a poorly configured resource (for example, an overly permissive security group, or user role) within your AWS environment, Datadog Log Management ingests the related log, which triggers a security group-based Detection Rule. This process automatically sends the webhook's JSON payload to the designated Amazon API Gateway URL, which in turn activates an AWS Lambda function that automatically deletes the offending resource.

## 不審な IP アドレスを禁止する

認識できない IP アドレスからのサインインは、攻撃者が信頼されているユーザーの認証情報を操作してデータにアクセスしたり、お使いの環境内でのパーシステンスを獲得したりしている可能性があります。

この種の攻撃に対抗するには、選択した期間のアカウントの履歴データを分析し、クラウドログのこれまで見られなかった値を警告する[新値検出方法][4]が有効です。

まず、新値検出方法で[新しい検出ルール][5]を設定します。

そして、このルールがトリガーされたときに未知の IP を禁止するために、クラウドの Identity and Access Management (IAM) サービスにペイロードを送信する [Webhook][2] を設定します。

{{< img src="security/security_monitoring/guide/automate-the-remediation-of-detected-threats/webhook-ip.png" alt="未知の IP アドレスを禁止する新しい Webhook" >}}

次の例は、Datadog によってセキュリティシグナルが生成されたときに、関連する Webhook ペイロードがどのように見えるかを示しています。

{{< code-block lang="json" filename="webhook-payload.json" >}}
{
  "SECURITY_RULE_NAME": "Request from unexpected IP address",
  "SECURITY_SIGNAL_ID": "abcd1234",
  "SECURITY_SIGNAL_ATTRIBUTES": {
    "network": {
      "client": {
        "ip": [
          "1.2.3.4"
        ]
      }
    }
  }
}
{{< /code-block >}}

## アプリケーションの悪用および詐欺

Datadog Cloud SIEM を使用すると、アプリケーション全体の[悪用や詐欺][6]のパターンを発見することができます。例えば、ユーザーがアプリケーション内で無効なクレジットカード情報を使って何度も購入しようとした場合にトリガーされる[検知ルール][7]を設定します。次に、ユーザーの認証情報を無効にするサービスに対して修復指示を含むペイロードを送信する Webhook を設定します。

次の例は、Datadog によってセキュリティシグナルが生成されたときに、関連する Webhook ペイロードがどのように見えるかを示しています。

{{< code-block lang="json" filename="webhook-payload.json" >}}
{
  "SECURITY_RULE_NAME": "Fraudulent Credit Card Authorizations",
  "SECURITY_SIGNAL_ID": "efgh5678",
  "SECURITY_SIGNAL_ATTRIBUTES": {
    "usr": {
      "id": "john.doe@your_domain.com"
    },
    "evt": {
      "name": "credit_card_authorization",
      "outcome": "fail"
    },
    "network": {
      "client": {
        "ip": [
          "1.2.3.4"
        ]
      }
    }
  }
}
{{< /code-block >}}

Datadog はセキュリティシグナルを生成し、違反行為だけでなく、IP アドレスやユーザー ID などの不審なユーザーの情報を詳細に説明します。また、Webhook ペイロードを使用してサービスに修復指示を送信し、ユーザーの認証情報を無効化します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/
[2]: https://app.datadoghq.com/account/settings#integrations/webhooks
[3]: /ja/security/detection_rules/
[4]: https://www.datadoghq.com/blog/new-term-detection-method-datadog/
[5]: /ja/security/cloud_siem/log_detection_rules/?tab=threshold#new-value
[6]: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
[7]: /ja/security/cloud_siem/log_detection_rules/?tab=threshold#define-a-search-query
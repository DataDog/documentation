---
disable_toc: false
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: Datadog に送信されるデータの主なカテゴリを確認します。
- link: /data_security/pci_compliance/
  tag: ドキュメント
  text: PCI 準拠の Datadog 組織をセットアップします。
title: Cloud SIEM のデータセキュリティ
---
<div class="alert alert-info">このページでは、Datadog に送信されるデータのセキュリティについて説明します。クラウドおよびアプリケーションのセキュリティ製品や機能をお探しの場合は、<a href="/security/" target="_blank">Security</a> セクションを参照してください。</div>

## 概要 {#overview}

Datadog は、検知ルールで定義されたケースの少なくとも 1 つが一定期間内に一致した場合に、Security シグナルを生成します。検知ルールをカスタマイズして、シグナルに関する特定の情報 (ユーザー ID、IP アドレスなど) や、シグナルのトリガーとなったグループ化値を含む通知メッセージを提供できます。Security ルールでは、Webhook を使用してサードパーティサービスに通知を送信することもできます。

Datadog に送信されるデータには機密情報が含まれる可能性があるため、このドキュメントでは、それらの通知機能と、ユーザーにこれらの機能へのアクセス権を与えたくない場合の対処方法について説明します。

## Security ルールではメッセージテンプレート変数を使用できます{#security-rules-can-use-message-template-variables}

検知ルールを作成する際、[通知変数][1]を使用して通知メッセージをカスタマイズし、シグナルに関連する特定の情報を追加できます。たとえば、次の JSON オブジェクトが Security シグナルに関連付けられている場合、

```
{
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  },
  "user": {
    "id": "user@domain.com"
  },
  "used_mfa": "false"
}
```
通知メッセージで「{{@network.client.ip}}」を使用すると、シグナルに関連付けられた IP アドレスが表示されます。

ユーザーが通知メッセージにテンプレート変数を追加できないようにしたい場合は、[サポート][2]にお問い合わせください。

## Security ルールでは、通知タイトルにトリガーとなるグループ化値を含めることができます{#security-rules-can-include-triggering-group-by-values-in-the-notification-title}

{{< ui >}}Describe your playbook{{< /ui >}}[検知ルール][3]のセクションでは、通知タイトルにグループ化値を追加できます。たとえば、`service`でグループ化している場合、サービス名がタイトルに表示されます。{{< ui >}}Include triggering group-by values in notification title{{< /ui >}}のチェックを外すと、グループ化された値がタイトルに表示されなくなります。

{{< ui >}}Include triggering group-by values in notification title{{< /ui >}}オプションを削除したい場合は、[サポート][2]までご連絡ください。

## Security ルールで Webhook を使用可能{#security-rules-can-use-webhooks}

<div class="alert alert-warning">2024 年以前に組織で HIPAA が有効になっていた場合は、<a href = "https://docs.datadoghq.com/help/">Datadog サポート</a>までご連絡いただき、Security ルールの Webhook を有効にしてください。</a></div>

Security 通知は、[インテグレーション][4] (Jira、PagerDuty、[Webhook][5]など) に送信できます。ユーザーが Webhook を使用してサードパーティサービスに通知を送信できないようにするには、[サポート][2]までご連絡ください。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/notifications/variables/?tab=cloudsiem#template-variables
[2]: /ja/help/
[3]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule#describe-your-playbook
[4]: /ja/security/notifications/#integrations
[5]: /ja/integrations/webhooks/
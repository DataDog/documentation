---
aliases:
- /ja/security_platform/notifications/
further_reading:
- link: /security/notifications/rules/
  tag: ドキュメント
  text: 通知ルールをセットアップおよび構成する
- link: /security/notifications/variables/
  tag: ドキュメント
  text: 通知をカスタマイズするための通知変数の詳細を見る
- link: /security/detection_rules/
  tag: ドキュメント
  text: セキュリティ検出ルールについて
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: 通知
---
{{< product-availability >}}

## 概要 {#overview}

通知を利用すると、問題が見つかったときやセキュリティシグナルが検出されたときにチームに情報を伝えることができます。検出結果とセキュリティシグナルは、特定の期間内に、[検出ルール][2]で定義されたケースの一致が少なくとも 1 つ検出された場合に生成されます。通知を利用して迅速にチームにアラートを送信することで、潜在的なセキュリティの問題に速やかに対処でき、組織の全体的なセキュリティ体制が強化されます。

## 通知タイプ {#notification-types}

通知は、個々の[検出ルール](#detection-rules)に対して設定できるほか、[通知ルール](#notification-rules)を使用してより広範囲に設定することもできます。

### 検出ルール {#detection-rules}

送信する通知は、[検出ルールを作成または変更][2]するときに定義できます。たとえば、ルールケースを追加して、検出ルールによってセキュリティシグナルがトリガーされる条件を決定することができます。

Markdown と[通知変数][1]を使用して、通知メッセージをカスタマイズすることもできます。こうすると、シグナルのタグやイベント属性を参照して、シグナルに関する詳細を提供できます。生成されたシグナルにタグを追加することもできます (例: `attack:sql-injection-attempt`)。

### 通知ルール {#notification-rules}

通知ルールを使用すると、個々の検出ルールごとに通知設定を行うのではなく、複数の検出ルール、検出結果、シグナルのすべてに適用される一般的なアラート設定を指定することができます。たとえば、重大度が `CRITICAL` または `HIGH` のシグナルがトリガーされた場合に通知を送信する通知ルールを設定できます。セットアップと構成の詳細については、「[通知ルール][3]」を参照してください。

## 通知チャネル {#notification-channels}

通知は、Slack、Jira、PagerDuty、Webhooks、ケース、電子メールなどを通じて、個人やチームに送信できます。[動的ルーティング][6]を使用して、検出結果に付加された `team` タグに基づき、検出結果の通知を担当チームに自動的に配信することもできます。

### インテグレーション {#integrations}

{{% notifications-integrations %}}

#### セキュリティを自動化するための Webhook を作成する {#create-a-webhook-for-security-automation}

Webhooks を使用して、SOAR などの他のプラットフォームにアラートを送信できます。Webhook をセットアップするには:

1. [Webhooks][4] インテグレーションに移動します。
1. [{{< ui >}}Webhooks{{< /ui >}}] セクションで [{{< ui >}}\+ New{{< /ui >}}] (+ 新規) をクリックします。
1. Webhook の名前を入力します。
1. Webhook の URL を入力します。
1. [{{< ui >}}Payload{{< /ui >}}] (ペイロード) セクションで、[{{< ui >}}Security Signal{{< /ui >}}] (セキュリティシグナル) を選択します。
  {{< img src="security/security_signal_payload.png" alt="Webhooks シグナルのセキュリティペイロード" style="width:100%;" >}}
1. 変数、カスタム変数、カスタムヘッダーの追加、およびフォームとしてのエンコードの詳細については、[Webhooks インテグレーション][5]のドキュメントを参照してください。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

Webhook を使用するには、ルールの通知セクションに `@webhook-<WEBHOOK_NAME>` を追加します。

### Teams {#teams}

{{% notifications-teams %}}

### ケース {#cases}

{{% notifications-cases %}}

シグナルごとに新しいケースを作成するのではなく、関連するシグナルを既存のケースに追加することもできます。「[シグナルをケースにグループ化する][7]」を参照してください。

### メール {#email}

{{% notifications-email %}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/notifications/variables/
[2]: /ja/security/detection_rules/#creating-and-managing-detection-rules
[3]: /ja/security/notifications/rules/
[4]: https://app.datadoghq.com/integrations/webhooks
[5]: /ja/integrations/webhooks/
[6]: /ja/security/notifications/rules/#dynamic-routing
[7]: /ja/security/cloud_siem/triage_and_investigate/signal_grouping/
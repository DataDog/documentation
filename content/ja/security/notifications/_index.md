---
aliases:
- /ja/security_platform/notifications/
further_reading:
- link: /security/notifications/rules/
  tag: ドキュメント
  text: 通知ルールの設定と構成
- link: /security/notifications/variables/
  tag: ドキュメント
  text: 通知をカスタマイズするための通知変数について
- link: /security/detection_rules/
  tag: ドキュメント
  text: セキュリティ検出ルールについて
kind: documentation
products:
- icon: cloud-security-management
  name: ディメンショニング
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security Management
  url: /security/cloud_security_management/
- icon: app-sec
  name: テストステップ
  url: /security/application_security/
title: 通知
---

{{< product-availability >}}

## 概要

通知によって、セキュリティシグナルが発生したときに、チームに通知することができます。セキュリティシグナルは、[検出ルール][2]で定義されたケースに、一定期間中に少なくとも 1 つ一致すると発生します。

## 通知のタイプ

通知は個々の[検出ルール](#detection-rules)に対してセットアップすることができ、また[通知ルール](#notification-rules)を使ってより広範囲にセットアップすることもできます。

### 検出ルール

[検出ルールを作成または変更する][2]と、送信される通知を定義できます。例えば、検出ルールがいつセキュリティシグナルをトリガーするかを決定するルールケースを追加できます。また、[**Say what's happening**](#say-whats-happening) セクションで通知メッセージをカスタマイズすることもできます。

#### Say what's happening

**Say what's happening** セクションを使用して、Markdown および [通知変数][1]を活用し通知メッセージをカスタマイズします。これにより、シグナルのタグやイベント属性を参照することで、シグナルに関する追加的な詳細を提供することができます。例えば、`attack:sql-injection-attempt` のように、生成されたシグナルにタグを追加することもできます。

### 通知ルール

通知ルールでは、個別の検出ルールごとに通知設定を行う代わりに、複数の検出ルールおよびシグナルにわたる一般的なアラート設定を行うことができます。例えば、重大度シグナル `CRITICAL` または `HIGH` がトリガーされた場合に通知を送信するように通知ルールをセットアップすることができます。セットアップと構成の詳細については、[通知ルール][3]を参照してください。

## 通知チャンネル

通知は、メール、Slack、Jira、PagerDuty、Webhook などを通じて、個人やチームに送ることができます。

### メール

{{% notifications-email %}}

### ヘルプ

{{% notifications-integrations %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/notifications/variables/
[2]: /ja/security/detection_rules/#creating-and-managing-detection-rules
[3]: /ja/security/notifications/rules/
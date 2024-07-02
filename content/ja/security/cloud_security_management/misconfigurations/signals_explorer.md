---
title: Signals Explorer
aliases:
  - /security_platform/cspm/signals_explorer
  - /security/cspm/signals_explorer
  - /security/misconfigurations/signals_explorer
further_reading:
- link: security/default_rules
  tag: Documentation
  text: Explore default cloud configuration compliance rules
- link: security/cspm/frameworks_and_benchmarks
  tag: Documentation
  text: Learn about supported frameworks and industry benchmarks
- link: "https://www.datadoghq.com/blog/datadog-csm-windows/"
  tag: Blog
  text: Secure your Windows workloads with Datadog Cloud Security Management
---

## 概要

[Misconfigurations Explorer ページ][1]でクラウドの誤構成を直接確認して修正するだけでなく、失敗した誤構成の通知を設定し、[Cloud SIEM][2] と [CSM Threats][3] によって生成されるリアルタイムの脅威と同じ場所で誤構成を相関付けてトリアージするためのシグナルを構成できます。

## セキュリティポスチャシグナルで無駄なアラートを削減

シグナルは、Datadog が生成して [Signals Explorer][4] に表示するセキュリティアラートです。セキュリティポスチャシグナルは、Datadog がクラウドまたはインフラストラクチャーの構成ルールに対して誤構成 `evaluation:fail` を生成したときにトリガーされます。

A selection of rules that have a 'high' or 'critical' severity level are enabled to generate signals by default. For lower severity compliance rules, select the *Trigger a security signal* toggle to begin generating signals. You can also use this toggle to disable compliance rules from generating signals at any point in time.

{{< img src="security/cspm/signals_explorer/Notifications.png" style="width:100%;">}}

誤構成を論理的なグループで取り扱い、アラートの過剰な通知を軽減するために、リソースが新しいクラウドアカウントのルールに失敗するたび、またはリソースがサービスで誤って構成されるたびなど、個々のリソースごとにシグナルがどのようにトリガーされるかをフルフレキシビリティを持って変更できます。Datadog ファセットからトリガーすることもできます。シグナル生成用に選択したグループ化ロジックに関係なく、シグナルを開くと、このルールに失敗した誤構成の最新のリストが常に表示されます。

{{< img src="security/cspm/signals_explorer/Signals.png" style="width:100%;">}}

Click on any security posture signal to open a side panel for more details:

{{< img src="security/cspm/signals_explorer/Sidepanel.png" style="width:75%;">}}

誤構成サイドパネルの上部には、誤構成が発生している場所 (個々のリソース、サービス、またはクラウドアカウント全体) に関する重要な情報が表示されます。

{{< img src="security/cspm/signals_explorer/Top.png" style="width:75%;">}}

Below is the message for the rule, including a description of misconfiguration and instructions for how to remediate the issue.

{{< img src="security/cspm/signals_explorer/Message.png" style="width:75%;">}}

サイドパネル下部の次のタブには、このシグナルをトリガーしているすべての誤構成が表示されます。このリストには常にインフラストラクチャーの現在の状態が表示されます。つまり、シグナルが最初にトリガーされてから 10 個の誤構成されたセキュリティグループのうち 3 個を修正した場合、Datadog は違反していない誤構成を表示するのではなく、7 個の失敗したセキュリティグループを表示します。

{{< img src="security/cspm/signals_explorer/Findings.png" style="width:75%;">}}

**注**: リソース ID 以外のグループ化を使用している場合、シグナルは、誤構成がグループ化の基準を初めて満たした際にトリガーされます。また、同じグループ内の新しいリソース (例えば、同じサービスまたはアカウント) がこのルールに失敗するたびに再トリガーされることはありません。これは新しいクラウドリソースがルールに失敗するたびに、シグナルが再度トリガーされるのを防ぐための意図的な設計です。クラウドリソースがルールに失敗するたびにアラートを受信する場合は、ルールの *group by* を `@resource_type` に変更します。

関連する問題のタブには、同じロジックグループ (同じリソース、サービス、またはクラウドアカウント) とリソースタイプ (セキュリティグループなど) でシグナルをトリガーした他のコンプライアンスルールが表示されます。

{{< img src="security/cspm/signals_explorer/Related.png" style="width:75%;">}}

サイドパネルの上部で、ルールを構成したり、メール、Slack、Microsoft Teams、PagerDuty、ServiceNow、Jira、Webhook などで同僚に通知を送信したりできます。

{{< img src="security/cspm/signals_explorer/Final.png" style="width:75%;">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/misconfigurations/findings/
[2]: /security/cloud_siem/
[3]: /security/threats/
[4]: https://app.datadoghq.com/security
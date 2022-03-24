---
title: Cloud SIEM
kind: documentation
aliases:
  - /ja/security_monitoring/
---
## 概要

Datadog Cloud SIEM (Security Information and Event Management) は、開発、運用、セキュリティチームを 1 つのプラットフォームでつなげます。1 つのダッシュボードに DevOps コンテンツ、営業用メトリクス、そしてセキュリティコンテンツを表示。アプリケーションおよびインフラストラクチャーへの標的型攻撃、システムと通信する脅威インテリジェンスにリストされた IP、安全でない構成などの脅威をリアルタイムに検出し、セキュリティに関する問題をメール、Slack、Jira、PagerDuty、または Webhook を使用してチームに通知します。

{{< img src="security_platform/security_monitoring/overview_top.png" alt="Datadog の Cloud SIEM シグナル" >}}

脅威は、Datadog 内でセキュリティシグナルとして表面化され、[セキュリティシグナルエクスプローラー][1]で収集、トリアージされます。セキュリティシグナルは、Datadog Cloud SIEM の[検出ルール][2]により生成されます。検出ルールは、すぐに使用を開始できる状態で提供され、さまざまなソースの脅威を検出します。提供された検出ルールのクローンを作成し、コンフィギュレーションを変更することや、特定のユースケースに合わせて[新しいルール][3]を作成し追加することも可能です。

{{< img src="security_platform/security_monitoring/custom_rule.png" alt="Datadog でカスタムルールを構成する"  >}}

## はじめましょう

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cloud_siem/getting_started">}}完全なセットアップとコンフィギュレーション{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules#cat-log-detection">}}すぐに使える Cloud SIEM の検出ルール{{< /nextlink >}}
  {{< nextlink href="/security_platform/detection_rules">}}独自の検出ルールを作成{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/security_platform/cloud_siem/security_home/
[2]: /ja/security_platform/default_rules#cat-log-detection
[3]: /ja/security_platform/detection_rules
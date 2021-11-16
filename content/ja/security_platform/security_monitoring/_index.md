---
title: セキュリティモニタリング
kind: documentation
---

## 概要

{{< img src="security_platform/security_monitoring/overview_top.png" alt="Datadog セキュリティモニタリング" >}}

Datadog セキュリティモニタリングは、開発、運用、セキュリティチームを 1 つのプラットフォームでつなげます。1 つのダッシュボードに DevOps コンテンツ、営業用メトリクス、そしてセキュリティコンテンツを表示。アプリケーションおよびインフラストラクチャーへの標的型攻撃、システムと通信する脅威インテリジェンスにリストされた IP、安全でない構成などの脅威をリアルタイムに検出し、セキュリティに関する問題をメール、Slack、Jira、PagerDuty、または Webhook を使用してチームに通知します。

{{< img src="security_platform/security_monitoring/takeover_ex.png" alt="Slack の例"  style="width:75%;">}}

脅威は、Datadog 内でセキュリティシグナルとして表面化され、[セキュリティシグナルエクスプローラー][1]で収集、トリアージされます。セキュリティシグナルは、Datadog セキュリティモニタリングの[検出ルール][2]により生成されます。検出ルールは、すぐに使用を開始できる状態で提供され、さまざまなソースの脅威を検出します。提供された検出ルールのクローンを作成し、コンフィギュレーションを変更することや、特定のユースケースに合わせて[新しいルール][3]を作成し追加することも可能です。

{{< img src="security_platform/security_monitoring/explorer.png" alt="セキュリティシグナルエクスプローラー"  >}}

## はじめましょう

{{< whatsnext >}}
  {{< nextlink href="/security_platform/security_monitoring/getting_started">}}セキュリティモニタリングを開始する{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules">}}環境ですぐに使えるセキュリティルールの利用を開始する{{< /nextlink >}}
  {{< nextlink href="/security_platform/detection_rules">}}カスタム検出ルールの作成について学ぶ{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/configuration/rules
[3]: https://app.datadoghq.com/security/configuration/rules/new

---
title: セキュリティモニタリング
kind: ドキュメント
---

## 概要

Datadog Security Monitoring は、開発者、運用チーム、セキュリティチームを 1 つのプラットフォームに統合します。単一のダッシュボード上に、DevOps コンテンツ、ビジネスメトリクス、およびセキュリティコンテンツが表示されます。

{{< img src="security_monitoring/overview_top.png" alt="Datadog Security Monitoring" >}}

Datadog は、利用開始後すぐに脅威を検出し、メール、Slack、Jira、PagerDuty、または Webhook でセキュリティ問題をチームに通知できます。

{{< img src="security_monitoring/takeover_ex.png" alt="Slack の例"  style="width:75%;">}}

Datadog は、アプリケーションやインフラストラクチャーに対するさまざまな種類の脅威を検出します。たとえば、標的型攻撃、脅威のインテルリストに一致するシステムと通信する IP、安全でない構成などがあります。こうした脅威は、Datadog でセキュリティシグナルとして表面化され、[セキュリティシグナルエクスプローラー][1]で相関およびトリアージできます。

{{< img src="security_monitoring/explorer.png" alt="セキュリティシグナルエクスプローラー"  >}}

セキュリティシグナルは、[検出ルール][2]を使用して Datadog Security Monitoring によって生成されます。検出ルールは、さまざまなソースにわたる脅威を検出し、利用開始後すぐに使用できます。用意されている検出ルールは、複製して構成を変更できます。また、[新しいルール][3]を最初から作成することもできます。

{{< img src="security_monitoring/det_rules.png" alt="セキュリティシグナルエクスプローラー" >}}

{{< whatsnext desc="このセクションには、次のトピックが含まれています。">}}
  {{< nextlink href="/security_monitoring/getting_started">}}<u>はじめに</u>: Datadog Security Monitoring の主要な概念、脅威検出を有効にする方法、すぐに使用可能な脅威検出ルールについて学習します。{{< /nextlink >}}
  {{< nextlink href="/security_monitoring/detection_rules">}}<u>検出ルール</u>: 検出ルールを確立して、取り込まれたすべてのログ内でセキュリティの脅威と疑わしい動作を検出するための条件付きロジックを定義します。{{< /nextlink >}}
  {{< nextlink href="/security_monitoring/explorer">}}<u>シグナルエクスプローラー</u>: セキュリティシグナルを検索、視覚化、およびトリアージします。{{< /nextlink >}}
  {{< nextlink href="/security_monitoring/default_rules">}}<u>デフォルトの規則</u>: Out 革新的な脅威検出ルールで、攻撃者のテクニックと潜在的な構成ミスを報告し、セキュリティ体制を即座に改善します。{{< /nextlink >}}

{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/configuration/rules
[3]: https://app.datadoghq.com/security/configuration/rules/new

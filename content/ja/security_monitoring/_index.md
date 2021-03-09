---
title: Security Monitoring と Compliance Monitoring
kind: ドキュメント
---

<div class="alert alert-warning">
Compliance Monitoring は、現在非公開ベータ版でご利用いただけます。この<a href="https://docs.google.com/forms/d/e/1FAIpQLScTA913tNGptcAeNNdWlvgECjekYoDVJwR-OkMtZYnJnq-FWw/viewform">フォーム</a>を使用してアクセスをリクエストしてください。
</div>

## 概要

{{< img src="security_monitoring/overview_top.png" alt="Datadog Security Monitoring" >}}

Datadog セキュリティモニタリングおよびコンプライアンスモニタリングは、開発、運用、セキュリティチームを 1 つのプラットフォームでつなげます。1 つのダッシュボードに DevOps コンテンツ、営業用メトリクス、そしてセキュリティコンテンツを表示。アプリケーションおよびインフラストラクチャーへの標的型攻撃、脅威のインテルリストに一致するシステムと通信する IP、安全でない構成などの脅威をリアルタイムに検出し、セキュリティに関する問題をメール、Slack、Jira、PagerDuty、または Webhook を使用してチームに通知します。

{{< img src="security_monitoring/takeover_ex.png" alt="Slack の例"  style="width:75%;">}}

脅威は、Datadog 内でセキュリティシグナルとして表面化され、[セキュリティシグナルエクスプローラー][1]で収集、トリアージされます。セキュリティシグナルは、Datadog セキュリティモニタリングの[検出ルール][2]により生成されます。検出ルールは、すぐに使用を開始できる状態で提供され、さまざまなソースの脅威を検出します。提供された検出ルールのクローンを作成し、コンフィギュレーションを変更することや、特定のユースケースに合わせて[新しいルール][3]を作成し追加することも可能です。

{{< img src="security_monitoring/explorer.png" alt="セキュリティシグナルエクスプローラー"  >}}

コンテナとホストに、ランタイムセキュリティおよび継続的なコンプライアンスモニタリングを有効にします。ホストまたはコンテナの主なファイルやディレクトリへの変更をリアルタイムで観察するには、**File Integrity Monitoring (FIM)** を使用します。または、Docker および Kubernetes によく使用される CIS コンプライアンスベンチマークで定義されるように、コンテナや Kubernetes クラスターをチェックしてコンフィギュレーションの問題を見つけるには、**Continuous Compliance** を使用します。

{{< img src="compliance_monitoring/compliance-dashboard.png" alt="Datadog コンプライアンスモニタリング" >}}

{{< whatsnext desc="このセクションには、次のトピックが含まれています。">}}
  {{< nextlink href="/security_monitoring/getting_started">}}<u>はじめに</u>: Datadog Security Monitoring の主要な概念、脅威検出を有効にする方法、すぐに使用可能な脅威検出ルールについて学習します。{{< /nextlink >}}
  {{< nextlink href="/security_monitoring/detection_rules">}}<u>脅威検出ルール</u>: 検出ルールを確立して、取り込まれたすべてのログ内でセキュリティの脅威と疑わしい動作を検出するための条件付きロジックを定義します。{{< /nextlink >}}
  {{< nextlink href="/security_monitoring/default_rules">}}<u>デフォルトのルール</u>: 革新的な脅威検出ルールで、攻撃者のテクニックと潜在的な構成ミスを報告し、セキュリティ体制を即座に改善します。{{< /nextlink >}}
  {{< nextlink href="/security_monitoring/explorer">}}<u>シグナルエクスプローラー</u>: セキュリティシグナルを検索、視覚化、トリアージします。{{< /nextlink >}}

{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/configuration/rules
[3]: https://app.datadoghq.com/security/configuration/rules/new

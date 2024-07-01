---
aliases:
- /ja/security_monitoring/
- /ja/security_platform/cloud_siem/security_home/
- /ja/security_platform/cloud_siem/
- /ja/security/cloud_siem/security_home/
further_reading:
- link: https://www.datadoghq.com/blog/track-issues-datadog-case-management/
  tag: ブログ
  text: Datadog Case Management で問題をプロアクティブに追跡し、トリアージし、割り当てる
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: ブログ
  text: Datadog Workflows と Cloud SIEM で、一般的なセキュリティタスクを自動化し、脅威の先を行く
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: ブログ
  text: Datadog Audit Trail で、チーム全体のコンプライアンス、ガバナンス、透明性を構築します
- link: https://www.datadoghq.com/blog/aws-threat-emulation-detection-validation-datadog/
  tag: ブログ
  text: Stratus Red Team と Datadog Cloud SIEM による AWS 脅威のエミュレーションと検出の検証
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: ブログ
  text: Datadog Cloud SIEM で 1Password を監視
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: ブログ
  text: クラウド環境に対する十分なセキュリティカバレッジの構築
title: Cloud SIEM
---
## 概要

Datadog Cloud SIEM (Security Information and Event Management) は、開発、運用、セキュリティチームを 1 つのプラットフォームでつなげます。1 つのダッシュボードに DevOps コンテンツ、営業用メトリクス、そしてセキュリティコンテンツを表示。アプリケーションおよびインフラストラクチャーへの標的型攻撃、システムと通信する脅威インテリジェンスにリストされた IP、安全でない構成などの脅威をリアルタイムに検出し、セキュリティに関する問題をメール、Slack、Jira、PagerDuty、または Webhook を使用してチームに通知します。

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="Cloud SIEM のホームページで、重要なシグナル、疑わしいアクター、影響を受けたリソース、脅威インテリジェンス、シグナルのトレンドを示すウィジェットがある Security Overview セクションを表示しています" >}}

脅威は、Datadog 内でセキュリティシグナルとして表面化され、[セキュリティシグナルエクスプローラー][1]で収集、トリアージされます。セキュリティシグナルは、Datadog Cloud SIEM の[検出ルール][2]により生成されます。検出ルールは、すぐに使用を開始できる状態で提供され、さまざまなソースの脅威を検出します。提供された検出ルールのクローンを作成し、コンフィギュレーションを変更することや、特定のユースケースに合わせて[新しいルール][3]を作成し追加することも可能です。

## 詳細はこちら

{{< whatsnext desc="Cloud SIEM を始めるにあたって、以下のドキュメントをご覧ください。" >}}
  {{< nextlink href="/getting_started/cloud_siem/">}}Cloud SIEM 入門ガイド{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/">}}Cloud SIEM 用の AWS 構成{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/">}}Google Cloud for Cloud SIEM の構成{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/azure-config-guide-for-cloud-siem/">}}Azure for Cloud SIEM の構成{{< /nextlink >}}
  {{< nextlink href="/integrations/">}}特定のインテグレーションを検索して、そのインテグレーションのログ収集の設定を行う{{< /nextlink >}}
  {{< nextlink href="/security/default_rules#cat-cloud-siem-log-detection">}}すぐに使える Cloud SIEM の検出ルールの使用開始{{< /nextlink >}}
  {{< nextlink href="/security/detection_rules">}}独自の検出ルールの作成{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/investigate_security_signals
[2]: /ja/security/default_rules#cat-cloud-siem
[3]: /ja/security/detection_rules
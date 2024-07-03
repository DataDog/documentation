---
aliases:
- /ja/security_platform/cloud_workload_security/
- /ja/security/cloud_workload_security/
- /ja/security/cloud_workload_security/agent_expressions
- /ja/security/cloud_workload_security/backend/
- /ja/security/threats/security_profiles
- /ja/security/threats/runtime_anomaly_detection
title: Cloud Security Management Threats
---

Cloud Security Management Threats (CSM Threats) は、環境全体のファイル、ネットワーク、プロセスアクティビティを監視し、インフラストラクチャーに対する脅威をリアルタイムで検出します。Datadog プラットフォームの一部として、CSM Threats のリアルタイム脅威検出をメトリクス、ログ、トレース、その他のテレメトリーと組み合わせることで、ワークロードに対する潜在的な攻撃を取り巻く完全なコンテキストを確認することができます。

## 本番ワークロードへの脅威をリアルタイムで検出する

Monitor file and process activity at the kernel level to detect threats to your infrastructure, such as Amazon EC2 instances, Docker containers, and Kubernetes clusters. Combine CSM Threats with [Network Performance Monitoring][9] and detect suspicious activity at the network level before a workload is compromised.

CSM Threats では、Datadog Agent を使用して環境を監視しています。まだ Datadog Agent をセットアップしていない場合は、[サポートされている OS][1] 上で [Agent のセットアップから始めてください][2]。Datadog Agent が CSM Threats に使用する監視は 4 種類あります。

1. **プロセス実行監視**により、ホストやコンテナ上の悪意のあるアクティビティのプロセス実行をリアルタイムで監視します。
2. **ファイル整合性監視**により、ホストやコンテナ上の主要なファイルやディレクトリの変更をリアルタイムに監視します。
3. **DNS アクティビティ監視**により、ホストやコンテナ上の悪意あるアクティビティをネットワークトラフィックでリアルタイムに監視します。
4. **カーネルアクティビティ監視**により、プロセスのハイジャックやコンテナのブレイクアウトなど、カーネル層への攻撃をリアルタイムに監視します。

{{< img src="security/csm/csm_overview_2.png" alt="The Security Inbox on the Cloud Security Management overview shows a list of prioritized security issues to remediate" width="100%">}}

## Proactively block threats with Active Protection

By default, all OOTB Agent crypto mining threat detection rules are enabled and actively monitoring for threats.

[Active Protection][10] enables you to proactively block and terminate crypto mining threats identified by the Datadog Agent threat detection rules.

## Manage out-of-the-box and custom detection rules

CSM Threats comes with more than 50 out-of-the-box detection rules that are maintained by a team of security experts. The rules surface the most important risks so that you can immediately take steps to remediate. Agent expression rules define the workload activities to be collected for analysis while backend detection rules analyze the activities and identify attacker techniques and other risky patterns of behavior.

[リモート構成][7]を使用して、新規および更新されたルールを Agent に自動的にデプロイします。各ルールがプロセス、ネットワーク、ファイルのアクティビティをどのように監視するかを定義することで[ルールをカスタマイズ][5]し、[カスタムルールを作成][6]し、新しいシグナルに対する[リアルタイム通知を設定](#set-up-realtime-notifications)することができます。

{{< img src="security/cws/threats_detection_rules.png" alt="Datadog アプリの CSM Threats 検出ルール" width="100%">}}

## リアルタイム通知の設定

環境内で脅威が検出されると[リアルタイムで通知を送信][3]し、チームはリスクを軽減するためのアクションを起こすことができます。通知は、[Slack、メール、PagerDuty、Webhook など][4]に送ることができます。

テンプレート変数と Markdown を使用して、[通知メッセージをカスタマイズ][5]できます。既存の通知ルールの編集、無効化、削除、または新しいルールの作成、重大度やルールタイプに基づいた通知トリガー時のカスタムロジックの定義が可能です。

## セキュリティシグナルの調査と修復

Investigate and triage security signals in the [Signals Explorer][8]. View detailed information about the impacted files or processes, related signals and logs, and remediation steps.

{{< img src="security/cws/signals_explorer.png" alt="CSM Signals Explorer page" width="100%">}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfzQARsTPr3tiJDnS_4bGx7w35LDfAbGUggaUzHYoL0dIUMWQ/viewform" btn_hidden="false" header="Active Protection">}}

Datadog is introducing a new feature called Active Protection to address the crypto threats detected in your environment automatically. Active Protection is in private beta. Fill out the form to request access.
{{< /callout >}}

## 詳細はこちら

{{< whatsnext >}}
  {{< nextlink href="/security/threats/setup">}}セットアップとコンフィギュレーションを完了する{{< /nextlink >}}
  {{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}CSM Threats の Datadog ロール権限{{< /nextlink >}}
  {{< nextlink href="/security/threats/workload_security_rules">}}CSM Threats 検出ルールについて{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-workload-security">}}すぐに使える CSM Threats 検出ルールの利用を開始する{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Cloud Security Management の概要{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/security/threats/setup/?tab=kuberneteshelm#prerequisites
[2]: /ja/agent/
[3]: /ja/security/notifications/
[4]: /ja/security/notifications/#notification-channels
[5]: /ja/security/notifications/#detection-rule-notifications
[6]: /ja/security/threats/agent_expressions
[7]: /ja/security/threats/setup
[8]: /ja/security/threats/security_signals
[9]: /ja/network_monitoring/performance/
[10]: /ja/security/cloud_security_management/guide/active-protection
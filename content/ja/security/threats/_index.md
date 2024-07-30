---
aliases:
- /ja/security_platform/cloud_workload_security/
- /ja/security/cloud_workload_security/
- /ja/security/cloud_workload_security/agent_expressions
- /ja/security/cloud_workload_security/backend/
title: Cloud Security Management Threats
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Cloud Security Management はサポートされていません。</div>
{{< /site-region >}}

Cloud Security Management Threats (CSM Threats) は、環境全体のファイル、ネットワーク、プロセスアクティビティを監視し、インフラストラクチャーに対する脅威をリアルタイムで検出します。Datadog プラットフォームの一部として、CSM Threats のリアルタイム脅威検出をメトリクス、ログ、トレース、その他のテレメトリーと組み合わせることで、ワークロードに対する潜在的な攻撃を取り巻く完全なコンテキストを確認することができます。

## 本番ワークロードへの脅威をリアルタイムで検出する

カーネルレベルでファイルやプロセスのアクティビティを監視し、Amazon EC2 インスタンス、Docker コンテナ、Kubernetes クラスターなどのインフラストラクチャーへの脅威を検出します。CSM Threats を[ネットワークパフォーマンスモニタリング][9]と組み合わせ、ワークロードが侵害される前にネットワークレベルで疑わしいアクティビティを検出します。

CSM Threats では、Datadog Agent を使用して環境を監視しています。まだ Datadog Agent をセットアップしていない場合は、[サポートされている OS][1] 上で [Agent のセットアップから始めてください][2]。Datadog Agent が CSM Threats に使用する監視は 4 種類あります。

1. **プロセス実行監視**により、ホストやコンテナ上の悪意のあるアクティビティのプロセス実行をリアルタイムで監視します。
2. **ファイル整合性監視**により、ホストやコンテナ上の主要なファイルやディレクトリの変更をリアルタイムに監視します。
3. **DNS アクティビティ監視**により、ホストやコンテナ上の悪意あるアクティビティをネットワークトラフィックでリアルタイムに監視します。
4. **カーネルアクティビティ監視**により、プロセスのハイジャックやコンテナのブレイクアウトなど、カーネル層への攻撃をリアルタイムに監視します。

{{< img src="security/csm/csm_overview.png" alt="Cloud Security Management 概要の Security Inbox には、優先的に修復すべきセキュリティ問題のリストが表示されます" width="100%">}}

## すぐに使える検出ルールとカスタム検出ルールの管理

CSM Threats には、セキュリティ専門家チームによってメンテナンスされている、すぐに使える 50 以上の検出ルールが用意されています。このルールは、最も重要なリスクを顕在化させるので、すぐに修正するための措置を取ることができます。Agent 式ルールは分析のために収集されるワークロードのアクティビティを定義し、一方でバックエンド検出ルールはアクティビティを分析し、攻撃者の技術やその他のリスクのある行動パターンを特定します。

[リモート構成][7]を使用して、新規および更新されたルールを Agent に自動的にデプロイします。各ルールがプロセス、ネットワーク、ファイルのアクティビティをどのように監視するかを定義することで[ルールをカスタマイズ][5]し、[カスタムルールを作成][6]し、新しいシグナルに対する[リアルタイム通知を設定](#set-up-realtime-notifications)することができます。

{{< img src="security/cws/threats_detection_rules.png" alt="Datadog アプリの CSM Threats 検出ルール" width="100%">}}

## リアルタイム通知の設定

環境内で脅威が検出されると[リアルタイムで通知を送信][3]し、チームはリスクを軽減するためのアクションを起こすことができます。通知は、[Slack、メール、PagerDuty、Webhook など][4]に送ることができます。

テンプレート変数と Markdown を使用して、[通知メッセージをカスタマイズ][5]できます。既存の通知ルールの編集、無効化、削除、または新しいルールの作成、重大度やルールタイプに基づいた通知トリガー時のカスタムロジックの定義が可能です。

## セキュリティシグナルの調査と修復

[Threats Explorer][8] で、セキュリティシグナルを調査し、トリアージします。影響を受けたファイルやプロセス、関連するシグナルやログ、改善手順に関する詳細情報を表示します。

{{< img src="security/cws/threats_page.png" alt="CSM Threats ページ" width="100%">}}

## はじめに

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

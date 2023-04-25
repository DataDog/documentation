---
aliases:
- /ja/security_platform/cloud_workload_security/
kind: documentation
title: クラウドワークロードセキュリティ
---

Datadog Cloud Workload Security (CWS) は、環境全体のファイル、ネットワーク、プロセスアクティビティを監視し、インフラストラクチャーに対する脅威をリアルタイムで検出します。Datadog プラットフォームの一部として、CWS のリアルタイム脅威検出をメトリクス、ログ、トレース、その他のテレメトリーと組み合わせることで、ワークロードに対する潜在的な攻撃を取り巻く完全なコンテキストを確認することができます。

## 本番ワークロードへの脅威をリアルタイムで検出する

カーネルレベルでのファイルやプロセスのアクティビティを監視し、AWS EC2 インスタンス、Docker コンテナ、Kubernetes クラスター、その他のインフラストラクチャーへの脅威を検出します。

CWS では、Datadog Agent を使用して環境を監視しています。まだ Datadog Agent をセットアップしていない場合は、[サポートされている OS][1] 上で [Agent のセットアップから始めてください][2]。Datadog Agent がクラウドワークロードセキュリティに使用する監視は 4 種類あります。

1. **プロセス実行監視**により、ホストやコンテナ上の悪意のあるアクティビティのプロセス実行をリアルタイムで監視します。
2. **ファイル整合性監視**により、ホストやコンテナ上の主要なファイルやディレクトリの変更をリアルタイムに監視します。
3. **DNS アクティビティ監視**により、ホストやコンテナ上の悪意あるアクティビティをネットワークトラフィックでリアルタイムに監視します。
4. **カーネルアクティビティ監視**により、プロセスのハイジャックやコンテナのブレイクアウトなど、カーネル層への攻撃をリアルタイムに監視します。

{{< img src="security/cws/cws_overview.png" alt="Cloud Workload Security の概要ページ" width="100%">}}

## すぐに使えるカスタム検出ルールの管理

CWS には、セキュリティ専門家チームによって維持されている、すぐに使える 50 以上の検出ルールが用意されています。このルールは、最も重要なリスクを顕在化させるので、すぐに修正するための措置を取ることができます。Agent 表現ルールは、分析のために収集するワークロードのアクティビティを定義し、バックエンド検出ルールはアクティビティを分析し、攻撃者のテクニックやその他の危険な行動パターンを特定します。

各ルールがプロセス、ネットワーク、ファイルのアクティビティをどのように監視するかを定義することで[ルールをカスタマイズ][5]し、[カスタムルールを作成][6]し、新しいシグナルに対する[リアルタイム通知を設定](#set-up-realtime-notifications)することができます。

{{< img src="security/cws/cws_detection_rules.png" alt="Datadog アプリの Cloud Workload Security 検出ルール" width="100%">}}

## 予想されるワークロードの動作をモデル化する

[Workload Security Profiles][10] を使用して、予想されるワークロード動作のベースラインを作成します。Workload Security Profiles は、動作学習モデルを使用して、脅威または誤構成を示す疑わしいアクティビティの特定を支援します。また、既知の許容可能なワークロードの動作に対する抑制提案も生成します。セキュリティアラートを調査し、以前は見られなかった異常な動作を特定するために、プロファイラーから得られた洞察を使用します。

## リアルタイム通知の設定

環境内で脅威が検出されると[リアルタイムで通知を送信][3]し、チームはリスクを軽減するためのアクションを起こすことができます。通知は、[Slack、メール、PagerDuty、Webhook など][4]に送ることができます。

テンプレート変数と Markdown を使用して、[通知メッセージをカスタマイズ][5]できます。既存の通知ルールの編集、無効化、削除、または新しいルールの作成、重大度やルールタイプに基づいた通知トリガー時のカスタムロジックの定義が可能です。

## セキュリティシグナルの調査と修復

[セキュリティシグナルエクスプローラー][8]で、セキュリティシグナルを調査し、トリアージします。影響を受けたファイルやプロセス、関連するシグナルやログ、改善手順に関する詳細情報を表示します。

{{< img src="security/cws/cws_signals.png" alt="Datadog アプリの Cloud Workload Security シグナル" width="100%">}}

## 詳細はこちら

{{< whatsnext >}}
  {{< nextlink href="/security/cloud_workload_security/setup">}}セットアップとコンフィギュレーションを完了する{{< /nextlink >}}
  {{< nextlink href="/security/cloud_workload_security/workload_security_rules">}}クラウドワークロードセキュリティ検出ルールについて学ぶ{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-workload-security">}}すぐに使えるクラウドワークロードセキュリティ検出ルールの利用を開始する{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Cloud Security Management の概要{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/security/cloud_workload_security/setup/?tab=kubernetes#requirements
[2]: /ja/agent/
[3]: /ja/security/notifications/
[4]: /ja/security/notifications/#notification-channels
[5]: /ja/security/notifications/#detection-rule-notifications
[6]: /ja/security/cloud_workload_security/agent_expressions
[7]: /ja/security/cloud_workload_security/setup
[8]: /ja/security/explorer
[9]: /ja/network_monitoring/performance/
[10]: /ja/security/cloud_workload_security/security_profiles
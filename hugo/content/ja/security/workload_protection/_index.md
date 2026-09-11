---
aliases:
- /ja/security_platform/cloud_workload_security/
- /ja/security/cloud_workload_security/
- /ja/security/cloud_workload_security/agent_expressions
- /ja/security/cloud_workload_security/backend/
- /ja/security/threats/security_profiles
- /ja/security/threats/runtime_anomaly_detection
- /ja/security/threats/
- /ja/security/threats/agent
- /ja/security/workload_protection/agent
cascade:
- _target:
    path: /security/workload_protection/backend_linux
  aliases:
  - /security/threats/backend_linux
- _target:
    path: /security/workload_protection/backend_windows
  aliases:
  - /security/threats/backend_windows
- _target:
    path: /security/workload_protection/linux_expressions
  aliases:
  - /security/threats/linux_expressions
- _target:
    path: /security/workload_protection/windows_expressions
  aliases:
  - /security/threats/windows_expressions
description: Datadog Workload Protection を使用して、ホスト、コンテナ、サーバーレスワークロード全体で実行時の脅威を検出し、対応します。
further_reading:
- link: https://www.datadoghq.com/blog/workload-protection-investigation/
  tag: ブログ
  text: Datadog Workload Protection を使用して、断片化された実行時のシグナルを首尾一貫した攻撃のストーリーに変える
- link: https://www.datadoghq.com/blog/workload-protection-findings
  tag: ブログ
  text: Workload Protection の検出結果を使用して、実行時の体制の問題を表面化させ、修正する
- link: https://learn.datadoghq.com/courses/workload-protection-detect-compromises
  tag: ラーニングセンター
  text: Workload Protection でホストとコンテナの侵害を検出する
- link: https://learn.datadoghq.com/courses/workload-protection-enable-manage
  tag: ラーニングセンター
  text: Workload Protection を有効にして管理する
title: Workload Protection
---
Datadog Workload Protection は、環境全体のファイル、ネットワーク、プロセスの活動を継続的に監視することで、インフラストラクチャーにリアルタイムの可視性と防御を提供します。脅威が発生した瞬間に検出し、セキュリティシグナルと検出結果を生成します。これらを使用して、悪意のある動作がワークロードに影響を与える前に、特定、調査、阻止します。

Workload Protection は、Datadog Security プラットフォームの一部です。シグナルは、誤構成スキャン、脆弱性評価、コードセキュリティの検出結果と相関するため、実行時の攻撃を既存の弱点と関連付けることができます。Datadog プラットフォーム上で実行されるため、インフラストラクチャーのメトリクス、トレース、ログとも連携します。そのコンテキストは、脅威のスコープを理解し、攻撃の経緯を再構築する上で役立ちます。

## 実行時以外の脅威検出 {#beyond-runtime-threat-detection}

Workload Protection は、実行時の脅威検出に限定されません。多くの組織が、さまざまなセキュリティおよび運用のユースケースでこれを使用しています。

- **コンプライアンスの検証:** Workload Protection は、ポリシー違反、リスクの高い設定、不正な変更について実行時のアクティビティを継続的に監視することで、PCI、FedRAMP、SOC 2 などの規制フレームワークへの準拠を検証する上で役立ちます。

- **実行時のセキュリティ体制:** Workload Protection は、安全でない実行時の慣行や機密設定のドリフトを特定することでセキュリティ体制を改善し、弱点が悪用される前に発見できるようにします。

- **Infrastructure Monitoring:** Workload Protection は、セキュリティ関連かどうかにかかわらず、あらゆる種類のランタイム動作を追跡します。カスタムワークロードのデバッグから、システムレベルのプロセスやリモートユーザーセッションの監視まで、環境がどのように動作しているかについてのリアルタイムの可視性を提供します。

{{< img src="security/workload_protection/k8s_remote_access.png" alt="Kubernetes リモートユーザーセッションの内訳" width="100%">}}

## 仕組み {#how-it-works}

Workload Protection は、収集したアクティビティを Datadog Agent と Datadog の 2 か所で評価します。

### 設計によるリソースの節約 {#saving-resources-by-design}

Workload Protection の検出ルールは複雑で、時間とプロセスにわたる複数のデータポイントを関連付けます。すべてのルールを Agent のホストで評価すると、この複雑さにより、かなりのコンピューティングリソースが要求されることになります。

Datadog は、ワークロードからセキュリティに関連しないアクティビティを除外する効率的なルールで Agent を軽量に保ち、残りのアクティビティを Datadog バックエンドの脅威検出ルールと検出結果ルールを使用して処理することで、この問題を解決します。Agent ルールは[ポリシー][14]で構成されており、 {{< tooltip glossary="Remote Configuration" case="title" >}} または手動でデプロイします。ルールとポリシーは、Datadog、Agent 構成ファイル、または Datadog Terraform プロバイダーで管理できます。

{{< img src="security/workload_protection/workload_protection_detection_architecture.png" alt="Workload Protection アーキテクチャの概要" width="100%">}}

### ランタイムアクティビティの収集 {#collecting-runtime-activity}

Datadog Agent は、ワークロードからランタイムアクティビティを収集します。収集メカニズムはプラットフォームによって異なります。

- **Linux**: 最も幅広い機能サポートを提供する eBPF Agent。
- **AWS Fargate**: cws-instrumentation トレーサー。Fargate は eBPF アクセスを提供しないため、この Agent は代わりに ptrace を使用します。File Integrity Monitoring やプロセス実行監視など、主要な Workload Protection 機能をカバーしています。
- **Windows**: Windows ドライバー。

Linux および Windows 全体で、Workload Protection はプロセス、ファイルシステム、カーネル、ネットワークアクティビティにわたる 40 種類以上のイベントタイプをカバーしています。各 Agent がサポートするディストリビューション、バージョン、クラウド環境については、[セットアップ][1]を参照してください。

### アクティビティの評価 {#evaluating-activity}

Agent ルールは軽量なフィルタリングを実行するため、すべてのホストで効率的に動作します。Datadog は、時間とプロセスにわたるより複雑な相関関係を評価します。

1. [Agent ルール][6]は、Agent のホスト上のシステムアクティビティを評価します。
2. アクティビティが Agent ルールの式と一致すると、Agent は [エージェントイベント][7]を生成し、Datadog に渡します。
3. Datadog は、エージェントイベントを[検出ルール][8]および[検出結果ルール][9]と照らし合わせて評価します。
4. 検出ルールが一致すると、シグナルが生成され、[シグナル][10]に表示されます。Agent イベントの属性が[脅威インテリジェンスインジケーター][13]と一致する場合、一致したインジケーターも表示されます。
5. 検出結果ルールが一致すると、検出結果が生成され、[検出結果][11]に表示されます。
6. シグナルの重大度、ルールタイプ、タグ、属性に一致する[通知ルール][12]がトリガーされます。

Workload Protection には 350 以上の Agent ルールと 200 以上の検出ルールが付属しており、MITRE ATT&CK の戦術とテクニックの大部分をカバーしています。独自のルールを作成することもでき、複雑な侵害インジケーターに対してのみアラートを送信する Agent 内ステートマシンも作成可能です。

### 脅威への対応 {#responding-to-threats}

対応アクションは Agent 内で実行されます。Agent は、プロセスやコンテナを終了させたり、eBPF ベースのフィルターを使用してネットワークトラフィックをブロックしたりできます。これらのアクションは、次の 2 つの方法でトリガーできます。

- **自動対応**は Agent ルールにアクションを関連付けるため、ルールが一致するとすぐに Agent が動作します。
- **手動対応**では、シグナルが生成された後にそれに基づいてアクションを実行できます。

どちらも、Agent で強制適用が有効になっている必要があります。[脅威に対応する][4]を参照してください。

Agent の代わりに Datadog から対応することもできます。シグナルから[ワークフロー][15]をトリガーするか、シグナルを既存の対応パイプラインと統合します。[シグナルアクション][16]を参照してください。

## 次のステップ {#next-steps}

### セットアップ {#setup}

[セットアップ][1]ガイドから始めます。Agent のデプロイ方法、サポートされている環境、およびプレイグラウンドスクリプトを使用して Workload Protection の機能を試す方法について説明しています。

### 検出と監視 {#detect-and-monitor}

[検出と監視][2]ページを読んで、Agent イベントがどのように Workload Protection のシグナルや検出結果に変換されるかを理解します。これらのページは、組み込み (OOTB) 検出機能の調査や、独自の検出ロジックの作成に役立ちます。

### 調査とトリアージ {#investigate-and-triage}

[調査とトリアージ][3]のページを参照して、Workload Protection で利用可能なエクスプローラーやアプリ内で表示する内容を確認します。これらのページは、プラットフォームによって生成されたイベント、シグナル、検出結果を最大限に活用する上で役立ちます。

### 脅威に対応する {#respond-to-threats}

[脅威に対応する][4]ページでは、自動応答および手動応答の設定方法を説明しています。Agent の強制適用要件、利用可能な応答アクション、およびその結果の解釈方法について説明しています。

### カバレッジ {#coverage}

[カバレッジ][5]を使用して、ホスト、コンテナ、サーバーレスワークロード全体における Workload Protection の状況を、統合されたリアルタイムビューで取得します。ポリシー展開の問題、保護されていないアセット、および検出のギャップが悪用可能なリスクになる前に特定します。

### ガイド {#guides}

{{< whatsnext desc="Workload Protection について理解を深めるため、ケース主導の例を活用します。" >}}
{{< nextlink href="/security/workload_protection/guide/tuning-rules" >}}Workload Protection のセキュリティシグナルを調整するためのベストプラクティス{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/security/workload_protection/setup
[2]: /ja/security/workload_protection/detect_and_monitor
[3]: /ja/security/workload_protection/investigate_and_triage
[4]: /ja/security/workload_protection/respond_and_report
[5]: /ja/security/workload_protection/inventory
[6]: /ja/security/workload_protection/detect_and_monitor/agent_rules
[7]: /ja/security/workload_protection/investigate_and_triage/agent_events
[8]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[9]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[10]: /ja/security/workload_protection/investigate_and_triage/security_signals
[11]: /ja/security/workload_protection/investigate_and_triage/security_findings
[12]: /ja/security/notifications/rules
[13]: /ja/security/workload_protection/detect_and_monitor/threat_intelligence
[14]: /ja/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[15]: /ja/actions/workflows/
[16]: /ja/security/workload_protection/investigate_and_triage/security_signals/actions
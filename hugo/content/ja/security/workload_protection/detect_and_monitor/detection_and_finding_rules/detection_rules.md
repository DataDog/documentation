---
aliases:
- /ja/security/workload_protection/detect_and_monitor/detection_rules
- /ja/security/workload_protection/setup/ootb_rules
description: Agent イベントを分析し、Workload Protection セキュリティシグナルを生成するバックエンドルールを作成および管理します。
disable_toc: false
title: 検出ルール
---
検出ルールは、[Agent イベント][1]を分析して環境内の脅威を検出する際に使用されるバックエンドロジックを記述します。検出ルールに一致すると、ユーザーが Datadog で調査して対応できる[セキュリティシグナル][2]が Workload Protection により生成されます。

検出ルールは、1 つ以上の Agent ルール (`@agent.rule_id` で参照される) を組み合わせ、しきい値や異常などの検出方法を適用し、ノイズを抑制し、適切なチームにアラートをルーティングします。Agent ルールはホスト上のランタイムテレメトリを収集し、検出ルールがそのテレメトリを優先順位付けされた脅威検出に変換します。

このページでは、設定なしで使用できる (OOTB) 検出ルールの仕組みと、Datadog でカスタム検出ルールを作成する方法について説明します。

## OOTB 検出ルール {#ootb-detection-rules}

Workload Protection には、Datadog が管理する OOTB **検出ルール**が含まれています。これらは、Agent ルールを使用して収集されたテレメトリとバックエンド式を併せて使用し、疑わしいアクティビティが検出された場合にセキュリティシグナルを生成します。[デフォルトの検出ルール][3]で全カタログを参照するか、Datadog の Workload Protection の[検出ルール][4]リストでルールを確認および調整してください。

## カスタム検出ルールを作成する {#create-a-custom-detection-rule}

カスタム検出ルールを作成するには、Workload Protection の[検出ルール][4]ページに移動し、[{{< ui >}}New Rule{{< /ui >}}] (新規ルール) をクリックします。[{{< ui >}}Assisted rule creator{{< /ui >}}] (ルール作成支援機能) を使用して、Agent ルールと検出ルールの両方を単一のフローで構成することもできます。「[カスタム Agent ルールと検出ルールを同時に作成する](#create-the-custom-agent-and-detection-rules-together)」を参照してください。

ルールエディターでは、5 つのステップに沿ってルールを作成することができます。

### ステップ 1: リアルタイムルールを定義する {#step-1-define-your-real-time-rule}

使用する検出方法を選択します。

- [{{< ui >}}Threshold{{< /ui >}}] (しきい値): シグナルをトリガーするために必要な一致イベントの数と期間を定義します。たとえば、5 分以内に一致イベントが 5 件より多く発生した場合にトリガーします。
- [{{< ui >}}New value{{< /ui >}}] (新しい値): 追跡対象の属性が、これまでに観測されたことのない値になった場合にトリガーします。
- [{{< ui >}}Anomaly{{< /ui >}}] (異常): イベントの量や動作が予想されるベースラインから逸脱した場合にトリガーします。
- [{{< ui >}}Content anomaly{{< /ui >}}] (内容の異常): 一致イベントの内容が過去のデータと比較して統計的に異常である場合にトリガーします。

### ステップ 2: 検索クエリを定義する {#step-2-define-search-query}

ルールが評価する [Agent イベント][1]を選択するクエリを定義します。検索クエリは、シグナルを発行するかどうかを判断する上での基になるイベントを決定します。

以下が可能です。

- Agent イベントの**特定のフィールド**でフィルタリングし、クエリを絞り込むことで、検出の精度を高めます。たとえば、`@process.executable.path`、`@file.path`、または `@agent.rule_id` でフィルタリングします。検出ルールは、バックエンドイベントスキーマの任意のフィールドをクエリできます。すべての利用可能なフィールドについては、「[Linux バックエンド構文][13]」および「[Windows バックエンド構文][14]」を参照してください。
- 複数の条件を組み合わせて、ルールのスコープをインフラストラクチャーやワークロードのサブセットに限定します。

**しきい値**ルールの場合は、**ルックバックウィンドウ**も定義します。これは、Datadog が一致イベント件数をルール条件と比較する前に、一致イベント件数を計測する期間です。

ルールを公開する前に、[Agent Events Explorer][6] を使用してクエリをテストし、どのイベントが一致するかを確認します。

### ステップ 3: ルール条件を定義する {#step-3-define-rule-conditions}

ルールがシグナルを発行する条件を決定する制限を設定します。**複数のケース**を作成し、それぞれに異なる重大度レベルを関連付けることができます。

たとえば、しきい値ルールでは次のように定義できます。

- [{{< ui >}}Critical{{< /ui >}}] (重大): 5 分以内に一致イベントが 10 件より多く発生した場合。
- [{{< ui >}}High{{< /ui >}}] (高):5 分以内に一致イベントが 5 件より多く発生した場合。
- [{{< ui >}}Medium{{< /ui >}}] (中):5 分以内に一致イベントが 2 件より多く発生した場合。

[{{< ui >}}Add notify{{< /ui >}}] (通知を追加) セクションでは、必要に応じて、ルールがトリガーされたときの通知の受信者を設定できます。受信者を個別に追加することも、[通知ルール][7]を利用して複数の検出ルールのアラートを管理することもできます。

### ステップ 4: プレイブックを記述する {#step-4-describe-your-playbook}

[Signals Explorer][2] で開いたときに表示されるシグナルの**タイトル**と**説明**を設定します。

1. [{{< ui >}}Rule name{{< /ui >}}] (ルール名) を入力します。この名前は検出ルールリストに表示され、生成されたセキュリティシグナルのタイトルになります。
2. [{{< ui >}}Rule message{{< /ui >}}] (ルールメッセージ) セクションで、[通知変数][8]と Markdown を使用して、何が発生したか、また対応担当者が実施すべき対応を記述します。テンプレート変数は、トリガーの原因となった Agent イベントから動的なコンテキストを取得して、シグナルとその通知に直接挿入します。
3. [{{< ui >}}Tag resulting signals{{< /ui >}}] (生成されたシグナルにタグ付けする) ドロップダウンメニューを使用して、生成されたシグナルにタグを追加します。たとえば、`security:attack` や `technique:T1059-command-and-scripting-interpreter` などです。

### ステップ 5: 抑制を作成する {#step-5-create-a-suppression}

必要に応じて**抑制クエリ**を追加し、特定のインフラストラクチャーやイベントをこのルールから除外してノイズを減らします。抑制を使用すると、一致するアクティビティが予期されている場合や無害である場合に、シグナルの生成を阻止できます。

たとえば、既知の自動化ユーザーをルールから除外するには、`@usr.name:automation-bot` のような抑制クエリを追加します。

このステップでは、過去の**一致イベント数の概要**も提供されるため、ルールを保存する前に、そのルールがトリガーされるであろう頻度を推定することができます。このプレビューを使用してクエリ、しきい値、または抑制を調整し、過剰な数のアラートが発行されないようにします。

複数の検出ルールに対する抑制の詳細については、「[抑制][9]」を参照してください。

## カスタム Agent ルールと検出ルールを一緒に作成する {#create-the-custom-agent-and-detection-rules-together}

デフォルトの Agent ルールがどのようにポリシーにパッケージ化され、デプロイされるかについては、「[Agent ルール][10]」の概要および「[ポリシー管理][11]」を参照してください。

対応する Agent ルールと検出ルールは、次のいずれかの方法で定義できます。

- [{{< ui >}}Assisted rule creator{{< /ui >}}]: Datadog でカスタム Workload Protection [検出ルール][4]を開始し、ウィザードを使用して Agent 式とバックエンドの検出ルールロジックの両方を設定します。
- [{{< ui >}}Manual rule creator{{< /ui >}}] (手動ルール作成): [[Agent Configuration] (Agent 構成)][12]からポリシーを開くか作成し、[{{< ui >}}Manual rule creator{{< /ui >}}] を選択して、まず Agent ルールを作成してから、それを参照する検出ルールを追加します。UI の手順とデプロイについては、「[ポリシー管理][11]」を参照してください。

Agent ルールは、Datadog Security Language (SECL) 式を使用してイベントを照合します。SECL の構文については、「[SECL ガイド][15]」を参照してください。どのような場合に、完全一致ではなくパターンや正規表現を使用すべきかについては、「[ルール作成のヒント][16]」を参照してください。

[1]: /ja/security/workload_protection/investigate_and_triage/agent_events
[2]: /ja/security/workload_protection/investigate_and_triage/security_signals
[3]: /ja/security/default_rules/#cat-workload-security
[4]: https://app.datadoghq.com/security/configuration/rules?product=cws
[5]: /ja/security/workload_protection/respond_and_report/#automated-response
[6]: https://app.datadoghq.com/security/agent-events
[7]: /ja/security/notifications/rules/
[8]: /ja/security/notifications/variables/
[9]: /ja/security/suppressions/
[10]: /ja/security/workload_protection/detect_and_monitor/agent_rules
[11]: /ja/security/workload_protection/detect_and_monitor/agent_rules/policy_management#create-a-custom-agent-rule
[12]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[13]: /ja/security/workload_protection/backend_linux
[14]: /ja/security/workload_protection/backend_windows
[15]: /ja/security/workload_protection/detect_and_monitor/agent_rules/secl_guide
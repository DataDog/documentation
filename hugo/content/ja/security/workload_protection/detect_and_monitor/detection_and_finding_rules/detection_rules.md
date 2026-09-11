---
aliases:
- /ja/security/workload_protection/detect_and_monitor/detection_rules
- /ja/security/workload_protection/setup/ootb_rules
description: Agent イベントを分析して Workload Protection のセキュリティシグナルを生成する、バックエンドルールを作成および管理します。
disable_toc: false
title: 検出ルール
---
検出ルールは、[Agent イベント][1]を分析することで、環境内の脅威を検出するために使用されるバックエンドロジックを記述します。検出ルールが一致すると、Workload Protection は Datadog で調査および対応可能な[セキュリティシグナル][2]を生成します。

検出ルールは、1 つ以上の Agent ルール (`@agent.rule_id` で参照) を組み合わせ、しきい値や異常検知などの検出方法を適用し、ノイズを抑制し、アラートを適切なチームに振り分けます。Agent ルールはホスト上のランタイムテレメトリを収集し、検出ルールはそのテレメトリを、優先順位付けされた脅威検出情報へと変換します。

このページでは、すぐに使える (OOTB) 検出ルールの仕組みと、Datadog でカスタム検出ルールを作成する方法について説明します。

## OOTB 検出ルール {#ootb-detection-rules}

Workload Protection には、Datadog が管理する OOTB **検出ルール**が含まれています。これらのルールは、Agent ルールによって収集されたテレメトリとバックエンドの式を組み合わせ、疑わしいアクティビティが検出された場合にセキュリティシグナルを生成します。[デフォルトの検出ルール][3]で全カタログを参照するか、Datadog の Workload Protection の[検出ルール][4]リストで、検出ルールを確認および調整できます。

## カスタム検出ルールを作成する {#create-a-custom-detection-rule}

カスタム検出ルールを作成するには、Workload Protection の[検出ルール][4]ページに移動し、{{< ui >}}New Rule{{< /ui >}} をクリックします。{{< ui >}}Assisted rule creator{{< /ui >}} を使用して、Agent ルールと検出ルールの両方を単一のフローで作成することもできます。「[カスタム Agent ルールと検出ルールを一緒に作成する](#create-the-custom-agent-and-detection-rules-together)」を参照してください。

ルールエディターでは、5 つのステップで設定を行います。

### ステップ 1: リアルタイムルールを定義する {#step-1-define-your-real-time-rule}

使用する検出方法を選択します。

- {{< ui >}}Threshold{{< /ui >}}: 時間枠と、シグナルをトリガーするために必要な一致イベント数を定義します。たとえば、5 分以内に 5 件を超える一致イベントが発生した場合にトリガーします。
- {{< ui >}}New value{{< /ui >}}: 追跡対象の属性が、これまで検知されたことのない値で出現した場合にトリガーします。
- {{< ui >}}Anomaly{{< /ui >}}: イベントの量や動作が、想定されるベースラインから逸脱した場合にトリガーします。
- {{< ui >}}Content anomaly{{< /ui >}}: 一致するイベントの内容が、過去のデータと比較して統計的に異常である場合にトリガーします。

### ステップ 2: 検索クエリを定義する {#step-2-define-search-query}

ルールが評価する [Agent イベント][1]を選択するクエリを定義します。検索クエリは、シグナルを生成するかどうかを判断する際に考慮されるイベントを決定します。

次のことができます。

- Agent イベントを**特定のフィールド**でフィルタリングしてクエリを絞り込み、検出の精度を高めます。たとえば、`@process.executable.path`、`@file.path`、または `@agent.rule_id` でフィルタリングします。検出ルールは、バックエンドイベントスキーマに含まれる任意のフィールドをクエリに使用できます。利用可能なフィールドの一覧については、[Linux バックエンド構文][13]および [Windows バックエンド構文][14]を参照してください。
- 複数の条件を組み合わせて、ルールをインフラストラクチャーまたはワークロードのサブセットに絞り込みます。

**しきい値**ルールの場合は、**ルックバックウィンドウ**も定義します。これは、Datadog がルール条件とカウントを比較する前に、一致するイベントをカウントする期間です。

ルールを公開する前に、[Agent Events Explorer][6] を使用してクエリをテストし、どのイベントが一致するかを確認できます。

### ステップ 3: ルール条件を定義する {#step-3-define-rule-conditions}

ルールがシグナルを生成するタイミングを決定する条件を設定します。**複数のケース**を作成し、それぞれに異なる重大度レベルを設定することができます。

たとえば、しきい値ルールでは次のように定義できます。

- {{< ui >}}Critical{{< /ui >}}: 5 分以内に 10 件を超える一致イベントが発生した場合。
- {{< ui >}}High{{< /ui >}}: 5 分以内に 5 件を超える一致イベントが発生した場合。
- {{< ui >}}Medium{{< /ui >}}: 5 分以内に 2 件を超える一致イベントが発生した場合。

{{< ui >}}Add notify{{< /ui >}} セクションでは、ルールがトリガーされたときに通知を受け取るユーザーをオプションで設定できます。個別の受信者を追加することも、[通知ルール][7]を利用して複数の検出ルール全体のアラート通知を管理することもできます。

### ステップ 4: プレイブックを記述する {#step-4-describe-your-playbook}

[Signals Explorer][2] で開いたときに表示される、シグナルの**タイトル**と**説明**を設定します。

1. {{< ui >}}Rule name{{< /ui >}} を入力します。この名前は検出ルールリストに表示され、生成されたセキュリティシグナルのタイトルになります。
2. {{< ui >}}Rule message{{< /ui >}} セクションでは、[通知変数][8]と Markdown を使用して、何が発生したか、また対応担当者がどのように対処すべきかを記述します。テンプレート変数は、トリガーとなった Agent イベントから取得した動的なコンテキストを、シグナルとその通知に直接挿入します。
3. {{< ui >}}Tag resulting signals{{< /ui >}} ドロップダウンメニューを使用して、生成されたシグナルにタグを追加します。例: `security:attack` または `technique:T1059-command-and-scripting-interpreter`。

### ステップ 5: 抑制を作成する{#step-5-create-a-suppression}

オプションで**抑制クエリ**を追加し、特定のインフラストラクチャーやイベントをこのルールから除外することで、ノイズを減らします。抑制は、該当するアクティビティが想定内または無害なものである場合に、シグナルが生成されるのを防ぐのに役立ちます。

たとえば、既知の自動化ユーザーをルールから除外するには、`@usr.name:automation-bot` のような抑制クエリを追加します。

このステップでは、過去の**一致イベント数の概要**も提供されるため、ルールを保存する前に、どの程度の頻度でルールがトリガーされていたかを推定できます。このプレビューを使用して、クエリ、しきい値、または抑制を調整し、アラートが過剰に発生することを防ぎます。

検出ルール全体での抑制の詳細については、「[抑制][9]」を参照してください。

## カスタム Agent と検出ルールを一緒に作成する{#create-the-custom-agent-and-detection-rules-together}

デフォルトの Agent ルールがどのようにポリシーにパッケージ化され、デプロイされるかについては、「[Agent ルール][10]」の概要および「[ポリシー管理][11]」を参照してください。

Agent ルールと検出ルールは、次のいずれかの方法で定義できます。

- {{< ui >}}Assisted rule creator{{< /ui >}}: Datadog でカスタムの Workload Protection の[検出ルール][4]を開始し、ウィザードを使用して Agent 式とバックエンドの検出ルールロジックの両方を設定します。
- {{< ui >}}Manual rule creator{{< /ui >}}: [Agent Configuration][12] からポリシーを開くか作成し、{{< ui >}}Manual rule creator{{< /ui >}} を選択して Agent ルールを作成してから、それを参照する検出ルールを追加します。UI の手順とデプロイについては、「[ポリシー管理][11]」を参照してください。

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
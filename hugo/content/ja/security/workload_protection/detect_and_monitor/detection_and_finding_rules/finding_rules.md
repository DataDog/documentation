---
aliases:
- /ja/security/workload_protection/detect_and_monitor/finding_rules
description: ランタイムセキュリティ体制を評価し、Workload Protection の検出結果を生成するバックエンドルールを作成および管理します。
disable_toc: false
further_reading:
- link: /security/workload_protection/investigate_and_triage/security_findings
  tag: ドキュメント
  text: 検出結果の調査とトリアージ
- link: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
  tag: ドキュメント
  text: SECL ガイド
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: ドキュメント
  text: 検出ルール
title: 検出結果ルール
---
検出結果ルールは、[Agent イベント][1]を分析することで、ランタイムセキュリティ体制を評価するために使用されるバックエンドロジックを記述します。検出結果ルールが一致すると、Workload Protection は影響を受けるリソースに対して[検出結果][2]を生成します。

実際のランタイムセキュリティの脅威を表面化させる[検出ルール][3]とは異なり、検出結果ルールは進行中の不適切な慣行や設定ミスを追跡します。検出結果は、単一の不審なアクティビティではなく、セキュリティポリシーに違反しているリソース (ホストまたはコンテナ) を表します。

検出結果ルールは、既存の Agent イベントを使用して、コンテナ内でのパッケージマネージャーの使用、IMDS アクセスパターン、不要な権限設定など、実用的なセキュリティ推奨事項を提示します。これは、直接的な脅威ではないものの、本番環境におけるリスクの高い慣行を表す現実世界のリスクに対処する上で役立ちます。

## OOTB 検出結果ルール {#ootb-finding-rules}

Workload Protection には、Datadog が管理する out-of-the-box (OOTB) 検出結果ルールが含まれています。これらのルールは、本番ワークロードにおける不適切な慣行やリスクの高い設定を継続的に提示します。Datadog は新しいデフォルトルールを継続的に開発しており、新しいルールは自動的にアカウントにインポートされます。全リストについては、[OOTB ルールリスト][8]を参照してください。

Datadog の Workload Protection [検出結果ルール][6]リストで、組織にデプロイされた検出結果ルールを参照および確認します。各ルールには、セキュリティリスクの説明、適用されるリソースタイプ、および修復ガイダンスが含まれています。

予期される設定に対するノイズを減らすには、検出結果の自動化を使用して、ルールを無効にせずにミュートします。[Findings automation][7] を参照してください。

## カスタム検出結果ルールを作成する {#create-a-custom-finding-rule}

カスタム検出結果ルールは、[検出ルール][3]と同じ作成プロセスに従いますが、1 つの重要な違いがあります。それは、特定の時点のイベントを検出するのではなく、ホストやコンテナといった特定のリソースタイプを対象とする点です。

カスタム検出結果ルールを作成するには、Workload Protection の[検出結果ルール][6]ページに移動し、[{{< ui >}}New Rule{{< /ui >}}] をクリックします。

ルールエディターでは、5 つのステップで設定を行います。

### ステップ 1: リソースタイプを選択し、検索クエリを定義する {#step-1-select-a-resource-type-and-define-search-query}

検出結果ルールが評価するリソースのタイプを選択します。

- {{< ui >}}Host{{< /ui >}}: ルールはホストに適用されます。Workload Protection は、コンテナイベントを除外するように、クエリの先頭に `-@container.id:*` を自動的に付加します。
- {{< ui >}}Container{{< /ui >}}: ルールはコンテナに適用されます。Workload Protection は、コンテナイベントのみを含めるように、クエリの先頭に `@container.id:*` を自動的に付加します。

{{< img src="security/workload_protection/detect_and_monitor/finding_rules_editor.png" alt="ホストおよびコンテナのリソースタイプセレクターと検索クエリのプレビューを表示する検出結果ルールエディター" width="100%">}}

ルールが評価する [Agent イベント][1]を選択するクエリを定義します。検索クエリは、リソースがルールに違反しているかどうかを判断する際に、どのイベントを考慮するかを決定します。

次のことができます。

- Agent イベントの**特定のフィールド**でフィルタリングしてクエリを絞り込み、検索結果をより正確にします。たとえば、`@process.executable.path`、`@file.path`、または `@agent.rule_id` でフィルタリングします。[検出ルール][3]と同様に、検出結果ルールはバックエンドイベントスキーマの任意のフィールドをクエリできます。これには、すべての Agent イベントフィールドに加え、インフラストラクチャーコンテキスト、プロセス系統、脅威インテリジェンスなどの追加のエンリッチメントが含まれます。利用可能なフィールドの全セットについては、[Linux backend syntax][9] および [Windows backend syntax][10] を参照してください。
- 複数の条件を組み合わせて、ルールをインフラストラクチャーまたはワークロードのサブセットに絞り込みます。

ルールを公開する前に、[Agent Events Explorer][5] を使用してクエリをテストし、どのイベントが一致するかを確認します。

### ステップ 2: 検出結果の重大度を定義する {#step-2-define-finding-severity}

ルールがトリガーされたときに検出結果が持つ重大度を定義します。

### ステップ 3: 検出結果を説明する {#step-3-describe-the-finding}

検出結果が生成されたときに表示される**名前**、**説明**、および**修復ガイダンス**を構成します。

1. {{< ui >}}Rule name{{< /ui >}} を入力します。名前は検出結果ルール一覧表示に表示され、生成された検出結果のタイトルになります。
2. {{< ui >}}Rule message{{< /ui >}} セクションでは、Markdown を使用して、検出結果の意味と対処方法を説明します。メッセージ本文に `## Remediation` ヘッダーを含めます。Workload Protection は、このセクションを使用して、検出結果のサイドパネルに修復手順を直接表示します。
3. {{< ui >}}Tag resulting findings{{< /ui >}} ドロップダウンを使用して、生成された検出結果にタグを追加します。例: `security:posture` または `compliance:pci`。

**注**: 検出結果のサイドパネルに修復手順を正しく表示するには、`## Remediation` ヘッダーが必要です。

[1]: /ja/security/workload_protection/investigate_and_triage/agent_events
[2]: /ja/security/workload_protection/investigate_and_triage/security_findings
[3]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: https://app.datadoghq.com/security/configuration/findings-automation
[5]: https://app.datadoghq.com/security/agent-events
[6]: https://app.datadoghq.com/security/workload-protection/finding-rules
[7]: /ja/security/automation_pipelines/mute
[8]: /ja/security/default_rules/#workload-activity
[9]: /ja/security/workload_protection/backend_linux
[10]: /ja/security/workload_protection/backend_windows
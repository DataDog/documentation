---
description: Datadog MCP Server を使用して、AI エージェントを CI Visibility、Test Optimization、およびデプロイメントゲートデータに接続します。
further_reading:
- link: mcp_server/setup
  tag: ドキュメント
  text: Datadog MCP Server の設定
- link: continuous_integration/
  tag: ドキュメント
  text: CI Visibility
- link: tests/
  tag: ドキュメント
  text: Test Optimization
- link: deployment_gates/
  tag: ドキュメント
  text: デプロイメントゲート
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: ブログ
  text: Datadog MCP Server を使用して、AI エージェントを Datadog ツールとコンテキストに接続する
title: Software Delivery MCP ツールの概要
---
## 概要{#overview}

[Datadog MCP Server][1] は、AI エージェントが [MCP (Model Context Protocol)][2] を介して Software Delivery データにアクセスできるようにします。`software-delivery` ツールセットは、Cursor、Claude Code、OpenAI Codex などの AI 搭載クライアントから直接 [CI Visibility][3]、[Test Optimization][4]、[Code Coverage][8]、[DORA メトリクス][9]、および[デプロイメントゲート][10]と対話するためのツールを提供します。

## ユースケース {#use-cases}

Software Delivery MCP ツールは、以下の AI 支援ワークフローを実現します。

- **パイプラインエラーのデバッグ**: AI エージェントに最近のパイプラインのエラーを検出し、エラーログを分析して、修正案を提示するよう指示します。
- **不安定なテストの特定**: リポジトリ内の不安定なテストをクエリし、優先的に修正すべきテストに関する推奨事項を取得します。
- **CI パフォーマンスの分析**: パイプラインの期間、失敗率、および経時的な傾向に関する集計統計を取得します。
- **テスト失敗のトリアージ**: 失敗しているテストとその所有者、および履歴パターンを把握します。
- **コードカバレッジのレビュー**: ブランチやコミットのカバレッジ概要を取得します (パッチカバレッジや、サービスまたはコード所有者ごとの内訳を含みます)。
- **DORA メトリクスの測定**: サービスまたはチームごとに、デプロイ頻度、変更のリードタイム、変更失敗率、および復旧時間をクエリします。
- **Test Optimization 設定の確認**: Test Impact Analysis、不安定さの早期検出、テストの自動再試行など、サービスに対して有効な Test Optimization 機能を確認します。
- **失敗した CI ジョブの再試行**: エージェントセッションを離れることなく、失敗した GitHub Actions または GitLab ジョブの再試行をキューに入れます。
- **PR の健全性の確認**: プルリクエストの CI の失敗、コードカバレッジ、品質またはセキュリティ違反をまとめて確認します。
- **デプロイメントゲートの失敗の調査**: ゲートの失敗の原因となったルールと、失敗によってデプロイメントがブロックされたかどうかを確認します。
- **デプロイメントゲート設定のレビュー**: サービスと環境に適用されているゲートとルールを表示します。

## 利用可能なツール{#available-tools}

`software-delivery` ツールセットには、以下のツールが含まれています。

`search_datadog_ci_pipeline_events`
: フィルターを使用して CI パイプラインイベントを検索し、失敗、期間、ステータスに関する詳細を取得します。

`aggregate_datadog_ci_pipeline_events`
: 平均期間、失敗数、パーセンタイル分析などの統計を求めるために CI パイプラインイベントを集計します。

`get_datadog_flaky_tests`
: 失敗率、カテゴリー、所有者、CI の影響などのトリアージ詳細を含め、不安定なテストを検出します。

`update_datadog_flaky_test_states`
: 1 つ以上の不安定なテストの状態を `quarantined` (失敗を抑制)、`disabled` (テストをスキップ)、`fixed` (解決済みとしてマーク)、または `active` (復元) に設定します。これは `TestOptimizationWrite` 権限と明示的なユーザーの承認を必要とする書き込み操作です。すべての状態変更は元に戻すことができます。

`aggregate_datadog_test_events`
: テストイベントを集計して、信頼性とパフォーマンスの傾向を分析します。

`search_datadog_test_events`
: フィルターを使用してテストイベントを検索し、その詳細を取得します。

`get_datadog_code_coverage_branch_summary`
: リポジトリブランチについて集約したコードカバレッジ要約メトリクスを取得します。それには、総カバレッジ、パッチカバレッジ、サービス/コード所有者の内訳が含まれます。

`get_datadog_code_coverage_commit_summary`
: リポジトリコミットについて集約したコードカバレッジ要約メトリクスを取得します。それには、総カバレッジ、パッチカバレッジ、サービス/コード所有者の内訳が含まれます。

`get_datadog_test_optimization_settings`
: サービスに対して有効になっている Test Optimization 機能を取得します。これには、Test Impact Analysis (ITR)、EFD (Early Flake Detection)、ATR (Auto Test Retries)、Failed Test Replay、Code Coverage コレクション、および PR コメントが含まれます。

`get_datadog_flaky_tests_management_policies`
: リポジトリに設定された不安定なテストの管理ポリシーを取得します。これには、自動隔離ウィンドウ、ブランチルール、失敗率のしきい値、無効化ポリシー、および再試行設定が含まれます。

`search_dora_deployments`
: フィルターを使用して DORA デプロイイベントを検索するか、ID を指定して単一のデプロイの詳細を取得します。集約された傾向 (デプロイ頻度、変更リードタイム、失敗率) を取得するには、代わりに `aggregate_dora_deployments` を使用してください。

`aggregate_dora_deployments`
: DORA メトリクス (デプロイ頻度、変更リードタイム、変更失敗率、修復時間) をスカラー値または時系列として集計します。DORA の完全なサマリーを取得するには、このツールをメトリクスごとに 1 回ずつ、合計 4 回同時に呼び出してください。

`retry_datadog_ci_job`
: GitHub Actions または GitLab 上の失敗した CI ジョブの再試行をキューに入れます。CI の状態を変更する書き込み操作であり、`CiVisibilityWrite` 権限が必要です。サーバー側の制限により、再試行はジョブあたり 7 日間で 2 回までに制限されています。他の CI プロバイダーの場合は、プロバイダーの UI を使用して再実行してください。

`search_datadog_deployment_gates`
: 設定されているデプロイメントゲートをサービスまたは環境別に検索します。評価結果ではなく、ゲート構成を返します。

`get_datadog_deployment_gate`
: ゲート ID を指定して、1 つの構成済みのデプロイメントゲートを取得します (ルールや設定を含む)。

`search_datadog_deployment_gate_evaluations`
: サービス、環境、またはステータス (`in_progress`、`pass`、または `fail`) 別にデプロイメントゲートの評価を検索します。デフォルトでは過去 24 時間を検索し、最大 30 日前まで検索可能です。

`get_datadog_deployment_gate_evaluation`
: 各ルールの結果を含む、デプロイメントゲート評価を取得します。これは、ゲートが失敗した理由を説明するために使用します。

`search_datadog_deployment_gate_rule_evaluations`
: デプロイメントゲート評価全体で個々のルール結果を検索します。結果には、モニターのトリガーや Watchdog のインサイトなど、失敗の証拠が含まれます。サービスで最も頻繁に失敗するルールを見つけるためにこれを使用します。

デプロイメントゲートツールは読み取り専用であり、`DeploymentGatesRead` 権限が必要です。ドライランでのゲートとルールは評価されますが、デプロイをブロックしないため、`fail` ステータスに `dry_run: true` が付加されている場合、デプロイが続行されたことを意味します。

## プロンプト例{#example-prompts}

接続したら、次のようなプロンプトを試してみてください。

- コミット `58b1488` のすべてのパイプラインを表示してください。
- ブランチで `integration-test` ジョブが失敗している原因は何ですか？
- チェックアウトサービスでアクティブな不安定なテストを検出して、失敗率で並べ替えてください。
- 過去 2 週間で失敗したパイプラインは何件ありましたか。
- パイプライン名でグループ化されたパイプライン実行時間の 95 パーセンタイルを表示してください。
- ブランチ `main` の `github.com/my-org/my-repo` におけるコードカバレッジはどのくらいですか？
- コミット `abc123abc123abc123abc123abc123abc123abcd` のカバレッジメトリクスを表示してください。
- 過去 30 日間における `checkout` サービスのデプロイ頻度と変更失敗率を教えてください。
- `auth-service` に対して有効になっている Test Optimization 機能を教えてください。
- リポジトリ `checkout-service` のすべてのアクティブな不安定テストを隔離してください。
- 前回のデプロイメントで、`prod` で `checkout` のデプロイメントゲートが失敗した理由を教えてください。
- `prod` の `checkout` サービスのデプロイメントゲートルールのうち、ドライランで使用されたものはどれですか？
- 過去 7 日間に `payments` サービスでの失敗頻度が最も高かったデプロイメントゲートルールはどれですか？

## セットアップ{#setup}

Software Delivery ツールを使用するには、`software-delivery` ツールセットを有効にして Datadog MCP Server に接続します。[Datadog サイト][5]のエンドポイント URL に `toolsets` クエリパラメーターを追加します。

```text
https://mcp.{{< region-param key="dd_site" >}}/v1/mcp?toolsets=core,software-delivery
```

Cursor、Claude Code、VS Code、その他の AI クライアントのクライアント構成を含む完全なセットアップ手順については、「[Datadog MCP Server を設定する][1]」を参照してください。

## Agent skills {#agent-skills}

Agent skills は、一般的な Software Delivery のワークフローを自動化する、AI コーディングエージェント向けの事前構築済み命令セットです。`dd-software-delivery` スキルセットは、[Datadog agent-skills][6] リポジトリで利用可能です。ライブ CI および Test Optimization データを使用して、不安定なテストのトリアージや失敗した PR パイプラインのブロック解除を行うための 2 つのスキルを提供します。

`software-delivery` MCPツールセットを接続すると、入力したプロンプトとスキルの目的が一致した場合に、AI アシスタントが自動的にそのスキルを読み込みます。たとえば、「TestCheckoutServiceIntegration が CI で失敗し続けているので、調査してください」と入力すると、`/triage-flaky-test` が読み込まれます。何もインストールする必要はありません。

スラッシュコマンドを使用して明示的にスキルを呼び出すには、スキルをローカルにインストールします。

### インストール{#install}

```shell
npx skills add datadog-labs/agent-skills \
  --skill unblock-pr \
  --skill triage-flaky-test \
  --full-depth -y
```

インストール後、スラッシュコマンドが表示されるように Claude Code を再起動します。

各スキルは、接続されている場合は Datadog MCP Server を自動的に使用し、そうでない場合は [pup][7] CLI にフォールバックします。pup フォールバックを使用するには、次のように pup をインストールして認証してください。

```shell
brew install datadog-labs/pack/pup
pup auth login
```

### 利用可能なスキル{#available-skills}

| スキル | 呼び出し方法 | 機能 |
|-------|-------------|-------------|
| 不安定なテストのトリアージ | `/triage-flaky-test` | 特定の不安定なテストの履歴、失敗パターン、AI カテゴリーを取得し、修正、隔離、またはエスカレーションを提案します。|
| PR のブロック解除 | `/unblock-pr` | PR での CI の失敗をそれぞれ flaky (不安定)、infra (インフラ)、または regression (リグレッション) として分類し、コードカバレッジおよび品質やセキュリティの違反を明らかにし、具体的なアクションを提案します。|

### 不安定なテストのトリアージ {#triage-flaky-test}

`/triage-flaky-test` は、特定の不安定なテストを調査します。過去 30 日間の失敗履歴を取得し、主要なエラーメッセージとスタックトレースを抽出して、そのテストが影響を与えたパイプラインの数を確認します。不安定カテゴリーとスタックトレースに基づいて具体的な修正を提案するか、根本原因が不明な場合は隔離を推奨します。修正、隔離、または所有チームへのエスカレーションの推奨を含む、体系的なトリアージ概要を作成します。

スキルが隔離を推奨する場合は、アクションを提案し、作成前にユーザーに明示的な承認を求めます。すべての状態変更は元に戻すことができます。

```
/triage-flaky-test TestCheckoutServiceIntegration
/triage-flaky-test TestCheckoutServiceIntegration github.com/my-org/my-service
```

### PR のブロック解除 {#unblock-pr}

`/unblock-pr` は、失敗した PR CI パイプラインを調査します。失敗した各ジョブについて、その失敗がデフォルトブランチや他のブランチですでに発生していたかどうかを確認します。スキルは、失敗を **flaky**、**infra**、または **regression** に分類します。並行して、PR インサイトから、ブランチのコードカバレッジとコード品質やセキュリティに関する違反を取得します。ジョブごとの分類、証拠、推奨されるアクション、およびカバレッジと違反の要約を示す [PR Health] (PR の健全性) セクションを含む、トリアージの概要を作成します。

不安定な失敗の場合は、スキルはより詳細な調査のために `triage-flaky-test` を組み込みます。GitHub Actions または GitLab での一時的なインフラ障害の場合は、`retry_datadog_ci_job` (MCP) または `gh run rerun` (pup フォールバック、GitHub Actions のみ) を使用して失敗したジョブを再試行します。その他の CI プロバイダーの場合は、プロバイダーの UI へのリンクを提供します。リグレッションの場合は、ユーザーにコードの変更を調査するよう求めるメッセージを表示します。

**注**: [PR Health] セクションのコード品質およびセキュリティの違反データには MCP ツールセットが必要であり、pup モードでは使用できません。

```
/unblock-pr
/unblock-pr feat/add-retry-logic
```

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /ja/continuous_integration/
[4]: /ja/tests/
[5]: /ja/getting_started/site/
[6]: https://github.com/datadog-labs/agent-skills
[7]: https://github.com/DataDog/pup
[8]: /ja/code_coverage/
[9]: /ja/delivery_performance/dora_metrics/
[10]: /ja/deployment_gates/
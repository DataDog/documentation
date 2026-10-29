---
description: Bits Testingを使用すると、AI エージェントがアプリケーションを調べて重要なユーザージャーニーをマッピングし、対応する Synthetic
  テストを生成します。
further_reading:
- link: /synthetics/goal_based_testing/
  tag: ドキュメント
  text: 目標ベースのテスト
- link: /synthetics/browser_tests/
  tag: ドキュメント
  text: ブラウザテスト
- link: /synthetics/api_tests/http_tests
  tag: ドキュメント
  text: HTTP テスト
- link: /synthetics/network_path_tests/
  tag: ドキュメント
  text: Network Path テスト
- link: /synthetics/test_suites/
  tag: ドキュメント
  text: テストスイート
- link: /synthetics/platform/settings/#global-variables
  tag: ドキュメント
  text: グローバル変数
- link: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
  tag: 料金
  text: Synthetic Monitoring の料金
private: true
title: Bits Testing
---
{{< callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
Bits Testing はプレビュー版です。アクセスをリクエストして、承認をお待ちください。
{{< /callout >}}

## 概要 {#overview}

Bits Testing は、アプリケーションを調べて最も重要なユーザージャーニーをマッピングする AI エージェントです。これは、テストカバレッジを高める方法を提案し、カバレッジのギャップを埋めるために必要な Synthetic テストを生成できます。

Bits Testing は[目標ベースのテスト][1]を生成することもできます。この Synthetic テストタイプでは、プロンプトに基づいた非決定論的なエージェント型テストを使用して、ユーザーがアプリケーションで特定の目標を達成できるかどうかをチェックします。

## 前提条件{#prerequisites}

アプリケーションがボット保護や WAF (Web Application Firewall) の背後にある場合は、ご使用のプロバイダーで、[Datadog IP 範囲][2]の `synthetics` に記載されている IP を許可してください。Bits Testing の実行元の場所が 1 つの場合は、その場所の IP 範囲のみを許可することもできます。Bits Testing を実行できる場所については、「[Bits Testing を実行する](#run-bits-testing)」を参照してください。

## Bits Testing にアクセスする {#access-bits-testing}

次のいずれかを使用して、Synthetic Monitoring および Synthetic Testing から Bits Testing を開きます。

- **Bits Testing** (Synthetic Monitoring および Synthetic Testing のトップナビゲーションにあります)。
- `Cmd+K`(macOS の場合) または `Ctrl+K` (Windows の場合) を押し、Bits Testing を検索します。
- **Bits Testing** (サイドナビゲーションメニューの **[Digital Experience] (デジタルエクスペリエンス) > [Synthetic Monitoring & Testing] (Synthetic Monitoring および Synthetic Testing)** を選択します)。

## Bits Testing を実行する {#run-bits-testing}

1. [Bits Testing] ページで、必要なカバレッジを通常の言葉で記述します。たとえば、Bits Testing に対して、カバレッジを全体的に増やすよう依頼したり、特定の機能のみに絞り込むよう依頼します。
1. 探索を実行する場所を選択します。
   - フランクフルト (GCP: `gcp:europe-west3`)
   - 北バージニア (AWS: `aws:us-east-1`)
   - オハイオ (AWS: `aws:us-east-2`)
   - バージニア (Azure: `azure:eastus`)
1. 必要に応じて、[Agent プロファイル](#agent-profiles-optional)を選択します。
1. [{{< ui >}}Start Discovery{{< /ui >}}] (ディスカバリー) をクリックするか、プロファイルが選択されていない場合は [{{< ui >}}Start Discovery Without a Profile{{< /ui >}}] (プロファイルなしでディスカバリーを開始) をクリックします。

{{< img src="synthetics/bits_testing/start_discovery.png" alt="開始 URL、場所、Agent プロファイルのセレクターを備えた Bits Testing 実行構成パネル" style="width:80%;" >}}

### 実行中のディスカバリー {#discovery-in-progress}

Bits Testing は、指定された URL からアプリケーションのディスカバリーを開始します。新しいページが検出されるたびに、試行するアクションを決定し、アプリケーション内を移動しながらこのプロセスを繰り返します。[{{< ui >}}View Discovery Run{{< /ui >}}] (ディスカバリー実行を表示) をクリックして、進行中の実行を確認します。

{{< img src="synthetics/bits_testing/bits_testing_in_progress.png" alt="開始 URL からアプリケーションを調べている、進行中の Bits Testing 実行" style="width:100%;" >}}

## Agent プロファイル (オプション) {#agent-profiles-optional}

Agent プロファイルには、ログイン資格情報など、Bits Testing がアプリケーションと対話する際に使用するコンテキストが保存されています。

Agent プロファイルを作成するには、次のようにします。

1. [{{< ui >}}Agent Profile{{< /ui >}}] (Agent プロファイル) ドロップダウンメニューを開き、[{{< ui >}}\+ New Profile{{< /ui >}}] (+ 新規プロファイル) を選択します。
1. プロファイルの名前を指定します。
1. 1 つ以上の変数を追加します。各変数について、以下を設定します。
   - **用途**: 変数の目的。例: `username` または `password`。
   - **値**: 入力した値、または既存の[グローバル変数][3]。
1. [{{< ui >}}Create Profile{{< /ui >}}] (プロファイルの作成) をクリックします。

新しいプロファイルが現在の実行に対して自動的に選択されます。保存された Agent プロファイルは、変数を再定義することなく、それ以降の Bits Testing の実行で再利用できます。

{{< img src="synthetics/bits_testing/bits_testing_agent_profile_modal.png" alt="Agent プロファイルを作成するための [New Profile] (新しいプロファイル) モーダル。名前、変数の用途、値のフィールドがあります。" style="width:100%;" >}}

## 結果を確認する {#review-results}

実行が完了すると、Bits Testing に探索されたブランチのグラフが表示されます。

- **成功 (緑)** のブランチからは、Bits Testing がテストを生成できる関連性の高いユーザージャーニーが得られました。
- **失敗 (濃い青)** のブランチでは、Bits Testing が関連性または一貫性がないフローであると判断したか、エラーが発生したため、関連性の高いジャーニーが得られませんでした。

実行が正常に完了しなかった場合、グラフには停止の原因となったエラーが表示されます。

{{< img src="synthetics/bits_testing/bits_testing_results_graph.png" alt="探索されたブランチと検出されたジャーニーが示されている、完了した Bits Testing の探索グラフ" style="width:100%;" >}}

## 生成されたテストスイート {#generated-test-suites}

緑色のジャーニーカードをクリックすると、AI によって生成されたそのジャーニーのテストスイートが開きます。テストスイートには以下が含まれます。

- **[ブラウザテスト][6]**: ユーザーがジャーニーを完了するために行う操作を再現し、その過程でアサーションを実行します。
- **[HTTP テスト][7]**: ジャーニーがデータを取得するために呼び出すエンドポイントを検証します。
- **[Network Path テスト][8]**: ジャーニーを支えるホストに到達可能であることを確認します。
- **[目標ベースのテスト][1]**: 非決定論的なAgent型テストを使用してジャーニーを検証します。

スイート内の各テストには、無料のサンプルテスト実行が含まれています。スイートを確認し、以下のいずれかを行います。

- スイートに関連性がない場合は、[{{< ui >}}Ignore{{< /ui >}}] (無視) をクリックし、必要に応じてその理由に関するフィードバックを共有します。
- スイートのテストをアカウントに追加するには、[{{< ui >}}Start Testing{{< /ui >}}] (テストを開始) をクリックします。

スイートのテストを開始すると、各テストは編集や削除が可能な通常の Synthetic テストになります。デフォルトでは、生成されたテストは、Bits Testing を実行するために選択した場所から 5 分間隔で実行されます。

{{< img src="synthetics/bits_testing/bits_testing_generated_suite.png" alt="ブラウザテスト、HTTP テスト、Network Path テスト、および目標ベースのテストがある、生成されたテストスイート。成功した実行の詳細が示されています。" style="width:100%;" >}}

## 請求 {#billing}

プレビュー版の間は、Bits Testing および目標ベースのテストの実行は無料です。Bits Testing の実行から有効にしたテストについては、テスト実行に基づいて、通常の Synthetic テストとして課金されます。「[Synthetic Monitoring の料金][4]」をご覧ください。

## サポートされている場所 {#supported-locations}

Bits Testing および目標ベースのテストは、「[Bits Testing を実行する](#run-bits-testing)」で選択した場所からのみ実行されます。Bits Testing によって生成されたブラウザテスト、HTTP テスト、および Network Path テストには、この制限はありません。作成されたこれらのテストでは、[プライベートロケーション][5]を含め、ほかの Synthetic テストと同じ場所を使用できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/goal_based_testing/
[2]: /ja/api/latest/ip-ranges/list-ip-ranges/
[3]: /ja/synthetics/platform/settings/#global-variables
[4]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
[5]: /ja/synthetics/platform/private_locations/
[6]: /ja/synthetics/browser_tests/
[7]: /ja/synthetics/api_tests/http_tests
[8]: /ja/synthetics/network_path_tests/
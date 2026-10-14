---
aliases:
- /ja/continuous_integration/guides/developer_workflows
- /ja/continuous_integration/guides/pull_request_comments
- /ja/continuous_integration/integrate_tests/developer_workflows
- /ja/continuous_integration/tests/developer_workflows
description: Datadog Test Optimization を他の Datadog 機能と組み合わせて使用し、開発プロセスを加速する方法を学びます。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で GitHub Actions ワークフローを監視する
- link: /integrations/github/
  tag: ドキュメント
  text: GitHub Integration について学ぶ
- link: /integrations/guide/source-code-integration
  tag: ドキュメント
  text: Source Code Integration について学ぶ
- link: /incident_response/work_management
  tag: ドキュメント
  text: Work Management について学ぶ
title: Datadog による開発者ワークフローの強化
---
## 概要 {#overview}

[Test Optimization][5] は、開発者向けの他の Datadog 製品や GitHub などの外部パートナーと統合され、以下のような機能によって開発者のワークフローを効率化します。

- [GitHub プルリクエストのコメントでテストサマリーを有効にする](#test-summaries-in-github-pull-requests)
- [GitHub の Issue を作成して開く](#create-and-open-github-issues) 
- [Work Management を通じて Jira の Issue を作成する](#create-jira-issues)
- [GitHub および IDE でテストを開く](#open-tests-in-github-and-your-ide)

これらの機能はすべての Test Optimization のお客様が利用でき、[Datadog GitHub integration][4] の使用は必須ではありません。

## GitHub プルリクエスト内のテストサマリー {#test-summaries-in-github-pull-requests}

Test Optimization は GitHub と統合され、テスト結果のサマリーをプルリクエストのコメントに直接表示します。各サマリーには、テスト実行の概要、テストの不安定性に関する情報、失敗したテストのエラーメッセージが含まれています。

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub プルリクエストコメントのプレビュー" style="width:100%;">}}

この情報により、開発者はテスト結果に関するフィードバックを即座に得ることができ、プルリクエストのビューを離れることなく、失敗したテストやフレーキーテストをデバッグできます。

<div class="alert alert-info">この統合は、`github.com` でホストされているテストサービスでのみ利用できます。</div>

## テストサマリーを有効にする{#enable-test-summaries}

次の手順で、プルリクエストのテストサマリーを有効にできます。

1. [GitHub integration][4] をインストールします。
   1. [GitHub integration tile][6] の {{< ui >}}Configuration{{< /ui >}} タブに移動し、{{< ui >}}+ Create GitHub App{{< /ui >}} をクリックします。
   1. アプリケーションにプルリクエストの読み取りおよび書き込み権限を付与します。
1. [{{< ui >}}CI/CD Optimization{{< /ui >}} &gt; {{< ui >}}Settings{{< /ui >}} &gt; {{< ui >}}Repositories{{< /ui >}}][3] を開きます。
1. 設定を適用する場所を選択します。
   - {{< ui >}}Organization{{< /ui >}} タブを選択して、すべてのリポジトリでデフォルトで PR Comments を有効にします。
   - {{< ui >}}Repository-specific{{< /ui >}} タブを選択して、単一のリポジトリで PR Comments を有効にします。
1. {{< ui >}}General{{< /ui >}} で、{{< ui >}}PR Comments{{< /ui >}} をオンにします。

{{< img src="ci/enable-settings-github-comments-1.png" alt="CI/CD Settings ページの PR Comments の切り替え。" style="width:100%;">}}

コメントは、有効なリポジトリで少なくとも 1 回テストを実行したプルリクエストにのみ表示されます。

## GitHub の Issue を作成して開く{#create-and-open-github-issues}

Test Optimization を使用すると、テストに関連するコンテキストや Datadog へのディープリンクが含まれた、事前入力済みの GitHub Issue を作成して開くことができ、デバッグワークフローを効率化できます。Test Optimization から直接 Issue を作成することで、テストの失敗やフレーキーテストを追跡し、責任の所在を明確にできます。

### アプリ内のエントリーポイント{#in-app-entry-points}

Test Optimization 内の以下の 3 つの領域から、事前入力済みの GitHub Issue を作成できます。

- [コミット概要ページ ({{< ui >}}Commits{{< /ui >}}テーブルから)](#commit-overview) 
- [ブランチ概要ページ](#branch-overview)
- [テスト詳細サイドパネル](#test-details-view)

#### コミットの概要{#commit-overview}

コミットの概要ページは、特定のブランチから、または特定のテスト内から確認できます。

{{< img src="ci/github_issues_commit_overview_updated.png" alt="Datadog GitHub issues のプレビュー" style="width:100%;">}}

コミットの概要ページから、`Failed Tests` または `New Flaky Tests` テーブルの任意の行をクリックし、{{< ui >}}Open issue in GitHub{{< /ui >}} を選択します。

#### ブランチの概要{#branch-overview}
このページから、{{< ui >}}Flaky Tests{{< /ui >}} テーブルの任意の行をクリックし、{{< ui >}}Open issue in GitHub{{< /ui >}} を選択します。

{{< img src="ci/github_issues_flaky_test_updated.png" alt="Datadog GitHub issues のフレーキーテストテーブルのプレビュー" style="width:100%;">}}

#### テスト詳細ビュー{#test-details-view}
特定のテスト実行内から、{{< ui >}}Actions{{< /ui >}} ボタンをクリックして {{< ui >}}Open issue in GitHub{{< /ui >}} を選択します。

{{< img src="ci/github_issues_detail_light.png" alt="Datadog GitHub issues のテスト詳細ビューのプレビュー" style="width:100%;">}}

テスト詳細を他の場所に貼り付けるために、Markdown 形式で Issue の説明をコピーすることもできます。Markdown 形式の説明には、テスト実行リンク、サービス、ブランチ、コミット、作成者、エラーなどの情報が含まれています。

{{< img src="ci/github_issues_markdown.png" alt="GitHub issues 用に Markdown 形式で Issue の説明をコピーする" style="width:50%;">}}

### GitHub Issue のサンプル {#sample-github-issue}
以下は、事前入力済みの GitHub Issue の例です。
{{< img src="ci/prefilled_github_issue.png" alt="事前入力済みの GitHub Issue" style="width:80%;">}}

## Jira Issue の作成{#create-jira-issues}

[Work Management][8] を使用すると、テストに関連する適切なコンテキストや、デバッグワークフローを効率化するための Datadog へのディープリンクを含む、事前入力済みの Jira Issue を作成して開くことができます。Test Optimization から直接 Issue を作成することで、テストの失敗やフレーキーテストを追跡し、責任の所在を明確にできます。

Jira Issue のステータスを更新すると、Work Management のステータスも更新され、最新の作業項目のステータスが反映されます。

### アプリ内のエントリーポイント{#in-app-entry-points-1}

[Jira integration][7] を設定した後、Test Optimization 内の 3 つの領域から作業項目を作成できます。

- [コミット概要ページ ({{< ui >}}Commits{{< /ui >}}テーブルから)](#commit-overview-1) 
- [フレーキーテストセクション](#branch-overview-1)
- [テスト実行サイドパネル](#test-runs-view)

[Work Management][9] の作業項目から `Shift + J`をクリックして、手動で Jira Issue を作成できます。

### コミットの概要{#commit-overview-1}

コミットの概要ページは、特定のブランチから、または特定のテスト内から確認できます。

コミットの概要ページから、`Failed Tests` または `New Flaky Tests` テーブルの任意の行をクリックし、{{< ui >}}Create work item{{< /ui >}} を選択します。

#### ブランチの概要{#branch-overview-1}
このページから、{{< ui >}}Flaky Tests{{< /ui >}} テーブルの任意の行をクリックし、{{< ui >}}Create work item{{< /ui >}} を選択します。

#### テスト実行ビュー{#test-runs-view}
特定のテスト実行内から、{{< ui >}}Actions{{< /ui >}} ボタンをクリックして{{< ui >}}Create work item{{< /ui >}} を選択します。

Jira integration の設定に関する詳細については、[Work Management ドキュメント][7]を参照してください。

## GitHub および IDE でテストを開く{#open-tests-in-github-and-your-ide}

### アプリ内のエントリーポイント{#in-app-entry-points-2}

Datadog 内で失敗したテストやフレーキーテストを検出した後、そのテストを GitHub または IDE で開いて、すぐに修正できます。

テスト実行の {{< ui >}}Overview{{< /ui >}} タブにある {{< ui >}}Error Message{{< /ui >}} セクションで、{{< ui >}}View Code{{< /ui >}} ボタンをクリックすると、Visual Studio Code、IntelliJ、または GitHub でそのテストに関連するコード行を表示できます。

{{< img src="continuous_integration/error_message_code.png" alt="GitHub または IDE でソースコードを表示するためのクリック可能なボタン付きインラインコードスニペット" style="width:100%;">}}

このドロップダウンのオプションの順序は、テストが記述された言語によって異なります。

- Java ベースのテストでは IntelliJ が優先されます
- JavaScript および Python ベースのテストでは Visual Studio Code が優先されます

### GitHub でソースコードを表示する{#viewing-source-code-in-github}

オプションで、[GitHub インテグレーション][10]を設定して、失敗したテストやフレーキーテストのソースコードを GitHub で開くことができます。

テスト実行の {{< ui >}}Overview{{< /ui >}} タブにある {{< ui >}}Source Code{{< /ui >}} セクションで、{{< ui >}}View on GitHub{{< /ui >}} ボタンをクリックすると、そのテストに関連するコード行を GitHub で表示できます。

{{< img src="continuous_integration/source_code_integration.png" alt="GitHub または IDE でソースコードを表示するためのクリック可能なボタン付きインラインコードスニペット" style="width:100%;">}}

### IDE プラグインのインストール{#installing-ide-plugins}

テストを IDE で表示するには、IDE プラグインおよび拡張機能が必要です。

- VS Code 拡張機能がインストールされていない場合は、{{< ui >}}View in VS Code{{< /ui >}} をクリックして、VS Code で直接拡張機能を開き、インストールしてください。
- IntelliJ プラグインがインストールされていない場合は、{{< ui >}}View in IntelliJ{{< /ui >}} をクリックして、拡張機能のインストールを行ってください。互換性のある Datadog のバージョンは、[プラグインバージョンページ][2]で確認できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[4]: /ja/integrations/github/
[5]: /ja/continuous_integration/tests/
[6]: https://app.datadoghq.com/integrations/github
[7]: /ja/incident_response/work_management/settings/#jira
[8]: /ja/incident_response/work_management/view_and_manage#take-action
[9]: https://app.datadoghq.com/work
[10]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
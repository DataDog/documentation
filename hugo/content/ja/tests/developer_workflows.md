---
aliases:
- /ja/continuous_integration/guides/developer_workflows
- /ja/continuous_integration/guides/pull_request_comments
- /ja/continuous_integration/integrate_tests/developer_workflows
- /ja/continuous_integration/tests/developer_workflows
description: Datadog Test Optimization を、他の Datadog 機能と組み合わせて活用し、開発プロセスを加速する方法を学びましょう。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で GitHub Actions のワークフローを監視する
- link: /integrations/github/
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: /integrations/guide/source-code-integration
  tag: ドキュメント
  text: ソースコードインテグレーションについて
- link: /service_management/case_management
  tag: ドキュメント
  text: Case Management について学ぶ
title: Datadog で開発者のワークフローを強化する
---

## 概要

[Test Optimization][5] は、GitHub などの外部パートナーだけでなく、開発者向けの他の Datadog 製品とも連携し、以下のような機能を通して開発者のワークフローを効率化します。

- [GitHub のプルリクエストコメントでテストサマリーを有効にする](#test-summaries-in-github-pull-requests)
- [GitHub Issues を作成して開く](#create-and-open-github-issues)
- [Case Management を介して Jira の課題を作成する](#create-jira-issues)
- [GitHub や IDE でテストを開く](#open-tests-in-github-and-your-ide)

これらの機能はすべての Test Optimization 利用者が利用でき、[Datadog GitHub 連携][4]を必須とするものではありません。

## GitHub のプルリクエストにおけるテストサマリー

Datadog は GitHub と連携し、テスト結果のサマリーをプルリクエストのコメントに直接表示します。各サマリーにはテスト実行の概要、不安定性の発生状況、失敗したテストのエラーメッセージ、パフォーマンスのリグレッション、コードカバレッジの変更点などが含まれます。

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub プルリクエストコメントのプレビュー" style="width:100%;">}}

この情報により、開発者はテスト結果について即時にフィードバックを得られ、プルリクエストの画面から離れることなく失敗テストや不安定テストのデバッグが可能になります。

<div class="alert alert-info">この連携は、`github.com` 上でホストされているテストサービスにのみ対応しています。</div>

## テストサマリーの有効化

以下の手順で、プルリクエストでテストサマリーを有効にすることができます。

1. [GitHub インテグレーション][4]をインストールします。
   1. [GitHub インテグレーションタイル][6]の **Configuration** タブに移動し、**+ Create GitHub App** をクリックします。
   1. アプリケーションにプルリクエストの読み取り権限と書き込み権限を与えます。
1. [Test Optimization Settings ページ][3]に移動します。
1. テストサマリーを有効にしたいリポジトリを選択します。
1. **GitHub Comments** をトグルでオンにします。

{{< img src="ci/enable-settings-github-comments.png" alt="GitHub コメントが有効化された Test Optimization Settings タブ" style="width:100%;">}}

コメントは、テストが実行される前にオープンされ、かつ有効になっているリポジトリで少なくとも 1 回テストが実行されたプルリクエストでのみ表示されます。

## GitHub の課題を作成し、開く

Test Optimization を使用すると、テストに関連するコンテキスト情報や、より効率的なデバッグワークフローを可能にする Datadog へのディープリンクを含んだプリセット済みの GitHub Issue を作成・オープンできます。Test Optimization から直接 Issue を作成することで、テストの失敗や不安定テストを追跡し、責任範囲を明確に保つのに役立ちます。

### アプリ内エントリーポイント

Test Optimization 内では、以下の 3 つの場所からプリセット済みの GitHub Issue を作成できます。

- [Commit Overview ページ (**Commits** テーブル)](#commit-overview)
- [Branch Overview ページ](#branch-overview)
- [Test Details サイドパネル](#test-details-view)

#### コミット概要

コミットの概要ページは、特定のブランチから、または特定のテスト内から発見することができます。

{{< img src="ci/github_issues_commit_overview_updated.png" alt="Datadog GitHub 課題プレビュー" style="width:100%;">}}

Commit Overview ページでは、`Failed Tests` または `New Flaky Tests` テーブルの任意の行をクリックし、**Open issue in GitHub** を選択します。

#### ブランチ概要
このページでは、**Flaky Tests** テーブルの任意の行をクリックし、**Open issue in GitHub** を選択します。

{{< img src="ci/github_issues_flaky_test_updated.png" alt="Datadog GitHub Issues の不安定テストテーブルプレビュー" style="width:100%;">}}

#### テスト詳細画面
特定のテスト実行画面内で、**Actions** ボタンをクリックし、**Open issue in GitHub** を選択します。

{{< img src="ci/github_issues_detail_light.png" alt="Datadog GitHub Issues のテスト詳細画面プレビュー" style="width:100%;">}}

また、テストの詳細情報を他の場所に貼り付けるための Markdown 形式の Issue 説明をコピーすることもできます。Markdown の説明には、テスト実行リンク、サービス、ブランチ、コミット、作成者、エラーなどの情報が含まれます。

{{< img src="ci/github_issues_markdown.png" alt="GitHub Issues のための Markdown 形式の Issue 説明をコピーする" style="width:50%;">}}

### GitHub のサンプル課題
以下は、あらかじめ内容が入力された GitHub Issue のサンプル例です:
{{< img src="ci/prefilled_github_issue.png" alt="プリセットされた GitHub Issue" style="width:80%;">}}

## Jira の課題を作成する

[Case Management][8] を利用すると、テストに関する重要なコンテキストや、より効率的なデバッグを行うための Datadog へのディープリンクを含む、あらかじめ内容が入力された Jira 課題を作成・オープンできます。Test Optimization から直接課題を作成することで、テストの失敗や不安定テストを追跡し、責任の所在を明確にするのに役立ちます。

Jira の課題ステータスを更新すると、Case Management 上のステータスも更新され、常に最新のケース状況が反映されます。

### アプリ内エントリーポイント

[セットアップした Jira 連携][7]が完了した後、Test Optimization 内の 3つの場所からケースを作成できます:

- [Commit Overview ページ (**Commits** テーブル)](#commit-overview-1)
- [Flaky Tests セクション](#branch-overview-1)
- [Test Runs サイドパネル](#test-runs-view)

また、[Case Management][9] から `Shift + J` を押して、手動で Jira 課題を作成することも可能です。

### コミット概要

コミットの概要ページは、特定のブランチから、または特定のテスト内から発見することができます。

{{< img src="continuous_integration/case_failed_test.png" alt="Commit Overview ページで Case Management の課題を作成する" style="width:100%;">}}

Commit Overview ページでは、`Failed Tests` または `New Flaky Tests` テーブルの任意の行をクリックし、**Create case** を選択します。

#### ブランチ概要
このページでは、**Flaky Tests** テーブルの任意の行をクリックし、**Create case** を選択します。

{{< img src="continuous_integration/case_flaky_test.png" alt="Flaky Tests リストで Case Management の課題を作成する" style="width:100%;">}}

#### テスト実行画
特定のテスト実行画面内で、**Actions** ボタンをクリックし、**Create case** を選択します。

{{< img src="continuous_integration/case_test_runs.png" alt="Test Runs サイドパネルで Case Management の課題を作成する" style="width:100%;">}}

Jira 連携の設定についての詳細は、[Case Management のドキュメント][7]を参照してください。

## GitHub と IDE でテストを開く

### アプリ内エントリーポイント

Datadog でテストが失敗した、あるいは不安定になったことを検出すると、そのテストを GitHub や IDE で開いてすぐに修正するオプションがあります。

テスト実行の **Overview** タブにある **Error Message** セクションで **View Code** ボタンをクリックすると、Visual Studio Code、IntelliJ、または GitHub でそのテストの関連コード行を表示できます。

{{< img src="continuous_integration/error_message_code.png" alt="GitHub または IDE でソースコードを表示するためのボタンがついたインラインコードスニペット" style="width:100%;">}}

ドロップダウンのオプション順序は、テストが書かれた言語によって変わります:

- Java ベースのテストでは IntelliJ が優先される
- JavaScript や Python ベースのテストでは Visual Studio Code が優先される

### GitHub でソースコードを表示する

オプションとして、[GitHub 連携][10]を設定し、失敗または不安定テストのソースコードを GitHub で開くこともできます。

テスト実行の **Overview** タブにある **Source Code** セクションで **View on GitHub** ボタンをクリックすると、そのテストの関連コード行を GitHub で表示できます。

{{< img src="continuous_integration/source_code_integration.png" alt="GitHub または IDE でソースコードを表示するためのボタンがついたインラインコードスニペット" style="width:100%;">}}

### IDE プラグインのインストール

IDE でテストを閲覧するには、IDE プラグインまたは拡張機能が必要です。

- VS Code 拡張機能がインストールされていない場合は、**View in VS Code** をクリックすると VS Code 内で直接拡張機能のインストール画面が開きます。
- IntelliJ プラグインがインストールされていない場合は、**View in IntelliJ** をクリックすると拡張機能のインストールが可能です。互換性のある Datadog のバージョンは [Plugin Versions ページ][2]に記載されています。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/test-optimization
[4]: /ja/integrations/github/
[5]: /ja/continuous_integration/tests/
[6]: https://app.datadoghq.com/integrations/github
[7]: /ja/service_management/case_management/settings/#jira
[8]: /ja/service_management/case_management/view_and_manage#take-action
[9]: https://app.datadoghq.com/cases
[10]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[11]: https://app.datadoghq.com/ci/test-repositories
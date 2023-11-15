---
aliases:
- /ja/continuous_integration/guides/developer_workflows
- /ja/continuous_integration/guides/pull_request_comments
- /ja/continuous_integration/integrate_tests/developer_workflows
description: Datadog CI Visibility やその他の機能を使って、開発プロセスを加速させる方法をご紹介します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で GitHub Actions のワークフローを監視する
- link: /integrations/guide/source-code-integration
  tag: ドキュメント
  text: ソースコードインテグレーションについて
kind: ドキュメント
title: Datadog で開発者のワークフローを強化する
---

## 概要

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

[CI Test Visibility][5] は、他の開発者向け Datadog 製品や GitHub などの外部パートナーとインテグレーションし、開発者のワークフローを効率化します。以下の機能が含まれています。

- [GitHub イシューを作成し、開く](#create-and-open-github-issues) 
- [GitHub と IDE でテストを開く](#open-tests-in-github-and-your-ide)
- [GitHub のプルリクエストコメントでテストサマリーを有効にする](#test-summaries-in-github-pull-requests)

これらの機能は、Test Visibility を利用しているすべてのユーザーが利用可能で、[Datadog GitHub インテグレーション][4]を利用する必要はありません。

## GitHub イシューを作成し、開く

Test Visibility を使用すると、テストに関連するコンテキストや Datadog へのディープリンクを含む GitHub イシューを作成して開くことができ、デバッグ作業をより効率的に行えます。Test Visibility から直接イシューを作成することで、テストの失敗や不安定なテストの追跡と説明責任を維持することができます。

### アプリ内エントリポイント

Test Visibility 内の 3 つのエリアから、事前に入力された GitHub イシューを作成できます。

- [Commit Overview ページ (**Commits** テーブルから)](#commit-overview) 
- [Branch Overview ページ](#branch-overview)
- [Test Details サイドパネル](#test-details-view)

#### コミットの概要

コミットの概要ページは、特定のブランチやテストからアクセスできます。

{{< img src="ci/github_issues_commit_overview_updated.png" alt="Datadog の GitHub イシューのプレビュー" style="width:100%;">}}

Commit Overview ページから、`Failed Tests` または `New Flaky Tests` テーブルの任意の行をクリックし、**Open issue in GitHub** を選択します。

#### ブランチの概要
このページから、**Flaky Tests** テーブルの任意の行をクリックし、**Open issue in GitHub** を選択します。

{{< img src="ci/github_issues_flaky_test_updated.png" alt="Datadog の GitHub イシューの不安定なテストテーブルのプレビュー" style="width:100%;">}}

#### テストの詳細表示
特定のテスト実行から、**Actions** ボタンをクリックし、**Open issue in GitHub** を選択します。

{{< img src="ci/github_issues_detail_light.png" alt="Datadog の GitHub イシューのテスト詳細ビューのプレビュー" style="width:100%;">}}

また、イシューの説明を Markdown にコピーして、テストの詳細を別の場所に貼り付けることもできます。Markdown 説明文には、テストの実行リンク、サービス、ブランチ、コミット、作成者、エラーなどの情報が含まれます。 

{{< img src="ci/github_issues_markdown.png" alt="GitHub イシューの Markdown 形式でのイシュー説明のコピー" style="width:50%;">}}

### GitHub イシューのサンプル
以下は、事前入力された GitHub イシューの例です。
{{< img src="ci/prefilled_github_issue.png" alt="GitHub イシューの事前入力" style="width:80%;">}}

## GitHub と IDE でテストを開く
### アプリ内エントリポイント
Datadog 内でテストの失敗や不安定を検出したら、そのテストを GitHub や IDE で開いてすぐに修正することができます。

テスト実行の **Overview** タブの **Error Message** セクションで、**View Code** ボタンをクリックすると、Visual Studio Code、IntelliJ、または GitHub でそのテストに関連するコード行を表示できます。

{{< img src="ci/IDE.png" alt="IDE でテストを開く" style="width:50%;">}}

このドロップダウンのオプションの並び順は、テストが記述された言語によって変わります。

- IntelliJ は Java ベースのテストで優先されます
- Visual Studio Code は、JavaScript および Python ベースのテストで優先されます

### IDE プラグインのインストール
IDE でテストを表示するには、IDE プラグインと拡張機能が必要です。
- VS Code 拡張機能がインストールされていない場合は、**View in VS Code** をクリックして、VS Code で直接拡張機能を開き、インストールします。
- IntelliJ プラグインがインストールされていない場合は、 **View in IntelliJ** をクリックして、拡張機能をインストールします。互換性のある Datadog のバージョンは [Plugin Versions ページ][2]で確認できます。

## GitHub プルリクエストのテストサマリー

Datadog は GitHub とインテグレーションしており、プルリクエストに直接テスト結果のサマリーを表示することができます。このサマリーには、テストの実行概要、不安定性の情報、プルリクエストコメント内の失敗したテストのエラーメッセージが含まれます。

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub プルリクエストコメントプレビュー" style="width:100%;">}}

このレポートにより、開発者はプルリクエストのビューから離れずに、テストの結果について即座にフィードバックを受け、失敗や不安定なテストをデバッグできます。

<div class="alert alert-info">このインテグレーションは `github.com` でホストされているテストサービスでのみ利用可能です。</div>

### テストサマリーの有効化

以下の手順で、プルリクエストでテストサマリーを有効にすることができます。

1. [GitHub インテグレーション][4]をインストールします。
   1. [GitHub インテグレーションタイル][6]の **Configuration** タブに移動し、**+ Create GitHub App** をクリックします。
   2. アプリケーションにプルリクエストの読み取り権限と書き込み権限を与えます。
2. 1 つまたは複数のテストサービスに対して、テストサマリーを有効にします。[テストサービス設定ページ][3]またはコミット/ブランチページから行うことができます。

### テストサービス設定ページ

1.  [Test Service Settings ページ][3]に移動し、リポジトリまたはテストサービスを検索します。
2. 希望するサービスの **GitHub Comments** 列にあるトグルをクリックします。

{{< img src="ci/enable-settings-github-comments.png" alt="Datadog の Test Service Settings タブで GitHub のコメントを有効にしたテストサービス" style="width:100%;">}}

### コミットまたはブランチページ

1. GitHub コメントを有効にしたいテストサービスのコミットまたはブランチページに移動します。
2. **Settings** アイコンをクリックし、**View Test Service Settings** をクリックします。
3. 新しいプルリクエストにコメントが表示されるように、**Enable GitHub Comments** を選択します。この変更には数分かかる場合があります。

{{< img src="ci/enable-github-comments.png" alt="GitHub コメントのドロップダウンを有効にする" style="width:100%;">}}

コメントは、テスト実行前に開かれ、かつ有効なテストサービスに対して少なくとも 1 回のテストを実行したプルリクエストにのみ表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: /ja/integrations/github/
[5]: /ja/continuous_integration/tests/
[6]: https://app.datadoghq.com/integrations/github
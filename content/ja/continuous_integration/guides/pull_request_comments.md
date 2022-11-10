---
kind: ガイド
title: GitHub のプルリクエストコメントでテストサマリーを有効にする
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

Datadog は GitHub とインテグレーションし、テスト結果のサマリーや失敗したテストのエラーメッセージをプルリクエストのコメントで表示します。

### 互換性
このインテグレーションは `github.com` にホストされているテストサービスでのみ利用可能です。また、`pull_request` トリガーで動作するワークフローでは利用できません。

{{< img src="ci/pr-comment-preview.png" alt="Datadog GitHub プルリクエストコメントプレビュー" style="width:100%;">}}

### 有効化
GitHub コメントインテグレーションを有効にするには

1. [GitHub アプリのインテグレーションタイル][1]に移動し、[Datadog GitHub アプリ][2]をインストールします。
2. アプリケーションにプルリクエストの読み取り権限と書き込み権限を与えます。

UI では、設定ページ、コミットやブランチのページから行うことができます。

#### CI 設定ページ

1. [CI テストサービス設定ページ][3]を開き、リポジトリやテストサービスを検索します。
2. 目的のサービスの `GitHub Comments` 列をトグルします。

{{< img src="ci/enable-settings-github-comments.png" alt="Datadog の Test Service Settings タブで GitHub のコメントを有効にしたテストサービス" style="width:100%;">}}

#### コミットまたはブランチページ

1. GitHub コメントを有効にしたいテストサービスのコミットまたはブランチページに移動します。
2. 右上の設定アイコンをクリックします。
3. `Enable GitHub Comments` を選択すると、新しいプルリクエストにコメントが表示されるようになります。この変更には数分かかることに注意しましょう。

{{< img src="ci/enable-github-comments.png" alt="GitHub コメントのドロップダウンを有効にする" style="width:100%;">}}

コメントは、テスト実行前に開かれたプルリクエストで、有効なテストサービスに対して少なくとも 1 回のテストを実行したものにのみ表示されます。

[1]: https://app.datadoghq.com/integrations/github-apps
[2]: /ja/integrations/github_apps/
[3]: https://app.datadoghq.com/ci/settings/test-service
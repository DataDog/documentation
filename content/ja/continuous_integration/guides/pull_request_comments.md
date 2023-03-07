---
description: GitHub と CI Visibility のインテグレーションの使い方をご紹介します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: GitHub
  text: Datadog CI Visibility で GitHub Actions のワークフローを監視する
- link: /integrations/guide/source-code-integration
  tag: ドキュメント
  text: GitHub インテグレーションについて
kind: ガイド
title: GitHub のプルリクエストコメントでテストサマリーを有効にする
---

## 概要

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、現時点では CI Visibility は使用できません。</div>
{{< /site-region >}}

Datadog は GitHub とインテグレーションし、テスト結果のサマリーや失敗したテストのエラーメッセージをプルリクエストコメントに表示することができます。

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub プルリクエストコメントプレビュー" style="width:100%;">}}

### 互換性

このインテグレーションは、`github.com` にホストされているテストサービスでのみ利用可能です。

## GitHub インテグレーションをインストールする

<div class="alert alert-info"><code>pull_request*</code> イベントでトリガーされた場合、GitHub Actions ではインテグレーションを利用することはできません。 </div>

[GitHub インテグレーション][1]をインストールするには

1. [GitHub インテグレーションタイル][2]の ** Configuration** タブに移動し、**+ Create GitHub App** をクリックします。
2. アプリケーションにプルリクエストの読み取り権限と書き込み権限を与えます。

## プルリクエストコメントを有効にする

GitHub コメントを有効にするには、Test Service Settings ページまたは commit や branch ページから行います。

### Test Service Settings ページ

1. [Test Service Settings ページ][3]を開き、リポジトリやテストサービスを検索します。
2. 希望するサービスの **GitHub Comments** 列の下にあるトグルをクリックします。

{{< img src="ci/enable-settings-github-comments.png" alt="Datadog の Test Service Settings タブで GitHub のコメントを有効にしたテストサービス" style="width:100%;">}}

### コミットまたはブランチページ

1. GitHub コメントを有効にしたいテストサービスのコミットまたはブランチページに移動します。
2. 設定アイコンをクリックし、**View Test Service Settings** をクリックします。
3. 新しいプルリクエストにコメントが表示されるように、**Enable GitHub Comments** を選択します。この変更には数分かかる場合があります。

{{< img src="ci/enable-github-comments.png" alt="GitHub コメントのドロップダウンを有効にする" style="width:100%;">}}

コメントは、テスト実行前に開かれたプルリクエストで、有効なテストサービスに対して少なくとも 1 回のテストを実行したものにのみ表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/github/
[2]: https://app.datadoghq.com/integrations/github
[3]: https://app.datadoghq.com/ci/settings/test-service
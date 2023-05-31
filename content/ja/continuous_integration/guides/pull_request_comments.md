---
description: GitHub プルリクエストでテスト結果のサマリーを自動生成する方法についてご紹介します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: GitHub
  text: Datadog CI Visibility で GitHub Actions のワークフローを監視する
- link: /integrations/guide/source-code-integration
  tag: ドキュメント
  text: GitHub インテグレーションについて
kind: ガイド
title: GitHub のプルリクエストでテストサマリーを有効にする
---

## 概要

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

Test Visibility 製品を使用している場合、Datadog は GitHub とインテグレーションして、プルリクエストにテスト結果のサマリーを直接表示することができます。サマリーには、テスト実行の概要、不安定性情報、失敗したテストのエラーメッセージが含まれています。このレポートにより、開発者はプルリクエストのビューを離れることなく、失敗したテストや不安定なテストをデバッグする機能など、テスト結果に関するフィードバックをすぐに得ることができます。

{{< img src="ci/github_comments_light.png" alt="Datadog GitHub プルリクエストコメントプレビュー" style="width:100%;">}}

### 互換性

このインテグレーションは、`github.com` にホストされているテストサービスでのみ利用可能です。

## テストサマリーの有効化

以下の手順で、プルリクエストでテストサマリーを有効にすることができます。

1. [GitHub インテグレーション][1]をインストールします。
   1. [GitHub インテグレーションタイル][2]の ** Configuration** タブに移動し、**+ Create GitHub App** をクリックします。
   2. アプリケーションにプルリクエストの読み取り権限と書き込み権限を与えます。
2. 1 つまたは複数のテストサービスに対して、テストサマリーを有効にします。[テストサービス設定ページ][3]またはコミット/ブランチページから行うことができます。

### テストサービス設定ページ

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
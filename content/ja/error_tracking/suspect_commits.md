---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking-and-github/
  tag: ブログ
  text: Troubleshoot root causes with GitHub commit and ownership data in Error Tracking
title: 疑わしいコミット
---
## 概要

Error Tracking は疑わしいコミットを特定してエラーの根本原因を突き止め、解決までの時間を短縮します。この機能は[セットアップ要件](#setup)を満たすとイシューで自動的に有効になります。

{{< img src="logs/error_tracking/suspect_commit.png" alt="Datadog UI に表示された疑わしいコミット" style="width:100%" >}}

疑わしいコミットが特定されると、次の画像でハイライトされているようにイシュー パネルに表示されます。

{{< img src="logs/error_tracking/suspect_commit_in_context.png" alt="イシュー パネル内で表示される疑わしいコミット" style="width:90%" >}}

疑わしいコミットを GitHub で確認するには、**View Commit** ボタンをクリックします。

### 疑わしいコミットの判定基準
コミットは次の条件を満たすと疑わしいコミットとなります。
- スタックトレースのいずれかの行を変更している
- 最初のエラー発生前に作成されている
- 最初のエラー発生前 90 日以内に作成されている
- 上記すべての条件を満たす最新のコミットである

疑わしいコミットをイシューに表示するには、候補となるコミットが少なくとも 1 件検出されている必要があります。

## セットアップ

セットアップ要件を満たすと、利用可能なイシューに疑わしいコミットが自動的に表示されます。セットアップ要件を満たす前に行われたコミットは表示されません。

### ソースコード統合を有効化

疑わしいコミット機能には [Source Code Integration][1] が必要です。有効化するには、

1. Datadog の [**Integrations** ページ][3] で **Link Source Code** を選択します。
2. 手順に従って、コミットをテレメトリーに関連付け、GitHub リポジトリを構成します。

### GitHub インテグレーションをインストール
[GitHub インテグレーション][2]をインストールし、プルリクエストとコンテンツの読み取り権限を付与します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/guide/source-code-integration
[2]: /ja/integrations/github/
[3]: https://app.datadoghq.com/integrations
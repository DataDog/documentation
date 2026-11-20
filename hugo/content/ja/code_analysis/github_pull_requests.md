---
aliases:
- /ja/static_analysis/github_pull_requests
description: GitHub プル リクエストで Code Analysis を使用する方法を学びましょう。
further_reading:
- link: /integrations/github/
  tag: ドキュメント
  text: GitHub インテグレーションについて学びましょう
- link: /code_analysis/
  tag: ドキュメント
  text: Code Analysis について学びましょう
title: GitHub プル リクエスト
---

## 概要

Code Analysis は GitHub プル リクエストと 2 つの方法で連携します:
- [違反をフラグ付けするプル リクエスト コメント](#enable-code-analysis-pr-comments-for-your-repositories): GitHub でコード レビューを行う際、Datadog は少なくとも 1 つのルール セットが適用されているリポジトリのプル リクエストに対し、静的解析 (SAST) の違反を自動で検出し、該当するコード行にインライン レビュー コメントとしてフラグ付けします。また、該当する場合はプル リクエスト内で直接適用できる修正案も提示されます。これは静的解析 (SAST) のみで利用可能です。
{{< img src="ci/static-analysis-pr-comment-example.png" alt="プル リクエストにおける Code Analysis コメントの例" style="width:90%;" >}}

- [Datadog から直接問題を修正するプル リクエストを作成](#fixing-a-vulnerability-directly-from-datadog): Datadog が提案するコード修正に基づき、UI からセキュリティ脆弱性またはコード品質の問題を修正するプル リクエストを作成できます。これも静的解析 (SAST) のみで利用可能です。
{{< img src="ci/sast_one_click_light.png" alt="Code Analysis のワン クリック修正例" style="width:90%;" >}}

これらの機能を有効化するには、対象リポジトリに GitHub の必要な権限 (Read & Write) が付与されていることを確認してください。

## GitHub プル リクエストで Code Analysis をセットアップする

### Datadog Code Analysis を有効化する

Datadog Code Analysis を使用するには、[セットアップ手順][1] に従って適切な構成ファイルをリポジトリに追加してください。

### GitHub App を設定する

GitHub で Code Analysis を使用するには、次のいずれかを行ってください。

- Datadog で GitHub App を新規作成します。
- すでに Datadog で作成済みの GitHub App を更新します。

付与した権限によって、設定できる [GitHub インテグレーション][2] 機能が決まります。

#### GitHub App を作成してインストールする

1. Datadog で **[Integrations > GitHub Applications > Add New GitHub Application][3]** に移動します。
1. GitHub 組織名など、必要な情報を入力します。
1. **Select Features** で **Code Analysis: Pull Request Review Comments** ボックスをチェックします。
1. **Edit Permissions** で **Pull Requests** 権限が **Read & Write** になっていることを確認します。
1. **Create App in GitHub** をクリックします。
1. アプリ名を入力し、送信します。
1. **Install GitHub App** をクリックします。
1. アプリをインストールするリポジトリを選択し、**Install & Authorize** をクリックします。

{{< img src="ci/static-analysis-install-github-app.png" alt="GitHub App インストール画面" style="width:50%;" >}}

#### 既存の GitHub App を更新する

1. Datadog で **[Integrations > GitHub Applications][5]** に移動し、Code Analysis に使用する GitHub App を検索します。
{{< img src="ci/static-analysis-existing-github-app.png" alt="プル リクエストでの Static Analysis コメントの例" style="width:90%;" >}}
1. **Features** タブの **Code Analysis: Pull Request Comments** セクションを確認し、追加の権限が必要かどうかを判断します。必要であれば **Update permissions in GitHub** をクリックしてアプリ設定を編集します。
1. **Repository permissions** で **Pull Requests** アクセスを **Read & Write** に設定します。
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="Pull Request Read & Write 権限のドロップ ダウン" style="width:90%;" >}}
1. **Subscribe to events** の下で **Pull request** ボックスをチェックします。
{{< img src="ci/static-analysis-pr-review-comment.png" alt="Pull Request Review Comment 権限のチェック ボックス" style="width:90%;" >}}

### Code Analysis の PR コメントをリポジトリで有効化する

1. Datadog で **[CI Settings > Code Analysis Settings][4]** に移動します。
1. 対象リポジトリ名の横にあるトグル スイッチをクリックし、**GitHub Comments** を有効化します。下の例では `demo-static-analysis-gates` リポジトリでコメントが有効化されています。

{{< img src="ci/static-analysis-github-comments.png" alt="Code Analysis のプル リクエスト コメントの例" style="width:100%;" >}}

**注:** スキャンの実行に [GitHub Actions][6] を使用している場合、`push` トリガーでアクションを起動しないとコメントは表示されません。

### Datadog から直接脆弱性を修正する

GitHub App の **Pull Requests** 権限が **Read & Write** に設定されている場合、推奨修正が用意されているすべての静的解析結果でワン クリック修正が利用できます。

脆弱性を修正してプル リクエストを開く手順
1. Code Analysis で対象の結果を表示します。
2. サイド パネルで **Fix Violation** をクリックします。
3. **Open a Pull Request** を選択します。
4. プル リクエストのタイトルとコミット メッセージを入力します。
5. **Create PR** をクリックします。

結果が検出されたブランチに直接コミットして修正することも可能です。

推奨修正をコミットする手順

1. Code Analysis で対象の結果を表示します。
2. サイド パネルで **Fix Violation** をクリックします。
3. **Commit to current branch** をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/code_analysis#setup
[2]: /ja/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/ci/settings/static-analysis
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /ja/code_analysis/static_analysis/github_actions/
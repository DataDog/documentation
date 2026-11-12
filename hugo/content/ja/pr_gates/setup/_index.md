---
aliases:
- /ja/quality_gates/setup/
description: Datadog で PR ゲートルールをセットアップする方法を説明します。
further_reading:
- link: /pr_gates
  tag: ドキュメント
  text: PR ゲートについて
title: PR ゲートルールのセットアップ
---
## 概要{#overview}

Datadog PR ゲートを使用するには、[[{{< ui >}}PR Gate Rules{{< /ui >}}][1]] (PR ゲートルール) ページで 1 つ以上のルールを定義します。

{{< img src="pr_gates/rules_list_3.png" alt="Datadog の [PR Gates] (PR ゲート) ページ" style="width:100%" >}}

PR ゲートは、セキュリティおよび品質基準を満たすコード変更のみがマージされるようにします。

## ルールの作成 {#create-a-rule}

Datadog で PR ゲートルールを作成するには:

1. [[{{< ui >}}Software Delivery{{< /ui >}}] (ソフトウェアデリバリー) > [{{< ui >}}PR Gates{{< /ui >}}] (PR ゲート) > [{{< ui >}}PR Gate Rules{{< /ui >}}] (PR ゲートルール)][1] に移動し、[{{< ui >}}New Rule{{< /ui >}}] (ルールの新規作成) をクリックします。

1. [{{< ui >}}Select your source{{< /ui >}}] (ルールタイプを選択) でルールタイプを選択します:
   - {{< ui >}}Static Code Analysis (SAST){{< /ui >}}
   - {{< ui >}}Software Composition Analysis (SCA){{< /ui >}}
   - {{< ui >}}Code Coverage{{< /ui >}}
   - {{< ui >}}Infrastructure as Code Scanning (IaC){{< /ui >}}
   - {{< ui >}}Secret Scanning{{< /ui >}}
   - {{< ui >}}New Flaky Tests{{< /ui >}}

1. [{{< ui >}}Define scope{{< /ui >}}] (スコープを定義) で、ルールが評価するリポジトリを設定します。
   - [{{< ui >}}All repositories{{< /ui >}}] (すべてのリポジトリ): ルールは、そのルールタイプに対して構成されたすべてのリポジトリを評価します。
   - [{{< ui >}}Selected repositories{{< /ui >}}] (選択されているリポジトリ): ルールは、指定されたリポジトリのみを評価します。指定したリポジトリのみを含めるには `IN` を使用し、指定したリポジトリ_以外_のすべての構成済みリポジトリを評価するには `NOT IN` を使用します。

1. [{{< ui >}}Define condition{{< /ui >}}] (条件の定義) で、ルールが失敗する条件を設定します。各ルールタイプには独自の条件オプションがあります。ルールタイプを選択するときに、既存のデフォルト条件設定を使用できます。

   次の例は、プルリクエストで重大度が `Critical` 以上の Static Code Analysis (SAST) コード脆弱性違反が 1 件以上発生した場合に失敗する Static Code Analysis ルールを示しています。このルールは、Static Code Analysis 用に構成されているすべてのリポジトリを評価します。

   {{< img src="pr_gates/setup/static_analysis_4.png" alt="すべてのリポジトリで実行され、重大度が `Critical` 以上の Static Code Analysis コード脆弱性が 1 件以上含まれている場合に失敗する Static Code Analysis ルール" style="width:100%" >}}

1. [{{< ui >}}Preview checks{{< /ui >}}] (プレビューチェック) で、プルリクエストに追加されたステータスチェックをプレビューするためのソースコード管理プロバイダーを選択します。ルールが失敗したときに PR をブロックするには、プロバイダーの指示に従って、マージ前に PR ゲートが合格することを必須にします。GitHub、Azure DevOps、および Bitbucket Cloud では、このために PR ゲートのチェックを必須に設定します。GitLab では、このために GitLab Source Code インテグレーションのインストール時に作成した Datadog サービスアカウントを必須の承認者として設定します。

   - [GitHub][2]
   - [GitLab][9]
   - [Azure DevOps][3]
   - [Bitbucket Cloud][10]

   非ブロッキングルールは、新しいルールを導入する際に、そのルールをブロッキングルールにする前に動作を確認したい場合に役立ちます。

1. [{{< ui >}}Create Rule{{< /ui >}}] (ルールを作成) をクリックします。

1. PR ゲートルールの条件に違反するようなコード変更を意図的に導入した新しいブランチと PR を作成して、PR ゲートをテストすることをお勧めします。PR ゲートは以下の操作を行わないことに注意してください。
   - PR ゲートルールの作成後に新しいコミットがプッシュされない限り、既存の PR を遡及的にブロックする
   - 変更された行の一部として違反を導入しない新しい PR をブロックする

### PR チェックの管理 {#manage-pr-checks}

PR ゲートは、評価されたルールタイプごとに、[GitHub][4]、[GitLab][11]、[Azure DevOps][5]、または [Bitbucket Cloud][12] のプルリクエスト (GitLab ではマージリクエスト) に PR チェックを自動的に作成します。このチェックには、失敗の理由や Datadog 内の一致イベントなど、ルール評価に関する詳細情報が含まれています。GitLab では、PR ゲートは Datadog サービスアカウントを使用して、すべての PR ゲートルールの条件が満たされたときにマージリクエストを承認します。このサービスアカウントは、GitLab Source Code インテグレーションをインストールした際に作成したものと同じです。

<div class="alert alert-info"><strong>注</strong>: プルリクエスト UI でチェックを再実行しても、対応するPR ゲートルールは再実行されません。</div>

PR ゲートが PR チェックを作成できるようにするには、SCM プロバイダー用のインテグレーションをインストールする必要があります。このインテグレーションがインストールされていない場合は、[GitHub][6]、[GitLab Source Code][13]、[Azure DevOps Source Code][7]、または [Bitbucket Cloud Source Code][14] のインテグレーションドキュメントに従ってセットアップしてください。

### PR チェックをブロックキングとして構成する {#configure-pr-checks-to-be-blocking}

<div class="alert alert-info">
Bitbucket Cloud では、チェックをブロッキングとして構成できるのは、<strong>Bitbucket Cloud Premium</strong> を使用している場合のみです。
</div>

これらのチェックをブロックキングとして構成するには、ソースコード管理プロバイダーのブランチポリシーでこれらのチェックを必須として設定する必要があります (GitLab の場合は、サービスアカウントを MR の必須承認者として設定する必要があります)。

- [GitHub][2]
- [GitLab][9]
- [Azure DevOps][3]
- [Bitbucket Cloud][10]

## ルールの管理 {#manage-rules}

PR ゲートルールを編集または削除するには、[{{< ui >}}PR Gates Rules{{< /ui >}}][1] (PR ゲートルール) リスト上で対象のルールにカーソルを合わせ、[{{< ui >}}Edit{{< /ui >}}] (編集) または [{{< ui >}}Delete{{< /ui >}}] (削除) アイコンをクリックします。

{{< img src="pr_gates/setup/delete_3.png" alt="PR ゲートルールの編集、複製、または削除" style="width:100%;">}}

## 権限 {#permissions}

PR ゲートルールを作成および編集できるのは、`quality_gate_rules_write` 権限を持つユーザーのみです。`quality_gate_rules_read` 権限を持つユーザーは、PR ゲートルールを表示できます。

詳細は [RBAC 権限ドキュメント][8]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pr-gates
[2]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
[3]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pr-status-policy?view=azure-devops
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks
[5]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops
[6]: /ja/integrations/github/
[7]: /ja/integrations/azure-devops-source-code/
[8]: /ja/account_management/rbac/permissions
[9]: https://docs.gitlab.com/user/project/merge_requests/approvals/rules/
[10]: https://support.atlassian.com/bitbucket-cloud/docs/suggest-or-require-checks-before-a-merge/
[11]: https://docs.gitlab.com/ci/ci_cd_for_external_repos/external_commit_statuses/
[12]: https://support.atlassian.com/bitbucket-cloud/docs/check-build-status-in-a-pull-request/
[13]: /ja/integrations/gitlab-source-code/
[14]: /ja/integrations/bitbucket-source-code/
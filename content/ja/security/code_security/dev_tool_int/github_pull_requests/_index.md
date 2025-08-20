---
aliases:
- /ja/static_analysis/github_pull_requests
- /ja/code_analysis/github_pull_requests/
description: GitHub のプルリクエストで Code Security を使用する方法を学びます。
title: GitHub プルリクエスト
---

## 概要

Code Security は、GitHub のプルリクエストと 2 つの方法で連携します:
- [違反を示すプルリクエストコメント](#enable-code-security-pr-comments-for-your-repositories)
{{< img src="ci/static-analysis-pr-comment-example.png" alt="プルリクエスト上の Code Security コメントの例" style="width:90%;" >}}
- [Datadog から直接イシューを修正するためのプルリクエストを作成](#fixing-a-vulnerability-directly-from-datadog): Datadog が提案するコード修正を元に、セキュリティ脆弱性やコード品質の問題を修正するプルリクエストを UI から作成できます。これは静的コード解析 (SAST) のみで利用できます。
{{< img src="ci/sast_one_click_light.png" alt="Code Security におけるワンクリック修正の例" style="width:90%;" >}}

これらの機能を有効にするには、リポジトリに必要な GitHub の権限 (Read & Write) があることを確認してください。

## GitHub プルリクエスト用に Code Security を設定する

### Datadog Code Security を有効化する

Code Security をアプリ内で有効にするには、[**Code Security** ページ][4]に移動します。

### GitHub アプリの構成

GitHub で Code Security を利用するには、以下のいずれかを行います:

- Datadog 内で GitHub App を作成する。
- すでに Datadog で作成した GitHub App がある場合は、それを更新する。

GitHub App に付与する権限によって、設定できる [GitHub 連携][2]機能が決まります。

#### GitHub App を作成してインストールする

1. Datadog で [**Integrations > GitHub Applications > Add New GitHub Application**][3] に移動します。
1. GitHub の組織名など、必要な詳細を入力します。
1. **Select Features** で **Code Security: Pull Request Review Comments** にチェックを入れます。
1. **Edit Permissions** で **Pull Requests** の権限が **Read & Write** になっていることを確認します。
1. **Create App in GitHub** をクリックします。
1. アプリ名を入力し、送信します。
1. **Install GitHub App** をクリックします。
1. アプリをインストールするリポジトリを選択し、**Install & Authorize** をクリックします。

{{< img src="ci/static-analysis-install-github-app.png" alt="GitHub App インストール画面" style="width:50%;" >}}

#### 既存の GitHub App を更新する

1. Datadog で [**Integrations > GitHub Applications**][5] に移動し、Code Security に使いたい GitHub App を探します。
{{< img src="ci/static-analysis-existing-github-app.png" alt="プルリクエスト上の静的コード解析コメントの例" style="width:90%;" >}}
1. **Features** タブで **Code Security: Pull Request Comments** のセクションを確認し、追加の権限が必要かどうかを判断します。必要な場合は **Update permissions in GitHub** をクリックしてアプリの設定を編集します。
1. **Repository permissions** で **Pull Requests** のアクセス権限を **Read and write** に設定します。
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="Pull Requests の Read and write 権限を選択するドロップダウン" style="width:90%;" >}}
1. **Subscribe to events** の項目で、**Pull request** にチェックを入れます。
{{< img src="ci/static-analysis-pr-review-comment.png" alt="プルリクエストのレビューコメント権限を示すチェックボックス" style="width:90%;" >}}

### リポジトリで Code Security の PR コメントを有効化する

1. Datadog で [**Security** > **Code Security** > **Setup**][4] に移動します。
2. **Enable scanning for your repositories** で、対象のリポジトリの横にある **Edit** を選択します。
3. **Enable Static Analyis** をオンに切り替えます。

**注:** [GitHub Actions][6] を使用してスキャンを実行する場合、コメントを表示するには `push` イベントでアクションをトリガーしてください。

### リポジトリ向けの PR コメント設定を構成する

全リポジトリ向けのグローバル設定、または個別のリポジトリ向けの設定を行うことができます。スキャンの種類ごとにコメントを有効化し、PR コメントが表示される最低重大度のしきい値を設定して、重大度の低い問題に対するコメントを除外することが可能です。

すべてのリポジトリに対して PR コメントを設定する方法:

1. Datadog で [**Security** > **Code Security** > **Settings**][7] に移動します。
1. **Repository Settings** で **Global PR Comment Configuration** をクリックします。
1. 設定を構成します:
    - **Enable PR comments for all scan types and severities**: すべてのスキャンタイプと重大度に対して PR コメントを適用する場合に有効化します。
    - **Enable for Static Analysis (SAST)**: SAST 用の PR コメントを有効化します。有効化した場合、最低重大度のしきい値を指定します。さらに、テストファイルで検出された違反に対するコメントを防ぐため、**Exclude PR comments if violations are detected in test files** を選択できます。
    - **Enable for Infrastructure-as-Code (IaC)**: IaC 用の PR コメントを有効化します。有効化した場合、最低重大度のしきい値を指定します。
1. **Save** をクリックします。

単一のリポジトリに対して PR コメントを設定する方法:

1. Datadog で [**Security** > **Code Security** > **Settings**][7] に移動します。
1. **Repository Settings** でリポジトリをリストから選択します。
1. 設定を構成します:
    - **Enable PR comments for all scan types and severities**: すべてのスキャンタイプと重大度に対して PR コメントを適用する場合に有効化します。
    - **Enable for Static Analysis (SAST)**: SAST 用の PR コメントを有効化します。有効化した場合、最低重大度のしきい値を指定します。さらに、テストファイルで検出された違反に対するコメントを防ぐため、**Exclude PR comments if violations are detected in test files** を選択できます。
    - **Enable for Infrastructure-as-Code (IaC)**: IaC 用の PR コメントを有効化します。有効化した場合、最低重大度のしきい値を指定します。
    - **Block all comments in this repository**: グローバル設定を上書きし、このリポジトリでのコメントをすべて無効化します。
1. **Save Configuration** をクリックします。

### Datadog から直接脆弱性を修正する

GitHub アプリの **Pull Requests** 権限が **Read & Write** に設定されている場合、提案された修正があるすべての静的コード解析 (SAST) の結果でワンクリック修正が有効になります。

脆弱性を修正し、プルリクエストを開くには次の手順に従います。
1. **Code Security > Repositories** に移動します。
2. 任意のリポジトリをクリックします。
3. リポジトリのページで、**Code Vulnerabilities** または **Code Quality** タブをクリックします。
4. 違反をクリックします。
5. その違反に対して提案された修正が利用可能な場合、サイドパネルの **Remediation** タブでワンクリック修正を実行できます。

[1]: /ja/security/code_security/
[2]: /ja/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /ja/security/code_security/static_analysis/github_actions/
[7]: https://app.datadoghq.com/security/configuration/code-security/settings
---
aliases:
- /ja/static_analysis/github_pull_requests
- /ja/code_analysis/github_pull_requests/
- /ja/security/code_security/dev_tool_int/github_pull_requests/
description: Code Security でスキャンされたリポジトリのプルリクエストコメントを設定する方法を学びます。
title: プルリクエストコメント
---
## 概要 {#overview}
Code Security は、有効なリポジトリで脆弱性が検出されると、SCM (ソースコード管理) システムの PR (プルリクエスト) に直接コメントを投稿します。そのため、コードをマージする前に、コンテキストに沿って問題を確認し、修正することができます。コメントでは差分が検出されます。つまり、PR で変更された行で新たに発生した問題にのみフラグを設定します。

PR コメントには、次の 2 つのタイプがあります。
- **インラインコメント**: 特定のコード行にある個々の Code Security の検出結果にフラグを設定し、修正案 (ある場合) を提示します。
        
    {{< img src="/code_security/github_inline_pr_comment_light.png" alt="Datadog ボットが、[Critical: Code Vulnerability](重大: コードの脆弱性) フラグが設定されている GitHub プルリクエストにインラインコメントを投稿しています。このコメントでは、プロセス呼び出しをサニタイズするために、コードの os.system(command) を os.system(shlex.quote(command)) に置き換えることを提案しています。" style="width:100%;" >}}

    For SAST vulnerabilities and code quality violations that don't have an available suggested fix, the inline comment includes a {{< ui >}}Fix with Cursor{{< /ui >}} link. Click it to open the pull request's branch in Cursor with a tailored remediation prompt for the finding. When a suggested fix is available, the comment shows a committable suggestion instead. To handle the Cursor deep link, install the [Datadog extension for VS Code and Cursor](/ide_plugins/vscode/?tab=cursor).

    {{< img src="code_security/dev_tool_int/pull_request_comments/fix-with-cursor.png" alt="コード品質違反のフラグが設定されている GitHub プルリクエストに対する Datadog ボットのインラインコメント。検出結果の下に [Fix with Cursor](Cursor で修正) リンクが表示されています。" style="width:100%;" >}}
- **サマリーコメント**: Datadog からのすべての検出結果を 1 つのコメントにまとめます。このコメントは、注意が必要な問題が PR に含まれている場合にのみ表示されます。対象の検出結果への対処が完了すると、コメントが自動的に編集され、PR の問題がすべて解決されたことが確認されます。
  
    {{< img src="/code_security/github_summary_comment_injections_light.png" alt="GitHub プルリクエストに Datadog ボットがサマリーコメントを投稿しています。このコメントには [Warnings](警告) セクションがあり、SQL インジェクションやコマンドインジェクションなどの 4 つの重大なコードの脆弱性が、具体的なファイルやコード行へのリンクとともに一覧表示されています。" style="width:100%;" >}}

PR のコメントは、[リポジトリ設定][7]の組織レベルまたはリポジトリレベルで、以下のコントロールを使用して設定できます。
- スキャンタイプ (SAST、静的 SCA、シークレット、IaC) ごとの PR コメントの有効化/無効化
- 各スキャンタイプの重大度しきい値の設定
- テストファイルまたは開発/テスト依存関係からの検出結果の除外
- Bits AI によって誤検知と識別された検出結果の除外

[Datadog における PR コメント][11]の詳細をご確認ください。

**注**: PR コメントは PR チェックではありません。チェックを設定するには、「[PR ゲート][10]」を参照してください。

## 前提条件 {#prerequisites}
- プロバイダーに対する Datadog ソースコードインテグレーションを有効にしておく必要があります。PR コメントは、[GitHub][2]、[GitLab][8]、および [Azure DevOps][9] のリポジトリでサポートされています。 
- ご使用のリポジトリで関連する Code Security 製品が有効になっている必要があります。アプリ内で Code Security を有効にするには、[{{< ui >}}Code Security{{< /ui >}} の設定ページ][4]に移動してください。

<div class="alert alert-info">
  PR コメントは、パブリックリポジトリのプルリクエストや、ソースブランチとは異なるリポジトリの宛先ブランチをターゲットとするプルリクエスト (つまり、メインリポジトリにマージしようとするフォークされたリポジトリ) ではサポートされていません。
</div>

## プルリクエストのコメントを設定する {#set-up-pull-request-comments}
ご利用のソースコード管理プロバイダーに応じて、以下の手順を実行します。

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-info">Datadog がホストするスキャンを使用している場合は、GitHub のセットアップ手順を完了した後で、目的のスキャンタイプ (例: 静的コード解析 (SAST)) のトグルを有効にしてください。
<a href="/security/code_security/static_analysis/github_actions/">GitHub Actions</a> を使用してスキャンを実行している場合は、GitHub のセットアップの完了後に、 <code>push</code> に対するアクションをトリガーしてコメントを表示します。</div>

### GitHub アカウントを Datadog に接続する {#connect-your-github-accounts-to-datadog}
セットアップ手順については、[Datadog GitHub ソースコードのインテグレーション][2]に関するドキュメントをお読みください。

### GitHub App を作成または更新する {#create-or-update-a-github-app}
すでに Datadog に接続されている GitHub App がある場合は、それを更新します。そうでない場合は、新しい GitHub App を作成します。

<div class="alert alert-info">GitHub App に付与する権限によって、設定可能な <a href="/integrations/github/">GitHub インテグレーション</a>機能が決まります。</div>

#### GitHub App を作成してインストールする {#create-and-install-a-github-app}

1. Datadog で、[[{{< ui >}}Integrations{{< /ui >}}(インテグレーション)] > [{{< ui >}}GitHub Applications{{< /ui >}}] > [{{< ui >}}Add New GitHub Application{{< /ui >}}(新しい GitHub アプリの追加)]][3] に移動します。
2. GitHub 組織名などの必要な詳細を入力します。
3. [{{< ui >}}Select Features{{< /ui >}}](機能の選択) で、[{{< ui >}}Code Security: Pull Request Review Comments{{< /ui >}}](Code Security: プルリクエストのレビューコメント) ボックスをオンにします。
4. [{{< ui >}}Edit Permissions{{< /ui >}}](権限の編集) で、[{{< ui >}}Pull Requests{{< /ui >}}](プルリクエスト) 権限が [{{< ui >}}Read & Write{{< /ui >}}](読み取りと書き込み) に設定されていることを確認します。
5. [{{< ui >}}Create App in GitHub{{< /ui >}}](Github App の作成) をクリックします。
6. アプリの名前を入力し、送信します。
7. [{{< ui >}}Install GitHub App{{< /ui >}}](GitHub App のインストール) をクリックします。
8. アプリをインストールするリポジトリを選択し、[{{< ui >}}Install & Authorize{{< /ui >}}](インストールと承認) をクリックします。

    {{< img src="ci/static-analysis-install-github-app.png" alt="GitHub App インストール画面" style="width:50%;" >}}

#### 既存の GitHub App を更新する {#update-an-existing-github-app}

1. Datadog で、[[{{< ui >}}Integrations{{< /ui >}}(インテグレーション)] > [{{< ui >}}GitHub Applications{{< /ui >}}]][5] に移動し、Code Security で使用する GitHub App を検索します。
   {{< img src="ci/static-analysis-existing-github-app.png" alt="プルリクエストに対する静的コード解析コメントの例" style="width:90%;" >}}
2. [{{< ui >}}Features{{< /ui >}}] タブで、[{{< ui >}}Code Security: Pull Request Comments{{< /ui >}}](Code Security: プルリクエストコメント) セクションを確認し、GitHub App に追加の権限が必要かどうかを判断します。必要な場合は、[{{< ui >}}Update permissions in GitHub{{< /ui >}}](GitHub の権限を更新) をクリックしてアプリ設定を編集します。
3. [{{< ui >}}Repository permissions{{< /ui >}}](リポジトリ権限) で、[{{< ui >}}Pull Requests{{< /ui >}}] アクセスを [{{< ui >}}Read and write{{< /ui >}}] に設定します。
   {{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="プルリクエストの読み取りおよび書き込み権限のドロップダウン" style="width:90%;" >}}
4. [{{< ui >}}Subscribe to events{{< /ui >}}](イベントにサブスクライブ) 見出しの下にある、[{{< ui >}}Pull request{{< /ui >}}] ボックスをオンにします。
   {{< img src="ci/static-analysis-pr-review-comment.png" alt="プルリクエストレビューコメント権限のチェックボックス" style="width:90%;" >}}


[2]: /ja/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[5]: https://app.datadoghq.com/integrations/github/configuration

{{% /tab %}}
{{% tab "GitLab" %}}

GitLab リポジトリを Datadog に接続するための [GitLab ソースコード][8]セットアップ手順を参照してください。

[8]: /ja/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "DevOps" %}}

Azure DevOps リポジトリを Datadog に接続するための [Azure ソースコードセットアップ手順][9]を参照してください。

[9]: /ja/integrations/azure-devops-source-code/#source-code-functionality

{{% /tab %}}
{{< /tabs >}}

## 構成オプション {#configuration-options}

PR コメントを有効にする前に、**リポジトリで Code Security スキャン機能が少なくとも 1 つ有効になっていることを確認してください。**PR コメントが組織レベルで構成されている場合でも、PR コメントは、サポートされているスキャンタイプ (SAST、SCA、IaC など) がアクティブなリポジトリにのみ追加されます。有効なスキャンタイプがないリポジトリには、PR コメントは追加されません。

PR コメントは、組織レベルまたはリポジトリレベルで構成できます。
- **組織レベル:** 設定は、少なくとも 1 つのスキャン機能が有効になっている組織内のすべてのリポジトリに適用されます。
- **リポジトリレベル:** 設定は、選択したリポジトリの組織のデフォルト設定を上書きします。

PR コメントを設定する際、以下のことを行えます。
- 特定のスキャンタイプ (SAST、SCA、IaC) に対してコメントを有効または無効にする。
- 最小重大度しきい値を設定し、コメントが表示される条件を制御する。
- テストファイルや開発/テスト依存関係における検出結果のコメントを除外し、優先度の低い問題によるノイズを回避する。
- Bits AI によって誤検知と識別された検出結果を除外する。

## 組織レベルで PR コメントを設定する {#configure-pr-comments-at-the-organization-level}

1. Datadog で、[[{{< ui >}}Security{{< /ui >}}(セキュリティ)] > [{{< ui >}}Code Security{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}(設定)]][7] に移動します。
1. [{{< ui >}}Repository Settings{{< /ui >}}](リポジトリ設定) で、[{{< ui >}}Global PR Comment Configuration{{< /ui >}}](グローバル PR コメント構成) をクリックします。
1. 次のように設定します。
    - [{{< ui >}}Enable PR comments for all scan types and severities{{< /ui >}}](すべてのスキャンタイプおよび重大度の PR コメントを有効にする): これを有効にすると、すべてのタイプと重大度に PR コメントが適用されます。
    - [{{< ui >}}Enable for Static Analysis (SAST){{< /ui >}}](静的解析 (SAST) に対して有効にする): このオプションをオンにすると、SAST に対して PR コメントが有効になります。有効にする場合は、最小重大度しきい値を指定します。また、テストファイルで検出された見つかった問題にコメントが適用されないようにする場合は、[{{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}}](テストファイルで違反が検出された場合は PR コメントを除外する) を選択します。Bits AI によって誤検知と特定された検出結果を除外する場合は、[{{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}}](Bits AI によって誤検知と特定された検出結果を除外する) を選択します。パブリックリポジトリにコメントを追加する場合は、[{{< ui >}}Include public repositories{{< /ui >}}](パブリックリポジトリを含める) を選択します。
    - [{{< ui >}}Enable for Software Composition Analysis (SCA){{< /ui >}}](SCA (ソフトウェアコンポジション解析) に対して有効にする): SCA に対する PR コメントを有効にする場合は、このオプションをオンにします。有効にする場合は、最小重大度しきい値を指定します。また、開発環境またはテスト環境のみに存在する依存関係で検出された問題にコメントが適用されないようにする場合は、[{{< ui >}}Exclude PR comments if violations are detected in test or dev dependencies{{< /ui >}}](テストまたは開発の依存関係で違反が検出された場合は PR コメントを除外する) を選択します。パブリックリポジトリにコメントを追加する場合は、[{{< ui >}}Include public repositories{{< /ui >}}](パブリックリポジトリを含める) を選択します。
    - [{{< ui >}}Enable for Secret Scanning (Secrets){{< /ui >}}](シークレットスキャン (シークレット) を有効にする): シークレットに対する PR コメントを有効にする場合は、このオプションをオンにします。有効にする場合は、最小重大度しきい値を指定します。また、テストファイルで検出されたシークレットにコメントが適用されないようにする場合は、[{{< ui >}}Exclude PR comments if secrets are detected in test files{{< /ui >}}](テストファイルでシークレットが検出された場合は PR コメントを除外する) を選択します。パブリックリポジトリにコメントを追加する場合は、[{{< ui >}}Include public repositories{{< /ui >}}](パブリックリポジトリを含める) を選択します。
    - [{{< ui >}}Enable for Infrastructure-as-Code (IaC){{< /ui >}}](IaC (Infrastructure-as-Code) に対して有効にする): IaC に対して PR コメントを有効にする場合は、このオプションをオンにします。有効にする場合は、最小重大度しきい値を指定します。また、テストファイルで検出された見つかった問題にコメントが適用されないようにする場合は、[{{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}}](テストファイルで違反が検出された場合は PR コメントを除外する) を選択します。Bits AI によって誤検知と特定された検出結果を除外する場合は、[{{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}}](Bits AI によって誤検知と特定された検出結果を除外する) を選択します。パブリックリポジトリにコメントを追加する場合は、[{{< ui >}}Include public repositories{{< /ui >}}](パブリックリポジトリを含める) を選択します。
1. [{{< ui >}}Save{{< /ui >}}](保存) をクリックします。

## リポジトリレベルで PR コメントを設定する {#configure-pr-comments-at-the-repository-level}

1. Datadog で、[[{{< ui >}}Security{{< /ui >}}(セキュリティ)] > [{{< ui >}}Code Security{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}(設定)]][7] に移動します。
1. [{{< ui >}}Repository Settings{{< /ui >}}] で、リストからリポジトリを選択します。
1. 次のように設定します。
    - [{{< ui >}}Enable PR comments for all scan types and severities{{< /ui >}}](すべてのスキャンタイプおよび重大度の PR コメントを有効にする): これを有効にすると、すべてのタイプと重大度に PR コメントが適用されます。
    - [{{< ui >}}Enable for Static Analysis (SAST){{< /ui >}}](静的解析 (SAST) に対して有効にする): このオプションをオンにすると、SAST に対して PR コメントが有効になります。有効にする場合は、最小重大度しきい値を指定します。また、テストファイルで検出された見つかった問題にコメントが適用されないようにする場合は、[{{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}}](テストファイルで違反が検出された場合は PR コメントを除外する) を選択します。Bits AI によって誤検知と特定された検出結果を除外する場合は、[{{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}}](Bits AI によって誤検知と特定された検出結果を除外する) を選択します。
    - [{{< ui >}}Enable for Software Composition Analysis (SCA){{< /ui >}}](SCA (ソフトウェアコンポジション解析) に対して有効にする): SCA に対する PR コメントを有効にする場合は、このオプションをオンにします。有効にする場合は、最小重大度しきい値を指定します。また、開発環境またはテスト環境のみに存在する依存関係で検出された問題にコメントが適用されないようにする場合は、[{{< ui >}}Exclude PR comments if violations are detected in test or dev dependencies{{< /ui >}}](テストまたは開発の依存関係で違反が検出された場合は PR コメントを除外する) を選択します。
    - [{{< ui >}}Enable for Secret Scanning (Secrets){{< /ui >}}](シークレットスキャン (シークレット) を有効にする): シークレットに対する PR コメントを有効にする場合は、このオプションをオンにします。有効にする場合は、最小重大度しきい値を指定します。また、テストファイルで検出されたシークレットにコメントが適用されないようにする場合は、[{{< ui >}}Exclude PR comments if secrets are detected in test files{{< /ui >}}](テストファイルでシークレットが検出された場合は PR コメントを除外する) を選択します。
    - [{{< ui >}}Enable for Infrastructure-as-Code (IaC){{< /ui >}}](IaC (Infrastructure-as-Code) に対して有効にする): IaC に対して PR コメントを有効にする場合は、このオプションをオンにします。有効にする場合は、最小重大度しきい値を指定します。また、テストファイルで検出された見つかった問題にコメントが適用されないようにする場合は、[{{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}}](テストファイルで違反が検出された場合は PR コメントを除外する) を選択します。Bits AI によって誤検知と特定された検出結果を除外する場合は、[{{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}}](Bits AI によって誤検知と特定された検出結果を除外する) を選択します。
    - [{{< ui >}}Block all comments in this repository{{< /ui >}}](このリポジトリのすべてのコメントをブロックする): これを有効にすると、このリポジトリのすべてのコメントが無効になり、グローバル設定が上書きされます。
1. [{{< ui >}}Save Configuration{{< /ui >}}](構成の保存) をクリックします。

[1]: /ja/security/code_security/
[2]: /ja/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /ja/security/code_security/static_analysis/github_actions/
[7]: https://app.datadoghq.com/security/configuration/code-security/settings
[8]: /ja/integrations/gitlab-source-code/
[9]: https://docs.datadoghq.com/ja/integrations/azure-devops-source-code/#source-code-functionality
[10]: /ja/quality_gates/?tab=staticanalysis#setup
[11]: /ja/integrations/guide/source-code-integration/?tab=codesecurity#pr-comments
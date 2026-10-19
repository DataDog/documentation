---
aliases:
- /ja/bits_ai/bits_ai_dev_agent/setup/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/bits-code/
  tag: ブログ
  text: Bits Code を使用して Datadog の検出結果を自動コード修正に変換
title: Bits Code のセットアップ
---
## 概要 {#overview}

[Bits Code][8] は [ソースコードプロバイダー][11] と統合され、Datadog で検出された問題に基づいてプルリクエストやマージリクエストを開き、更新し、反復処理します。セットアップが完了したら、[Bits Code の使用を開始][7] できます。

## 前提条件{#prerequisites}

Bits Code をセットアップするには、[`Bits Code Write` (`bits_dev_write`) 権限][1] が必要です。この権限は、Datadog 標準ロールなどの管理対象 Datadog ロールに含まれています。

オーガニゼーションがカスタムロールを使用している場合は、権限を手動で追加してください。詳細については、[アクセス制御][1] を参照してください。

## セットアップ {#setup}

[サポートされているソースコードプロバイダー][11] のいずれかに対して Bits Code をセットアップします。

{{< tabs >}}

{{% tab "GitHub" %}}
1. [GitHub インテグレーション][1] をインストールします。インストールと構成の詳細な手順については、[GitHub インテグレーションガイド][2] を参照してください。
1. GitHub アカウントで [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Apps{{< /ui >}}] (アプリ) > [{{< ui >}}Datadog{{< /ui >}}] に移動し、GitHub の権限を構成します。
   1. Bits Code の基本機能を有効にするには、以下の権限を設定します。
      - {{< ui >}}Repository permissions{{< /ui >}}
        - リポジトリのコンテンツ: 読み取りと書き込み
        - プルリクエスト: 読み取りと書き込み
      - {{< ui >}}Subscribe to events{{< /ui >}}
        - プッシュ
   1. (オプション) プルリクエストの反復時に Bits Code が CI ログを使用できるようにするには、CI ログを Datadog に送信し、[自動プッシュ](#enable-auto-push)機能を有効にする必要があります。このためには追加の権限が必要です。 
       - {{< ui >}}Repository permissions{{< /ui >}}
         - チェック: 読み取り  
         - コミットステータス: 読み取り専用 
       - {{< ui >}}Subscribe to events{{< /ui >}}
         - 実行のチェック
         - スイートのチェック  
         - 問題のコメント  
         - ステータス

[1]: https://app.datadoghq.com/integrations/github
[2]: /ja/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
1. [GitLab ソースコードインテグレーション][1] をインストールします。インストールと構成の詳細な手順については、[GitLab ソースコードインテグレーションガイド][2] を参照してください。
1. GitLab の [サービスアカウント][3] が以下の要件を満たしていることを確認します。
   - サービスアカウントにはプロジェクトに対する [Developer ロール][4] が付与されている必要があります。このロールは [グループ][5] から継承できます。
   - サービスアカウントの [パーソナルアクセストークン][7] には、[スコープ][6] `api`、`write_repository`、および `read_user` が必要です。

   <div class="alert alert-warning">既存の GitLab パーソナルアクセストークンのスコープは変更できません。上記のスコープを含むトークンを作成する必要がある場合には、GitLab ソースコードインテグレーションを使用する他の Datadog 製品で<a href="/integrations/gitlab-source-code/#required-gitlab-scopes">必要なすべてのスコープ</a>を追加します。</div>

[1]: https://app.datadoghq.com/integrations/gitlab-source-code
[2]: /ja/integrations/gitlab-source-code/
[3]: https://docs.gitlab.com/user/profile/service_accounts/
[4]: https://docs.gitlab.com/user/permissions/#default-roles
[5]: https://docs.gitlab.com/user/permissions/#groups
[6]: https://docs.gitlab.com/user/profile/personal_access_tokens/#personal-access-token-scopes
[7]: https://docs.gitlab.com/user/profile/personal_access_tokens/
{{% /tab %}}

{{% tab "Azure DevOps" %}}
1. [Azure DevOps ソースコードインテグレーション][101] をインストールします。インストールと構成の詳細な手順については、[Azure DevOps ソースコードインテグレーションガイド][102] を参照してください。
2. Microsoft Entra アプリのサービスプリンシパルが各プロジェクトの Project Contributor であるか、以下の [リポジトリ権限][103] を持つカスタムグループに属していることを確認します。
   - Contribute
   - Contribute to pull requests
   - Create branch
   - Read

[コミット作成者のメール検証][104] が有効になっている場合は、許可されたメールアドレスに `no-reply@dtdg.co` を追加してください。Bits Code は作成するコミットにこのアドレスを使用します。

[101]: https://app.datadoghq.com/integrations/azure-devops-source-code
[102]: /ja/integrations/azure-devops-source-code/
[103]: https://learn.microsoft.com/en-us/azure/devops/repos/git/set-git-repository-permissions
[104]: https://learn.microsoft.com/en-us/azure/devops/repos/git/repository-settings#commit-author-email-validation-policy
{{% /tab %}}

{{< /tabs >}}

## 追加の構成 {#additional-configuration}

これらのオプションの構成は、Bits Code を最大限に活用する上で役立ちます。

### テレメトリタグ付けの構成 {#configure-telemetry-tagging}

Bits Code は `service` および`version` テレメトリタグを使用して、検出された問題 (エラーや脆弱性など) を、その時点で実行されていたコードのバージョンと照合します。 

テレメトリタグ付けを構成するには、[Git 情報を使用した APM テレメトリのタグ付け][4] を参照してください。

また、Bits Code 設定の [[{{< ui >}}Repositories{{< /ui >}}] (リポジトリ)][5] > [{{< ui >}}Service Repository Mapping{{< /ui >}}] (サービスリポジトリ) で、サービスとリポジトリのマッピングを手動で構成することもできます。

### 自動プッシュの有効化 {#enable-auto-push}

自動プッシュにより、Bits Code は支援できる問題を検出した際に、ブランチの作成、コードのプッシュ、PR または MR のオープンを行うことができます。自動プッシュは PR または MR を開いて変更をプッシュするだけのものであり、コードをマージすることはありません。自動プッシュが無効な場合、コードがプッシュされる前に Datadog でコードをレビューする必要があります。

自動プッシュを有効にするには、[{{< ui >}}Bits Code{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}] (設定) > [[{{< ui >}}General{{< /ui >}}] (全般)][6] に移動します。


#### セキュリティに関する考慮事項{#security-considerations}

AI ベースのツールに信頼できないデータの読み取りを許可すると、攻撃者がその出力に影響を与えることができるようになります。自動プッシュの動作は、Bits Code が扱うデータの種類によって異なります。コードのみのワークフローは、Agent が直接検査できるソースコードに対して動作しますが、テレメトリベースのワークフロー (エラーやトレースなど) には、信頼できないランタイム入力が含まれる場合があります。

安全性と自動化のバランスをとるために、[Datadog][6] で自動プッシュの動作を構成できます (例: 自動プッシュをコードのみのワークフローに制限する、またはテレメトリが関与する場合はレビューを必須にするなど)。Datadog は変更をプッシュする前に、Agent が生成したすべてのコードをスキャンしますが、これらのセーフガードはフールプルーフではありません。

### カスタム指示の構成 {#configure-custom-instructions}

Bits Code は、以下を含むリポジトリからカスタム指示ファイルを読み込みます。

- `AGENTS.md`
- `CLAUDE.md`
- `agent.md`
- `.cursorrules`
- `.windsurfrules`
- `copilot-instructions.md`

また、[{{< ui >}}Bits Code{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}General{{< /ui >}}] (全般)][6] の [{{< ui >}}Global Agent Instructions{{< /ui >}}] (グローバルエージェントの指示) セクションで、すべての Bits Code セッションに適用されるグローバルなカスタム指示を定義することもできます。

カスタム指示ファイルは、Bits Code に使用させたい [カスタムスキル][12] をメンションするのに適しています。

## 環境のセットアップ {#environment-setup}

ネットワークアクセスポリシーやリポジトリ固有のツールなど、Bits Code の実行環境を構成します。

### インターネットアクセスの構成 {#configure-internet-access}

デフォルトでは、Bits Code はエージェントの実行中に**インターネットにアクセスできません**。エージェントがアクセスできる外部ドメインを構成するには、[{{< ui >}}Bits Code{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}] (設定) > [[{{< ui >}}General{{< /ui >}}] (全般)][6] に移動し、[{{< ui >}}Internet Access{{< /ui >}}] (インターネットアクセス) セクションを見つけます。アクセスポリシー {{< ui >}}No Internet Access{{< /ui >}}、{{< ui >}}Default Allowlist{{< /ui >}}、{{< ui >}}Custom + Default Allowlist{{< /ui >}}、{{< ui >}}Custom Allowlist{{< /ui >}} のいずれかを選択します。

デフォルトの許可リストには、以下のドメインが含まれています。このリストは、ユーザーからのフィードバックやエコシステムの変更に基づいて、今後変化していきます。変更を回避するには、カスタム許可リストを構成してください。

| 言語| ドメイン|
|---|---|
| Clojure/JVM | `repo.clojars.org` |
| Go | `pkg.go.dev`、`proxy.golang.org`、`sum.golang.org`、`vuln.go.dev` |
| Java/JVM | `repo1.maven.org` |
| JavaScript/TypeScript | `registry.npmjs.org`, `registry.yarnpkg.com`, `repo.yarnpkg.com` |
| .NET/C# | `api.nuget.org` |
| PHP | `packagist.org`、`repo.packagist.org` |
| Python | `files.pythonhosted.org`、`pypi.org`、`pypi.python.org`、`pythonhosted.org` |
| Ruby | `api.rubygems.org`、`index.rubygems.org`、`rubygems.org` |
| Rust | `index.crates.io`、`static.crates.io` |
| Ubuntu | `archive.ubuntu.com`、`ports.ubuntu.com`、`security.ubuntu.com` |

### リポジトリ環境の構成 {#configure-repository-environment}

Bits Code が依存関係、フォーマッター、リンター、およびコードベースに必要なビルドツールをインストールするためのカスタム環境を構成します。各リポジトリは分離された専用のサンドボックスで実行され、環境はそのサンドボックスの設定を定義します。

リポジトリ環境を構成するには、次のようにします。

1. [{{< ui >}}Bits Code{{< /ui >}}] > ]{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Repositories{{< /ui >}}] (リポジトリ)][5] に移動し、[{{< ui >}}Environments{{< /ui >}}] (環境) セクションを見つけます。
1. [{{< ui >}}Add Environment{{< /ui >}}] (環境を追加) をクリックしてリポジトリ構成を作成します。
   1. ドロップダウンからリポジトリを選択します。
   1. (オプション) [{{< ui >}}Pre-installed Languages{{< /ui >}}] (事前にインストールされている言語) で [{{< ui >}}Select Versions{{< /ui >}}] (バージョンを選択) をクリックし、サンドボックスが使用する言語バージョンを指定します。
   1. (オプション) 環境変数とシークレットを定義します。環境変数は、環境のセットアップ中と Bits Code の実行中の両方で使用できます。シークレットは、環境のセットアップ中にのみ環境変数として使用できます。
   1. (オプション) 実行するセットアップコマンドを含むシェルスクリプトを追加します (例: `pip install -r requirements.txt`)。
1. セットアップコマンドを実行して、コマンドが正常に実行されることを確認します。
1. 構成を保存します。

Bits Code は起動時にセットアップコマンドを実行し、環境にインストールされているツールを使用できます。セットアップコマンドは、依存関係をダウンロードするためにネットワークアクセスが有効な状態で実行されます。セットアップ完了後、エージェント実行中のアウトバウンドネットワークアクセスは、[インターネットアクセス](#configure-internet-access)ポリシーによって制御されます。セットアップコマンドはリポジトリ内のコードに対して実行されるため、リポジトリのコードを信頼する場合にのみ有効にしてください。

**注**: 最適な結果を得るには、コードのビルドとテストの方法を記載した[カスタム指示ファイル](#configure-custom-instructions) (例: `claude.md`) をリポジトリに追加してください。

## トラブルシューティング {#troubleshooting}

### GitHub PR の作成の予期しない失敗 {#creation-of-github-prs-fails-unexpectedly}

場合によっては、特にブランチが多いリポジトリでは、GitHub はセッション用のブランチを作成する際に権限チェックを実行しません。カスタム GitHub アプリを使用している場合は、[GitHub インテグレーション][2] でアプリに `workflows:write` 権限を追加することで、この問題を回避できます。

**注**: この権限により、Bits AI はリポジトリ内にワークフローを作成できるようになりますが、セキュリティ上の影響があります。

[1]: /ja/account_management/rbac/permissions/#bits-ai
[2]: https://app.datadoghq.com/integrations/github
[4]: /ja/integrations/guide/source-code-integration/?tab=go#tag-your-apm-telemetry-with-git-information
[5]: https://app.datadoghq.com/code/settings?tab=repositories
[6]: https://app.datadoghq.com/code/settings
[7]: /ja/bits_ai/bits_code/#start-a-session
[8]: /ja/bits_ai/bits_code/
[11]: /ja/bits_ai/bits_code/#supported-source-code-providers
[12]: /ja/bits_ai/bits_code/#custom-agent-skills-and-instructions

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
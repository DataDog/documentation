---
aliases:
- /ja/code_analysis/software_composition_analysis/generic_ci_providers/
- /ja/code_analysis/software_composition_analysis/github_actions/
- /ja/code_analysis/software_composition_analysis/setup/
description: 本番環境にリリースする前に、インポートしたオープンソースライブラリをスキャンし、既知のセキュリティ脆弱性を確認するための Datadog
  Software Composition Analysis について説明します。
disable_toc: false
title: リポジトリでの SCA のセットアップ
---
## 概要 {#overview}

Datadog Software Composition Analysis (SCA) は、リポジトリでオープンソースライブラリをスキャンし、本番環境にリリースする前に既知のセキュリティ脆弱性を検出します。

始めるには
1. [Code Security 設定][2] を開きます。
2. [{{< ui >}}Activate scanning for your repositories{{< /ui >}}] (リポジトリのスキャンを有効化) で、[{{< ui >}}Manage Repositories{{< /ui >}}] (リポジトリを管理) をクリックします。
3. [SCA スキャンを実行する場所](#select-where-to-run-static-sca-scans) (Datadog がホストする場所または CI パイプライン) を選択します。
4. ソースコードプロバイダーのセットアップ手順に従います。

## サポートされている言語と依存関係マニフェスト {#supported-languages-and-dependency-manifests}
Datadog SCA は、依存関係マニフェスト (ロックファイルやその他のサポートされているマニフェストファイルなど) を使用して以下の言語のライブラリをスキャンし、脆弱性のある依存関係を特定します。

| 言語   | パッケージマネージャー    | ファイル                                |
|------------|-------------------|------------------------------------------|
| C#         | .NET              | `packages.lock.json`、`.csproj` ファイル    |
| C++        | Conan             | `conan.lock`                             |
| Dart       | pub               | `pubspec.lock`                           |
| Go         | mod               | `go.mod`                                 |
| JVM        | Gradle            | `gradle.lockfile`                        |
| JVM        | Maven             | `pom.xml`                                |
| Node.js    | Bun               | `bun.lock`                               |
| Node.js    | npm               | `package-lock.json`                      |
| Node.js    | pnpm              | `pnpm-lock.yaml`                         |
| Node.js    | yarn              | `yarn.lock`                              |
| PHP        | composer          | `composer.lock`                          |
| Python     | PDM               | `pdm.lock`                               |
| Python     | pip               | `requirements.txt`、`Pipfile.lock`       |
| Python     | poetry            | `poetry.lock`                            |
| Python     | UV                | `uv.lock`                                |
| Ruby       | bundler           | `Gemfile.lock`                           |
| Rust       | Cargo             | `cargo.lock`                             |
| Swift      | SwiftPM           | `Package.swift`、`Package.resolved`      |

**注:** `packages.lock.json` ファイルと `.csproj` ファイルの両方が存在する場合、`packages.lock.json` が優先され、より正確なバージョン解決が実現します。

## ロックファイルなしのスキャン {#lockfile-less-scanning}

Datadog SCA は、**サポートされているロックファイルが検出されない場合にのみ**マニフェストファイルをスキャンします。ロックファイルが存在する場合はロックファイルが優先され、マニフェストはスキャンされません。

| 言語 | パッケージマネージャー        | ファイル             |
|----------|------------------------|------------------|
| Node.js  | npm、yarn、pnpm、Bun   | `package.json`   |
| Python   | Poetry、PDM、UV、pip   | `pyproject.toml` |

**サポートされているセクション:**
- `package.json`: `dependencies`、`devDependencies`、および`optionalDependencies`
- `pyproject.toml`: PEP 621 `dependencies` および `optional-dependencies`、PEP 735 `dependency-groups`、および Poetry 依存関係セクション

<div class="alert alert-info">
マニフェストでは固定バージョンではなくバージョン範囲 (例: <code>^2.3.4</code> または <code>&gt;=1.0,&lt;2</code>) を宣言できるため、Datadog は各範囲を解決するために、その範囲を満たす最新の公開バージョンを選択します。プレリリースバージョンは除外されます。
</div>

## 静的 SCA スキャンを実行する場所の選択 {#select-where-to-run-static-sca-scans}
デフォルトでは、有効なリポジトリ内でサポートされている依存関係マニフェストまたはロックファイルを更新する変更をコミットしたときに、スキャンが実行されます。SCA を CI パイプラインで実行することもできます。CI ジョブは `push` イベントでサポートされています。

### Datadog ホスト型スキャンでスキャンする {#scan-with-datadog-hosted-scanning}

Datadog のインフラストラクチャーで直接 Datadog Static SCA スキャンを実行できます。サポートされているリポジトリタイプには以下が含まれます。
- [GitHub](/security/code_security/software_composition_analysis/setup_static/?tab=github#select-your-source-code-management-provider) ([Git Large File Storage][21] を使用しているリポジトリを除く)
- [GitLab.com および GitLab Self-Managed](/security/code_security/software_composition_analysis/setup_static/?tab=gitlab#select-your-source-code-management-provider)
- [Azure DevOps](/security/code_security/software_composition_analysis/setup_static/?tab=azuredevops#select-your-source-code-management-provider)
- [Bitbucket Cloud](/security/code_security/software_composition_analysis/setup_static/?tab=bitbucketcloud#select-your-source-code-management-provider)

開始するには、[[{{< ui >}}Code Security{{< /ui >}}] ページ][2] に移動してください。

<div class="alert alert-info">
Datadog ホスト型 SCA スキャンは、255 文字を超えるファイル名を含むリポジトリではサポートされていません。<br>
この場合は CI パイプラインを使用してスキャンしてください。
</div>

### CI パイプラインでスキャンする {#scan-in-ci-pipelines}

Datadog Software Composition Analysis は、[`datadog-ci` CLI][8] を使用して CI パイプラインで実行されます。

<div class="alert alert-info">
結果が {{< ui >}}Code Security{{< /ui >}} に表示される前に、デフォルトブランチを少なくとも 1 回スキャンする必要があります。
</div>

{{< whatsnext desc="CI プロバイダー別の手順を参照してください。">}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/gitlab_ci" >}}GitLab CI/CD{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/azure_devops" >}}Azure DevOps{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/generic_ci_providers" >}}汎用 CI プロバイダー{{< /nextlink >}}
{{< /whatsnext >}}

Java プロジェクトで Maven や Gradle のマニフェストを使用せず、サードパーティの JAR をリポジトリに直接チェックインする場合は、[Java JAR ディレクトリのスキャン][27] を参照してください。

## ソースコード管理プロバイダーを選択する {#select-your-source-code-management-provider}

使用するスキャンモードに関係なく、ソースコード管理プロバイダーを接続することで、インラインコードスニペットやプルリクエストコメントなどのネイティブ機能が有効になります。Datadog SCA はすべてのプロバイダーをサポートしており、GitHub、GitLab、Azure DevOps、Bitbucket Cloud Premium のネイティブサポートを提供します。

{{< tabs >}}
{{% tab "GitHub" %}}

[GitHub インテグレーションタイル][1] を使用して GitHub App を構成し、インラインコードスニペットと [プルリクエストコメント][3] を有効にするために [ソースコードインテグレーション][2] を設定します。

GitHub App をインストールする際には、特定の機能を有効にするために以下の権限が必要です。

- `Content: Read` は、Datadog に表示されるコードスニペットを確認できるようにします。
- `Pull Request: Read & Write` は、Datadog が [プルリクエストコメント][3] を使用してプルリクエスト内で違反に関するフィードバックを直接追加できるようにします。
- `Checks: Read & Write` は、SAST 違反に対するチェックを作成してプルリクエストをブロックできるようにします。

[1]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /ja/integrations/guide/source-code-integration
[3]: /ja/security/code_security/dev_tool_int/github_pull_requests

{{% /tab %}}
{{% tab "GitLab" %}}

GitLab を Datadog に接続するには、[GitLab ソースコードセットアップ手順][1] を参照してください。GitLab.com と Self-Managed インスタンスの両方がサポートされています。

[1]: /ja/integrations/gitlab-source-code/#setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

**注:** Azure DevOps インテグレーションは Microsoft Entra テナントに接続されている必要があります。Azure DevOps Server は**サポートされていません**。

Azure DevOps リポジトリを Datadog に接続するための [Azure ソースコードセットアップ手順][4] を参照してください。

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/integrations/azure-devops-source-code/#setup
[5]: /ja/getting_started/site/

{{% /tab %}}
{{% tab "Bitbucket Cloud" %}}

Bitbucket Cloud ワークスペースを Datadog に接続するには、[Bitbucket ソースコードセットアップ手順][1] を参照してください。

[1]: /ja/integrations/bitbucket-source-code/#setup

{{% /tab %}}
{{% tab "その他" %}}

別のソースコード管理プロバイダーを使用している場合は、`datadog-ci` CLI ツールを使用して CI パイプラインで実行し、Datadog に [結果をアップロード](#upload-third-party-sbom-to-datadog)するように SCA を構成します。

{{% /tab %}}
{{< /tabs >}}

## Datadog のサービスとチームに検出結果をリンクする {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}

## Datadog へのサードパーティ SBOM のアップロード{#upload-third-party-sbom-to-datadog}

Datadog は [Datadog SBOM ジェネレーター][10] の使用を推奨していますが、サードパーティの SBOM を取り込むことも可能です。

他のツールで生成された SBOM が以下の要件を満たしている場合、その SBOM をアップロードできます。
- 有効な CycloneDX [1.4][18]、[1.5][19]、または [1.6][20] JSON スキーマ
- すべてのコンポーネントのタイプが `library` であること
- すべてのコンポーネントに有効な `purl` 属性がああること

サードパーティ SBOM ファイルは、[`datadog-ci`](https://github.com/DataDog/datadog-ci/?tab=readme-ov-file#how-to-install-the-cli) コマンドを使用して Datadog にアップロードされます。

オプションの引数やその他の情報については、`datadog-ci` [README][22] を参照してください。

サードパーティ SBOM をアップロードするには、以下のコマンドを使用できます。環境変数 `DD_API_KEY`、`DD_APP_KEY`、および`DD_SITE` が
それぞれ API キー、APP キー、[Datadog サイト][12] に設定されていることを確認します。

```bash
datadog-ci sbom upload /path/to/third-party-sbom.json
```

<div class="alert alert-info">
リポジトリに対して自動スキャンがすでに有効になっている場合、手動でアップロードを行うと、そのコミットの既存の結果が置き換えられます。
</div>


## 到達可能な脆弱性によるフィルタリング {#filter-by-reachable-vulnerabilities}

Datadog の静的到達可能性分析は、チームは依存関係内の脆弱なコードパスがアプリケーションコード内で参照されているかどうかを評価する上で役だちます。この機能は、静的に到達不可能な脆弱性を特定することで、より効果的な優先順位付けをサポートし、差し迫ったリスクを最小限に抑えます。

この機能は、`--reachability` フラグを有効にして [Datadog SBOM ジェネレーター][1] を使用する場合、または Datadog がホストするインフラストラクチャーを通じてスキャンを実行する場合にのみサポートされます。

到達可能性分析は Java プロジェクト専用であり、定義された一連の審査済みセキュリティアドバイザリにのみ適用されます。このセットに含まれていない脆弱性は、到達可能性評価の対象外となります。

{{% collapse-content title="サポートされているアドバイザリ" level="h3" expanded=true id="supported-advisories" %}}
静的到達可能性分析は、以下のアドバイザリで利用可能です。
- [GHSA-h7v4-7xg3-hxcc](https://osv.dev/vulnerability/GHSA-h7v4-7xg3-hxcc)
- [GHSA-jfh8-c2jp-5v3q](https://osv.dev/vulnerability/GHSA-jfh8-c2jp-5v3q)
- [GHSA-7rjr-3q55-vv33](https://osv.dev/vulnerability/GHSA-7rjr-3q55-vv33)
- [GHSA-2p3x-qw9c-25hh](https://osv.dev/vulnerability/GHSA-2p3x-qw9c-25hh)
- [GHSA-cm59-pr5q-cw85](https://osv.dev/vulnerability/GHSA-cm59-pr5q-cw85)
- [GHSA-qrx8-8545-4wg2](https://osv.dev/vulnerability/GHSA-qrx8-8545-4wg2)
- [GHSA-p8pq-r894-fm8f](https://osv.dev/vulnerability/GHSA-p8pq-r894-fm8f)
- [GHSA-64xx-cq4q-mf44](https://osv.dev/vulnerability/GHSA-64xx-cq4q-mf44)
- [GHSA-g5w6-mrj7-75h2](https://osv.dev/vulnerability/GHSA-g5w6-mrj7-75h2)
- [GHSA-xw4p-crpj-vjx2](https://osv.dev/vulnerability/GHSA-xw4p-crpj-vjx2)
- [GHSA-cxfm-5m4g-x7xp](https://osv.dev/vulnerability/GHSA-cxfm-5m4g-x7xp)
- [GHSA-3ccq-5vw3-2p6x](https://osv.dev/vulnerability/GHSA-3ccq-5vw3-2p6x)
- [GHSA-mjmj-j48q-9wg2](https://osv.dev/vulnerability/GHSA-mjmj-j48q-9wg2)
- [GHSA-36p3-wjmg-h94x](https://osv.dev/vulnerability/GHSA-36p3-wjmg-h94x)
- [GHSA-ww97-9w65-2crx](https://osv.dev/vulnerability/GHSA-ww97-9w65-2crx)
- [GHSA-8jrj-525p-826v](https://osv.dev/vulnerability/GHSA-8jrj-525p-826v)
- [GHSA-4wrc-f8pq-fpqp](https://osv.dev/vulnerability/GHSA-4wrc-f8pq-fpqp)
- [GHSA-4cch-wxpw-8p28](https://osv.dev/vulnerability/GHSA-4cch-wxpw-8p28)
- [GHSA-6w62-hx7r-mw68](https://osv.dev/vulnerability/GHSA-6w62-hx7r-mw68)
- [GHSA-2q8x-2p7f-574v](https://osv.dev/vulnerability/GHSA-2q8x-2p7f-574v)
- [GHSA-rmr5-cpv2-vgjf](https://osv.dev/vulnerability/GHSA-rmr5-cpv2-vgjf)
- [GHSA-4jrv-ppp4-jm57](https://osv.dev/vulnerability/GHSA-4jrv-ppp4-jm57)
- [GHSA-mw36-7c6c-q4q2](https://osv.dev/vulnerability/GHSA-mw36-7c6c-q4q2)
- [GHSA-hph2-m3g5-xxv4](https://osv.dev/vulnerability/GHSA-hph2-m3g5-xxv4)
- [GHSA-j9h8-phrw-h4fh](https://osv.dev/vulnerability/GHSA-j9h8-phrw-h4fh)
- [GHSA-3gm7-v7vw-866c](https://osv.dev/vulnerability/GHSA-3gm7-v7vw-866c)
- [GHSA-645p-88qh-w398](https://osv.dev/vulnerability/GHSA-645p-88qh-w398)
- [GHSA-g5h3-w546-pj7f](https://osv.dev/vulnerability/GHSA-g5h3-w546-pj7f)
- [GHSA-c27h-mcmw-48hv](https://osv.dev/vulnerability/GHSA-c27h-mcmw-48hv)
- [GHSA-r4x2-3cq5-hqvp](https://osv.dev/vulnerability/GHSA-r4x2-3cq5-hqvp)
- [GHSA-24rp-q3w6-vc56](https://osv.dev/vulnerability/GHSA-24rp-q3w6-vc56)
- [GHSA-c9hw-wf7x-jp9j](https://osv.dev/vulnerability/GHSA-c9hw-wf7x-jp9j)
- [GHSA-4gq5-ch57-c2mg](https://osv.dev/vulnerability/GHSA-4gq5-ch57-c2mg)
- [GHSA-vmfg-rjjm-rjrj](https://osv.dev/vulnerability/GHSA-vmfg-rjjm-rjrj)
- [GHSA-crg9-44h2-xw35](https://osv.dev/vulnerability/GHSA-crg9-44h2-xw35)
- [GHSA-qmqc-x3r4-6v39](https://osv.dev/vulnerability/GHSA-qmqc-x3r4-6v39)
- [GHSA-4w82-r329-3q67](https://osv.dev/vulnerability/GHSA-4w82-r329-3q67)
- [GHSA-qr7j-h6gg-jmgc](https://osv.dev/vulnerability/GHSA-qr7j-h6gg-jmgc)
- [GHSA-9mxf-g3x6-wv74](https://osv.dev/vulnerability/GHSA-9mxf-g3x6-wv74)
- [GHSA-f3j5-rmmp-3fc5](https://osv.dev/vulnerability/GHSA-f3j5-rmmp-3fc5)
{{% /collapse-content %}}

## データ保持 {#data-retention}

Datadog は、当社の [Data Retention Periods](https://docs.datadoghq.com/ja/data_security/data_retention_periods/) に従って検出結果を保存します。Datadog はお客様のソースコードを保存または保持しません。

## 参考資料 {#further-reading}

{{< whatsnext desc="SCA の詳細:">}}
    {{< nextlink href="/security/code_security/software_composition_analysis/setup_runtime/" >}}ライブラリの脆弱性のランタイム検出のセットアップ{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="リポジトリに対するその他の Code Security スキャン:">}}
    {{< nextlink href="/security/code_security/static_analysis/" >}}Static Code Analysis (SAST){{< /nextlink >}}
    {{< nextlink href="/security/cloud_security_management/iac_scanning/" >}}Infrastructure as Code (IaC){{< /nextlink >}}
    {{< nextlink href="/security/code_security/secret_scanning/" >}}シークレットスキャン{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/security/code_security/software_composition_analysis/
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: /ja/security/code_security/software_composition_analysis/setup_static
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /ja/getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
[6]: /ja/account_management/api-app-keys/
[7]: /ja/integrations/github
[8]: https://github.com/DataDog/datadog-ci
[9]: /ja/security/code_security/dev_tool_int/github_pull_requests/
[10]: https://github.com/DataDog/datadog-sbom-generator
[12]: /ja/getting_started/site/
[13]: https://github.com/DataDog/datadog-static-analyzer-github-action
[14]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sbom
[15]: https://docs.datadoghq.com/ja/internal_developer_portal/catalog/entity_model/
[16]: https://docs.datadoghq.com/ja/account_management/teams/
[17]: https://app.datadoghq.com/source-code/repositories
[18]: https://cyclonedx.org/docs/1.4/json/
[19]: https://cyclonedx.org/docs/1.5/json/
[20]: https://cyclonedx.org/docs/1.6/json/
[21]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[22]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-sbom
[23]: https://docs.datadoghq.com/ja/internal_developer_portal/catalog/entity_model/?tab=v30#codelocations
[24]: https://docs.datadoghq.com/ja/internal_developer_portal/catalog/entity_model/?tab=v30#migrating-to-v30
[25]: https://docs.datadoghq.com/ja/data_security/data_retention_periods/
[26]: https://docs.datadoghq.com/ja/account_management/teams/
[101]: https://docs.datadoghq.com/ja/internal_developer_portal/catalog/entity_model/
[102]: https://docs.datadoghq.com/ja/internal_developer_portal/catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/ja/data_security/data_retention_periods/
[27]: /ja/security/code_security/troubleshooting/#scan-java-jar-directories
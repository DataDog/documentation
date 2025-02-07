---
algolia:
  tags:
  - コード分析
  - Code Analysis Datadog
  - Code Analysis CI パイプライン
  - Code Analysis CI パイプライン
aliases:
- /ja/code_analysis/faq
further_reading:
- link: https://www.datadoghq.com/blog/datadog-code-analysis/
  tag: ブログ
  text: Datadog Code Analysis で高品質かつセキュアなコードを迅速にリリース
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: ブログ
  text: Datadog Software Composition Analysis でサードパーティライブラリの脆弱性を軽減する
- link: /code_analysis/
  tag: ドキュメント
  text: Code Analysis について
- link: /security/application_security/software_composition_analysis
  tag: ドキュメント
  text: Software Composition Analysis について
title: Code Analysis の概要
---

## 概要

[Datadog Code Analysis][1] を使用すると、本番環境にデプロイする前にコード品質の問題やセキュリティ脆弱性を特定して解決できるため、ソフトウェア開発ライフサイクル全体を通じて安全でクリーンなコードを保つことができます。

{{< img src="/code_analysis/repositories.png" alt="Session Replay を利用できるボタン、および可視化オプション" style="width:100%" >}}

Code Analysis は、[Static Analysis][2] や [Software Composition Analysis][3] などの包括的なツール群を提供し、ソフトウェアの配信全体を改善します。

* Static Analysis (SAST) は、ファーストパーティのコードに品質やセキュリティの問題がないかリポジトリをスキャンし、これらの問題が本番環境に影響を与えないようにするための修正を提案します。
* Software Composition Analysis (SCA) は、インポートされたオープンソースライブラリについてコードベースをスキャンし、依存関係を管理し、外部からの脅威からアプリケーションを保護するのに役立ちます。

[`datadog-ci`][5] を使用することで、他のプロバイダーの分析を開発ワークフローに統合し、Static Analysis や SCA の結果を直接 Datadog に送信できます。[**Repositories** ページ][6]では、各リポジトリの最新のスキャン結果にアクセスでき、すべてのブランチでコードの健全性を効率的に監視・強化できます。

## Code Analysis のセットアップ

Datadog で直接、または CI パイプラインで実行されているコードに対してスキャンを実行するように Code Analysis を構成できます。開始するには、[**Software Delivery** &gt; **Code Analysis** &gt; **Repositories**][6] に移動し、**+ Add a Repository** をクリックします。

{{< tabs >}}
{{% tab "Datadog ホスティング" %}}

Datadog ホストによるスキャンを使用すると、コードは CI パイプライン内ではなく Datadog のインフラストラクチャー上でスキャンされます。Datadog はコードを読み取り、静的アナライザを実行して静的分析 (Static Analysis) および/またはソフトウェア構成分析 (Software Composition Analysis) を行い、その結果をアップロードします。

Datadog ホストによるスキャンを利用すれば、CI パイプラインの構成が不要となり、Code Analysis を直接利用できます。

追加した GitHub アカウントごとに [GitHub インテグレーション][101]をセットアップし、GitHub リポジトリの Code Analysis を有効にします。

{{< img src="/code_analysis/setup/enable_account.png" alt="Session Replay を利用できるボタン、および可視化オプション" style="width:100%" >}}

Software Composition Analysis (SCA) を有効にしてオープンソースライブラリの脆弱性、ライセンス問題、サプライチェーンリスクを全リポジトリに対してスキャンするか、**Repositories** サイドパネルで個々のリポジトリに対して SCA を有効にすることができます。

{{< img src="/code_analysis/setup/enable_repository.png" alt="Session Replay を利用できるボタン、および可視化オプション" style="width:100%" >}}

[101]: /ja/integrations/github/

{{% /tab %}}
{{% tab "CI パイプラインで" %}}

リポジトリで実行するスキャンの種類を以下から選択します。

* [Static Analysis][101]: コードに不備や脆弱性がないか調べます。
* [Software Composition Analysis][102]: サードパーティのライブラリに脆弱性がないか調べます。

[GitHub](#github) や[他のプロバイダー](#other-providers)などのソースコード管理 (SCM) プロバイダーを選択します。

### GitHub

GitHub リポジトリを使用している場合は、[GitHub インテグレーション][103]をセットアップし、リポジトリを接続して Static Analysis と Software Composition Analysis のスキャンを有効にできます。

{{< img src="/getting_started/code_analysis/github_accounts.png" alt="GitHub アカウントの Connect Repositories ボタンをクリックします。" style="width:100%" >}}

[GitHub プルリクエスト][105]のコメントはデフォルトで有効になっています。 Code Analysis Setup ページの **Connect Repositories** をクリックし、PR Permissions 列の Missing フラグにカーソルを合わせると、アカウントで更新が必要な権限が表示されます。

{{< img src="/getting_started/code_analysis/missing_permissions.png" alt="Missing ピルにカーソルを合わせると、リポジトリの更新が必要な権限が表示されます。" style="width:100%" >}}

この機能を無効にするには、[**Code Analysis Settings** ページ][106]に移動し、GitHub Comments 列のトグルをクリックします。

{{< img src="/getting_started/code_analysis/github_comments_setting.png" alt="GitHub Comments 列のトグルをクリックして、接続している GitHub リポジトリの Code Analysis を有効または無効にします。" style="width:100%" >}}

### その他のプロバイダー

その他のプロバイダーについては、CI パイプラインプラットフォームで Datadog CLI を直接実行できます。詳細は、[Static Analysis の一般的な CI プロバイダー][107]および [Software Composition Analysis の一般的な CI プロバイダー][108]を参照してください。

結果が [**Repositories ページ**][109]に表示されるためには、デフォルトブランチで[リポジトリの解析を実行する](#run-code-analysis-in-your-ci-provider)必要があります。

## CI プロバイダーで Code Analysis を実行

Datadog に結果をアップロードするには、[Datadog API キーとアプリケーションキー][110]を持っていることを確認します。

`dd_service` フィールドに `shopist` などのサービス名やライブラリ名を指定します。

### GitHub Action

GitHub アクションを構成して、CI ワークフローの一部として Static Analysis と Software Composition Analysis のスキャンを実行できます。

以下の内容で `.github/workflows/datadog-static-analysis.yml` ファイルをリポジトリに作成します。

```yaml
on: [push]

name: Datadog Static Analysis

jobs:
  static-analysis:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check code meets quality and security standards
      id: datadog-static-analysis
      uses: DataDog/datadog-static-analyzer-github-action@v1
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: datadoghq.com
        cpu_count: 2
```

次に、以下の内容で `.github/workflows/datadog-sca.yml` ファイルをリポジトリに作成します。

```yaml
on: [push]

name: Datadog Software Composition Analysis

jobs:
  software-composition-analysis:
    runs-on: ubuntu-latest
    name: Datadog SBOM Generation and Upload
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check imported libraries are secure and compliant
      id: datadog-software-composition-analysis
      uses: DataDog/datadog-sca-github-action@main
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_service: shopist
        dd_env: ci
        dd_site: datadoghq.com
```

### カスタマイズ可能なスクリプト

[datadog-ci NPM パッケージ][111]を使用して、Static Analysis の結果を含む SARIF レポートまたは Software Composition Analysis の結果を含む SBOM レポートを Datadog にアップロードできます。

#### Static Analysis

Static Analysis レポートを Datadog にアップロードするには、Unzip と Node.js バージョン 14 以降をインストールする必要があります。

CI パイプライン構成に以下の内容を追加します。

```shell
# Datadog サイトへの情報送信設定
export DD_SITE="datadoghq.com"

# 依存関係のインストール
npm install -g @datadog/datadog-ci 

# 最新の Datadog Static Analyzer のダウンロード:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip

curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Static Analysis の実行
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif

# 結果のアップロード
datadog-ci sarif upload /tmp/report.sarif --service "shopist" --env "ci"
```

#### Software Composition Analysis

Software Composition Analysis の結果を Datadog にアップロードするには、Trivy と Node.js のバージョン 14 以降をインストールする必要があります。

CI パイプライン構成に以下の内容を追加します。

```shell
# Datadog サイトへの情報送信設定
export DD_SITE="datadoghq.com"

# 依存関係のインストール
npm install -g @datadog/datadog-ci

# 最新の Datadog OSV Scanner のダウンロード:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# OSV Scanner のインストール
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
cd /osv-scanner && unzip osv-scanner.zip
chmod 755 /osv-scanner/osv-scanner

# OSC Scanner 結果の出力
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# 結果のアップロード
datadog-ci sbom upload --service "shopist" --env "ci" /tmp/sbom.json
```

これらのスクリプトを構成したら、デフォルトブランチでリポジトリの分析を実行します。すると、**Repositories** ページに結果が表示されるようになります。

[101]: /ja/code_analysis/static_analysis
[102]: /ja/code_analysis/software_composition_analysis
[103]: /ja/integrations/github
[104]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions
[105]: /ja/code_analysis/github_pull_requests
[106]: https://app.datadoghq.com/ci/settings/code-analysis
[107]: /ja/code_analysis/static_analysis/generic_ci_providers
[108]: /ja/code_analysis/software_composition_analysis/generic_ci_providers
[109]: https://app.datadoghq.com/ci/code-analysis
[110]: /ja/account_management/api-app-keys/
[111]: https://www.npmjs.com/package/@datadog/datadog-ci

{{% /tab %}}
{{< /tabs >}}

## IDE で Static Analysis を実行

[Datadog IDE プラグイン][7]をインストールすると、Static Analysis スキャンをローカルで実行し、結果をコードエディタで直接確認できます。変更をコミットする前に、コードの保守性の問題、バグ、セキュリティ脆弱性などを検出し、修正することができます。

IDE で Static Analysis スキャンを実行するには、選択したコードエディタの各ドキュメントを参照してください。

{{< partial name="code_analysis/ide-plugins.html" >}}

</br>


## GitHub のプルリクエストで Code Analysis のコメントを有効にする

Code Analysis を GitHub のプルリクエストに統合することで、コード違反に自動的にフラグを付け、レビュープロセスにおけるコード品質を向上させることができます。

{{< img src="/getting_started/code_analysis/github_suggestion.png" alt="GitHub プルリクエスト内の Code Analysis からの提案" style="width:100%" >}}

構成すると、Code Analysis は PR に直接コメントし、名前、ID、重大度、推奨される修正などの詳細で違反を示し、GitHub UI から直接適用できます。

[適切なコンフィギュレーションファイル][10]をリポジトリに追加したら、Datadog で [GitHub アプリ][11]を作成します (新規アプリまたは既存アプリの更新)。このアプリがプルリクエストに対して適切な読み取りと書き込みのアクセス権を持っていることを確認してください。

アプリを構成したら、**Code Analysis Settings** ページに移動し、各リポジトリの **GitHub Comments** 列のトグルをクリックします。

{{< img src="/getting_started/code_analysis/github_comments_setting.png" alt="GitHub プルリクエストで Code Analysis のコメントを有効または無効にするリポジトリごとのトグル" style="width:100%" >}}

詳細については、[GitHub プルリクエスト][12]を参照してください。

## リポジトリの検索と管理

[**Repositories** ページ][6]でリポジトリをクリックすると、検索クエリをブランチ別 (デフォルトのブランチが最初に表示されます) やコミット別 (最新のものから始まります) にカスタマイズできる、より詳細なビューにアクセスできます。

{{< img src="/getting_started/code_analysis/sca_vulnerabilities.png" alt="リポジトリのデフォルトブランチと最新コミットによる Code Analysis 結果の Library Vulnerabilities ビュー" style="width:100%" >}}

{{< tabs >}}
{{% tab "Static Analysis" %}}

以下のすぐに使えるファセットを使用して、**Code Quality** タブで劣悪なコーディングプラクティスを特定および解決するための検索クエリ、または **Code Vulnerabilities** タブでセキュリティリスクを特定および解決するための検索クエリを作成できます。

| Facet Name                        | 説明                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| Result Status                     | 分析の完了ステータスに基づいて結果をフィルタリングします。         |
| Rule ID                           | 発見内容のトリガーとなった特定のルール。                             |
| Tool Name                         | どのツールが分析に貢献したかを判断します。                     |
| CWE (共通脆弱性列挙) | 認識された脆弱性カテゴリーによって発見内容をフィルタリングします。                |
| Has Fixes                         | 修正提案が利用可能な問題をフィルタリングします。                 |
| Result Message                    | 発見内容に関連する簡潔な説明やメッセージを含みます。 |
| Rule Description                  | 各ルールの根拠を含みます。                                |
| Source File                       | 問題が検出されたファイルが含まれます。                          |
| Tool Version                      | 使用したツールのバージョンによって結果をフィルタリングします。                       |

結果から修正提案に直接アクセスして、コード品質プラクティスを改善し、セキュリティ脆弱性に対処することができます。

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="Code Analysis 結果の Fixes タブにあるコード修正案" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

以下のすぐに使えるファセットを使用して、**Library Vulnerabilities** タブでサードパーティライブラリのセキュリティリスクを特定して対処するための検索クエリを作成したり、**Library Catalog** タブでライブラリのインベントリを確認したりできます。

| Facet Name         | 説明                                                    |
|--------------------|----------------------------------------------------------------|
| Dependency Name    | ライブラリを名前で識別します。                              |
| Dependency Version | ライブラリの特定のバージョンでフィルタリングします。                     |
| 言語           | ライブラリをプログラミング言語で並べ替えます。                   |
| スコア              | 依存関係のリスクスコアまたは品質スコアを並べ替えます。           |
| 重大度           | 重大度評価に基づいて脆弱性をフィルタリングします。        |
| プラットフォーム           | ライブラリを対象プラットフォームで区別します。 |

脆弱性レポートにアクセスし、ファイルのコード所有者に関する情報とともに、プロジェクト内で脆弱性が発見されたソースファイルを検索できます。

{{< img src="/getting_started/code_analysis/sci_vulnerabilities.png" alt="検出されたライブラリの脆弱性から GitHub にあるソースコードへの直接のリンク" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## サービスカタログで結果を調査

サービスに関連するコード違反や静的分析で検出されたコード違反を調査し、それらが原因となる遅延や障害を特定・解決します。 [**Service Management** > **Services** > **Service Catalog**][13] に移動し、**Delivery** ビューをクリックしてサービスの本番投入前の状態を分析してください。

{{< img src="/getting_started/code_analysis/catalog_view.png" alt="検出されたライブラリの脆弱性から GitHub にあるソースコードへの直接のリンク" style="width:100%" >}}

サービスをクリックすると、サイドパネルの **Delivery** タブにある Code Analysis からセキュリティ脆弱性やコード品質の問題に加えて、Pipeline Visibility から CI パイプラインに関する情報にアクセスできます。

{{< img src="/getting_started/code_analysis/catalog_service.png" alt="検出されたライブラリの脆弱性から GitHub にあるソースコードへの直接のリンク" style="width:100%" >}}

### サービスをコード違反およびライブラリと関連付ける

Datadog は以下のメカニズムを用いて、コード違反またはライブラリを関連するサービスに紐付けます。

1. [Service Catalog を用いてサービスに紐付くコード位置を特定する](#identifying-the-code-location-in-the-service-catalog)
2. [追加の Datadog 製品内でのファイル使用パターンを検出する](#detecting-file-usage-patterns)
3. [ファイルパスやリポジトリ名からサービス名を検索する](#detecting-service-name-in-paths-and-repository-names)

いずれかの方法で成功すれば、それ以上のマッピングは行われません。各マッピング手法の詳細は以下をご覧ください。

#### Service Catalog でコードの位置を特定する

Service Catalog のスキーマバージョン `v3` 以降では、サービスに対応するコード位置のマッピングを追加できます。`codeLocations` セクションでは、コードを含むリポジトリと関連パスを指定します。

`paths` 属性は、リポジトリ内のパスに一致する [glob][14] の一覧です。

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - path/to/service/code/**
{{< /code-block >}}


#### ファイル使用パターンの検出

Datadog は Error Tracking などの追加製品でファイル使用状況を検出し、それらを実行時のサービスに関連付けます。例えば、`foo` というサービスが `/modules/foo/bar.py` というパスを含むログエントリやスタックトレースを持っていれば、`/modules/foo/bar.py` は `foo` サービスに関連付けられます。

#### パスやリポジトリ名からサービス名を検出する

Datadog はパスやリポジトリ名からサービス名を検出し、一致があればファイルをそのサービスに関連付けます。

例えば、`myservice` というサービス名と `https://github.com/myorganization/myservice.git` というリポジトリ URL があれば、そのリポジトリ内のすべてのファイルは `myservice` に関連付けられます。

リポジトリで一致しなかった場合はファイルの `path` を用いて一致を試みます。`myservice` というサービス名があり、パスが `/path/to/myservice/foo.py` であれば、パス内にサービス名が含まれるためそのファイルは `myservice` に関連付けられます。パス内に 2 つ以上のサービス名が含まれる場合は、ファイル名に最も近いサービス名が選ばれます。


### チームをコード違反およびライブラリに関連付ける

Datadog は、コード違反やライブラリ問題が検出された際、そのサービスに紐付くチームを自動的に関連付けます。例えば、`domains/ecommerce/apps/myservice/foo.py` が `myservice` に関連付けられていれば、このファイルで検出された違反にはチーム `myservice` が関連付けられます。

サービスやチームが見つからない場合、Datadog はリポジトリ内の `CODEOWNERS` [ファイル][15]を使用します。`CODEOWNERS` ファイルは、Git プロバイダー上でどのチームがファイルを所有するかを決定します。

**注**: この機能を正しく動作させるには、Git プロバイダー上のチームを [Datadog チーム][16]に正確にマッピングする必要があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/code_analysis/
[2]: /ja/code_analysis/static_analysis
[3]: /ja/code_analysis/software_composition_analysis
[4]: /ja/security/application_security/software_composition_analysis
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /ja/code_analysis/ide_plugins
[9]: https://app.datadoghq.com/dash/integration/31166/software-delivery---static-analysis-overview
[10]: /ja/code_analysis/static_analysis/github_actions/
[11]: /ja/code_analysis/github_pull_requests/#update-an-existing-github-app
[12]: /ja/code_analysis/github_pull_requests
[13]: https://app.datadoghq.com/services 
[14]: https://en.wikipedia.org/wiki/Glob_(programming)
[15]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[16]: /ja/account_management/teams/
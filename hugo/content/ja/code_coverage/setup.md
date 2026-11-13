---
description: GitHub または GitLab と統合し、権限を設定して PR ゲートを作成し、カバレッジレポートをアップロードして Code Coverage
  を構成します。
further_reading:
- link: /code_coverage
  tag: ドキュメント
  text: Code Coverage
- link: /code_coverage/configuration
  tag: ドキュメント
  text: Code Coverage を構成
- link: /code_coverage/flags
  tag: ドキュメント
  text: フラグを使用してカバレッジデータを整理
- link: /code_coverage/data_collected
  tag: ドキュメント
  text: Code Coverage で収集されるデータについて説明します
- link: /code_coverage/monorepo_support
  tag: ドキュメント
  text: Code Coverage が大規模なモノレポをどのようにサポートするかについて説明します
title: Code Coverage の設定
---
Code Coverage の設定には、以下の手順が含まれます。

1. Datadog UI で [ソースコードプロバイダー](#integrate-with-source-code-provider)との統合を構成します。
2. Datadog でコードカバレッジの[データアクセス権限](#data-access-permissions)を構成します。
3. 必要に応じて、カバレッジのしきい値に基づいてプルリクエストをブロックする [PR Gate](#pr-gates) を構成します。
4. CI パイプラインを更新して、[コードカバレッジレポートを Datadog にアップロード](#upload-code-coverage-reports)します。

## ソースコードプロバイダーとの統合 {#integrate-with-source-code-provider}

Code Coverage は以下をサポートしています。

{{< tabs >}}
{{% tab "GitHub" %}}

GitHub リポジトリを Datadog に接続する方法については、[GitHub 統合ドキュメント][1]の手順に従ってください。

Code Coverage には、以下の GitHub App 権限が必要です。
| 権限 | アクセスレベル | 目的 |
|---|---|---|
| コンテンツ | 読み取り | 詳細なカバレッジ UI にソースコードを表示します。|
| プルリクエスト | 書き込み | カバレッジ UI に PR データを表示し、PR コメントを書き込みます。|
| チェック | 書き込み | カバレッジ PR ゲートを作成します。|

以下の Webhook が必要です。
| Webhook | 目的 |
|---|---|
| プルリクエスト | PR データの更新を受信します。|
| プルリクエストレビュー | PR データの更新を受信します。|
| プルリクエストレビューコメント | PR データの更新を受信します。|
| プッシュ | Git コミットメタデータを受信します。|

すべてが正しく構成されている場合、Datadog の[GitHub 統合][2]ページに緑色のチェックマークが表示されます。
{{< img src="/code_coverage/github_app_success.png" alt="GitHub App 統合の成功チェック" style="width:100%" >}}

<div class="alert alert-info">Datadog 管理の Marketplace App またはデフォルト設定のカスタムアプリを使用している場合、必要な権限と Webhook が含まれています。</div>

[1]: /ja/integrations/github/#github-apps-1
[2]: https://app.datadoghq.com/integrations/github/configuration
{{% /tab %}}
{{% tab "GitLab" %}}

GitLab リポジトリを Datadog に接続する方法については、[GitLab ソースコード統合ドキュメント][1]の手順に従ってください。

詳細については、[Datadog ソースコード統合ガイド][2]を参照してください。

[1]: /ja/integrations/gitlab-source-code/
[2]: /ja/integrations/guide/source-code-integration/?tab=gitlabsaasonprem#connect-your-git-repositories-to-datadog
{{% /tab %}}
{{% tab "Azure DevOps" %}}

[Datadog ソースコード統合ガイド][1]の手順に従って、Azure DevOps リポジトリを Datadog に接続します。
[Azure DevOps ソースコード統合][2]を使用します。

[1]: /ja/integrations/guide/source-code-integration/?tab=azuredevopssaasonly#connect-your-git-repositories-to-datadog
[2]: https://app.datadoghq.com/integrations/azure-devops-source-code/
{{% /tab %}}
{{< /tabs >}}

ソースコードプロバイダーから収集されるデータの詳細については、[収集されるデータ][1]を参照してください。

## データアクセス権限 {#data-access-permissions}

[Datadog 管理ロール][3]ではなく[カスタムロール][2]を使用している場合は、コードカバレッジデータを表示する必要があるロールに対して、{{< ui >}}Code Coverage Read{{< /ui >}} 権限を必ず有効にしてください。

[ロール設定][4]に移動し、必要なロールの {{< ui >}}Edit{{< /ui >}} をクリックして、そのロールに {{< ui >}}Code Coverage Read{{< /ui >}} 権限を追加し、変更を保存します。

より詳細な制御を行うには、[Data Access Control][19] を使用して、組織全体ではなくリポジトリごとにコードカバレッジデータを制限します。これにより、ソースパスやテスト名など、カバレッジレポート内の機密情報がチームの境界を越えることを防ぎます。

Datadog で、**Organization Settings > Data Access Control** に移動し、Software Delivery と制限したいリポジトリをスコープとする制限付きデータセットを作成します。それを表示する必要があるロールまたはチームにアクセス権を付与します。

## PR ゲート{#pr-gates}

PR カバレッジでゲートを設定したい場合は、次の 2 つの方法のいずれかで PR ゲートのルールを設定できます。

- **Datadog UI**: [PR ゲートのルール作成][5]に移動し、合計カバレッジまたはパッチカバレッジでゲートを設定するルールを構成します。
- **YAML 構成ファイル**: [`code-coverage.datadog.yml`][6] ファイルでゲートを定義します。これにより、リポジトリと一緒にコードとしてゲートを管理できます。

プルリクエストが開かれたとき、または更新されたときに、両方のソースのルールが評価されます。YAML ゲートの構文と例については、[構成][6]を参照してください。

## コードカバレッジレポートをアップロードする {#upload-code-coverage-reports}

サポートされている Test Optimization ライブラリを使用して自動的に、または CI 環境で `datadog-ci` CLI を実行して手動で、コードカバレッジレポートファイルを Datadog にアップロードします。

コードカバレッジレポートのアップロード中に収集されるデータの詳細については、[収集されるデータ][7]を参照してください。

### Test Optimization でレポートを自動的にアップロードする{#upload-reports-automatically-with-test-optimization}

#### サポートされているライブラリとバージョン {#supported-libraries-and-versions}

自動コードカバレッジレポートのアップロードは、以下の Test Optimization ライブラリのバージョンでサポートされています。

| ライブラリ | 最初にサポートされるバージョン | カバレッジソース |
|---|---|---|
| Ruby `datadog-ci` | `1.27.0` | SimpleCov |
| JavaScript `dd-trace` 5.x | `5.85.0` | Jest、Vitest、または NYC カバレッジ |
| JavaScript `dd-trace` 6.x | `6.0.0` | Jest、Vitest、または NYC カバレッジ |
| Python `ddtrace` | `4.4.0` | `coverage.py` |を使用するデフォルトの pytest プラグイン
| Java `dd-java-agent` | `1.53.0` | JaCoCo |

これらのバージョン要件は、Test Optimization ライブラリによる自動アップロードにのみ適用されます。

#### 自動アップロードを有効にする {#enable-automatic-uploads}

{{< ui >}}Code Coverage{{< /ui >}} 設定は、組織、リポジトリ、またはテストサービスのレベルで適用できます。

1. ライブラリの [Test Optimization のセットアップ][17]を完了してください。
2. サポートされているバージョンのライブラリにアップグレードしてください。
3. [{{< ui >}}Code Coverage{{< /ui >}}][8] で {{< ui >}}CI/CD Optimization settings{{< /ui >}} をオンにしてください。

    {{< img src="/code_coverage/automatic_code_coverage_upload_setting.png" alt="組織レベルの CI/CD Optimization 設定にある Code Coverage のトグル。" style="width:100%" >}}

4. [サポートされているライブラリとバージョン](#supported-libraries-and-versions)に記載されているソースからカバレッジレポートを生成するテストコマンドを実行してください。

コマンドが終了すると、ライブラリがレポートを Datadog にアップロードします。

ライブラリによってアップロードされたレポートを整理およびフィルタリングするには、[自動アップロードされたレポートへのフラグの追加][9]を参照してください。このページには、`DD_CODE_COVERAGE_FLAGS` をサポートするライブラリとバージョンが記載されています。

### サポートされているカバレッジレポート形式 {#supported-coverage-report-formats}

Datadog は以下のカバレッジデータ形式をサポートしています。展開して例を確認してください。

{{% collapse-content title="LCOV" level="h4" expanded=false id="lcov" %}}
{{< code-block lang="text" >}}
TN:
SF:src/example.c
FN:3,add
FNDA:5,add
FNF:1
FNH:1
DA:3,5
DA:4,5
DA:5,5
DA:8,0
DA:9,0
LF:5
LH:3
BRDA:4,0,0,5
BRDA:4,0,1,0
BRF:2
BRH:1
end_of_record
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Go Coverprofile" level="h4" expanded=false id="go-coverprofile" %}}
{{< code-block lang="text" >}}
mode: atomic
example/calculator.go:51.148,53.2 1 0
example/calculator.go:55.190,61.15 3 0
example/calculator.go:61.15,64.3 2 0
example/calculator.go:66.2,67.16 2 0
example/calculator.go:67.16,69.3 1 0
example/clients/api_client.go:27.87,31.2 3 2
example/clients/api_client.go:34.85,36.2 1 3
example/clients/api_client.go:39.126,44.2 4 3
example/clients/api_client.go:47.106,50.2 2 3
example/notifications/notifier.go:49.79,51.2 1 3
example/notifications/notifier.go:60.33,69.2 1 0
example/notifications/notifier.go:79.131,86.15 3 2
example/notifications/notifier.go:104.3,104.10 1 3
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Cobertura XML" level="h4" expanded=false id="cobertura-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-04.dtd">
<coverage lines-valid="5" lines-covered="3" line-rate="0.6" branches-valid="2" branches-covered="1" branch-rate="0.5" timestamp="1690658886" version="1.9">
  <sources>
    <source>src</source>
  </sources>
  <packages>
    <package name="example" line-rate="0.6" branch-rate="0.5">
      <classes>
        <class name="Example" filename="example/Example.java" line-rate="0.6" branch-rate="0.5">
          <methods>
            <method name="add" signature="(II)I" line-rate="1.0" branch-rate="1.0">
              <lines>
                <line number="3" hits="5"/>
                <line number="4" hits="5" branch="true" condition-coverage="50% (1/2)"/>
                <line number="5" hits="5"/>
              </lines>
            </method>
          </methods>
          <lines>
            <line number="3" hits="5"/>
            <line number="4" hits="5" branch="true" condition-coverage="50% (1/2)"/>
            <line number="5" hits="5"/>
            <line number="8" hits="0"/>
            <line number="9" hits="0"/>
          </lines>
        </class>
      </classes>
    </package>
  </packages>
</coverage>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Jacoco XML" level="h4" expanded=false id="jacoco-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<report name="Example">
  <sessioninfo id="SessionId" start="1690658886000" dump="1690658887000"/>
  <package name="example">
    <sourcefile name="Example.java">
      <line nr="3" mi="0" ci="5"/>
      <line nr="4" mi="0" ci="5" mb="1" cb="1"/>
      <line nr="5" mi="0" ci="5"/>
      <line nr="8" mi="1" ci="0"/>
      <line nr="9" mi="1" ci="0"/>
    </sourcefile>
  </package>
</report>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Clover XML" level="h4" expanded=false id="clover-xml" %}}
{{< code-block lang="xml" >}}
<coverage generated="1661852015">
    <project timestamp="1661852015">
        <file name="/var/www/html/src/App/Console/CronjobRunnerCommand.php">
            <class name="App\Console\CronjobRunnerCommand" namespace="global">
                <metrics complexity="3" methods="3" coveredmethods="0" conditionals="0" coveredconditionals="0" statements="4" coveredstatements="0" elements="7" coveredelements="0"/>
            </class>
            <line num="18" type="method" name="__construct" visibility="public" complexity="1" crap="2" count="0"/>
            <line num="20" type="stmt" count="1"/>
            <line num="27" type="stmt" count="0"/>
            <line num="30" type="method" name="execute" visibility="protected" complexity="1" crap="2" count="0"/>
            <line num="32" type="stmt" count="0"/>
            <metrics loc="35" ncloc="35" classes="1" methods="3" coveredmethods="0" conditionals="0" coveredconditionals="0" statements="4" coveredstatements="0" elements="7" coveredelements="0"/>
        </file>
        <file name="/var/www/html/src/App/Console/CronjobRunnerCommand2.php">
            <line num="42" type="stmt" count="1"/>
        </file>
    </project>
</coverage>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenCover XML" level="h4" expanded=false id="opencover-xml" %}}
{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="utf-8"?>
<CoverageSession xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Modules>
    <Module hash="ABC123">
      <ModulePath>Example.dll</ModulePath>
      <Files>
        <File uid="1" fullPath="src\example\Example.cs" />
      </Files>
      <Classes>
        <Class>
          <Methods>
            <Method visited="true" cyclomaticComplexity="1" sequenceCoverage="100">
              <FileRef uid="1"/>
              <SequencePoints>
                <SequencePoint vc="5" sl="3" />
                <SequencePoint vc="5" sl="4" />
                <SequencePoint vc="5" sl="5" />
                <SequencePoint vc="0" sl="9" />
              </SequencePoints>
              <BranchPoints>
                <BranchPoint vc="5" sl="4" path="0"/>
                <BranchPoint vc="0" sl="4" path="1"/>
              </BranchPoints>
            </Method>
          </Methods>
        </Class>
      </Classes>
    </Module>
  </Modules>
</CoverageSession>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Simplecov JSON" level="h4" expanded=false id="simplecov-json" %}}
{{< code-block lang="json" >}}
{
  "meta": {
    "simplecov_version": "0.21.2"
  },
  "coverage": {
    "/path/to/file1.rb": {
      "lines": [
        null,
        1,
        2,
        0,
        null,
        1,
        null,
        null,
        null,
        "ignored",
        "ignored",
        "ignored",
        null
      ],
      "branches": []
    },
    "/path/to/file2.rb": {
      "lines": [1, 1, null, 0, 1],
      "branches": []
    }
  }
}
{{< /code-block >}}
{{% /collapse-content %}}

### datadog-ci CLI をインストールしてください {#install-the-datadog-ci-cli}

<div class="alert alert-info">GitHub Actions を使用している場合は、このインストール手順をスキップできます。以下の <a href="#uploading-coverage-reports">GitHub Actions アップロード方法</a>では、専用のアクションを使用して <code>datadog-ci</code> のインストールを自動的に行います。</div>

スタンドアロンバイナリは、[Datadog CI リリース][10]で提供されています。_linux-x64_、_linux-arm64_、_darwin-x64_、_darwin-arm64_ (macOS)、および _win-x64_ (Windows) のアーキテクチャがサポートされています。インストールするには、ターミナルから以下を実行します。

{{< tabs >}}
{{% tab "Linux" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

次に、`datadog-ci` を使用して任意のコマンドを実行します。
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}
{{% /tab %}}

{{% tab "macOS" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

次に、`datadog-ci` を使用して任意のコマンドを実行します。
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}
{{% /tab %}}

{{% tab "Windows" %}}
{{< code-block lang="powershell" >}}
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64" -OutFile "datadog-ci.exe"
{{< /code-block >}}

次に、`Start-Process -FilePath "datadog-ci.exe"` を使用して任意のコマンドを実行します。
{{< code-block lang="powershell" >}}
Start-Process -FilePath "./datadog-ci.exe" -ArgumentList version
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### npm {#npm}

または、CI 環境で Node.js が利用可能な場合は、`npm` を使用して [`datadog-ci`][11] CLI をグローバルにインストールします。

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

#### Docker イメージ {#docker-image}

または、[Datadog CI Docker イメージ][12]に基づくコンテナで実行するように CI ジョブを更新することもできます。
このイメージには `datadog-ci` がプリインストールされており、すぐに使用できます。

### カバレッジレポートのアップロード{#uploading-coverage-reports}

<div class="alert alert-info">
Datadog は、同じコミットに対するすべてのレポートをバックエンドで自動的に集約します。アップロード前にカバレッジレポートをマージする必要はありません。
</div>

コードカバレッジレポートを Datadog にアップロードするには、次のコマンドを実行します。有効な [Datadog API キー][13] (`DD_API_KEY`) と、カバレッジレポートファイル自体またはそれらを含むディレクトリへの 1 つ以上のファイルパスを指定します。

{{< tabs >}}
{{% tab "GitHub Actions" %}}

[Datadog Code Coverage Upload][1] GitHub Action を使用します。このアクションは `datadog-ci` を自動的にインストールして実行するため、追加のセットアップは不要です。

<pre>
<code class="language-yaml" data-lang="yaml">
steps:
- name: Upload coverage reports to Datadog
  uses: DataDog/coverage-upload-github-action@v1
  with:
    api_key: ${{ secrets.DD_API_KEY }}
    site: {{< region-param key="dd_site" >}}
</code>
</pre>

または、`datadog-ci` がインストールされている場合は、直接実行することもできます。

<pre>
<code class="language-yaml" data-lang="yaml">
steps:
- name: Upload coverage reports to Datadog
  run: datadog-ci coverage upload .
  env:
    DD_API_KEY: ${{ secrets.DD_API_KEY }}
    DD_SITE: {{< region-param key="dd_site" >}}
</code>
</pre>

[1]: https://github.com/marketplace/actions/datadog-code-coverage-upload
{{% /tab %}}
{{% tab "GitLab" %}}
<pre>
<code class="language-yaml" data-lang="yaml">
test:
  stage: test
  script:
    - ... # run your tests and generate coverage reports
    - datadog-ci coverage upload . # make sure to add the DD_API_KEY CI/CD variable
</code>
</pre>
{{% /tab %}}
{{% tab "Azure Pipelines" %}}
<code class="language-yaml" data-lang="yaml">
- script: datadog-ci coverage upload --format=clover coverage/clover.xml
  displayName: 'Upload coverage to Datadog'
  env:
    DD_API_KEY: $(DD_API_KEY)
    DD_SITE: 'datadoghq.com'
</code>
{{% /tab %}}
{{< /tabs >}}

このコマンドは、指定されたディレクトリを再帰的に検索してサポートされているカバレッジレポートファイルを探すため、通常は現在のディレクトリ (`.`) を指定するだけで十分です。
[`datadog-ci` ドキュメント][14]で `datadog-ci coverage upload` コマンドの詳細を参照してください。

コードカバレッジレポートのアップロードが完了するとすぐに、Datadog はコードカバレッジのパーセンテージ値を含む PR コメントを追加します。コメントにファイルごとの合計カバレッジとパッチカバレッジの内訳を追加するには、[PR コメント][21]を参照してください。
また、Datadog の [Code Coverage ページ][15]では、プルリクエストごとに集計されたカバレッジデータを表示でき、個々のファイルやコード行を調査することもできます。

{{< img src="/code_coverage/pr_details.png" text="Code Coverage PR details page in Datadog" style="width:100%" >}}

## トラブルシューティング{#troubleshooting}

### カバレッジアップロードコマンドがカバレッジレポートファイルを検出しない {#coverage-upload-command-does-not-detect-coverage-report-files}

`datadog-ci coverage upload` コマンドは、ファイル名や拡張子などのヒューリスティックを使用して、指定されたディレクトリ内のサポートされているカバレッジレポートファイルを自動的に検出します。
カバレッジレポートファイルが想定されるパターンと一致しない場合、コマンドがそれらを自動的に検出できないことがあります。その場合は、レポート形式を指定し、ファイルパスを位置引数として指定してください。たとえば、次のようにします。

{{< code-block lang="shell" >}}
datadog-ci coverage upload --format=lcov \
  src/coverage-reports/unit-tests/coverage.info \
  src/coverage-reports/e2e-tests/coverage.info
{{< /code-block >}}

### カバレッジアップロードが「Format could not be detected」エラーで失敗する {#coverage-upload-fails-with-format-could-not-be-detected-error}

`datadog-ci coverage upload` コマンドは、カバレッジレポートファイルの内容とファイル拡張子に基づいて、その形式を自動的に検出します。
コマンドが以下のエラーで失敗する場合、

```
Invalid coverage report file [...]: format could not be detected
```
以下のように、`--format` オプションを使用して形式を明示的に指定してください。

{{< code-block lang="shell" >}}
datadog-ci coverage upload --format=cobertura reports/cobertura.xml
{{< /code-block >}}

### カバレッジアップロードで「Could not sync git metadata」エラーが出力される {#coverage-upload-outputs-could-not-sync-git-metadata-error}

Git メタデータのアップロードは、CI プロバイダーを Datadog と直接統合できない場合にのみ必要です。
Datadog GitHub アプリや GitLab 統合などの[ソースコードプロバイダー統合][18]を使用している場合は、以下のように `--skip-git-metadata-upload=1` フラグを `datadog-ci coverage upload` コマンドに渡すことで、Git メタデータのアップロードを無効にできます。

{{< code-block lang="shell" >}}
datadog-ci coverage upload --skip-git-metadata-upload=1 .
{{< /code-block >}}

### Datadog UI の PR ビューに変更されたファイルが表示されない {#datadog-ui-does-not-show-changed-files-in-the-pr-view}

デフォルトでは、「Changed files」テーブルには、アップロードされたカバレッジレポートに存在する実行可能なソースコードファイルのみが含まれます。
テーブルヘッダーで {{< ui >}}Non-executable files{{< /ui >}} または {{< ui >}}All{{< /ui >}} を選択すると、実行可能かどうかにかかわらず、PR で変更されたすべてのファイルが表示されます。

{{< img src="/code_coverage/non_executable_files.png" text="In Changed files, you have the option to select Non-executable on the table header" style="width:100%" >}}

ソースコードファイルが誤って実行不可としてマークされている場合、アップロードされたカバレッジレポートから漏れている可能性があります。
関連するすべてのレポートをアップロードしていることを確認し、カバレッジツールの設定を再確認して、該当するすべてのファイルに対してカバレッジデータが収集されていることを確認してください。

テストソースは、カバレッジを測定する本番コードベースの一部ではないため、実行可能なファイルとはみなされません。

### Datadog UI に誤ったファイルパスが表示される {#datadog-ui-shows-incorrect-file-paths}

Code Coverage は、カバレッジレポート内のファイルパスが、絶対パスまたはリポジトリルートからの相対パスであることを前提としています。
レポート内のパスがリポジトリ内の別のディレクトリからの相対パスである場合は、`datadog-ci coverage upload` コマンドを実行する際に `--base-path` オプションを使用して、正しいベースパス (リポジトリルートからの相対パス) を次のように指定してください。

{{< code-block lang="shell" >}}
datadog-ci coverage upload --base-path=frontend/src .
{{< /code-block >}}

### 実行不可能な行による不正確なカバレッジ {#inaccurate-coverage-from-non-executable-lines}

一部のカバレッジツールは、実行不可能な行 (コメント、空白行、閉じ括弧など) をレポートに含め、それらを未カバレッジとしてカウントします。これにより、カバレッジ率が低下し、決して実行されない行に対して誤ったネガティブ (偽陰性) が発生する可能性があります。

アップロード中、CLI はソースファイルを自動的にスキャンしてこれらの実行不可能な行を特定し、カバレッジ計算から除外できるようにします。

ファイル修正は、Go、Kotlin、C/C++、Swift、Objective-C、および PHP の各言語をサポートしています。

この動作は、以下のオプションで制御できます。

- `--disable-file-fixes`: ファイル修正の生成を完全に無効にします。
- `--file-fixes-search-path <dir>`: ソースファイルのスキャンに使用するルートディレクトリを上書きします。デフォルトでは、リポジトリのルートが使用されます。これはモノレポの場合や、カバレッジレポートがコードベースのサブセットのみを対象としている場合に便利です。スキャン対象のディレクトリツリーが制限されるため、スキャンが高速化されます。

### Datadog UI とカバレッジレポートの値の不一致 {#discrepancy-between-datadog-ui-and-coverage-report-values}

Datadog は、同じコミットに対するカバレッジレポートを自動的にマージします。
その結果、Datadog UI に表示されるカバレッジ率が、個々のカバレッジレポートの値と異なる場合があります。特に、それらのレポートに重複するソースコードファイルのエントリが含まれている場合に発生します。

Datadog にアップロードする前に外部ツール ([ReportGenerator][16]など) を使用してカバレッジレポートをマージする場合は、
マージされたレポートにソースコードファイルの重複エントリが含まれないようにしてください。
Datadog はレポート間で重複するファイルを排除 (デデュプリケート) します。これにより、元のカバレッジ値と Datadog UI に表示されるマージ後の値との間に差異が生じる可能性があります。

レポートがどのようにマージされ、各行のステータスがどのようにカウントされるかの詳細については、[Code Coverage Calculation][20] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/code_coverage/data_collected/#source-code-provider-integration
[2]: /ja/account_management/rbac/permissions/#custom-roles
[3]: /ja/account_management/rbac/permissions/#managed-roles
[4]: https://app.datadoghq.com/organization-settings/roles
[5]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[6]: /ja/code_coverage/configuration#pr-gates
[7]: /ja/code_coverage/data_collected/#code-coverage-report-upload
[8]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=organization
[9]: /ja/code_coverage/flags#add-flags-to-automatically-uploaded-reports
[10]: https://github.com/DataDog/datadog-ci/releases
[11]: https://www.npmjs.com/package/@datadog/datadog-ci
[12]: https://hub.docker.com/r/datadog/ci
[13]: https://app.datadoghq.com/organization-settings/api-keys
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-coverage
[15]: https://app.datadoghq.com/ci/code-coverage
[16]: https://reportgenerator.io/
[17]: /ja/tests/setup/
[18]: /ja/code_coverage/setup/#integrate-with-source-code-provider
[19]: https://app.datadoghq.com/organization-settings/data-access-controls
[20]: /ja/code_coverage/coverage_calculation
[21]: /ja/code_coverage/configuration#pr-comments
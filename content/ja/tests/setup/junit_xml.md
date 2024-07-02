---
title: Uploading JUnit test report files to Datadog
code_lang: junit_xml
type: multi-code-lang
code_lang_weight: 60
aliases:
  - /continuous_integration/setup_tests/junit_upload
  - /continuous_integration/tests/junit_upload
  - /continuous_integration/tests/setup/junit_xml
further_reading:
    - link: /continuous_integration/tests
      tag: Documentation
      text: Explore Test Results and Performance
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Troubleshooting CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported.
</div>
{{< /site-region >}}

<div class="alert alert-warning">
  <strong>Note</strong>: Datadog recommends the native instrumentation of tests over uploading JUnit XML files,
  as the native instrumentation provides more accurate time results, supports distributed traces on integration tests
  and other features that are not available with JUnit XML uploads.
  See the <a href="/continuous_integration/tests/#supported-features">Supported Features</a> table for more details.
</div>

## 概要

JUnit test report files are XML files that contain test execution information, such as test and suite names, pass or fail status, duration, and sometimes error logs. Although introduced by the [JUnit][1] testing framework, many other popular frameworks are able to output results using this format.

テストフレームワークで JUnit XML のテストレポートを生成できる場合、Datadog トレーサーを使用した[ネイティブのテストインスツルメンテーション][2]に代わる軽量な方法として、これらを使用することができます。JUnit XML レポートからインポートされたテスト結果は、トレーサーからレポートされたテストデータと一緒に表示されます。

## 互換性

Supported Datadog tracing library:

| Datadog Library | バージョン |
|---|---|
| `datadog-ci` | >= 2.17.0 |

## Datadog CI CLI のインストール

`npm` を使用して [`datadog-ci`][3] CLI をグローバルにインストールします。

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}


### スタンドアロンバイナリ  (ベータ版)

<div class="alert alert-warning"><strong>注</strong>: スタンドアロンバイナリは<strong>ベータ版</strong>であり、その安定性は保証されていません。</div>

CI で Node.js をインストールすることに問題がある場合は、スタンドアロンバイナリが [Datadog CI リリース][4]で提供されています。_linux-x64_、_darwin-x64_ (MacOS)、_win-x64_ (Windows) のみがサポートされています。インストールするには、ターミナルで以下を実行します。

{{< tabs >}}
{{% tab "Linux" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

次に、`datadog-ci` と任意のコマンドを実行します:
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}

{{% /tab %}}

{{% tab "MacOS" %}}
{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

次に、`datadog-ci` と任意のコマンドを実行します:
{{< code-block lang="shell" >}}
datadog-ci version
{{< /code-block >}}

{{% /tab %}}

{{% tab "Windows" %}}
{{< code-block lang="powershell" >}}
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64.exe" -OutFile "datadog-ci.exe"
{{< /code-block >}}

次に、`Start-Process -FilePath "datadog-ci.exe"` と任意のコマンドを実行します: 
{{< code-block lang="powershell" >}}
Start-Process -FilePath "./datadog-ci.exe" -ArgumentList version
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## テストレポートのアップロード

To upload your JUnit XML test reports to Datadog, run the following command, specifying the name of the service or library that was tested using the `--service` parameter, and one or more file paths to either the XML report files directly or directories containing them:

{{< code-block lang="shell" >}}
datadog-ci junit upload --service <service_name> <path> [<path> ...]
{{< /code-block >}}

`DATADOG_API_KEY` 環境変数に有効な [Datadog API キー][5]を指定し、`DD_ENV` 環境変数にテストが実行された環境を指定します (たとえば、開発者ワークステーションから結果をアップロードする場合は `local`、CI プロバイダーから結果をアップロードする場合は `ci`)。例:

<pre>
<code>
DD_ENV=ci DATADOG_API_KEY=&lt;api_key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
</code>
</pre>

<div class="alert alert-warning">テストが失敗した場合でも、CI でこのコマンドが実行されることを確認してください。通常、テストが失敗すると、CI のジョブは実行を中止し、アップロードコマンドは実行されません。</div>

{{< tabs >}}

{{% tab "GitHub Actions" %}}
[ステータスチェック関数][1]を使用します。

{{< code-block lang="yaml" >}}
steps:
  - name: Run tests
    run: ./run-tests.sh
  - name: Upload test results to Datadog
    if: always()
    run: datadog-ci junit upload --service service_name ./junit.xml
{{< /code-block >}}

[1]: https://docs.github.com/en/actions/learn-github-actions/expressions#always
{{% /tab %}}

{{% tab "GitLab" %}}
[`after_script` セクション][1]を使用します。

{{< code-block lang="yaml" >}}
test:
  stage: test
  script:
    - ./run-tests.sh
  after_script:
    - datadog-ci junit upload --service service_name ./junit.xml
{{< /code-block >}}

[1]: https://docs.gitlab.com/ee/ci/yaml/#after_script
{{% /tab %}}

{{% tab "Jenkins" %}}
[`post` セクション][1]を使用します。

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Run tests') {
      steps {
        sh './run-tests.sh'
      }
      post {
        always {
          sh 'datadog-ci junit upload --service service_name ./junit.xml'
        }
      }
    }
  }
}
{{< /code-block >}}

[1]: https://www.jenkins.io/doc/book/pipeline/syntax/#post
{{% /tab %}}

{{% tab "Bash" %}}
CI システムがサブシェルを許可している場合

{{< code-block lang="shell" >}}
$(./run-tests.sh); export tests_exit_code=$?
datadog-ci junit upload --service service_name ./junit.xml
if [ $tests_exit_code -ne 0 ]; then exit $tests_exit_code; fi
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

Reports larger than 250 MiB may not be processed completely, resulting in missing tests or logs. For the best experience, ensure that the reports are under 250 MiB.

## 構成設定

これは、`datadog-ci junit upload` コマンドを使用するときに使用できるオプションの完全なリストです。

`--service` (必須)
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**例**: `my-api-service`

`--env`
: テストが実行された環境。<br/>
**環境変数**: `DD_ENV`<br/>
**例**: `ci`

`--tags`
: すべてのテストにアタッチされる `key:value` 形式のキーと値のペア (`--tags` パラメーターは複数回指定できます)。`DD_TAGS` を使用してタグを指定する場合は、カンマを使用してタグを区切ります (例: `team:backend,priority:high`)。<br/>
**環境変数**: `DD_TAGS`<br/>
**デフォルト**: (none)<br/>
**例**: `team:backend`<br/>
**注**: `--tags` と `DD_TAGS` 環境変数を使用して指定されたタグがマージされます。`--tags` と `DD_TAGS` の両方に同じキーが表示される場合、環境変数 `DD_TAGS` の値が優先されます。

`--measures`
: Key-value numerical pairs in the form `key:number` to be attached to all tests (the `--measures` parameter can be specified multiple times). When specifying measures using `DD_MEASURES`, separate them using commas (for example, `memory_allocations:13,test_importance:2`).<br/>
**Environment variable**: `DD_MEASURES`<br/>
**Default**: (none)<br/>
**Example**: `memory_allocations:13`<br/>
**Note**: Measures specified using `--measures` and with the `DD_MEASURES` environment variable are merged. If the same key appears in both `--measures` and `DD_MEASURES`, the value in the environment variable `DD_MEASURES` takes precedence.

`--report-tags`
: `key:value` 形式のキーと値のペア。`--tags` パラメーターと同じような働きをしますが、これらのタグはセッションレベルでのみ適用され、環境変数 `DD_TAGS` とマージされません。<br/>
**デフォルト**: (なし)<br/>
**例**: `test.code_coverage.enabled:true`<br/>

`--report-measures`
: Key-value pairs in the form `key:123`. Works like the `--measures` parameter but these tags are only applied at the session level and are **not** merged with the environment variable `DD_MEASURES`<br/>
**Default**: (none)<br/>
**Example**: `test.code_coverage.lines_pct:82`<br/>

`--xpath-tag`
:  キーと xpath 式を `key=expression` の形式で指定します。これにより、ファイル内のテスト用タグをカスタマイズできます (`--xpath-tag` パラメーターは複数回指定できます)。<br/>
サポートされている式の詳細については、[XPath 式によるメタデータの提供](#providing-metadata-with-xpath-expressions)を参照してください。<br/>
**デフォルト**: (なし)<br/>
**例**: `test.suite=/testcase/@classname`<br/>
**注**: `--xpath-tag` を使用し、`--tags` または `DD_TAGS` 環境変数とともに指定されたタグはマージされます。xpath-tag の値は通常テストごとに異なるため、最優先されます。

`--logs`
: XML レポートの内容を [Logs][6] として転送できるようにします。`<system-out>`、`<system-err>`、`<failure>` 内のコンテンツはログとして収集されます。`<testcase>` 内の要素からのログは自動的にテストに接続されます。<br/>
**環境変数**: `DD_CIVISIBILITY_LOGS_ENABLED`<br/>
**デフォルト**: `false`<br/>
**注**: Logs は CI Visibility とは別請求となります。

`--max-concurrency`
: API への同時アップロードの数。<br/>
**デフォルト**: `20`

`--dry-run`
: 実際にファイルを Datadog にアップロードせずにコマンドを実行します。他のすべてのチェックが実行されます。<br/>
**デフォルト**: `false`

`--skip-git-metadata-upload`
: Boolean flag used to skip git metadata upload.<br/>
**Default**: `false`<br/>

`--git-repository-url`
: git メタデータを取得するリポジトリの URL。この引数を渡さなかった場合、URL はローカルの git リポジトリから取得されます。<br/>
**デフォルト**: ローカルの git リポジトリ<br/>
**例**: `git@github.com:DataDog/documentation.git`<br/>

`--verbose`
: コマンドの出力の詳細度を高めるために使用するフラグ<br/>
**デフォルト**: `false`<br/>

位置引数
: JUnit XML レポートが配置されているファイルパスまたはディレクトリ。ディレクトリを渡すと、CLI はその中のすべての `.xml` ファイルを検索します。

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][7].

次の環境変数がサポートされています。

`DATADOG_API_KEY` (必須)
: リクエストの認証に使用される [Datadog API キー][5]。<br/>
**デフォルト**: (なし)

さらに、選択したサイトを使用するように Datadog サイトを構成します ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE` (Required)
: The [Datadog site][8] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

## Git のメタデータを収集する

{{% ci-git-metadata %}}

## 環境構成メタデータの収集

Datadog では、特別な専用タグを使用して、OS、ランタイム、デバイス情報など、テストが実行される環境の構成を特定します (該当する場合)。同じコミットに対する同じテストが複数の構成で実行される場合 (例えば、Windows 上と Linux 上)、タグは障害やフレーク性の検出におけるテストの区別に使用されます。

これらの特別なタグは、 `datadog-ci junit upload` を呼び出すときに `--tags` パラメーターを使用するか、環境変数 `DD_TAGS` を設定することで指定することができます。

これらのタグはすべて任意であり、指定したものだけが環境構成の区別に使用されます。

`test.bundle`
: テストスイートのグループを個別に実行するために使用します。<br/>
**例**: `ApplicationUITests`、`ModelTests`

`os.platform`
: オペレーティングシステムの名称。<br/>
**例**: `windows`、`linux`、`darwin`

`os.version`
: オペレーティングシステムのバージョン。<br/>
**例**: `10.15.4`、`14.3.2`、`95`

`os.architecture`
: オペレーティングシステムのアーキテクチャ。<br/>
**例**: `x64`、`x86`、`arm64`

`runtime.name`
: 言語インタープリターまたはプログラミングランタイムの名前。<br/>
**例**: `.NET`、`.NET Core`、`OpenJDK Runtime Environment`、`Java(TM) SE Runtime Environment`、`CPython`

`runtime.version`
: ランタイムのバージョン。<br/>
**例**: `5.0.0`、`3.1.7`

`runtime.vendor`
: ランタイムベンダーの名前 (該当する場合)。例えば、Java ランタイムを使用する場合。<br/>
**例**: `AdoptOpenJDK`、`Oracle Corporation`

`runtime.architecture`
: ランタイムのアーキテクチャ。<br/>
**例**: `x64`、`x86`、`arm64`

モバイルアプリの場合 (Swift、Android):

`device.model`
: テストするデバイスのモデル。<br/>
**例**: `iPhone11,4`、`AppleTV5,3`

`device.name`
: テストするデバイスの名前。<br/>
**例**: `iPhone 12 Pro Simulator`、`iPhone 13 (QA team)`

## Adding code owners
To add [codeowners][9] information to your JUnit XML tests, you can use the [GitHub integration][10] to read the `CODEOWNERS` file in your repository or provide some additional information manually.

As a result, the JUnit XML tests have a `test.codeowners` tag with the owner of those tests.

### Using the GitHub integration (recommended)

To automatically add the `test.codeowners` tag to your tests, you need to:
1. Have a `CODEOWNERS` file [in one of the allowed locations][11] in your repository.
2. Provide the tests source file in your JUnit XML report. The following plugins do this automatically and add the `file` attribute to the `<testcase>` or `<testsuite>` elements in the XML report:

    * phpunit
    * Most Python plugins (pytest, unittest)
    * Most Ruby plugins (ruby minitest)

    If the XML does not have the `file` attribute, you need to [provide the source file manually](#manually-providing-the-testsourcefile-tag).
   Example of a valid report:

  {{< code-block lang="xml" >}}
  <?xml version="1.0" encoding="UTF-8"?>
  <testsuite name="suite">
    <testcase name="test_with_file" file="src/commands/junit" />
  </testsuite>
  {{< /code-block >}}

3. Enable the [GitHub app][12]. If you do not have a GitHub app, follow the steps in the next section. If you already have
   a GitHub app, enable the `Contents: Read` permission so Datadog can read the `CODEOWNERS` file. Once enabled, wait a few minutes for the changes to take effect.

**Note:** Github is the only supported Git provider.

#### GitHub アプリの構成

The JUnit XML uses a private [GitHub App][12] to read the `CODEOWNERS` file.

1. Go to the [GitHub integration tile][13].
2. **Link GitHub Account** をクリックします。
3. 指示に従って、個人または組織のアカウントにインテグレーションを構成します。
4. In **Edit Permissions**, grant `Contents: Read` access.
5. Click **Create App in GitHub** to finish the app creation process on GitHub.
6. アプリの名前は、例えば `Datadog CI Visibility` とします。
7. **Install GitHub App** をクリックし、GitHub の指示に従ってください。

### Manually providing the `test.source.file` tag
This is an alternative to using the GitHub integration.

For those plugins that do not provide the `file` attribute in the XML report, you can provide the `test.source.file` tag.
There is no need to provide the exact path to a specific file, [you can use any syntax you would use in the CODEOWNERS file][14]
such as `src/myTeamFolder` or `*.md`.

There are multiple ways to provide the `test.source.file` tag:
* Using the [`--tags` parameter or the `DD_TAGS` environment variable](#configuration-settings).

   ```shell
   datadog-ci junit upload --service service-name --tags test.source.file:src/myTeamFolder my_report.xml
   ```

   This adds the `test.source.file` tag to all the tests in the report. All of the tests will have the same owner(s).
* If you want to provide different source files for the same XML report, you can use [property elements](#Providing-metadata-through-property-elements) or set the `file` attribute manually to individual `<testcase>` or `<testsuite>` elements.

## XPath 式によるメタデータの提供

アップロードされた XML レポートに含まれるすべてのテストにカスタムタグをグローバルに適用する `--tags` CLI パラメーターと `DD_TAGS` 環境変数に加え、`--xpath-tag` パラメーターは、XML 内の各種属性から各テストにタグを追加するカスタムルールを提供します。

The parameter provided must have the format `key=expression`, where `key` is the name of the custom tag to be added and `expression` is a valid [XPath][15] expression within the ones supported.

XPath 構文が馴染みが深いため使用されますが、サポートされている式は下記のみとなります。

`/testcase/@attribute-name`
: The XML attribute from `<testcase attribute-name="value">`.

`/testcase/../@attribute-name`
: The XML attribute from the parent `<testsuite attribute-name="value">` of the current `<testcase>`.

`/testcase/..//property[@name='property-name']`
: The `value` attribute from the `<property name="property-name" value="value">` inside the parent `<testsuite>` of the current `<testcase>`.

`/testcase//property[@name='property-name']`
: The `value` attribute from the `<property name="property-name" value="value">` inside the current `<testcase>`.

例:

{{< tabs >}}

{{% tab "@classname からテストスイートを取得" %}}
テストの `test.suite` タグは、デフォルトで `<testsuite name="suite name">` から読み込まれます。ただし、一部のプラグインでは、`<testcase classname="TestSuite">` でより良い値が報告される可能性があります。

To change `test.suite` tags from `value 1`, `value 2` to `SomeTestSuiteClass`, `OtherTestSuiteClass`:

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="value 1">
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.030000"></testcase>
  </testsuite>
  <testsuite tests="1" failures="0" time="0.021300" name="value 2">
    <testcase classname="OtherTestSuiteClass" name="test_something" time="0.021300"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service service_name \
  --xpath-tag test.suite=/testcase/@classname ./junit.xml
{{< /code-block >}}

{{% /tab %}}

{{% tab "属性からタグを追加" %}}
各テストに `value 1`、`value 2` の値とともに `custom_tag` を追加する方法:

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.020000" name="SomeTestSuiteClass">
    <testcase name="test_something" time="0.010000" attr="value 1"></testcase>
    <testcase name="test_other" time="0.010000" attr="value 2"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service service_name \
  --xpath-tag custom_tag=/testcase/@attr ./junit.xml
{{< /code-block >}}

{{% /tab %}}

{{% tab "testsuite プロパティからタグを追加" %}}
各テストに `value 1`、`value 2` の値とともに `custom_tag` を追加する方法:

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <properties>
      <property name="prop" value="value 1"></property>
    </properties>
    <testcase name="test_something" time="0.030000" attr="value 1"></testcase>
  </testsuite>
  <testsuite tests="1" failures="0" time="0.021300" name="OtherTestSuiteClass">
    <properties>
      <property name="prop" value="value 1"></property>
    </properties>
    <testcase name="test_something" time="0.021300" attr="value 1"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

{{< code-block lang="shell" >}}
datadog-ci junit upload --service service_name \
  --xpath-tag custom_tag=/testcase/..//property[@name=\'prop\'] ./junit.xml
{{< /code-block >}}

**注:** 名前は引用符で囲む必要があります。Bash では、バックスラッシュを使って引用符をエスケープしなければなりません。例えば、`[@name='prop']` は `[@name=\'prop\'] と入力します。
{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-warning">
  When using bash from Git for Windows, define the <strong>MSYS_NO_PATHCONV=1</strong> environment variable.
  Otherwise, any argument starting with <strong>/</strong> will be expanded to a Windows path.
</div>

## Providing metadata through property elements

特定のテストに追加のタグを指定するもう 1 つの方法は、`<testsuite>` または `<testcase>` 要素内に `<property name="dd_tags[key]" value="value">` 要素を含める方法です。これらのタグを `<testcase>` 要素に追加すると、そのテストスパンにタグが格納されます。タグを `<testsuite>` 要素に追加すると、そのスイートの全てのテストスパンにタグが格納されます。

この処理を行うには、`<property>` 要素の `name` 属性が `dd_tags[key]` という形式である必要があります。ここで `key` は追加されるカスタムタグの名前です。その他のプロパティは無視されます。

**例**: `<testcase>` 要素にタグを追加する。

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.010000">
      <properties>
        <property name="dd_tags[custom_tag]" value="some value"></property>
        <property name="dd_tags[runtime.name]" value="CPython"></property>
      </properties>
    </testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

**例**: `<testsuite>` 要素にタグを追加する。

{{< code-block lang="xml" >}}
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite tests="1" failures="0" time="0.030000" name="SomeTestSuiteClass">
    <properties>
      <property name="dd_tags[custom_tag]" value="some value"></property>
      <property name="dd_tags[runtime.name]" value="CPython"></property>
    </properties>
    <testcase classname="SomeTestSuiteClass" name="test_something" time="0.010000"></testcase>
  </testsuite>
</testsuites>
{{< /code-block >}}

The values that you send to Datadog are strings, so the facets are displayed in lexicographical order. To send integers instead of strings, use the `--measures` flag and the `DD_MEASURES` environment variable.


## コードカバレッジを報告する

It is possible to report code coverage for a given JUnit report via the `--report-measures` option, by setting the `test.code_coverage.lines_pct` measure:

```shell
datadog-ci junit upload --service my-api-service --report-measures test.code_coverage.lines_pct:82 unit-tests/junit-reports e2e-tests/single-report.xml
```

For more information, see [Code Coverage][16].

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://junit.org/junit5/
[2]: https://docs.datadoghq.com/continuous_integration/tests/#setup
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: https://github.com/DataDog/datadog-ci/releases
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /logs/
[7]: /getting_started/tagging/unified_service_tagging
[8]: /getting_started/site/
[9]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[10]: https://docs.datadoghq.com/integrations/github/
[11]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-file-location
[12]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[13]: https://app.datadoghq.com/integrations/github/
[14]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-syntax
[15]: https://www.w3schools.com/xml/xpath_syntax.asp
[16]: /continuous_integration/tests/code_coverage/?tab=junitreportuploads

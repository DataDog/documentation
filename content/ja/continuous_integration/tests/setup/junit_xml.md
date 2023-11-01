---
aliases:
- /ja/continuous_integration/setup_tests/junit_upload
- /ja/continuous_integration/tests/junit_upload
code_lang: junit_xml
code_lang_weight: 60
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
kind: ドキュメント
title: JUnit テストレポートファイルを Datadog にアップロードする
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) はサポートされていません。
</div>
{{< /site-region >}}

<div class="alert alert-warning"><strong>注</strong>: Datadog では、JUnit XML ファイルのアップロードよりもネイティブインスツルメンテーションを推奨しています。ネイティブインスツルメンテーションは、より正確な時間結果を提供し、インテグレーションテストでの分散型トレーシングをサポートし、構造化スタックトレースをサポートするからです。</div>

## 概要

JUnit テストレポートファイルは、テスト名とスイート名、合格/不合格ステータス、期間、場合によってはエラーログなどのテスト実行情報を含む XML ファイルです。[JUnit][1] テストフレームワークによって導入されたものの、他の多くの人気のフレームワークでもこの形式を使用して結果を出力することができます。

テストフレームワークで JUnit XML のテストレポートを生成できる場合、Datadog トレーサーを使用した[ネイティブのテストインスツルメンテーション][2]に代わる軽量な方法として、これらを使用することができます。JUnit XML レポートからインポートされたテスト結果は、トレーサーからレポートされたテストデータと一緒に表示されます。

## 互換性

サポートされている Datadog トレーシングライブラリ

| Datadog ライブラリ | バージョン |
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

JUnit XML テストレポートを Datadog にアップロードするには、次のコマンドを実行し、`--service` パラメーターを使用してテストされたサービスまたはライブラリの名前を指定し、XML レポートファイルへの直接のファイルパスまたはそれらを含むディレクトリへの 1 つ以上のファイルパスを指定します。

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

250 MiB より大きいレポートは完全に処理されず、テストやログが欠落する可能性があります。最高の体験を得るために、レポートが 250 MiB 以下であることを確認してください。

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

`--metrics`
: すべてのテストにアタッチされる `key:number` 形式のキーと数値のペア (`--metrics` パラメータは複数回指定可能)。`DD_METRICS` を使用してメトリクスを指定する場合は、カンマで区切ってください (例: `memory_allocations:13,test_importance:2`)。<br/>
**環境変数**: `DD_METRICS`<br/>
**デフォルト**: (none)<br/>
**例**: `memory_allocations:13`<br/>
**注**: `--metrics` と環境変数 `DD_METRICS` で指定したメトリクスはマージされます。同じキーが `--metrics` と `DD_METRICS` の両方にある場合は、環境変数 `DD_METRICS` の値が優先されます。

`--report-tags`
: `key:value` 形式のキーと値のペア。`--tags` パラメーターと同じような働きをしますが、これらのタグはセッションレベルでのみ適用され、環境変数 `DD_TAGS` とマージされません。<br/>
**デフォルト**: (なし)<br/>
**例**: `test.code_coverage.enabled:true`<br/>

`--report-metrics`
: `key:123` 形式のキーと値のペア。`--metrics` パラメーターと同じような働きをしますが、これらのタグはセッションレベルでのみ適用され、環境変数 `DD_METRICS` とマージされません。<br/>
**デフォルト**: (なし)<br/>
**例**: `test.code_coverage.lines_pct:82`<br/>

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
: git メタデータのアップロードをスキップするために使用するフラグ。git メタデータをアップロードしたい場合は、--skip-git-metadata-upload=0 または --skip-git-metadata-upload=false を渡すことができます。<br/>
**デフォルト**: `true`<br/>

`--git-repository-url`
: git メタデータを取得するリポジトリの URL。この引数を渡さなかった場合、URL はローカルの git リポジトリから取得されます。<br/>
**デフォルト**: ローカルの git リポジトリ<br/>
**例**: `git@github.com:DataDog/documentation.git`<br/>

`--verbose`
: コマンドの出力の詳細度を高めるために使用するフラグ<br/>
**デフォルト**: `false`<br/>


位置引数
: JUnit XML レポートが配置されているファイルパスまたはディレクトリ。ディレクトリを渡すと、CLI はその中のすべての `.xml` ファイルを検索します。

次の環境変数がサポートされています。

`DATADOG_API_KEY` (必須)
: リクエストの認証に使用される [Datadog API キー][5]。<br/>
**デフォルト**: (なし)

さらに、選択したサイトを使用するように Datadog サイトを構成します ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE` (必須)
: 結果をアップロードする [Datadog サイト][7]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

## Git のメタデータを収集する

{{% ci-git-metadata %}}

## Git メタデータのアップロード

`datadog-ci` バージョン `2.9.0` 以降では、CI Visibility は Git のメタデータ情報 (コミット履歴) を自動的にアップロードします。このメタデータには、ファイル名は含まれていますが、ファイルのコンテンツは含まれていません。この動作を無効にしたい場合は、フラグ `--skip-git-metadata-upload` を渡します。

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


## XPath 式によるメタデータの提供

アップロードされた XML レポートに含まれるすべてのテストにカスタムタグをグローバルに適用する `--tags` CLI パラメーターと `DD_TAGS` 環境変数に加え、`--xpath-tag` パラメーターは、XML 内の各種属性から各テストにタグを追加するカスタムルールを提供します。

提供されるパラメーターは `key=expression` の形式でなければならず、`key` は追加されるカスタムタグの名前、`expression` はサポートされている有効な [XPath][8] 式になります。

XPath 構文が馴染みが深いため使用されますが、サポートされている式は下記のみとなります。

`/testcase/@attribute-name`
:  `<testcase attribute-name="value">` から取得する XML 属性。

`/testcase/../@attribute-name`
: 現在の `<testcase>` の親である `<testsuite attribute-name="value">` から取得する XML 属性。

`/testcase/..//property[@name='property-name']`
: 現在の `<testcase>` の親である `<testsuite>` 内の`<property name="property-name" value="value">` から取得する `value` 属性。

`/testcase//property[@name='property-name']`
: 現在の `<testcase>` 内の `<property name="property-name" value="value">` から取得する `value` 属性。

例:

{{< tabs >}}

{{% tab "@classname からテストスイートを取得" %}}
テストの `test.suite` タグは、デフォルトで `<testsuite name="suite name">` から読み込まれます。ただし、一部のプラグインでは、`<testcase classname="TestSuite">` でより良い値が報告される可能性があります。

`test.suite` タグの `value 1`、`value 2` を `SomeTestSuiteClass`、`OtherTestSuiteClass` に変更するには

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
  Git for Windows の Bash を使用する際は、<strong>MSYS_NO_PATHCONV=1</strong> 環境変数を定義します。
  この定義を行わなかった場合、<strong>/</strong> で始まるすべての引数が Windows パスに展開されます。
</div>

## プロパティ要素によるメタデータの提供

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

Datadog に送信する値は文字列なので、ファセットは辞書順で表示されます。文字列の代わりに整数を送信するには、`--metrics` フラグと `DD_METRICS` 環境変数を使用します。


## コードカバレッジを報告する

`--report-metrics` オプションを利用し、`test.code_coverage.lines_pct` メトリクスを設定することで、指定された JUnit レポートのコードカバレッジをレポートすることが可能です。

```shell
datadog-ci junit upload --service my-api-service --report-metrics test.code_coverage.lines_pct:82 unit-tests/junit-reports e2e-tests/single-report.xml
```

詳しくは、[コードカバレッジ][10]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://junit.org/junit5/
[2]: https://docs.datadoghq.com/ja/continuous_integration/tests/#setup
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: https://github.com/DataDog/datadog-ci/releases
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ja/logs/
[7]: /ja/getting_started/site/
[8]: https://www.w3schools.com/xml/xpath_syntax.asp
[10]: /ja/continuous_integration/tests/code_coverage/?tab=junitreportuploads
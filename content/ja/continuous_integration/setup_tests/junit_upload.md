---
further_reading:
- link: /continuous_integration/explore_tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを調べる
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
kind: documentation
title: JUnit テストレポートファイルを Datadog にアップロードする
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
 選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) はサポートされていません。
</div>
{{< /site-region >}}

JUnit テストレポートファイルは、テスト名とスイート名、合格/不合格ステータス、期間、場合によってはエラーログなどのテスト実行情報を含む XML ファイルです。[JUnit][1] テストフレームワークによって導入されましたが、他の多くの一般的なフレームワークは、この形式を使用して結果を出力できます。

最も包括的なテスト結果を提供するため推奨されるオプションである Datadog トレーサーを使用してネイティブにテストをインスツルメントする代わりに、JUnit XML テストレポートをアップロードすることもできます。

JUnit XML レポートからインポートされたテスト結果は、トレーサーによってレポートされたテストデータと一緒に表示されます。ただし、この方法を使用する場合は、インテグレーションテストや構造化スタックトレースに分散型トレースがないなど、いくつかの制限があります。このため、この方法は、使用されている言語またはテストフレームワークのネイティブサポートがない場合にのみ使用してください。

## Datadog CI CLI のインストール

`npm` を使用して [`datadog-ci`][2] CLI をグローバルにインストールします。
{{< code-block lang="bash" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

### スタンドアロンバイナリ (ベータ)

<div class="alert alert-warning"><strong>注</strong>: スタンドアロンバイナリは<strong>ベータ</strong>版で、暗転性は保証されていません。</div>

CI で NodeJS をインストールすることに問題がある場合は、スタンドアロンバイナリが [Datadog CI リリース][3]で提供されています。_linux-x64_、_darwin-x64_ (MacOS)、_win-x64_ (Windows) のみがサポートされています。インストールするには、ターミナルで以下を実行します。

{{< tabs >}}
{{% tab "Linux" %}}
{{< code-block lang="bash" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

次に、`datadog-ci` と任意のコマンドを実行します:
{{< code-block lang="bash" >}}
datadog-ci version
{{< /code-block >}}

{{% /tab %}}

{{% tab "MacOS" %}}
{{< code-block lang="bash" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}

次に、`datadog-ci` と任意のコマンドを実行します:
{{< code-block lang="bash" >}}
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

JUnit XML テストレポートを Datadog にアップロードするには、次のコマンドを実行し、`--service` パラメーターを使用してテストされたサービスまたはライブラリの名前と、XML レポートファイルまたはそれらを含むディレクトリへの 1 つ以上のファイルパスを指定します。

{{< code-block lang="bash" >}}
datadog-ci junit upload --service <service_name> <path> [<path> ...]
{{< /code-block >}}

`DATADOG_API_KEY` 環境変数に有効な [Datadog API キー][4]を指定し、`DD_ENV` 環境変数にテストが実行された環境を指定します (たとえば、開発者ワークステーションから結果をアップロードする場合は `local`、CI プロバイダーから結果をアップロードする場合は `ci`)。例:

<pre>
<code>
DD_ENV=ci DATADOG_API_KEY=&lt;api_key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
</code>
</pre>

## コンフィギュレーション設定

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

`--logs` **(ベータ版)**
: XML レポートの内容を [Logs][5] として転送できるようにします。`<system-out>`、`<system-err>`、`<failure>` 内のコンテンツはログとして収集されます。`<testcase>` 内の要素からのログは自動的にテストに接続されます。<br/>
**環境変数**: `DD_CIVISIBILITY_LOGS_ENABLED`<br/>
**デフォルト**: `false`<br/>
**注**: Logs は CI Visibility とは別請求となります。

`--max-concurrency`
: API への同時アップロードの数。<br/>
**デフォルト**: `20`

`--dry-run`
: 実際にファイルを Datadog にアップロードせずにコマンドを実行します。他のすべてのチェックが実行されます。<br/>
**デフォルト**: `false`

位置引数
: JUnit XML レポートが配置されているファイルパスまたはディレクトリ。ディレクトリを渡すと、CLI はその中のすべての `.xml` ファイルを検索します。

次の環境変数がサポートされています。

`DATADOG_API_KEY` (必須)
: リクエストの認証に使用される [Datadog API キー][4]。<br/>
**デフォルト**: (なし)

さらに、選択したサイトを使用するように Datadog サイトを構成します ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE` (必須)
: 結果をアップロードする [Datadog サイト][6]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

## リポジトリの収集とメタデータのコミット

Datadog は、テスト結果を可視化し、リポジトリやコミットごとにグループ化するために Git 情報を使用します。Git のメタデータは、Datadog の CI CLI が CI プロバイダーの環境変数やプロジェクトパスのローカルな `.git` フォルダ (あれば) から収集します。このディレクトリを読み込むには、[`git`][7] バイナリが必要です。

サポートされていない CI プロバイダーでテストを実行する場合や、`.git` フォルダがない場合は、環境変数を使って Git の情報を手動で設定することができます。これらの環境変数は、自動検出された情報よりも優先されます。Git の情報を提供するために、以下の環境変数を設定します。

`DD_GIT_REPOSITORY_URL`
: コードが格納されているリポジトリの URL。HTTP と SSH の両方の URL に対応しています。<br/>
**例**: `git@github.com:MyCompany/MyApp.git`、`https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: テスト中の Git ブランチ。タグ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `develop`

`DD_GIT_TAG`
: テストされる Git タグ (該当する場合)。ブランチ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: フルコミットハッシュ。<br/>
**例**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: コミットのメッセージ。<br/>
**例**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: コミット作成者名。<br/>
**例**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: コミット作成者メールアドレス。<br/>
**例**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: ISO 8601 形式のコミット作成者の日付。<br/>
**例**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: コミットのコミッター名。<br/>
**例**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: コミットのコミッターのメールアドレス。<br/>
**例**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: ISO 8601 形式のコミットのコミッターの日付。<br/>
**例**: `2021-03-12T16:00:28Z`

## 環境構成メタデータの収集

Datadog では、特別な専用タグを使用して、OS、ランタイム、デバイス情報など、テストが実行される環境の構成を特定します (該当する場合)。同じコミットに対する同じテストが複数の構成で実行される場合 (例えば、Windows 上と Linux 上)、タグは障害やフレーク性の検出におけるテストの区別に使用されます。

これらの特別なタグは、 `datadog-ci junit upload` を呼び出すときに `--tags` パラメーターを使用するか、環境変数 `DD_TAGS` を設定することで指定することができます。

これらのタグはすべて任意であり、指定したものだけが環境構成の区別に使用されます。

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
**例**: `5.0.0`, `3.1.7`

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

<!-- TODO: バックエンドに追加された後、コメント解除する
`test.bundle`
: テストスイートのグループを個別に実行するために使用します。<br/>
**例**: `ApplicationUITests`、`ModelTests` -->

## `<property>` 要素によるメタデータの提供

アップロードされた XML レポートに含まれるすべてのテストにカスタムタグをグローバルに適用する `--tags` CLI パラメーターと `DD_TAGS` 環境変数に加えて、 `<testsuite>` や `<testcase>` の要素の中に `<property name="dd_tags[key]" value="value">` の要素を含めることによって、特定のテストに追加のタグを提供することができます。これらのタグを `<testcase>` 要素に追加すると、そのタグはテストスパンに保存されます。`<testsuite>` 要素にタグを追加すると、そのスイートのすべてのテストスパンにタグが格納されます。

この処理を行うには、 `<property>` 要素の `name` 属性が `dd_tags[key]` という形式である必要があります。ここで `key` は追加されるカスタムタグの名前です。その他のプロパティは無視されます。

**例**: `<testcase>` 要素にタグを追加する

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

**例**: `<testsuite>` 要素にタグを追加する

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://junit.org/junit5/
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci/releases
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ja/logs/
[6]: /ja/getting_started/site/
[7]: https://git-scm.com/downloads
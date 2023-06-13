---
aliases:
- /ja/continuous_integration/setup_tests/dotnet
further_reading:
- link: /continuous_integration/tests/containers/
  tag: ドキュメント
  text: コンテナ内でテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/intelligent_test_runner/dotnet
  tag: ドキュメント
  text: Intelligent Test Runner でテストジョブを高速化する
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: トラブルシューティング CI
kind: documentation
title: .NET テスト
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、現時点では CI Visibility は使用できません。</div>
{{< /site-region >}}

## 互換性

対応する .NET バージョン:
* .NET Framework 4.6.1 以上
* .NET Core 2.1、3.1、.NET 5、および .NET 6

対応するテストフレームワーク:
* xUnit 2.2 以上
* NUnit 3.0 以上
* MsTestV2 14 以上
* [BenchmarkDotNet 0.13.2][11] 以上

### テストスイートレベルの可視化の互換性
[テストスイートレベルの可視化][1]は `dd-trace-dotnet>=2.16.0` からサポートされるようになりました。

## 報告方法の構成

Datadog にテスト結果を報告するには、Datadog の .NET ライブラリを構成する必要があります。

{{< tabs >}}

{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

Jenkins や自己管理型の GitLab CI などのオンプレミス CI プロバイダーでテストを実行する場合、[Agent インストール手順][1]に従って各ワーカノードに Datadog Agent をインストールします。これは、テスト結果が自動的に基礎となるホストメトリクスにリンクされるため、推奨されるオプションです。

CI プロバイダーがコンテナベースのエグゼキューターを使用している場合、ビルド内の `localhost` の使用ではコンテナ自体を参照しており、Datadog Agent が動作している基礎となるワーカーノードではないため、すべてのビルドで `DD_AGENT_HOST` 環境変数 (デフォルトは `http://localhost:8126`) を、ビルドコンテナの中からアクセスできるエンドポイントに設定します。

Kubernetes のエグゼキューターを使用している場合、Datadog は [Datadog Admission Controller][2] の使用を推奨しており、これは自動的にビルドポッドの環境変数 `DD_AGENT_HOST` を設定してローカルの Datadog Agent と通信させます。


[1]: /ja/agent/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{% tab "クラウド CI プロバイダー (Agentless)" %}}

<div class="alert alert-info">Agentless モードは、Datadog .NET ライブラリのバージョン >= 2.5.1 で使用できます</div>

GitHub Actions や CircleCI など、基盤となるワーカーノードにアクセスできないクラウド CI プロバイダーを使用している場合は、Agentless モードを使用するようにライブラリを構成します。そのためには、以下の環境変数を設定します。

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (必須)
: Agentless モードを有効または無効にします。<br/>
**デフォルト**: `false`

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][1]。<br/>
**デフォルト**: `(empty)`

さらに、どの [Datadog サイト][2]にデータを送信するかを構成します。

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][2]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/
{{% /tab %}}

{{< /tabs >}}

## .NET トレーサー CLI のインストール

以下のいずれかの方法で `dd-trace` コマンドをインストールまたは更新してください。

- 以下のコマンドを実行して、.NET SDK を使用する。
   ```
   dotnet tool update -g dd-trace
   ```
- 適切なバージョンをダウンロードする。
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][2]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][3]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][4]

- または、[github のリリースページより][5]ダウンロードする。

## テストのインスツルメンテーション

<div class="alert alert-warning"><strong>注</strong>: BenchmarkDotNet の場合は、<a href="#instrumenting-benchmarkdotnet-tests">こちらの手順</a>に従ってください。</div>

テストスイートをインスツルメントするには、テストコマンドの前に `dd-trace ci run` を付け、テスト中のサービスまたはライブラリの名前を `--dd-service` パラメーターとして指定し、テストが実行されている環境 (たとえば、 開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を `--dd-env` パラメーターとして使用します。例:

{{< tabs >}}

{{% tab "dotnet テスト" %}}

<a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a> の使用によって

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

<a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a> の使用によって

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

すべてのテストは自動的にインスツルメントされます。

## コンフィギュレーション設定

コマンドライン引数または環境変数を使用して、CLI のデフォルトコンフィギュレーションを変更できます。コンフィギュレーション設定の完全なリストについては、以下を実行してください。

{{< code-block lang="shell" >}}
dd-trace ci run --help
{{< /code-block >}}

次のリストは、主要なコンフィギュレーション設定のデフォルト値を示しています。

`--dd-service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: リポジトリ名<br/>
**例**: `my-dotnet-app`

`--dd-env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

`--agent-url`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**環境変数**: `DD_TRACE_AGENT_URL`<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサーコンフィギュレーション][6]オプションも使用できます。

### テストにカスタムタグを追加する

現在アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

```csharp
// テスト内
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// テストは正常に続きます
// ...
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、.NET カスタムインスツルメンテーションドキュメントの[タグの追加][7]セクションを参照してください。

### コードカバレッジを報告する

コードカバレッジが利用できる場合、Datadog トレーサー (v2.31.0+) は、テストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

コードカバレッジの計算に [Coverlet][14] を使用している場合、`dd-trace` を実行する際に `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` 環境変数にレポートファイルへのパスを指定します。レポートファイルは、OpenCover または Cobertura 形式である必要があります。また、環境変数 `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` で、Datadog トレーサーに内蔵されているコードカバレッジ計算を有効にできます。

**注**: Intelligent Test Runner を使用する場合、トレーサーに内蔵されたコードカバレッジはデフォルトで有効になっています。

テストセッションの **Coverage** タブで、テストカバレッジの推移を見ることができます。

### BenchmarkDotNet テストのインスツルメンテーション

ベンチマークテストをインスツルメンテーションするために必要なこと

1. [`Datadog.Trace.BenchmarkDotNet` NuGet パッケージ][12]をプロジェクトに追加します (例えば、`dotnet add package Datadog.Trace.BenchmarkDotNet` を使用します)。
2. `DatadogDiagnoser` 属性または `WithDatadog()` 拡張機能を使って、 `Datadog.Trace.BenchmarkDotNet` エクスポーターを使用するようにプロジェクトを構成してください。例:

{{< tabs >}}

{{% tab "[DatadogDiagnoser] 属性の使用" %}}
{{< code-block lang="csharp" >}}
using BenchmarkDotNet.Attributes;
using Datadog.Trace.BenchmarkDotNet;

[DatadogDiagnoser]
[MemoryDiagnoser]
public class OperationBenchmark
{
    [Benchmark]
    public void Operation()
    {
        // ...
    }
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "構成の使用" %}}
{{< code-block lang="csharp" >}}
using BenchmarkDotNet.Configs;
using BenchmarkDotNet.Running;
using Datadog.Trace.BenchmarkDotNet;

var config = DefaultConfig.Instance
              .WithDatadog();

BenchmarkRunner.Run<OperationBenchmark>(config);
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

3. [報告方法を構成します][13]。
4. 通常通りベンチマークプロジェクトを実行すると、すべてのベンチマークテストが自動的にインスツルメンテーションされます。

### Git のメタデータを収集する

Datadog は、テスト結果を可視化し、リポジトリ、ブランチ、コミットごとにグループ化するために Git の情報を使用します。Git のメタデータは、CI プロバイダーの環境変数や、プロジェクトパス内のローカルな `.git` フォルダがあれば、そこからテストインスツルメンテーションによって自動的に収集されます。

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

## カスタムインスツルメンテーション

<div class="alert alert-warning">
  <strong>注:</strong> カスタムインスツルメンテーションの設定は、<code>dd-trace</code> のバージョンに依存します。カスタムインスツルメンテーションを使用するには、<code>dd-trace</code> と <code>Datadog.Trace</code> の NuGet パッケージのバージョンを同期させておく必要があります。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. ツールのバージョンを取得するには、`dd-trace --version` を実行します。
2. 同じバージョンの `Datadog.Trace` [NuGet パッケージ][8]をアプリケーションに追加します。
3. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

カスタムインスツルメンテーションのスパンやタグの追加方法については、[.NET カスタムインスツルメンテーションのドキュメント][9]を参照してください。

## 手動テスト API

<div class="alert alert-warning">
  <strong>注:</strong> 手動テスト API を使用するには、対象の .NET プロジェクトに <code>Datadog.Trace</code> NuGet パッケージを追加する必要があります。
</div>

.NET プロジェクトで XUnit、NUnit、MSTest を使用している場合、CI Visibility は自動的にインスツルメンテーションを行い、Datadog にテスト結果を送信します。サポートされていないテストフレームワークを使用している場合、または別のテストメカニズムを持っている場合、代わりに API を使用して Datadog にテスト結果を報告することができます。

この API は、テストモジュール、テストスイート、テストの 3 つの概念に基づいています。

### テストモジュール

テストモジュールは、テストを含む .NET アセンブリを表します。

テストモジュールを起動するには、`TestModule.Create()` を呼び出し、テストが配置されているモジュールの名前または .NET アセンブリ名を渡します。

すべてのテストが終了したら、`module.Close()` または `module.CloseAsync()` を呼び出して、残りのテスト結果をすべてバックエンドに送信するようにします。

### テストスイート

テストスイートは、テストのセットで構成されます。これらのテストは、共通の初期化および終了メソッドを持ち、いくつかの変数を共有することができます。.NET では、通常、複数のテストメソッドを含むテストクラスまたはフィクスチャとして実装されます。テストスイートは、属性やエラー情報などの追加情報を持つこともできます。

テストスイートは `module.GetOrCreateSuite()` を呼び出してテストスイートの名前を渡すことでテストモジュールに作成します。

スイートの中の関連するテストがすべて実行を終えたら `suite.Close()` を呼び出します。

### テスト

各テストはスイートの中で実行され、`TestStatus.Pass`、`TestStatus.Fail`、`TestStatus.Skip` の 3 つのステータスのいずれかで終了する必要があります。

テストは、オプションで以下のような付加情報を持つことができます。

- パラメーター
- 属性
- エラー情報
- テスト特性
- ベンチマークデータ

`suite.CreateTest()` を呼び出し、テストの名前を渡すことで、スイート内のテストを作成します。テストが終了したら、あらかじめ定義されたステータスのいずれかを指定して `test.Close()` を呼び出します。

### API インターフェイス

{{< code-block lang="csharp" >}}
namespace Datadog.Trace.Ci
{
    /// <summary>
    /// CI Visibility テストモジュール
    /// </summary>
    public sealed class TestModule
    {
        /// <summary>
        /// テストフレームワークを取得します
        /// </summary>
        public string? Framework { get; }
        /// <summary>
        /// モジュール名を取得します
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// テストモジュールの開始日を取得します
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// テストモジュールを閉じます
        /// </summary>
        /// <remarks>可能な限り CloseAsync() バージョンを使用します。</remarks>
        public void Close() { }
        /// <summary>
        /// テストモジュールを閉じます
        /// </summary>
        /// <remarks>可能な限り CloseAsync() バージョンを使用します。</remarks>
        /// <param name="duration">テストモジュールの期間</param>
        public void Close(System.TimeSpan? duration) { }
        /// <summary>
        /// テストモジュールを閉じます
        /// </summary>
        /// <returns>タスクインスタンス </returns>
        public System.Threading.Tasks.Task CloseAsync() { }
        /// <summary>
        /// テストモジュールを閉じます
        /// </summary>
        /// <param name="duration">テストモジュールの期間</param>
        /// <returns>タスクインスタンス </returns>
        public System.Threading.Tasks.Task CloseAsync(System.TimeSpan? duration) { }
        /// <summary>
        /// このセッションのために新しいテストスイートを作成します
        /// </summary>
        /// <param name="name">テストスイートの名前</param>
        /// <returns>テストスイートインスタンス</returns>
        public Datadog.Trace.Ci.TestSuite GetOrCreateSuite(string name) { }
        /// <summary>
        /// このセッションのために新しいテストスイートを作成します
        /// </summary>
        /// <param name="name">テストスイートの名前</param>
        /// <param name="startDate">テストスイートの開始日</param>
        /// <returns>テストスイートインスタンス</returns>
        public Datadog.Trace.Ci.TestSuite GetOrCreateSuite(string name, System.DateTimeOffset? startDate) { }
        /// <summary>
        /// 例外からエラー情報を設定します
        /// </summary>
        /// <param name="exception">例外インスタンス</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// エラー情報を設定します
        /// </summary>
        /// <param name="type">エラータイプ</param>
        /// <param name="message">エラーメッセージ</param>
        /// <param name="callStack">エラーのコールスタック</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// 数字タグをテストに設定します
        /// </summary>
        /// <param name="key">タグのキー</param>
        /// <param name="value">タグの値</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// 文字列タグをテストに設定します
        /// </summary>
        /// <param name="key">タグのキー</param>
        /// <param name="value">タグの値</param>
        public void SetTag(string key, string? value) { }
        /// <summary>
        /// 新しいテストモジュールを作成します
        /// </summary>
        /// <param name="name">テストモジュール名</param>
        /// <returns>新しいテストモジュールインスタンス</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name) { }
        /// <summary>
        /// 新しいテストモジュールを作成します
        /// </summary>
        /// <param name="name">テストモジュール名</param>
        /// <param name="framework">テスティングフレームワーク名</param>
        /// <param name="frameworkVersion">テスティングフレームワークのバージョン</param>
        /// <returns>新しいテストモジュールインスタンス</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name, string framework, string frameworkVersion) { }
        /// <summary>
        /// 新しいテストモジュールを作成します
        /// </summary>
        /// <param name="name">テストモジュール名</param>
        /// <param name="framework">テスティングフレームワーク名</param>
        /// <param name="frameworkVersion">テスティングフレームワークのバージョン</param>
        /// <param name="startDate">テストセッション開始日</param>
        /// <returns>新しいテストモジュールインスタンス</returns>
        public static Datadog.Trace.Ci.TestModule Create(string name, string framework, string frameworkVersion, System.DateTimeOffset startDate) { }
    }

    /// <summary>
    /// CI Visibility テストスイート
    /// </summary>
    public sealed class TestSuite
    {
        /// <summary>
        /// このスイートのテストモジュールを取得します
        /// </summary>
        public Datadog.Trace.Ci.TestModule Module { get; }
        /// <summary>
        /// テストスイート名を取得します
        /// </summary>
        public string Name { get; }
        /// <summary>
        /// テストスイートの開始日を取得します
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// テストスイートを閉じます
        /// </summary>
        public void Close() { }
        /// <summary>
        /// テストスイートを閉じます
        /// </summary>
        /// <param name="duration">テストスイートの期間</param>
        public void Close(System.TimeSpan? duration) { }
        /// <summary>
        /// このスイートの新しいテストを作成します
        /// </summary>
        /// <param name="name">テスト名</param>
        /// <returns>テストインスタンス</returns>
        public Datadog.Trace.Ci.Test CreateTest(string name) { }
        /// <summary>
        /// このスイートの新しいテストを作成します
        /// </summary>
        /// <param name="name">テストの名前</param>
        /// <param name="startDate">テスト開始日</param>
        /// <returns>テストインスタンス</returns>
        public Datadog.Trace.Ci.Test CreateTest(string name, System.DateTimeOffset startDate) { }
        /// <summary>
        /// 例外からエラー情報を設定します
        /// </summary>
        /// <param name="exception">例外インスタンス</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// エラー情報を設定します
        /// </summary>
        /// <param name="type">エラータイプ</param>
        /// <param name="message">エラーメッセージ</param>
        /// <param name="callStack">エラーのコールスタック</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// 数字タグをテストに設定します
        /// </summary>
        /// <param name="key">タグのキー</param>
        /// <param name="value">タグの値</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// 文字列タグをテストに設定します
        /// </summary>
        /// <param name="key">タグのキー</param>
        /// <param name="value">タグの値</param>
        public void SetTag(string key, string? value) { }
    }

    /// <summary>
    /// CI Visibility テスト
    /// </summary>
    public sealed class Test
    {
        /// <summary>
        /// テスト名を取得します
        /// </summary>
        public string? Name { get; }
        /// <summary>
        /// テスト開始日を取得します
        /// </summary>
        public System.DateTimeOffset StartTime { get; }
        /// <summary>
        /// このテストのテストスイートを取得します
        /// </summary>
        public Datadog.Trace.Ci.TestSuite Suite { get; }
        /// <summary>
        /// ベンチマークデータを追加します
        /// </summary>
        /// <param name="measureType">メジャータイプ</param>
        /// <param name="info">メジャー情報</param>
        /// <param name="statistics">統計値</param>
        public void AddBenchmarkData(Datadog.Trace.Ci.BenchmarkMeasureType measureType, string info, in Datadog.Trace.Ci.BenchmarkDiscreteStats statistics) { }
        /// <summary>
        /// テストを閉じます
        /// </summary>
        /// <param name="status">テストステータス</param>
        public void Close(Datadog.Trace.Ci.TestStatus status) { }
        /// <summary>
        /// テストを閉じます
        /// </summary>
        /// <param name="status">テストステータス</param>
        /// <param name="duration">テストスイートの期間</param>
        public void Close(Datadog.Trace.Ci.TestStatus status, System.TimeSpan? duration) { }
        /// <summary>
        /// テストを閉じます
        /// </summary>
        /// <param name="status">テストステータス</param>
        /// <param name="duration">テストスイートの期間</param>
        /// <param name="skipReason">この場合 </param>
        public void Close(Datadog.Trace.Ci.TestStatus status, System.TimeSpan? duration, string? skipReason) { }
        /// <summary>
        /// ベンチマークのメタデータを設定します
        /// </summary>
        /// <param name="hostInfo">ホスト情報</param>
        /// <param name="jobInfo">ジョブ情報</param>
        public void SetBenchmarkMetadata(in Datadog.Trace.Ci.BenchmarkHostInfo hostInfo, in Datadog.Trace.Ci.BenchmarkJobInfo jobInfo) { }
        /// <summary>
        /// 例外からエラー情報を設定します
        /// </summary>
        /// <param name="exception">例外インスタンス</param>
        public void SetErrorInfo(System.Exception exception) { }
        /// <summary>
        /// エラー情報を設定します
        /// </summary>
        /// <param name="type">エラータイプ</param>
        /// <param name="message">エラーメッセージ</param>
        /// <param name="callStack">エラーのコールスタック</param>
        public void SetErrorInfo(string type, string message, string? callStack) { }
        /// <summary>
        /// テストパラメーターを設定します
        /// </summary>
        /// <param name="parameters">TestParameters インスタンス</param>
        public void SetParameters(Datadog.Trace.Ci.TestParameters parameters) { }
        /// <summary>
        /// 数字タグをテストに設定します
        /// </summary>
        /// <param name="key">タグのキー</param>
        /// <param name="value">タグの値</param>
        public void SetTag(string key, double? value) { }
        /// <summary>
        /// 文字列タグをテストに設定します
        /// </summary>
        /// <param name="key">タグのキー</param>
        /// <param name="value">タグの値</param>
        public void SetTag(string key, string? value) { }
        /// <summary>
        /// テスト方法情報を設定します
        /// </summary>
        /// <param name="methodInfo">Test MethodInfo インスタンス</param>
        public void SetTestMethodInfo(System.Reflection.MethodInfo methodInfo) { }
        /// <summary>
        /// テストの特徴を設定します
        /// </summary>
        /// <param name="traits">特徴ディクショナリー</param>
        public void SetTraits(System.Collections.Generic.Dictionary<string, System.Collections.Generic.List<string>> traits) { }
    }

    /// <summary>
    /// テストステータス
    /// </summary>
    public enum TestStatus
    {
        /// <summary>
        /// パステストステータス
        /// </summary>
        Pass = 0,
        /// <summary>
        /// フェイルテストステータス
        /// </summary>
        Fail = 1,
        /// <summary>
        /// スキップテストステータス
        /// </summary>
        Skip = 2,
    }

    /// <summary>
    /// テストパラメーター
    /// </summary>
    public class TestParameters
    {
        /// <summary>
        /// テストの引数を取得または設定します
        /// </summary>
        public System.Collections.Generic.Dictionary<string, object>? Arguments { get; set; }
        /// <summary>
        /// テストパラメーターメタデータを取得または設定します
        /// </summary>
        public System.Collections.Generic.Dictionary<string, object>? Metadata { get; set; }
    }

    /// <summary>
    /// ベンチマーク測定離散統計
    /// </summary>
    public readonly struct BenchmarkDiscreteStats
    {
        /// <summary>
        /// 尖度値
        /// </summary>
        public readonly double Kurtosis;
        /// <summary>
        /// 最大値
        /// </summary>
        public readonly double Max;
        /// <summary>
        /// 平均値
        /// </summary>
        public readonly double Mean;
        /// <summary>
        /// 中央値
        /// </summary>
        public readonly double Median;
        /// <summary>
        /// 最小値
        /// </summary>
        public readonly double Min;
        /// <summary>
        /// サンプル数
        /// </summary>
        public readonly int N;
        /// <summary>
        /// 90 パーセンタイル値
        /// </summary>
        public readonly double P90;
        /// <summary>
        /// 95 パーセンタイル値
        /// </summary>
        public readonly double P95;
        /// <summary>
        /// 99 パーセンタイル値
        /// </summary>
        public readonly double P99;
        /// <summary>
        /// 歪度値
        /// </summary>
        public readonly double Skewness;
        /// <summary>
        /// 標準偏差値
        /// </summary>
        public readonly double StandardDeviation;
        /// <summary>
        /// 標準エラー値
        /// </summary>
        public readonly double StandardError;
        /// <summary>
        /// <see cref="BenchmarkDiscreteStats"/> 構造体の新しいインスタンスを初期化します。
        /// </summary>
        /// <param name="n">サンプル数</param>
        /// <param name="max">最大値</param>
        /// <param name="min">最小値</param>
        /// <param name="mean">平均値</param>
        /// <param name="median">中央値</param>
        /// <param name="standardDeviation">標準偏差値</param>
        /// <param name="standardError">標準エラー値</param>
        /// <param name="kurtosis">尖度値</param>
        /// <param name="skewness">歪度値</param>
        /// <param name="p99">99 パーセンタイル値</param>
        /// <param name="p95">95 パーセンタイル値</param>
        /// <param name="p90">90 パーセンタイル値</param>
        public BenchmarkDiscreteStats(int n, double max, double min, double mean, double median, double standardDeviation, double standardError, double kurtosis, double skewness, double p99, double p95, double p90) { }
        /// <summary>
        /// double の配列からベンチマークの離散統計値を取得します
        /// </summary>
        /// <param name="values">double の配列</param>
        /// <returns>ベンチマーク離散統計インスタンス</returns>
        public static Datadog.Trace.Ci.BenchmarkDiscreteStats GetFrom(double[] values) { }
    }

    /// <summary>
    /// ベンチマークホスト情報
    /// </summary>
    public struct BenchmarkHostInfo
    {
        /// <summary>
        /// クロノメーター周波数
        /// </summary>
        public double? ChronometerFrequencyHertz;
        /// <summary>
        /// クロノメーター分解能
        /// </summary>
        public double? ChronometerResolution;
        /// <summary>
        ///  ロジカルコア数
        /// </summary>
        public int? LogicalCoreCount;
        /// <summary>
        /// OS バージョン
        /// </summary>
        public string? OsVersion;
        /// <summary>
        /// 物理コア数
        /// </summary>
        public int? PhysicalCoreCount;
        /// <summary>
        /// 物理プロセッサー数
        /// </summary>
        public int? ProcessorCount;
        /// <summary>
        /// プロセッサー最大周波数ヘルツ
        /// </summary>
        public double? ProcessorMaxFrequencyHertz;
        /// <summary>
        /// プロセッサー名
        /// </summary>
        public string? ProcessorName;
        /// <summary>
        /// ランタイムバージョン
        /// </summary>
        public string? RuntimeVersion;
    }

    /// <summary>
    /// ベンチマークジョブ情報
    /// </summary>
    public struct BenchmarkJobInfo
    {
        /// <summary>
        /// ジョブの説明
        /// </summary>
        public string? Description;
        /// <summary>
        /// ジョブプラットフォーム
        /// </summary>
        public string? Platform;
        /// <summary>
        /// ジョブランタイムの呼称
        /// </summary>
        public string? RuntimeMoniker;
        /// <summary>
        /// ジョブランタイム名
        /// </summary>
        public string? RuntimeName;
    }

    /// <summary>
    /// ベンチマークメジャータイプ
    /// </summary>
    public enum BenchmarkMeasureType
    {
        /// <summary>
        /// ナノ秒単位の期間
        /// </summary>
        Duration = 0,
        /// <summary>
        /// ナノ秒単位の実行時間
        /// </summary>
        RunTime = 1,
        /// <summary>
        /// バイト単位の平均ヒープ割り当て量
        /// </summary>
        MeanHeapAllocations = 2,
        /// <summary>
        /// バイト単位の合計ヒープ割り当て量
        /// </summary>
        TotalHeapAllocations = 3,
        /// <summary>
        /// ナノ秒単位のアプリケーション起動
        /// </summary>
        ApplicationLaunch = 4,
        /// <summary>
        /// ガベージコレクター gen0 カウント
        /// </summary>
        GarbageCollectorGen0 = 5,
        /// <summary>
        /// ガベージコレクター gen1 カウント
        /// </summary>
        GarbageCollectorGen1 = 6,
        /// <summary>
        /// ガベージコレクター gen2 カウント
        /// </summary>
        GarbageCollectorGen2 = 7,
        /// <summary>
        /// メモリ総動作数
        /// </summary>
        MemoryTotalOperations = 8,
    }
}
{{< /code-block >}}

### コード例

次のコードは、API の簡単な使い方を表しています。

{{< code-block lang="csharp" >}}
using System.Reflection;
using Datadog.Trace.Ci;

var module = TestModule.Create(Assembly.GetExecutingAssembly().GetName().Name ?? "(dyn_module)");
module.SetTag("ModuleTag", "Value");

var suite = module.GetOrCreateSuite("MySuite");
suite.SetTag("SuiteTag", 42);

var test = suite.CreateTest("Test01");
test.SetTag("TestTag", "Value");
test.SetParameters(new TestParameters
{
    Arguments = new Dictionary<string, object>
    {
        ["a"] = 42,
        ["b"] = 0,
    }
});
test.SetTraits(new Dictionary<string, List<string>>
{
    ["Category"] = new () { "UnitTest" }
});

try
{
    var a = 42;
    var b = 0;
    var c = a / b;
}
catch (Exception ex)
{
    test.SetErrorInfo(ex);
}

test.Close(TestStatus.Fail);
suite.Close();
await module.CloseAsync();
{{< /code-block >}}

最後に必ず `module.Close()` または `module.CloseAsync()` を呼び出し、すべてのテストデータを Datadog に流すようにします。

## 収集した情報

CI Visibility を有効にすると、プロジェクトから以下のデータが収集されます。

* テストの名前と時間。
* CI プロバイダーが設定する事前定義された環境変数。
* Git のコミット履歴。ハッシュ、メッセージ、作成者情報、変更されたファイル (ファイルの内容は含まず) が含まれます。
* CODEOWNERS ファイルからの情報。

さらに、[Intelligent Test Runner][10] を有効にすると、プロジェクトから以下のデータが収集されます。

* 各テストでカバーされるファイル名と行数を含むコードカバレッジ情報。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/continuous_integration/tests/#test-suite-level-visibility
[2]: https://dtdg.co/dd-trace-dotnet-win-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-x64
[4]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[5]: https://github.com/DataDog/dd-trace-dotnet/releases
[6]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#configuration
[7]: /ja/tracing/trace_collection/custom_instrumentation/dotnet?tab=locally#adding-tags
[8]: https://www.nuget.org/packages/Datadog.Trace
[9]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/
[10]: /ja/continuous_integration/intelligent_test_runner/
[11]: /ja/continuous_integration/tests/dotnet/#instrumenting-benchmarkdotnet-tests
[12]: https://www.nuget.org/packages/Datadog.Trace.BenchmarkDotNet
[13]: /ja/continuous_integration/tests/dotnet/#configuring-reporting-method
[14]: https://github.com/coverlet-coverage/coverlet
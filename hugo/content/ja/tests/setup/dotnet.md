---
aliases:
- /ja/continuous_integration/setup_tests/dotnet
- /ja/continuous_integration/tests/dotnet
- /ja/continuous_integration/tests/setup/dotnet
code_lang: dotnet
code_lang_weight: 0
further_reading:
- link: /continuous_integration/tests/containers/
  tag: ドキュメント
  text: Containers 内でテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを調べる
- link: /tests/test_impact_analysis/dotnet
  tag: ドキュメント
  text: Test Impact Analysis を使用してテストジョブを高速化する
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング
title: .NET テスト
type: multi-code-lang
---
## 互換性{#compatibility}

サポートされているランタイムとプラットフォームの一覧については、[.NET Framework の互換性][18] と [.NET/.NET Core の互換性][19] を参照してください。

サポート対象テストフレームワーク:

| テストフレームワーク | バージョン |
|---|---|
| xUnit | 2.2 以上|
| NUnit | 3.0 以上|
| MsTestV2 | 14 以上|
| [BenchmarkDotNet][1] | 0.13.2 以上|

## 報告方法の構成 {#configuring-reporting-method}

Datadog にテスト結果を報告するには、Datadog .NET ライブラリを構成する必要があります。

{{< tabs >}}

{{% tab "自動インスツルメンテーションサポートがある CI プロバイダー" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "その他のクラウドの CI プロバイダー" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "オンプレミスの CI プロバイダー" %}}
{{% ci-agent %}}
{{% /tab %}}

{{< /tabs >}}

## .NET トレーサー CLI のインストール{#installing-the-net-tracer-cli}

以下のいずれかの方法で `dd-trace` コマンドをインストールまたは更新してください。

- 以下のコマンドを実行して、.NET SDK を使用する
   ```
   dotnet tool update -g dd-trace
   ```
- 以下の適切なバージョンをダウンロードする
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][2]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][3]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][4]

- または、[GitHub のリリースページより][5] ダウンロードする

## テストのインスツルメンテーション {#instrumenting-tests}

<div class="alert alert-warning">BenchmarkDotNet については、<a href="#instrumenting-benchmarkdotnet-tests">こちらの指示</a>に従ってください。</div>

テストスイートのインスツルメンテーションを行うには、テストコマンドの前に `dd-trace ci run` を付けてください。`--dd-service` を使用してテスト対象のサービスまたはライブラリを設定し、`--dd-env` を使用してテストが実行される環境を設定できます。たとえば、以下のとおりです。

{{< tabs >}}

{{% tab "dotnet test" %}}

<a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a> を使用する場合:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

<a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a> を使用する場合:

{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

すべてのテストは自動的にインスツルメントされます。

### Microsoft.CodeCoverage nuget パッケージとの互換性 {#compatibility-with-microsoftcodecoverage-nuget-package}

`Microsoft.CodeCoverage` バージョン `17.2.0` 以降、Microsoft は Windows でのみデフォルトで有効になる [`.NET CLR Profiling API` を使用する動的インスツルメンテーション][16] を導入しました。Datadog の自動インスツルメンテーションは `.NET CLR Profiling API` に依存しています。この API に許可されるサブスクライバーは 1 つのみです (たとえば `dd-trace`)。CodeCoverage の動的インスツルメンテーションを使用すると、自動テストインスツルメンテーションが機能しなくなります。

解決策は、動的インスツルメンテーションから [静的インスツルメンテーション][17] に切り替えることです。`.runsettings` ファイルの以下の構成項目を変更してください。

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="Code Coverage">
              <Configuration>
                <CodeCoverage>
                  <!-- Switching to static instrumentation (dynamic instrumentation collides with dd-trace instrumentation) -->
                  <EnableStaticManagedInstrumentation>True</EnableStaticManagedInstrumentation>
                  <EnableDynamicManagedInstrumentation>False</EnableDynamicManagedInstrumentation>
                  <UseVerifiableInstrumentation>False</UseVerifiableInstrumentation>
                  <EnableStaticNativeInstrumentation>True</EnableStaticNativeInstrumentation>
                  <EnableDynamicNativeInstrumentation>False</EnableDynamicNativeInstrumentation>
                  ...
                </CodeCoverage>
              </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

## 構成設定{#configuration-settings}

コマンドライン引数または環境変数を使用して、CLI のデフォルト構成を変更できます。構成設定の完全なリストについては、以下を実行してください。

{{< code-block lang="shell" >}}
dd-trace ci run --help
{{< /code-block >}}

次のリストは、主要な構成設定のデフォルト値を示しています。

`--dd-service` (オプション)
: テスト対象のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: リポジトリ名<br/>
**例**: `my-dotnet-app`

`--dd-env` (オプション)
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

`--agent-url` (Datadog Agent を使用する場合のみ)
: トレース収集用の Datadog Agent URL。`http://hostname:port` の形式にします。<br/>
**環境変数**: `DD_TRACE_AGENT_URL`<br/>
**デフォルト**: `http://localhost:8126`

`test_session.name` (環境変数としてのみ利用可能)
: `unit-tests`、`integration-tests`、`smoke-tests` などのテストグループを識別します。<br/>
**環境変数**: `DD_TEST_SESSION_NAME`<br/>
**デフォルト**: CI ジョブ名とテストコマンド、または CI ジョブ名が利用できない場合はテストコマンド。<br/>
**例**: `unit-tests`、`integration-tests`、`smoke-tests`

`service` および `env` の予約タグの詳細については、[unified service tagging][6] を参照してください。他のすべての [Datadog トレーサー構成][7] オプションも使用できます。

### テストにカスタムタグを追加する {#adding-custom-tags-to-tests}

テストにカスタムタグを追加するには、まず[カスタムインスツルメンテーション](#custom-instrumentation)を構成してください。

現在アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test_owner", "my_team");
}
// test continues normally
// ...
```

これらのタグに対してフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加の詳細については、.NET カスタムインスツルメンテーションドキュメントの [タグの追加][8] セクションを参照してください。

### テストへのカスタム測定値の追加 {#adding-custom-measures-to-tests}

テストにカスタム測定値を追加するには、まず[カスタムインスツルメンテーション](#custom-instrumentation)を構成してください。

タグと同様に、現在アクティブなスパンを使用して、テストにカスタム測定値を追加できます。

```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("memory_allocations", 16);
}
// test continues normally
// ...
```

これらのタグに対してフィルターや視覚化を作成するには、まずファセットを作成する必要があります。タグの追加の詳細については、.NET カスタムインスツルメンテーションドキュメントの [タグの追加][8] セクションを参照してください。

カスタム測定値の詳細については、[カスタム測定値の追加ガイド][9] を参照してください。

### コードカバレッジを報告する {#reporting-code-coverage}

コードカバレッジが利用できる場合、Datadog トレーサー (v2.31.0 以降) は、テストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

[Coverlet][10] を使用してコードカバレッジを計算している場合は、`dd-trace` を実行する際に `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` 環境変数でレポートファイルへのパスを指定します。レポートファイルは、OpenCover または Cobertura 形式であることが必要です。あるいは、`DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` 環境変数を使用して、Datadog トレーサーの組み込みコードカバレッジ計算を有効にすることもできます。

**注**: Test Impact Analysis を使用する場合、SDK の組み込みコードカバレッジはデフォルトで有効になります。

テストセッションの [{{< ui >}}Coverage{{< /ui >}}] (カバレッジ) タブで、テストカバレッジの推移を見ることができます。

除外オプションの詳細については、[Code Coverage][11] を参照してください。

### BenchmarkDotNet テストのインスツルメンテーション{#instrumenting-benchmarkdotnet-tests}

ベンチマークテストをインスツルメンテーションするには、以下を行う必要があります。

1. [`Datadog.Trace.BenchmarkDotNet` NuGet パッケージ][12] をプロジェクトに追加します (たとえば、`dotnet add package Datadog.Trace.BenchmarkDotNet` を使用)。
2. `Datadog.Trace.BenchmarkDotNet` 属性または `DatadogDiagnoser` 拡張メソッドを使用して、エクスポーターを使用するようにプロジェクトを構成します。`WithDatadog()`たとえば、以下のとおりです。

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

{{% ci-git-metadata %}}

## カスタムインスツルメンテーション {#custom-instrumentation}

<div class="alert alert-danger">
  <strong>注:</strong> カスタムインスツルメンテーションのセットアップは、 <code>dd-trace</code> のバージョンに依存します。カスタムインスツルメンテーションを使用するには、 <code>dd-trace</code> および <code>Datadog.Trace</code> NuGet パッケージのパッケージバージョンが同期しているようにすることが必要です。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには、以下の手順に従います。

1. `dd-trace --version` を実行して、ツールのバージョンを取得します。
2. 同じバージョンの `Datadog.Trace` [NuGet パッケージ][14] をアプリケーションに追加します。
3. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

カスタムインスツルメンテーションのスパンやタグの追加方法については、[.NET カスタムインスツルメンテーションのドキュメント][15] を参照してください。

## 手動テスト API {#manual-testing-api}

<div class="alert alert-danger">
  <strong>注:</strong> 手動テスト API を使用するには、ターゲットの .NET プロジェクトに <code>Datadog.Trace</code> NuGet パッケージを追加することが必要です。
</div>

.NET プロジェクトで XUnit、NUnit、または MSTest を使用する場合、Test Optimization はそれらを自動的にインスツルメンテーションし、テスト結果を Datadog に送信します。サポートされていないテストフレームワークを使用する場合、または別のテストメカニズムを使用する場合は、代わりに API を使用してテスト結果を Datadog に報告できます。

この API は、テストモジュール、テストスイート、テストの 3 つの概念に基づいています。

### テストモジュール{#test-module}

テストモジュールは、テストを含む .NET アセンブリを表します。

テストモジュールを開始するには、`TestModule.Create()` を呼び出し、テストが配置されているモジュール名または .NET アセンブリ名を渡してください。

すべてのテストが終了したら、`module.Close()` または `module.CloseAsync()` を呼び出してください。これにより、ライブラリは残りのすべてのテスト結果をバックエンドに強制的に送信します。

### テストスイート{#test-suites}

テストスイートは、一連のテストで構成されます。これらには、共通の初期化メソッドと終了メソッドがあり、いくつかの変数を共有できます。.NET では、通常、複数のテストメソッドを含むテストクラスまたはフィクスチャとして実装されます。テストスイートには、属性やエラー情報などの追加情報をオプションで含めることができます。

テストモジュールにテストスイートを作成するには、`module.GetOrCreateSuite()` を呼び出し、テストスイート名を渡します。

テストスイート内の関連するテストがすべて実行を完了したら `suite.Close()` を呼び出します。

### テスト{#tests}

各テストはテストスイート内で実行され、`TestStatus.Pass`、`TestStatus.Fail`、または `TestStatus.Skip` の 3 つのステータスのいずれかで終了する必要があります。

テストは、オプションで以下のような付加情報を持つことができます。

- パラメーター
- 属性
- エラー情報
- テスト特性
- ベンチマークデータ

スイート内にテストを作成するには、`suite.CreateTest()` を呼び出し、テスト名を渡します。テストが終了したら、定義済みのステータスのいずれかを指定して`test.Close()`を呼び出します。

### コード例{#code-example}

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

すべてのテストデータが Datadog に渡されるように、最後に必ず `module.Close()` または `module.CloseAsync()` を呼び出してください。

## ベストプラクティス{#best-practices}

### テストセッション名 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME` を使用してテストセッションの名前と関連するテストグループを定義します。このタグの値の例は次のとおりです。

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME` が指定されていない場合、デフォルトで CI ジョブ名とテストコマンドになります。CI ジョブ名が利用できない場合は、テストコマンドが使用されます。

異なるテストグループを区別しやすくするため、テストセッション名はリポジトリ内で一意でなければなりません。

#### `DD_TEST_SESSION_NAME` を使用するタイミング{#when-to-use-dd-test-session-name}

Datadog がテストセッション間の対応関係を確立するためにチェックするパラメーターのセットがあります。テストの実行に使用されるテストコマンドもその 1 つです。一時フォルダーなど、実行ごとに変化する文字列がテストコマンドに含まれる場合、Datadog はそれらのセッションを互いに無関係なものとみなします。たとえば、以下のような場合です。

- `dotnet test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

テストコマンドが実行ごとに異なる場合、Datadog は `DD_TEST_SESSION_NAME` を使用することを推奨します。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/continuous_integration/tests/setup/dotnet/?tab=onpremisesciproviderdatadogagent#instrumenting-benchmarkdotnet-tests
[2]: https://dtdg.co/dd-trace-dotnet-win-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-x64
[4]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[5]: https://github.com/DataDog/dd-trace-dotnet/releases
[6]: /ja/getting_started/tagging/unified_service_tagging
[7]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#configuration
[8]: /ja/tracing/trace_collection/custom_instrumentation/dotnet?tab=locally#adding-tags
[9]: /ja/tests/guides/add_custom_measures/?tab=net
[10]: https://github.com/coverlet-coverage/coverlet
[11]: /ja/continuous_integration/tests/code_coverage/?tab=net
[12]: https://www.nuget.org/packages/Datadog.Trace.BenchmarkDotNet
[13]: /ja/continuous_integration/tests/dotnet/#configuring-reporting-method
[14]: https://www.nuget.org/packages/Datadog.Trace
[15]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/
[16]: https://github.com/microsoft/codecoverage/blob/main/docs/instrumentation.md
[17]: https://github.com/microsoft/codecoverage/blob/main/samples/Calculator/scenarios/scenario07/README.md
[18]: /ja/tracing/trace_collection/compatibility/dotnet-framework/
[19]: /ja/tracing/trace_collection/compatibility/dotnet-core/
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
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
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
{{< /tabs >}}

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

{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

<a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a> の使用によって

{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

すべてのテストは自動的にインスツルメントされます。

## コンフィギュレーション設定

コマンドライン引数または環境変数を使用して、CLI のデフォルトコンフィギュレーションを変更できます。コンフィギュレーション設定の完全なリストについては、以下を実行してください。

{{< code-block lang="bash" >}}
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
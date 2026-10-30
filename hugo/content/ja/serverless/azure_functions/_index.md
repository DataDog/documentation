---
further_reading:
- link: /serverless/guide/disable_serverless
  tag: ドキュメント
  text: Serverless Monitoring を無効にする
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=azure#azure-functions
  tag: ドキュメント
  text: OTLP を使用して Azure Functions のトレースを Datadog に送信する
- link: http://datadoghq.com/blog/azure-well-architected-serverless-applications-best-practices/
  tag: ブログ
  text: Well-Architected Framework を使用して、安全でスケーラブルな Azure Serverless アプリケーションを構築する
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: ブログ
  text: Datadog を使用して、すべてのホスティングプランで Azure Functions を監視する
title: Azure Functions 用の Serverless Monitoring をインストールする
---
## 概要{#overview}
このページでは、Azure Functions からトレース、トレースメトリクス、ランタイムメトリクス、拡張メトリクス、カスタムメトリクスを収集する方法を説明します。[拡張メトリクス][11]は `azure.functions.enhanced.*` 名前空間によって区別されます。追加のメトリクスを収集するには、[Datadog Azure インテグレーション][5] をインストールしてください。

以下は、Azure Functions モニタリングでサポートされているランタイム、オペレーティングシステム (OS)、およびホスティングプランのリストです。
- **ランタイム**: .NET、Node.js、Python、Java
- **オペレーティングシステム (OS)**: Windows、Linux
- **ホスティングプラン**: Dedicated (App Service) プラン、Premium プラン、Consumption プラン、Flex Consumption プラン

推奨されるインストール方法は、Azure Function の構成によって異なります。
- Dedicated/App Service または Premium プランで実行されている .NET Windows Azure Functions の場合: [Datadog .NET APM Extension][9] を使用します。
- その他のすべての構成 (異なるランタイム、オペレーティングシステム、ホスティングプランを含む) の場合: 以下の手順に従って Serverless Compatibility Layer をインストールしてください。

## セットアップ {#setup}

まだ [Datadog-Azure インテグレーション][5] をインストールしていない場合は、メトリクスとログを収集するためにインストールしてください。次に、以下のステップでアプリケーションをインスツルメントします。

{{< programming-lang-wrapper langs="nodejs,python,java,dotnet" >}}
{{< programming-lang lang="nodejs" >}}
1. **依存関係をインストールします**。次のコマンドを実行します。
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   Datadog では、機能強化やバグ修正を確実に利用できるように、パッケージのバージョンを固定し、`@datadog/serverless-compat` と `dd-trace` の両方を定期的に最新バージョンにアップグレードすることを推奨しています。

2. **Datadog Serverless Compatibility Layer を起動し、Datadog Node.js SDK を初期化します**。
   
   `--require` オプションを使用して、Serverless Compatibility Layer と Datadog Node.js SDK を 1 つのステップで読み込み、初期化します。Azure Functions の Node オプションは、環境変数 `languageWorkers__node__arguments` で構成できます。

   ```
   languageWorkers__node__arguments='--require @datadog/serverless-compat/init --require dd-trace/init'
   ```

3. **Datadog Node.js SDK を構成します**

   [Node.js SDK の構成][1]

[1]:/ja/tracing/trace_collection/library_config/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **依存関係をインストールします**。次のコマンドを実行します。
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   Datadog では、機能強化やバグ修正を確実に利用できるように、`datadog-serverless-compat` と `ddtrace` の両方の最新バージョンを使用することを推奨しています。

2. **Datadog Serverless Compatibility Layer を起動し、Datadog Python SDK を初期化します**。メインアプリケーションのエントリポイントファイルに以下の行を追加します。

   ```python
   from datadog_serverless_compat import start
   start()

   import ddtrace.auto # noqa: E402, F401
   ```

3. **Datadog Python SDK を構成します**

   [Python SDK の構成][1]

[1]:/ja/tracing/trace_collection/library_config/python
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
1. **依存関係をインストールします**。Datadog JAR をダウンロードし、関数と一緒にデプロイします。
   ```bash
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   wget -O dd-serverless-compat-java-agent.jar 'https://dtdg.co/latest-serverless-compat-java-agent'
   ```
   Datadog Serverless Compatibility Layer の特定のバージョンについては、Datadog の [Maven リポジトリ][1]を参照してください。

   Datadog では、機能強化やバグ修正を確実に利用できるように、`dd-serverless-compat-java-agent` と `dd-java-agent` の両方を定期的に最新バージョンにアップグレードすることを推奨しています。

2. **Datadog Serverless Compatibility Layer を起動し、Datadog Java SDK を初期化します**。以下の `-javaagent` 引数を JVM オプションに追加します。

   ```bash
   -javaagent:/path/to/dd-serverless-compat-java-agent.jar -javaagent:/path/to/dd-java-agent.jar
   ```

   **注**: JVM オプションを設定するための環境変数は、ホスティングプラン (Consumption、Elastic Premium、Dedicated など) によって異なります。ホスティングプランに適した環境変数の詳細については、[Azure Functions Java 開発者ガイド][2]を参照してください。

3. **Datadog Java SDK を構成します**

   [Java SDK の構成][3]

[1]: https://repo1.maven.org/maven2/com/datadoghq/dd-serverless-compat-java-agent/
[2]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-java?tabs=bash%2Cconsumption#customize-jvm
[3]: /ja/tracing/trace_collection/library_config/java
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
1. **依存関係をインストールします**。次のコマンドを実行します。
   ```shell
   dotnet package add Datadog.AzureFunctions
   ```

   Datadog では、機能強化やバグ修正を確実に利用できるように、`Datadog.AzureFunctions` を定期的に最新バージョンにアップグレードすることを推奨しています。

2. **Datadog Serverless Compatibility Layer を起動します**。

   Azure Function アプリで Isolated Worker モデルを使用している場合は、メインアプリケーションのエントリポイントファイルに以下の行を追加します。
   ```csharp
   Datadog.Serverless.CompatibilityLayer.Start();
   ```

   Azure Function アプリで [レガシーインプロセスモデル][3]を使用している場合は、`Microsoft.Azure.Functions.Extensions` への NuGet パッケージ参照を追加します。
   ```shell
   dotnet package add Microsoft.Azure.Functions.Extensions
   ```

   また、以下の `.cs` ファイルをアプリケーションに追加します。
   ```csharp
   using Datadog.Serverless;
   using Microsoft.Azure.Functions.Extensions.DependencyInjection;

   [assembly: FunctionsStartup(typeof(MyFunctionApp.Startup))]

   namespace MyFunctionApp
   {
      public class Startup : FunctionsStartup
      {
         public override void Configure(IFunctionsHostBuilder builder)
         {
               Datadog.Serverless.CompatibilityLayer.Start();
         }
      }
   }
   ```

3. **自動インスツルメンテーションを構成します**

   Azure Function アプリが Windows 上で実行されている場合は、以下の環境変数を Function アプリに追加します。
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH_64=
   C:\home\site\wwwroot\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll

   CORECLR_PROFILER_PATH_32=
   C:\home\site\wwwroot\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll

   DD_DOTNET_TRACER_HOME=C:\home\site\wwwroot\datadog

   ```

   Azure Function アプリが Linux 上で実行されている場合は、以下の環境変数を Function アプリに追加します。
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH=
      /home/site/wwwroot/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so

   DD_DOTNET_TRACER_HOME=/home/site/wwwroot/datadog

   ```

4. **Datadog .NET SDK を構成します**

   - [Datadog .NET Core SDK の構成][1]
   - [Datadog .NET Framework SDK の構成][2]

[1]: /ja/tracing/trace_collection/library_config/dotnet-core
[2]: /ja/tracing/trace_collection/library_config/dotnet-framework
[3]: https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-in-process-differences
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **関数をデプロイします**。

6. **Datadog のインテークを構成します**。関数のアプリケーション設定に、以下の環境変数を追加します。

   | 名前 | 値 |
   | ---- | ----- |
   | `DD_API_KEY` | [Datadog API キー][1]。|
   | `DD_SITE` | [Datadog サイト][2]。たとえば、{{< region-param key=dd_site code="true" >}}. |
   | `DD_AZURE_RESOURCE_GROUP` | Azure リソースグループ。[Flex Consumption プラン][8]の Azure Functions でのみ必要です。|

   {{% svl-tracing-env %}}

7. **Unified Service Tagging を構成します**。[Datadog Azure インテグレーション][5] をインストールすることで、Azure Functions からメトリクスを収集できます。これらのメトリクスをトレースと関連付けるには、まず Azure のリソースで `env`、`service`、`version` タグを設定します。次に、以下の環境変数を構成します。

   | 名前 | 値 |
   | ---- | ----- |
   | `DD_ENV` | [Unified Service Tagging][7] 用に環境をどのようにタグ付けするか。たとえば、`prod` です。|
   | `DD_SERVICE` | [Unified Service Tagging][7] 用にサービスをどのようにタグ付けするか。 |
   | `DD_VERSION` | [Unified Service Tagging][7] 用にバージョンをどのようにタグ付けするか。|

## 次のステップ{#whats-next}

- Azure Functions のトレースは [{{< ui >}}Trace Explorer{{< /ui >}}][3] で表示できます。環境変数 `DD_SERVICE` に設定したサービス名を検索して、トレースを確認します。
- [Datadog Azure インテグレーション][5] によって収集されたテレメトリで強化されたトレースは、[{{< ui >}}Serverless{{< /ui >}} > {{< ui >}}Azure Functions{{< /ui >}}][4] ページで確認できます。

## プロファイリング {#profiling}

<div class="alert alert-info">
Datadog の Continuous Profiler は、Azure Functions の Python および Node.js 用プレビューで利用可能です。
</div>

[Continuous Profiler][10] を有効にするには、環境変数 `DD_PROFILING_ENABLED=true` を設定してください。

## トラブルシューティング {#troubleshooting}

### デバッグログの有効化 {#enable-debug-logs}

トラブルシューティングのために[デバッグログ][6]を収集できます。デバッグログを構成するには、以下の環境変数を使用します。

`DD_TRACE_DEBUG`
: Datadog SDK のデバッグログを有効 (`true`) または無効 (`false`) にします。デフォルトは `false` です。

  **値**: `true`、`false`

`DD_LOG_LEVEL`
: Datadog Serverless Compatibility Layer のログレベルを設定します。デフォルトは `info` です。

  **値**: `trace`、`debug`、`info`、`warn`、`error`、`critical`、`off`

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /ja/getting_started/site
[3]: https://app.datadoghq.com/apm/traces
[4]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[5]: /ja/integrations/azure/
[6]: /ja/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[7]: /ja/getting_started/tagging/unified_service_tagging/
[8]: https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan
[9]: /ja/serverless/azure_functions/dotnet_extension/
[10]: /ja/profiler/
[11]: /ja/integrations/azure-functions/#metrics
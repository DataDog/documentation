---
algolia:
  tags:
  - C#
  - APM
aliases:
- /ja/tracing/dotnet
- /ja/tracing/languages/dotnet
- /ja/tracing/setup/dotnet
- /ja/tracing/setup_overview/dotnet
- /ja/agent/apm/dotnet/
- /ja/tracing/dotnet-framework
- /ja/tracing/languages/dotnet-framework
- /ja/tracing/setup/dotnet-framework
- /ja/agent/apm/dotnet-framework/
- /ja/tracing/setup_overview/dotnet-framework
- /ja/tracing/setup_overview/setup/dotnet
- /ja/tracing/setup_overview/setup/dotnet-framework
- /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 70
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: ドキュメント
  text: .NET アプリケーションログとトレースの接続
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: ドキュメント
  text: ランタイムメトリクス
- link: /serverless/azure_app_services/
  tag: ドキュメント
  text: Microsoft Azure App Service 拡張機能
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの調査
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した .NET のモニタリング
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: ブログ
  text: コンテナ化された ASP.NET コアアプリケーションを監視する
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: ブログ
  text: AWS Fargate でコンテナ化された ASP.NET コアアプリケーションを監視する
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: ブログ
  text: Datadog Continuous Profiler で .NET アプリケーションのパフォーマンスを最適化する
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: ソースコード
  text: カスタムインスツルメンテーションの例
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: ソースコード
  text: ソースコード
title: .NET Framework アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件 {#compatibility-requirements}

### サポートされている .NET フレームワークのランタイム {#supported-net-framework-runtimes}

.NET トレーサーは、.NET Framework 4.6.1 以上のインスツルメンテーションをサポートします。

Datadog の .NET Framework ライブラリとプロセッサアーキテクチャーのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]を参照してください。

## インストールと利用開始 {#installation-and-getting-started}

<div class="alert alert-info">
  AWS Lambda または Azure Functions などの Serverless 環境で Datadog APM を設定するには、<a href="/serverless">Serverless</a> を参照してください。
</div>

<div class="alert alert-danger">
  <strong>注:</strong> Datadog 自動インスツルメンテーションは、.NET CLR Profiling API に依存します。この API に許可されるサブスクライバーは 1 つのみです (たとえば Datadog APM)。可視性を最大限に向上するため、アプリケーション環境で 1 つの APM ソリューションのみを実行してください。
</div>

### インストール {#installation}

作業を始める前に、[Agent のインストールと構成][12]が済んでいることを確認してください。

1. [SDK をインストールします。](#install-the-sdk)
3. [サービスの SDK を有効にします。](#enable-the-sdk-for-your-service)
4. [ライブデータを表示します。](#view-your-live-data)

### SDK のインストール {#install-the-sdk}

Datadog Agent をインストールして構成した後、次の手順として、アプリケーションに SDK を直接追加し、そのアプリケーションをインスツルメントします。[互換性情報][1]の詳細を確認してください。

Datadog .NET Tracer は、マシン上のすべてのサービスがインスツルメントされるようにマシン全体にインストールするか、アプリケーションごとにインストールし、開発者はアプリケーションの依存関係を通じてインスツルメンテーションを管理することができます。マシン全体のインストール手順を見るには、Windows タブをクリックします。アプリケーションごとのインストール手順を見るには、NuGet タブをクリックします。

{{< tabs >}}

{{% tab "Windows" %}}

.NET Tracer をマシン全体にインストールするには

1. [.NET トレーサー MSI インストーラー][1]をダウンロードします。64 ビット Windows を使用している場合は、x64 MSI インストーラーを使用します。これにより、64 ビットおよび 32 ビットアプリケーションの両方をインスツルメントできます。32 ビット Windows を使用している場合は、x86 インストーラーのみを選択します。弊社は 32 ビットオペレーティングシステムをサポートしていないため、v3.0.0 以降は x64 インストーラーのみが提供されます。

2. 管理者権限で .NET トレーサー MSI インストーラーを実行します。

PowerShell で次を実行することで、MSI セットアップをスクリプト化することもできます: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>注:</strong> このインストールは、IIS で動作するアプリケーションをインスツルメントするものではありません。IIS で実行されるアプリケーションについては、Windows マシン全体のインストールプロセスに従ってください。
</div>

.NET Tracer をアプリケーション単位でインストールするには

1. `Datadog.Trace.Bundle` [NuGet パッケージ][1]をアプリケーションに追加します。


[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### サービスの SDK を有効にする{#enable-the-sdk-for-your-service}

サービスの .NET Tracer を有効にするには、必要な環境変数を設定し、アプリケーションを再起動します。

環境変数の設定方法の違いについては、[プロセス環境変数の構成](#configuring-process-environment-variables)を参照してください。

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS) {#internet-information-services-iis}

1. .NET トレーサー MSI インストーラーは、必要な環境変数をすべて追加します。構成する必要のある環境変数はありません。

2. IIS でホストされるアプリケーションを自動でインスツルメントするには、管理者として次のコマンドを実行して IIS を完全に停止してから起動します。

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>注:</strong> SDK を有効にするために、必ず上記のコマンドを使用して IIS を完全に停止してから再起動してください。IIS Manager GUI アプリケーションまたは <code>iisreset.exe</code>まで。
   </div>


#### IIS 以外のサービス {#services-outside-iis}

<div class="alert alert-danger">
  <strong>注:</strong> .NET ランタイムは .NET ライブラリをこれらの環境変数が設定時に開始した<em>あらゆる</em> .NETプロセスにロードしようとします。このため、インスツルメンテーションをインスツルメントされる必要があるアプリケーションのみに制限してください。<strong>ホストの<em>すべての</em> .NET プロセスがインスツルメントされることになるため、これらの環境変数をグローバルに設定しないでください。</strong>
</div>

1. 自動インスツルメンテーションをアプリケーションにアタッチするために、以下の必要な環境変数を設定します。

   ```
   COR_ENABLE_PROFILING=1
   ```
2. スタンドアロンアプリケーションや Windows サービスの場合は、手動でアプリケーションを再起動します。

{{% /tab %}}

{{% tab "NuGet" %}}

パッケージの Readme に書かれている手順に従ってください。[`dd-trace-dotnet` リポジトリ][1]でも公開されています。
Docker のサンプルも[リポジトリ][2]で公開されています。

[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment

{{% /tab %}}

{{< /tabs >}}

### ライブデータを表示 {#view-your-live-data}

サービスの .NET Tracer を有効にした後:

1. サービスを再起動します。

2. アプリケーションロードを作成します。

3. Datadog で [**APM** > **APM Traces**][3] の順に移動します。

## 構成 {#configuration}

必要に応じて、Unified Service Tagging の設定など、アプリケーションパフォーマンスのテレメトリデータを送信するための SDK を構成します。詳細については、[ライブラリの構成][4]を参照してください。

## カスタムインスツルメンテーション {#custom-instrumentation}

カスタムインスツルメンテーションは、自動インスツルメンテーションによって異なり、メソッドによっては追加の手順が含まれます。

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
<strong>注:</strong> v3.0.0以降、カスタムインスツルメンテーションを使用するには、自動インスツルメンテーションも使用する必要があります。自動インスツルメンテーションとカスタムインスツルメンテーションのパッケージバージョン (例: MSI や NuGet) の同期を維持し、パッケージのメジャーバージョンを混合しないようにする必要があります。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. 自動インスツルメンテーションを使用してアプリケーションをインスツルメントします。
2. `Datadog.Trace` [NuGet パッケージ][1]をアプリケーションに追加します。
3. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

[1]: https://www.nuget.org/packages/Datadog.Trace

{{% /tab %}}

{{% tab "NuGet" %}}

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

{{% /tab %}}

{{< /tabs >}}

カスタムインスツルメンテーションのスパンやタグの追加について詳しくは、[.NET カスタムインスツルメンテーションのドキュメント][5]を参照してください。

## プロセス環境変数の構成{#configuring-process-environment-variables}

サービスに自動インスツルメンテーションをアタッチするには、アプリケーションを起動する前に、必要な環境変数を設定してください。.NET Tracer のインストール方法に応じて設定する環境変数を特定するために、[サービスの SDK を有効にする](#enable-the-sdk-for-your-service)のセクションを参照し、以下の例に従って、インスツルメントされたサービスの環境に基づいて環境変数を正しく設定します。

<div class="alert alert-danger">
  <strong>注:</strong> .NET ランタイムは .NET ライブラリをこれらの環境変数が設定時に開始した<em>あらゆる</em> .NETプロセスにロードしようとします。このため、インスツルメンテーションをインスツルメントされる必要があるアプリケーションのみに制限してください。<strong>ホストの<em>すべての</em> .NET プロセスがインスツルメントされることになるため、これらの環境変数をグローバルに設定しないでください。</strong>
</div>

#### Windows サービス {#windows-services}

{{< tabs >}}

{{% tab "レジストリエディター" %}}

レジストリエディターで、`HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` キーに `Environment` 複数の文字列値を作成します。

```text
COR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="レジストリエディターを使用して Windows サービスの環境変数を作成する" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'COR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS {#iis}

MSI をインストールした後、IIS サイトを自動的にインスツルメンテーションするための追加構成は必要ありません。すべての IIS サイトに継承される追加の環境変数を設定するには、次の手順を実行します。

1. レジストリエディターを開き、`HKLM\System\CurrentControlSet\Services\WAS` キーにある `Environment` という複数文字列の値を探し、1 行に 1 つずつ環境変数を追加します。例えば、ログの挿入とランタイムメトリクスを追加するには、値データに以下の行を追加します。
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. 以下のコマンドを実行し、IIS を再起動します。
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="レジストリエディターを使用してすべての IIS サイトの環境変数を作成する" >}}

#### コンソールアプリケーション {#console-applications}

コンソールアプリケーションを自動的にインスツルメントするには、アプリケーションを起動する前に、バッチファイルから環境変数を設定します。

```bat
rem Set required environment variables
SET COR_ENABLE_PROFILING=1

rem (Optionally) Set additional Datadog environment variables, for example:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/compatibility_requirements/dotnet-framework
[2]: /ja/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /ja/tracing/trace_collection/library_config/dotnet-framework/
[5]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/
[11]: /ja/tracing/trace_collection/library_injection_local/
[12]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
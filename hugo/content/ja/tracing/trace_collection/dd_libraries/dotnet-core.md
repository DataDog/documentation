---
algolia:
  tags:
  - C#
  - APM
aliases:
- /ja/tracing/dotnet-core
- /ja/tracing/languages/dotnet-core
- /ja/tracing/setup/dotnet-core
- /ja/agent/apm/dotnet-core/
- /ja/tracing/setup/dotnet-core
- /ja/tracing/setup_overview/dotnet-core
- /ja/tracing/setup_overview/setup/dotnet-core
- /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
code_lang: dotnet-core
code_lang_weight: 60
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: よくあるご質問
  text: .NET アプリケーションログとトレースの接続
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: よくあるご質問
  text: ランタイムメトリクス
- link: /serverless/azure_app_services/
  tag: よくあるご質問
  text: Microsoft Azure App Service 拡張機能
- link: /tracing/glossary/
  tag: よくあるご質問
  text: サービス、リソース、トレースの調査
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した .NET のモニタリング
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: ブログ
  text: コンテナ化された ASP.NET コアアプリケーションを監視する
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: ブログ
  text: ASP.NET Core アプリケーションを Azure App Service にデプロイする
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: ブログ
  text: Datadog Continuous Profiler で .NET アプリケーションのパフォーマンスを最適化する
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: ソースコード
  text: カスタムインスツルメンテーションの例
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: ソースコード
  text: ソースコード
title: .NET コアアプリケーションのトレース
type: multi-code-lang
---
## 互換性要件{#compatibility-requirements}

### サポートされている .NET Core のランタイム{#supported-net-core-runtimes}

.NET Tracer は、.NET Core 3.1、.NET 5、.NET 6、.NET 7、.NET 8、.NET 9、.NET 10 でのインスツルメンテーションをサポートします。

Datadog の .NET Core ライブラリとプロセッサータアーキテクチャのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1] を参照してください。

## インストールと利用開始{#installation-and-getting-started}

<div class="alert alert-info">
    AWS Lambda または Azure Functions などの Serverless 環境で Datadog APM を設定するには、<a href="/serverless">Serverless</a> を参照してください。
</div>

<div class="alert alert-danger">
  <strong>注:</strong> Datadog 自動インスツルメンテーションは、.NET CLR Profiling API に依存します。この API に許可されるサブスクライバーは 1 つのみです (たとえば Datadog APM)。可視性を最大限に向上するため、アプリケーション環境で 1 つの APM ソリューションのみを実行してください。
</div>

<div class="alert alert-info">
  トリミングされたアプリをインスツルメンテーションするには、プロジェクトで <a href="https://www.nuget.org/packages/Datadog.Trace.Trimming/">Datadog.Trace.Trimming</a> NuGet パッケージを参照してください。
</div>

### インストール {#installation}

作業を始める前に、[Agent のインストールと構成][12] が済んでいることを確認してください。

1. [Install the SDK.](#install-the-sdk)
2. [Enable the SDK for your service.](#enable-the-sdk-for-your-service)
3. [View your live data.](#view-your-live-data)

### SDK のインストール {#install-the-sdk}

Datadog Agent をインストールして構成した後、次の手順として、アプリケーションに SDK を直接追加し、そのアプリケーションをインスツルメントします。[互換性情報][1] の詳細を確認してください。

Datadog .NET Tracer は、マシン上のすべてのサービスがインスツルメントされるようにマシン全体にインストールすることも、アプリケーションごとにインストールすることも可能で、開発者はアプリケーションの依存関係を通じてインスツルメンテーションを管理することができます。マシン全体のインストール手順を見るには、Windows または Linux タブをクリックします。アプリケーションごとのインストール手順を見るには、NuGet タブをクリックします。

{{< tabs >}}

{{% tab "Windows" %}}

.NET Tracer をマシン全体にインストールするには

1. [.NET トレーサー MSI インストーラー][1] をダウンロードします。64 ビット Windows を使用している場合は、x64 MSI インストーラーを使用します。これにより、64 ビットおよび 32 ビットアプリケーションの両方をインスツルメントできます。32 ビット Windows を使用している場合は、x86 インストーラーのみを選択します。弊社は 32 ビットオペレーティングシステムをサポートしていないため、v3.0.0 以降は x64 インストーラーのみが提供されます。

2. 管理者権限で .NET トレーサー MSI インストーラーを実行します。

PowerShell で次を実行することで、MSI セットアップをスクリプト化することもできます: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

.NET Tracer をマシン全体にインストールするには

1. お使いの OS とアーキテクチャに対応した最新の [.NET Tracer パッケージ][1] をダウンロードします。

2. 以下のコマンドのいずれかを実行して、パッケージをインストールし、適切な権限で .NET トレーサーのログディレクトリ `/var/log/datadog/dotnet` を作成します。

   Debian または Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && /opt/datadog/createLogPath.sh`

   CentOS または Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && /opt/datadog/createLogPath.sh`

   Alpine などの musl ベースの分布
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   その他の分布
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && /opt/datadog/createLogPath.sh`

#### Chiseled コンテナ {#chiseled-containers}

chiseled または distroless の Docker イメージ (シェルなし) に .NET トレーサーをインストールするには、以下の Dockerfile コマンドを使用します。

- SDK ファイルをコンテナに配置するには `ADD` を使用します。
- 空のフォルダーをソースとして使用してログパスを作成するには `COPY --chown=$APP_UID` を使用します。

たとえば Dockerfile で: 

```dockerfile
ADD datadog-dotnet-apm-<TRACER_VERSION>.tar.gz /opt/datadog/
COPY --chown=$APP_UID --from=<OTHER_STAGE> /empty/ /var/log/datadog/dotnet/
```

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>注:</strong> このインストールは、IIS で動作するアプリケーションをインスツルメントするものではありません。IIS で実行されるアプリケーションについては、Windows マシン全体のインストールプロセスに従ってください。
</div>

.NET Tracer をアプリケーション単位でインストールするには

1. `Datadog.Trace.Bundle` [NuGet パッケージ][1] をアプリケーションに追加します。

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### サービスの SDK を有効にする{#enable-the-sdk-for-your-service}

サービスの .NET Tracer を有効にするには、必要な環境変数を設定し、アプリケーションを再起動します。

環境変数の設定方法の違いについては、[Configuring process environment variables](#configuring-process-environment-variables) を参照してください。

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS) {#internet-information-services-iis}

1. .NET トレーサー MSI インストーラーは、必要な環境変数をすべて追加します。構成する必要のある環境変数はありません。

   <div class="alert alert-danger">
     <strong>注:</strong> アプリケーションプールの <strong>.NET CLR バージョン</strong> を <strong>No Managed Code</strong> に設定する必要があります。これは <a href='https://learn.microsoft.com/aspnet/core/host-and-deploy/iis/advanced#create-the-iis-site'>Microsoft</a> によって推奨されています。
   </div>

2. IIS でホストされるアプリケーションを自動でインスツルメントするには、管理者として次のコマンドを実行して IIS を完全に停止してから起動します。

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>注:</strong> SDK を有効にするために、必ず上記のコマンドを使用して IIS を完全に停止してから再起動してください。IIS Manager GUI アプリケーションまたは <code>iisreset.exe</code>の使用は避けてください。
   </div>


#### IIS にないサービス {#services-not-in-iis}

1. 自動インスツルメンテーションをアプリケーションにアタッチするために、以下の必要な環境変数を設定します。

   ```
   CORECLR_ENABLE_PROFILING=1
   ```
2. スタンドアロンアプリケーションや Windows サービスの場合は、手動でアプリケーションを再起動します。

{{% /tab %}}

{{% tab "Linux" %}}

1. 自動インスツルメンテーションをアプリケーションにアタッチするために、以下の必要な環境変数を設定します。

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   ```

2. スタンドアロンアプリケーションの場合は、通常通り手動でアプリケーションを再起動します。

{{% /tab %}}

{{% tab "NuGet" %}}

パッケージの Readme に書かれている手順に従ってください。[`dd-trace-dotnet` リポジトリ][1] でも公開されています。
Docker のサンプルも [リポジトリ][2] で公開されています。

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### ライブデータの表示{#view-your-live-data}

サービスの .NET Tracer を有効にした後:

1. サービスを再起動します。

2. アプリケーションロードを作成します。

3. Datadog で [**APM** > **APM トレース**][3] の順に移動します。

## 構成 {#configuration}

必要に応じて、Unified Service Tagging の設定など、アプリケーションパフォーマンスのテレメトリデータを送信するための SDK を構成します。詳細については、[ライブラリの構成][4] を参照してください。

## カスタムインスツルメンテーション {#custom-instrumentation}

カスタムインスツルメンテーションは、自動インスツルメンテーションによって異なり、メソッドによっては追加の手順が含まれます。

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
  <strong>注:</strong> v3.0.0 以降、カスタムインスツルメンテーションを使用するには、自動インスツルメンテーションも使用する必要があります。自動インスツルメンテーションとカスタムインスツルメンテーションのパッケージバージョン (例: MSI や NuGet) の同期を維持し、パッケージのメジャーバージョンを混合しないようにする必要があります。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. 自動インスツルメンテーションを使用してアプリケーションをインスツルメントします。
2. `Datadog.Trace` [NuGet パッケージ][1] をアプリケーションに追加します。
3. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-danger">
  <strong>注:</strong> v3.0.0 以降、カスタムインスツルメンテーションを使用するには、自動インスツルメンテーションも使用する必要があります。自動インスツルメンテーションとカスタムインスツルメンテーションのパッケージバージョン (例: MSI や NuGet) の同期を維持し、パッケージのメジャーバージョンを混合しないようにする必要があります。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには
1. 自動インスツルメンテーションを使用してアプリケーションをインスツルメントします。
2. `Datadog.Trace` [NuGet パッケージ][1] をアプリケーションに追加します。
3. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "NuGet" %}}

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

{{% /tab %}}

{{< /tabs >}}

カスタムインスツルメンテーションのスパンやタグの追加について詳しくは、[.NET カスタムインスツルメンテーションのドキュメント][5] を参照してください。

## プロセス環境変数の構成{#configuring-process-environment-variables}

サービスに自動インスツルメンテーションをアタッチするには、アプリケーションを起動する前に、必要な環境変数を設定する必要があります。.NET Tracer のインストール方法に応じて設定する環境変数を特定するために、[Enable the SDK for your service](#enable-the-sdk-for-your-service) のセクションを参照し、以下の例に従って、インスツルメントされたサービスの環境に基づいて環境変数を正しく設定します。

### Windows {#windows}

<div class="alert alert-danger">
  <strong>注:</strong> .NET ランタイムは .NET ライブラリをこれらの環境変数が設定時に開始した<em>あらゆる</em> .NET プロセスにロードしようとします。このため、インスツルメンテーションをインスツルメントされる必要があるアプリケーションのみに制限してください。<strong>ホストの<em>すべての</em> .NET プロセスがインスツルメントされることになるため、これらの環境変数をグローバルに設定しないでください。</strong>
</div>

#### Windows サービス {#windows-services}

{{< tabs >}}

{{% tab "レジストリエディター" %}}

レジストリエディターで、`HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` キーに `Environment` 複数の文字列値を作成します。

```text
CORECLR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="レジストリエディターを使用して Windows サービスの環境変数を作成する" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'CORECLR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS {#iis}

MSI をインストールした後、IIS サイトを自動的にインスツルメンテーションするための追加構成は必要ありません。すべての IIS サイトに継承される追加の環境変数を設定するには、次の手順を実行します。

1. レジストリエディターを開き、`HKLM\System\CurrentControlSet\Services\WAS` キーにある `Environment` という複数文字列の値を探し、1 行に 1 つずつ環境変数を追加します。たとえば、ログの挿入とランタイムメトリクスを追加するには、値データに以下の行を追加します。
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
SET CORECLR_ENABLE_PROFILING=1

rem (Optional) Set additional Datadog environment variables, for example:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

### Linux {#linux}

#### Bash スクリプト {#bash-script}

アプリケーションを起動する前に、bash ファイルから必要な環境変数を設定するには

```bash
# Set required environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog

# (Optional) Set additional Datadog environment variables, for example:
export DD_LOGS_INJECTION=true
export DD_RUNTIME_METRICS_ENABLED=true

# Start your application
dotnet example.dll
```

<div class="alert alert-info"> Alpine Linux を使用している場合は、 <code>CORECLR_PROFILER_PATH</code> 環境変数を musl ベースのディストリビューションのパスに設定します。<code>linux-musl-x64/</code>.</div>

#### Linux Docker コンテナ {#linux-docker-container}

Linux Docker コンテナに必要な環境変数を設定するには

  ```docker
  # Set required environment variables
  ENV CORECLR_ENABLE_PROFILING=1
  ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
  ENV DD_DOTNET_TRACER_HOME=/opt/datadog

  # (Optional) Set additional Datadog environment variables, for example:
  ENV DD_LOGS_INJECTION=true
  ENV DD_RUNTIME_METRICS_ENABLED=true

  # Start your application
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (サービスごと) {#systemctl-per-service}

`systemctl` を使用して、サービスとして .NET アプリケーションを実行する場合、特定のサービスに必要な環境変数がロードされるよう追加することができます。

1. 以下を含む、`environment.env` というファイルを作成します。

    ```ini
    # Set required environment variables
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_DOTNET_TRACER_HOME=/opt/datadog

    # (Optional) Set additional Datadog environment variables, for example:
    DD_LOGS_INJECTION=true
    DD_RUNTIME_METRICS_ENABLED=true
    ```
2. サービスのコンフィギュレーションファイルで、サービスブロックの [`EnvironmentFile`][1] としてこれを参照します。

    ```ini
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. .NET サービスを再起動して、環境変数の設定を有効にします。

#### `systemctl`(すべてのサービス) {#systemctl-all-services}

<div class="alert alert-danger">
  <strong>注:</strong> .NET ランタイムは .NET ライブラリをこれらの環境変数が設定時に開始した<em>あらゆる</em> .NET プロセスにロードしようとします。このため、インスツルメンテーションをインスツルメントされる必要があるアプリケーションのみに制限してください。<strong>ホストの<em>すべての</em> .NET プロセスがインスツルメントされることになるため、これらの環境変数をグローバルに設定しないでください。</strong>
</div>

`systemctl` を使用して .NET アプリケーションをサービスとして実行する場合、`systemctl` によって実行されるすべてのサービスに対してロードされる環境変数を設定することもできます。

1. [`systemctl set-environment`][6] を実行して、必要な環境変数を設定します。

    ```bash
    # Set required environment variables
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog

    # (Optional) Set additional Datadog environment variables, for example:
    systemctl set-environment DD_LOGS_INJECTION=true
    systemctl set-environment DD_RUNTIME_METRICS_ENABLED=true
    ```
2. `systemctl show-environment` を実行して、環境変数が設定されていることを確認します。

3. .NET サービスを再起動して、環境変数を有効にします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/trace_collection/compatibility/dotnet-core
[2]: /ja/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /ja/tracing/trace_collection/library_config/dotnet-core/
[5]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[11]: /ja/tracing/trace_collection/library_injection_local/
[12]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
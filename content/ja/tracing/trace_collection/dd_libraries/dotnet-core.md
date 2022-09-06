---
aliases:
- /ja/tracing/dotnet-core
- /ja/tracing/languages/dotnet-core
- /ja/tracing/setup/dotnet-core
- /ja/agent/apm/dotnet-core/
- /ja/tracing/setup/dotnet-core
- /ja/tracing/setup_overview/dotnet-core
- /ja/tracing/setup_overview/setup/dotnet-core
code_lang: dotnet-core
code_lang_weight: 60
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
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: ブログ
  text: コンテナ化された ASP.NET コアアプリケーションを監視する
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した .NET のモニタリング
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: GitHub
  text: カスタムインスツルメンテーションの例
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: GitHub
  text: ソースコード
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: ブログ
  text: ASP.NET Core アプリケーションを Azure App Service にデプロイする
kind: documentation
title: .NET コアアプリケーションのトレース
type: multi-code-lang
---

## 互換性要件

### サポートされている .NET Core のランタイム

.NET Tracer は、.NET Core 2.1、3.1、.NET 5、.NET 6 でのインスツルメンテーションをサポートします。

Datadog の .NET Core ライブラリとプロセッサアーキテクチャーのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]を参照してください。

## インストールと利用開始

<div class="alert alert-info">
  <div class="alert-info">Datadog は、最高の体験を得るために、Datadog アプリの<a href="https://app.datadoghq.com/apm/docs">クイックスタートの説明書</a>に従うことをお勧めします。これには以下が含まれます。<br/>
    <div>- デプロイメント構成 (ホスト、Docker、Kubernetes、または Amazon ECS) に合わせたステップバイステップの説明。</div>
    <div>- <code>サービス</code>タグ、<code>環境</code>タグ、<code>バージョン</code>タグを動的に設定する。</div>
    <div>- セットアップ時にトレースの 100% インジェストとログへのトレース ID インジェクションを有効にする。</div>
  </div>
</div>

<div class="alert alert-warning">
<strong>**注**:</strong> Datadog 自動インスツルメンテーションは、.NET CLR Profiling API に依存します。この API に許可されるサブスクライバーは 1 つのみです（たとえば Datadog の .NET トレーサーでプロファイラーを有効にした状態）。可視性を最大限に向上するため、アプリケーション環境で 1 つの APM ソリューションのみを実行してください。
</div>

### インストール

1. [APM に Datadog Agent を構成します。](#configure-the-datadog-agent-for-apm)
2. [トレーサーをインストールします。](#install-the-tracer)
3. {{< tabs >}}
4. [ライブデータを表示します。](#view-your-live-data)

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように [Datadog Agent をインストールして構成][2]します。デフォルトでは、Datadog Agent は `apm_config` 下にある  `datadog.yaml` ファイルの `enabled: true` で有効になっており、`http://localhost:8126` でトレースデータをリッスンします。

コンテナ化、サーバーレス、クラウド環境の場合:

{{< tabs >}}

{{% tab "Containers" %}}

1. メイン [`datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. トレースクライアントは以下にトレースの送信を試みます。

    - デフォルトでは `/var/run/datadog/apm.socket` の Unix ドメインソケット。
    - ソケットが存在しない場合、トレースは `localhost:8126` に送信されます。
    - もし、別のソケット、ホスト、ポートが必要な場合は、環境変数 `DD_TRACE_AGENT_URL` を使用します: `DD_TRACE_AGENT_URL=http://custom-hostname:1234` または `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket`
    - トレース転送に Unix Domain Socket を使用することは、.NET Core 3.1 以降でサポートされています。

これらの設定方法の詳細については、[構成](#configuration)を参照してください。

{{< site-region region="us3,us5,eu,gov" >}}

4. Agent が正しい Datadog のロケーションにデータを送信するようにするには、Datadog Agent で `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定します。

{{< /site-region >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}

{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]を参照してください。

[1]: /ja/tracing/serverless_functions/
{{% /tab %}}

{{% tab "Azure App Service" %}}

Azure App Service で Datadog APM を設定するには、[Azure App Service 拡張のトレース][1]を参照してください。

[1]: /ja/serverless/azure_app_services/
{{% /tab %}}

{{% tab "Other Environments" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3] など、他の環境で利用できます。

その他のすべての環境については、その環境の[インテグレーションのドキュメント][4]を参照し、セットアップの問題が発生した場合は [Datadog サポート][5]にお問い合わせください。


[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/integrations/
[5]: /ja/help/
{{% /tab %}}

{{< /tabs >}}

### トレーサーをインストールする

Datadog .NET Tracer は、マシン上のすべてのサービスがインスツルメントされるようにマシン全体にインストールすることも、アプリケーションごとにインストールすることも可能で、開発者はアプリケーションの依存関係を通じてインスツルメンテーションを管理することができます。マシン全体のインストール手順を見るには、Windows または Linux タブをクリックします。アプリケーションごとのインストール手順を見るには、NuGet タブをクリックします。

{{< tabs >}}

{{% tab "Windows" %}}

.NET Tracer をマシン全体にインストールするには

1. [.NET トレーサー MSI インストーラー][1]をダウンロードします。オペレーティングシステム (x64 または x86) に一致するアーキテクチャの MSI インストーラーを選択します。

2. 管理者権限で .NET トレーサー MSI インストーラーを実行します。


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

.NET Tracer をマシン全体にインストールするには

1. お使いの OS とアーキテクチャに対応した最新の [.NET Tracer パッケージ][1]をダウンロードします。

2. 以下のコマンドのいずれかを実行して、パッケージをインストールし、適切な権限で .NET トレーサーのログディレクトリ `/var/log/datadog/dotnet` を作成します。

   Debian または Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && /opt/datadog/createLogPath.sh`

   CentOS または Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && /opt/datadog/createLogPath.sh`

   Alpine などの musl ベースの分布
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   その他の分布
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<TRACER_VERSION>-tar.gz && /opt/datadog/createLogPath.sh`


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-warning">
  <strong>注:</strong> このインストールは、IIS で動作するアプリケーションをインスツルメントするものではありません。IIS で実行されるアプリケーションについては、Windows マシン全体のインストールプロセスに従ってください。
</div>

.NET Tracer をアプリケーション単位でインストールするには

1. アプリケーションに `Datadog.Monitoring.Distribution` [NuGet パッケージ][1]を追加します。

[1]: https://www.nuget.org/packages/Datadog.Monitoring.Distribution
{{% /tab %}}

{{< /tabs >}}

### サービスのトレーサーを有効にする

サービスの .NET Tracer を有効にするには、必要な環境変数を設定し、アプリケーションを再起動します。

環境変数の設定方法の違いについては、[プロセス環境変数の構成](#configuring-process-environment-variables)を参照してください。

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS)

1. .NET Tracer の MSI インストーラーは、必要な環境変数をすべて追加します。構成する必要のある環境変数はありません。

2. IIS でホストされるアプリケーションを自動でインスツルメントするには、管理者として次のコマンドを実行して IIS を完全に停止してから起動します。

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


#### IIS にないサービス

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

1. 自動インスツルメンテーションをアプリケーションにアタッチするために、以下の必要な環境変数を設定します。

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=<System-dependent path>
   DD_DOTNET_TRACER_HOME=<APP_DIRECTORY>/datadog
   ```

   `<APP_DIRECTORY>` のプレースホルダーの値は、アプリケーションの `.dll` ファイルがあるディレクトリへのパスです。環境変数 `CORECLR_PROFILER_PATH` の値は、アプリケーションが動作しているシステムに応じて変化します。

   オペレーティングシステムとプロセスアーキテクチャ｜CORECLR_PROFILER_PATH の値
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

2. Linux 上で動作する Docker イメージの場合、`createLogPath.sh` スクリプトを実行するように構成します。

   ```
   RUN /<APP_DIRECTORY>/datadog/createLogPath.sh
   ```

   Docker のサンプルは [`dd-trace-dotnet` リポジトリ][1]で公開されています。

3. スタンドアロンアプリケーションの場合は、手動でアプリケーションを再起動します。


[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### ライブデータの表示

サービスの .NET Tracer を有効にした後:

1. サービスを再起動します。

2. アプリケーションロードを作成します。

3. Datadog で [**APM** > **APM Traces**][3] の順に移動します。

## コンフィギュレーション

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][4]を参照してください。

## カスタムインスツルメンテーション

カスタムインスツルメンテーションのセットアップは、自動インスツルメンテーションによって異なり、メソッドによっては追加の手順が含まれます。

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-warning">
  <strong>注:</strong> 自動インスツルメンテーションとカスタムインスツルメンテーションの両方を使用している場合は、パッケージバージョン (MSI や NuGet など) の同期を維持する必要があります。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. `Datadog.Trace` [NuGet パッケージ][1]をアプリケーションに追加します。
2. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。


[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-warning">
  <strong>注:</strong> 自動インスツルメンテーションとカスタムインスツルメンテーションの両方を使用している場合は、パッケージバージョン (MSI や NuGet など) の同期を維持する必要があります。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには
1. `Datadog.Trace` [NuGet パッケージ][1]をアプリケーションに追加します。
2. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。


[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "NuGet" %}}

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

{{% /tab %}}

{{< /tabs >}}

カスタムインスツルメンテーションのスパンやタグの追加について詳しくは、[.NET カスタムインスツルメンテーションのドキュメント][5]を参照してください。

## プロセス環境変数の構成

サービスに自動インスツルメンテーションをアタッチするには、アプリケーションを起動する前に、必要な環境変数を設定する必要があります。.NET Tracer のインストール方法に応じて設定する環境変数を特定するために、 [サービスのトレーサーを有効にする](#enable-the-tracer-for-your-service)のセクションを参照し、以下の例に従って、インスツルメントされたサービスの環境に基づいて環境変数を正しく設定します。

### Windows

#### Windows サービス

{{< tabs >}}

{{% tab "Registry Editor" %}}

レジストリエディターで、`HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` キーに `Environment` 複数の文字列値を作成します。

```text
CORECLR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="レジストリエディタを使用して Windows サービスに環境変数を作成" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
[string[]] $v = @("CORECLR_ENABLE_PROFILING=1")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```
{{% /tab %}}

{{< /tabs >}}

#### コンソールアプリケーション

コンソールアプリケーションを自動的にインスツルメントするには、アプリケーションを起動する前に、バッチファイルから環境変数を設定します。

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1

rem Start application
dotnet.exe example.dll
```

### Linux

#### Bash スクリプト

アプリケーションを起動する前に、bash ファイルから必要な環境変数を設定するには

```bash
# 環境変数を設定
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog

# アプリケーションを起動
dotnet example.dll
```

#### Linux Docker コンテナ

Linux Docker コンテナに必要な環境変数を設定するには

  ```docker
  # 環境変数を設定
  ENV CORECLR_ENABLE_PROFILING=1
  ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
  ENV DD_DOTNET_TRACER_HOME=/opt/datadog

  # アプリケーションを起動
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (per service)

`systemctl` を使用して、サービスとして .NET アプリケーションを実行する場合、特定のサービスに必要な環境変数がロードされるよう追加することができます。

1. 以下を含む、`environment.env` というファイルを作成します。

    ```ini
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_DOTNET_TRACER_HOME=/opt/datadog
    # any other environment variable used by the application
    ```
2. サービスのコンフィギュレーションファイルで、サービスブロックの [`EnvironmentFile`][1] としてこれを参照します。

    ```ini
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. .NET サービスを再起動して、環境変数の設定を有効にします。

#### `systemctl` (all services)

<div class="alert alert-warning">
  <strong>注:</strong> .NET ランタイムは、これらの環境変数が設定された状態で開始された<em>あらゆる</em> .NET プロセスにプロファイラーをロードしようとします。インスツルメンテーションは、トレースする必要のあるアプリケーションのみに制限する必要があります。<strong>これらの環境変数をグローバルに設定しないでください。こうすると、ホスト上の<em>すべての</em> .NET プロセスがプロファイラーをロードします。</strong>
</div>

`systemctl` を使用して .NET アプリケーションをサービスとして実行する場合、`systemctl` によって実行されるすべてのサービスに対してロードされる環境変数を設定することもできます。

1. [`systemctl set-environment`][6] を実行して、必要な環境変数を設定します。

    ```bash
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog
    ```
2. `systemctl show-environment` を実行して、環境変数が設定されていることを確認します。

3. .NET サービスを再起動して、環境変数を有効にします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/trace_collection/compatibility/dotnet-core
[2]: /ja/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /ja/tracing/trace_collection/library_config/dotnet-core/
[5]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6

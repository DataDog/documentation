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
- /ja/tracing/trace_collection/dd_libraries/dotnet-core
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
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
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

## 互換性要件

### サポートされている .NET Core のランタイム

.NET Tracer は、.NET Core 3.1、.NET 5、.NET 6、.NET 7、.NET 8、.NET 9 でのインスツルメンテーションをサポートします。

Datadog の .NET Core ライブラリとプロセッサアーキテクチャーのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]を参照してください。

## インストールと利用開始

<div class="alert alert-info">
    AWS Lambda や Azure Functions などのサーバーレス環境で Datadog APM を設定するには、<a href="/serverless">サーバーレス</a>を参照してください。
</div>

<div class="alert alert-danger">
  <strong>注:</strong> Datadog の自動インスツルメンテーションは .NET CLR Profiling API に依存します。この API で許可されるサブスクライバーは 1 つのみです (例: Datadog APM)。可視性を最大化するため、アプリケーション環境では 1 つの APM ソリューションだけを実行してください。
</div>

<div class="alert alert-info">
  トリミングされたアプリでインスツルメンテーションを有効化するには、プロジェクトに <a href="https://www.nuget.org/packages/Datadog.Trace.Trimming/">Datadog.Trace.Trimming</a> の NuGet パッケージ参照を追加してください。
</div>

### インストール

作業を始める前に、[Agent のインストールと構成][12]が済んでいることを確認してください。

1. [トレーサーをインストールします。](#install-the-tracer)
2. [Enable the tracer for your service.](#enable-the-tracer-for-your-service)
3. [ライブデータを表示します。](#view-your-live-data)

### トレーサーをインストールする

Datadog Agent をインストールして構成したら、次はアプリケーションに直接トレーシングライブラリを追加してインスツルメントします。[互換性情報][1]の詳細をお読みください。

Datadog .NET Tracer は、マシン上のすべてのサービスがインスツルメントされるようにマシン全体にインストールすることも、アプリケーションごとにインストールすることも可能で、開発者はアプリケーションの依存関係を通じてインスツルメンテーションを管理することができます。マシン全体のインストール手順を見るには、Windows または Linux タブをクリックします。アプリケーションごとのインストール手順を見るには、NuGet タブをクリックします。

{{< tabs >}}

{{% tab "Windows" %}}

.NET Tracer をマシン全体にインストールするには

1. [.NET Tracer MSI インストーラー][1]をダウンロードします。64 ビット版の Windows を実行している場合は、x64 MSI インストーラーを使用してください。32 ビット版の Windows を実行している場合のみ、x86 インストーラーを選択します。v3.0.0 からは、32 ビットのオペレーティングシステムがサポート対象外となるため、x64 インストーラーのみが提供されます。

2. 管理者権限で .NET トレーサー MSI インストーラーを実行します。

PowerShell で次を実行することで、MSI セットアップをスクリプト化することもできます: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

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
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   その他の分布
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && /opt/datadog/createLogPath.sh`

#### Chiseled コンテナ

.NET Tracer を Chiseled または Distroless の Docker イメージ (シェルなし) にインストールするには、次の Dockerfile コマンドを使用します。

- `ADD` を使用してトレーサー ファイルをコンテナに配置します。
- `COPY --chown=$APP_UID` を使用して、空のフォルダーをソースとしてログ パスを作成します。

Dockerfile の例:

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

1. `Datadog.Trace.Bundle` [NuGet パッケージ][1]をアプリケーションに追加します。

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### サービスのトレーサーを有効にする

サービスの .NET Tracer を有効にするには、必要な環境変数を設定し、アプリケーションを再起動します。

環境変数の設定方法の違いについては、[プロセス環境変数の構成](#configuring-process-environment-variables)を参照してください。

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS)

1. .NET Tracer の MSI インストーラーは、必要な環境変数をすべて追加します。構成する必要のある環境変数はありません。

   <div class="alert alert-danger">
     <strong>Note:</strong> You must set the <strong>.NET CLR version</strong> for the application pool to <strong>No Managed Code</strong> as recommended by <a href='https://learn.microsoft.com/aspnet/core/host-and-deploy/iis/advanced#create-the-iis-site'> Microsoft</a>.
   </div>

2. IIS でホストされるアプリケーションを自動でインスツルメントするには、管理者として次のコマンドを実行して IIS を完全に停止してから起動します。

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
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

パッケージの Readme に書かれている手順に従ってください。[`dd-trace-dotnet` リポジトリ][1]でも公開されています。
Docker のサンプルも[リポジトリ][2]で公開されています。

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### ライブデータの表示

サービスの .NET Tracer を有効にした後:

1. サービスを再起動します。

2. アプリケーションロードを作成します。

3. Datadog で [**APM** > **APM Traces**][3] の順に移動します。

## 設定

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][4]を参照してください。

## カスタムインスツルメンテーション

カスタムインスツルメンテーションは、自動インスツルメンテーションによって異なり、メソッドによっては追加の手順が含まれます。

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
  <strong>注:</strong> v3.0.0 以降、カスタム インスツルメンテーションを使用するには自動インスツルメンテーションも併用する必要があります。自動およびカスタム インスツルメンテーションのパッケージ バージョン (例: MSI と NuGet) は同期させ、メジャー バージョンを混在させないようにしてください。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには

1. 自動インスツルメンテーションを用いたアプリケーションのインスツルメンテーション。
2. `Datadog.Trace` [NuGet パッケージ][1]をアプリケーションに追加します。
3. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-danger">
  <strong>注:</strong> v3.0.0 以降、カスタム インスツルメンテーションを使用するには自動インスツルメンテーションも併用する必要があります。自動およびカスタム インスツルメンテーションのパッケージ バージョン (例: MSI と NuGet) は同期させ、メジャー バージョンを混在させないようにしてください。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには
1. 自動インスツルメンテーションを用いたアプリケーションのインスツルメンテーション。
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

## プロセス環境変数の構成

サービスに自動インスツルメンテーションをアタッチするには、アプリケーションを起動する前に、必要な環境変数を設定する必要があります。.NET Tracer のインストール方法に応じて設定する環境変数を特定するために、 [サービスのトレーサーを有効にする](#enable-the-tracer-for-your-service)のセクションを参照し、以下の例に従って、インスツルメントされたサービスの環境に基づいて環境変数を正しく設定します。

### Windows

<div class="alert alert-danger">
  <strong>注:</strong> .NET ランタイムは、これらの環境変数が設定された状態で開始された<em>あらゆる</em> .NET プロセスに .NET ライブラリをロードしようとします。インスツルメンテーションは、インスツルメントする必要のあるアプリケーションのみに制限する必要があります。<strong>これらの環境変数をグローバルに設定しないでください。こうすると、ホスト上の<em>すべての</em> .NET プロセスがインスツルメントされます。</strong>
</div>

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
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'CORECLR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS

MSI をインストールした後、IIS サイトを自動的にインスツルメンテーションするための追加構成は必要ありません。すべての IIS サイトに継承される追加の環境変数を設定するには、次の手順を実行します。

1. Registry Editor を開き、`HKLM\System\CurrentControlSet\Services\WAS` キーにある `Environment` という複数文字列の値を探し、1 行に 1 つずつ環境変数を追加します。例えば、ログの挿入とランタイムメトリクスを追加するには、値データに以下の行を追加します。
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

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Registry Editor を使用して、すべての IIS サイトの環境変数を作成する" >}}

#### コンソールアプリケーション

コンソールアプリケーションを自動的にインスツルメントするには、アプリケーションを起動する前に、バッチファイルから環境変数を設定します。

```bat
rem 必要な環境変数を設定
SET CORECLR_ENABLE_PROFILING=1

rem (オプション) 追加の Datadog 環境変数を設定。例:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem アプリケーションを起動
dotnet.exe example.dll
```

### Linux

#### Bash スクリプト

アプリケーションを起動する前に、bash ファイルから必要な環境変数を設定するには

```bash
# 必要な環境変数を設定
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog

# (オプション) Datadog の環境変数を追加で設定。例:
export DD_LOGS_INJECTION=true
export DD_RUNTIME_METRICS_ENABLED=true

# アプリケーションを起動
dotnet example.dll
```

<div class="alert alert-info"> Alpine Linux を使用している場合は、環境変数 <code>CORECLR_PROFILER_PATH</code> を musl ベースのディストリビューション用のパスに設定してください。例: <code>linux-musl-x64/</code></div>

#### Linux Docker コンテナ

Linux Docker コンテナに必要な環境変数を設定するには

  ```docker
  # 必要な環境変数を設定
  ENV CORECLR_ENABLE_PROFILING=1
  ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
  ENV DD_DOTNET_TRACER_HOME=/opt/datadog

  # (オプション) Datadog の環境変数を追加で設定。例:
  ENV DD_LOGS_INJECTION=true
  ENV DD_RUNTIME_METRICS_ENABLED=true

  # アプリケーションを起動
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (per service)

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

#### `systemctl` (all services)

<div class="alert alert-danger">
  <strong>注:</strong> .NET ランタイムは、これらの環境変数が設定された状態で開始された<em>あらゆる</em> .NET プロセスに .NET ライブラリをロードしようとします。インスツルメンテーションは、インスツルメントする必要のあるアプリケーションのみに制限する必要があります。<strong>これらの環境変数をグローバルに設定しないでください。こうすると、ホスト上の<em>すべての</em> .NET プロセスがインスツルメントされます。</strong>
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

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/trace_collection/compatibility/dotnet-core
[2]: /ja/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /ja/tracing/trace_collection/library_config/dotnet-core/
[5]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[11]: /ja/tracing/trace_collection/library_injection_local/
[12]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
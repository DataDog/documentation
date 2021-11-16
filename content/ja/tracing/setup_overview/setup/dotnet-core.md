---
title: .NET コアアプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/dotnet-core
  - /ja/tracing/languages/dotnet-core
  - /ja/tracing/setup/dotnet-core
  - /ja/agent/apm/dotnet-core/
  - /ja/tracing/setup/dotnet-core
  - /ja/tracing/setup_overview/dotnet-core
code_lang: dotnet-core
type: multi-code-lang
code_lang_weight: 60
further_reading:
  - link: /tracing/connect_logs_and_traces/dotnet/
    tag: Documentation
    text: .NET アプリケーションログとトレースの接続
  - link: /tracing/runtime_metrics/dotnet/
    tag: Documentation
    text: ランタイムメトリクス
  - link: /serverless/azure_app_services/
    tag: Documentation
    text: Microsoft Azure App Service 拡張機能
  - link: /tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
  - link: 'https://www.datadoghq.com/blog/net-monitoring-apm/'
    tag: ブログ
    text: Datadog APM と分散型トレーシングを使用した .NET のモニタリング
  - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples'
    tag: GitHub
    text: カスタムインスツルメンテーションの例
  - link: 'https://github.com/DataDog/dd-trace-dotnet'
    tag: GitHub
    text: ソースコード
---
## 互換性要件

.NET トレーサーは、次のインスツルメンテーションをサポートします:
  - .NET 5
  - .NET Core 3.1
  - .NET Core 2.1

サポート対象のライブラリの一覧については、[互換性要件][1]ページをご覧ください。

## インストールと利用開始

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][2]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- 他のコンフィギュレーション設定を有効にします。

もしくは、アプリケーションをトレースする場合は以下の操作を行ってください。

## 自動インスツルメンテーション

### トレーサーのインストール

<div class="alert alert-warning">
  <strong>注:</strong> 自動インスツルメンテーションとカスタムインスツルメンテーションの両方を使用している場合は、パッケージバージョン (MSI や NuGet など) の同期を維持することが重要です。
</div>

{{< tabs >}}

{{% tab "Windows" %}}

1. [.NET トレーサー MSI インストーラー][1]をダウンロードします。オペレーティングシステム (x64 または x86) に一致するアーキテクチャの MSI インストーラーを選択します。

2. 管理者権限で .NET トレーサー MSI インストーラーを実行します。

3. サービスで必要な環境変数を設定してインスツルメンテーションを有効にします。下記の*サービスのインスツルメンテーション*セクションを参照してください。

4. アプリケーションロードを作成します。

5. [APM ライブトレース][2]にアクセスします。


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{% tab "Linux" %}}

1. .NET トレーサーをダウンロードしてアプリケーション環境にインストールします。
    - **Debian または Ubuntu** - Debian パッケージをダウンロードしてインストールします。
      ```bash
      curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
      sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
      ```
    - **CentOS または Fedora** - RPM パッケージをダウンロードしてインストールします。
      ```bash
      curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
      sudo rpm -Uvh datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
      ```
    - **Alpine またはその他の [musl ベースのディストリビューション][1]** - musl にリンクされたバイナリを含む tar アーカイブをダウンロードします。
      ```bash
      sudo mkdir -p /opt/datadog
      curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz \
      | sudo tar xzf - -C /opt/datadog
      ```
    - **他のディストリビューション** - glibc にリンクされたバイナリを含む tar アーカイブをダウンロードします。
      ```bash
      sudo mkdir -p /opt/datadog
      curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz \
      | sudo tar xzf - -C /opt/datadog
      ```

2. `/opt/datadog/createLogPath.sh` スクリプトを実行します。これにより、ログファイル用のディレクトリが作成され、適切なディレクトリアクセス許可が設定されます。ログファイルのデフォルトのディレクトリは `/var/log/datadog/dotnet` です。

3. サービスで必要な環境変数を設定してインスツルメンテーションを有効にします。下記の*サービスのインスツルメンテーション*セクションを参照してください。

4. アプリケーションロードを作成します。

5. [APM ライブトレース][2]にアクセスします。


[1]: https://en.wikipedia.org/wiki/Musl
[2]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{< /tabs >}}

### サービスのインスツルメンテーション

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS)

IIS でホストされるアプリケーションを自動でインスツルメントするには、管理者として次のコマンドを実行して IIS を完全に停止してから起動します。

<div class="alert alert-warning"> 
  <strong>注:</strong> 停止および開始コマンドを使用する必要があります。リセットまたはリスタートコマンドは動作しないことがあります。
</div>

```cmd
net stop /y was
net start w3svc
```

#### Windows サービス

Windows サービスを自動的にインスツルメントするには、Windows レジストリのサービスに対し `CORECLR_ENABLE_PROFILING` および `CORECLR_PROFILER` 環境変数を設定します。

レジストリエディターを使用:

レジストリエディターで、`HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` キーに `Environment` 複数の文字列値を作成します。
```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="レジストリエディタを使用して Windows サービスに環境変数を作成" >}}

PowerShell を使用:

```powershell
[string[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```

#### コンソールアプリケーション

コンソールアプリケーションを自動的にインスツルメントするには、アプリケーションを起動する前に、バッチファイルから `CORECLR_ENABLE_PROFILING` および `CORECLR_PROFILER` 環境変数を設定します。

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
dotnet.exe example.dll
```

#### その他のアプリケーション

自動インスツルメンテーションを有効にするには、アプリケーションを起動する前に 2 つの環境変数を設定する必要があります。

名前                       | 値
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

<div class="alert alert-warning"> 
  <strong>注:</strong> .NET ランタイムは、これらの環境変数が設定された状態で開始された .NET プロセスにプロファイラーをロードしようとします。インスツルメンテーションは、インスツルメントする必要のあるアプリケーションのみに制限する必要があります。これらの環境変数をグローバルに設定しないでください。こうすると、ホスト上のすべての .NET プロセスがプロファイラーをロードします。
</div>

{{% /tab %}}

{{% tab "Linux" %}}

自動インスツルメンテーションを有効にするには、次の環境変数が必要です。

  <div class="alert alert-info">
      <strong>注:</strong> .NET トレーサーがデフォルトの <code>/opt/datadog</code> パス以外のパスにインストールされている場合は、パスが一致するよう変更してください。
  </div>

  名前                       | 値
  ---------------------------|------
  `CORECLR_ENABLE_PROFILING` | `1`
  `CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`
  `CORECLR_PROFILER_PATH`    | `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`
  `DD_INTEGRATIONS`          | `/opt/datadog/integrations.json`
  `DD_DOTNET_TRACER_HOME`    | `/opt/datadog`

#### Bash スクリプト

アプリケーションを起動する前に、bash ファイルから必要な環境変数を設定するには

```bash
# 環境変数を設定
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_INTEGRATIONS=/opt/datadog/integrations.json
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
  ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
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
    DD_INTEGRATIONS=/opt/datadog/integrations.json
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

1. [`systemctl set-environment`][1] を実行して、必要な環境変数を設定します。

    ```bash
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_INTEGRATIONS=/opt/datadog/integrations.json
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog
    ```
2. `systemctl show-environment` を実行して、環境変数が設定されていることを確認します。

3. .NET サービスを再起動して、環境変数を有効にします。


[1]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
{{% /tab %}}

{{< /tabs >}}

## カスタムインスツルメンテーション

<div class="alert alert-warning">
  <strong>注:</strong> 自動インスツルメンテーションとカスタムインスツルメンテーションの両方を使用している場合は、パッケージバージョン (MSI や NuGet など) の同期を維持することが重要です。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには
1. `Datadog.Trace` [NuGet パッケージ][3]をアプリケーションに追加します。
2. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

カスタムインスツルメンテーションとカスタムタグ付けの詳細については、[.NET カスタムインスツルメンテーションドキュメント][4]を参照してください。

## APM 用に Agent をインストールし構成

インスツルメントされたアプリケーションからトレースを受信するように [Datadog Agent をインストール][5]して構成します。デフォルトでは、Datadog Agent は `apm_config` 下にある `datadog.yaml` ファイルの `enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}

{{% tab "Containers" %}}

1. Agent が別のホストまたはコンテナで実行されている場合は、メイン [`datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションをインスツルメントしている間、トレースクライアントはデフォルトでトレースを `localhost:8126` に送信します。これが正しいホストとポートでない場合は、次の環境変数を設定して変更してください。

    - `DD_AGENT_HOST`
    - `DD_TRACE_AGENT_PORT`

{{< site-region region="us3,eu,gov" >}} 

4. Datadog Agent の `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定して、Agent が正しい Datadog の場所にデータを送信するようにします。

{{< /site-region >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}

{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。



[1]: /ja/tracing/serverless_functions/
{{% /tab %}}

{{% tab "Azure App Services Extension" %}}

Azure App Service で Datadog APM を設定するには、[Azure App Service 拡張のトレース][1]ドキュメントを参照してください。


[1]: /ja/serverless/azure_app_services/
{{% /tab %}}

{{% tab "Other Environments" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3] など、さまざまな環境で利用できます。

その他の環境については、その環境の[インテグレーション][4]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][5]ください。


[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/integrations/
[5]: /ja/help/
{{% /tab %}}

{{< /tabs >}}

## トレーサーの構成

{{< img src="tracing/dotnet/diagram_docs_net.png" alt=".NET トレーサーコンフィギュレーション設定の優先度"  >}}

.NET トレーサーには、次のいずれかの方法で設定できるコンフィギュレーション設定があります。

{{< tabs >}}

{{% tab "環境変数" %}}

環境変数を使ってトレーサーを構成するには、インスツルメンテーションされたアプリケーションを起動する前に変数を設定します。

#### Windows

**注:** Windows Service に対して環境変数を設定するには、上記のように Windows レジストリで複数文字列キー `HKLM\System\CurrentControlSet\Services\{サービス名}\Environment` を使います。

```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Launch application
example.exe
```

#### Linux

```bash
# 環境変数を設定
export DD_TRACE_AGENT_URL=http://localhost:8126
export DD_ENV=prod
export DD_SERVICE=MyService
export DD_VERSION=abc123

# アプリケーションを起動
dotnet example.dll
```

{{% /tab %}}

{{% tab "コード" %}}

アプリケーションコードでトレーサーを構成するには、デフォルトの構成ソースから `TracerSettings` を作成します。`Tracer` コンストラクタに渡す前にこの `TracerSettings` インスタンスにプロパティを設定します。例:

<div class="alert alert-warning">
  <strong>注:</strong> 設定は、<code>トレーサー</code>を作成する<em>前</em>に <code>TracerSettings</code> で設定する必要があります。<code>トレーサー</code>の作成後に <code>TracerSettings</code> プロパティに加えられた変更は無視されます。
</div>

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

// デフォルトの構成ソースを読み取る (env vars、web.config、datadog.json)
var settings = TracerSettings.FromDefaultSources();

// 一部の設定を変更
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
settings.AgentUri = new Uri("http://localhost:8126/");

// AdoNet インテグレーションを無効化
settings.Integrations["AdoNet"].Enabled = false;

// これらの設定を使ってトレーサーを新規作成
var tracer = new Tracer(settings);

// グローバルトレーサーを設定
Tracer.Instance = tracer;
```

{{% /tab %}}

{{% tab "JSON ファイル" %}}

JSON ファイルを使ってトレーサーを構成するには、インスツルメンテーションされたアプリケーションのディレクトリに `datadog.json` を作成します。ルート JSON オブジェクトは各設定のキー/値を持つオブジェクトである必要があります。例:

```json
{
  "DD_TRACE_AGENT_URL": "http://localhost:8126",
  "DD_ENV": "prod",
  "DD_SERVICE": "MyService",
  "DD_VERSION": "abc123",
}
```

{{% /tab %}}

{{< /tabs >}}

### コンフィギュレーション設定

<div class="alert alert-info">
  <strong>注:</strong> Linux では、環境変数の名前では大文字と小文字が区別されます。
</div>

上記の方法を使用して、次の変数を使用してトレースコンフィギュレーションをカスタマイズします。環境変数またはコンフィギュレーションファイルを設定するときは、環境変数の名前 (たとえば、`DD_TRACE_AGENT_URL`) を使用します。コードの設定を変更するときには、TracerSettings プロパティの名前 (たとえば、`AgentUri`) を使用します。

#### 統合サービスタグ付け

[統合サービスタグ付け][6]を使用するには、サービスに対して次の設定を構成します。

`DD_ENV`
: **TracerSettings プロパティ**: `Environment`<br>
指定した場合、生成されたすべてのスパンに、指定された値の `env` タグを追加します。バージョン 1.17.0 で追加されました。

`DD_SERVICE`
: **TracerSettings プロパティ**: `ServiceName`<br>
指定した場合、サービス名を設定します。それ以外の場合、.NET トレーサーは、アプリケーション名 (IIS アプリケーション名、プロセスエントリアセンブリ、またはプロセス名) からサービス名を自動的に判別しようとします。バージョン 1.17.0 で追加されました。

`DD_VERSION`
: **TracerSettings プロパティ**: `ServiceVersion`<br>
指定した場合、サービスのバージョンを設定します。バージョン 1.17.0 で追加されました。


#### 任意のコンフィギュレーション

次の表は、自動インスツルメンテーションとカスタムインスツルメンテーションの両方で利用できる構成変数の一覧です。


`DD_TRACE_AGENT_URL`
: **TracerSettings プロパティ**: `AgentUri`<br>
<br>トレースが送信される URL エンドポイントを設定します。設定された場合、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` をオーバーライドします。
**デフォルト**: `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`

`DD_AGENT_HOST`
: トレースが送信されるホストを設定します (Agent を実行するホスト)。ホスト名または IP アドレスにできます。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。<br>
**デフォルト**: `localhost`

`DD_TRACE_AGENT_PORT`
: トレースが送信されるポートを設定します (Agent が接続のためにリッスンしているポート)。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。<br>
**デフォルト**: `8126`

`DD_LOGS_INJECTION`
: **TracerSettings プロパティ**: `LogsInjectionEnabled` <br>
アプリケーションログへの相関識別子の自動挿入を有効または無効にします。

`DD_TRACE_GLOBAL_TAGS`
: **TracerSettings プロパティ**: `GlobalTags`<br>
指定した場合、指定したすべてのタグを、生成されたすべてのスパンに追加します。

`DD_TRACE_DEBUG`
: **TracerSettings プロパティ**: `DebugEnabled`<br>
<br>デバッグのロギングを有効または無効にします。有効な値は `true` または `false`。
**デフォルト**: `false`

`DD_TRACE_HEADER_TAGS`
: 名前をタグ付けするヘッダーキー (大文字小文字の区別なし) のマップを受け入れ、一致するヘッダー値がルートスパンのタグとして自動的に提供されます。特定のタグ名のないエントリも受け入れます。<br>
**例**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
バージョン 1.18.3 で追加されました。レスポンスヘッダーのサポートとタグ名なしのエントリはバージョン 1.26.0 で追加されました。

`DD_TRACE_LOG_DIRECTORY`
: .NET Tracer ログのディレクトリを設定します。<br>
**デフォルト**: `%ProgramData%\Datadog .NET Tracer\logs\`

`DD_TRACE_LOG_PATH`
: 自動インスツルメンテーション・ログファイルにパスを設定し、他の .NET Tracer ログファイルすべてのディレクトリを決定します。`DD_TRACE_LOG_DIRECTORY` が設定されている場合、無視されます。

`DD_TRACE_LOGGING_RATE`
: ログメッセージへのレート制限を設定します。設定した場合、`x` 秒ごとに一意のログ行が記述されます。たとえば、任意のメッセージを 60 秒ごとに一回ログに残したい場合は `60` を設定します。ログのレート制限を無効化したい場合は `0` を設定します。バージョン 1.24.0 で追加されました。デフォルトでは無効です。

`DD_TRACE_SERVICE_MAPPING`
: コンフィギュレーションを使用してサービスの名前を変更します。名前を変更するサービス名キーと、代わりに使用する名前のマップを、`[from-key]:[to-name]` の形式で受け入れます。<br>
**例**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
`from-key` はインテグレーションタイプに固有で、アプリケーション名のプレフィックスを除外する必要があります。たとえば、`my-application-sql-server` の名前を `main-db` に変更するには、`sql-server:main-db` を使用します。バージョン 1.23.0 で追加されました。

`DD_TAGS`
: **TracerSettings プロパティ**: `GlobalTags`<br>
指定した場合、指定したすべてのタグを、生成されたすべてのスパンに追加します。<br>
**例**: `layer:api,team:intake` <br>
バージョン 1.17.0 で追加されました。


#### 自動インスツルメンテーション

以下の構成変数は、自動インスツルメンテーションの使用時に**のみ**利用できます。


`DD_TRACE_ENABLED`
: **TracerSettings プロパティ**: `TraceEnabled`<br>
<br>すべての自動インスツルメンテーションを有効または無効にします。環境変数を `false` に設定すると、CLR プロファイラーが完全に無効になります。他の構成メソッドの場合は、CLR プロファイラーはロードされ続けますが、トレースは生成されません。有効な値は `true` または `false`。
**デフォルト**: `true`

`DD_DISABLED_INTEGRATIONS`
: **TracerSettings プロパティ**: `DisabledIntegrationNames`<br>
無効にするインテグレーションのリストを設定します。他のインテグレーションはすべて有効のままになります。設定しなかった場合、すべてのインテグレーションが有効になります。セミコロンで区切ることで複数の値がサポートされます。有効な値は、[インテグレーション][7]セクションでリストされているインテグレーション名です。

`DD_HTTP_CLIENT_ERROR_STATUSES`
: HTTP クライアントスパンがエラーとしてマークされる原因となるステータスコード範囲を設定します。 <br>
**デフォルト**: `400-499`

`DD_HTTP_SERVER_ERROR_STATUSES`
: HTTP サーバースパンがエラーとしてマークされる原因となるステータスコード範囲を設定します。 <br>
**デフォルト**: `500-599`

`DD_RUNTIME_METRICS_ENABLED`
: .NET ランタイムメトリクスを有効にします。有効な値は `true` または `false`。<br>
**デフォルト**: `false`<br>
バージョン 1.23.0 で追加されました。

`DD_TRACE_ADONET_EXCLUDED_TYPES`
: **TracerSettings プロパティ**: `AdoNetExcludedTypes` <br>
自動インスツルメンテーションから除外される `AdoNet` タイプ (たとえば、`System.Data.SqlClient.SqlCommand`) のリストを設定します。

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **TracerSettings プロパティ**: `Integrations[<INTEGRATION_NAME>].Enabled`<br>
<br>特定のインテグレーションを有効または無効にします。有効な値は、`true` (デフォルト) または `false`。インテグレーション名は、[インテグレーション][7]セクションにリストされています。
**デフォルト**: `true`

#### 試験機能

以下の構成変数は現在利用可能な機能ですが、今後のリリースで変更される場合があります。


`DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`
: `true` に設定すると、Web スパンに対する改善されたリソース名を有効化します。利用可能なルートテンプレート情報を使用して ASP.NET のコアインテグレーションにスパンを追加し、追加のタグを有効化します。バージョン 1.26.0 で追加されました。<br>
**デフォルト**: `false`

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: Datadog Agent への大規模トレースのフラッシュをインクリメント形式で有効化し、Agent に拒否される可能性を低減します。保持期間が長いトレースまたは多数のスパンを持つトレースがある場合にのみ使用してください。有効な値は `true` または `false`。バージョン 1.26.0 で追加され、Datadog Agent 7.26.0 以降とのみ互換性を有しています。<br>
**デフォルト**: `false`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup_overview/compatibility_requirements/dotnet-core
[2]: https://app.datadoghq.com/apm/docs
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: /ja/tracing/setup_overview/custom_instrumentation/dotnet/
[5]: /ja/agent/basic_agent_usage/
[6]: /ja/getting_started/tagging/unified_service_tagging/
[7]: /ja/tracing/setup_overview/compatibility_requirements/dotnet-core#integrations
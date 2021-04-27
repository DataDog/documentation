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
  - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/samples'
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
  - .NET Core 2.1. 

サポート対象のライブラリの一覧については、[互換性要件][1]ページをご覧ください。

## 自動インスツルメンテーション

<div class="alert alert-warning"> 
  <strong>注:</strong>  自動インスツルメンテーションとカスタムインスツルメンテーションの両方を使用している場合は、パッケージバージョン (MSI や NuGet など) の同期を維持することが重要です。
</div>

### インストール

{{< tabs >}}

{{% tab "Windows" %}}

1. [Windows Datadog Agent をインストールして構成します][1]。

2. [.NET トレーサー MSI インストーラー][2]をダウンロードします。オペレーティングシステム (x64 または x86) に一致するアーキテクチャの MSI インストーラーを選択します。

3. 管理者権限で .NET トレーサー MSI インストーラーを実行します。

4. 管理者として次のコマンドを実行して、IIS を停止してから起動します。

    <div class="alert alert-warning"> 
      <strong>Note:</strong> You must use a stop and start command. This is not the same as a reset or restart command.
    </div>

    ```cmd
    net stop /y was
    net start w3svc
    ```

5. アプリケーションロードを作成します。

6. [APM ライブトレース][3]にアクセスします。


[1]: /ja/agent/basic_agent_usage/windows/?tab=gui
[2]: https://github.com/DataDog/dd-trace-dotnet/releases
[3]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{% tab "Linux" %}}

1. [Linux Datadog Agent をインストールして構成します][1]。
2. .NET トレーサーをダウンロードしてアプリケーション環境にインストールします。
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
    - **Alpine またはその他の [musl ベースのディストリビューション][2]** - musl にリンクされたバイナリを含む tar アーカイブをダウンロードします。
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
3. [必要な環境変数](#required-environment-variables)を追加します。

4. `/opt/datadog/createLogPath.sh` スクリプトを実行します。これにより、ログファイル用のディレクトリが作成され、適切なディレクトリアクセス許可が設定されます。ログファイルのデフォルトのディレクトリは `/var/log/datadog/dotnet` です。

5. アプリケーションロードを作成します。

6. [APM ライブトレース][3]にアクセスします。


[1]: /ja/agent/basic_agent_usage/
[2]: https://en.wikipedia.org/wiki/Musl
[3]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{< /tabs >}}


### 必要な環境変数

{{< tabs >}}

{{% tab "Windows" %}}

#### IIS でホストされていないアプリケーション

IIS でホストされていない Windows アプリケーションの自動インスツルメンテーションを有効にするには、アプリケーションを起動する前に 2 つの環境変数を設定する必要があります。

名前                       | 値
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

<div class="alert alert-warning"> 
  <strong>注:</strong> .NET ランタイムは、これらの環境変数が設定された状態で開始されたあらゆる .NET プロセスにプロファイラーをロードしようとします。インスツルメンテーションは、トレースする必要のあるアプリケーションのみに制限する必要があります。これらの環境変数をグローバルに設定しないでください。こうすると、ホスト上のすべての .NET プロセスがプロファイラーをロードします。
</div>

##### Windows サービス

Windows サービスを自動的にインスツルメントするには、`CORECLR_ENABLE_PROFILING` および `CORECLR_PROFILER` 環境変数を設定します。

1. Windows レジストリエディタで、`HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` キーに `Environment` という複数の文字列値を作成します。
2. 値データを次のように設定します。
    ```text
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    ```
    {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="レジストリエディタでサービスをインスツルメントするための環境変数を作成する" >}}

または、次の PowerShell スニペットを使用して環境変数を設定することもできます。

```powershell
[String[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
```

##### コンソールアプリケーション

コンソールアプリケーションを自動的にインスツルメントするには、アプリケーションを起動する前に、バッチファイルから `CORECLR_ENABLE_PROFILING` および `CORECLR_PROFILER` 環境変数を設定します。

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
dotnet.exe example.dll
```

{{% /tab %}}

{{% tab "Linux" %}}

1. Agent が別のホストまたはコンテナで実行されている場合は、メインの [`datadog.yaml` コンフィギュレーションファイル][1]で `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションをインスツルメントしている間、トレースクライアントはデフォルトでトレースを `localhost:8126` に送信します。これが正しいホストとポートでない場合は、次の環境変数を設定して変更してください。

    - `DD_AGENT_HOST`
    - `DD_TRACE_AGENT_PORT`

4. Linux で自動インスツルメンテーションを有効にするには、次の環境変数が必要です。

    <div class="alert alert-info"> 
      <strong>Note:</strong> If the .NET Tracer is installed into a path other than the default <code>/opt/datadog</code> path, ensure the paths are changed to match.
    </div>

    名前                       | 値
    ---------------------------|------
    `CORECLR_ENABLE_PROFILING` | `1`
    `CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`
    `CORECLR_PROFILER_PATH`    | `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`
    `DD_INTEGRATIONS`          | `/opt/datadog/integrations.json`
    `DD_DOTNET_TRACER_HOME`    | `/opt/datadog`

#### bash スクリプトで環境変数を設定する

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

#### SystemCTL (サービスごと)

`systemctl` を使用して、サービスとして .NET アプリケーションを実行する場合、特定のサービスに必要な環境変数がロードされるよう追加することができます。

1. 以下を含む、`environment.env` というファイルを作成します。

    ```bat
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_INTEGRATIONS=/opt/datadog/integrations.json
    DD_DOTNET_TRACER_HOME=/opt/datadog
    # any other environment variable used by the application
    ```
2. サービスのコンフィギュレーションファイルで、サービスブロックの [`EnvironmentFile`][2] としてこれを参照します。

    ```bat
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. .NET サービスを再起動して、環境変数の設定を有効にします。

#### SystemCTL (すべてのサービス)

<div class="alert alert-warning"> 
  <strong>注:</strong> .NET ランタイムは、これらの環境変数が設定された状態で開始された<em>あらゆる</em> .NET プロセスにプロファイラーをロードしようとします。インスツルメンテーションは、トレースする必要のあるアプリケーションのみに制限する必要があります。<strong>これらの環境変数をグローバルに設定しないでください。こうすると、ホスト上の<em>すべての</em> .NET プロセスがプロファイラーをロードします。<strong>
</div>

`systemctl` を使用して .NET アプリケーションをサービスとして実行する場合、`systemctl` によって実行されるすべてのサービスに対してロードされる環境変数を設定することもできます。

1. [`systemctl set-environment`][2] を実行して、必要な環境変数を設定します。

    ```bat
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_INTEGRATIONS=/opt/datadog/integrations.json
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog
    ```
2. `systemctl show-environment` を実行して、環境変数が設定されていることを確認します。

3. .NET サービスを再起動して、環境変数を有効にします。

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
{{% /tab %}}

{{< /tabs >}}

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `datadog.yaml` ファイルの `apm_enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、アプリ内の[クイックスタート手順][2]に従って、Datadog Agent 内でトレース収集を有効にします。

## カスタムインスツルメンテーション

<div class="alert alert-warning"> 
  <strong>注:</strong>  自動インスツルメンテーションとカスタムインスツルメンテーションの両方を使用している場合は、パッケージバージョン (MSI や NuGet など) の同期を維持することが重要です。
</div>

.NET アプリケーションでカスタムインスツルメンテーションを使用するには
1. `Datadog.Trace` [NuGet パッケージ][2]をアプリケーションに追加します。
2. アプリケーションコードで、`Datadog.Trace.Tracer.Instance` プロパティを介してグローバルトレーサーにアクセスし、新しいスパンを作成します。

カスタムインスツルメンテーションとカスタムタグ付けの詳細については、[.NET カスタムインスツルメンテーションドキュメント][3]を参照してください。

## .NET トレーサーの構成

.NET トレーサーには、次のいずれかの方法で設定できるコンフィギュレーション設定があります。

* 環境変数
* .NET アプリケーションコード内
* `datadog.json` ファイルの使用

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

上記の方法を使用して、次の表の変数を使用してトレースコンフィギュレーションをカスタマイズします。環境変数またはコンフィギュレーションファイルを設定するときは、最初の名前 (たとえば、`DD_TRACE_AGENT_URL`) を使用します。2 番目の名前 (たとえば、`AgentUri`) は、コードの設定を変更するときに使用する `TracerSettings` プロパティの名前を示します。

#### 統合サービスタグ付け

[統合サービスタグ付け][4]を使用するには、サービスに対して次の設定を構成します。

| 設定名                                        | 説明                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | 指定した場合、生成されたすべてのスパンに、指定された値の `env` タグを追加します。バージョン 1.17.0 で追加されました。                                                            |
| `DD_SERVICE`<br/><br/>`ServiceName`            | 指定した場合、サービス名を設定します。それ以外の場合、.NET トレーサーは、アプリケーション名 (IIS アプリケーション名、プロセスエントリアセンブリ、またはプロセス名) からサービス名を自動的に判別しようとします。バージョン 1.17.0 で追加されました。  |
| `DD_VERSION`<br/><br/>`ServiceVersion`            | 指定した場合、サービスのバージョンを設定します。バージョン 1.17.0 で追加されました。 |


#### 追加のオプションコンフィギュレーション

次の表は、自動インスツルメンテーションとカスタムインスツルメンテーションの両方で利用できる構成変数の一覧です。

| 設定名                                        | 説明                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | トレースが送信される URL エンドポイントを設定します。設定された場合、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` をオーバーライドします。デフォルト値は `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>` です。       |
| `DD_AGENT_HOST`                                     | トレースが送信されるホストを設定します (Agent を実行するホスト)。ホスト名または IP アドレスにできます。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。デフォルト値は `localhost` です。                 |
| `DD_TRACE_AGENT_PORT`                               | トレースが送信されるポートを設定します (Agent が接続のためにリッスンしているポート)。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。デフォルト値は `8126` です。                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | アプリケーションログへの相関識別子の自動挿入を有効または無効にします。                                                                                               |
| `DD_TRACE_GLOBAL_TAGS`<br/><br/>`GlobalTags`        | 指定された場合、指定されたすべてのタグを生成されたすべてのスパンに追加します。                                                                                                                                              |
| `DD_TRACE_DEBUG` <br/><br/>`DebugEnabled`           | デバッグのロギングを有効または無効にします。有効な値は `true` または `false` (デフォルト) です。                                                                          |
| `DD_TRACE_HEADER_TAGS`                              | 名前をタグ付けするヘッダーキー (大文字小文字の区別なし) のマップを受け入れ、一致するヘッダー値がルートスパンのタグとして自動的に提供されます。例: `CASE-insensitive-Header:my-tag-name,User-ID:userId`。バージョン 1.18.3 で追加されました。  |
| `DD_TRACE_LOG_DIRECTORY`                            | .NET Tracer ログのディレクトリを設定します。<br/><br/>デフォルト: `%ProgramData%\Datadog .NET Tracer\logs\`      |
| `DD_TRACE_LOG_PATH`                                 | 自動インスツルメンテーションログファイルにパスを設定し、他のすべての .NET Tracer ログファイルのディレクトリを決定します。`DD_TRACE_LOG_DIRECTORY` が設定されている場合は、無視されます。             |
| `DD_TRACE_SERVICE_MAPPING`                          | コンフィギュレーションを使用してサービスの名前を変更します。名前を変更するサービス名キーと、代わりに使用する名前のマップを、`[from-key]:[to-name]` の形式で受け入れます。例: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`。`from-key` はインテグレーションタイプに固有で、アプリケーション名のプレフィックスを除外する必要があります。たとえば、`my-application-sql-server` の名前を `main-db` に変更するには、`sql-server:main-db` を使用します。バージョン 1.23.0 で追加されました。 |
| `DD_TAGS`<br/><br/>`GlobalTags`       | 指定した場合、指定したすべてのタグを、生成されたすべてのスパンに追加します。例: `layer:api,team:intake`。バージョン 1.17.0 で追加されました。                                                           |

#### 自動インスツルメンテーションオプションコンフィギュレーション

次の表は、自動インスツルメンテーションの使用時に**のみ**利用できる構成変数の一覧です。

| 設定名                                                   | 説明                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                      | すべての自動インスツルメンテーションを有効または無効にします。環境変数を `false` に設定すると、CLR プロファイラーが完全に無効になります。他の構成メソッドの場合は、CLR プロファイラーはロードされ続けますが、トレースは生成されません。有効な値は `true` (デフォルト) または `false` です。 |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames`  | 無効にするインテグレーションのリストを設定します。他のインテグレーションはすべて有効のままになります。設定しなかった場合、すべてのインテグレーションが有効になります。セミコロンで区切ることで複数の値がサポートされます。有効な値は、[インテグレーション][5]セクションでリストされているインテグレーション名です。           |
| `DD_HTTP_CLIENT_ERROR_STATUSES`                                 | HTTP クライアントスパンがエラーとしてマークされる原因となるステータスコード範囲を設定します。デフォルト値は `400-499` です。 |
| `DD_HTTP_SERVER_ERROR_STATUSES`                                 | HTTP サーバースパンがエラーとしてマークされる原因となるステータスコード範囲を設定します。デフォルト値は `500-599` です。 |
| `DD_RUNTIME_METRICS_ENABLED`                                    | .NET ランタイムメトリクスを有効にします。有効な値は `true` または `false` です。デフォルト値は `false` です。バージョン 1.23.0 で追加されました。
| `DD_TRACE_ADONET_EXCLUDED_TYPES`<br/><br/>`AdoNetExcludedTypes` | 自動インスツルメンテーションから除外される `AdoNet` タイプ (たとえば、`System.Data.SqlClient.SqlCommand`) のリストを設定します。 |


#### インテグレーションコンフィギュレーションを無効にする

次の表に、インテグレーションごとに自動インスツルメンテーションを設定できる場合に**のみ**使用できる構成変数を示します。

| 設定名                                                                  | 説明                                                                                                           |
|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_<INTEGRATION_NAME>_ENABLED`<br/><br/>`Integrations[<INTEGRATION_NAME>].Enabled`            | 特定のインテグレーションを有効または無効にします。有効な値は、`true` (デフォルト) または `false` です。インテグレーション名は、[インテグレーション][5]セクションにリストされています。                          |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup_overview/compatibility_requirements/dotnet-core
[2]: https://www.nuget.org/packages/Datadog.Trace
[3]: /ja/tracing/setup_overview/custom_instrumentation/dotnet/
[4]: /ja/getting_started/tagging/unified_service_tagging/
[5]: /ja/tracing/setup_overview/compatibility_requirements/dotnet-core#integrations
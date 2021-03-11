---
title: .NET Framework アプリケーションのトレース
kind: documentation
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
code_lang: dotnet-framework
type: multi-code-lang
code_lang_weight: 70
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-dotnet'
    tag: GitHub
    text: ソースコード
  - link: 'https://www.datadoghq.com/blog/net-monitoring-apm/'
    tag: ブログ
    text: Datadog APM と分散型トレーシングを使用した .NET のモニタリング
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースを調査する
  - link: tracing/
    tag: 高度な使用方法
    text: 高度な使用方法
  - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/samples'
    tag: GitHub
    text: カスタムインスツルメンテーションの例
---
## 互換性要件

.NET トレーサーは、.NET Framework 4.5 以上の自動インスツルメンテーションをサポートします。サポート対象のライブラリについては、[互換性要件][1]ページをご覧ください。

## はじめに

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][2]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中にトレースの 100% の取り込みとトレース ID のログへの挿入を有効にします。

それ以外の場合、何らかの言語で記述されたアプリケーションのトレースを始めるには、まず [Datadog Agent をインストール、構成します][3]。.NET トレーサーはプロセス中に実行し、アプリケーションをインスツルメントし、トレースをアプリケーションから Agent に送信します。

**注**: .NET トレーサーは .NET ベースのすべての言語 (C#、F#、Visual Basic など) をサポートしています。

## 自動でデータと収集

自動インスツルメンテーションは、ゼロコード変更と最小限のコンフィギュレーションでアプリケーションのパフォーマンスデータを収集します。.NET トレーサーはすべての[サポートライブラリ][1]のインスツルメンテーションをすぐに、そして自動的に行います。

自動インスツルメンテーションは以下を取得します。

- インスツルメンテーションされたコールの実行時間
- Web リクエスト用 URL やステータスレスポンスコード、またはデータベースアクセス用 SQL クエリなどの関連するトレースデータ
- 未処理の例外（該当する場合スタックトレースを含む）
- システムを通過するトレース (例: ウェブリクエスト) の合計数

### インストール

Windows で自動インスツルメンテーションを使用するには、 [Windows 用 MSI インストーラー][4]を管理者として使用し、ホストに .NET トレーサーをインストールします。OS のアーキテクチャ (x64 または x86) に合致するインストーラーを選択してください。

.NET トレーサーをインストールしたら、アプリケーションを再起動して新しい環境変数の読み込みを行います。IIS を再起動する際は、以下のコマンドを管理者として実行します。

```cmd
net stop /y was
net start w3svc
```

### 必要な環境変数

アプリケーションを IIS 内で実行している場合は、以下の手順をスキップしてください。

IIS で**実行していない** Windows アプリケーションの場合は、アプリケーションの起動前に以下の 2 つの環境変数を設定し、自動インスツルメンテーションを有効にします。

**注:** .NET ランタイムはプロファイラーをこれらの環境変数の設定時に開始した_あらゆる_ .NET プロセスにロードしようとします。このため、インスツルメンテーションをトレースされる必要があるアプリケーションのみに制限してください。**ホストの_すべての_ .NET プロセスがプロファイラーをロードすることになるため、これらの環境変数をグローバルに設定しないでください。**

| 名前                   | 値                                    |
| ---------------------- | ---------------------------------------- |
| `COR_ENABLE_PROFILING` | `1`                                      |
| `COR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |

#### Windows Services

Windows Service を自動的にインスツルメントするには、そのサービスの環境変数を Windows Registry で設定します。`Environment` と呼ばれる複数文字列値を `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` キー に作成します。次に、キーのデータを表の値に設定します。
```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

これは、レジストリエディター（下図参照）を使うか PowerShell スニペットを使い実行できます。

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="レジストリエディター"  >}}

{{< code-block lang="powershell" filename="add-env-var.ps1" >}}
[String[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
{{< /code-block >}}

#### コンソールアプリ

アプリケーションの起動前にバッチファイルから環境変数を設定するには、

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
example.exe
```

## 手動インスツルメンテーション

コードのインスツルメンテーションを手動で行うには、`Datadog.Trace` [NuGet パッケージ][5]をアプリケーションに追加します。コード内で、`Datadog.Trace.Tracer.Instance` プロパティを通じてグローバルトレーサーにアクセスし、スパンを新規作成します。

手動インスツルメンテーションとカスタムタグの詳細については、[手動インスツルメンテーションのドキュメント][6]を参照してください。

手動インスツルメンテーションは、Windows の .NET Framework 4.5 以降、Windows と Linux の .NET Core 2.0 以降、および Windows と Linux の .NET5 でサポートされています。

**注:** 手動と自動両方のインスツルメンテーションを使用する場合、MSI インストーラーと NuGet パッケージのバージョンの同期を保つ必要があります。

## コンフィギュレーション

.NET トレーサーを構成する方法は複数あります:

- 環境変数を設定する
- .NET コードで
- アプリケーションの `app.config`/`web.config` ファイルを編集する (.NET フレームワークのみ)
- `datadog.json` ファイルを作成する

{{< tabs >}}

{{% tab "環境変数" %}}

環境変数を使ってトレーサーを構成するには、インスツルメンテーションされたアプリケーションを起動する前に変数を設定します。

例:

```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Launch application
example.exe
```

**注:** Windows Service に対して環境変数を設定するには、Windows レジストリで複数文字列キー `HKLM\System\CurrentControlSet\Services\{サービス名}\Environment` を使います。

{{% /tab %}}

{{% tab "コード" %}}

アプリケーションコードでトレーサーを構成するには、デフォルトの構成ソースから `TracerSettings` を作成します。`Tracer` コンストラクタに渡す前にこの `TracerSettings` インスタンスにプロパティを設定します。例:

```csharp
using Datadog.Trace;

// デフォルトの構成ソースを読み取る (env vars、web.config、datadog.json)
var settings = TracerSettings.FromDefaultSources();

// 一部の設定を変更
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
settings.AgentUri = new Uri("http://localhost:8126/");

// この設定を使ってトレーサーを新規作成
var tracer = new Tracer(settings);

// グローバルトレーサーを設定
Tracer.Instance = tracer;
```

**注:** 設定は `Tracer` を作成する_前_に `TracerSettings` に設定される必要があります。`Tracer` 作成後の `TracerSettings` プロパティの変更は無視されます。

{{% /tab %}}

{{% tab "web.config" %}}

`app.config` または `web.config` ファイルを使ってトレーサーを構成するには、`<appSettings>` セクションを使います。例:

```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_ENV" value="prod"/>
    <add key="DD_SERVICE" value="MyService"/>
    <add key="DD_VERSION" value="abc123"/>
  </appSettings>
</configuration>
```

{{% /tab %}}

{{% tab "JSON ファイル" %}}

JSON ファイルを使ってトレーサーを構成するには、インスツルメンテーションされたアプリケーションのディレクトリに `datadog.json` を作成します。ルート JSON オブジェクトは各設定のキー/値を持つハッシュである必要があります。例:

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

### 構成変数

次の表は、サポートされた構成変数の一覧です。環境変数またはコンフィギュレーションファイルの設定には最初の名前 (`DD_TRACE_AGENT_URL` など) を使用します。2 つ目の名前 (存在する場合、`AgentUri` など) は、コードの設定を変更するときに `TracerSettings` プロパティが使用する名前を示します。

#### 統合サービスタグ付け

| 設定名                                        | 説明                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | 指定された場合、生成されたすべてのスパンに指定された値で `env` タグを追加します。`env` タグの詳細については、[Agent コンフィギュレーション][8]を参照してください。バージョン 1.17.0 以降で利用可能。                                                           |
| `DD_SERVICE`<br/><br/>`ServiceName`            | 指定された場合、サービス名を設定します。指定されなかった場合は、.NET トレーサーがアプリケーション名から自動的にサービス名を決定しようとします (例: IIS アプリケーション名、プロセスエントリアセンブリ、またはプロセス名)。バージョン 1.17.0 以降で利用可能。  |
| `DD_VERSION`<br/><br/>`ServiceVersion`            | 指定された場合、サービスのバージョンを設定します。バージョン 1.17.0 以降で利用可能。
| `DD_TAGS`<br/><br/>`GlobalTags`       | 指定された場合、指定されたすべてのタグを生成されたすべてのスパンに追加します (例、`layer:api,team:intake`)。バージョン 1.17.0 以降で利用可能。                                                                                                                                              |

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することを強くおすすめします。
このような環境変数の構成におすすめの方法については、[統合サービスタグ付け][7]のドキュメントをご参照ください。

#### インスツルメンテーション

| 設定名                                        | 説明                                                                                                                                                                                                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | トレースが送信される URL エンドポイントを設定します。設定された場合、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` をオーバーライドします。デフォルト値は `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>` です。                                         |
| `DD_AGENT_HOST`                                     | トレースが送信されるホストを設定します (Agent を実行するホスト)。ホスト名または IP アドレスにできます。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。デフォルト値は `localhost` です。                                       |
| `DD_TRACE_AGENT_PORT`                               | トレースが送信されるポートを設定します (Agent が接続のためにリッスンしているポート)。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。デフォルト値は `8126` です。                                                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | アプリケーションログへの相関識別子の自動挿入を有効または無効にします。                                                                                                                         |
| `DD_TRACE_DEBUG`                                    | デバッグのロギングを有効または無効にします。有効な値は `true` または `false` (デフォルト) です。                                                                                                                                 |
| `DD_TRACE_HEADER_TAGS`                              | 名前をタグ付けするヘッダーキー（大文字小文字の区別なし）のマップを受け入れ、一致するヘッダー値がルートスパンのタグとして自動的に提供されます。(例、`CASE-insensitive-Header:my-tag-name,User-ID:userId`)。バージョン 1.18.3 以降で使用可能。      |

次の表は、自動インスツルメンテーションの使用時にのみ利用できる構成変数の一覧です。

| 設定名                                                   | 説明                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                      | すべての自動インスツルメンテーションを有効または無効にします。環境変数を `false` に設定すると、CLR プロファイラーが完全に無効になります。他の構成メソッドの場合は、CLR プロファイラーはロードされ続けますが、トレースは生成されません。有効な値は `true` (デフォルト) または `false` です。 |
| `DD_TRACE_LOG_DIRECTORY`                                        | .NET Tracer ログのディレクトリを設定します。<br/><br/>デフォルト: `%ProgramData%\Datadog .NET Tracer\logs\`                                                                                                                                                                                     |
| `DD_TRACE_LOG_PATH`                                             | 自動インスツルメンテーションログファイルにパスを設定し、他のすべての .NET Tracer ログファイルのディレクトリを決定します。`DD_TRACE_LOG_DIRECTORY` が設定されている場合は、無視されます。                                                                                                                    |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames`  | 無効にするインテグレーションのリストを設定します。他のインテグレーションはすべて有効のままになります。設定しなかった場合、すべてのインテグレーションが有効になります。セミコロンで区切ることで複数の値がサポートされます。有効な値は、[インテグレーション][1]セクションでリストされているインテグレーション名です。                             |
| `DD_TRACE_ADONET_EXCLUDED_TYPES`<br/><br/>`AdoNetExcludedTypes` | 自動インスツルメンテーションから除外される `AdoNet` タイプ (たとえば、`System.Data.SqlClient.SqlCommand`) のリストを設定します。 |

次の表は、自動インスツルメンテーションの使用時にのみ利用できる構成変数の一覧で、インテグレーションごとに設定できます。環境変数またはコンフィギュレーションファイルの設定には最初の名前 (`DD_<INTEGRATION>_ENABLED` など) を使用します。2 つ目の名前 (`Enabled` など) は、コードの設定を変更するときに `IntegrationSettings` プロパティが使用する名前を示します。これらのプロパティには `TracerSettings.Integrations[]` インデクサを通じてアクセスします。インテグレーション名については、[インテグレーション][1]セクションを参照してください。

| 設定名                                                            | 説明                                                                                                           |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_<INTEGRATION>_ENABLED`<br/><br/>`Enabled`                           | 特定のインテグレーションを有効または無効にします。有効な値は `true` (デフォルト) または `false` です。                            |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/dotnet-framework
[2]: https://app.datadoghq.com/apm/docs
[3]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/windows/?tab=gui
[4]: https://github.com/DataDog/dd-trace-dotnet/releases
[5]: https://www.nuget.org/packages/Datadog.Trace
[6]: /ja/tracing/custom_instrumentation/dotnet/
[7]: /ja/getting_started/tagging/unified_service_tagging/
---
code_lang: dotnet
code_lang_weight: 60
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: tracing/profiler/search_profiles
  tag: ドキュメント
  text: 使用可能なプロファイルタイプの詳細
- link: tracing/profiler/profiler_troubleshooting
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
kind: ドキュメント
title: .NET プロファイラーの有効化
type: multi-code-lang
---

<div class="alert alert-warning">
Datadog .NET Profiler は公開ベータ版です。Datadog では、本番環境にデプロイする前に重要でない環境でプロファイラを評価することを推奨しています。
</div>

<br>

## 要件

**対応 OS:**

- Windows 10
- Windows Server バージョン 2012 以降

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

**対応する .NET ランタイム:**

以下で動作する 64 ビットアプリケーション:
- .NET Framework 4.6.1+
- .NET Core 2.1、3.1
- .NET 5
- .NET 6

**対応言語:**

C#、F#、Visual Basic など、.NET ランタイムをターゲットとするあらゆる言語。

## インストール

<div class="alert alert-warning">
<strong>**注**:</strong> Datadog の .NET トレーサーおよびプロファイラーは、.NET CLR Profiling API に依存します。この API に許可されるサブスクライバーは 1 つのみです（たとえば APM）。可視性を最大限に向上するため、アプリケーション環境で 1 つの APM ソリューションのみを実行してください。
</div>

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][1] 以降または [6.20.2][2] 以降にアップグレードしてください。

2. プロファイラーはトレーサーと一緒に出荷されます。[.NET Monitoring MSI インストーラー][3]を使って、最新版をインストールまたはアップグレードしてください。Continuous Profiler は 64-bit Windows をサポートしていますので、`datadog-dotnet-apm-<VERSION>-x64.msi` のようなファイルが必要です。

   インストーラーを管理者権限で実行します。

<div class="alert alert-warning">
  <strong>注:</strong> 次のステップでは、プロファイラーを有効にするための環境変数を設定します。Datadog では、これらの環境変数をマシンレベルで設定することは<strong>推奨していません</strong>。マシンレベルで設定した場合、マシン上で実行されているすべての .NET アプリケーションがプロファイリングされ、マシンの CPU とメモリに大きなオーバーヘッドが発生します。
</div>

{{< tabs >}}

{{% tab "Internet Information Services (IIS)" %}}
1. プロファイラーを構成し、有効にするために必要な環境変数を設定します。IIS アプリケーションのプロファイラーを有効にするには、レジストリの <code>HKLMSystemSapporoCurrentControlSetServicesWAS</code> と <code>HKLMSystemSapporoCurrentControlSetServicesW3SVC</code> ノードで環境変数 `DD_PROFILING_ENABLED`、`DD_ENV`、`DD_SERVICE` および `DD_VERSION` を設定する必要があります。

   **レジストリエディターを使用:**

   レジストリエディターで、`HKLM\System\CurrentControlSet\Services\WAS` と `HKLM\System\CurrentControlSet\Services\W3SVC` ノード内の `Environment` という複数文字列値を変更し、以下のように値を設定します。

   .NET Core と .NET 5+ の場合:
   ```text
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

   {{< img src="tracing/setup/dotnet/RegistryEditorCoreIIS.png" alt="レジストリエディターを使用して、IIS の .NET Core アプリケーションの環境変数を作成する" style="width:90%" >}}

   .NET Framework の場合:
   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorFrameworkIIS.png" alt="レジストリエディターを使用して、IIS の .NET Framework アプリケーションの環境変数を作成する" style="width:90%" >}}

   <strong>注</strong>: 環境変数は、<em>すべての</em> IIS アプリケーションに適用されます。IIS 10 以降、<a href="https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig"><code>C:indexWindowsSystem32/inetsrv/config/applicationhost.config</code> ファイル</a>に IIS アプリケーションごとの環境変数が設定できるようになりました。詳細は、<a href="https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">Microsoft のドキュメント</a>を参照してください。

2. 管理者権限で以下のコマンドを実行し、IIS を完全に停止・起動します。

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Use <code>stop</code> and <code>start</code> commands. A reset or restart does not always work.
   </div>

3. アプリケーションの起動 1〜2 分後、[Datadog APM > Profiler ページ][1]にプロファイルが表示されます。

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "Windows サービス" %}}
1. プロファイラーを構成し、有効にするために必要な環境変数を設定します。サービスのプロファイラーを有効にするには、サービスに関連付けられたレジストリキーで環境変数 `DD_PROFILING_ENABLED`、`DD_ENV`、`DD_SERVICE` および `DD_VERSION` を設定する必要があります。

   **レジストリエディターを使用:**

   レジストリエディターで、`HKLM\System\CurrentControlSet\Services\MyService` キーに `Environment` 複数の文字列値を作成します。

   .NET Core と .NET 5+ の場合:
   ```text
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="レジストリエディターを使用して Windows サービスに環境変数を作成" style="width:90%" >}}

   .NET Framework の場合:
   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="レジストリエディターを使用して Windows サービスに環境変数を作成" style="width:90%" >}}

   **PowerShell スクリプトを使用:**

   .NET Core と .NET 5+ の場合:
   ```powershell
   [string[]] $v = @(
       "CORECLR_ENABLE_PROFILING=1",
       "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
       "DD_PROFILING_ENABLED=1",
       "DD_SERVICE=MyService",
       "DD_ENV=production",
       "DD_VERSION=1.2.3"
   )
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\MyService -Name Environment -Value $v
   ```

   .NET Framework の場合:
   ```powershell
   [string[]] $v = @(
       "COR_ENABLE_PROFILING=1",
       "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
       "DD_PROFILING_ENABLED=1",
       "DD_SERVICE=MyService",
       "DD_ENV=production",
       "DD_VERSION=1.2.3"
   )
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\MyService -Name Environment -Value $v
   ```

2. アプリケーションの起動 1〜2 分後、[Datadog APM > Profiler ページ][1]にプロファイルが表示されます。

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "スタンドアロンアプリケーション" %}}
1. コンソール、ASP.NET (Core)、Windows Forms、WPF などの非サービスアプリケーションでプロファイラーを構成して有効にするために、必要な環境変数を設定します。スタンドアロンアプリケーションのプロファイラーを有効にするには、`DD_PROFILING_ENABLED`、`DD_ENV`、`DD_SERVICE` および `DD_VERSION` 環境変数を設定する必要があります。推奨される方法は、これらを設定しアプリケーションを起動するバッチファイルを作成し、そのバッチファイルを使用してアプリケーションを実行することです。

   .NET Core と .NET 5+ の場合:
   ```cmd
   SET CORECLR_ENABLE_PROFILING=1
   SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   SET DD_PROFILING_ENABLED=1
   SET DD_SERVICE=MyService
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

   .NET Framework の場合:
   ```cmd
   SET COR_ENABLE_PROFILING=1
   SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   SET DD_PROFILING_ENABLED=1
   SET DD_SERVICE=MyService
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

2. アプリケーションの起動 1〜2 分後、[Datadog APM > Profiler ページ][1]にプロファイルが表示されます。

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}
{{< /tabs >}}

<br>

## コンフィギュレーション

プロファイラーを構成するには、以下の環境変数を使用します。これらの設定のほとんどは、トレーサーの構成にも適用されることに注意してください。これらの設定を変更した後は、アプリケーションを再起動します。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                   | 文字列        | [環境][4]名、例えば `production` です。設定されていない場合は、 `unspecified-environment` となります。 |
| `DD_SERVICE`               | 文字列        | [サービス][4]名、例えば `web-backend` です。これが指定されていない場合、.NET Profiler はアプリケーション名 (プロセスエントリアセンブリまたはプロセス名) から自動的にサービス名を決定しようとします。    |
| `DD_VERSION`               | 文字列        | サービスの[バージョン][4]。設定されていない場合は、`unspecified-version` となります。 |
| `DD_TAGS`                  | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります（例、`layer:api,team:intake`）。   |
| `DD_AGENT_HOST`            | 文字列        | プロファイルが送信されるホストを設定します (Agent を実行するホスト)。ホスト名または IP アドレスにできます。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。デフォルトは `localhost` です。  |
| `DD_TRACE_AGENT_PORT`      | 文字列        | プロファイルが送信されるポートを設定します (Agent が接続のためにリッスンしているポート)。`DD_TRACE_AGENT_URL` が設定されている場合は無視されます。デフォルトは `8126` です。  |
| `DD_TRACE_AGENT_URL`       | 文字列        | プロファイルが送信される URL エンドポイントを設定します。設定された場合、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` をオーバーライドします。デフォルトは `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>` です。  |
| `DD_TRACE_DEBUG`           | Boolean        | デバッグログを有効または無効にします (トラブルシューティングの調査時に役立ちます)。有効な値は `true` または `false` です。デフォルトは `false` です。  |
| `DD_PROFILING_LOG_DIR`     | 文字列        | .NET Profiler のログを保存するディレクトリを設定します。デフォルトは `%ProgramData%\Datadog-APM\logs\` です。  |
| `DD_PROFILING_ENABLED`     | Boolean        | `true` に設定すると、.NET Profiler が有効になります。デフォルトは `false` です。  |

<div class="alert alert-warning">
<strong>注</strong>: IIS アプリケーションでは、<a href="?tab=windowsservices#installation">上記の Windows Service タブ</a>のように、レジストリ(<code>HKLM\System\CurrentControlSet\Services\WAS</code> および <code>HKLM\System\CurrentControlSet\Services\W3SVC</code> ノード) で環境変数の設定を行う必要があります。この環境変数は、<em>すべての</em> IIS アプリケーションに適用されます。
IIS 10 以降では、<a href="https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig"><code>C:\Windows\System32\inetsrv\config\applicationhost.config</code> ファイル</a>で、IIS アプリケーションごとの環境変数を設定できます。詳細は、<a href="https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">Microsoft のドキュメント</a>を参照してください。
</div>

<br>

## その他の参考資料

[プロファイラーの概要][5]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: /ja/getting_started/profiler/
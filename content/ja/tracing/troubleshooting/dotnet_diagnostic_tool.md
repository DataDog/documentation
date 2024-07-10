---
title: トラブルシューティングのための .NET 診断ツールの使用について
---

.NET トレーサーをインストールした後、アプリケーションが期待通りにトレースを生成しない場合、基本的なトラブルシューティングのために、このページで説明されている診断ツール `dd-dotnet` を実行してください。環境変数が足りない、インストールが不完全、Agent に到達できないなど、セットアップの問題を特定するのに役立ちます。

診断ツール `dd-dotnet` は、バージョン 2.42.0 以降のトレーシングライブラリにバンドルされています。これはトレーシングライブラリのインストールフォルダにあり、自動的にシステムの `PATH` に追加され、どこからでも呼び出すことができます。

## `dd-trace` のインストール

**このセクションは、バージョン 2.42.0 よりも古いトレーサーのバージョンに対応しています。**

トレーサーの古いバージョンには、`dd-dotnet` ツールが含まれていませんでした。代わりに `dd-trace` ツールをインストールすることができます。機能と構文は `dd-dotnet` に似ています。

`dd-trace` は以下のいずれかの方法でインストールできます。

- 以下のコマンドを実行して、.NET SDK を使用する。
   ```
   dotnet tool install -g dd-trace
   ```
- 適切なバージョンをダウンロードする。
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][1]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][2]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][3]

- または、[github のリリースページより][4]ダウンロードする。

次のセクションのコマンドを呼び出すときは、必ず `dd-dotnet` を `dd-trace` に置き換えてください。

## プロセス診断

ほとんどのアプリケーションでは、プロセス診断で問題を見つけることができます。

1. アプリケーションが動作していることを確認し、プロセス ID (pid) を取得します。

   Windows プロセスの pid を取得するには、タスクマネージャーを開き、**詳細**タブを開き、PID 列を探します。また、`tasklist /FI "IMAGENAME eq target.exe"` (ここで `target.exe` はプロセスの名前) というコマンドを実行することもできます。

   Linux でプロセスの pid を取得するには、`ps aux | grep target` (ここで `target` はプロセスの名前) というコマンドを実行します (Docker コンテナで実行している場合、pid は通常 `1` です)。

2. pid を dd-dotnet ツールに渡します。
   ```
   dd-dotnet check process <pid>
   ```
   基本的な構成チェックを行い、問題が見つかった場合は推奨事項を表示します。

問題がない出力例:
```bash
$ dd-dotnet check process 35888

Running checks on process 35888
Process name: SimpleApp

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Core
1. Checking Modules Needed so the Tracer Loads:
 [SUCCESS]: The native library version 2.42.0.0 is loaded into the process.
 [SUCCESS]: The tracer version 2.42.0.0 is loaded into the process.
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [SUCCESS]: DD_DOTNET_TRACER_HOME is set to 'C:\git\dd-trace-dotnet-2\shared\bin\monitoring-home\win-x64\..' and the
directory was found correctly.
3. Checking CORECLR_PROFILER_PATH and related configuration value:
 [SUCCESS]: The environment variable CORECLR_PROFILER_PATH_32 is set to the correct value of
C:\git\dd-trace-dotnet-2\shared\bin\monitoring-home\win-x86\Datadog.Trace.ClrProfiler.Native.dll.
 [SUCCESS]: The environment variable CORECLR_PROFILER_PATH_64 is set to the correct value of
C:\git\dd-trace-dotnet-2\shared\bin\monitoring-home\win-x64\Datadog.Trace.ClrProfiler.Native.dll.
4. Checking CORECLR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable CORECLR_PROFILER is set to the correct value of
{846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking CORECLR_ENABLE_PROFILING and related configuration value:
 [SUCCESS]: The environment variable CORECLR_ENABLE_PROFILING is set to the correct value of 1.

---- CONFIGURATION CHECKS -----
1. Checking if tracing is disabled using DD_TRACE_ENABLED.
 [INFO]: DD_TRACE_ENABLED is not set, the default value is true.
2. Checking if profiling is enabled using DD_PROFILING_ENABLED.
 [INFO]: DD_PROFILING_ENABLED is not set, the continuous profiler is disabled.

---- DATADOG AGENT CHECKS -----
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
 [SUCCESS]: No issue found with the target process.
```

問題がある出力例:
```bash
$ dd-dotnet check process 4464

Running checks on process 4464
Process name: SimpleApp

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Core
1. Checking Modules Needed so the Tracer Loads:
 [WARNING]: The native loader library is not loaded into the process
 [WARNING]: The native tracer library is not loaded into the process
 [WARNING]: Tracer is not loaded into the process
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [WARNING]: DD_DOTNET_TRACER_HOME is set to 'C:\Program Files\Datadog\.NET Tracer\' but the directory does not exist.
3. Checking CORECLR_PROFILER_PATH and related configuration value:
 [FAILURE]: The environment variable CORECLR_PROFILER_PATH_32 is set to C:\Program Files\Datadog\.NET
Tracer\win-x86\Datadog.Trace.ClrProfiler.Native.dll but the file is missing or you don't have sufficient permission.
 [FAILURE]: The environment variable CORECLR_PROFILER_PATH_64 is set to C:\Program Files\Datadog\.NET
Tracer\win-x64\Datadog.Trace.ClrProfiler.Native.dll but the file is missing or you don't have sufficient permission.
4. Checking CORECLR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable CORECLR_PROFILER is set to the correct value of
{846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking CORECLR_ENABLE_PROFILING and related configuration value:
 [FAILURE]: The environment variable CORECLR_ENABLE_PROFILING should be set to '1' (current value: not set)
6. Checking if process tracing configuration matches Installer or Bundler:
Installer/MSI related documentation:
https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#install-the-tracer
 [FAILURE]: Unable to find Datadog .NET Tracer program, make sure the tracer has been properly installed with the MSI.
 [WARNING]: The registry key SOFTWARE\Classes\CLSID\{846F5F1C-F9AE-4B07-969E-05C26BC060D8}\InprocServer32 is missing. If
using the MSI, make sure the installation was completed correctly try to repair/reinstall it.
 [WARNING]: The registry key SOFTWARE\Classes\Wow6432Node\CLSID\{846F5F1C-F9AE-4B07-969E-05C26BC060D8}\InprocServer32 is
missing. If using the MSI, make sure the installation was completed correctly try to repair/reinstall it.
 ```


## IIS 診断

IIS アプリケーションの場合、以下のコマンドを使用することで、より詳細な診断を受けることができます。`<FULL SITE NAME>` は IIS のサイト名で、その後にアプリケーションの名前が続きます。

```
dd-dotnet check iis "<FULL SITE NAME>"
```

IIS ではアプリケーションプールが遅延して開始されるため、コマンドを実行する前に、サイトが少なくとも 1 つのリクエストを受信していることを確認してください。

**名前にスペースがある場合は、引用符で囲むことを忘れないでください。**

例えば、以下に示すアプリケーションの完全なサイト名は、`Default Web Site/WebApplication1` です。

{{< img src="tracing/troubleshooting/IISManager.png" alt="IIS マネージャー">}}

このアプリケーションで IIS の診断を実行するコマンドは、
```
dd-dotnet check iis "Default Web Site/WebApplication1"
```

サイトのルートアプリケーションをインスツルメントするには、以下を実行します。
```
dd-dotnet check iis "Default Web Site"
```

`check iis` コマンドはプロセス診断を含むので、基本的な構成チェックを行い、問題が見つかった場合は推奨事項を表示します。

問題がない出力例:
```bash
$ dd-dotnet check iis "Default Web Site/WebFormsTestApp"

Fetching IIS application "Default Web Site/WebFormsTestApp".
Inspecting worker process 39852

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Framework
1. Checking Modules Needed so the Tracer Loads:
 [SUCCESS]: The native library version 2.42.0.0 is loaded into the process.
 [SUCCESS]: The tracer version 2.42.0.0 is loaded into the process.
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [SUCCESS]: DD_DOTNET_TRACER_HOME is set to 'C:\Program Files\Datadog\.NET Tracer\' and the directory was found
correctly.
3. Checking COR_PROFILER_PATH and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER_PATH_32 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x86\Datadog.Trace.ClrProfiler.Native.dll.
 [SUCCESS]: The environment variable COR_PROFILER_PATH_64 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x64\Datadog.Trace.ClrProfiler.Native.dll.
4. Checking COR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER is set to the correct value of {846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking COR_ENABLE_PROFILING and related configuration value:
 [SUCCESS]: The environment variable COR_ENABLE_PROFILING is set to the correct value of 1.

---- CONFIGURATION CHECKS -----
1. Checking if tracing is disabled using DD_TRACE_ENABLED.
 [INFO]: DD_TRACE_ENABLED is not set, the default value is true.
2. Checking if profiling is enabled using DD_PROFILING_ENABLED.
 [INFO]: DD_PROFILING_ENABLED is not set, the continuous profiler is disabled.

---- DATADOG AGENT CHECKS -----
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
Found Datadog.Trace version 2.42.0.0 in the GAC
 [SUCCESS]: No issue found with the IIS site.
```

問題がある出力例:
```bash
$ dd-dotnet check iis "Default Web Site/WebFormsTestApp"

Fetching IIS application "Default Web Site/WebFormsTestApp".
Inspecting worker process 35152

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Framework
1. Checking Modules Needed so the Tracer Loads:
 [SUCCESS]: The native library version 2.42.0.0 is loaded into the process.
 [SUCCESS]: The tracer version 2.42.0.0 is loaded into the process.
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [SUCCESS]: DD_DOTNET_TRACER_HOME is set to 'C:\Program Files\Datadog\.NET Tracer\' and the directory was found
correctly.
3. Checking COR_PROFILER_PATH and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER_PATH_32 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x86\Datadog.Trace.ClrProfiler.Native.dll.
 [SUCCESS]: The environment variable COR_PROFILER_PATH_64 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x64\Datadog.Trace.ClrProfiler.Native.dll.
4. Checking COR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER is set to the correct value of {846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking COR_ENABLE_PROFILING and related configuration value:
 [SUCCESS]: The environment variable COR_ENABLE_PROFILING is set to the correct value of 1.

---- CONFIGURATION CHECKS -----
1. Checking if tracing is disabled using DD_TRACE_ENABLED.
 [INFO]: DD_TRACE_ENABLED is not set, the default value is true.
2. Checking if profiling is enabled using DD_PROFILING_ENABLED.
 [INFO]: DD_PROFILING_ENABLED is not set, the continuous profiler is disabled.

---- DATADOG AGENT CHECKS -----
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
 [FAILURE]: The Datadog.Trace assembly could not be found in the GAC. Make sure the tracer has been properly installed
with the MSI.
```

## Agent の接続性診断

特定のアプリケーションのチェックを実行するのではなく、Agent への接続をテストしたいだけの場合は、以下を実行します。
```
dd-dotnet check agent <url>
```

このコマンドは、Agent にリクエストを送信し、エラーを探します。オプションの `url` パラメーターが省略された場合は、環境変数から Agent の場所を決定します。サポートされているプロトコルは `http://` または `unix://` (ドメインソケットの場合) です。

問題がない出力例:
```bash
$ dd-dotnet check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
 [SUCCESS]: Connected successfully to the Agent.
```

問題がある出力例:
```bash
$ dd-dotnet check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
 [FAILURE]: Error connecting to Agent at http://127.0.0.1:8126/: System.Net.Http.HttpRequestException: No connection
could be made because the target machine actively refused it. (127.0.0.1:8126)
```

Agent の接続に関する問題については、[接続エラー][5]をお読みください。


[1]: https://dtdg.co/dd-trace-dotnet-win-x64
[2]: https://dtdg.co/dd-trace-dotnet-linux-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[4]: https://github.com/DataDog/dd-trace-dotnet/releases
[5]: /ja/tracing/troubleshooting/connection_errors/?code-lang=dotnet#
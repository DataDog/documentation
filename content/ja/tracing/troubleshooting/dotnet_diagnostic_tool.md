---
kind: documentation
title: トラブルシューティングのための .NET 診断ツールの使用について
---

.NET トレーサーをインストールした後、アプリケーションが期待通りにトレースを生成しない場合、基本的なトラブルシューティングのために診断ツールを実行します。環境変数の欠落、不完全なインストール、到達できない Agent など、セットアップの問題を把握するのに役立ちます。

以下のいずれかの方法でツールをインストールします。

- 以下のコマンドを実行して、.NET SDK を使用する。
   ```
   dotnet tool install -g dd-trace
   ```
- 適切なバージョンをダウンロードする。
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][1]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][2]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][3]

- または、[github のリリースページより][4]ダウンロードする。

## プロセス診断

ほとんどのアプリケーションでは、プロセス診断で問題を見つけることができます。

1. アプリケーションが動作していることを確認し、プロセス ID (pid) を取得します。

   Windows プロセスの pid を取得するには、タスクマネージャーを開き、**詳細**タブを開き、PID 列を探します。また、`tasklist /FI "IMAGENAME eq target.exe"` (ここで `target.exe` はプロセスの名前) というコマンドを実行することもできます。

   Linux でプロセスの pid を取得するには、`ps aux | grep target` (ここで `target` はプロセスの名前) というコマンドを実行します (Docker コンテナで実行している場合、pid は通常 `1` です)。

2. pid を dd-trace ツールに渡します。
   ```
   dd-trace check process <pid>
   ```
   基本的な構成チェックを行い、問題が見つかった場合は推奨事項を表示します。

問題がない出力例:
```bash
$ dd-trace check process 16436

Running checks on process 16436
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
No issue found with the target process.
```

問題がある出力例:
```bash
$ dd-trace check process 35888

Running checks on process 35888
Target process is running with .NET Framework
Profiler is not loaded into the process
Tracer is not loaded into the process
The environment variable COR_ENABLE_PROFILING should be set to '1' (current value: '0')
```


## IIS 診断

IIS アプリケーションの場合、以下のコマンドを使用することで、より詳細な診断を受けることができます。`<FULL SITE NAME>` は IIS のサイト名で、その後にアプリケーションの名前が続きます。

```
dd-trace check iis "<FULL SITE NAME>"
```

IIS ではアプリケーションプールが遅延して開始されるため、コマンドを実行する前に、サイトが少なくとも 1 つのリクエストを受信していることを確認してください。

**名前にスペースがある場合は、引用符で囲むことを忘れないでください。**

例えば、以下に示すアプリケーションの完全なサイト名は、`Default Web Site/WebApplication1` です。

{{< img src="tracing/troubleshooting/IISManager.png" alt="IIS マネージャー">}}

このアプリケーションで IIS の診断を実行するコマンドは、
```
dd-trace check iis "Default Web Site/WebApplication1"
```

サイトのルートアプリケーションをインスツルメントするには、以下を実行します。
```
dd-trace check iis "Default Web Site"
```

`check iis` コマンドはプロセス診断を含むので、基本的な構成チェックを行い、問題が見つかった場合は推奨事項を表示します。

問題がない出力例:
```bash
$ dd-trace check iis "Default Web Site/WebApplication1"

Fetching application /WebApplication1 from site Default Web Site
Inspecting worker process 47160
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
Found Datadog.Trace version 2.4.0.0 in the GAC
No issue found with the IIS site.
```

問題がある出力例:
```bash
$ dd-trace check iis "Default Web Site/WebApplication1"

Fetching application /WebApplication1 from site Default Web Site
Inspecting worker process 47160
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
The Datadog.Trace assembly could not be found in the GAC. Make sure the tracer has been properly installed with the MSI.
```

## Agent の接続性診断

特定のアプリケーションのチェックを実行するのではなく、Agent への接続をテストしたいだけの場合は、以下を実行します。
```
dd-trace check agent <url>
```

このコマンドは、Agent にリクエストを送信し、エラーを探します。オプションの `url` パラメーターが省略された場合は、環境変数から Agent の場所を決定します。サポートされているプロトコルは `http://` または `unix://` (ドメインソケットの場合) です。

問題がない出力例:
```bash
$ dd-trace check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
Connected successfully to the Agent.
```

問題がある出力例:
```bash
$ dd-trace check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Error connecting to Agent at http://127.0.0.1:8126/: No connection could be made because the target machine actively refused it. (127.0.0.1:8126)
```

Agent の接続に関する問題については、[接続エラー][5]をお読みください。


[1]: https://dtdg.co/dd-trace-dotnet-win-x64
[2]: https://dtdg.co/dd-trace-dotnet-linux-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[4]: https://github.com/DataDog/dd-trace-dotnet/releases
[5]: /ja/tracing/troubleshooting/connection_errors/?code-lang=dotnet#
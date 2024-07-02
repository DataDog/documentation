---
title: Troubleshooting the .NET Profiler
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 60
further_reading:
    - link: /tracing/troubleshooting
      tag: Documentation
      text: APM Troubleshooting
---

## プロファイル検索ページにないプロファイル

プロファイラーを構成してもプロファイル検索ページにプロファイルが表示されない場合、OS によって確認すべき点が異なりますので、以下にご紹介します。

{{< tabs >}}

{{% tab "Linux" %}}

1. Agent がインストールされ、動作していることを確認します。

2. ローダーログからプロファイラーが読み込まれたことを確認します。

   1. `/var/log/datadog` フォルダにある `dotnet-native-loader-dotnet-<pid>` のログファイルを開きます。

   2. 最後のほうにある `CorProfiler::Initialize: Continuous Profiler initialized successfully.` を探してください。このメッセージがない場合、アプリケーションの環境変数 `DD_TRACE_DEBUG` を設定して、デバッグログを有効にしてください。

   3. アプリケーションを再起動します。

   4. `/var/log/datadog` フォルダにある `dotnet-native-loader-dotnet-<pid>` のログファイルを開きます。

   5. `#Profiler` エントリーを探してください。

   6. プロファイラーライブラリがロードされていることを確認するため、以下の行をチェックしてください。
      ```
      [...] #Profiler
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x64;.\Datadog.Profiler.Native.dll
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x86;.\Datadog.Profiler.Native.dll
      [...] DynamicDispatcherImpl::LoadConfiguration: [PROFILER] Loading: .\Datadog.Profiler.Native.dll [AbsolutePath=/opt/datadog/linux-x64/./Datadog.Tracer.Native.so]
      [...] [PROFILER] Creating a new DynamicInstance object
      [...] Load: /opt/datadog/linux-x64/./Datadog.Tracer.Native.so
      [...] GetFunction: DllGetClassObject
      [...] GetFunction: DllCanUnloadNow
      ```

3. プロファイルのエクスポート結果を確認します。

   1. ステップ 2.2 でデバッグログを有効にしなかった場合、アプリケーションの `DD_TRACE_DEBUG` 環境変数を `true` に設定し、アプリケーションを再起動します。

   2. `/var/log/datadog` フォルダにある `DD-DotNet-Profiler-Native-<Application Name>-<pid>` のログファイルを開きます。

   3. `libddprof error: Failed to send profile.` エントリーを探します。このメッセージは、Agent にコンタクトできないことを意味します。`DD_TRACE_AGENT_URL` が正しい Agent の URL に設定されていることを確認します。詳細については、[.NET プロファイラーの有効化-構成][1]を参照してください。

   4. もし、`Failed to send profile` というメッセージがない場合は、`The profile was sent. Success?` というエントリーを探します。

      以下のメッセージは、プロファイルの送信に成功したことを意味します。
      ```
      true, Http code: 200
      ```

   5. API キーが無効な場合、403 などのエラーの可能性がありますので、他の HTTP コードを確認してください。

4. CPU または Wall タイムのプロファイルがない場合のみ、スタックウォーク用の Datadog シグナルハンドラーが置き換えられていないことを確認します。

   1. `/var/log/datadog` フォルダにある `DD-DotNet-Profiler-Native-<Application Name>-<pid>` のログファイルを開きます。

   2. この 2 つのメッセージを探してみてください。
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. これらのメッセージの 1 つが存在する場合、アプリケーションコードまたはサードパーティコードが、Datadog シグナルハンドラーの上に自身のシグナルハンドラーを繰り返し再インストールしていることを意味します。これ以上の衝突を避けるため、CPU と Wall タイムプロファイラーを無効にしています。

   なお、`Profiler signal handler has been replaced. Restoring it.` というメッセージが表示されることがありますが、Datadog のプロファイリングには影響しません。これは、Datadog のシグナルハンドラーが上書きされたときに再インストールされることだけを示しています。

[1]: /profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{% tab "Windows" %}}

デフォルトのプロファイラーログディレクトリは `%ProgramData%\Datadog .NET Tracer\logs\` です。v2.24 以前は、デフォルトのディレクトリは `%ProgramData%\Datadog-APM\logs\DotNet` でした。

1. Agent がインストールされ、起動していること、および Windows サービスパネルに表示されていることを確認します。

2. ローダーログからプロファイラーが読み込まれたことを確認します。

   1. デフォルトのログフォルダから `dotnet-native-loader-<Application Name>-<pid>` のログファイルを開きます。

   2. 最後のほうにある `CorProfiler::Initialize: Continuous Profiler initialized successfully.` を探してください。`initialized successfully` メッセージがない場合、アプリケーションの環境変数 `DD_TRACE_DEBUG` を設定して、デバッグログを有効にしてください。

   3. アプリケーションを再起動します。

   4. デフォルトのログフォルダから `dotnet-native-loader-<Application Name>-<pid>` のログファイルを開きます。

   5. `#Profiler` エントリーを探してください。

   6. プロファイラーライブラリがロードされていることを確認するため、以下の行をチェックしてください。
      ```
      [...] #Profiler
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x64;.\Datadog.Profiler.Native.dll
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x86;.\Datadog.Profiler.Native.dll
      [...] DynamicDispatcherImpl::LoadConfiguration: [PROFILER] Loading: .\Datadog.Profiler.Native.dll [AbsolutePath=C:\Program Files\Datadog\.NET Tracer\win-x64\Datadog.Profiler.Native.dll]
      [...] [PROFILER] Creating a new DynamicInstance object
      [...] Load: C:\Program Files\Datadog\.NET Tracer\win-x64\Datadog.Profiler.Native.dll
      [...] GetFunction: DllGetClassObject
      [...] GetFunction: DllCanUnloadNow
      ```

3. プロファイルのエクスポート結果を確認します。

   1. ステップ 2.2 でデバッグログを有効にしなかった場合、アプリケーションの `DD_TRACE_DEBUG` 環境変数を `true` に設定し、アプリケーションを再起動します。

   2. デフォルトのログフォルダから、`DD-DotNet-Profiler-Native-<Application Name>-<pid>` のログファイルを開きます。

   3. `libddprof error: Failed to send profile.` エントリーを探します。このメッセージは、Agent にコンタクトできないことを意味します。`DD_TRACE_AGENT_URL` が正しい Agent の URL に設定されていることを確認します。詳細については、[.NET プロファイラーの有効化-構成][1]を参照してください。

   4. もし、`Failed to send profile` というメッセージがない場合は、`The profile was sent. Success?` というエントリーを探します。

      以下のメッセージは、プロファイルの送信に成功したことを意味します。
      ```
      true, Http code: 200
      ```

   5. API キーが無効な場合、403 などのエラーの可能性がありますので、他の HTTP コードを確認してください。

[1]: /profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{< /tabs >}}

正しくない場合は、[デバッグモード][1]をオンにして、デバッグファイルと以下の情報を添えて[サポートチケットの発行][2]を行います。
- オペレーティングシステムのタイプとバージョン (例: Windows Server 2019 または Ubuntu 20.04)。
- ランタイムのタイプとバージョン (例: .NET Framework 4.8 または .NET Core 6.0)。
- アプリケーションのタイプ (例: IIS で動作する Web アプリケーション)。


## プロファイラー使用時のオーバーヘッドを削減する

[異なるプロファイルタイプ][3]は、CPU とメモリのオーバーヘッドが固定されているため、*プロファイル化されたアプリケーションが多ければ多いほど、オーバーヘッドが大きくなります。*

### プロファイラーをマシン全体で有効にすることを避ける

Datadog では、マシンレベルで、またはすべての IIS アプリケーションプールでプロファイラーを有効にすることを推奨しません。プロファイラーが使用するリソース量を削減するためには、以下の方法があります。
- CPU コアを増やすなど、割り当てられたリソースを増やす。
- アプリケーションを直接実行するのではなく、バッチファイルに環境を設定することで、特定のアプリケーションだけをプロファイルする。
- プロファイルされる IIS プールの数を減らす (IIS 10 以降でのみ可能)。
- `DD_PROFILING_WALLTIME_ENABLED=0` の設定により、ウォールタイムプロファイリングを無効にする。

### Linux コンテナ

正確な値は変動する可能性がありますが、固定オーバーヘッドコストは、非常に小さなコンテナではプロファイラーの相対的なオーバーヘッドが大きくなる可能性があることを意味します。この状況を避けるため、プロファイラーは 1 コア未満のコンテナでは無効化されます。環境変数 `DD_PROFILING_MIN_CORES_THRESHOLD` に 1 より小さい値を設定することで、1 コアというしきい値をオーバーライドできます。 たとえば、`0.5` という値を設定すると、少なくとも 0.5 コアのあるコンテナでプロファイラーが実行されるようになります。
しかしその場合、プロファイラーのスレッドは常にアプリケーションのスレッドをスキャンするため、アイドル状態のサービスであっても CPU 消費量が増加します。利用可能なコアが少ないほど、CPU 消費量は増加します。

`DD_PROFILING_WALLTIME_ENABLED=0` の設定でウォールタイムプロファイラーを無効にすると、プロファイラーによる CPU 消費が減少します。それでも不十分な場合は、コンテナで使用できる CPU コアを増やしてください。

### プロファイラーを無効にする

APM のトレースも CLR プロファイリング API に依存しているため、.NET プロファイルの収集を停止し、.NET トレースの受信を継続したい場合は、以下の環境変数を設定してプロファイリングのみを無効にしてください。

```
 DD_PROFILING_ENABLED=0 
 CORECLR_ENABLE_PROFILING=1
```

## Linux 上のアプリケーションがハングアップしているため、CPU や Wall タイムがない

Linux でアプリケーションがハングアップするなどして無反応になり、CPU や Wall タイムサンプルが利用できなくなった場合は、以下の手順で対応します。

1. `/var/log/datadog/dotnet` フォルダにある `DD-DotNet-Profiler-Native-<Application Name>-<pid>` のログファイルを開きます。

2. `StackSamplerLoopManager::WatcherLoopIteration - Deadlock intervention still in progress for thread ...` を検索してください。このメッセージがない場合、残りは適用されません。

3. このメッセージが見つかった場合、スタックウォーキングメカニズムがデッドロックに陥っている可能性があることを意味します。この問題を調査するには、アプリケーション内のすべてのスレッドのコールスタックをダンプしてください。例えば、gdb デバッガーでこれを行うには

   1. gdb をインストールします。

   2. 次のコマンドを実行します。
      ```
      gdb -p <process id> -batch -ex "thread apply all bt full" -ex "detach" -ex "quit"
      ```

   3. 得られた出力を [Datadog サポート][2]に送信します。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: /profiler/profile_types/?code-lang=dotnet
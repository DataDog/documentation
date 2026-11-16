---
code_lang: dotnet
code_lang_weight: 60
further_reading:
- link: /tracing/troubleshooting
  tag: ドキュメント
  text: APM トラブルシューティング
title: .NET プロファイラーのトラブルシューティング
type: multi-code-lang
---
## プロファイル検索ページにプロファイルが表示されない {#missing-profiles-in-the-profile-search-page}

プロファイラーを構成してもプロファイル検索ページにプロファイルが表示されない場合、OS によって確認すべき点が異なりますので、以下にご紹介します。

{{< tabs >}}

{{% tab "Single Step APM インスツルメンテーションを使用する Linux" %}}

1. Agent がインストールされ、動作していることを確認します。

2. ローダーログからプロファイラーが読み込まれたことを確認します。

   1. `/var/log/datadog` フォルダーの `dotnet-native-loader-dotnet-<pid>` ログファイルを開きます。

   2. 末尾付近にある `CorProfiler::Initialize: Continuous Profiler initialized successfully.` を見つけます。このメッセージがない場合は、アプリケーションの `DD_TRACE_DEBUG` 環境変数を設定してデバッグログを有効にします。

   3. アプリケーションを再起動します。

   4. `/var/log/datadog` フォルダーの `dotnet-native-loader-dotnet-<pid>` ログファイルを開きます。

   5. `#Profiler` エントリを見つけます。

   6. プロファイラーライブラリがロードされていることを確認するため、以下の行をチェックします。
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

   2. `/var/log/datadog` フォルダーの `DD-DotNet-Profiler-Native-<Application Name>-<pid>` ログファイルを開きます。

   3. `libddprof error: Failed to send profile.` エントリを見つけます。このメッセージは、Agent に接続できないことを意味します。`DD_TRACE_AGENT_URL` が正しい Agent URL に設定されていることを確認します。詳細については、「[.NET プロファイラーコンフィギュレーションの有効化][4]」を参照してください。

   4. `Failed to send profile` メッセージがない場合は、`The profile was sent. Success?` エントリを探してください。

      以下のメッセージは、プロファイルの送信に成功したことを意味します。
      ```
      true, Http code: 200
      ```

   5. API キーが無効な場合、403 などのエラーの可能性がありますので、ほかの HTTP コードを確認してください。

4. CPU または Wall タイムのプロファイルが存在しない場合のみ、スタックウォーク用の Datadog シグナルハンドラーが置き換えられていないことをチェックしてください。

   1. `/var/log/datadog` フォルダーの `DD-DotNet-Profiler-Native-<Application Name>-<pid>` ログファイルを開きます。

   2. 次の 2 つのメッセージを探します。
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. これらのメッセージのいずれかが存在する場合、アプリケーションコードまたはサードパーティコードが、Datadog シグナルハンドラーの上に自身のシグナルハンドラーを繰り返し再インストールしていることを意味します。これ以上の衝突を避けるため、CPU と Wall タイムプロファイラーを無効にしています。

   なお、`Profiler signal handler has been replaced. Restoring it.` というメッセージが表示されることがありますが、Datadog のプロファイリングには影響しません。これは、Datadog のシグナルハンドラーが上書きされたときに再インストールされることだけを示しています。

5. 以下の環境変数が設定されていないことを確認します。
   - `CORECLR_ENABLE_PROFILING`
   - `CORECLR_PROFILER`
   - `CORECLR_PROFILER_PATH`
   - `LD_PRELOAD` の `Datadog.Linux.ApiWrapper.x64.so` を指している値
   
   これらの変数が設定されている場合は、スクリプトまたは Dockerfile から削除してください。そうしないと、以前に手動でインストールされたバージョンのプロファイラーが使用されます。

6. `DD_PROFILING_ENABLED` の値が `1` または `Auto` に設定されていることを確認します。`Auto` に設定されている場合、プロファイラーは以下の両方の条件が満たされている場合にのみ、プロファイルを生成します。
   - トレースが作成されている
   - アプリケーションが 30 秒以上実行された
別の値に設定されているか、まったく設定されていない場合、プロファイラーは無効になります。

[4]: /ja/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}
{{% tab "Linux" %}}

1. Agent がインストールされ、動作していることを確認します。

2. ローダーログからプロファイラーが読み込まれたことを確認します。

   1. `/var/log/datadog` フォルダーの `dotnet-native-loader-dotnet-<PID>` ログファイルを開きます。

   2. 末尾付近にある `CorProfiler::Initialize: Continuous Profiler initialized successfully.` を見つけます。このメッセージがない場合は、アプリケーションの `DD_TRACE_DEBUG` 環境変数を設定してデバッグログを有効にします。

   3. アプリケーションを再起動します。

   4. `/var/log/datadog` フォルダーの `dotnet-native-loader-dotnet-<pid>` ログファイルを開きます。

   5. `#Profiler` エントリを見つけます。

   6. プロファイラーライブラリがロードされていることを確認するため、以下の行をチェックします。
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

3. `DD_PROFILING_ENABLED` の値が `1` に設定されていることを確認します。設定されていない場合や別の値が設定されている場合は、プロファイラーは無効になります。

4. プロファイルのエクスポート結果を確認します。

   1. ステップ 2.b でデバッグログを有効にしなかった場合、アプリケーションの `DD_TRACE_DEBUG` 環境変数を `true` に設定し、アプリケーションを再起動します。

   2. `/var/log/datadog` フォルダーの `DD-DotNet-Profiler-Native-<Application Name>-<pid>` ログファイルを開きます。

   3. `libddprof error: Failed to send profile.` エントリを見つけます。このメッセージは、Agent に接続できないことを意味します。`DD_TRACE_AGENT_URL` が正しい Agent URL に設定されていることを確認します。詳細については、「[.NET プロファイラーコンフィギュレーションの有効化][4]」を参照してください。

   4. `Failed to send profile` メッセージがない場合は、`The profile was sent. Success?` エントリを探してください。

      以下のメッセージは、プロファイルの送信に成功したことを意味します。
      ```
      true, Http code: 200
      ```

   5. API キーが無効な場合、403 などのエラーの可能性がありますので、ほかの HTTP コードを確認してください。

5. CPU または Wall タイムのプロファイルが存在しない場合のみ、スタックウォーク用の Datadog シグナルハンドラーが置き換えられていないことをチェックしてください。

   1. `/var/log/datadog` フォルダーの `DD-DotNet-Profiler-Native-<Application Name>-<pid>` ログファイルを開きます。

   2. 次の 2 つのメッセージを探します。
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. これらのメッセージのいずれかが存在する場合、アプリケーションコードまたはサードパーティコードが、Datadog シグナルハンドラーの上に自身のシグナルハンドラーを繰り返し再インストールしていることを意味します。これ以上の衝突を避けるため、CPU と Wall タイムプロファイラーを無効にしています。

   なお、`Profiler signal handler has been replaced. Restoring it.` というメッセージが表示されることがありますが、Datadog のプロファイリングには影響しません。これは、Datadog のシグナルハンドラーが上書きされたときに再インストールされることだけを示しています。

[4]: /ja/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{% tab "Windows" %}}

デフォルトのプロファイラーログディレクトリは `%ProgramData%\Datadog .NET Tracer\logs\` です。v2.24 より前のデフォルトディレクトリは `%ProgramData%\Datadog-APM\logs\DotNet` でした。

1. Agent がインストールされ、起動していること、および Windows サービスパネルに表示されていることを確認します。

2. ローダーログからプロファイラーが読み込まれたことを確認します。

   1. デフォルトのログフォルダーから `dotnet-native-loader-<Application Name>-<pid>` ログファイルを開きます。

   2. 末尾付近にある `CorProfiler::Initialize: Continuous Profiler initialized successfully.` を見つけます。`initialized successfully` メッセージがない場合は、アプリケーションの `DD_TRACE_DEBUG` 環境変数を設定してデバッグログを有効にします。

   3. アプリケーションを再起動します。

   4. デフォルトのログフォルダーから `dotnet-native-loader-<Application Name>-<pid>` ログファイルを開きます。

   5. `#Profiler` エントリを見つけます。

   6. プロファイラーライブラリがロードされていることを確認するため、以下の行をチェックします。
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

3. `DD_PROFILING_ENABLED` の値が `1` に設定されていることを確認します。設定されていない場合や別の値が設定されている場合は、プロファイラーは無効になります。

4. プロファイルのエクスポート結果を確認します。

   1. ステップ 2.b でデバッグログを有効にしなかった場合、アプリケーションの `DD_TRACE_DEBUG` 環境変数を `true` に設定し、アプリケーションを再起動します。

   2. デフォルトのログフォルダーから `DD-DotNet-Profiler-Native-<Application Name>-<pid>` ログファイルを開きます。

   3. `libddprof error: Failed to send profile.` エントリを見つけます。このメッセージは、Agent に接続できないことを意味します。`DD_TRACE_AGENT_URL` が正しい Agent URL に設定されていることを確認します。詳細については、「[.NET プロファイラーコンフィギュレーションの有効化][5]」を参照してください。

   4. `Failed to send profile` メッセージがない場合は、`The profile was sent. Success?` エントリを探してください。

      以下のメッセージは、プロファイルの送信に成功したことを意味します。
      ```
      true, Http code: 200
      ```

   5. API キーが無効な場合、403 などのエラーの可能性がありますので、ほかの HTTP コードを確認してください。

[5]: /ja/profiler/enabling/dotnet/#configuration

{{% /tab %}}

{{< /tabs >}}

正しくない場合は、[デバッグモード][1]をオンにして、デバッグファイルと以下の情報を添えて[サポートチケットの発行][2]を行います。
- オペレーティングシステムのタイプとバージョン (例: Windows Server 2019 または Ubuntu 20.04)。
- ランタイムのタイプとバージョン (例: .NET Framework 4.8 または .NET Core 6.0)。
- アプリケーションのタイプ (例: IIS で動作する Web アプリケーション)。


## プロファイラー使用時のオーバーヘッドを削減する {#reduce-overhead-when-using-the-profiler}

### プロファイラーをマシン全体で有効にすることを避ける {#avoid-enabling-the-profiler-machine-wide}

[異なるプロファイルタイプ][3]では、アプリケーションごとに固定の CPU とメモリオーバーヘッドがあります。ホスト上のすべてのプロセスをプロファイルすると、総リソース使用量が増加します。すべてのプラットフォームでオーバーヘッドを削減するには、リソースの割り当て (CPU コアなど) を増やすか、`DD_PROFILING_WALLTIME_ENABLED=0` を設定します。

{{< tabs >}}

{{% tab "Single Step APM インスツルメンテーションを使用する Linux" %}}

複数のプロセスをプロファイルする際のオーバーヘッドを削減するには、次のようにします。

- ホスト全体でプロファイルを有効にする場合は、`true` の代わりに `DD_PROFILING_ENABLED=auto` を使用します。`auto` を使用すると、アプリケーションが 30 秒以上実行され、**さらに**少なくとも 1 つのトレースが作成された場合にのみプロファイリングが開始されます。
- [インスツルメンテーションルール][6]を使用して、SSI を受け取るプロセスを制限します。
- 特定のプロセス環境で `DD_PROFILING_ENABLED=false` を設定すると、そのプロセスをプロファイル対象外にすることができます。トレースは影響を受けません。

[6]: /ja/tracing/trace_collection/single-step-apm/linux/#define-instrumentation-rules

{{% /tab %}}
{{% tab "Linux" %}}

複数のプロセスをプロファイルする際のオーバーヘッドを削減するには、次のようにします。

- プロファイラーの環境変数は、プロファイル対象のアプリケーションのスタートアップスクリプトまたは systemd ユニット内でのみ設定します。`/etc/environment` や `systemctl set-environment` などの共有ホスト構成には設定しません。
- Docker では、特定のアプリケーションのコンテナ定義 (Dockerfile または compose ファイル) でプロファイラー変数を設定します。関連のないサービスにプロファイラー変数をエクスポートする、全社共通のベースイメージやシェルプロファイルの使用は避けてください。

{{% /tab %}}
{{% tab "Windows" %}}

複数のプロセスをプロファイルする際のオーバーヘッドを削減するには、次のようにします。

- マシンレベルではなくバッチファイルで環境変数を設定することにより、特定のアプリケーションのみをプロファイルします。
- プロファイルされる IIS プールの数を減らす (IIS 10 以降でのみ可能)。

{{% /tab %}}

{{< /tabs >}}

### Linux コンテナ {#linux-containers}

正確な値は変動する可能性がありますが、固定のオーバーヘッドコストがあるため、小さなコンテナではプロファイラーの相対的なオーバーヘッドが非常に大きくなる可能性があります。この状況を回避するため、1 コア未満のコンテナではプロファイラーが無効になります。`DD_PROFILING_MIN_CORES_THRESHOLD` 環境変数を 1 未満の値に設定することで、1 コアのしきい値をオーバーライドできます。たとえば、`0.5` という値を設定すると、少なくとも 0.5 コアを持つコンテナ内でプロファイラーを実行できるようになります。ただしその場合、プロファイラーのスレッドが常にアプリケーションのスレッドをスキャンするため、アイドル状態のサービスであっても CPU 消費量が増加します。利用可能なコアが少ないほど、CPU 消費量は増加します。

`DD_PROFILING_WALLTIME_ENABLED=0` を設定してウォールタイムプロファイラーを無効にすると、プロファイラーによる CPU 消費量が減少します。これでも不十分な場合は、コンテナで使用可能な CPU コアを増やしてください。

### プロファイラーを無効にする {#disabling-the-profiler}

APM のトレースも CLR プロファイリング API に依存しているため、.NET プロファイルの収集を停止し、.NET トレースの受信を継続したい場合は、以下の環境変数を設定してプロファイリングのみを無効にしてください。

```
 DD_PROFILING_ENABLED=0 
 CORECLR_ENABLE_PROFILING=1
```

## Linux 上のアプリケーションがハングアップしているため、CPU や Wall タイムがない{#no-cpu-or-wall-time-because-the-application-on-linux-is-hung}

Linux でアプリケーションがハングアップするなどして無反応になり、CPU や Wall タイムサンプルが利用できなくなった場合は、以下の手順で対応します。

1. `/var/log/datadog/dotnet` フォルダーの `DD-DotNet-Profiler-Native-<Application Name>-<pid>` ログファイルを開きます。

2. `StackSamplerLoopManager::WatcherLoopIteration - Deadlock intervention still in progress for thread ...` を見つけます。このメッセージがない場合は、これ以降の手順は不要です。

3. このメッセージが見つかった場合は、スタックウォーキングメカニズムがデッドロックに陥っている可能性があることを意味します。この問題を調査するには、アプリケーション内のすべてのスレッドのコールスタックをダンプしてください。たとえば、gdb デバッガーでこれを行うには、次のようにします。

   1. gdb をインストールします。

   2. 次のコマンドを実行します。
      ```
      gdb -p <process id> -batch -ex "thread apply all bt full" -ex "detach" -ex "quit"
      ```

   3. 得られた出力を [Datadog サポート][2]に送信します。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/troubleshooting/#debugging-and-logging
[2]: /ja/help/
[3]: /ja/profiler/profile_types/?code-lang=dotnet
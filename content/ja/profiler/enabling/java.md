---
aliases:
- /ja/tracing/profiler/enabling/java/
code_lang: java
code_lang_weight: 10
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: profiler/profile_visualizations
  tag: ドキュメント
  text: 使用可能なプロファイルの視覚化の詳細
- link: profiler/profiler_troubleshooting/java
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
title: Java プロファイラーの有効化
type: multi-code-lang
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

## 要件

dd-trace-java バージョン 1.0.0 では、Java アプリケーションの CPU プロファイルデータを生成するエンジンとして、2 つのオプションがあります。[Java Flight Recorder (JFR)][2] または Datadog Profiler です。バージョン 1.7.0 以降では、Datadog プロファイラーがデフォルトとなっています。それぞれのプロファイラーエンジンには、異なる副作用、要件、利用可能な構成、および制限があり、このページでは、それぞれについて説明します。どちらか一方、または両方のエンジンを有効にすることができます。両方を有効にすると、両方のプロファイルタイプが同時にキャプチャされます。

{{< tabs >}}
{{% tab "Datadog Profiler" %}}

JDK の最小バージョン:

- OpenJDK 8u352+、11.0.17+、17.0.5+ (その上に構築された Amazon Corretto、Azul Zulu その他のビルドを含む)
- Oracle JDK 8u352+、11.0.17+、17.0.5+
- OpenJ9 JDK 8u372+、11.0.18+、17.0.6+

Datadog Profiler は JVMTI の `AsyncGetCallTrace` 関数を使用しており、JDK リリース 17.0.5 以前ではこの関数に[既知の問題][1]が存在しました。この修正は 11.0.17 と 8u352 にバックポートされています。プロファイラーがデプロイされる JVM にこの修正がない限り、Datadog Profiler は有効ではありません。Datadog Profiler を使用するには、少なくとも 8u352、11.0.17、17.0.5、または最新の非 LTS JVM バージョンにアップグレードしてください。

[1]: https://bugs.openjdk.org/browse/JDK-8283849
{{% /tab %}}

{{% tab "JFR" %}}

JDK の最小バージョン:
- OpenJDK 11+
- Oracle JDK 11+
- [OpenJDK 8 (バージョン 1.8.0.262/8u262+)][3]
- Azul Zulu 8 (バージョン 1.8.0.212/8u212+)。

OpenJ9 では、JFR はサポートされていません。

**注**: Java Flight Recorder for OracleJDK を有効にするには、Oracle からの商用ライセンスが必要な場合があります。これがライセンスの一部であるかどうかを確認するには、Oracle の担当者にお問い合わせください。

LTS 以外の JDK バージョンには、Datadog Profiler ライブラリに関連する安定性とパフォーマンスの修正が含まれていない可能性があるため、Long Term Support JDK のバージョン8、11、17 を使用してください。

[Code Hotspots][11] のプロファイリングに関する追加要件:
 - OpenJDK 11+ および `dd-trace-java` バージョン 0.65.0+、または
 - OpenJDK 8 8u282+ および `dd-trace-java` バージョン 0.77.0+。

[3]: /ja/profiler/profiler_troubleshooting/#java-8-support
[11]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{< /tabs >}}

Java、Scala、Groovy、Kotlin、Clojure など、すべての JVM ベースの言語をサポートしています。

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

## インストール

アプリケーションのプロファイリングを開始するには

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][4] 以降または [6.20.2][5] 以降にアップグレードしてください。まだ APM を有効にしていない場合で Datadog にデータを送信するようにアプリケーションを設定するには、ご利用中の Agent で `DD_APM_ENABLED` 環境変数を `true` に設定し、ポート `8126/TCP` をリッスンします。

2. Java Agent クラスファイルを含む `dd-java-agent.jar` をダウンロードします。

    ```shell
    wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
    ```

   **注**: Profiler は、0.55 以降のバージョンの `dd-java-agent.jar` ライブラリで利用できます。

3. `Ddd.profiling.enabled` フラグまたは `DD_PROFILING_ENABLED` 環境変数を `true` に設定し、プロファイラーを有効にします。`dd.service`、`dd.env`、`dd.version` を指定して、プロファイルをこれらの次元でフィルタリングしたりグループ化したりできるようにします。
   {{< tabs >}}
{{% tab "コマンド引数" %}}

サービスを呼び出します。
```diff
java \
    -javaagent:dd-java-agent.jar \
    -Ddd.service=<YOUR_SERVICE> \
    -Ddd.env=<YOUR_ENVIRONMENT> \
    -Ddd.version=<YOUR_VERSION> \
    -Ddd.profiling.enabled=true \
    -XX:FlightRecorderOptions=stackdepth=256 \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{% tab "環境変数" %}}

```diff
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_PROFILING_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -XX:FlightRecorderOptions=stackdepth=256 \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{< /tabs >}}

    **注**: `javaagent` 引数は `-jar` の前に置く必要があり、アプリケーションの引数ではなく、JVM のオプションとして追加されます。詳細については、[Oracleドキュメント][6]を参照してください。

    ```shell
    # 良い:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # 悪い:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

4. 1〜2 分後、[Datadog APM > Profiling ページ][7]でプロファイルを視覚化することができます。

### CPU プロファイラーエンジンオプションの有効化

dd-trace-java バージョン 1.5.0 以降、使用する CPU プロファイラーに Datadog と Java Flight Recorder (JFR) の 2 つのオプションがあります。バージョン 1.7.0 以降では、Datadog がデフォルトですが、オプションで CPU プロファイリングに対して JFR を有効にすることもできます。どちらか一方、または両方のエンジンを有効にすることができます。両方を有効にすると、両方のプロファイルタイプが同時にキャプチャされます。

Datadog Profiler は、すべてのサンプルでアクティブスパンを記録し、コードホットスポットおよびエンドポイントプロファイリング機能の忠実度を向上させることができます。このエンジンを有効にすることで、APM トレースとのインテグレーションをより良くすることができます。

Datadog Profiler は、CPU、ウォールクロック、アロケーション、メモリリークプロファイラーなど、複数のプロファイリングエンジンで構成されています。


{{< tabs >}}
{{% tab "Datadog Profiler" %}}

dd-trace-java バージョン 1.7.0+ では、Datadog Profiler がデフォルトで有効になっています。Datadog CPU プロファイリングは perf イベントを通してスケジュールされ、JFR CPU プロファイリングよりも正確です。CPU プロファイリングを有効にするには

```
export DD_PROFILING_DDPROF_ENABLED=true # これは v1.7.0+ のデフォルトです
export DD_PROFILING_DDPROF_CPU_ENABLED=true
```

または

```
-Ddd.profiling.ddprof.enabled=true # これは v1.7.0+ のデフォルトです
-Ddd.profiling.ddprof.cpu.enabled=true
```

JDK Mission Control (JMC) ユーザーにとって、Datadog の CPU サンプルイベントは `datadog.ExecutionSample` となります。

#### Linux の設定

CPU エンジンはほとんどのシステムで動作しますが、 `/proc/sys/kernel/perf_event_paranoid` の値が `3` に設定されていると、プロファイラーは CPU サンプリングのスケジューリングに perf イベントを使用することができません。この結果、プロファイルの品質が低下し、`itimer` を使用するようになります。以下のコマンドで `/proc/sys/kernel/perf_event_paranoid` を `2` 以下に設定してください。

```
sudo sh -c 'echo 2 >/proc/sys/kernel/perf_event_paranoid'
```

{{% /tab %}}

{{% tab "JFR" %}}

バージョン 1.7.0 以降では、デフォルトの Datadog から JFR の CPU プロファイリングに切り替えるには

```
export DD_PROFILING_DDPROF_CPU_ENABLED=false
```
または
```
-Ddd.profiling.ddprof.cpu.enabled=false
```
JDK Mission Control (JMC) ユーザーにとって、JFR の CPU サンプルイベントは `jdk.ExecutionSample` となります。

{{% /tab %}}
{{< /tabs >}}


### Datadog Profiler ウォールクロックエンジン

ウォールクロックプロファイリングエンジンは、レイテンシーのプロファイリングに有効で、APM トレースと緊密にインテグレーションされています。このエンジンは、アクティブなトレースアクティビティを持つ、オンまたはオフ CPU のすべてのスレッドをサンプリングし、トレースまたはスパンレイテンシーの診断に使用することができます。このエンジンは 1.7.0 以降、デフォルトで有効になっています。

または

```
-Ddd.profiling.ddprof.enabled=true # これは v1.7.0+ のデフォルトです
-Ddd.profiling.ddprof.wall.enabled=true
```

バージョン 1.7.0 以降では、ウォールクロックプロファイラーを無効にするには

```
export DD_PROFILING_DDPROF_WALL_ENABLED=false
```
または
```
-Ddd.profiling.ddprof.wall.enabled=false
```

JMC ユーザーの場合、ウォールクロックのサンプルに対して `datadog.MethodSample` イベントが発行されます。

ウォールクロックエンジンは `/proc/sys/kernel/perf_event_paranoid` の設定に依存しません。

### Datadog Profiler アロケーションエンジン

Datadog のアロケーションプロファイリングエンジンは、アロケーションプロファイルをコンテキスト化し、エンドポイントでフィルターされたアロケーションプロファイルをサポートします。
v1.17.0 よりも前の dd-java-agent ではデフォルトで無効になっていますが、次のようにして有効にすることができます。

```
export DD_PROFILING_DDPROF_ENABLED=true # これは v1.7.0+ のデフォルトです
export DD_PROFILING_DDPROF_ALLOC_ENABLED=true # これは v1.17.0+ のデフォルトです
```

または

```
-Ddd.profiling.ddprof.enabled=true # これは v1.7.0+ のデフォルトです
-Ddd.profiling.ddprof.alloc.enabled=true # これは v1.17.0+ のデフォルトです
```

JMC ユーザーの場合、Datadog アロケーションイベントは `datadog.ObjectAllocationInNewTLAB` と `datadog.ObjectAllocationOutsideTLAB` になります。

アロケーションプロファイラーエンジンは `/proc/sys/kernel/perf_event_paranoid` の設定に依存しません。

### ライブヒーププロファイラーエンジン

_v1.17.0 以降_

ライブヒーププロファイラーエンジンは、サービスの全体的なメモリ使用量を調査し、潜在的なメモリリークを特定する際に役立ちます。
このエンジンはアロケーションのサンプリングを行い、それらのサンプルが直近のガベージコレクションサイクルで生存したかどうかを追跡します。生存したサンプルの数は、ヒープ内のライブオブジェクト数の推定に用いられます。
追跡対象とするサンプル数は、プロファイラーのメモリ使用量が際限なく増えてしまわないように制限されます。

このエンジンはデフォルトで無効になっていますが、次の方法で有効にできます。

```
export DD_PROFILING_DDPROF_LIVEHEAP_ENABLED=true
```

または

```
-Ddd.profiling.ddprof.liveheap.enabled=true
```

JMC ユーザーの場合、Datadog のライブヒープイベントは `datadog.HeapLiveObject` になります。

アロケーションエンジンは `/proc/sys/kernel/perf_event_paranoid` の設定に依存しません。

### ネイティブスタックトレースの収集

Datadog Profiler CPU またはウォールクロックエンジンが有効になっている場合、ネイティブスタックトレースを収集することができます。ネイティブスタックトレースには、JVM 内部、アプリケーションや JVM で使用されるネイティブライブラリ、およびシステムコールなどが含まれます。

<div class="alert alert-warning">ネイティブスタックトレースはデフォルトで収集されません。これは、通常、アクションにつながる洞察が得られず、ネイティブスタックを操作するとアプリケーションの安定性に影響を与える可能性があるためです。この設定は、実運用環境で使用する前に、非実運用環境でテストしてください。</a></div>

ネイティブのスタックトレース収集を有効にするには、アプリケーションを不安定にする可能性があることを理解した上で、以下を設定します。

```
export DD_PROFILING_DDPROF_ENABLED=true # これは v1.7.0+ のデフォルトです
export DD_PROFILING_DDPROF_CSTACK=dwarf
```

または

```
-Ddd.profiling.ddprof.enabled=true # これは v1.7.0+ のデフォルトです
-Ddd.profiling.ddprof.cstack=dwarf
```



## 構成

次の環境変数を使用してプロファイラーを構成できます。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | `-Ddd.profiling.enabled` 引数の代替。`true` に設定してプロファイラーを有効にします。               |
| `DD_PROFILING_ALLOCATION_ENABLED`                | Boolean       | `-Ddd.profiling.allocation.enabled` 引数の代わりになります。割り当てプロファイラーを有効にするには、`true` に設定します。プロファイラーがすでに有効になっている必要があります。 |
| `DD_ENV`                                         | 文字列        | [環境][9]名 (例: `production`)。 |
| `DD_SERVICE`                                     | 文字列        | [サービス][9]名 (例: `web-backend`)。 |
| `DD_VERSION`                                     | 文字列        | サービスの[バージョン][9]。 |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、カンマ区切り形式のリストである必要があります（例、`layer:api, team:intake`）。  |

## 次のステップ

[プロファイラーの概要][10]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[3]: /ja/profiler/profiler_troubleshooting/#java-8-support
[4]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[5]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: https://app.datadoghq.com/profiling
[8]: /ja/profiler/profiler_troubleshooting/#enabling-the-allocation-profiler
[9]: /ja/getting_started/tagging/unified_service_tagging
[10]: /ja/getting_started/profiler/
[11]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
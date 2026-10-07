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

すべての言語におけるランタイムとトレーサーの最小バージョンと推奨バージョンの要約については、[サポートされている言語とトレーサーのバージョン][13]をお読みください。

dd-trace-java 1.0.0 では、Java アプリケーションの CPU プロファイルデータを生成するエンジンとして、2 つのオプションがあります。[Java Flight Recorder (JFR)][2] または Datadog Profiler です。dd-trace-java 1.7.0 では、Datadog プロファイラーがデフォルトとなっています。それぞれのプロファイラーエンジンには、異なる副作用、要件、利用可能な構成、および制限があり、このページでは、それぞれについて説明します。どちらか一方、または両方のエンジンを有効にすることができます。両方を有効にすると、両方のプロファイルタイプが同時にキャプチャされます。

{{< tabs >}}
{{% tab "Datadog Profiler" %}}

対応 OS:
- Linux

JDK の最小バージョン:
- OpenJDK 8u352+、11.0.17+、17.0.5+ (その上に構築された Amazon Corretto、Azul Zulu その他のビルドを含む)
- Oracle JDK 8u351+、11.0.17+、17.0.5+
- OpenJ9 JDK 8u372+、11.0.18+、17.0.6+ (Eclipse OpenJ9、IBM JDK、IBM Semeru Runtime で使用)。プロファイラーは、JVTMI の実装における細かな不具合により JVM がクラッシュする可能性があるため、OpenJ9 ではデフォルトで無効になっています。クラッシュが発生していない場合、`-Ddd.profiling.ddprof.enabled=true` を追加することでプロファイラーを有効にできます。
- Azul Platform Prime 23.05.0.0+ (旧 Azul Zing)

Datadog Profiler は JVMTI の `AsyncGetCallTrace` 関数を使用しており、JDK リリース 17.0.5 以前ではこの関数に[既知の問題][1]が存在しました。この修正は 11.0.17 と 8u352 にバックポートされています。プロファイラーがデプロイされる JVM にこの修正がない限り、Datadog Profiler は有効ではありません。Datadog Profiler を使用するには、少なくとも 8u352、11.0.17、17.0.5、または最新の非 LTS JVM バージョンにアップグレードしてください。

[1]: https://bugs.openjdk.org/browse/JDK-8283849
{{% /tab %}}

{{% tab "JFR" %}}

対応 OS:
- Linux
- Windows

JDK の最小バージョン:
- OpenJDK [1.8.0.262/8u262+][3]、11+ (その上に構築された Amazon Corretto、その他のビルドを含む)
- Oracle JDK 11+ (JFR を有効にするには、Oracle の商用ライセンスが必要な場合があります。これがライセンスの一部であるかどうかを確認するには、Oracle の担当者にお問い合わせください)
- Azul Zulu 8 (バージョン 1.8.0.212/8u212+)、11+
- GraalVM 17+ — JIT と AOT (ネイティブイメージ) バージョンの両方

LTS 以外の JDK バージョンには、Datadog Profiler ライブラリに関連する安定性とパフォーマンスの修正が含まれていない可能性があるため、Long Term Support JDK のバージョン8、11、17 を使用してください。

[Code Hotspots][12] のプロファイリングに関する追加要件:
 - OpenJDK 11+ および `dd-trace-java` バージョン 0.65.0+
 - OpenJDK 8 8u282+ および `dd-trace-java` バージョン 0.77.0+

[3]: /ja/profiler/profiler_troubleshooting/java/#java-8-support
[12]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{< /tabs >}}

Java、Scala、Groovy、Kotlin、Clojure など、すべての JVM ベースの言語をサポートしています。

Continuous Profiler は、AWS Lambda など一部のサーバーレスプラットフォームではサポートされていません。

## インストール

アプリケーションのプロファイリングを開始するには

1. Datadog Agent v6+ がインストールされ、実行中であることを確認してください。Datadog は [Datadog Agent v7+][4] の使用を推奨します。Datadog にデータを送信するための設定がまだ行われておらず APM が有効になっていない場合は、Agent で `DD_APM_ENABLED` 環境変数を `true` に設定し、ポート `8126/TCP` をリッスンするようにしてください。

2. Java Agent クラスファイルを含む `dd-java-agent.jar` をダウンロードします。

   {{< tabs >}}
   {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {{% /tab %}}
   {{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {{% /tab %}}
   {{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
   {{% /tab %}}
   {{< /tabs >}}

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
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="(オプション) Graal ネイティブイメージの構築と実行" level="h4" %}}

[Tracer Setup Instructions][14] に従って、Datadog Java Profiler を使用した Graal ネイティブイメージをビルドしてください。

サービスのバイナリがビルドされたら、環境変数を使用して Datadog Java Profiler を 有効化および構成できます。

   ```shell
   DD_PROFILING_ENABLED=true DD_PROFILING_DIRECTALLOCATION_ENABLED=true ./my_service
   ```

**注**: GraalVM ネイティブイメージアプリケーションでは、JFR ベースのプロファイリングのみがサポートされています。<code>DDPROF</code> 関連の構成オプションはすべて無効です。
{{% /collapse-content %}}

**注**: `-javaagent` 引数は `-jar` の前に指定する必要があります。これは、アプリケーションの引数ではなく、JVM オプションとして追加されます。例えば、`java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags` とします。詳細については、[Oracle のドキュメント][6]を参照してください。

4. オプション: プロファイリングデータを Git リポジトリと接続するために、[ソースコードインテグレーション][7]を設定します。

5. 1〜2 分後には、[Datadog APM > Profiling ページ][8]でプロファイルを確認できます。

### CPU プロファイラーエンジンオプションの有効化

dd-trace-java バージョン 1.5.0 以降、使用する CPU プロファイラーに Datadog と Java Flight Recorder (JFR) の 2 つのオプションがあります。バージョン 1.7.0 以降では、Datadog がデフォルトですが、オプションで CPU プロファイリングに対して JFR を有効にすることもできます。どちらか一方、または両方のエンジンを有効にすることができます。両方を有効にすると、両方のプロファイルタイプが同時にキャプチャされます。

Datadog Profiler は、すべてのサンプルでアクティブスパンを記録し、コードホットスポットおよびエンドポイントプロファイリング機能の忠実度を向上させることができます。このエンジンを有効にすることで、APM トレースとのインテグレーションをより良くすることができます。

Datadog Profiler は、CPU、ウォールクロック、アロケーション、メモリリークプロファイラーなど、複数のプロファイリングエンジンで構成されています。


{{< tabs >}}
{{% tab "Datadog Profiler" %}}
_JDK 11+ が必要です。_

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

### プロファイラーのアロケーションエンジン

{{< tabs >}}
{{% tab "JFR" %}}
JDK 16 以降、JFR ベースのアロケーションプロファイリングエンジンはデフォルトで有効になっています。
JDK 8 と 11 でデフォルトで有効になっていない理由は、アロケーション集約型のアプリケーションが高いオーバーヘッドと大きな記録サイズを引き起こす可能性があるためです。
JDK 8 と 11 でこれを有効にするには、以下を追加してください。

```
export DD_PROFILING_ENABLED_EVENTS=jdk.ObjectAllocationInNewTLAB,jdk.ObjectAllocationOutsideTLAB
```

または

```
-Ddd.profiling.enabled.events=jdk.ObjectAllocationInNewTLAB,jdk.ObjectAllocationOutsideTLAB
```
{{% /tab %}}

{{% tab "Datadog Profiler" %}}

Datadog のアロケーションプロファイリングエンジンは、エンドポイントでフィルタリングされたアロケーションプロファイルをサポートし、アロケーションプロファイルに文脈を与えます。
dd-java-agent v1.28.0 より前では、デフォルトで**無効**になっています。アロケーションプロファイラーは JVMTI API に依存しており、OpenJDK 21.0.3 より前ではクラッシュする可能性があるため、古い JDK バージョンでは無効化されています。有効にするには、以下を使用してください。

```
export DD_PROFILING_DDPROF_ENABLED=true # これは v1.7.0+ のデフォルト
export DD_PROFILING_DDPROF_ALLOC_ENABLED=true # これは OpenJDK 21.0.3+ の v1.28.0+ のデフォルト
```

または

```
-Ddd.profiling.ddprof.enabled=true # これは v1.7.0+ のデフォルトです
-Ddd.profiling.ddprof.alloc.enabled=true # これは v1.17.0+ のデフォルトです
```

JMC ユーザーの場合、Datadog アロケーションイベントは `datadog.ObjectAllocationInNewTLAB` と `datadog.ObjectAllocationOutsideTLAB` になります。

アロケーションプロファイラーエンジンは `/proc/sys/kernel/perf_event_paranoid` の設定に依存しません。
{{% /tab %}}

{{< /tabs >}}

### ライブヒーププロファイラーエンジン

_v1.39.0 以降。JDK 11.0.23+、17.0.11+、21.0.3+、または 22+ が必要です。_

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

<div class="alert alert-danger">ネイティブスタックトレースはデフォルトで収集されません。これは、通常、アクションにつながる洞察が得られず、ネイティブスタックを操作するとアプリケーションの安定性に影響を与える可能性があるためです。この設定は、実運用環境で使用する前に、非実運用環境でテストしてください。</a></div>

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
| `DD_ENV`                                         | 文字列        | [環境][10]名 (例: `production`)。 |
| `DD_SERVICE`                                     | 文字列        | [サービス][10]名 (例: `web-backend`)。 |
| `DD_VERSION`                                     | 文字列        | サービスの[バージョン][10]。 |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、カンマ区切り形式のリストである必要があります（例、`layer:api, team:intake`）。  |

## 次のステップ

[プロファイラーの概要][11]ガイドでは、パフォーマンス問題を抱えるサンプルサービスを用いて、Continuous Profiler を使用して問題を理解し、修正する方法を説明します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[3]: /ja/profiler/profiler_troubleshooting/#java-8-support
[4]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[5]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: /ja/integrations/guide/source-code-integration/?tab=java
[8]: https://app.datadoghq.com/profiling
[9]: /ja/profiler/profiler_troubleshooting/#enabling-the-allocation-profiler
[10]: /ja/getting_started/tagging/unified_service_tagging
[11]: /ja/getting_started/profiler/
[12]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /ja/profiler/enabling/supported_versions/
[14]: /ja/tracing/trace_collection/compatibility/java/?tab=graalvm#setup
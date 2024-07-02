---
title: Profile Types
further_reading:
    - link: profiler/enabling
      tag: Documentation
      text: Enable continuous profiler for your application
    - link: getting_started/profiler
      tag: Documentation
      text: Getting Started with Profiler
    - link: "https://www.datadoghq.com/blog/introducing-datadog-profiling/"
      tag: ブログ
      text: Introducing always-on production profiling in Datadog
---


**Profiles** タブでは、特定の言語で使用できるすべてのプロファイルタイプを確認できます。言語とバージョンによって、プロファイルについて収集される情報は異なります。

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,ddprof" >}}
{{< programming-lang lang="java" >}}

プロファイリングを有効にすると、[サポートされている Java バージョン][1]について、以下のプロファイルタイプが収集されます。


CPU
: 各メソッドが CPU での実行に費やした時間。これには JVM（Java、Kotlin など）で実行されるコードが含まれますが、JVM オペレーションや JVM 内から呼び出されるネイティブコードは含まれません。

Allocations
: The number of heap allocations made by each method, including allocations which were subsequently freed.<br />
_Requires: Java 11_ 

Allocated Memory
: The amount of heap memory allocated by each method, including allocations which were subsequently freed.<br />
_Requires: Java 11_ 

Heap Live Objects
: 各メソッドがヒープメモリに割り当てたオブジェクトのうち、まだガベージコレクションとして処理されていないオブジェクトの数。これは、サービスの全体的なメモリ使用量を調査し、潜在的なメモリリークを特定する際に役立ちます。<br />
_必要なもの: Java 11_ <br />
_最低バージョン: 1.17.0_

Heap Live Size
: 各メソッドによって割り当てられたヒープメモリのうち、まだガベージコレクションとして処理されていないメモリの量。これは、サービスの全体的なメモリ使用量を調査し、潜在的なメモリリークを特定する際に役立ちます。<br />
_必要なもの: Java 11_<br />
_最低バージョン: 1.17.0_

Wall Time in Native Code
: ネイティブコードで費やされた経過時間。経過時間には、コードが CPU で実行されている時間、I/O を待機している時間、およびメソッドの実行中に発生するその他の時間が含まれます。このプロファイルには、通常ほとんどのアプリケーションコードである JVM バイトコードの実行に費やされた時間は含まれていません。

Class Load
: 各メソッドによってロードされたクラスの数。

Thrown Exceptions
: 各メソッドによってスローされたエラーと例外の数、およびその種類。

File I/O
: 各メソッドがファイルの読み取りと書き込みに費やした時間。

Lock
: 各メソッドがロックの待機に費やした時間。

Socket I/O
: 各メソッドがソケット I/O の読み取りと書き込みに費やした時間。

[1]: /profiler/enabling/java/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

プロファイリングを有効にすると、お使いの [Python バージョン][1]に応じて、前述のように以下のプロファイルタイプが収集されます。


Wall Time
: 各関数が使用した経過時間。経過時間には、コードが CPU で実行されている時間、I/O を待機している時間、および関数の実行中に発生するその他の時間が含まれます。<br />
_必要なもの: Python 2.7+_

Lock Wait Time
: 各関数がロックの待機に費やした時間。<br />
_必要なもの: Python 2.7+_

Locked Time
: 各関数がロックの保持に費やした時間。<br />
_必要なもの: Python 2.7+_

Lock Acquires
: 各関数がロックを取得した回数。<br />
_必要なもの: Python 2.7+_

Lock Releases
: 各関数がロックを解除した回数。<br />
_必要なもの: Python 2.7+_

CPU
: Python やネイティブコードを含む、各関数が CPU での実行に費やした時間。<br />
_必要なもの: Python 2.7+、POSIX プラットフォーム_

Heap Live Size
: 各関数によって割り当てられたヒープメモリのうち、まだガベージコレクションとして処理されていないメモリの量。これは、サービスの全体的なメモリ使用量を調査し、潜在的なメモリリークを特定する際に役立ちます。<br />
_必要なもの: Python 3.5+_

Allocated Memory
: 各関数によって割り当てられたヒープメモリの量。これには、後で解放された割り当ても含まれます。<br />
_必要なもの: Python 3.5+_

Allocations
: 各関数によるヒープ割り当ての数。これには、後で解放された割り当ても含まれます。<br />
_必要なもの: Python 3.5+_

Thrown Exceptions
: 各関数によって発生したキャッチまたはキャッチされない例外の数、およびその種類。<br />
_必要なもの: Python 3.7+、POSIX プラットフォーム_


[1]: /profiler/enabling/python/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

プロファイリングを有効にすると、[サポートされている Go バージョン][3]について、以下のプロファイルタイプが収集されます。


CPU Time
: 各関数が CPU での実行に費やした時間。ネットワーキング、チャンネル、ミューテックス、スリープの待機のような Off-CPU の時間は、このプロファイルでキャプチャされません。ミューテックスおよびブロックのプロファイルをご確認ください。

Allocations
: プロファイリング期間中 (デフォルト: 60 秒) に各関数がヒープメモリで割り当てたオブジェクトの数 (その後に解放された割り当ても含む)。Go ではこれを `alloc_objects` と呼びます。スタックの割り当ては追跡されません。これは、ガベージコレクションの負荷を調査する場合に便利です。バージョン `1.33.0` でのこの指標の変更点については、[差分プロファイル](#delta-profiles)をご覧ください。

Allocated Memory
: プロファイリング期間中 (デフォルト: 60 秒) に各関数が割り当てたヒープメモリの数 (その後に解放された割り当ても含む)。Go ではこれを `alloc_space` と呼びます。スタックの割り当ては追跡されません。これは、ガベージコレクションの負荷を調査する場合に便利です。バージョン `1.33.0` でのこの指標の変更点については、[差分プロファイル](#delta-profiles)をご覧ください。

Heap Live Objects
: 各関数がヒープメモリに割り当てたオブジェクトのうち、まだガベージコレクションとして処理されていないオブジェクトの数。Go ではこれを `inuse_objects` と呼びます。これは、サービスの全体的なメモリ使用量を調査し、潜在的なメモリリークを特定する際に役立ちます。

Heap Live Size
: The amount of heap memory allocated by each function that has not yet been garbage collected. Go calls this `inuse_space`. This is useful for investigating the overall memory usage of your service and [identifying potential memory leaks][4].

Mutex
: プロファイリング期間中 (デフォルト: 60 秒) に関数がミューテックスを待機している時間。このプロファイルのスタックトレースは、ミューテックスで続行をブロックされた別の goroutine を許可した `Unlock()` 演算子をポイントします。スピンロックを使用したショートミューテックスの競合はこのプロファイルでキャプチャされませんが、CPU プロファイルで確認できます。バージョン `1.33.0` でのこの指標の変更点については、[差分プロファイル](#delta-profiles)をご覧ください。

Block
: プロファイリング期間中 (デフォルト: 60 秒) に関数がミューテックスおよびチャンネルオペレーションを待機している時間。スリープ、GC、ネットワーク、Syscall オペレーションは、このプロファイルでキャプチャされません。ブロッキングオペレーションは、ブロックが解除されてからのみキャプチャされるため、スタックしていると思われるアプリケーションのデバッグにこのプロファイルを使用することはできません。ミューテックスの競合の場合、このプロファイルのスタックトレースはブロックされた `Lock()` 演算子をポイントします。これにより、ブロックされているプログラムがわかり、ミューテックスプロファイルにより、競合の原因となっているプログラムの部分がわかります。この点に関する詳しい情報は、Datadog の [Go におけるプロファイリングのブロック][1]リサーチをご覧ください。バージョン `1.33.0` でのこの指標の変更点については、[差分プロファイル](#delta-profiles)をご覧ください。**注**: ブロックプロファイラーを使用すると、本番環境において顕著なオーバーヘッドが発生する可能性があります。本番環境で有効にする場合は、高いレート (`100000000`、つまり 100 ミリ秒など) を選択し、レイテンシーや CPU 使用率の増加の兆候を確認します。

Goroutines
: 同じ関数（オン CPU とオフ CPU の待機の両方）で現在実行中の goroutines の数のスナップショット。スナップショット間での goroutines の増加は、プログラムで goroutines がリークしていることを示しています。最も健康なアプリケーションでは、このプロファイルはワーカープールとその goroutines 使用数によって支配されます。遅延の影響を非常に受けやすく、大量の goroutines（10.000 以上）を使用するアプリケーションの場合、このプロファイルを有効にすると stop-the-world 型の一時停止が必要になることにご留意ください。一時停止はプロファイリング期間（デフォルトは 60 秒）ごとに発生し、通常 goroutine あたり `1μsec` ほど継続します。`100ms` ほどの p99 レイテンシー SLO の典型的なアプリケーションでは、この警告を無視することが可能です。より詳しい情報については、Datadog の [Go における Goroutine プロファイリング][2]リサーチをご覧ください。

#### 差分プロファイル
<div class="alert alert-info"><strong>注</strong>: <code>1.33.0</code> より前のバージョンの Go プロファイラーでは、Allocations、Allocated Memory、Mutex、および Block のメトリクスは、<em>プロファイリング期間中</em>ではなく、<em>プロセスが開始されてから累積した</em>測定値として表示されます。バージョン <code>1.33.0</code> のデルタプロファイルへの変更により、これらの測定値が蓄積されるのではなく、どのように変化しているかを確認することができます。デルタプロファイリングはデフォルトでオンになっています。プロファイラーのバージョン <code>1.35.0</code> では、<code>WithDeltaProfiles</code> オプションを使用してデルタプロファイルを無効にすることができます。<br/><br/>プロファイラーバージョン <code>1.37.0</code> では、アップロード帯域幅の使用量を減らすため、デルタプロファイリングが有効な場合は累積プロファイルがアップロードされなくなりました。完全な累積プロファイルに依存している場合は、<a href="/help/">サポートに連絡</a>して使用例について相談してください。</div>


[1]: https://github.com/DataDog/go-profiler-notes/blob/main/block.md
[2]: https://github.com/DataDog/go-profiler-notes/blob/main/goroutine.md
[3]: /profiler/enabling/go#requirements
[4]: /profiler/guide/solve-memory-leaks
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

プロファイリングを有効にすると、[サポートされている Ruby バージョン][1]について、以下のプロファイルタイプが収集されます。

CPU
: Ruby やネイティブコードを含む、各関数が CPU での実行に費やした時間。

Wall Time
: 各関数が使用した経過時間。経過時間には、コードが CPU で実行されている時間、I/O を待機している時間、および関数の実行中に発生するその他の時間が含まれます。

Allocations (beta, v1.21.1+)
: The number of objects allocated by each method during the profiling period (default: 60s), including allocations which were subsequently freed. This is useful for investigating garbage collection load.<br />
_Requires:_ [Manual enablement][3]

Heap Live Objects (alpha, v1.21.1+)
: The number of objects allocated by each method in heap memory that have not yet been garbage collected. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.<br />
_Requires: Ruby 2.7+_ and [manual enablement][2]

Heap Live Size (alpha, v1.21.1+)
: The amount of heap memory allocated by each method that has not yet been garbage collected. This is useful for investigating the overall memory usage of your service and identifying potential memory leaks.<br />
_Requires: Ruby 2.7+_ and [manual enablement][2]

[1]: /profiler/enabling/ruby/#requirements
[2]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.19.0#:~:text=You%20can%20enable%20these%20features%3A
[3]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.21.0
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

プロファイリングを有効にすると、[サポートされている Node.js バージョン][1]について、以下のプロファイルタイプが収集されます。

CPU (beta, v5.11.0+, v4.35.0+, v3.56.0+)
: The time each function spent running on the CPU, including JavaScript and native code.<br />

Wall Time
: 各関数が使用した経過時間。経過時間には、コードが CPU で実行されている時間、I/O を待機している時間、および関数の実行中に発生するその他の時間が含まれます。

Heap Live Size
: 各関数によって割り当てられたヒープメモリのうち、まだガベージコレクションとして処理されていないメモリの量。これは、サービスの全体的なメモリ使用量を調査し、潜在的なメモリリークを特定する際に役立ちます。

[1]: /profiler/enabling/nodejs/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

プロファイリングを有効にすると、[サポートされている .NET バージョン][1]について、以下のプロファイルタイプが収集されます。

Wall Time
: マネージドメソッドに費やされた経過時間。経過時間には、コードが CPU で実行されている時間、I/O を待機している時間、およびメソッドの実行中に発生するその他の時間が含まれます。

CPU (v2.15+)
: 各メソッドが CPU での実行に費やした時間。

Thrown Exceptions (v2.31+)
: 各メソッドによって発生したキャッチまたはキャッチされない例外の数、およびその種類とメッセージ。

Allocations (ベータ版、v2.18+)
: 各メソッドで割り当てられたオブジェクトの数、サイズ、およびそのタイプ。<br />
_必要なもの: .NET 6+_

Lock (v2.49+)
: The number of times threads are waiting for a lock and for how long.<br />
_Requires: beta .NET Framework (requires Datadog Agent 7.51+) / .NET 5+_

Live Heap (ベータ版、v2.22+)
: 割り当てられたオブジェクトのサブセット (クラス名付き) で、メモリ内に残っているもの。<br />
_必要なもの: .NET 7+_

[1]: /profiler/enabling/dotnet/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

プロファイリングを有効にすると、[サポートされている PHP バージョン][1]について、以下のプロファイルタイプが収集されます。

Wall Time
: 各関数が使用した経過時間。経過時間には、コードが CPU で実行されている時間、I/O を待機している時間、および関数の実行中に発生するその他の時間が含まれます。

CPU
: 各関数が CPU での実行に費やした時間を示します。

Allocations (v0.88+)
: プロファイリング期間中 (デフォルト: 67 秒) に各関数が行ったアロケーションの数 (その後に解放されたアロケーションを含む)。スタックのアロケーションは追跡されません。<br />
_注: PHP `8.0.0`-`8.1.20` および `8.2.0`-`8.2.7` で JIT が有効になっている場合は利用できません_

Allocated memory (v0.88+)
: プロファイリング期間中 (デフォルト: 67 秒) に各関数が割り当てたヒープメモリの量 (その後に解放されたアロケーションを含む)。スタックのアロケーションは追跡されません。<br />
_注: PHP `8.0.0`-`8.1.20` および `8.2.0`-`8.2.7` で JIT が有効になっている場合は利用できません_

Thrown Exceptions (v0.92+)
: 各メソッドによって発生したキャッチされたまたはされなかった例外の数、およびその種類。

[1]: /profiler/enabling/php/#requirements
{{< /programming-lang >}}
{{< programming-lang lang="ddprof" >}}

プロファイリングを有効にすると、[サポートされている言語とバージョン][1]について、以下のプロファイルタイプが収集されます。

CPU
: 各関数が CPU での実行に費やした時間。

Allocations
: プロファイリング期間中 (デフォルト: 59 秒) に各関数が行った割り当て数 (その後に解放された割り当てを含む)。スタックの割り当ては追跡されません。

Allocated memory
: プロファイリング期間中 (デフォルト: 59 秒) に各関数が割り当てたヒープメモリの量 (その後に解放された割り当て分も含む)。スタックの割り当ては追跡されません。

[1]: /profiler/enabling/ddprof/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


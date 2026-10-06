---
disable_sidebar: true
further_reading:
- link: /profiler/enabling
  tag: ドキュメント
  text: プロファイラーの有効化
title: プロファイラー機能の言語およびライブラリのバージョン
---
以下のテーブルは、各言語ランタイムで利用可能な機能をまとめたものです。
少なくとも 1 つの機能にアクセスするには、- **最小バージョン**が必要です。これより前のバージョンを使用している場合、プロファイリングは利用できません。
- **機能が完全に利用可能なバージョン**では、サポートされている**すべて**の機能にアクセスできます。通常、すべての SDK を最新バージョンに更新することをお勧めします。

<div class="alert alert-info">詳細については、各テーブルの言語見出しをクリックして、その言語のセットアップページに移動してください。</div>

## ランタイムと SDK のバージョン {#runtime-and-sdk-versions}

Datadog Profiler を使用するには、以下のテーブルにまとめられた最小バージョン以上を使用してください。バージョンごとのプロファイルタイプの利用可否については、[プロファイルタイプ](#profile-types)を参照してください。

|                                   |  [Java][1]   |   [Python][2]    |    [Go][3]    |   [Ruby][4]    | [Node.js][5]  |  [.NET][6]  |   [PHP][7]    | [Rust/C/C++][8] |
|-----------------------------------|:------------:|:----------------:|:-------------:|:--------------:|:-------------:|:-----------------------------------------------------------------------:|:-------------:|:---------------:|
| <strong>最小ランタイムバージョン</strong> | [JDK 8+][17]  | Python 2.7+ | [以前の主要な Go リリース][21] | Ruby 2.5+ | Node.js 18+ | .NET Core 2.1+、.NET 5+、.NET Framework 4.6.1+ | PHP 7.1+ |                 |
| <strong>機能が完全に利用可能なランタイムバージョン</strong>       | [JDK 11+][17] | Python 3.6+ | [最新の主要な Go リリース][21] | Ruby 3.2+ | Node.js 18+ |                              .NET 7+                               | PHP 8.0+ |                 |
| <strong>機能が完全に利用可能な SDK バージョン</strong>        | [最新][9]  |   [最新][10]   | [最新][11]  |  [最新][12]  | [最新][13]  |                              [最新][14]                               | [最新][15]  |  [最新][16]   |

## プロファイルタイプ {#profile-types}

以下のテーブルは、言語別のプロファイルタイプの利用可否を示しています。最適なパフォーマンスとすべての機能へのアクセスのために、Datadog ではお使いの言語の最新バージョンの SDK を使用することを推奨しています。特定のランタイムバージョンが示されていない場合、そのプロファイルタイプは [ランタイムと SDK のバージョン](#runtime-and-sdk-versions)に記載されている最小ランタイムバージョンで使用可能です。


| <div style="width:150px"><div>    |                     [Java][1]                     | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------------------------------------------------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="CPU" >}}各関数／メソッドがCPU上で実行に費やした時間。{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}  | {{< tooltip glossary="プレビュー" case="title" >}} |
| {{< ci-details title="例外" >}}捕捉されたものを含む、発生した例外の数。{{< /ci-details >}}   |                 {{< X >}}                 | | | | | {{< X >}} | {{< X >}}  | |
| {{< ci-details title="割り当て" >}}各関数／メソッドによって行われたメモリ割り当ての回数およびサイズ（その後解放された割り当てを含む）。{{< /ci-details >}}   |                [JDK 11+][17]                 | Python 3.6+ | {{< X >}} | {{< X >}} | {{< tooltip glossary="プレビュー" case="title" >}}<br>Node.js 26+ | {{< tooltip glossary="プレビュー" case="title" >}}<br>.NET 6+ <br>(.NET 10 recommended)| {{< X >}} | {{< tooltip glossary="プレビュー" case="title" >}} |
| {{< ci-details title="Heap" >}}割り当てられたヒープメモリのうち、使用中の量。{{< /ci-details >}}   | [JDK 11+][17] | Python 3.6+ | {{< X >}} | {{< tooltip glossary="プレビュー" case="title" >}}<br>Ruby 3.1+<br>ヒープのライブサイズは現在Ruby 4と互換性がありません {{< X >}} | {{< tooltip glossary="プレビュー" case="title" >}}<br>.NET 7+ <br>(.NET 10 recommended) | | {{< tooltip glossary="プレビュー" case="title" >}} |
| {{< ci-details title="ウォールタイム" >}}各関数／メソッドの経過時間。経過時間には、コードがCPUで実行されている時間、I/O待ちの時間、および関数やメソッドの実行中に発生するその他すべての時間が含まれます。{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="ロック" >}}各関数／メソッドがロックの待機および保持に費やした時間、ならびに各関数がロックを獲得した回数。{{< /ci-details >}}   |                 {{< X >}}                 | {{< X >}} | {{< X >}} | | | .NET 5+ | | |
| {{< ci-details title="I/O" >}}各メソッドがファイルやソケットの読み書きに費やした時間。{{< /ci-details >}}   |                 {{< X >}}                 | | | | | | {{< tooltip glossary="プレビュー" case="title" >}} | |

## その他の機能 {#other-features}

以下のテーブルは、言語別の追加プロファイリング機能の概要です。すべての機能を最大限に活用し、最高のパフォーマンスを得るために、Datadogでは各言語のSDKの最新バージョンを使用することを推奨しています。特定のランタイムバージョンが指定されていない場合、その機能は [ランタイムおよびSDKバージョン](#runtime-and-sdk-versions)に記載されている最小ランタイムバージョンで使用可能です。

|                                   | [Java][1]  | [Python][2]  |  [Go][3]   |  [Ruby][4] |   [Node.js][5]  |  [.NET][6]   |   [PHP][7]  | [Rust/C/C++][8] |
|-----------------------------------|:-------:|:-------:|:------------:|:------:|:---------:|:-------:|:------:|:----------:|
| {{< ci-details title="トレースとプロファイリングの統合" >}}パフォーマンスの問題に関連する特定のコード行を見つけます。<a href="/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces">詳細はこちら</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="エンドポイントプロファイリング" >}}ボトルネックとなっている、またはリソースを大量に消費しているエンドポイントを特定します。<a href="/profiler/connect_traces_and_profiles/#endpoint-profiling">詳細はこちら</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="タイムラインビュー" >}}スパンにおける時間ベースのパターンと作業分布を明らかにします。<a href="/profiler/connect_traces_and_profiles/#span-execution-timeline-view">詳細はこちら</a>{{< /ci-details >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
| {{< ci-details title="メモリリーク" >}}メモリリークの調査を支援するガイド付きワークフローです。<a href="/profiler/guide/solve-memory-leaks/">詳細はこちら</a>{{< /ci-details >}}   | {{< X >}} | | {{< X >}} | | {{< X >}} | {{< X >}} | | |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/profiler/enabling/?prog_lang=java
[2]: /ja/profiler/enabling/?prog_lang=python
[3]: /ja/profiler/enabling/?prog_lang=go
[4]: /ja/profiler/enabling/?prog_lang=ruby
[5]: /ja/profiler/enabling/?prog_lang=node_js
[6]: /ja/profiler/enabling/?prog_lang=dot_net
[7]: /ja/profiler/enabling/?prog_lang=php
[8]: /ja/profiler/enabling/?prog_lang=rust
[9]: https://github.com/DataDog/dd-trace-java/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-go/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-js/releases
[14]: https://github.com/DataDog/dd-trace-dotnet/releases
[15]: https://github.com/DataDog/dd-trace-php/releases
[16]: https://github.com/DataDog/ddprof/releases
[17]: /ja/profiler/enabling/?prog_lang=java#requirements
[18]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[19]: /ja/profiler/connect_traces_and_profiles/#endpoint-profiling
[20]: /ja/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[21]: https://go.dev/doc/devel/release
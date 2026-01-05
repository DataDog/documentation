---
aliases:
- /ja/tracing/profiler/connect_traces_and_profiles/
further_reading:
- link: tracing
  tag: ドキュメント
  text: APM 分散トレーシング
- link: /profiler/enabling
  tag: ドキュメント
  text: アプリケーションで Continuous Profiler を有効化する
- link: getting_started/profiler
  tag: ドキュメント
  text: Profiler のはじめかた
title: 遅いトレースまたはエンドポイントを調査する
---

本番でパフォーマンス問題が見られる場合、分散トレーシングをプロファイリングのスタック トレース ベンチマークと統合することは、ボトルネックを特定する強力な方法です。APM 分散トレーシングと Continuous Profiler の両方を有効化しているアプリケーション プロセスは、自動的にリンクされます。

**Profiles** タブでは、スパン情報からプロファイリング データへ直接移動し、パフォーマンス問題に関連する特定のコード行を特定できます。同様に、Profiling UI で、遅くてリソース を多く消費するエンドポイントのデバッグも直接行えます。

## 遅いトレースでコードのパフォーマンス問題を特定する

### 前提条件

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
Linux と macOS 上で [Java サービスのプロファイリングを有効化][1] すると、Trace to Profiling の統合はデフォルトで有効になります。Windows では利用できません。

手動インスツルメントしたコードでは、Continuous Profiler がスパンと関連付けるために Scope のアクティベーションが必要です:

```java
final Span span = tracer.buildSpan("ServicehandlerSpan").start();
try (final Scope scope = tracer.activateSpan(span)) { // Datadog Continuous Profiler がスパンに関連付けるために必須
    // ワーカー スレッドの実装
  } finally {
    // ステップ 3: 作業が完了したら Span を終了する
    span.finish();
  }

```

<div class="alert alert-danger">
Java Flight Recorder (JFR) の代わりに、<a href="/profiler/enabling/java/?tab=datadog#requirements">Datadog プロファイラを使用する</a> ことを強く推奨します。
</div>

[1]: /ja/profiler/enabling/java
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

次の場合に Trace to Profiling の統合が有効になります:
- `dd-trace-py` を 2.12.0+、2.11.4+、または 2.10.7+ にアップグレードする。
- 環境変数 `DD_PROFILING_TIMELINE_ENABLED` を `true` に設定する。

[1]: /ja/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[Ruby サービスのプロファイリングを有効化][1] し、`dd-trace-rb` を 1.22.0+ に更新すると、Trace to Profiling の統合はデフォルトで有効になります。

[1]: /ja/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Linux と macOS 上で [Node.js サービスのプロファイリングを有効化][1] すると、Trace to Profiling の統合はデフォルトで有効になります。機能は Windows では利用できません。

`dd-trace-js` 5.11.0+、4.35.0+、および 3.56.0+ が必要です。

[1]: /ja/profiler/enabling/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

[Go サービスのプロファイリングを有効化][1] し、以下の環境変数を設定すると、Trace to Profiling の統合が有効になります:

```go
os.Setenv("DD_PROFILING_EXECUTION_TRACE_ENABLED", "true")
os.Setenv("DD_PROFILING_EXECUTION_TRACE_PERIOD", "15m")
```

これらの変数を設定すると、実行トレース データを最大 1 分 (または 5 MiB) まで、[15 分ごと][2] に記録します。

このデータは次の場所で確認できます:

- [Profile List][3] で、検索クエリに `go_execution_traced:yes` を追加します。プロファイルをクリックして [Profile Timeline][4] を表示します。さらに深く調査するには、プロファイルをダウンロードして `go tool trace` または [gotraceui][5] を使い、含まれている `go.trace` ファイルを表示します。
- [Trace Explorer][6] で、検索クエリに `@go_execution_traced:yes` を追加します ( `@` に注意)。スパンをクリックし、**Profiles** タブを選択して [Span Timeline](#span-execution-timeline-view) を表示します。

実行トレースを記録している間、アプリケーションでガーベジ コレクションに似た CPU 使用率の増加が観測される場合があります。ほとんどのアプリケーションにとって重大な影響はないはずですが、Go 1.21 にはこのオーバーヘッドを解消するための [パッチ][7] が含まれています。

この機能には `dd-trace-go` バージョン 1.37.0+ (タイムライン ビューでは 1.52.0+) が必要で、Go バージョン 1.18 以降で最適に動作します (タイムライン ビューは 1.21 以降)。

[1]: /ja/profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/issues/2099
[3]: /ja/profiler/profile_visualizations/#single-profile
[4]: /ja/profiler/profile_visualizations/#timeline-view
[5]: https://github.com/dominikh/gotraceui
[6]: /ja/tracing/trace_explorer/
[7]: https://blog.felixge.de/waiting-for-go1-21-execution-tracing-with-less-than-one-percent-overhead/
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

[.NET サービスのプロファイリングを有効化][1] すると、Trace to Profiling の統合はデフォルトで有効になります。

この機能には `dd-trace-dotnet` バージョン 2.30.0+ が必要です。

[1]: /ja/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[PHP サービスのプロファイリングを有効化][1] し、次の条件を満たすと、Trace to Profiling の統合が有効になります:
- `dd-trace-php` バージョン 0.98+ を使用している。
- 環境変数 `DD_PROFILING_TIMELINE_ENABLED=1` または INI 設定 `datadog.profiling.timeline_enabled=1` を設定している。

[1]: /ja/profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### スパン実行タイムライン ビュー

{{< img src="profiler/profiling_automated_analysis_individual.png" alt="Profiles タブには、スレッドと実行を時間経過で分解して表示するタイムライン ビューがあります" >}}

タイムライン ビューは、スパン期間にわたる時間ベースのパターンと作業分布を可視化します。スレッドがリクエストにどのように寄与したかを時間経過で視覚的に分解して表示します。

スパン タイムライン ビューを使うと、次のことができます:

- 時間のかかるメソッドを特定する
- スレッド間の複雑な相互作用を整理する
- リクエストに影響したランタイム アクティビティを可視化する
- ビューで直接 [Automated Analysis][1] を活用して、過大なスレッド プールや GC 競合などのパフォーマンス問題を強調表示する

[1]: /ja/profiler/automated_analysis/

ランタイムや言語によって、レーンは異なります:

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
各レーンは **スレッド** を表します。共通のプールからのスレッドはグループ化されます。プールを展開して各スレッドの詳細を表示できます。

上部のレーンは、追加のレイテンシーを引き起こす可能性のあるランタイム アクティビティです。

リクエスト自体とは無関係の場合があります。タイムラインを使って遅い p95 リクエストやタイムアウトをデバッグする方法の詳細は、ブログ記事 [プロファイリングでリクエスト レイテンシを理解する][1] を参照してください。

[1]: https://www.datadoghq.com/blog/request-latency-profiling/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
Python でこの機能を有効化する方法は、[前提条件](#prerequisites) を参照してください。

各レーンは **スレッド** を表します。共通のプールからのスレッドはグループ化されます。プールを展開して各スレッドの詳細を表示できます。
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
各レーンは **ゴルーチン** を表します。選択したスパンを開始したゴルーチン、およびそれが生成したものとその子孫が含まれます。同じ `go` 文で作成されたゴルーチンはまとめてグループ化されます。グループを展開して、各ゴルーチンの詳細を表示できます。

上部のレーンは、追加のレイテンシーを引き起こす可能性のあるランタイム アクティビティです。リクエスト自体とは無関係の場合があります。

タイムラインを使って遅い p95 リクエストやタイムアウトをデバッグする方法の詳細は、ブログ記事 [Datadog の Profiling Timeline で Go リクエスト レイテンシをデバッグする][1] を参照してください。

[1]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
この機能を Ruby で有効化する方法は、[前提条件](#prerequisites) を参照してください。

各レーンは **スレッド** を表します。共通のプールからのスレッドはグループ化されます。プールを展開して各スレッドの詳細を表示できます。
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
各レーンは **スレッド** を表します。同じ名前のスレッドはグループ化されます。グループを展開して各スレッドの詳細を表示できます。コードで明示的に作成されたスレッドは _Managed Threads_ の下にグループ化されます。

上部のレーンは、追加のレイテンシーを引き起こす可能性のあるランタイム アクティビティです。リクエスト自体とは無関係の場合があります。
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
この機能を Node.js で有効化する方法は、[前提条件](#prerequisites) を参照してください。

JavaScript **スレッド** は 1 つのレーンです。

上部のレーンは、リクエストに追加のレイテンシーをもたらす可能性のあるガーベジ コレクタの **ランタイム アクティビティ** です。
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
この機能を PHP で有効化する方法は、[前提条件](#prerequisites) を参照してください。

各 PHP **スレッド** に対して 1 つのレーンがあります (PHP NTS では 1 つのみ)。この **スレッド** 内で実行される Fiber は同じレーンに表示されます。

上部のレーンは、ファイル コンパイルやガーベジ コレクションに起因して、リクエストに追加のレイテンシーをもたらす可能性のあるランタイム アクティビティです。
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### トレースからプロファイルを表示する

{{< img src="profiler/view_profile_from_trace-2.png" alt="フレーム グラフでプロファイルのビューを開く" >}}

タイムラインから **Open in Profiling** をクリックすると、同じデータを新しいページで表示できます。そこから、可視化をフレーム グラフに変更できます。
データのスコープを定義するには、**Focus On** セレクタをクリックします:

- **Span & Children**: 選択したスパンと同じサービス内のすべての子孫スパンに、プロファイリング データの範囲を限定します。
- **Span only**: 直前に選択したスパンのみに、プロファイリング データの範囲を限定します。
- **Span time period**: スパンがアクティブだった時間帯のすべてのスレッドに、プロファイリング データの範囲を限定します。
- **Full profile**: 直前に選択したスパンを実行したサービス プロセス全体の 60 秒間に、データの範囲を限定します。

## API エンドポイントごとにコードのパフォーマンスを分解する

### 前提条件

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php" >}}
{{< programming-lang lang="java" >}}
[Java サービスのプロファイリングを有効化][1] すると、エンドポイント プロファイリングはデフォルトで有効になります。

[Datadog プロファイラの使用][2] が必要です。JFR はサポートされません。

[1]: /ja/profiler/enabling/java
[2]: /ja/profiler/enabling/java/?tab=datadog#requirements
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

[Python サービスのプロファイリングを有効化][1] すると、エンドポイント プロファイリングはデフォルトで有効になります。

`dd-trace-py` バージョン 0.54.0+ が必要です。

[1]: /ja/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
[Go サービスのプロファイリングを有効化][1] すると、エンドポイント プロファイリングはデフォルトで有効になります。

`dd-trace-go` バージョン 1.37.0+ が必要で、Go バージョン 1.18 以上で最適に動作します。

[1]: /ja/profiler/enabling/go
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[Ruby サービスのプロファイリングを有効化][1] すると、エンドポイント プロファイリングはデフォルトで有効になります。

[1]: /ja/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Linux と macOS 上で [Node.js サービスのプロファイリングを有効化][1] すると、エンドポイント プロファイリングはデフォルトで有効になります。この機能は Windows では利用できません。

`dd-trace-js` バージョン 5.0.0+、4.24.0+、または 3.45.0+ が必要です。

[1]: /ja/profiler/enabling/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

[.NET サービスのプロファイリングを有効化][1] すると、エンドポイント プロファイリングはデフォルトで有効になります。

`dd-trace-dotnet` バージョン 2.15.0+ が必要です。

[1]: /ja/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

[PHP サービスのプロファイリングを有効化][1] すると、エンドポイント プロファイリングはデフォルトで有効になります。

`dd-trace-php` バージョン 0.79.0+ が必要です。

[1]: /ja/profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### エンドポイント プロファイリング

エンドポイント プロファイリングは、Web サービスの任意のエンドポイントでフレーム グラフのスコープを絞り込み、遅い・レイテンシが大きい・エンドユーザー体験を損なっているエンドポイントを見つけるのに役立ちます。これらのエンドポイントはデバッグが難しく、なぜ遅いのか理解しづらいことがあります。遅さは、CPU サイクルを大量に消費するなど、意図しない大きなリソース消費によって引き起こされる場合があります。

エンドポイント プロファイリングによって、次のことが可能になります:

- エンドポイント全体の応答時間を遅くしているボトルネック メソッドを特定する。
- CPU、メモリ、例外などの貴重なリソースを消費している上位エンドポイントを分離する。これは、サービスをパフォーマンス向上のために最適化している場合に特に有用です。
- サード パーティ コードやランタイム ライブラリが、エンドポイントの遅延や過剰なリソース消費の原因かどうかを把握する。

{{< img src="profiler/endpoint_agg.png" alt="エンドポイントの集約を使って遅いエンドポイントをトラブルシュートする" >}}

### 本番のレイテンシに影響したコードを可視化する

APM Service ページで **Profiling** タブの情報を使い、レイテンシやスループットの変化をコード パフォーマンスの変化と相関付けます。

この例では、`/GET train` におけるロック競合の増加が次のコード行によって引き起こされ、それがレイテンシに結び付いていることがわかります:

```java
Thread.sleep(DELAY_BY.minus(elapsed).toMillis());
```

{{< img src="profiler/apm_service_page_pivot_to_contention_comparison.mp4" alt="APM Service ページから Profiling の比較ページにピボットして、レイテンシの原因となるコード行を特定する" video=true >}}

### 最もリソースを消費しているエンドポイントを追跡する

CPU やウォール タイムなどの重要なリソースを消費している上位エンドポイントを追跡することは有用です。リストは、エンドポイントがリグレッションしていないか、あるいは新しく導入したエンドポイントが著しく多くのリソースを消費してサービス全体を遅くしていないかを把握するのに役立ちます。

次の画像は、`GET /store_history` が定期的にこのサービスへ影響し、CPU の 20% と割り当てメモリの 50% を消費していることを示しています:

{{< img src="profiler/apm_endpoint_metric.png" alt="リソース消費の観点で上位エンドポイントをグラフ化する" >}}

### リクエストあたりの平均リソース消費を追跡する

トラフィックが時間とともに変動しても動作の変化を確認するには、`Per endpoint call` を選択します。これは、段階的ロールアウトの健全性チェックや日々のトラフィック パターン分析に役立ちます。

次の例は、`/GET train` のリクエストあたりの CPU が増加したことを示しています:

{{< img src="profiler/endpoint_per_request2.mp4" alt="リクエストあたりのリソース使用量が増え始めたエンドポイントをトラブルシュートする" video="true" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
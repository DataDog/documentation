---
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: /tracing/troubleshooting
  tag: Documentation
  text: APM トラブルシューティング
title: Ruby プロファイラーのトラブルシューティング
type: multi-code-lang
---

## プロファイル検索ページにないプロファイル

プロファイラを設定してもプロファイル検索ページにプロファイルが表示されない場合は、[デバッグモード][1]をオンにし、デバッグファイルと次の情報で[サポートチケットを開いてください][2]。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 20.04)
- ランタイムのタイプ、バージョン、ベンダー (例: Ruby 2.7.3)

## アプリケーションが「スタックレベルが深すぎます (SystemStackError)」エラーをトリガーします

この問題は [`dd-trace-rb` バージョン `0.54.0`][3] からは発生しないと思われます。
それでも問題が解決しない場合は、エラーに至るまでのバックトレースを添えて、[サポートチケットを作成][2]してください。

`0.54.0` より前のバージョンでは、プロファイラーはスレッド生成を追跡するために Ruby VM をインスツルメントする必要があり、他の gem による同様のインスツルメンテーションと衝突していました。

以下の gem のいずれかを使用している場合

* `rollbar`: バージョン 3.1.2 以降を使用していることを確認します。
* `logging`: `LOGGING_INHERIT_CONTEXT` 環境変数を `false` に設定して、 `logging` のスレッドコンテキストの継承を
  無効にします。

## レスキュージョブのプロファイルがありません

[Resque][4] のジョブをプロファイリングする場合、[Resque のドキュメント][5]にあるように、`RUN_AT_EXIT_HOOKS` 環境変数を `1` に設定する必要があります。

このフラグがないと、短期間の Resque ジョブのプロファイルは使用できなくなります。

## Ruby VM のジャストインタイムヘッダーのコンパイルに失敗したため、プロファイリングがオンにならない

Ruby 2.7 と古いバージョンの GCC (4.8 以下) の間には、プロファイラに影響を与える非互換性があることが知られています ([アップストリーム Ruby レポート][6]、[`dd-trace-rb` バグレポート][7])。その結果、次のようなエラーメッセージが表示されることがあります: "Your ddtrace installation is missing support for the Continuous Profiler because compilation of the Ruby VM just-in-time header failed. Your C compiler or Ruby VM just-in-time compiler seem to be broken.” (Ruby VM ジャストインタイムヘッダーのコンパイルに失敗したため、あなたの ddtrace インストールには Continuous Profiler のサポートが欠けています。C コンパイラまたは Ruby VM ジャストインタイムコンパイラが壊れているようです。)

これを解決するには、オペレーティングシステムまたは Docker イメージを更新して、GCC のバージョンが v4.8 よりも新しいものになるようにしてください。

この問題についての更なるヘルプは、[サポートにお問い合わせ][2]の上、`DD_PROFILING_FAIL_INSTALL_IF_MISSING_EXTENSION=true gem install ddtrace` と結果の `mkmf.log` ファイルを実行したときの出力を含めてお送りください。

## バックトレースが非常に深い場合、フレームが省略される

Ruby プロファイラーでは、プロファイリングデータを収集する際に、深いバックトレースを切り捨てています。切り捨てられたバックトレースは呼び出し元の関数の一部が欠落しているため、ルートコールフレームにリンクすることが不可能になります。その結果、切り捨てられたバックトレースは `N frames omitted` というフレームにまとめられます。

環境変数 `DD_PROFILING_MAX_FRAMES`、または次のコードで、最大深度を増やすことができます。

```ruby
Datadog.configure do |c|
  c.profiling.advanced.max_frames = 500
end
```

## `dd-trace-rb` 1.11.0+ でネイティブ拡張機能を使用する Ruby gems からの予期しない失敗やエラー

`dd-trace-rb` 1.11.0 から、プロファイラー "CPU Profiling 2.0" が、Ruby アプリケーションに unix シグナル `SIGPROF` を送ることでデータを集め、よりきめ細かいデータ収集が可能になりました。

`SIGPROF` の送信は一般的なプロファイリング手法であり、ネイティブ拡張機能/ライブラリからのシステムコールがシステムの [`EINTR` エラーコード][8]で中断されることがあります。
まれに、ネイティブ拡張機能またはネイティブ拡張機能から呼び出されたライブラリの `EINTR` エラーコードに対するエラー処理が欠けていたり、不正確な場合があります。

以下のような非互換性があることが知られています。
* `mysql2` gem を [8.0.0 より古い][9]バージョンの `libmysqlclient` と一緒に使用すること。影響を受ける `libmysqlclient` のバージョンは、Ubuntu 18.04 に存在することが知られていますが、20.04 またはそれ以降のリリースには存在しません。
* [`rugged` gem を使用すること。][10]

このような場合、プロファイラーが自動的に非互換性を検出し、回避策を適用します。

上記以外のネイティブ拡張機能を使用した Ruby gems で失敗やエラーが発生した場合、手動で "no signals" 回避策を有効にすることで、`SIGPROF` シグナルを使用しないようにすることができます。
この回避策を有効にするには、`DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED` 環境変数を `true` に設定するか、コードで以下を設定します。

```ruby
Datadog.configure do |c|
  c.profiling.advanced.no_signals_workaround_enabled = true
end
```

**注**: 上記の設定は `dd-trace-rb` 1.12.0 以降で利用可能です。

非互換性を見つけたり疑ったりした場合は、[サポートチケット][2]で弊社チームにお知らせください。
そうすることで、Datadog はそれらを自動検出リストに追加し、gem/ライブラリの作者と協力して問題を解決することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/
[3]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.54.0
[4]: https://github.com/resque/resque
[5]: https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks
[6]: https://bugs.ruby-lang.org/issues/18073
[7]: https://github.com/DataDog/dd-trace-rb/issues/1799
[8]: https://man7.org/linux/man-pages/man7/signal.7.html#:~:text=Interruption%20of%20system%20calls%20and%20library%20functions%20by%20signal%20handlers
[9]: https://bugs.mysql.com/bug.php?id=83109
[10]: https://github.com/DataDog/dd-trace-rb/issues/2721
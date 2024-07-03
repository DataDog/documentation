---
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: /tracing/troubleshooting
  tag: Documentation
  text: APM Troubleshooting
title: Troubleshooting the Ruby Profiler
type: multi-code-lang
---

## プロファイル検索ページにないプロファイル

プロファイラを設定してもプロファイル検索ページにプロファイルが表示されない場合は、[デバッグモード][1]をオンにし、デバッグファイルと次の情報で[サポートチケットを開いてください][2]。

- Operating system type and version (for example, Ubuntu Linux 22.04)
- ランタイムのタイプ、バージョン、ベンダー (例: Ruby 2.7.3)

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

## Unexpected failures or errors from Ruby gems that use native extensions in `dd-trace-rb` 1.11.0+

`dd-trace-rb` 1.11.0 から、プロファイラー "CPU Profiling 2.0" が、Ruby アプリケーションに unix シグナル `SIGPROF` を送ることでデータを集め、よりきめ細かいデータ収集が可能になりました。

`SIGPROF` の送信は一般的なプロファイリング手法であり、ネイティブ拡張機能/ライブラリからのシステムコールがシステムの [`EINTR` エラーコード][8]で中断されることがあります。
まれに、ネイティブ拡張機能またはネイティブ拡張機能から呼び出されたライブラリの `EINTR` エラーコードに対するエラー処理が欠けていたり、不正確な場合があります。

以下のような非互換性があることが知られています。
* `mysql2` gem を [8.0.0 より古い][9]バージョンの `libmysqlclient` と一緒に使用すること。影響を受ける `libmysqlclient` のバージョンは、Ubuntu 18.04 に存在することが知られていますが、20.04 またはそれ以降のリリースには存在しません。
* [`rugged` gem を使用すること。][10]
* Using the `passenger` gem/Phusion Passenger web server [older than 6.0.19][11]

In these cases, the latest version of the profiler automatically detects the incompatibility and applies a workaround.

上記以外のネイティブ拡張機能を使用する Ruby gem で失敗やエラーが発生した場合、手動で "no signals" 回避策を有効にすることで `SIGPROF` シグナルの使用を回避することができます。
この回避策を有効にするには、環境変数 `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED` を `true` に設定します。

```ruby
Datadog.configure do |c|
  c.profiling.advanced.no_signals_workaround_enabled = true
end
```

**注**: 上記の設定は `dd-trace-rb` 1.12.0 以降でのみ有効です。

非互換性を見つけたり疑ったりした場合は、[サポートチケット][2]で弊社チームにお知らせください。
そうすることで、Datadog はそれらを自動検出リストに追加し、gem/ライブラリの作者と協力して問題を解決することができます。

## Segmentation faults in `gc_finalize_deferred` in Ruby versions 2.6 to 3.2

A workaround for this issue is automatically applied since [`dd-trace-rb` version 1.21.0][3]. Datadog recommends upgrading to this version or later to fix this issue.

Prior to version 1.21.0, in rare situations the profiler could trigger [Ruby VM Bug #19991][12] that manifests itself as a "Segmentation fault" with a crash stack trace including the `gc_finalize_deferred` function.

This bug has been fixed for Ruby 3.3 and above. For older Ruby versions (and prior to dd-trace-rb 1.21.0), you can use the "no signals" workaround to resolve this issue.

To enable this workaround, set the `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED` environment variable to `true`, or in code:

```ruby
Datadog.configure do |c|
  c.profiling.advanced.no_signals_workaround_enabled = true
end
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/
[3]: https://github.com/datadog/dd-trace-rb/releases/tag/v1.21.0
[4]: https://github.com/resque/resque
[5]: https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks
[6]: https://bugs.ruby-lang.org/issues/18073
[7]: https://github.com/DataDog/dd-trace-rb/issues/1799
[8]: https://man7.org/linux/man-pages/man7/signal.7.html#:~:text=Interruption%20of%20system%20calls%20and%20library%20functions%20by%20signal%20handlers
[9]: https://bugs.mysql.com/bug.php?id=83109
[10]: https://github.com/DataDog/dd-trace-rb/issues/2721
[11]: https://github.com/DataDog/dd-trace-rb/issues/2976
[12]: https://bugs.ruby-lang.org/issues/19991
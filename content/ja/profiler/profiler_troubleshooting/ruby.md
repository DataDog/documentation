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

- オペレーティング システムの種類とバージョン (例: Ubuntu Linux 24.04)
- ランタイムの種類、バージョン、ベンダー (例: Ruby 3.3.1)

## レスキュージョブのプロファイルがありません

[Resque][4] のジョブをプロファイリングする場合、[Resque のドキュメント][5]にあるように、`RUN_AT_EXIT_HOOKS` 環境変数を `1` に設定する必要があります。

このフラグがないと、短期間の Resque ジョブのプロファイルは使用できなくなります。

## Ruby VM のジャストインタイムヘッダーのコンパイルに失敗したため、プロファイリングがオンにならない

Ruby 2.7 と古いバージョンの GCC (4.8 以下) の間には、プロファイラに影響を与える非互換性があることが知られています ([アップストリーム Ruby レポート][6]、[`dd-trace-rb` バグレポート][7])。その結果、次のようなエラーメッセージが表示されることがあります: "Your ddtrace installation is missing support for the Continuous Profiler because compilation of the Ruby VM just-in-time header failed. Your C compiler or Ruby VM just-in-time compiler seem to be broken.” (Ruby VM ジャストインタイムヘッダーのコンパイルに失敗したため、あなたの ddtrace インストールには Continuous Profiler のサポートが欠けています。C コンパイラまたは Ruby VM ジャストインタイムコンパイラが壊れているようです。)

これを解決するには、オペレーティングシステムまたは Docker イメージを更新して、GCC のバージョンが v4.8 よりも新しいものになるようにしてください。

この問題に関して追加のサポートが必要な場合は、[サポートに連絡][2] し、`DD_PROFILING_FAIL_INSTALL_IF_MISSING_EXTENSION=true gem install datadog` を実行した出力と、生成された `mkmf.log` ファイルを添付してください。

## バックトレースが非常に深い場合、フレームが省略される

The Ruby profiler truncates deep backtraces when collecting profiling data. Truncated backtraces are missing some of their caller functions, making it impossible to link them to the root call frame. As a result, truncated backtraces are grouped together under a `Truncated Frames` (or `N frames omitted` in older versions) frame.

You can increase the maximum backtrace (stack) depth with the `DD_PROFILING_MAX_FRAMES` environment variable, or in code:

```ruby
Datadog.configure do |c|
  c.profiling.advanced.max_frames = 600
end
```

## ネイティブ拡張を使用する Ruby gem で予期しない失敗やエラーが発生する

`SIGPROF` UNIX シグナルを Ruby アプリケーションに送信することで、Ruby プロファイラーはより詳細なデータ収集を行います。

`SIGPROF` の送信は一般的なプロファイリング手法であり、ネイティブ拡張機能/ライブラリからのシステムコールがシステムの [`EINTR` エラーコード][8]で中断されることがあります。
まれに、ネイティブ拡張機能またはネイティブ拡張機能から呼び出されたライブラリの `EINTR` エラーコードに対するエラー処理が欠けていたり、不正確な場合があります。

以下のような非互換性があることが知られています。
* `mysql2` gem を [8.0.0 より古い][9]バージョンの `libmysqlclient` と一緒に使用すること。影響を受ける `libmysqlclient` のバージョンは、Ubuntu 18.04 に存在することが知られていますが、20.04 またはそれ以降のリリースには存在しません。
* [`rugged` gem を使用すること。][10]
* `passenger` gem / Phusion Passenger Web サーバーの [6.0.19 より前のバージョン][11] を使用する
* [`Dir` クラスの一部 API][13]

これらの場合、最新バージョンのプロファイラーは自動的に非互換性を検出し、ワークアラウンドを適用します。

上記以外のネイティブ拡張機能を使用する Ruby gem で失敗やエラーが発生した場合、手動で "no signals" 回避策を有効にすることで `SIGPROF` シグナルの使用を回避することができます。
この回避策を有効にするには、環境変数 `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED` を `true` に設定します。

```ruby
Datadog.configure do |c|
  c.profiling.advanced.no_signals_workaround_enabled = true
end
```

非互換性を見つけたり疑ったりした場合は、[サポートチケット][2]で弊社チームにお知らせください。
そうすることで、Datadog はそれらを自動検出リストに追加し、gem/ライブラリの作者と協力して問題を解決することができます。

## Ruby 2.6 〜 3.2 で `gc_finalize_deferred` に発生するセグメンテーション フォルト

この問題のワークアラウンドは、[`dd-trace-rb` バージョン 1.21.0][3] 以降で自動的に適用されます。Datadog は本バージョン以降へのアップグレードを推奨します。

バージョン 1.21.0 より前では、まれにプロファイラーが [Ruby VM Bug #19991][12] を引き起こし、`gc_finalize_deferred` 関数を含むクラッシュ スタック トレースとともに「Segmentation fault」が発生する場合があります。

このバグは Ruby 3.3 以降で修正されています。古い Ruby バージョン (および dd-trace-rb 1.21.0 より前) では、“no signals” ワークアラウンドを使用して解決できます。

このワークアラウンドを有効にするには、環境変数 `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED` を `true` に設定するか、コード内で次のように指定します:

```ruby
Datadog.configure do |c|
  c.profiling.advanced.no_signals_workaround_enabled = true
end
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/troubleshooting/#debugging-and-logging
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
[13]: https://github.com/DataDog/dd-trace-rb/issues/3450
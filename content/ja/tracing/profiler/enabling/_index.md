---
aliases:
- /ja/tracing/faq/profiling_migration/
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: tracing/profiler/search_profiles
  tag: ドキュメント
  text: 使用可能なプロファイルタイプの詳細
- link: tracing/profiler/profiler_troubleshooting
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
kind: ドキュメント
title: プロファイラーの有効化
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

アプリケーションでプロファイラーを有効にする方法については、以下で言語を選択してください。

## 管理ランタイム

{{< partial name="profiling/profiling-languages.html" >}}

## 非管理ランタイム

以下のプロファイリングライブラリは、**C**、**C++**、**Rust** などのコンパイル型言語で書かれたアプリケーションに使用できます。これは、nginx and Postgres などのプロファイルサービスにも使用可能です。

{{< partial name="profiling/profiling-unmanaged-code.html" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: /ja/tracing/setup_overview/
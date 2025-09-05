---
aliases:
- /ja/tracing/compatibility_requirements/cpp
- /ja/tracing/setup_overview/compatibility_requirements/cpp
code_lang: cpp
code_lang_weight: 60
description: C++ トレーサーの互換性要件です。
further_reading:
- link: tracing/trace_collection/dd_libraries/cpp
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
title: C++ 互換性要件
type: multi-code-lang
---

## 互換性

C++ Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

このライブラリをビルドするには、C++17 に対応したコンパイラが必要です。

サポート対象のプラットフォーム
- `x86_64` および `arm64` Linux
- `x86_64` Windows
- `arm64` macOS

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-cpp
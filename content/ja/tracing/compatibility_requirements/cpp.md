---
title: C++ 互換性要件
kind: ドキュメント
description: C++ トレーサーの互換性要件です。
further_reading:
  - link: tracing/setup/cpp
    tag: Documentation
    text: アプリケーションのインスツルメンテーション
---
## 互換性

C++ Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

このライブラリをビルドするには C++14 が必要ですが、[ダイナミックローディング][2]を使用する場合、OpenTracing には [C++11 以降][3]が必要です。

Linux と Mac のプラットフォームがサポートされています。Windows のサポートが必要な方は、[Datadog のサポートチーム][4]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-opentracing-cpp
[2]: /ja/tracing/setup/cpp/#dynamic-loading
[3]: https://github.com/opentracing/opentracing-cpp/#cc98
[4]: /ja/help/
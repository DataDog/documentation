---
aliases:
- /ja/tracing/dynamic_instrumentation/enabling/
further_reading:
- link: /agent/
  tag: ドキュメント
  text: Datadog Agent の概要
is_beta: true
private: true
title: ダイナミックインスツルメンテーションを有効にする
type: multi-code-lang
---

ダイナミックインスツルメンテーションは、Datadog のトレーシングライブラリをサポートする機能です。すでに [APM を使用してアプリケーションのトレースを収集][1]している場合は、トレーシングライブラリが最新であることを確認してから、アプリケーションでダイナミックインスツルメンテーションを有効にします。

アプリケーションでダイナミックインスツルメンテーションを有効にする方法については、以下でランタイムを選択してください。

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
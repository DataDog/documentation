---
code_lang: ruby
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-rb/
  tag: GitHub
  text: ソースコード
- link: /tracing/trace_collection/trace_context_propagation/ruby/
  tag: Documentation
  text: トレースコンテキストの伝搬
title: Ruby トレーシングライブラリの構成
type: multi-code-lang
---

コードを使用してトレーシングライブラリをセットアップし、APM データを収集するように Agent を構成した後、オプションで[統合サービスタグ付け][1]のセットアップなど、必要に応じてトレーシングライブラリを構成してください。

Ruby トレーシングライブラリの構成については、[Ruby の追加構成][2]を参照してください。
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: /ja/tracing/trace_collection/dd_libraries/ruby/#advanced-configuration
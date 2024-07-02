---
title: Troubleshooting the Python Profiler
code_lang: python
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: /tracing/troubleshooting
      tag: Documentation
      text: APM Troubleshooting
---

## プロファイル検索ページにないプロファイル

プロファイラを設定してもプロファイル検索ページにプロファイルが表示されない場合は、[デバッグモード][1]をオンにし、デバッグファイルと次の情報で[サポートチケットを開いてください][2]。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 20.04)
- ランタイムのタイプ、バージョン、ベンダー (例: Python 3.9.5)

その他のガイダンスについては、Python APM クライアントの[トラブルシューティングドキュメント][3]を参照してください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: https://ddtrace.readthedocs.io/en/stable/troubleshooting.html
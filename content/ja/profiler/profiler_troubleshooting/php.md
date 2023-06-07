---
code_lang: php
code_lang_weight: 70
further_reading:
- link: /tracing/troubleshooting
  tag: Documentation
  text: APM トラブルシューティング
kind: Documentation
title: PHP プロファイラーのトラブルシューティング
type: multi-code-lang
---

## プロファイル検索ページにないプロファイル

プロファイラーを構成しても、プロファイル検索ページにプロファイルが表示されない場合は、`phpinfo()` 関数を実行します。プロファイラーは `phpinfo()` をフックして診断を実行します。Web サーバーに問題がある場合は、コマンドラインからではなく、Web サーバーから `phpinfo()` を実行すると、各サーバー API (SAPI) を個別に構成することができます。

以下の内容で[サポートチケットを発行][1]します。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 20.04)
- `phpfo()` の出力。PHP のバージョン、SAPI のタイプ、Datadog ライブラリのバージョン、そしてプロファイラーの診断が含まれます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/help/
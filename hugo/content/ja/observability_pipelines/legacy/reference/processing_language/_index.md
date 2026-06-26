---
aliases:
- /ja/observability_pipelines/reference/processing_language/
title: (レガシー) Datadog Processing Language / Vector Remap Language
---

Datadog Processing Language (DPL)、または Vector Remap Language (VRL) は、ログを変換するために設計された、式指向のドメイン特化型言語です。可観測性のユースケースに合わせたシンプルな構文と[組み込み関数][1]を特徴としています。

Datadog Processing Language は、`remap` 変換でサポートされています。

リマップ変換は単一のイベントに作用し、それらを変換したり、ルーティングやフィルターのための条件を指定するために使用できます。DPL は次のような方法で使用することができます。

- [配列][2]、[文字列][3]などのデータ型を操作する。
- [コーデック][4]を使って値をエンコード、デコードする。
- 値を[暗号化][5]、[復号化][6]する。
- データ型を別のデータ型に[変換][7]する (例えば、整数から文字列に変換する)。
- [syslog の値を読み取り可能な値に変換][8]する。
- [エンリッチメントテーブル][9]を使用して値をリッチ化する。
- [IP 値を操作する][10]。
- カスタムルール (grok、regex など) や既成の関数 (syslog、apache、VPC フローログなど) を使って値を[パース][11]する。
- イベントの[メタデータ][12]と[パス][13]を操作する。

[1]: /ja/observability_pipelines/legacy/reference/processing_language/functions/
[2]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#array
[3]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#string
[4]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#codec
[5]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#encrypt
[6]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#decrypt
[7]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#coerce
[8]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#convert
[9]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#enrichment
[10]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#ip
[11]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#parse
[12]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#event
[13]: /ja/observability_pipelines/legacy/reference/processing_language/functions/#path
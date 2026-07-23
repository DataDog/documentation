---
title: リマッパー
---

## 概要 

リマッパープロセッサーは、任意のソース属性やタグを、別のターゲット属性やタグにリマップします。例えば、`user` を `firstname` にリマップして、イベントエクスプローラーのログをターゲットにすることができます。

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="リマップ後の属性" style="width:60%;">}}

追加の制約、例えば `:` や `,` などは、ターゲットタグ/属性名に使用することは許可されていません。

リマッパーのターゲットが属性の場合、リマッパーは値を新しい型（`String`、`Integer`、`Double`）への変換を試みることができます。型変換できない場合、元の型が保持されます。

**注**: `Double` の小数点以下の桁数は `.` である必要があります。


[**Pipelines** ページ][1]で、リマッパープロセッサーを定義します。たとえば、`user` を `user.firstname` に再マップします。

{{< img src="logs/log_configuration/processor/remapper.png" alt="属性リマッパープロセッサー" style="width:80%;" >}}

[1]: https://app.datadoghq.com/event/settings/pipelines
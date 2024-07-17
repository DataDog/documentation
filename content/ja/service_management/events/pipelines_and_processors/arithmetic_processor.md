---
kind: ドキュメント
title: 算術演算プロセッサー
---

Use the arithmetic processor to add a new attribute (without spaces or special characters in the new attribute name) to an event with the result of the provided formula. This remaps different time attributes with different units into a single attribute, or compute operations on attributes within the same event.

算術演算プロセッサー式には、括弧および基本的な算術演算子 `-`、`+`、`*`、`/` を使用できます。

デフォルトでは、属性がない場合は計算がスキップされます。*Replace missing attribute by 0* を選択すると、属性値がない場合は自動的に 0 を挿入して、常に計算が行われます。

**注**:

* An attribute may be listed as missing if it is not found in the event attributes, or if it cannot be converted to a number.
* 演算子 `-` は、属性名にも使用されるため、式内ではスペースで区切る必要があります。
* ターゲット属性が既に存在している場合は、式の結果で上書きされます。
* 結果は小数第 9 位に丸められます。たとえば、式の結果が `0.1234567891` の場合、実際に属性に格納される値は `0.123456789` になります。
* 測定単位の拡張が必要な場合は、スケールフィルターを使用してください。

**Example arithmetic processor**

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="算術演算プロセッサー" style="width:80%;">}}
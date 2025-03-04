---
aliases:
- /ja/developers/faq/what-best-practices-are-recommended-for-naming-metrics-and-tags
further_reading:
- link: /metrics/
  tag: Documentation
  text: Datadog メトリクスの詳細
- link: /getting_started/tagging/
  tag: Documentation
  text: タグの概要
title: メトリクスやタグの命名で推奨されるベストプラクティス
---

命名規則は一種の芸術であり、合意に至るまでが最も難しい選択の一つであるかもしれません。メトリクス、タグ、サービスの命名規則を定義することは、クリーンで、読みやすく、保守可能なテレメトリーデータを持つために非常に重要です。以下は推奨事項です。

* 説明的で意味のある名前を用いる: メトリクスやタグはその値の目的や意味を明確に表すべきです。
* 以下のフォーマットと制限を遵守してください。
* 複数の意味を持つ可能性のある略語は避けます
* すべてのチーム、アプリ、サービスの一貫性を維持します。
* 他のタグやメトリクスと衝突する可能性のある予約済みキーワードは避けます。
* メトリクスについては、データを生成するアプリケーションやサービスを示すネームスペースを接頭辞として付けてください。
* あらゆる種類の個人情報や機密情報の使用は避けてください。

## メトリクスの命名規則とベストプラクティス

* メトリクス名は文字で開始する必要があります。
* ASCII 英数字、アンダースコア、およびピリオドのみを含むことができます。その他の文字は、アンダースコアに変換されます。
* 200 文字を超えてはなりません (UI の観点から、通常 100 文字未満をお勧めします)。
* Unicode はサポートされません。

Agent によって報告されるメトリクスは、擬似階層ドット形式 (例: `http.nginx.response_time`) で表されます。これを擬似階層として記述する目的は、実際に階層が適用されるわけではないが、階層構造を使用して何らかの関係を推定できるようにするためです (例: 「hostA と hostB は `http.nginx.*` を報告しているから、Web フロントエンドだろう」)。

**注**: Datadog のメトリクス名は大文字と小文字が区別されます。

## タグの命名規則とベストプラクティス

Datadog では、タグを付ける際のベストプラクティスとして、統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][1]をご参照ください。

* タグは文字で開始する必要があります。
* 英数字、アンダースコア、マイナス記号、コロン、ピリオド、およびスラッシュを含むことができます。その他の文字は、アンダースコアに変換されます。
* 末尾のアンダースコアは、変換された文字からのものか、元のタグ値に含まれていたかに関係なく、削除されます。
* 隣接したアンダースコアは、1 つのアンダースコアにまとめられます。
* タグの長さは最大 200 文字 (キーと値の両方を含む) で、Unicode をサポートしています。この制限を超える文字は切り捨てられます。
* タグは小文字に変換されます。
* 機能を最大限に活用するために、`key:value` 構文の使用をお勧めします。

よく使用されるメトリクスタグキーは、`instance`、`name`、`role` などです。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
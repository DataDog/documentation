---
title: メトリクスやタグの命名で推奨されるベストプラクティス
kind: faq
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: Datadog メトリクスの詳細
  - link: /tagging
    tag: Documentation
    text: タグの概要
aliases:
  - /ja/developers/faq/what-best-practices-are-recommended-for-naming-metrics-and-tags
---
メトリクスやタグの命名に関して、いくつかのベストプラクティスをお勧めします。

**メトリクスの命名規則とベストプラクティス**

* メトリクス名は文字で開始する必要があります。
* ASCII 英数字、アンダースコア、およびピリオドのみを含むことができます。その他の文字は、アンダースコアに変換されます。
* 200 文字を超えてはなりません (UI の観点から、通常 100 文字未満をお勧めします)。
* Unicode はサポートされません。
* スペースは避けることをお勧めします。

Agent によって報告されるメトリクスは、擬似階層ドット形式 (例: `http.nginx.response_time`) で表されます。これを擬似階層として記述する目的は、実際に階層が適用されるわけではないが、階層構造を使用して何らかの関係を推定できるようにするためです (例: 「hostA と hostB は 'http.nginx.\*' を報告しているから、Web フロントエンドだろう」)。

**注**: Datadog のメトリクス名は大文字と小文字が区別されます。

**タグの命名規則とベストプラクティス**

* タグは文字で開始する必要があります。
* 英数字、アンダースコア、マイナス記号、コロン、ピリオド、およびスラッシュを含むことができます。その他の文字は、アンダースコアに変換されます。
* タグは最大 200 文字で、Unicode をサポートします。
* タグは小文字に変換されます。
* 機能を最大限に活用するために、`key:value` 構文の使用をお勧めします。

よく使用されるメトリクスタグキーとして、`env`、`instance`、`name`、`role` があります。

{{< partial name="whats-next/whats-next.html" >}}
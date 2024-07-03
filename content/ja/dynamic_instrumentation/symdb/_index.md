---
further_reading:
- link: /dynamic_instrumentation/
  tag: Documentation
  text: Learn more about Dynamic Instrumentation
is_beta: true
private: true
title: Symbol Database
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Symbol Database はサポートされていません。</div>
{{< /site-region >}}

{{< beta-callout-private url="https://forms.gle/UG9EELAy8Li6z2jW8" >}}
ダイナミックインスツルメンテーションプローブ作成時のユーザーエクスペリエンスの改善にご興味がおありですか？こちらから、Symbol Database の非公開データ版にご参加ください。
{{< /beta-callout-private >}}

## 概要

Symbol Database は、検索やオートコンプリートといった IDE 同様の機能を追加することで、[ダイナミックインスツルメンテーション][1]のユーザーエクスペリエンスを向上させます。

Symbol Database は、アプリケーションから Datadog に機密でないシンボルやメタデータをアップロードします。アップロードされるデータには、クラス、メソッド、属性、フィールド、ローカル変数の名前のほか、行番号などの関連するメタデータが含まれます。

## はじめに

### 前提条件

Symbol Database には以下が必要です。

- サービスで[ダイナミックインスツルメンテーション][1]が有効になっていること。
- [Datadog Agent][2] 7.45.0 以降がサービスと一緒にインストールされていること。
- その Agent で[リモート構成][3]が有効になっていること。
- [統合サービスタグ付け][4]タグ `service`、`env`、`version` がデプロイメントに適用されていること。

### サービスで Symbol Database を有効にする

以下でランタイムを選択します。

{{< partial name="dynamic_instrumentation/symbol-database-languages.html" >}}

## Symbol Database を使ってみる

Symbol Database は、より IDE に近い形で使用でき、ダイナミックインスツルメンテーションのユーザーエクスペリエンスが向上します。

Symbol Database は、クラス名およびメソッド名の検索機能を提供します。
{{< img src="dynamic_instrumentation/symdb_method_search.png" alt="ダイナミックインスツルメンテーションログプローブ作成時のメソッドの検索" style="width:60%;" >}}

ダイナミックインスツルメンテーションの構成でメソッドを選択すると、そのメソッドのコードが表示されます。
{{< img src="dynamic_instrumentation/symdb_method_highlight.png" alt="Symbol Database で選択したメソッドがハイライト表示" >}}

また、Symbol Database は、ログテンプレートや[ダイナミックインスツルメンテーション式言語][5]を使用するその他のテンプレートを対象に、オートコンプリート機能も提供します。
{{< img src="dynamic_instrumentation/symdb_completion.png" alt="ログテンプレートを対象としたオートコンプリートによる提案" style="width:80%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dynamic_instrumentation/
[2]: /ja/agent/
[3]: /ja/agent/remote_config/
[4]: /ja/getting_started/tagging/unified_service_tagging/
[5]: /ja/dynamic_instrumentation/expression-language
[6]: https://github.com/DataDog/dd-trace-java
[7]: https://github.com/DataDog/dd-trace-py
[8]: https://github.com/DataDog/dd-trace-dotnet
[9]: /ja/integrations/guide/source-code-integration/
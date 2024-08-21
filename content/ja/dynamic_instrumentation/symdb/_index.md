---
further_reading:
- link: /dynamic_instrumentation/
  tag: ドキュメント
  text: Dynamic Instrumentation について
is_beta: true
private: false
title: オートコンプリートと検索機能
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではオートコンプリートと検索機能はサポートされていません。</div>
{{< /site-region >}}

{{< beta-callout url="#" btn_hidden="true" >}}
オートコンプリートと検索機能は公開ベータ版です。
{{< /beta-callout >}}

## 概要

オートコンプリートと検索機能により、クラスやメソッドの検索、[Dynamic Instrumentation 式言語][5]のオートコンプリートなど、IDE のような機能が追加され、[Dynamic Instrumentation[1] のユーザーエクスペリエンスが向上します。

オートコンプリートと検索機能を提供するために、アプリケーションから Datadog に機密でないシンボルやメタデータがアップロードされます。アップロードされるデータには、クラス、メソッド、属性、フィールド、ローカル変数の名前のほか、行番号などの関連するメタデータが含まれます。

## はじめに

### 前提条件

オートコンプリートと検索機能を使用するには、次のものが必要です。

- サービスで[ダイナミックインスツルメンテーション][1]が有効になっていること。
- [Datadog Agent][2] 7.45.0 以降がサービスと一緒にインストールされていること。
- その Agent で[リモート構成][3]が有効になっていること。
- [統合サービスタグ付け][4]タグ `service`、`env`、`version` がデプロイメントに適用されていること。

### サービスに対してオートコンプリートと検索機能を有効にする

以下でランタイムを選択します。

{{< partial name="dynamic_instrumentation/symbol-database-languages.html" >}}

## オートコンプリートと検索機能を試す

オートコンプリートと検索機能は、より IDE に近い形で使用でき、Dynamic Instrumentation のユーザーエクスペリエンスが向上します。

Dynamic Instrumentation は、クラス名およびメソッド名の検索機能を提供します。
{{< img src="dynamic_instrumentation/symdb_method_search.png" alt="Dynamic Instrumentation ログプローブ作成時のメソッドの検索" style="width:60%;" >}}

Dynamic Instrumentation の構成でメソッドを選択すると、そのメソッドのコードが表示されます。
{{< img src="dynamic_instrumentation/symdb_method_highlight.png" alt="Dynamic Instrumentation で選択したメソッドがハイライト表示" >}}

また、Dynamic Instrumentation は、ログテンプレートや [Dynamic Instrumentation 式言語][5]を使用するその他のテンプレートを対象に、オートコンプリート機能も提供します。
{{< img src="dynamic_instrumentation/symdb_completion.png" alt="ログテンプレートを対象としたオートコンプリートによる提案" style="width:80%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dynamic_instrumentation/
[2]: /ja/agent/
[3]: /ja/agent/remote_config/
[4]: /ja/getting_started/tagging/unified_service_tagging/
[5]: /ja/dynamic_instrumentation/expression-language
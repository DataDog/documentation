---
aliases:
- /ja/dynamic_instrumentation/symdb
- /ja/tracing/dynamic_instrumentation/symdb
description: 開発者体験を向上させるため、Dynamic Instrumentation 向けに IDE のようなオートコンプリートと検索機能を有効にします。
further_reading:
- link: /dynamic_instrumentation/
  tag: ドキュメント
  text: Dynamic Instrumentation について
is_beta: true
private: false
site_support_id: autocomplete_search
title: オートコンプリートと検索機能
---
{{< callout url="#" btn_hidden="true" >}}
オートコンプリートと検索機能は、Python および .NET 向けにプレビュー版として提供されています。
{{< /callout >}}

## 概要{#overview}

オートコンプリートと検索機能により、クラスやメソッドの検索、[Dynamic Instrumentation 式言語][5]のオートコンプリートなど、IDE のような機能が追加され、[Dynamic Instrumentation[1] のユーザーエクスペリエンスが向上します。

オートコンプリートと検索機能を提供するため、機密情報を含まないシンボルとメタデータがアプリケーションから Datadog にアップロードされます。アップロードされるデータには、クラス、メソッド、引数、フィールド、ローカル変数の名前に加え、行番号などの関連メタデータが含まれます。

## はじめに {#getting-started}

### 前提条件{#prerequisites}

オートコンプリートと検索機能を使用するには、次のものが必要です。

- サービスで[Dynamic Instrumentation][1]が有効になっていること。
- [Datadog Agent][2] 7.49.0 以降がサービスと一緒にインストールされていること。
- その Agent で[Remote Configuration][3]が有効になっていること。
- [unified service tagging][4]のタグ `service`、`env`、`version` がデプロイメントに適用されていること。

### サービスに対してオートコンプリートと検索機能を有効にする {#enable-autocomplete-and-search-for-your-service}

以下でランタイムを選択します。

{{< card-grid card_width="170px" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/dotnet" src="integrations_logos/dotnet-core.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/dotnet" src="integrations_logos/dotnet-framework.png" alt="Dotnet" >}}
{{< /card-grid >}}

## オートコンプリートと検索機能を試す {#explore-autocomplete-and-search}

オートコンプリートと検索機能により、Dynamic Instrumentation が IDE のように動作するようになります。

- **クラスとメソッドの検索**: インスツルメンテーションを追加する場所を見つけます。
- **コード表示**: Dynamic Instrumentation の設定でメソッドを選択すると、Datadog がそのメソッドのコードを表示します。
- **式のオートコンプリート**: [Dynamic Instrumentation expression language][5]を使用する式テンプレートの候補を取得します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dynamic_instrumentation/
[2]: /ja/agent/
[3]: /ja/tracing/guide/remote_config
[4]: /ja/getting_started/tagging/unified_service_tagging/
[5]: /ja/dynamic_instrumentation/expression-language
---
aliases:
- /ja/dynamic_instrumentation/symdb/dotnet
- /ja/tracing/dynamic_instrumentation/symdb/dotnet
code_lang: dotnet
code_lang_weight: 30
description: .NET アプリケーションを設定して、Dynamic Instrumentation の IDE ライクなオートコンプリートおよび検索機能を有効にします。
is_beta: true
private: false
title: .NET 向けのオートコンプリートと検索機能を有効にします。
type: multi-code-lang
---
{{< callout url="#" btn_hidden="true" >}}
オートコンプリートと検索機能はプレビュー版です。
{{< /callout >}}

## 要件 {#requirements}

- お使いのサービスで [Dynamic Instrumentation][1] が有効になっていること。
- トレーシングライブラリ [`dd-trace-dotnet`][6] 2.58.0 以降がインストールされていること。

## インストール {#installation}

Dynamic Instrumentation を有効にした状態でサービスを実行し、さらにオートコンプリートと検索機能も有効にします。

1. 環境変数 `DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true` を設定します。
2. `DD_SERVICE` および `DD_VERSION` [Unified Service Tags][5] を指定します。
3. Dynamic Instrumentation とオートコンプリートおよび検索機能を有効にしてサービスを起動したら、[{{< ui >}}APM{{< /ui >}} > {{< ui >}}Dynamic Instrumentation{{< /ui >}}][4] ページで Dynamic Instrumentation の IDE ライクな機能を利用できます。

## 追加の構成 {#additional-configuration}

### サードパーティ検出 {#third-party-detection}

パッケージやモジュールのオートコンプリート候補が表示されない場合、それらが誤ってサードパーティ製コードとして認識されている可能性があります。オートコンプリートや検索機能では、サードパーティ製コードを除外するためにヒューリスティックが使用されていますが、これにより意図せず誤分類されてしまうことがあります。

コードが正しく認識され、オートコンプリートと検索が正確に機能するよう、次の設定オプションを使用してサードパーティ検出設定を構成できます。

```shell
export DD_THIRD_PARTY_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

リストとは、パッケージプレフィックスをカンマで区切ったものを指します。例：

```shell
export DD_THIRD_PARTY_EXCLUDES=com.mycompany,io.mycompany
```

[1]: /ja/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-dotnet
---
aliases:
- /ja/dynamic_instrumentation/symdb/python
- /ja/tracing/dynamic_instrumentation/symdb/python
code_lang: python
code_lang_weight: 20
description: Python アプリケーションを設定して、Dynamic Instrumentation の IDE ライクなオートコンプリートおよび検索機能を有効にします。
is_beta: true
private: false
title: Python 向けのオートコンプリートと検索機能を有効化する
type: multi-code-lang
---
{{< callout url="#" btn_hidden="true" >}}
オートコンプリートと検索機能はプレビュー版です。
{{< /callout >}}

## 要件 {#requirements}

- お使いのサービスで [Dynamic Instrumentation][1] が有効になっていること。
- トレーシングライブラリ [`dd-trace-py`][6] 2.9.0 以降がインストールされていること。

## インストール {#installation}

Dynamic Instrumentation を有効にした状態でサービスを実行し、さらにオートコンプリートと検索機能も有効にします。

1. 環境変数 `DD_DYNAMIC_INSTRUMENTATION_ENABLED` を `true` に設定して、Dynamic Instrumentation を有効にした状態でサービスを実行します。
2. `DD_SERVICE` および `DD_VERSION` [Unified Service Tags][5] を指定します。
3. サービスを呼び出します。

  ```shell
  export DD_SERVICE=<YOUR_SERVICE>
  export DD_ENV=<YOUR_ENV>
  export DD_VERSION=<YOUR_VERSION>
  export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
  export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true
  ddtrace-run python -m myapp
  ```

必要な機能を有効化してサービスを起動したら、[{{< ui >}}APM{{< /ui >}} > {{< ui >}}Dynamic Instrumentation{{< /ui >}}][4] ページで Dynamic Instrumentation の IDE ライクな機能を利用できるようになります。

## 追加の構成 {#additional-configuration}

### サードパーティ検出 {#third-party-detection}

パッケージやモジュールのオートコンプリート候補が表示されない場合、それらが誤ってサードパーティ製コードとして認識されている可能性があります。オートコンプリートや検索機能では、サードパーティ製コードを除外するためにヒューリスティックが使用されていますが、これにより意図せず誤分類されてしまうことがあります。

コードが正しく認識され、オートコンプリートと検索が正確に機能するよう、次の設定オプションでサードパーティ検出を調整してください。

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=<LIST_OF_USER_CODE_MODULES>
export DD_THIRD_PARTY_DETECTION_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>
```

ここで `<LIST_OF_USER_CODE_MODULES>` と `<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>` は、パッケージプレフィックスのカンマ区切りリストです。例:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=shopping,database
```

[1]: /ja/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-py
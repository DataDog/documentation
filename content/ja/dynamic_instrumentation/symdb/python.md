---
code_lang: python
code_lang_weight: 10
is_beta: true
private: false
title: Python 向けのオートコンプリートと検索を有効化する
type: multi-code-lang
---
{{< beta-callout url="#" btn_hidden="true" >}}
オートコンプリートと検索機能は公開ベータ版です。
{{< /beta-callout >}}

## 要件

- サービスで[ダイナミックインスツルメンテーション][1]が有効になっていること。
- トレーシングライブラリ [`dd-trace-py`][6] 2.9.0 以上がインストールされていること。

## インストール

Dynamic Instrumentation を有効にし、さらにオートコンプリートと検索を有効にしてサービスを起動します。

1. `DD_DYNAMIC_INSTRUMENTATION_ENABLED` 環境変数を `true` に設定して Dynamic Instrumentation を有効にした状態でサービスを実行します。
2. [Unified Service Tags][5] を使用して `DD_SERVICE` と `DD_VERSION` を指定します。
3. サービスを呼び出します。

  ```shell
  export DD_SERVICE=<YOUR_SERVICE>
  export DD_ENV=<YOUR_ENV>
  export DD_VERSION=<YOUR_VERSION>
  export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
  export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true
  ddtrace-run python -m myapp
  ```

必要な機能を有効化してサービスを起動したら、[**APM** > **Dynamic Instrumentation**][4] ページで Dynamic Instrumentation の IDE ライクな機能を利用できます。

## 追加構成

### サードパーティ検出

パッケージやモジュールに対してオートコンプリート候補が表示されない場合、サードパーティコードとして誤認されている可能性があります。オートコンプリートと検索機能はヒューリスティックを用いてサードパーティコードを除外しますが、まれに誤分類が発生します。

コードが正しく認識され、オートコンプリートと検索が正確に機能するよう、次の設定オプションでサードパーティ検出を調整してください。

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=<LIST_OF_USER_CODE_MODULES>
export DD_THIRD_PARTY_DETECTION_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>
```

`<LIST_OF_USER_CODE_MODULES>` と `<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>` にはパッケージ接頭辞をカンマ区切りで指定します。例:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=shopping,database
```

[1]: /ja/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-py
---
title: Enable Dynamic Instrumentation for .NET
aliases:
    - /tracing/dynamic_instrumentation/enabling/dotnet/
is_beta: false
private: false
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: agent
      tag: Documentation
      text: Getting Started with Datadog Agent
---

ダイナミックインスツルメンテーションは、Datadog のトレーシングライブラリをサポートする機能です。すでに [APM を使用してアプリケーションのトレースを収集][1]している場合は、Agent とトレーシングライブラリが必要なバージョンであることを確認し、ステップ 4 のダイナミックインスツルメンテーションの有効化に直接進みます。

## インストール

1. Agent のバージョン[7.44.0][2] 以上をインストールするか、アップグレードします。
2. まだ APM を有効にしていない場合は、Agent の構成で `DD_APM_ENABLED` 環境変数を `true` に設定し、ポート `8126/TCP` をリッスンします。
3. Install or upgrade the .NET tracing libraries to version 2.42, by following the relevant instructions for [.NET Framework][2] or [.NET Core][3].

   **Note**: Dynamic Instrumentation is available in the `dd-trace-dotnet` library in versions 2.42.0 and later.

4. `DD_DYNAMIC_INSTRUMENTATION_ENABLED` 環境変数を `true` に設定し、ダイナミックインスツルメンテーションを有効にしてサービスを稼働させます。`DD_SERVICE`、`DD_ENV`、`DD_VERSION` の統合サービスタグを指定すると、プローブをフィルターしたりグループ化したり、アクティブなクライアントをこれらの次元でターゲットにすることができるようになります。
5. ダイナミックインスツルメンテーションを有効にした状態でサービスを起動すると、[APM > ダイナミックインスツルメンテーションページ][4]でダイナミックインスツルメンテーションの利用を開始することができます。

## 構成

以下の環境変数を使用してダイナミックインスツルメンテーションを構成します。

| 環境変数                             | タイプ          | 説明                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Boolean       | ダイナミックインスツルメンテーションを有効にするには、`true` に設定します。                                                                          |
| `DD_SERVICE`                                     | 文字列        | [サービス][5]名 (例: `web-backend`)。                                                                        |
| `DD_ENV`                                         | 文字列        | [環境][5]名 (例: `production`)。                                                                     |
| `DD_VERSION`                                     | 文字列        | サービスの[バージョン][5]。                                                                                         |
| `DD_TAGS`                                        | 文字列        | 生成されたデータに適用するタグ。タグは `<key>:<value>` をカンマで区切ったリストである必要があります。例: `layer:api,team:intake`   |

## 次にやるべきこと

スナップショットやメトリクスプローブの設定、データの参照やインデックス作成については、[ダイナミックインスツルメンテーション][6]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/dd_libraries/dotnet-framework/
[3]: /tracing/trace_collection/dd_libraries/dotnet-core/
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /getting_started/tagging/unified_service_tagging
[6]: /dynamic_instrumentation/

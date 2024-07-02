---
title: Synthetic APM
kind: ドキュメント
description: Synthetic モニタリングを使用した APM と分散型トレーシング
aliases:
- /synthetics/apm
further_reading:
  - link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /tracing/
    tag: ドキュメント
    text: APM と分散型トレーシング
  - link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
    tag: ガイド
    text: クロスプロダクト相関で容易にトラブルシューティング。

---

{{< img src="synthetics/apm/synthetics-apm.mp4" alt="APM と Synthetic モニタリング" video="true" >}}

## 概要

Synthetic モニタリングとの APM インテグレーションを使用すると、失敗したテストランから生成されたトレースを見ることで、テストランが失敗した問題の根本原因を探ることができます。

ネットワーク関連の仕様 (テストから) に加えてバックエンド、インフラストラクチャー、ログの情報 (トレースから) を得ることで、ユーザーが目にしたのと同じようにアプリケーションが挙動する詳細な様子を確認することができます。

## 使用方法

本ページの記述は、APM の [HTTP API テスト][1]、[Multistep API テスト][2]、[ブラウザテスト][3]に適用されます。

### 前提条件

* サービス、およびテストを実行するエンドポイントが [APM 側でトレースされていること][4]。
* サービスが HTTP サーバーを使用していること。
* HTTP サーバーで、分散型トレーシングをサポートするライブラリが使用されていること。

トレースされている HTTP サーバーを対象とするテストを作成します。Datadog は、サーバーによって生成されたトレースを、対応するテスト結果に自動的にリンクします。

ブラウザテストの結果をリンクするには、APM インテグレーションヘッダーを追加する URL を許可します。これは、[Synthetic の設定][5]で行うことができます。 ワイルドカードには `*` を使用してください。

```text
https://*.datadoghq.com/*
```

## サポートされるライブラリ

以下の Datadog トレーシングライブラリがサポートされています。

| ライブラリ                             | 最小バージョン                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Python][6]                  | [0.50.4][7]                |
| [Go][8]                  | [1.10.0][9]                |
| [Java][10]                  | [0.24.1][11]                |
| [Ruby][12]                  | [0.20.0][13]                |
| [Node.js][14]                  | [0.10.0][15]                |
| [PHP][16]                  | [0.33.0][17]                |
| [.NET][18]                  | [1.18.2][19]                |

### トレースとテストのリンク方法

Datadog は、分散型トレーシングプロトコルを使用し、以下の HTTP ヘッダーを設定します。


{{< tabs >}}
{{% tab "Datadog" %}}
`x-datadog-trace-id`
: Synthetic モニタリングバックエンドから生成されます。このヘッダーを使用して、トレースがテスト結果にリンクされます。

`x-datadog-parent-id: 0`
: Synthetic テストを生成されたトレースのルートスパンにします。

`x-datadog-origin: synthetics`
: API テストから生成されたトレースを識別します。これらのトレースのスパンには `ingestion_reason:synthetics` というタグが付けられます。

`x-datadog-origin: synthetics-browser`
: ブラウザテストから生成されたトレースを識別します。これらのトレースには `ingestion_reason:synthetics-browser` というタグが付けられます。

`x-datadog-sampling-priority: 1`
: Agent がトレースを保持できるようにします。
{{% /tab %}}
{{% tab "W3C Trace Context" %}}
`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: 現行の仕様では、バージョンは `00` に設定することを想定しています。
: `trace id`: 128 ビットのトレース ID (16 進数で 32 桁)。ソーストレース ID は APM との互換性を維持するため 64 ビットになっています。
: `parent id`: 64 ビットのスパン ID (16 進数で 16 桁)。
: `trace flags`: サンプリングあり (`01`)、またはサンプリングなし (`00`)

**例**:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{< /tabs >}}

### トレースの保持期間

これらのトレースは、[従来の APM のトレースと同じように][20] `Synthetics Default` という保持フィルターで 15 日間保持されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: /synthetics/api_tests/http_tests/?tab=requestoptions
[2]: /synthetics/multistep?tab=requestoptions
[3]: /synthetics/browser_tests/
[4]: /tracing/
[5]: https://app.datadoghq.com/synthetics/settings/integrations
[6]: /tracing/trace_collection/dd_libraries/python/
[7]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.50.4
[8]: /tracing/trace_collection/dd_libraries/go/
[9]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[10]: /tracing/trace_collection/dd_libraries/java/
[11]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[12]: /tracing/trace_collection/dd_libraries/ruby/
[13]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[14]: /tracing/trace_collection/dd_libraries/nodejs/
[15]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[16]: /tracing/trace_collection/dd_libraries/php/
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[18]: /tracing/trace_collection/dd_libraries/dotnet-core/
[19]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[20]: /tracing/trace_pipeline/trace_retention/

---
aliases:
- /ja/synthetics/apm
description: Synthetic Monitoring を使用した APM と分散型トレーシング
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic Monitoring の紹介
- link: /tracing/
  tag: ドキュメント
  text: APM と分散型トレーシング
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。
products:
- icon: synthetics
  name: HTTP API テスト
  url: /synthetics/api_tests/http_tests/
- icon: synthetics
  name: マルチステップ API テスト
  url: /synthetics/multistep/
- icon: browser
  name: ブラウザテスト
  url: /synthetics/browser_tests/
title: Synthetic APM
---
{{< product-availability >}}

{{< img src="synthetics/apm/synthetics_apm_new.mp4" alt="失敗した API テスト: [トレース] (Trace) タブのサイドパネルに、テスト実行によって生成された APM トレースが、複数サービス間でのスパンを色分けして表示されているところ" video="true" >}}

## 概要{#overview}

Synthetic Monitoring との APM インテグレーションを使用すると、失敗したテスト実行から生成されたトレースを見ることで、テスト実行が失敗した問題の根本原因を探ることができます。

ネットワーク関連の仕様 (テストから) に加えてバックエンド、インフラストラクチャー、ログの情報 (トレースから) を得ることで、ユーザーが目にしたのと同じようにアプリケーションが挙動する詳細な様子を確認することができます。

## 使用方法 {#usage}

### 前提条件{#prerequisites}

* サービス、およびテストを実行するエンドポイントが [APM 側でトレースされていること][4]。
* サービスが HTTP サーバーを使用していること。
* HTTP サーバーで、分散型トレーシングをサポートするライブラリが使用されていること。

トレースされている HTTP サーバーを対象とするテストを作成します。Datadog は、サーバーによって生成されたトレースを、対応するテスト結果に自動的にリンクします。

ブラウザテストの結果をリンクするには、APM インテグレーションヘッダーを追加する URL を許可します。これは、[{{< ui >}}Synthetic Settings{{< /ui >}}][5] (Synthetic の設定) で実行できます。

ワイルドカードには `*` を使います。ドメインにおいて `*` は、単一のサブドメインラベルに一致します。ドットをまたいでは一致しません。URL パスの中で `*` は、`/` を含む任意の文字に一致します。

たとえば、`https://*.datadoghq.com/*` を追加した場合、
| URL | 可能/不可能 | 理由 |
| --- | --- | --- |
| `https://www.datadoghq.com/product` | 可能 | `*` は単一ラベル `www` | に一致
| `https://www.datadoghq.com/product/synthetic-monitoring` | 可能 |  URL パスのワイルドカードは `/` | をまたいで一致
| `https://www.docs.datadoghq.com/synthetics` | 不可能 | `*` はドットを含む `www.docs` に一致しない |

## サポートされているライブラリ {#supported-libraries}

サポートされる Datadog SDK は以下のとおりです。

| ライブラリ                             | 最小バージョン                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Python][6]                  | [0.50.4][7]                |
| [Go][8]                  | [1.10.0][9]                |
| [Java][10]                  | [0.24.1][11]                |
| [Ruby][12]                  | [0.20.0][13]                |
| [Node.js][14]                  | [0.10.0][15]                |
| [PHP][16]                  | [0.33.0][17]                |
| [.NET][18]                  | [1.18.2][19]                |

### トレースとテストのリンク方法{#how-are-traces-linked-to-tests}

Datadog は、分散型トレーシングプロトコルを使用し、以下の HTTP ヘッダーを設定します。


{{< tabs >}}
{{% tab "Datadog" %}}
`x-datadog-trace-id`
: Synthetic Monitoring バックエンドから生成されます。Datadog がトレースをテスト結果にリンクできるようにします。

`x-datadog-parent-id: 0`
: Synthetic テストを生成されたトレースのルートスパンにします。

`x-datadog-origin: synthetics`
: API テストから生成されたトレースを識別します。これらのトレースからのスパンには、`ingestion_reason:synthetics` のタグが付けられます。

`x-datadog-origin: synthetics-browser`
: ブラウザテストから生成されたトレースを識別します。これらのトレースには、`ingestion_reason:synthetics-browser` のタグが付けられます。

`x-datadog-sampling-priority: 1`
:Agent がトレースを維持するようにします。
{{% /tab %}}
{{% tab "W3C Trace Context" %}}
`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: 仕様により、バージョンは `00` に設定されていると想定されています。
: `trace id`: 128 ビットのトレース ID (32 文字の 16 進数)。ソーストレース ID は 64 ビットで、APM との互換性を保つためです。
: `parent id`64 ビットのスパン ID (16 文字の 16 進数)。
: `trace flags`: サンプリングされた (`01`) またはサンプリングされていない (`00`)

**例**:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{< /tabs >}}

### トレースの保持期間{#how-long-are-traces-retained}

これらのトレースは、[従来の APM のトレースと同じように][20] {{< ui >}}Synthetics Default{{< /ui >}} という保持フィルターで 15 日間保持されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}



[4]: /ja/tracing/
[5]: https://app.datadoghq.com/synthetics/settings/integrations
[6]: /ja/tracing/trace_collection/dd_libraries/python/
[7]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.50.4
[8]: /ja/tracing/trace_collection/dd_libraries/go/
[9]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[10]: /ja/tracing/trace_collection/dd_libraries/java/
[11]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[12]: /ja/tracing/trace_collection/dd_libraries/ruby/
[13]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[14]: /ja/tracing/trace_collection/dd_libraries/nodejs/
[15]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[16]: /ja/tracing/trace_collection/dd_libraries/php/
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[18]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/
[19]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[20]: /ja/tracing/trace_pipeline/trace_retention/
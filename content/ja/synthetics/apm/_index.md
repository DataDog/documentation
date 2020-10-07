---
title: Synthetic APM
kind: documentation
description: Synthetic モニタリングを使用した APM と分散型トレーシング
aliases:
  - /ja/synthetics/apm
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /tracing/
    tag: ドキュメント
    text: APM と分散型トレーシング
---
{{< img src="synthetics/apm/synthetics-apm.mp4" alt="APM and Synthetic モニタリング" video="true"  >}}

## 概要

Synthetic モニタリングとの APM インテグレーションを使用すると、失敗したテストランから生成されたトレースを見ることで、テストランが失敗した問題の根本原因を探ることができます。

ネットワーク関連の仕様 (テストから) に加えてバックエンド、インフラストラクチャー、ログの情報 (トレースから) を得ることで、ユーザーが目にしたのと同じようにアプリケーションが挙動する詳細な様子を確認することができます。

## 使用方法

このページの内容は、どちらかに限定して説明する場合を除き、[API][1] と [ブラウザテスト][2]の両方に当てはまります。

### 前提条件

* サービス、およびテストを実行するエンドポイントが [APM 側でトレースされていること][3]。
* サービスが HTTP サーバーを使用していること。
* HTTP サーバーで、分散型トレーシングをサポートするライブラリが使用されていること。

トレースされている HTTP サーバーを対象とするテストを作成します。Datadog は、サーバーによって生成されたトレースを、対応するテスト結果に自動的にリンクします。

ブラウザテストの結果をリンクするには、APM インテグレーションヘッダーを追加する URL を許可します。ワイルドカードには `*` を使用してください。

```text
https://*.datadoghq.com/*
```

## サポートされているライブラリ

以下の Datadog トレーシングライブラリがサポートされています。

* [Python][4]
* [Go][5]
* [Java][6]
* [Ruby][7]
* [JavaScript][8]
* [PHP][9]
* [.NET][10]

### トレースとテストのリンク方法

Datadog は、分散型トレーシングプロトコルを使用し、以下の HTTP ヘッダーを設定します。

| ヘッダー                                 | 説明                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `x-datadog-trace-id`                   | Synthetic モニタリングバックエンドから生成されます。このヘッダーを使用して、トレースがテスト結果にリンクされます。                 |
| `x-datadog-parent-id: 0`               | Synthetic テストを生成されたトレースのルートスパンにします。                                                        |
| `x-datadog-origin: synthetics`         | API テストによって生成されたトレースが [APM クオータに影響しない](#how-are-apm-quotas-affected)ようにします。     |
| `x-datadog-origin: synthetics-browser` | ブラウザテストによって生成されたトレースが [APM クオータに影響しない](#how-are-apm-quotas-affected)ようにします。 |
| `x-datadog-sampling-priority: 1`       | [Agent がトレースを維持するようにします][11]。                                                                      |

### APM クオータへの影響

`x-datadog-origin: synthetics` ヘッダーは、トレースが合成的に生成されることを APM バックエンドに通知します。このため、生成されたトレースは従来の APM クオータに影響しません。

### トレースの保持期間

これらのトレースは、[従来の APM トレースと同様に][12]保持されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/synthetics/browser_tests/
[3]: /ja/tracing/
[4]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[5]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[7]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[8]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[9]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[10]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[11]: /ja/tracing/guide/trace_sampling_and_storage/#how-it-works
[12]: /ja/tracing/guide/trace_sampling_and_storage/#trace-storage
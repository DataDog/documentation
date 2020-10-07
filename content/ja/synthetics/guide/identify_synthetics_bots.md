---
title: Synthetic ボットの特定
kind: ドキュメント
description: Synthetic 受信リクエストの特定
aliases:
  - /ja/synthetics/identify_synthetics_bots
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /synthetics/
    tag: Documentation
    text: チェックを管理する
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: ブラウザテストの設定
  - link: /synthetics/api_tests/
    tag: Documentation
    text: APIテストの設定
---
## 概要

一部のシステムでは、正しく識別を行わないとロボットが利用できない場合があります。Datadog ロボットから分析結果を収集する際に悪影響が及ぶため、以下を利用して Datadog ロボットの検出を行ってください。

* リクエストに含まれる[ヘッダー](#ヘッダー)。Datadog ロボットの全リクエストにはヘッダーが付加されます。
* Datadog の [**Synthetic モニタリング IP 範囲**][1]。
* API とブラウザテストのカスタムヘッダー設定に用いる**高度なオプション**コンフィギュレーション。ローカルで API テストに**クッキー、ヘッダー、または Basic 認証**を、ブラウザテストに**クッキーとヘッダー**を追加することも可能です。
* `window._DATADOG_SYNTHETICS_BROWSER`: [アプリケーションコードの JavaScript 変数](#_DATADOG_SYNTHETICS_BROWSER 変数)。

## ヘッダー

Datadog ロボットのヘッダーから、API およびブラウザテストに紐付くロボットを検出します。

{{< tabs >}}
{{% tab "API Tests" %}}

Datadog API テストロボットには以下のヘッダーが付加されています。

`Sec-Datadog: Request sent by a Datadog Synthetic API Test (https://docs.datadoghq.com/synthetics/) - public_id: <SYNTHETIC_TEST_PUBLIC_ID>`

Datadog API テスト向けに発動されたすべてのリクエストには、`x-datadog-origin: synthetics` ヘッダーが付加されます。

{{% /tab %}}
{{% tab "Browser tests" %}}

Datadog ブラウザテストロボットには以下のヘッダーが付加されています。

`Sec-Datadog: Request sent by a Datadog Synthetic Browser Test (https://docs.datadoghq.com/synthetics/) - public_id: <SYNTHETIC_TEST_PUBLIC_ID>`

{{% /tab %}}
{{< /tabs >}}

### APM ヘッダー

APM が有効になっている場合、`x-datadog-trace-id` など、[**その他の APM に特有のヘッダー**][2]が API テスト向けに発動されたすべてのリクエストに付加されます。

## ブラウザ変数

Datadog ロボットがアプリケーションのレンダリングを行う際、`window._DATADOG_SYNTHETICS_BROWSER` 変数が `true` に設定されます。分析データからロボットのアクションを削除する場合は、以下のテストで分析ツールのコードをラップしてください。

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/synthetics.json
[2]: /ja/synthetics/apm/#how-are-traces-linked-to-tests
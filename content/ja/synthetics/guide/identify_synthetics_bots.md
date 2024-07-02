---
aliases:
- /ja/synthetics/identify_synthetics_bots
description: Synthetic 受信リクエストの特定
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: /synthetics/
  tag: Documentation
  text: Synthetic モニタリングについて
- link: /synthetics/browser_tests/
  tag: Documentation
  text: ブラウザテストの設定
- link: /synthetics/api_tests/
  tag: Documentation
  text: APIテストの設定
title: Synthetic ボットの特定
---

## 概要

システムの一部には、適切な識別情報を持たないロボットが利用できないものがあります。また、Datadog のロボットから分析を収集することを避けたい場合もあります。

Datadog の Synthetic Monitoring ロボットを検出するには、以下の方法を組み合わせてみてください。

## IP アドレス

Datadog で管理されている各場所に対応する **Synthetic モニタリング IP 範囲**を使用します。

```
https://ip-ranges.{{< region-param key="dd_site" >}}/synthetics.json
```

リストされた IP は、CIDR (Classless Inter-Domain Routing) 表記を使用しており、使用前に IPv4 アドレス範囲に変換する必要がある場合があります。新しい管理ロケーションの IP を除いて、リストされた IP が変更されることはほとんどありません。

リストされた IP が変更されたときに警告を受けたい場合は、上記のエンドポイントに `$.synthetics['prefixes_ipv4_by_location']['aws:ap-northeast-1'].length` などの JSONPath アサーションを指定して API テストを作成します。

## デフォルトのヘッダー

Synthetic テストで生成されたリクエストにアタッチされている**デフォルトのヘッダー**を使用して、Datadog ロボットを特定します。

### `user-agent`

デフォルトでは`user-agent` ヘッダーが Synthetic テストによって実行されるすべてのリクエストに追加されます。テストで追加されたカスタムの `user-agent` は、デフォルトのものを上書きします。

{{< tabs >}}
{{% tab "シングルおよびマルチステップ API テスト" %}}

シングルおよびマルチステップ API テストの場合、デフォルトの `user-agent` ヘッダーは `Datadog/Synthetics` です。

{{% /tab %}}
{{% tab "Browser tests" %}}

ブラウザテストの場合、デフォルトの `user-agent` ヘッダーの値は、テストを実行するブラウザとデバイスによって異なります。Synthetic テストを識別できるように、デフォルトの `user-agent` 値は常に `DatadogSynthetics` で終わります。

{{% /tab %}}
{{< /tabs >}}

### `sec-datadog`

Synthetic テストによって実行されるすべてのリクエストに `sec-datadog` ヘッダーが追加されます。この値には、リクエストの発信元であるテストの ID が含まれます。

{{< tabs >}}
{{% tab "シングルおよびマルチステップ API テスト" %}}

```
sec-datadog: Request sent by a Datadog Synthetics API Test (https://docs.datadoghq.com/synthetics/) - test_id: <SYNTHETIC_TEST_PUBLIC_ID>
```

{{% /tab %}}
{{% tab "Browser tests" %}}

```
sec-datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <SYNTHETIC_TEST_PUBLIC_ID>
```

{{% /tab %}}
{{< /tabs >}}

### APM ヘッダー

`x-datadog-origin: synthetics` など、[**その他の APM に特有のヘッダー**][1]も、Synthetic API およびブラウザにより生成されたリクエストに付加されます。

## リクエストのカスタマイズ

**custom headers**、**cookies**、**request bodies** などの**高度なオプション**で API およびブラウザテストのコンフィギュレーションを利用して、特定の識別子をテストリクエストに追加することが可能です。

## ブラウザ変数

Datadog ロボットがアプリケーションのレンダリングを行う際、`window._DATADOG_SYNTHETICS_BROWSER` 変数が `true` に設定されます。分析データからロボットのアクションを削除する場合は、以下のテストで分析ツールのコードをラップしてください。

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

Firefox で Synthetic ボットを特定するためにブラウザ変数を使用する場合、Datadog はコードの実行前にブラウザ変数が設定されていることを保証することができません。

## Cookie

ブラウザで適用されるクッキーには、`datadog-synthetics-public-id` と `datadog-synthetics-result-id` があります。

これらのクッキーは、Firefox のすべてのステップで利用可能です。Microsoft Edge と Google Chrome の場合、これらのクッキーは開始 URL に対してのみ設定されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/apm/#how-are-traces-linked-to-tests
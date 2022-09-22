---
title: Synthetic ボットの特定
kind: ドキュメント
description: Synthetic 受信リクエストの特定
aliases:
  - /ja/synthetics/identify_synthetics_bots
further_reading:
  - link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
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

一部のシステムでは、正しく識別を行わないとロボットが利用できない場合があるため、Datadog ロボットから分析結果を収集するには十分な注意が必要です。Datadog Synthetics モニタリングロボットを検出するには、以下の方法を使用します。

## IP アドレス

Datadog で管理されている各場所に対応する **Synthetic モニタリング IP 範囲**を使用できます。

```
https://ip-ranges.{{< region-param key="dd_site" >}}/synthetics.json
```

**注:** リストされている IP は CIDR 表記を使用しており、使用する前に IPv4 アドレス範囲への変換が必要になる場合があります。

**注:** 新しい管理ロケーション IP の場合を除いて、リストされている IP はめったに変更されません。それでもリストされた IP が変更されたときにアラートを受け取りたい場合は、`$.synthetics['prefixes_ipv4_by_location']['aws:ap-northeast-1'].length` のような JSONPath アサーションを使用して上記のエンドポイントで API テストを作成できます。

## デフォルトのヘッダー

Synthetic テストで生成されたリクエストにアタッチされている**デフォルトのヘッダー**を使用して、Datadog ロボットを特定することもできます。

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

Synthetic テストによって実行されるすべてのリクエストに `sec-datadog` ヘッダーが追加されます。この値には、特に、リクエストの発信元であるテストの ID が含まれます。

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

API およびブラウザテストのコンフィギュレーションの **高度なオプション** を利用して、特定の識別子をテストリクエストに追加することも可能です。たとえば、**custom headers**、**cookies**、**request bodies** を追加できます。

## ブラウザ変数

<div class="alert alert-warning">
ブラウザ変数は非推奨です。Datadog は、代わりに user-agent ヘッダーを使用することをお勧めします。
</div>

Datadog ロボットがアプリケーションのレンダリングを行う際、`window._DATADOG_SYNTHETICS_BROWSER` 変数が `true` に設定されます。分析データからロボットのアクションを削除する場合は、以下のテストで分析ツールのコードをラップしてください。

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/apm/#how-are-traces-linked-to-tests
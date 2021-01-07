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

一部のシステムでは、正しく識別を行わないとロボットが利用できない場合があるため、Datadog ロボットから分析結果を収集するには十分な注意が必要です。Datadog Synthetics モニタリングロボットを検出するには、以下の方法を使用します。

## IP アドレス

Datadog で管理されている各場所に対応する **Synthetic モニタリング IP 範囲**を使用できます。

```
https://ip-ranges.{{< region-param key="dd_site" >}}/synthetics.json
```

## デフォルトのヘッダー

API およびブラウザテストで生成されたリクエストにアタッチされている **デフォルトのヘッダー** を使用して、Datadog ロボットを特定することもできます。

{{< tabs >}}
{{% tab "API Tests" %}}

Datadog API テストロボットには以下のヘッダーが付加されています。

`sec-datadog: Request sent by a Datadog Synthetic API Test (https://docs.datadoghq.com/synthetics/) - test_id: <SYNTHETIC_TEST_PUBLIC_ID>`

`user-agent: Datadog/Synthetics` も不可されます。

{{% /tab %}}
{{% tab "Browser tests" %}}

Datadog ブラウザテストロボットには以下のヘッダーが付加されています。

`Sec-Datadog: Request sent by a Datadog Synthetic Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <SYNTHETIC_TEST_PUBLIC_ID>`

ブラウザのテストラン（ブラウザ、デバイス）のタイプにより異なる値を持つ `user-agent` ヘッダーも不可されます。

{{% /tab %}}
{{< /tabs >}}

### APM ヘッダー

`x-datadog-origin: synthetics` など、[**その他の APM に特有のヘッダー**][1]も、Synthetic API およびブラウザにより生成されたリクエストに付加されます。

## リクエストのカスタマイズ

API およびブラウザテストのコンフィギュレーションの **高度なオプション** を利用して、特定の識別子をテストリクエストに追加することも可能です。たとえば、**custom headers**、**cookies**、**request bodies** を追加できます。

## ブラウザ変数

Datadog ロボットがアプリケーションのレンダリングを行う際、`window._DATADOG_SYNTHETICS_BROWSER` 変数が `true` に設定されます。分析データからロボットのアクションを削除する場合は、以下のテストで分析ツールのコードをラップしてください。

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/apm/#how-are-traces-linked-to-tests
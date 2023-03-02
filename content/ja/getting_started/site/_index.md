---
further_reading:
- link: https://learn.datadoghq.com/courses/dd-201
  tag: ラーニングセンター
  text: 'Datadog 201: パワーユーザーになるために'
kind: documentation
title: Datadog サイトの概要
---

## 概要

Datadog では、世界中でさまざまなサイトを提供しています。各サイトは完全に独立しており、サイト間でデータを共有することはできません。各サイトを使用する利点があり（政府のセキュリティ規定など）、世界中の特定した場所にデータを保存することが可能になります。

## Datadog サイトにアクセスする

下記の表で、Datadog ウェブサイトの URL とサイト URL を対照させると、ご使用中のサイトがわかります。

{{< img src="getting_started/site/site.png" alt="ブラウザのタブに表示されるサイトの URL" style="width:40%" >}}

| サイト    | サイト URL                    | サイトパラメーター      | 場所 |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU       |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |

Datadog のトラフィックはすべて SSL (デフォルト 443) で以下のドメインに送信されます。

### ログ管理

| サイト | サイト URL                                      |
|------|-----------------------------------------------|
| US1  | https://logs.browser-intake-datadoghq.com     |
| US3  | https://logs.browser-intake-us3-datadoghq.com |
| US5  | https://logs.browser-intake-us5-datadoghq.com |
| EU1  | https://mobile-http-intake.logs.datadoghq.eu  |

### トレース

| サイト | サイト URL                                           |
|------|----------------------------------------------------|
| US1  | https://trace.browser-intake-datadoghq.com         |
| US3  | https://trace.browser-intake-us3-datadoghq.com     |
| US5  | https://trace.browser-intake-us5-datadoghq.com     |
| EU1  | https://public-trace-http-intake.logs.datadoghq.eu |

### RUM

| サイト | サイト URL                                     |
|------|----------------------------------------------|
| US1  | https://rum.browser-intake-datadoghq.com     |
| US3  | https://rum.browser-intake-us3-datadoghq.com |
| US5  | https://rum.browser-intake-us5-datadoghq.com |
| EU1  | https://rum-http-intake.logs.datadoghq.eu    |

## Datadog のドキュメントをサイト別に見る

Datadog サイトによって、インスタンスのセキュリティ要件に応じた異なる機能をサポートする場合があります。そのため、ドキュメントはサイトによって異なる場合があります。Datadog ドキュメントのどのページでも、右側のサイトセレクタードロップダウンメニューを使用して、情報を見たい Datadog サイトを選択することができます。

{{< img src="getting_started/site/site-selector.png" alt="ドキュメントサイトの右側にあるサイトセレクタードロップダウンメニュー" style="width:100%" >}}

例えば、Datadog for Government サイトのドキュメントを見るには、**US1-FED** を選択します。

{{< site-region region="gov" >}}

## Datadog for Government サイトにアクセスする

Datadog for Government Site (US1-FED) は、アメリカ政府機関およびパートナーがそのアプリケーションやインフラストラクチャーを監視するためのサイトです。Datadog for Government site のセキュリティおよびコンプライアンスコントロール、フレームワークに関する詳細や、FedRAMP への対応については、[セキュリティページ][1]をご参照ください。

[1]: https://www.datadoghq.com/security/
{{< /site-region >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
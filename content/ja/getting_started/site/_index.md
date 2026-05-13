---
algolia:
  tags:
  - site
  - datadog site
description: 地域やセキュリティ要件に応じたさまざまな Datadog サイトについて学び、政府準拠のオプションも含まれています。
further_reading:
- link: https://learn.datadoghq.com/courses/dashboards-slos
  tag: ラーニングセンター
  text: ダッシュボードと SLO を活用してビジネスに不可欠な洞察を得る
- link: /agent/configuration/dual-shipping/
  tag: ガイド
  text: デュアルシッピング
title: Datadog サイトの概要
---
## 概要 {#overview}

Datadog は世界中にさまざまなサイトを提供しています。各サイトは完全に独立しており、サイト間でデータを共有することはできません。各サイトは、政府のセキュリティ規制などの利点を提供したり、世界の特定の場所にデータを保存することを可能にします。

## 責任の共有 {#shared-responsibility}

ユーザーデータを安全に保つ責任は、Datadog と Datadog 製品を活用する開発者の間で共有されます。

Datadog の責任は以下の通りです。
- Datadog プラットフォームへのデータ転送や保存時にデータを安全に取り扱う信頼性の高い製品を提供します。
- 社内ポリシーに基づき、セキュリティ上の問題を確実に特定します。

開発者の責任は以下の通りです。
- Datadog が提供する構成値とデータプライバシーオプションを活用します。
- 各環境におけるコードの整合性を確保します.

## Datadog サイトにアクセスする {#access-the-datadog-site}

下記の表で、Datadog ウェブサイトの URL とサイト URL を対照させると、ご使用中のサイトがわかります。

{{< img src="getting_started/site/site.png" alt="ブラウザタブのサイト URL" style="width:40%" >}}

| サイト    | サイト URL                    | サイトパラメータ      | 場所 |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU (ドイツ) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | 日本 |
| AP2     | `https://ap2.datadoghq.com` | `ap2.datadoghq.com` | オーストラリア |

複数のエンドポイントを経由して複数の宛先にデータを送信するには、[デュアルシッピング][2]ガイドを参照してください。

## SDK ドメイン {#sdk-domains}

[SDK ドメインでサポートされるエンドポイント][3]を参照してください。

## Datadog のドキュメントをサイト別に見る {#navigate-the-datadog-documentation-by-site}

異なる Datadog サイトは、インスタンスのセキュリティ要件に応じて異なる機能をサポートする場合があります。したがって、ドキュメントはサイトによって異なる場合があります。Datadog ドキュメントの任意のページの右側にあるサイトセレクタードロップダウンメニューを使用して、情報を表示したい Datadog サイトを選択できます。

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="ドキュメントサイトの右側にあるサイトセレクタードロップダウンメニュー" style="width:100%" >}}

例えば、Datadog for Government サイトのドキュメントを見るには、**US1-FED** を選択します。

## Datadog for Government サイトにアクセスする {#access-the-datadog-for-government-site}

Datadog for Government サイト (US1-FED) は、Datadog の FedRAMP Moderate 認可サイトです。US1-FED は、米国政府機関およびパートナーがアプリケーションとインフラストラクチャーを監視できるようにすることを目的としています。US1-FED のセキュリティおよびコンプライアンスコントロールとフレームワークに関する情報、ならびに FedRAMP をどのようにサポートしているかについては、[セキュリティページ][1]を参照してください。

## さらに読む {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/security/
[2]: /ja/agent/configuration/dual-shipping/
[3]: /ja/real_user_monitoring/#supported-endpoints-for-sdk-domains
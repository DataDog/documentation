---
algolia:
  tags:
  - site
  - Datadog サイト
further_reading:
- link: https://learn.datadoghq.com/courses/dashboards-slos
  tag: ラーニングセンター
  text: ダッシュボードと SLO を活用してビジネスに不可欠な洞察を得る
- link: /agent/configuration/dual-shipping/
  tag: ガイド
  text: デュアルシッピング
kind: documentation
title: Datadog サイトの概要
---

## 概要

Datadog では、世界中でさまざまなサイトを提供しています。各サイトは完全に独立しており、サイト間でデータを共有することはできません。各サイトを使用する利点があり（政府のセキュリティ規定など）、世界中の特定した場所にデータを保存することが可能になります。

## 責任の共有

ユーザーデータを安全に保つ責任は、Datadog と Datadog 製品を活用する開発者の間で共有されます。

Datadog の責任は以下の通りです。
- Datadog プラットフォームにデータが転送され、保存される際、それを安全に取り扱う信頼性の高い製品を提供します。
- 社内ポリシーに基づき、セキュリティ上の問題を確実に特定します。

開発者の責任は以下の通りです。
- Datadog が提供する構成値とデータプライバシーオプションを活用します。
- 自社の環境内のコードの整合性を確実に保ちます。

## Datadog サイトにアクセスする

下記の表で、Datadog ウェブサイトの URL とサイト URL を対照させると、ご使用中のサイトがわかります。

{{< img src="getting_started/site/site.png" alt="ブラウザのタブに表示されるサイトの URL" style="width:40%" >}}

| サイト    | サイト URL                    | サイトパラメーター      | 所在地 |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU (ドイツ) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | 日本 |

**注**: 複数のエンドポイントを経由して複数の宛先にデータを送信するには、[デュアルシッピング][2]ガイドを参照してください。

## SDK ドメイン

[SDK ドメインでサポートされるエンドポイント][3]を参照してください。

## Datadog のドキュメントをサイト別に見る

Datadog サイトによって、インスタンスのセキュリティ要件に応じた異なる機能をサポートする場合があります。そのため、ドキュメントはサイトによって異なる場合があります。Datadog ドキュメントのどのページでも、右側のサイトセレクタードロップダウンメニューを使用して、情報を見たい Datadog サイトを選択することができます。

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="ドキュメントサイトの右側にあるサイトセレクタードロップダウンメニュー" style="width:100%" >}}

例えば、Datadog for Government サイトのドキュメントを見るには、**US1-FED** を選択します。

{{% site-region region="gov" %}}

## Datadog for Government サイトにアクセスする

Datadog for Government Site (US1-FED) は、アメリカ政府機関およびパートナーがそのアプリケーションやインフラストラクチャーを監視するためのサイトです。Datadog for Government site のセキュリティおよびコンプライアンスコントロール、フレームワークに関する詳細や、FedRAMP への対応については、[セキュリティページ][1]をご参照ください。

[1]: https://www.datadoghq.com/security/
{{% /site-region %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/agent/configuration/dual-shipping/
[3]: /ja/real_user_monitoring/#supported-endpoints-for-sdk-domains
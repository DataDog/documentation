---
algolia:
  tags:
  - site
  - datadog site
description: 政府の規制に準拠したオプションなど、地域やセキュリティ要件に合ったさまざまな Datadog サイトについて学びます。
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

Datadog では、世界中でさまざまなサイトを提供しています。各サイトは完全に独立しており、サイト間でデータを共有することはできません。サイトごとに利点があり (政府のセキュリティに関する規制など)、世界中の特定の場所にデータを保存することができます。

## 責任の共有 {#shared-responsibility}

ユーザーデータを安全に保つ責任は、Datadog と Datadog 製品を活用する開発者の間で共有されます。

Datadog の責任は以下の通りです。
- Datadog プラットフォームへのデータ転送や保存時にデータを安全に取り扱う信頼性の高い製品を提供します。
- 社内ポリシーに基づき、セキュリティ上の問題を確実に特定します。

開発者の責任は以下の通りです。
- Datadog が提供する構成値とデータプライバシーオプションを活用します。
- 自社の環境におけるコードの整合性を確保します。

## Datadog サイトにアクセスする {#access-the-datadog-site}

| サイト | サイト URL | サイトパラメーター | 所在地 |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU (ドイツ) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| US2-FED | `https://us2.ddog-gov.com`  | `us2.ddog-gov.com`  | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | 日本 |
| AP2     | `https://ap2.datadoghq.com` | `ap2.datadoghq.com` | オーストラリア |

カスタムドメイン (`demo.datadoghq.com` など) を使用している場合は、[**My Preferences**] (自分の設定) ページの上部にご使用のサイトが示されています。

{{< img src="getting_started/site/site-in-preferences.png" alt="Datadog の [My Preferences] ページの上部。組織名とサイト URL が示されています。" style="width:80%" >}}

[**My Preferences**] に移動するには、左下にある自分のプロファイルアバターをクリックし、メニューから [**My Preferences**] を選択します。

{{< img src="getting_started/site/my-preferences-menu.png" alt="左下のナビゲーションでプロファイルアバターをクリックしてアクセスする Datadog アカウントメニュー。[Personal Settings] (個人設定) の下に [My Preferences] オプションが示されています。" style="width:80%" >}}

複数のエンドポイントを経由して複数の宛先にデータを送信するには、[デュアルシッピング][2] ガイドを参照してください。

## SDK ドメイン {#sdk-domains}

[SDK ドメインでサポートされるエンドポイント][3] を参照してください。

## Datadog のドキュメントをサイト別に見る {#navigate-the-datadog-documentation-by-site}

Datadog サイトではそれぞれ、インスタンスのセキュリティ要件に応じた異なる機能がサポートされることがあります。そのため、ドキュメントはサイトによって異なる場合があります。Datadog ドキュメントのどのページでも、右側のサイトセレクタードロップダウンメニューを使用して、情報を確認する Datadog サイトを選択することができます。

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="ドキュメントサイトの右側にあるサイトセレクタードロップダウンメニュー" style="width:100%" >}}

たとえば、Datadog for Government サイトのドキュメントを見るには、[**US1-FED**] または [**US2-FED**] を選択します。

## Datadog for Government サイトにアクセスする {#access-the-datadog-for-government-sites}

### US1-FED {#us1-fed}

Datadog for Government サイト (US1-FED) は、Datadog の FedRAMP Moderate 認可サイトです。US1-FED の目的は、米国政府機関およびパートナーがアプリケーションとインフラストラクチャーをモニターできるようにすることです。US1-FED のセキュリティとコンプライアンスコントロールおよびフレームワークの詳細、およびどのように FedRAMP に対応しているかの詳細は、[セキュリティページ][1] を参照してください。

### US2-FED {#us2-fed}

Datadog for Government サイト (US2-FED) は、IL5 認可の手続き中です。US2-FED の目的は、米国政府機関およびパートナーがアプリケーションとインフラストラクチャーをモニターできるようにすることです。詳細については、[fedramp@datadoghq.com][4] までメールでお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/security/
[2]: /ja/agent/configuration/dual-shipping/
[3]: /ja/real_user_monitoring/#supported-endpoints-for-sdk-domains
[4]: mailto:fedramp@datadoghq.com
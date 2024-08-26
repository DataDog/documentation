---
aliases:
- /ja/developers/marketplace/
description: Datadog マーケットプレイスについて
further_reading:
- link: https://www.datadoghq.com/partner/
  tag: パートナーネットワーク
  text: Datadog パートナーネットワーク
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: ブログ
  text: Datadog Marketplace で監視範囲を拡大する
- link: /developers/integrations/create_a_tile
  tag: Documentation
  text: タイルの作成
- link: /developers/integrations/agent_integration
  tag: Documentation
  text: Agent ベースのインテグレーションの作成
title: マーケットプレイス製品の構築
type: documentation
---
## 概要

[Datadog Marketplace][2] は、テクノロジーパートナーが Datadog ユーザー向けに提供する有償製品を出品できるデジタルマーケットプレイスです。

**Integrations** ページには、Datadog とテクノロジーパートナーの両者によって構築されたインテグレーションが無料で含まれていますが、**Marketplace** ページは、Datadog のお客様とテクノロジーパートナーが Agent ベースまたは API ベースのインテグレーション、ソフトウェアライセンス、プロフェッショナルサービスなどのさまざまな製品を売買するための商用プラットフォームです。

{{< img src="developers/marketplace/marketplace_overview.png" alt="Datadog Marketplace ページ" style="width:100%" >}}

## 製品の出品

Datadog Marketplace では、以下の種類の製品がサポートされています。

インテグレーション
: [Datadog Agent][19] または [Datadog API][15] を通じて、ユーザーの Datadog アカウントにサードパーティーのデータを送信する (またはデータを引き出す) Marketplace インテグレーション。これらのインテグレーションには、メトリクス、イベント、ログ、トレースなど、様々なデータタイプを含めることができます。

ソフトウェアライセンス
: ソフトウェアライセンスでは、Datadog Marketplace を通じて、ソフトウェアソリューションを顧客にライセンス提供することができます。

プロフェッショナルサービス
: プロフェッショナルサービスでは、一定期間、チームによる導入、サポート、管理などのサービスを提供することができます。

## Datadog Marketplace への参加

Marketplace パートナーには、すぐに使えるインテグレーションを出品しているテクノロジーパートナーにはない、独自の特典があります。

- ブログ記事、プレスリリースへの引用、ソーシャルメディアの拡散などを含む**市場開拓コラボレーション**で、パートナーの成長を加速させることに焦点を当てた専用の営業およびマーケティングリソースへのアクセスが提供されます。
- 社内のセールスイネーブルメントのための**トレーニングおよびサポート**。
- カンファレンス、イベント ([Datadog DASH][20] など) を割引料金で**スポンサーする独占的な機会**。
- ユーザー発見から**新規リードを創出**します。

## Datadog パートナーネットワークに参加する

Datadog Marketplace に製品を出品する前に、まず [Datadog パートナーネットワーク][3]の**テクノロジーパートナー**トラックに申請する必要があります。申請が承認されると、製品開発を開始することができます。

## サンドボックスアカウントのリクエスト

すべてのテクノロジーパートナーは、開発を支援するために専用の Datadog サンドボックスアカウントをリクエストできます。

サンドボックスアカウントをリクエストするには

1. [Datadog パートナーポータル][6]にログインします。
2. 個人のホームページで、**Sandbox Access** の下にある **Learn More** ボタンをクリックします。
3. **Request Sandbox Upgrade** を選択します。

<div class="alert alert-info">すでに Datadog 組織 (トライアル組織を含む) のメンバーである場合、新しく作成したサンドボックスに切り替える必要がある場合があります。詳細については、<a href="https://docs.datadoghq.com/account_management/org_switching/">アカウント管理のドキュメント</a>を参照してください。</div>

開発者用サンドボックスの作成には、最大で 1〜2 営業日かかる場合があります。サンドボックスが作成されると、[組織から新しいメンバーを招待する][7]ことができ、共同作業を行うことができます。

## Marketplace へのアクセスをリクエストする

非公開 Marketplace リポジトリへのアクセスをリクエストするには、<a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a> にメールを送ってください。アクセスが許可されると、アノテーションとベストプラクティスを含む Marketplace リポジトリの[プルリクエスト例][12]を確認することができます。

## 市場開拓 (GTM) の機会を調整する

マーケットプレイスのタイルが稼動すると、テクノロジーパートナーは Datadog のパートナーマーケティングチームとミーティングを行い、以下のような共同の市場開拓 (GTM) 戦略を調整することができます。

- パートナーのプレスリリースの Datadog 見積もり
- [Datadog モニター][21]内のブログ記事
- ソーシャルメディア投稿の増幅

## 詳細はこちら

API ベースのインテグレーション、ソフトウェアライセンス、またはプロフェッショナルサービスの作成を開始するには、[タイルの作成][13]を参照してください。Agent ベースのインテグレーションを作成し、Datadog Marketplace で販売することに興味がある場合は、[Agent ベースのインテグレーションを作成する][19]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/marketplace
[3]: https://partners.datadoghq.com/
[5]: https://docs.datadoghq.com/ja/developers/datadog_apps
[6]: https://partners.datadoghq.com/English/
[7]: /ja/account_management/users/#add-new-members-and-manage-invites
[8]: https://learn.datadoghq.com/courses/intro-to-integrations
[9]: https://learn.datadoghq.com/
[10]: https://chat.datadoghq.com/
[11]: https://docs.datadoghq.com/ja/developers/authorization/
[12]: https://github.com/DataDog/marketplace/pull/107
[13]: https://docs.datadoghq.com/ja/developers/integrations/create_a_tile
[15]: https://docs.datadoghq.com/ja/developers/integrations/api_integration
[19]: https://docs.datadoghq.com/ja/developers/integrations/agent_integration
[20]: https://www.dashcon.io/
[21]: https://www.datadoghq.com/blog/
---
further_reading:
- link: https://www.datadoghq.com/partner/
  tag: パートナーネットワーク
  text: Datadog パートナーネットワーク
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: GitHub
  text: Datadog Marketplace で監視範囲を拡大する
- link: /developers/marketplace/offering/
  tag: ドキュメント
  text: Marketplace 製品の開発方法について
- link: /developers/datadog_apps/
  tag: ドキュメント
  text: Datadog アプリについて
title: マーケットプレイス
type: documentation
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、Datadog Marketplace は利用できません。</div>
{{< /site-region >}}


## 概要

Datadog Marketplace は、Datadog テクノロジーパートナーが Datadog ユーザー向けに提供する製品を掲載できるデジタルマーケットプレイスです。Datadog のお客様は、[**Integrations** ページ][1]または [**Marketplace** ページ][2]でインテグレーションタイルにアクセスできます。

{{< img src="developers/marketplace/marketplace_overview.png" alt="Datadog Marketplace ページ" style="width:100%" >}}

**Integrations** ページには、Datadog とテクノロジーパートナーが無償で構築したインテグレーションや Datadog アプリが含まれていますが、**Marketplace** ページは、Datadog の顧客とテクノロジーパートナーが、Agent ベースまたは API ベースのインテグレーション、Datadog アプリ、ソフトウェア、専門サービスなど様々な製品を売買できる商用プラットフォームとなっています。

## Datadog のパートナーネットワークに参加する

Datadog Marketplace へのアクセスをリクエストする前に、まず [Datadog テクノロジーパートナーの][3] **Technology Partners** トラックへの参加を申請してください。Datadog テクノロジーパートナーとして、[Agent ベースまたは API インテグレーション][4]や [Datadog アプリ][5]を開発するか、SaaS ライセンスまたはプロフェッショナルサービスの製品を出品することができます。

## サンドボックスアカウントを申請する

すべてのテクノロジーパートナーは、開発を支援するために、専用のサンドボックス Datadog アカウントをリクエストすることができます。

サンドボックスアカウントをリクエストするには

1. [Datadog パートナーポータル][6]にログインします。
2. 個人ホームページで、**Sandbox Access** の下にある **Learn More** ボタンをクリックします。
3. **Request Sandbox Upgrade** を選択します。

<div class="alert alert-info">すでに Datadog 組織 (トライアル組織を含む) のメンバーである場合、新しく作成したサンドボックスへの切り替えが必要な場合があります。詳しくは、<a href="https://docs.datadoghq.com/account_management/org_switching/">アカウント管理のドキュメント</a>をご覧ください。</div>

開発者用サンドボックスの作成には、最大で 1〜2 営業日かかる場合があります。サンドボックスが作成されると、[組織から新しいメンバーを招待する][7]ことができ、共同作業を行うことができます。

## 学習リソースを探す

テクノロジーパートナートラックに参加し、サンドボックスアカウントをリクエストすると、Datadog インテグレーションや追加製品の開発について、以下の方法で学習を開始することができます。

* [Datadog ラーニングセンター][9]のオンデマンドコース [**Introduction to Datadog Integrations**][8] を修了する。
* 公開 [Datadog Slack チャンネル][10] から Marketplace Engineering Office Hours に参加する。
* Datadog ダッシュボードと外部データやアクションをインテグレーションするカスタムウィジェットを構築したい場合は、[Datadog アプリ][5]に関するドキュメントを読む。
* Agent ベースまたは API ベースのインテグレーションと Datadog アプリの [OAuth 2.0 クライアント][11]のセットアップに関するドキュメントを読む。

## マーケットプレイスに製品を掲載する

すべてのテクノロジーパートナーは、無料のインテグレーションを **Integrations** ページに、商用製品を **Marketplace** ページに掲載することができます。Datadog Marketplace の追加製品には、以下のようなものがあります。

インテグレーション
: [Datadog Agent][15] や [API][16] を介してサードパーティのデータを送信またはプルする Marketplace インテグレーション。このインテグレーションには、すぐに使えるメトリクス、イベント、またはサービスチェックが含まれています。

ソフトウェアライセンス
: SaaS ライセンスでは、Datadog Marketplace を通じて、ソフトウェアソリューションを顧客にライセンス提供することができます。

UI 拡張機能またはアプリケーション
: Datadog Marketplace の[タイルのみの出品][17があるアプリケーション ([Datadog アプリ][5]など)。

プロフェッショナルサービス
: [プロフェッショナルサービス][18]では、一定期間、チームによる導入、サポート、管理などのサービスを提供することができます。

### Marketplace へのアクセスをリクエストする

非公開 Marketplace リポジトリへのアクセスをリクエストするには、<a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a> にメールを送ってください。Marketplace の製品では、ファイルや価格プランなどの情報が必要です。アクセスが許可されると、アノテーションとベストプラクティスを含む Marketplace リポジトリの[プルリクエスト例][12]を確認することができます。

Datadog マーケットプレイスで製品の開発を始めるには、[マーケットプレイス製品の開発][13]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/marketplace
[3]: https://partners.datadoghq.com/
[4]: /ja/developers/integrations/new_check_howto/
[5]: /ja/developers/datadog_apps
[6]: https://partners.datadoghq.com/English/
[7]: /ja/account_management/users/#add-new-members-and-manage-invites
[8]: https://learn.datadoghq.com/courses/intro-to-integrations
[9]: https://learn.datadoghq.com/
[10]: https://chat.datadoghq.com/
[11]: /ja/developers/authorization/
[12]: https://github.com/DataDog/marketplace/pull/107
[13]: /ja/developers/marketplace/offering
[14]: /ja/developers/integrations/api_integration/
[15]: /ja/developers/marketplace/offering#agent-based-integrations
[16]: /ja/developers/marketplace/offering#rest-api-integrations
[17]: /ja/developers/marketplace/offering#datadog-apps
[18]: /ja/developers/marketplace/offering#saas-license-or-professional-service-offerings
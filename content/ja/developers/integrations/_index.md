---
aliases:
- /ja/guides/agent_checks/
- /ja/agent/agent_checks
- /ja/developers/agent_checks/
description: Integrations ページで製品開発を行い、公開する方法について説明します。
further_reading:
- link: /developers/integrations/agent_integration/
  tag: Documentation
  text: Agent インテグレーションの作成
- link: /developers/integrations/api_integration/
  tag: Documentation
  text: API インテグレーションの作成
- link: /developers/integrations/marketplace_offering/
  tag: Documentation
  text: Datadog Marketplace でインテグレーションを販売する方法について
- link: /developers/
  tag: Documentation
  text: Datadog プラットフォームで開発する方法について
kind: documentation
title: インテグレーションの構築
---
## 概要

このページでは、テクノロジーパートナーが [Datadog Agent][11] や [Datadog API][12] を使用して[インテグレーションを構築](#create-a-datadog-integration)し、**Integrations** または **Marketplace** ページにその製品を出品する方法について説明します。

{{< tabs >}}
{{% tab "インテグレーション" %}}

[Integrations ページ][101]には、Datadog とテクノロジーパートナーによって構築されたインテグレーションがあり、Datadog のお客様は_無料_で利用できます。

{{< img src="developers/integrations/integrations_overview.png" alt="Datadog Integrations ページ" style="width:100%;" >}}

[101]: https://app.datadoghq.com/integrations

{{% /tab %}}
{{% tab "Marketplace" %}}

[Marketplace ページ][101]は、テクノロジーパートナーが、インテグレーション、ソフトウェアライセンス、プロフェッショナルサービスなど、さまざまな製品を Datadog のお客様に_販売_するための商業プラットフォームです。

{{< img src="developers/marketplace/marketplace_updated_overview.png" alt="Datadog Marketplace ページ" style="width:100%" >}}

[101]: https://app.datadoghq.com/marketplace

{{% /tab %}}
{{< /tabs >}}

### 利益

インテグレーションを作成することで、以下のような利益を得ることができます。

ユーザー観測可能性データとの相関付けを行う
: Datadog を活用することで、お客様がプラットフォームからのデータを他のテクノロジースタックと一緒に確認できるようになり、プラットフォームの価値を高めることができます。

お客様の平均解決時間 (MTTR) を短縮する
: お客様のアカウントがインテグレーションからのデータでリッチ化されると、お客様はスタック全体をより広く見ることができるようになり、問題のデバッグと修正をより迅速に行うことができるようになります。

採用率・視認性を向上させる
: Datadog のネイティブ機能を確保することで、採用への摩擦を減らし、[Integrations ページ][10]や [Marketplace ページ][17]にタイルを表示することで、Datadog のすべてのお客様に対して重要な視認性を提供します。

## 始める

### Datadog パートナーネットワークに参加する

Datadog にインテグレーションを出品する前に、まず [Datadog パートナーネットワーク][5]の**テクノロジーパートナー**トラックに申請してください。申請が承認されると、インテグレーション開発を開始することができます。

### サンドボックスアカウントのリクエスト

すべてのテクノロジーパートナーは、インテグレーション開発に役立つ Datadog の専用サンドボックスアカウントをリクエストすることができます。このサンドボックスアカウントには、データの送信、ダッシュボードの構築などに使用できる無料ライセンスがあります。

<div class="alert alert-info">すでに Datadog 組織 (トライアル組織を含む) のメンバーである場合、新しく作成したサンドボックスに切り替える必要がある場合があります。詳細については、<a href="https://docs.datadoghq.com/account_management/org_switching/">アカウント管理のドキュメント</a>を参照してください。</div>

サンドボックスアカウントをリクエストするには

1. [Datadog パートナーポータル][5]にログインします。
2. 個人のホームページで、**Sandbox Access** の下にある **Learn More** ボタンをクリックします。
3. **Request Sandbox Upgrade** を選択します。

開発者用サンドボックスの作成には、最大で 1〜2 営業日かかる場合があります。サンドボックスが作成されると、[組織から新しいメンバーを招待する][6]ことができ、共同作業を行うことができます。

### 学習リソースを探す

**テクノロジーパートナー**トラックに参加し、サンドボックスアカウントをリクエストすると、次の方法で製品の開発について詳しく知ることができます。

* [Datadog ラーニングセンター][8]のオンデマンドコース [**Introduction to Datadog Integrations**][7] を修了する。
* [API ベースのインテグレーション][1]の作成と [API ベースのインテグレーションのための OAuth 2.0 クライアント][9]のセットアップに関するドキュメントを読む。
* [Agent ベースのインテグレーション][2]の作成に関するドキュメントを読む。

Datadog インテグレーションやその他のタイプの製品の販売については、[マーケットプレイス製品の構築][4]を参照してください。

## Datadog インテグレーションの作成

### 責任

インテグレーションの作成者は、コードを維持し、すべての [Datadog サイト][15]でインテグレーションが適切に機能するようにする責任を負います。セットアップの問題が発生した場合は、[サポートに連絡][16]してください。

### Agent ベースのインテグレーション

Agent ベースのインテグレーションは、[Datadog Agent][11] を使用して、テクノロジーパートナーが記述したチェックを通してデータを送信します。これらのインテグレーションの実装コードは、Datadog がホストしています。

Agent インテグレーションは、ローカルエリアネットワーク (LAN) や仮想プライベートクラウド (VPC) に存在するシステムまたはアプリケーションからデータを収集するのに最適な方法です。[Agent インテグレーションの作成][2]では、ソリューションを Python ホイール (`.whl`) として公開およびデプロイする必要があります。

### API ベースのインテグレーション

API ベースのインテグレーションでは、[Datadog API][12] を使用して外部プラットフォームからメトリクス、トレース、ログなどのテレメトリを送信することができます。お客様は、このデータをスタックの残りの部分からのデータと一緒に可視化および相関させることができ、問題を迅速に分析および修正することができます。また、API ベースのインテグレーションでは、お客様が [OAuth を使用してアクセスを認可][13]すると、Datadog からデータを読み出すことができます。

テクノロジーパートナーは、インテグレーションを構成する実装コードを書き、ホストします。[API インテグレーションの作成][1]は、Datadog と他の SaaS プラットフォーム間のコネクタを構築するテクノロジーパートナーに有効です。

## 要件
すべてのインテグレーションには以下が含まれている必要があります。
* すぐに使えるインテグレーションダッシュボード
* タイル用の画像 3 枚以上
* OAuth (API インテグレーションのみ)
* ログパイプライン (ログインテグレーションのみ)
* 推奨モニター (メトリクスを送信するインテグレーション)

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/integrations/api_integration/
[2]: https://docs.datadoghq.com/ja/developers/integrations/agent_integration/
[3]: https://docs.datadoghq.com/ja/integrations/
[4]: https://docs.datadoghq.com/ja/developers/integrations/marketplace_offering/
[5]: https://partners.datadoghq.com/
[6]: https://docs.datadoghq.com/ja/account_management/users/#add-new-members-and-manage-invites
[7]: https://learn.datadoghq.com/courses/intro-to-integrations
[8]: https://learn.datadoghq.com/
[9]: https://docs.datadoghq.com/ja/developers/authorization/
[10]: https://app.datadoghq.com/integrations
[11]: https://docs.datadoghq.com/ja/agent/
[12]: https://docs.datadoghq.com/ja/api/latest/
[13]: https://docs.datadoghq.com/ja/developers/authorization/
[14]: https://docs.datadoghq.com/ja/metrics/custom_metrics/
[15]: https://docs.datadoghq.com/ja/getting_started/site/
[16]: https://docs.datadoghq.com/ja/help/
[17]: https://app.datadoghq.com/marketplace
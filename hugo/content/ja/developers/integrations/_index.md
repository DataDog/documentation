---
aliases:
- /ja/developers/marketplace/offering
- /ja/developers/integrations/create_a_tile
- /ja/guides/agent_checks/
- /ja/agent/agent_checks
- /ja/developers/agent_checks/
description: Datadog インテグレーションを開発して公開する方法を学びましょう。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: ブログ
  text: Datadog Marketplace で監視範囲を拡大する
- link: /developers/integrations/marketplace_offering
  tag: ドキュメント
  text: Datadog Marketplace で製品を作成する
title: Datadog インテグレーション
type: documentation
---
## 概要

このページでは、インテグレーションとは何か、および Integration Developer Platform を使用して Datadog でインテグレーションを構築する一般的なプロセスの概要を説明します。

## インテグレーションとは？

インテグレーションにより、サード パーティはメトリクス、ログ、トレース、イベントなどの可観測性データを Datadog に送信できます。インテグレーションには、すぐに使える (OOTB) Dashboards、Monitors、その他のコンテンツが含まれ、ユーザーによるデータの可視化と分析を支援します。

### インテグレーションを作成するメリット

インテグレーションを作成することで、以下のような利益を得ることができます。

ユーザー観測可能性データとの相関付けを行う
: Datadog を活用することで、お客様がプラットフォームからのデータを他のテクノロジースタックと一緒に確認できるようになり、プラットフォームの価値を高めることができます。

お客様の平均解決時間 (MTTR) を短縮する
: お客様のアカウントがインテグレーションからのデータでリッチ化されると、お客様はスタック全体をより広く見ることができるようになり、問題のデバッグと修正をより迅速に行うことができるようになります。

導入と可視性の向上
: Datadog でネイティブな機能性を確保すると導入時の摩擦が減少し、 [Integrations ページ][2] または [Marketplace ページ][3] にタイルを表示することで、すべての Datadog 顧客に対して重要な可視性を得られます。

## インテグレーション タイルとは何ですか？

インテグレーション タイルは、顧客にとっての発見およびインストールの起点として機能します。含まれるもの:
* 提供内容に関する情報
* セットアップ手順
* インストールまたは購入オプション
* すぐに使える Dashboards と追加コンテンツ

インテグレーション タイルは、Datadog におけるインテグレーションのコンポーネントです。

## 公式インテグレーションの要件

すべての公式インテグレーションには、次が含まれている必要があります:
* Datadog に送信されるテレメトリ
* すぐに使えるインテグレーションダッシュボード
* タイル上の画像
* OAuth (API インテグレーションのみ)
* ログパイプライン (ログインテグレーションのみ)
* 推奨モニター (メトリクスを送信するインテグレーション)

## はじめに

### Datadog Partner Network に参加する

Datadog でインテグレーションを掲載する前に、まず [Datadog Partner Network][1] の **Technology Partner** トラックに申請してください。申請が承認されたら、インテグレーションの開発を開始できます。

### サンドボックスアカウントのリクエスト

すべてのテクノロジーパートナーは、インテグレーション開発に役立つ Datadog の専用サンドボックスアカウントをリクエストすることができます。このサンドボックスアカウントには、データの送信、ダッシュボードの構築などに使用できる無料ライセンスがあります。

<div class="alert alert-info">すでに Datadog 組織 (トライアル組織を含む) のメンバーである場合、新しく作成したサンドボックスに切り替える必要がある場合があります。詳細については、<a href="https://docs.datadoghq.com/account_management/org_switching/">アカウント管理のドキュメント</a>を参照してください。</div>

サンドボックスアカウントをリクエストするには

1. [Datadog Partner Portal][1] にログインしてください。
2. 個人のホームページで、**Sandbox Access** の下にある **Learn More** ボタンをクリックします。
3. **Request Sandbox Upgrade** を選択します。

開発者用サンドボックスの作成には、最大で 1〜2 営業日かかる場合があります。サンドボックスが作成されると、[組織から新しいメンバーを招待する][7]ことができ、共同作業を行うことができます。

### インテグレーション構築の概要

以下の手順に従って、Datadog と連携する新しいインテグレーションを作成します。

1. **Datadog Partner Network に申請します。** 受理されると、Datadog Technology Partner チームのメンバーが連絡し、導入ミーティングのスケジュールを調整します。
2. **開発用の Datadog サンドボックス アカウント** を Datadog Partner Network ポータルからリクエストします。
3. **Integration Developer Platform を使用してインテグレーションの開発を開始します:**

   a. インテグレーションの基本情報を定義します。

   b. 次のいずれかのインテグレーション タイプの作成手順に従って、インテグレーションのコードを設計・実装します:
      - [Agent ベースのインテグレーション][5]
      - [API ベースのインテグレーション][6]

   c. インテグレーションがクエリまたは送信するデータの種類を指定します。

   d. Dashboard を作成し、必要に応じて Monitors や Security Rules も作成します。

   e. 残りのフィールドを入力します: セットアップおよびアンインストール手順、画像、サポート情報、インテグレーションの価値を説明するためのその他の重要な詳細。

4. **Datadog サンドボックス アカウント** でインテグレーションをテストします。
5. **インテグレーションをレビュー用に提出します。**
6. **承認されると、インテグレーションが公開されます。**

### 責任

インテグレーションの作成者として、コードを保守し、すべての [Datadog サイト][8] でインテグレーションが適切に機能することを確保する責任があります。セットアップで問題が発生した場合は、[サポートに連絡][9] してください。

## すぐに使えるインテグレーション と Marketplace オファリングの比較

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

**Marketplace インテグレーションは次のようなケースに最適です:**
* Datadog 製品に特化した専門知識を持つシステム インテグレーター
* Datadog の導入を強化するプロフェッショナル サービスを提供するパートナー

|                          | **OOTB インテグレーション**                                                                 | **Marketplace インテグレーション**                                                                                   |
|--------------------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| **目的**              | Datadog とパートナー プラットフォーム間でデータを接続・転送する方法を提供     | Datadog のエクスペリエンスを強化 (拡張機能、パートナー サービス、レガシー テクノロジーのカバレッジ など)    |
| **提供場所**         | Integrations ページに含まれる                                                     | 有償。Marketplace で提供                                                                             |
| **作成と保守**| Datadog または Technology Partner                                                        | Technology Partner                                                                                            |
| **課金**              | Datadog サブスクリプションに含まれる                                                      | 追加料金                                               |

## 市場開拓 (GTM) の機会

Datadog は GTM サポートを提供しています。詳細については、担当のパートナー マネージャーまでお問い合わせください。

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://partners.datadoghq.com
[2]: https://app.datadoghq.com/integrations
[3]: https://app.datadoghq.com/marketplace
[4]: https://docs.datadoghq.com/ja/developers/integrations/marketplace_offering/
[5]: /ja/developers/integrations/agent_integration/
[6]: /ja/developers/integrations/api_integration/
[7]: https://docs.datadoghq.com/ja/account_management/users/#add-new-members-and-manage-invites
[8]: https://docs.datadoghq.com/ja/getting_started/site/
[9]: https://docs.datadoghq.com/ja/help/
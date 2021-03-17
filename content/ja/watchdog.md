---
title: Watchdog
kind: Documentation
description: アプリケーションとインフラストラクチャーの潜在的な問題を自動的に検出
aliases:
  - /ja/tracing/watchdog
further_reading:
  - link: /logs/
    tag: Documentation
    text: ログの収集
  - link: /infrastructure/process/
    tag: Documentation
    text: プロセスの収集
  - link: /tracing/
    tag: Documentation
    text: トレースの収集
  - link: 'https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/'
    tag: ブログ
    text: Watchdog RCA による自動化された根本原因分析
---
{{< img src="watchdog/watchdog_page.png" alt="Watchdog ページ"  >}}

## 概要

Watchdog は、アプリケーションやインフラストラクチャーの潜在的な問題を自動的に検出する APM パファーマンスおよびインフラストラクチャーメトリクスのアルゴリズム機能です。Watchdog は以下の傾向やパターンを監視します。

* APM メトリクス:
  * ヒット数（リクエスト率）
  * エラー率
  * レイテンシー

* インテグレーションによるインフラストラクチャーメトリクス
  * [システム][1]、ホストレベルのメモリ使用量（メモリリーク）、TCP 再送率。
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [Amazon Web Services][5]（[S3][6]、[ELB/ALB/NLB][7]、[CloudFront][8]、[DynamoDB][9] Amazon サービス）
  * [アラート設定][10]

Watchdog は、適合率の急激な上昇などといったメトリクスの異常を検出します。[Watchdog ページ][11]には、それぞれの異常に関する「Watchdog ストーリー」が表示されます。各「ストーリー」には、検出されたメトリクスの異常を表すグラフが含まれ、関連する時間枠およびエンドポイントに関する詳細が表示されます。誤警報を避けるために、Watchdog は十分な時間をかけてデータを観察してから問題を報告しています。これにより、信頼度の高い警報を実現しています。

## APM の根本原因分析 (ベータ版)

<div class="alert alert-warning">
Watchdog Root Cause Analysis (RCA) は現在ベータ版です。<a href="https://docs.google.com/forms/d/1gKdjVslrxMv_St7sIH7c47FJuf_hKvKAt_G9SXnE4Nw/edit?ts=5fbd5390&gxids=7628">このフォーム</a>を使用してアクセスをリクエストしてください。
</div>

Watchdog RCA を使用すると、APM のお客様は、アプリケーションとインフラストラクチャー全体のさまざまな症状間の因果関係を特定できます。この情報は、根本原因分析をスピードアップし、平均修復時間 (MTTR) を短縮するのに役立ちます。

Watchdog は、関連データをグループ化し、グループ間の接続を描画し、焦点を当てる最も重要な領域に優先順位を付けることができます。

Watchdog は、次のタイプのシグナル間の関係を考慮します。

* APM エラー率の遅延とヒット率の増加
* APM サービスのバージョンが変更された新しいデプロイ
* APM エラートレース
* 新しい APM リソースの導入
* トレースされたデータベースクエリへの変更
* Agent ベースのインフラストラクチャーメトリクス (CPU 使用率が高い、メモリ使用率が高い、ディスク使用率が高い、ホストに到達できないなど)
* エラーログパターンの異常
* 自分のモニターからトリガーされたアラート

Watchdog は、インフラストラクチャーのさまざまな部分 (ログ、トレース、メトリクス) からのシグナルと異常を相互に関連付け、それらを証拠として各 RCA ストーリーに追加します。これを有効にするには、テレメトリ全体で[統一されたタグ付け][12]を設定することをお勧めします。

## ストーリーの詳細

ストーリーをクリックすると、検出された異常に関する詳細が表示されます。

{{< img src="watchdog/watchdog_story.png" alt="Watchdog ストーリー"  >}}

このストーリーでは、3 つの異なるアベイラビリティーゾーンにおける ELB のレイテンシー値がグラフに示されています。Watchdog は、3 つのアベイラビリティーゾーンで有効になっている単一の負荷分散からこのメトリクス内の類似の異常検知を検出し、結果を 1 つのストーリーとして自動的にまとめます。低レイテンシーの継続後、3 つの全てのアベイラビリティーゾーンでメトリクスが急上昇したことがわかります (グラフでは、領域に異常検知の期間が強調表示されています)。

##### 予測される範囲

右上の *Show expected bounds* を選択すると、予測された動作の上限/下限しきい値がグラフに表示されます。

##### ストーリーのアーカイブ

アーカイブするには、ストーリーの右上にあるフォルダーアイコンを使用します。アーカイブをすると、ホームページのような Datadog アプリケーションやフィードからストーリーを隠します。ストーリーはアーカイブされると、関連するサービスやリソースの横に、Watchdog の黄色い双眼鏡アイコンは表示されません。

アーカイブされたストーリーを閲覧するには、左上の「Show N archived stories」オプションにチェックマークを入れます。ストーリーをアーカイブした人物や時間を確認したり、フィードに戻すこともできます。

**注**: アーカイブ後であっても、Watchdog はサービスやリソースに関連する問題にフラグを立てます。

##### 依存関係マップ

あるサービスで異常検知が発動すると、たいていは関連するサービスでも同様の異常が検知されます。たとえば、あるサービスのデータベースクエリが制限された場合、その下流サービスのレイテンシーは上昇します。これは 2 つの切り離された問題としてではなく、単一の根本原因から派生した 1 つの問題として捉えて解決策を練る必要があります。

Watchdog は、複数のサービスに影響する問題を検出すると、関連する APM の異常を自動的に 1 つのストーリーにグループ化します。ストーリーには、問題が発生したサービスと影響を受けたダウンストリームの依存関係を示す依存関係マップが含まれます。 これにより、問題の影響を可視化し、問題の原因への迅速なパスを提供し、解決に進むことができます。

##### 関連ダッシュボード

詳細調査を迅速に行うために、Datadog ではストーリーに関連するダッシュボードを活用することを推奨しています。この場合、Datadog はダッシュボード内のどのメトリクスがストーリーのインサイトに関連しているかを表示します。

##### モニター

ストーリーに間連付けされたモニターが下側に表示されます。表示されるモニターにはそれぞれ、現在のストーリーのメトリクスとそのスコープに含まれる関連タグがあります。

{{< img src="watchdog/watchdog_monitors.png" alt="Watchdog モニター"  style="width:75%;">}}

さらに、Watchdog は1つ以上のモニターをストーリーが再度発生した際トリガーするように構成することを推奨します。**Enable Monitor**ボタンをクリックして、オーガニゼーションのために有効にします。Watchdog モニターの作成の詳細は、[Watchdog モニターに関するドキュメント][13]を参照してください。

## ストーリーを絞り込む

Watchdog ストーリーの絞り込みには、タイムレンジ、検索バー、ファセットを使用できます。

##### タイムレンジ

右上のタイムレンジセレクターを使用して、指定したタイムレンジのストーリーを表示します。2019 年 3 月まで遡り、過去 13 か月までのストーリを表示できます

##### 検索バー

**Filter stories** 検索ボックスに入力すると、ストーリーのタイトルを検索できます。

##### ファセット

ファセットは Watchdog ストーリーに関連付けられているため、次を用いて検索できます。

| ファセット           | 説明                                                                        |
|-----------------|------------------------------------------------------------------------------------|
| ストーリーカテゴリ  | すべての `apm` または `infrastructure` ストーリーを表示。                                 |
| ストーリータイプ      | APM またはインフラストラクチャーインテグレーションストーリーからのどのメトリクスを表示すべきか。 |
| APM 環境 | 表示するストーリーのある [APM 環境][14]。                                 |
| APM プライマリタグ | 表示するストーリーのある[定義済み APM プライマリタグ][15]。                         |
| APM サービス     | 表示するストーリーのある [APM サービス][16]。                                     |

## サービス一覧画面内の Watchdog

メトリクスに異常が検出された場合、[APM サービス一覧][17]では、その異常が発生しているサービスの横に Watchdog の黄色い双眼鏡アイコンが表示されます。双眼鏡の横の数字は、Watchdog がそのサービス内で認識した問題の数を示しています。

{{< img src="watchdog/service_list.png" alt="Watchdog サービス一覧" style="width:75%;" >}}

特定のサービスで通常と異なる動作が検出された場合、対応する[サービス詳細画面][17]を開くと、ページの中央、アプリケーションパフォーマンスのグラフとレイテンシー分散セクションの間に、その異常に関する Watchdog セクションが表示されます。このセクションには、関連する「Watchdog ストーリー」が表示されます。

{{< img src="watchdog/watchdog_story_bis.png" alt="Watchdog ストーリー bis" style="width:75%;">}}

## Watchdog とアラート

Watchdog RCA は、アプリケーションの異常を検出すると、ストーリーを作成し、トリガーされたユーザー定義のモニターにリンクします。Watchdog ストーリーは、トリガーされたモニターページの上部に直接表示されます。

{{< img src="watchdog/watchdog_rca_alerts.jpeg" alt="Watchdog RCA とアラート" style="width:75%;">}}

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][18]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/system/
[2]: /ja/integrations/redis/
[3]: /ja/integrations/postgres/
[4]: /ja/integrations/nginx/
[5]: /ja/integrations/amazon_web_services/
[6]: /ja/integrations/amazon_s3/
[7]: /ja/integrations/amazon_elb/
[8]: /ja/integrations/amazon_cloudfront/
[9]: /ja/integrations/amazon_dynamodb/
[10]: /ja/monitors/
[11]: https://app.datadoghq.com/watchdog
[12]: /ja/getting_started/tagging/unified_service_tagging
[13]: /ja/monitors/monitor_types/watchdog/
[14]: /ja/tracing/send_traces/#configure-your-environment
[15]: /ja/tracing/guide/setting_primary_tags_to_scope/
[16]: /ja/tracing/visualization/#services
[17]: /ja/tracing/visualization/services_list/
[18]: /ja/help/
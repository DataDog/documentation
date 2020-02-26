---
title: Watchdog
kind: Documentation
description: アプリケーションとインフラストラクチャーの潜在的な問題を自動的に検出
aliases:
  - /ja/tracing/watchdog
further_reading:
  - link: logs/
    tag: Documentation
    text: ログの収集
  - link: /infrastructure/process
    tag: Documentation
    text: プロセスの収集
  - link: tracing
    tag: Documentation
    text: トレースの収集
---
{{< img src="watchdog/watchdog_page.png" alt="Watchdog ページ" responsive="true" >}}

## 概要

Watchdog は、アプリケーションやインフラストラクチャーの潜在的な問題を自動的に検出する APM パファーマンスおよびインフラストラクチャーメトリクスのアルゴリズム機能です。Watchdog は以下の傾向やパターンを監視します。

* APM メトリクス:
  * ヒット数（リクエスト率）
  * エラー率
  * レイテンシー

* インテグレーションによるインフラストラクチャーメトリクス
  * [システム][1], ホストレベルのメモリ使用量（メモリリーク）、TCP 再送率、など。
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [Amazon Web Services][5]（[S3][6]、[ELB/ALB/NLB][7]、[CloudFront][8]、[DynamoDB][9] Amazon サービス）

Watchdog は、適合率の急激な上昇などといったメトリクスの異常を検出します。[Watchdog ページ][10]には、それぞれの異常に関する「Watchdog ストーリー」が表示されます。各「ストーリー」には、検出されたメトリクスの異常を表すグラフが含まれ、関連する時間枠およびエンドポイントに関する詳細が表示されます。誤警報を避けるために、Watchdog は十分な時間をかけてデータを観察してから問題を報告しています。これにより、信頼度の高い警報を実現しています。

## ストーリーの詳細

ストーリーをクリックすると、検出された異常に関する詳細が表示されます。

{{< img src="watchdog/watchdog_story.png" alt="Watchdog ストーリー"  >}}

このストーリーでは、3 つの異なるアベイラビリティーゾーンにおける ELB のレイテンシー値がグラフに示されています。Watchdog は、3 つのアベイラビリティーゾーンで有効になっている単一の負荷分散からこのメトリクス内の類似の異常検知を検出し、結果を 1 つのストーリーとして自動的にまとめます。低レイテンシーの継続後、3 つの全てのアベイラビリティーゾーンでメトリクスが急上昇したことがわかります (グラフでは、領域に異常検知の期間が強調表示されています)。

##### 予測される範囲

右上の *Show expected bounds* を選択すると、予測された動作の上限/下限しきい値がグラフに表示されます。

##### アーカイブされたストーリー

アーカイブするには、ストーリーの右上にあるフォルダーアイコンを使用します。アーカイブをすると、ホームページのような Datadog アプリケーションやフィードからストーリーを隠します。ストーリーはアーカイブされると、関連するサービスやリソースの横に、Watchdog の黄色い双眼鏡アイコンは表示されません。

アーカイブされたストーリーを閲覧するには、左上の「Show N archived stories」オプションにチェックマークを入れます。ストーリーをアーカイブした人物や時間を確認したり、フィードに戻すこともできます。

**注**: アーカイブ後であっても、Watchdog はサービスやリソースに関連する問題にフラグを立てます。

##### モニター

ストーリーに間連付けされたモニターが下側に表示されます。表示されるモニターにはそれぞれ、現在のストーリーのメトリクスとそのスコープに含まれる関連タグがあります。

{{< img src="watchdog/watchdog_monitors.png" alt="Watchdog モニター" responsive="true" style="width:75%;">}}

さらに、Watchdog は1つ以上のモニターをストーリーが再度発生した際トリガーするように構成することを推奨します。**Enable Monitor**ボタンをクリックして、オーガニゼーションのために有効にします。Watchdog モニターの作成の詳細は、[Watchdog モニターに関するドキュメント][11]を参照してください。

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
| APM 環境 | 表示するストーリーのある [APM 環境][12]。                                 |
| APM プライマリタグ | 表示するストーリーのある[定義済み APM プライマリタグ][13]。                         |
| APM サービス     | 表示するストーリーのある [APM サービス][14]。                                     |

## サービス一覧画面内の Watchdog

メトリクスに異常が検出された場合、[APM サービス一覧][15]では、その異常が発生しているサービスの横に Watchdog の黄色い双眼鏡アイコンが表示されます。双眼鏡の横の数字は、Watchdog がそのサービス内で認識した問題の数を示しています。

{{< img src="watchdog/service_list.png" alt="Watchdog サービス一覧" style="width:75%;" >}}

特定のサービスで通常と異なる動作が検出された場合、対応する[サービス詳細画面][15]を開くと、ページの中央、アプリケーションパフォーマンスのグラフとレイテンシー分散セクションの間に、その異常に関する Watchdog セクションが表示されます。このセクションには、関連する「Watchdog ストーリー」が表示されます。

{{< img src="watchdog/watchdog_story_bis.png" alt="Watchdog ストーリー bis" style="width:75%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/system
[2]: /ja/integrations/redis
[3]: /ja/integrations/postgres
[4]: /ja/integrations/nginx
[5]: /ja/integrations/amazon_web_services
[6]: /ja/integrations/amazon_s3
[7]: /ja/integrations/amazon_elb
[8]: /ja/integrations/amazon_cloudfront
[9]: /ja/integrations/amazon_dynamodb
[10]: https://app.datadoghq.com/apm/watchdog
[11]: /ja/monitors/monitor_types/watchdog/
[12]: /ja/tracing/send_traces/#configure-your-environment
[13]: /ja/tracing/guide/setting_primary_tags_to_scope/
[14]: /ja/tracing/visualization/#services
[15]: /ja/tracing/visualization/services_list
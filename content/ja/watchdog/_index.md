---
aliases:
- /ja/tracing/watchdog
description: アプリケーションとインフラストラクチャーの潜在的な問題を自動的に検出
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Watchdog
  tag: リリースノート
  text: Datadog Watchdog の最新リリースをチェック！ (アプリログインが必要です)。
- link: /logs/
  tag: ドキュメント
  text: ログの収集
- link: /infrastructure/process/
  tag: ドキュメント
  text: プロセスの収集
- link: /tracing/
  tag: ドキュメント
  text: トレースの収集
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: ブログ
  text: Watchdog RCA による自動化された根本原因分析
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: ブログ
  text: Watchdog Impact Analysis によるユーザーインパクト範囲の把握
kind: ドキュメント
title: Watchdog
---

{{< img src="watchdog/watchdog.png" alt="エラーレートに関する 2 つの継続的な重要アラートを表示する Watchdog Alerts ページ" >}}

## 概要

Watchdog は、アプリケーションやインフラストラクチャーの潜在的な問題を自動的に検出する APM パファーマンスおよびインフラストラクチャーメトリクスのアルゴリズム機能です。Watchdog は以下の傾向やパターンを監視します。異常検知やダッシュボードを起動するのと同様の季節アルゴリズムを活用します。Watchdog は以下の傾向やパターンを監視します。

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

Watchdog は、ヒット率が突然急上昇するなど、メトリクスに不規則性がないかを調べます。各不規則性に対して、[Watchdog ページ][11]は Watchdog アラートを表示します。各アラートには、検出されたメトリクスの不規則性のグラフが含まれ、関連する時間枠とエンドポイントまたはエンドポイントに関する詳細な情報を提供します。Watchdog は、Datadog Agent またはインテグレーションによって送信されたデータを自動的に監視します。

メトリクス、ログ、その他のデータの新しいソースに対して、Watchdog は予想される動作のベースラインを確立するために 2 週間のデータを要求します。2 週間未満のデータに基づいて Watchdog が検出した異常には、不正確なものが含まれている可能性があります。

## サービス一覧画面内の Watchdog

Watchdog が APM メトリクスに異常を検出すると、[APM サービス一覧][12]の影響を受けるサービスの横にピンク色の Watchdog 双眼鏡のアイコンが表示さ れます。双眼鏡の横の数字は、Watchdog がそのサービス内で検出した問題の数を示しています。

{{< img src="watchdog/service_list.png" alt="APM サービス一覧ページの画面、5 つのサービスが表示されています。Web ストアのサービス名の後にピンクの双眼鏡のアイコンがついています。" style="width:75%;" >}}

[サービスページ][13]に移動して、メトリクス異常の詳細を見ることができます。ページの上部には、Watchdog Insights ボックスがあります。Watchdog Insights を使用すると、エラー率やレイテンシーの上昇など、異常な動作に関連するタグ値を発見することができます。

Watchdog のアイコンは、メトリクスグラフにも表示されます。

{{< img src="watchdog/latency_graph.png" alt="サービスのレイテンシー (秒) をY軸に、時間帯を X 軸にとったグラフ。グラフ全体がピンク色で表示され、上部に「May 2: 13:31 Ongoing」と表示されている" style="width:75%;" >}}

双眼鏡のアイコンをクリックすると、詳細が書かれた [Watchdog アラート][14]のカードが表示されます。

## トラブルシューティング

ご不明な点は [Datadog サポート][15]までお問い合わせください。

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
[12]: /ja/tracing/services/services_list/
[13]: /ja/tracing/services/service_page/#overview
[14]: /ja/watchdog/alerts#alert-details
[15]: /ja/help/
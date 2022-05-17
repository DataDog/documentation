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

## サービス一覧画面内の Watchdog

メトリクスに異常が検出された場合、[APM サービス一覧][12]では、その異常が発生しているサービスの横に Watchdog の黄色い双眼鏡アイコンが表示されます。双眼鏡の横の数字は、Watchdog がそのサービス内で認識した問題の数を示しています。

{{< img src="watchdog/service_list.png" alt="Watchdog サービス一覧" style="width:75%;" >}}

特定のサービスで通常と異なる動作が検出された場合、対応する[サービス詳細画面][12]を開くと、ページの中央、アプリケーションパフォーマンスのグラフとレイテンシー分散セクションの間に、その異常に関する Watchdog セクションが表示されます。このセクションには、関連する「Watchdog アラート」が表示されます。

{{< img src="watchdog/watchdog_story_bis.png" alt="Watchdog ストーリー bis" style="width:75%;">}}

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

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
[12]: /ja/tracing/visualization/services_list/
[13]: /ja/help/
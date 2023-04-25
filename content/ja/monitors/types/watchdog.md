---
aliases:
- /ja/monitors/monitor_types/watchdog
- /ja/monitors/create/types/watchdog/
description: アプリケーションとインフラストラクチャーの問題をアルゴリズムで検出する
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /watchdog/
  tag: ドキュメント
  text: Watchdog - アルゴリズムによるアプリケーションとインフラストラクチャーの問題の検出
kind: documentation
title: Watchdog モニター
---

## 概要

[Watchdog][1] は、APM、インフラストラクチャー、ログのためのアルゴリズム機能です。メトリクスやログの傾向やパターンを継続的に観測し、非定型的な挙動を探すことで、潜在的な問題を自動的に検出するものです。

## モニターの作成

Datadog で [Watchdog モニター][2]を作成するには、メインナビゲーションを使用して次のように移動します: *Monitors --> New Monitor --> Watchdog*。

### アラートタイプの選択

このセクションでは、APM、インフラストラクチャー、ログアラートのいずれかを選択します。

{{< tabs >}}
{{% tab "APM" %}}

Watchdog がシステムのサービスまたはその子リソースの異常な動作を検出すると、APM アラートが作成されます。

### ソースを選択 {#select-sources-1}

ドロップダウンメニューで[プライマリタグ][1]、[サービス][2]、[リソース][3]を選択します。

選択が完了すると、モニター作成ページの上部にあるグラフに、一致する Watchdog イベントとイベントのリストが経時的に表示されます。

[1]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /ja/tracing/services/service_page/
[3]: /ja/tracing/services/resource_page/
{{% /tab %}}
{{% tab "Infrastructure" %}}

インフラストラクチャー全体のアラートには、次のインテグレーションに関する問題が含まれる場合があります。

* [システム][1]: ホストレベルのメモリ使用量（メモリリーク）、TCP 再送率、など。
* [Redis][2]
* [PostgreSQL][3]
* [NGINX][4]
* [Amazon Web Services][5]:（[S3][6]、[ELB/ALB/NLB][7]、[CloudFront][8]、[DynamoDB][9] Amazon サービス）

インフラストラクチャーの選択後、モニター作成ページの上部にあるグラフに、Watchdog イベントとイベントのリストが経時的に表示されます。

### ソースを選択 {#select-sources-2}

選択する必要はありません。Watchdog がインフラストラクチャー全体で問題を検出すると、通知されます。


[1]: /ja/integrations/system/
[2]: /ja/integrations/redisdb/
[3]: /ja/integrations/postgres/
[4]: /ja/integrations/nginx/
[5]: /ja/integrations/amazon_web_services/
[6]: /ja/integrations/amazon_s3/
[7]: /ja/integrations/amazon_elb/
[8]: /ja/integrations/amazon_cloudfront/
[9]: /ja/integrations/amazon_dynamodb/

{{% /tab %}}
{{% tab "ログ (ベータ版)" %}}

アラートは、エラーログの新しいパターンが検出されたこと、または既存のエラーログのパターンが増加したことを示します。

{{< img src="/monitors/monitor_types/watchdog/log_anomaly_monitor.png" alt="Watchdog モニターの編集画面では、アラートカテゴリーがログ、アラートタイプがログ異常、環境が本番、サービスが広告サーバー、モニターのタイトルが本番広告サーバーで異常検出となっています" style="width:55%;">}}

### ソースを選択 {#select-sources-3}

環境、サービス、ログソース、ログステータス、ログアノマリータイプをドロップダウンメニューから選択します。

最初の 4 つのパラメーター (環境、サービス、ログソース、ログステータス) は、ログ自体の属性を参照しています。モニターは、Watchdog が指定された属性と一致するログの異常を発見した場合にのみトリガーされます。

5 番目のパラメーターであるログ異常タイプは、異常がエラーログの新しいパターンを示すか、既存のエラーログのパターンを増加させるかを意味します。

選択が完了すると、モニター作成ページの上部にあるグラフに、一致する Watchdog イベントとイベントのリストが経時的に表示されます。

{{% /tab %}}
{{< /tabs >}}

### 通知

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][3]のページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/watchdog/
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /ja/monitors/notify/
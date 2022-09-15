---
title: Watchdog モニター
kind: documentation
description: アプリケーションとインフラストラクチャーの問題をアルゴリズムで検出する
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: モニター通知の設定
  - link: /watchdog/
    tag: Documentation
    text: Watchdog - アルゴリズムによるアプリケーションとインフラストラクチャーの問題の検出
---
## 概要

[Watchdog][1] は、APM とインフラストラクチャーメトリクスのアルゴリズム機能です。メトリクスの傾向とパターンを継続的に観察し、非典型的な動作を探すことにより、アプリケーションとインフラストラクチャーの潜在的な問題を自動的に検出します。

## モニターの作成

Datadog で [Watchdog モニター][2]を作成するには、メインナビゲーションを使用して次のように移動します: *Monitors --> New Monitor --> Watchdog*。

### ストーリータイプを選択

このセクションでは、**APM** または **Infrastructure** ストーリーから選択します。

{{< tabs >}}
{{% tab "APM" %}}

Watchdog がシステムのサービスまたはその子リソースの異常な動作を検出すると、APM ストーリーが作成されます。

### ソースを選択 {#select-sources-1}

ドロップダウンメニューから[プライマリータグ] [1]、[サービス] [2]、および[リソース] [3]を選択します。

選択が完了すると、モニター作成ページの上部にあるグラフに、一致する Watchdog イベントとイベントのリストが経時的に表示されます。

[1]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /ja/tracing/visualization/service/
[3]: /ja/tracing/visualization/resource/
{{% /tab %}}
{{% tab "Infrastructure" %}}

インフラストラクチャー全体のストーリーには、次のインテグレーションに関する問題が含まれる場合があります。

* [システム][1]: ホストレベルのメモリ使用量（メモリリーク）、TCP 再送率、など。
* [Redis][2]
* [PostgreSQL][3]
* [NGINX][4]
* [Amazon Web Services][5]:（[S3][6]、[ELB/ALB/NLB][7]、[CloudFront][8]、[DynamoDB][9] Amazon サービス）

インフラストラクチャーの選択後、モニター作成ページの上部にあるグラフに、Watchdog イベントとイベントのリストが経時的に表示されます。

### ソースを選択 {#select-sources-2}

選択する必要はありません。Watchdog がインフラストラクチャー全体で問題を検出すると、通知されます。


[1]: /ja/integrations/system/
[2]: /ja/integrations/redis/
[3]: /ja/integrations/postgres/
[4]: /ja/integrations/nginx/
[5]: /ja/integrations/amazon_web_services/
[6]: /ja/integrations/amazon_s3/
[7]: /ja/integrations/amazon_elb/
[8]: /ja/integrations/amazon_cloudfront/
[9]: /ja/integrations/amazon_dynamodb/
{{% /tab %}}
{{< /tabs >}}

### Notifications

**何が起きているのか**および**チームに通知**のセクションの詳細な手順については、[通知] [3]ページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/watchdog/
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /ja/monitors/notifications/
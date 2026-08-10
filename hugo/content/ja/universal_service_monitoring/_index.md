---
aliases:
- /ja/tracing/universal_service_monitoring/
cascade:
  algolia:
    rank: 70
description: Universal Service Monitoring と Datadog Agent を使用することにより、コードインスツルメンテーションなしで、スタック全体のサービスの健全性メトリクスを監視します。
further_reading:
- link: /universal_service_monitoring/setup/
  tag: ドキュメント
  text: Universal Service Monitoring の設定
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: ブログ
  text: ユニバーサルサービスモニタリングで数秒のうちにゴールデンシグナル
- link: /getting_started/tagging/unified_service_tagging/
  tag: ドキュメント
  text: 統合サービスタグ付け
- link: /tracing/software_catalog/
  tag: ドキュメント
  text: Datadog に報告するサービスの発見とカタログ化
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/services_map/
  tag: ドキュメント
  text: サービスマップについて読む
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: ブログ
  text: コネクションチャーンを監視し、改善するためのベストプラクティス
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: ブログ
  text: Software Catalog でデベロッパー エクスペリエンスとコラボレーションを向上させる
- link: https://learn.datadoghq.com/courses/getting-started-usm
  tag: ラーニングセンター
  text: Universal Service Monitoring (USM) の概要
title: Universal Service Monitoring
---
## 概要 {#overview}

Universal Service Monitoring (USM) は、スタック全体のサービスの健全性メトリクスを、_コードのインスツルメンテーションなしで_可視化します。これは、構成されている Datadog Agent と [Unified Service Tagging][1] の存在のみに依存します。インスツルメンテーションがなされていないサービスのパフォーマンスデータを Software Catalog や Service Map などのビューに取り込みます。USM は、[デプロイ追跡][2]、モニター、ダッシュボード、SLO とも連携します。

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="Universal Service Monitoring の紹介動画。サービスマップ上でサービスをクリックし、サービス概要の表示を選択することにより、サービスの概要を確認できます。" video="true" >}}

## セットアップ {#setup}

サポートされているプラットフォームとプロトコルに関する情報、および利用開始の手順については、[Universal Service Monitoring のセットアップ][7]をお読みください。

<div class="alert alert-info"><strong>プレビュー: 追加のプロトコルと暗号化方式</strong><p>USM は、クラウドサービスの発見と追加のプロトコルおよびトラフィック暗号化方式のデコードに向けてプレビュー中です。詳細情報について、またはアクセスをリクエストすることについては、<a href="/universal_service_monitoring/additional_protocols/">クラウドサービスの発見と追加のプロトコル</a>をお読みください。</p></div>

## 自動サービスタグ付け {#automatic-service-tagging}

Universal Service Monitoring は、インフラストラクチャー内で実行されているサービスを自動的に検出します。[unified service tags][1] が見つからない場合は、次のタグのいずれかに基づいて名前が割り当てられます: `app`, `short_image`, `kube_container_name`, `container_name`, `kube_deployment`, `kube_service`。

サービス名を更新するには、[統合サービスタグ付け][1]を設定します。

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Datadog がサービスを自動的に検出すると、そのために使用されるタグがサービスページの上部に表示されます。" style="width:80%;" >}}

## サービスの確認 {#exploring-your-services}

エージェントを設定した後、サービスが Software Catalog に表示されるまで約 5 分間待ちます。サービスをクリックして、サービスの詳細ページを表示します。左上に `universal.http.server` または `universal.http.client` の操作名が表示されている場合、サービスのテレメトリは Universal Service Monitoring からのものです。

`universal.http.server` の操作名は、サービスへの受信トラフィックの健全性メトリクスが反映されます。対応する `universal.http.client` の操作名は、他の宛先への送信トラフィックを表します。

{{< img src="universal_service_monitoring/select_service_operation_cropped.png" alt="サービスタブの操作ドロップダウンメニューには、利用可能な操作の名前が表示されます。" style="width:100%;" >}}

ユニバーサルサービスモニタリングを有効にすると、次のことが可能になります。


- **APM** > **Software Catalog** または **APM** > **Service Map** に移動して、[サービスとその依存関係を視覚化します][3]。

- 特定の Service ページをクリックして、ゴールデンシグナルメトリクス (リクエスト、エラー、期間) を確認し、[デプロイ追跡][2]で最近のコード変更と相関させることができます。

- `universal.http.*` メトリクスを使用して、[モニター][4]、[ダッシュボード][5]、[SLO][6] を作成します。



## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/tracing/services/deployment_tracking/
[3]: /ja/tracing/software_catalog/
[4]: /ja/monitors/types/apm/?tab=apmmetrics
[5]: /ja/dashboards/
[6]: /ja/service_level_objectives/metric/
[7]: /ja/universal_service_monitoring/setup/
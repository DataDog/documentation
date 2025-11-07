---
aliases:
- /ja/tracing/universal_service_monitoring/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /universal_service_monitoring/setup/
  tag: ドキュメント
  text: ユニバーサルサービスモニタリングのセットアップ
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: ブログ
  text: ユニバーサルサービスモニタリングで数秒のうちにゴールデンシグナル
- link: /getting_started/tagging/unified_service_tagging/
  tag: ドキュメント
  text: 統合サービスタグ付け
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Datadog に報告するサービスの発見とカタログ化
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/services_map/
  tag: ドキュメント
  text: サービスマップについて読む
title: ユニバーサル サービス モニタリング
---

## 概要

ユニバーサルサービスモニタリング (USM) は、_コードをインスツルメンテーションすることなく_、スタック全体にわたってサービスの健全性メトリクスを一元的に視覚化します。USM は、構成された Datadog Agent と[統合サービスタグ付け][1]の存在のみに依存し、インスツルメンテーションされていないサービスのパフォーマンスデータをサービスカタログやサービスマップなどのビューに取り込みます。USM は、[デプロイ追跡][2]、モニター、ダッシュボード、および SLO とも連携します。

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="ユニバーサルサービスモニタリングのデモビデオ。サービスの概要には、サービスマップでサービスをクリックし、View service overview を選択することでアクセスできます。" video="true" >}}

## セットアップ

サポートされているプラットフォームとプロトコル、および開始手順については、[ユニバーサルサービスモニタリングのセットアップ][7]をお読みください。

<div class="alert alert-info"><strong>ベータ版: 追加のプロトコルと暗号化方式</strong><p> USM は、クラウドサービスの検出と、追加プロトコルとトラフィック暗号化方式のデコードをベータ版でサポートしています。詳細および非公開ベータ版へのアクセスリクエストについては、<a href="/universal_service_monitoring/additional_protocols/">クラウドサービスの検出と追加プロトコル</a>を参照してください。 </p></div>


## 自動サービスタグ付け

ユニバーサルサービスモニタリングは、インフラストラクチャーで稼働しているサービスを自動的に検出します。[統合サービスタグ付け][1]が見つからない場合、タグの 1 つ (`app`、`short_image`、`kube_container_name`、`container_name`、`kube_deployment`、`kube_service`) に基づいて名前を付けます。

サービス名を更新するには、[統合サービスタグ付け][1]を設定します。

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Datadog がサービスを自動検出すると、その際に使用されるタグがサービスページの上部に表示されます" style="width:80%;" >}}

## サービスの確認

Agent を構成した後、サービスカタログにサービスが表示されるまで約 5 分間待ちます。サービスをクリックすると、サービスの詳細ページが表示されます。左上の操作名 `universal.http.server` または `universal.http.client` は、サービスのテレメトリーがユニバーサルサービスモニタリングから来ることを示します。

`universal.http.server` という操作名で、サービスへのインバウンドトラフィックのヘルスメトリクスを取得します。対応する `universal.http.client` 操作名は、他の宛先へのアウトバウンドトラフィックを表します。

{{< img src="universal_service_monitoring/select_service_operation_cropped.png" alt="The operation dropdown menu on the Services tab shows the available operation names" style="width:100%;" >}}

ユニバーサルサービスモニタリングを有効にすると、次のことが可能になります。


- **APM** > **Service Catalog** または **APM** > **Service Map** に移動して、[サービスとその依存関係を視覚化します][3]。

- 特定の Service ページをクリックして、ゴールデンシグナルメトリクス (リクエスト、エラー、期間) を確認し、[デプロイ追跡][2]で最近のコード変更と相関させることができます。

- `universal.http.*` メトリクスを使用して、[モニター][4]、[ダッシュボード][5]、[SLO][6] を作成します。



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/tracing/services/deployment_tracking/
[3]: /ja/tracing/service_catalog/
[4]: /ja/monitors/types/apm/?tab=apmmetrics
[5]: /ja/dashboards/
[6]: /ja/service_management/service_level_objectives/metric/
[7]: /ja/universal_service_monitoring/setup/

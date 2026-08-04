---
aliases:
- /ja/network_performance_monitoring/guide/manage_traffic_costs_with_npm/
- /ja/network_monitoring/performance/guide/manage_traffic_costs_with_npm/
further_reading:
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: ブログ
  text: Datadog CNM でクラウド アーキテクチャとアプリ 依存関係を監視する
title: CNM でクラウド トラフィック コストを管理する
---
ネットワーク トラフィックは高額になりがちで、特にクラウド環境ではその傾向が顕著です。クラウド プロバイダーは、トラフィックがアベイラビリティ ゾーン (AZ) 内に留まるのか、AZ 間を移動するのか、リージョン をまたぐのか、あるいはパブリック インターネットへ出ていくのかによって、異なる単価を適用します。なかでもリージョン 間トラフィックやエグレス トラフィックは最も高価になりやすく、設定ミスが起きやすいほか、レイテンシ やセキュリティ リスクの要因にもなります。

Cloud Network Monitoring (CNM) を使うと、Datadog 内の任意のタグ同士 (service や container、availability zone、region、datacenter など) の依存関係をマッピングすることで、上記のあらゆるトラフィック パターンを追跡できます。依存関係の構造と、それが生み出すトラフィック ボリューム (最終的にクラウド プロバイダーが課金対象とする量) を把握できるため、トラフィック 起因のコストを継続監視し、最適化に活用できます。

## Datadog の事例

Datadog が Kubernetes へ移行した際、Kafka のようなステートフル サービスの移行は、想定どおりステートレス サービスよりも手間がかかったため、先にステートレス サービスから移行しました。ところがこの進め方により、ステートフル サービス (1 つの AZ に集約) と、他の AZ に分散配置されたステートレス サービスの間で、数 TB 規模の新たな AZ 間トラフィックが発生し、クラウド請求額が大きく、しかも想定外に増加しました。Datadog は自社の CNM 製品を活用して、根本原因が「高コストで非効率なネットワーク 通信を招く移行戦略」にあることを特定しました。最終的には、ステートフル サービスをシャーディングすることで、クラウド プロバイダーのトラフィック コストを大幅に削減できました。

## トラフィック コスト管理の手順

1. 同様の問題を自分の環境で見つけるには、まず [`client` と `server` タグ][1] を使って、リージョン、アベイラビリティ ゾーン、データ センター間のトラフィックをスコープするところから始めます:
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/availability_zone_2.png" alt="アベイラビリティ ゾーンとデータ センター別にトラフィック フローをグループ化" >}}

    トラフィック の請求額が増えるときは、ほぼ例外なく、これらの種類のいずれかのトラフィックが増加しています。多くのケースでは、非対称な検索条件でトラフィックをグルーピングしたくなるはずです。つまり、トラフィックの送信元はあるタグで見たい一方、送信先は別のタグで見たい、という状況です。このような非対称クエリを使うと、オンプレミスのデータ センターとクラウド リージョン間、またはクラウド同士の間にある、高コストな依存関係を見つけやすくなります。特に有用なのは、送信元を service で、送信先をアベイラビリティ ゾーンでグループ化して見る方法です。

     {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/search_by_service_az.png" alt="データ センターとクラウド リージョン間の依存関係を特定" >}}

2. 次に、複数の AZ をまたいでトラフィック ボリュームが特に大きい service を切り出します。facet パネルのフィルターと検索バーの両方を使って、クエリを絞り込めます。たとえば、1 つのアベイラビリティ ゾーン内から発生し、別のアベイラビリティ ゾーンへ送信している service だけを表示できます。
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/service_availability_zone2.png" alt="AZ 間で通信している service を強調表示" >}}

    上のクエリでは、`us-east-1a` から `us-east-1c` へ通信している service が強調表示されます。テーブルはすでにボリューム順に並んでいるため、上位の数行を見るだけで、AZ 間トラフィックの大半に寄与している “おしゃべりな” service がすぐに分かります。さらに原因候補の 1 つについて、インフラ 全体に及ぶ影響を確認したい場合は、アベイラビリティ ゾーンをまたいで service 名でソートしてください。

    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/single_service_2.png" alt="単一の service を検索し、アベイラビリティ ゾーン別にソート" >}}

3. 同様に、team タグを使えば、たとえばリージョン 間トラフィックを最も多く発生させているエンジニアリング チームを特定できます。

   {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/team_region_2.png" alt="team タグでトラフィックを切り分ける" >}}

4. 外部向けトラフィックに伴うコストを監視するには、**IP Type** facet を使って送信先エンドポイントをパブリック IP に絞り込みます。
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/scope_destination_points_2.png" alt="IP Type facet を使用する" style="width: 40%;">}}

    続いて送信先を `domain` でグループ化し、外部トラフィックがどこへ向かっているかを分解して把握します。パブリック サーバーには Datadog Agent をインストールできませんが、Datadog は外部およびクラウド側エンドポイントを表す IP を、人が読めるドメイン名へ解決できます。

    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/server_traffic_by_domain.png" alt="service と domain でトラフィックをフィルタリング" >}}

## トラフィック コストの可視化

ボトルネックを特定するには、[Network Map][2] を使って AZ 間トラフィックや AZ 間 (inter-AZ) トラフィックを可視化できます。このビューでは、EU と US のアベイラビリティ ゾーン同士が通信していないことを検証し、GDPR への準拠とデータ 保護を担保する、といった確認も可能です。
AZ 間トラフィック:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/cross-az-traffic_2.png" alt="Network Map における AZ 間トラフィック" >}}
AZ 間の service 間トラフィック:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/inter-az-service-to-service-traffic.png" alt="AZ 間の service 間トラフィック" >}}

**Filter traffic** ボタンから設定を編集できます。より大規模な環境では、スライダーを動かして高ボリュームの依存関係だけを含めるようにし、影響が大きいトラフィック ソースにスコープを絞ることを Datadog は推奨しています。

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/filter-traffic_2.png" alt="トラフィックをフィルタリング" style="width: 50%;">}}

## トラフィック コストのグラフ化

Datadog は、ダッシュボードやノートブックでトラフィック ボリュームのメトリクスを時系列で追跡することを推奨しています。[Cloud Network][3] ページで使うのと同じクエリを用いて、任意の 2 つのエンドポイント間のトラフィックをグラフ化できます。手順としては、**Timeseries Widget** を作成し、ドロップダウン メニューから **Network** ソースを選択します。

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/timeseries_2.png" alt="Network メトリクスで Timeseries Widget を作成" >}}

**注**: ネットワーク ホストの hostname を特定する際には、`datadog.npm.host_instance` メトリクスが利用できます。このホストの最新メトリクスが 14 日以上前の場合は、次のクエリで手動更新が必要になります: `avg:datadog.npm.host_instance{*} by {host}`。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/cloud_network_monitoring/network_analytics/?tab=loadbalancers#queries
[2]: /ja/network_monitoring/cloud_network_monitoring/network_map
[3]: https://app.datadoghq.com/network
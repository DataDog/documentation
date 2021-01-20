---
title: NPM でクラウドトラフィックのコストを管理する
kind: ガイド
---
特にクラウド環境ではトラフィックが高額になりがちです。クラウドプロバイダーはトラフィックがアベイラビリティーゾーン (AZ) の範囲内、AZ 間、特定のリージョン間、またはオープンなインターネットのどれに流入するのかに応じて異なる課金形態を採用しています。クロスリージョンおよび送信トラフィックは最も高額となるだけでなく、エラー、レイテンシー、セキュリティ上の脅威に対する脆弱性も最高水準となります。

ネットワークパフォーマンスモニタリング (NPM) では、サービス、コンテナ、アベイラビリティーゾーン、リージョン、データセンターなどを含む Datadog のタグ間の依存関係をマッピングすることで、上述のすべてのトラフィックパターンを追跡することができます。依存関係とそこから生み出されるトラフィックの量 (最終的にクラウドプロバイダーにより課金される量) に関するこのインサイトを使用して、トラフィック関連のコストを監視および最適化することができます。

## Datadog のストーリー

Datadog で Kubernetes への移行を行いましたが、ステートレスサービスの移行は (期待通り) ステートフルサービス (Kafka など) の移行に比べてとても速く、簡単に完了することができました。その結果、ステートフルサービス (すべて同じ AZ) とステートレスサービス (複数の AZ にまたがる形) 間でテラバイト単位の新しいクロス AZ トラフィックが流入し、クラウドの請求が予期せぬ形で急増したのですが、Datadog 独自の NPM プロダクトのおかげで根本原因を特定できました。移行戦略が最適ではなかったため、ネットワーク通信が非効率かつ高額になってしまっていたのです。ステートフルサービスのシャーディングを行うことで、最終的にクラウドプロバイダーのトラフィックコストを劇的に削減することができました。

## トラフィックコスト管理のステップ

1. お使いの環境で同様の問題がないかを調べるために、まずビューの範囲をリージョン、
    アベイラビリティーゾーン、
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/availability_zone.png" alt="アベイラビリティー別のグループフロー">}}
    データセンター間で絞り込んで確認することをお勧めします。
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/datacenter.png" alt="データセンター別のグループフロー">}}
    トラフィック請求額の増加は、ほぼ必ずこれらの種類のトラフィックのいずれかの増加に関連しています。多くの場合、非対称の検索用語でトラフィックをグループ化してみるのも効果的です。あるタグに関するトラフィック元と別のタグの送信先を確認するという手法です。このように非対称のクエリを使用することで、高額請求の原因となるオンプレミスデータセンターとクラウドリージョン間、
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/aws_account.png" alt="データセンターとクラウドリージョン間の依存関係を特定">}}
    およびクラウド間の依存関係を特定することができます。特に、トラフィックのソースをサービス、および複数のアベイラビリティーゾーンをまたぐ送信先でグループ化すると便利です。

2. ここから、複数のAZ をまたいで最もトラフィック量が多いサービスを切り離します。検索バー内のフィルターを使用してクエリを絞り込むことができます。たとえば、ひとつのアベイラビリティーゾーン内を起点とし、他のアベイラビリティーゾーンにトラフィックを送信しているサービスのみを表示させることが可能です。
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/service_availability_zone.png" alt="AZ をまたぐ形で通信を行ったサービスのハイライト">}}
    上記のクエリは `us-east4-a` からどこかに通信を行ったサービスのみをハイライトするものです。表はすでに量でソートされているため、最初の数行には最も多くのクロス AZ トラフィックを呼び込む原因となった、最も混雑していたサービスが表示されます。これらのひとつについてインフラストラクチャーをまたいだ場合の効果を検証したい場合は、**Source** でその特定のサービスにフィルターを適用し、他の各アベイラビリティーゾーンに対するトラフィックを確認すると良いでしょう。
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/single_service.png" alt="単一のサービスを検索">}}

3. 同様に、チームタグを使用して、たとえばどのエンジニアリングチームがクロスリージョンのトラフィックに起因したかを特定したり、
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/team_region.png" alt="チームタグの使用">}}
所属するチームのアウトプットを個別に監視したりすることができます。
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/region_region.png" alt="リージョンタグの使用">}}

4. 外部トラフィックからのコストを監視する場合は、**IP Type** ファセットを使用して送信先のエンドポイントをパブリック IP に絞ります。
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/scope_destination_points.png" alt="Type ファセットの使用">}}
    その後、送信先を `domain` でグループ化して送信先ごとに外部トラフィックの量を分割します。パブリックサーバーには Datadog Agent をインストールできませんが、Datadog は外部およびクラウドエンドポイントを示す IP を、読んで意味の通るわかりやすいドメイン名に変換して解決することができます。
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/dns_resolution.png" alt="DNS でグループ化">}}
    上記のサンプルクエリは部分文字列のワイルドカードエントリ (dns:*s3* など) を使用して AWS S3、Elastic ロードバランサー、API、および外部の `.com` ドメインへのトラフィックでフィルターを適用しています。
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/wildcard.png" alt="ワイルドカード検索">}}

## トラフィックコストの可視化

AZ をまたぐ、または AZ 内部のトラフィックは Network Map で可視化してすばやくボトルネックを特定することができます。Datadog では、このビューを使用して EU および米国のアベイラビリティーゾーンが通信していないことを検証し、GDPR の遵守と顧客データ保護の確認を行っています。
AZ をまたぐトラフィック:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/cross-az-traffic.png" alt="AZ をまたぐトラフィック">}}
AZ 内のサービス対サービスのトラフィック:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/inter-az-service-to-service-traffic.png" alt="AZ 内のサービス対サービスのトラフィック">}}
マップのノード間の太線はアベイラビリティーゾーンを示しており、各ノード間で大量のトラフィックが流れていることを表します。これがコストにつながるトラフィック量となります。

設定は **Filter traffic** ボタンから編集することができます。大規模環境の場合、Datadog はスライダーを移動させてトラフィック量が最多の依存関係のみを含む、最も目立つトラフィックソースだけをグループ化することを推奨しています。

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/filter-traffic.png" alt="トラフィックのスコープを指定">}}

## トラフィックコストのグラフ化

Datadog は、ダッシュボードとノートブックで時間の経過に伴うトラフィック量のメトリクスを追跡することを推奨しています。ネットワークページで用いたものと同じクエリを使用して、任意の 2 つのエンドポイント間のトラフィックをグラフ化することができます。**Timeseries Widget** を作成し、ドロップダウンメニューから **Network Traffic** ソースを選択してください。

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/timeseries.png" alt="時系列を作成">}}

ダッシュボードとノートブックを利用することで、チームメイトへの問題共有もしやすくなります。

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/network-traffic.png" alt="ネットワークトラフィックの表示">}}

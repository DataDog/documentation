---
app_id: alibaba_cloud
categories:
- cloud
custom_kind: integration
description: Alibaba Cloud の各種サービスを Datadog とインテグレーションします。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-alibaba-cloud-datadog/
  tag: ブログ
  text: Datadog で Alibaba Cloud を監視する
title: Alibaba Cloud
---
{{< site-region region="gov" >}}

<div class="alert alert-warning">Datadog の Alibaba Cloud インテグレーションは、Datadog for Government サイトに対応していません。</div>
{{< /site-region >}}

## 概要

Alibaba Cloud に接続すると、次のリソースからメトリクスを取得できます。

- Alibaba Cloud Server Load Balancer (SLB)
- Alibaba Elastic Compute Service インスタンス
- Alibaba Cloud ApsaraDB for RDS インスタンス
- Alibaba Cloud ApsaraDB for Redis インスタンス
- Alibaba Cloud Content Delivery Network (CDN) インスタンス
- Alibaba Cloud Container Service クラスター
- Alibaba Cloud Express Connect インスタンス

## セットアップ

### インストール

[Datadog-Alibaba Cloud インテグレーション設定タイル](https://app.datadoghq.com/integrations/alibaba_cloud) に移動し、_add account_ をクリックします。

### 設定

Datadog を Alibaba Cloud API とインテグレーションするには、次の項目を設定します。

- **`Account Id`**

Alibaba Cloud コンソール右上のアバターにカーソルを合わせ、_Security Settings_ を選択します。アカウント ID は、そのページの上部に表示されます。

{{< img src="integrations/alibaba_cloud/account_id_ac.png" alt="アカウント ID (AC)" style="width:30%;">}}

- **`Access Key Id`** & **`Access Key Secret`**

Alibaba Cloud アカウントで、

1. _RAM_ タブから次の内容で新しいユーザーを作成します。

   - `Logon Name`: Datadog
   - `display name`: Datadog
   - `description`: Datadog-Alibaba Cloud インテグレーション用の Datadog ユーザー

1. アクセス方法として _Programmatic Access_ を選択します。

   {{< img src="integrations/alibaba_cloud/ac_programmatic_access.png" alt="Programmatic Access" style="width:40%;">}}

1. _OK_ をクリックしたら、`AccessKeyID` と `AccessKeySecret` を [Datadog-Alibaba Cloud インテグレーション タイル](https://app.datadoghq.com/integrations/alibaba_cloud) にコピーして貼り付け、_install integration_ をクリックします。

   {{< img src="integrations/alibaba_cloud/ac_access_keys.png" alt="AC アクセス キー" style="width:40%;">}}

1. Alibaba Cloud アカウントで、先ほど作成したユーザーの `Add Permissions` を選び、以下の権限をすべて追加します。

   ```text
   AliyunCloudMonitorReadOnlyAccess
   AliyunECSReadOnlyAccess
   AliyunKvstoreReadOnlyAccess
   AliyunRDSReadOnlyAccess
   AliyunSLBReadOnlyAccess
   AliyunCDNReadOnlyAccess
   AliyunCSReadOnlyAccess
   AliyunExpressConnectReadOnlyAccess
   ```

1. _Update_ をクリックすると、約 15 分後に Datadog-Alibaba Cloud インテグレーション タイルの _Metrics_ タブで確認できるメトリクスが、リソースに付与したカスタム タグや以下の API から取得されるタグが付いた状態で [Metric Explorer ページ](https://app.datadoghq.com/metric/explorer) に表示され始めます。

   - [kvstore/redis DescribeInstances](https://www.alibabacloud.com/help/doc-detail/60933.htm)
   - [ECS DescribeInstances](https://www.alibabacloud.com/help/doc-detail/25506.htm)
   - [DescribeDBInstances](https://www.alibabacloud.com/help/doc-detail/26232.htm)
   - [DescribeLoadBalancers](https://www.alibabacloud.com/help/doc-detail/27582.htm)

1. 任意で、[Datadog-Alibaba Cloud インテグレーション タイル](https://app.datadoghq.com/integrations/alibaba_cloud) の `Optionally Limit Metrics Collection` を設定できます。ここには、Alibaba Cloud からメトリクスを収集する際のフィルターとして使う Alibaba Cloud タグを、カンマ区切りで指定します (形式は `<KEY:VALUE>`)。`?` (1 文字) や `*` (複数文字) のワイルドカードも利用できます。定義したラベルのいずれかに一致するホストだけが Datadog に取り込まれ、それ以外は無視されます。特定のラベルに一致するホストを除外するには、ラベルの前に `!` を付けます。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **alibabacloud.slb.healthy_server_count.average** <br>(gauge) | 正常なバックエンド ECS インスタンス数<br>_単位は instance_ |
| **alibabacloud.slb.healthy_server_count.minimum** <br>(gauge) | 正常なバックエンド ECS インスタンス数<br>_単位は instance_ |
| **alibabacloud.slb.healthy_server_count.maximum** <br>(gauge) | 正常なバックエンド ECS インスタンス数<br>_単位は instance_ |
| **alibabacloud.slb.unhealthy_server_count.average** <br>(gauge) | 異常なバックエンド ECS インスタンス数<br>_単位は instance_ |
| **alibabacloud.slb.unhealthy_server_count.minimum** <br>(gauge) | 異常なバックエンド ECS インスタンス数<br>_単位は instance_ |
| **alibabacloud.slb.unhealthy_server_count.maximum** <br>(gauge) | 異常なバックエンド ECS インスタンス数<br>_単位は instance_ |
| **alibabacloud.slb.packet_tx.average** <br>(rate) | ポートで 1 秒あたりに送信されるパケット数<br>_単位は packet_ |
| **alibabacloud.slb.packet_tx.minimum** <br>(rate) | ポートで 1 秒あたりに送信されるパケット数<br>_単位は packet_ |
| **alibabacloud.slb.packet_tx.maximum** <br>(rate) | ポートで 1 秒あたりに送信されるパケット数<br>_単位は packet_ |
| **alibabacloud.slb.packet_rx.average** <br>(rate) | ポートで 1 秒あたりに受信されるパケット数<br>_単位は packet_ |
| **alibabacloud.slb.packet_rx.minimum** <br>(rate) | ポートで 1 秒あたりに受信されるパケット数<br>_単位は packet_ |
| **alibabacloud.slb.packet_rx.maximum** <br>(rate) | ポートで 1 秒あたりに受信されるパケット数<br>_単位は packet_ |
| **alibabacloud.slb.traffic_rx_new.average** <br>(rate) | ポートで 1 秒あたりに受信するデータ量<br>_単位は bit_ |
| **alibabacloud.slb.traffic_rx_new.minimum** <br>(rate) | ポートで 1 秒あたりに受信するデータ量<br>_単位は bit_ |
| **alibabacloud.slb.traffic_rx_new.maximum** <br>(rate) | ポートで 1 秒あたりに受信するデータ量<br>_単位は bit_ |
| **alibabacloud.slb.traffic_tx_new.average** <br>(rate) | ポートで 1 秒あたりに送信するデータ量<br>_単位は bit_ |
| **alibabacloud.slb.traffic_tx_new.minimum** <br>(rate) | ポートで 1 秒あたりに送信するデータ量<br>_単位は bit_ |
| **alibabacloud.slb.traffic_tx_new.maximum** <br>(rate) | ポートで 1 秒あたりに送信するデータ量<br>_単位は bit_ |
| **alibabacloud.slb.active_connection.average** <br>(gauge) | ポート上のアクティブ接続数。クライアントが Server Load Balancer にアクセスするために確立した接続数です。<br>_単位は connection_ |
| **alibabacloud.slb.active_connection.minimum** <br>(gauge) | ポート上のアクティブ接続数。クライアントが Server Load Balancer にアクセスするために確立した接続数です。<br>_単位は connection_ |
| **alibabacloud.slb.active_connection.maximum** <br>(gauge) | ポート上のアクティブ接続数。クライアントが Server Load Balancer にアクセスするために確立した接続数です。<br>_単位は connection_ |
| **alibabacloud.slb.inactive_connection.average** <br>(gauge) | ポート上の非アクティブ接続数。Server Load Balancer へのアクセス後にアイドル状態になっている接続数です。<br>_単位は connection_ |
| **alibabacloud.slb.inactive_connection.minimum** <br>(gauge) | ポート上の非アクティブ接続数。Server Load Balancer へのアクセス後にアイドル状態になっている接続数です。<br>_単位は connection_ |
| **alibabacloud.slb.inactive_connection.maximum** <br>(gauge) | ポート上の非アクティブ接続数。Server Load Balancer へのアクセス後にアイドル状態になっている接続数です。<br>_単位は connection_ |
| **alibabacloud.slb.new_connection.average** <br>(gauge) | ポート上の現在の新規接続数<br>_単位は connection_ |
| **alibabacloud.slb.new_connection.minimum** <br>(gauge) | ポート上の現在の新規接続数<br>_単位は connection_ |
| **alibabacloud.slb.new_connection.maximum** <br>(gauge) | ポート上の現在の新規接続数<br>_単位は connection_ |
| **alibabacloud.slb.max_connection.average** <br>(gauge) | ポート上の同時接続数<br>_単位は connection_ |
| **alibabacloud.slb.max_connection.minimum** <br>(gauge) | ポート上の同時接続数<br>_単位は connection_ |
| **alibabacloud.slb.max_connection.maximum** <br>(gauge) | ポート上の同時接続数<br>_単位は connection_ |
| **alibabacloud.slb.drop_connection.average** <br>(rate) | 監視中に 1 秒あたりで破棄された接続数<br>_単位は connection_ |
| **alibabacloud.slb.drop_connection.minimum** <br>(rate) | 監視中に 1 秒あたりで破棄された接続数<br>_単位は connection_ |
| **alibabacloud.slb.drop_connection.maximum** <br>(rate) | 監視中に 1 秒あたりで破棄された接続数<br>_単位は connection_ |
| **alibabacloud.slb.drop_packet_rx.average** <br>(rate) | 監視中に 1 秒あたりで破棄された受信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.drop_packet_rx.minimum** <br>(rate) | 監視中に 1 秒あたりで破棄された受信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.drop_packet_rx.maximum** <br>(rate) | 監視中に 1 秒あたりで破棄された受信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.drop_packet_tx.average** <br>(rate) | 監視中に 1 秒あたりで破棄された送信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.drop_packet_tx.minimum** <br>(rate) | 監視中に 1 秒あたりで破棄された送信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.drop_packet_tx.maximum** <br>(rate) | 監視中に 1 秒あたりで破棄された送信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.drop_traffic_rx.average** <br>(rate) | 監視中に 1 秒あたりで破棄された受信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.drop_traffic_rx.minimum** <br>(rate) | 監視中に 1 秒あたりで破棄された受信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.drop_traffic_rx.maximum** <br>(rate) | 監視中に 1 秒あたりで破棄された受信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_active_connection.average** <br>(rate) | インスタンス上の 1 秒あたりのアクティブ接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_active_connection.minimum** <br>(rate) | インスタンス上の 1 秒あたりのアクティブ接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_active_connection.maximum** <br>(rate) | インスタンス上の 1 秒あたりのアクティブ接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_drop_connection.average** <br>(rate) | インスタンス上で 1 秒あたりに破棄された接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_drop_connection.minimum** <br>(rate) | インスタンス上で 1 秒あたりに破棄された接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_drop_connection.maximum** <br>(rate) | インスタンス上で 1 秒あたりに破棄された接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_drop_packet_rx.average** <br>(rate) | インスタンス上で 1 秒あたりに破棄された受信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_drop_packet_rx.minimum** <br>(rate) | インスタンス上で 1 秒あたりに破棄された受信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_drop_packet_rx.maximum** <br>(rate) | インスタンス上で 1 秒あたりに破棄された受信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_drop_packet_tx.average** <br>(rate) | インスタンス上で 1 秒あたりに破棄された送信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_drop_packet_tx.minimum** <br>(rate) | インスタンス上で 1 秒あたりに破棄された送信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_drop_packet_tx.maximum** <br>(rate) | インスタンス上で 1 秒あたりに破棄された送信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_drop_traffic_rx.average** <br>(rate) | インスタンス上で 1 秒あたりに破棄された受信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_drop_traffic_rx.minimum** <br>(rate) | インスタンス上で 1 秒あたりに破棄された受信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_drop_traffic_rx.maximum** <br>(rate) | インスタンス上で 1 秒あたりに破棄された受信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_drop_traffic_tx.average** <br>(rate) | インスタンス上で 1 秒あたりに破棄された送信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_drop_traffic_tx.minimum** <br>(rate) | インスタンス上で 1 秒あたりに破棄された送信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_drop_traffic_tx.maximum** <br>(rate) | インスタンス上で 1 秒あたりに破棄された送信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_inactive_connection.average** <br>(rate) | インスタンス上の 1 秒あたりの非アクティブ接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_inactive_connection.minimum** <br>(rate) | インスタンス上の 1 秒あたりの非アクティブ接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_inactive_connection.maximum** <br>(rate) | インスタンス上の 1 秒あたりの非アクティブ接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_max_connection.average** <br>(rate) | インスタンス上の 1 秒あたりの最大同時接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_max_connection.minimum** <br>(rate) | インスタンス上の 1 秒あたりの最大同時接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_max_connection.maximum** <br>(rate) | インスタンス上の 1 秒あたりの最大同時接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_new_connection.average** <br>(rate) | インスタンス上の 1 秒あたりの新規接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_new_connection.minimum** <br>(rate) | インスタンス上の 1 秒あたりの新規接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_new_connection.maximum** <br>(rate) | インスタンス上の 1 秒あたりの新規接続数<br>_単位は connection_ |
| **alibabacloud.slb.instance_packet_rx.average** <br>(rate) | インスタンス上の 1 秒あたりの受信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_packet_rx.minimum** <br>(rate) | インスタンス上の 1 秒あたりの受信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_packet_rx.maximum** <br>(rate) | インスタンス上の 1 秒あたりの受信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_packet_tx.average** <br>(rate) | インスタンス上の 1 秒あたりの送信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_packet_tx.minimum** <br>(rate) | インスタンス上の 1 秒あたりの送信パケット数<br>_単位は packet_ |
| **alibabacloud.slb.instance_packet_tx.maximum** <br>(rate) | Number of outgoing packets per second on the instance<br>_Shown as packet_ |
| **alibabacloud.slb.instance_traffic_rx.average** <br>(rate) | インスタンス上の 1 秒あたりの受信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_traffic_rx.minimum** <br>(rate) | インスタンス上の 1 秒あたりの受信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_traffic_rx.maximum** <br>(rate) | インスタンス上の 1 秒あたりの受信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_traffic_tx.average** <br>(rate) | インスタンス上の 1 秒あたりの送信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_traffic_tx.minimum** <br>(rate) | インスタンス上の 1 秒あたりの送信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.instance_traffic_tx.maximum** <br>(rate) | インスタンス上の 1 秒あたりの送信ビット数<br>_単位は bit_ |
| **alibabacloud.slb.qps.average** <br>(rate) | Layer 7 プロトコル ポートのクエリ数/秒 (QPS)<br>_単位は query_ |
| **alibabacloud.slb.rt.average** <br>(gauge) | Layer 7 プロトコル ポートの応答時間<br>_単位は millisecond_ |
| **alibabacloud.slb.status_code2xx.average** <br>(rate) | Layer 7 プロトコル ポートの 2XX ステータス コード数|
| **alibabacloud.slb.status_code3xx.average** <br>(rate) | Layer 7 プロトコル ポートの 3XX ステータス コード数|
| **alibabacloud.slb.status_code4xx.average** <br>(rate) | Layer 7 プロトコル ポートの 4XX ステータス コード数|
| **alibabacloud.slb.status_code5xx.average** <br>(rate) | Layer 7 プロトコル ポートの 5XX ステータス コード数|
| **alibabacloud.slb.upstream_code4xx.average** <br>(rate) | Layer 7 プロトコル ポートのアップストリーム 4xx ステータス コード数|
| **alibabacloud.slb.upstream_code5xx.average** <br>(rate) | Layer 7 プロトコル ポートのアップストリーム 5xx ステータス コード数|
| **alibabacloud.slb.upstream_rt.average** <br>(gauge) | Layer 7 プロトコル ポートのアップストリーム応答時間<br>_単位は millisecond_ |
| **alibabacloud.slb.instance_qps.average** <br>(rate) | Layer 7 プロトコル インスタンスのクエリ数/秒 (QPS)<br>_単位は query_ |
| **alibabacloud.slb.instance_rt.average** <br>(gauge) | Layer 7 プロトコル インスタンスの応答時間<br>_単位は millisecond_ |
| **alibabacloud.slb.instance_status_code2xx.average** <br>(rate) | Layer 7 プロトコル インスタンスの 2XX ステータス コード数|
| **alibabacloud.slb.instance_status_code3xx.average** <br>(rate) | Layer 7 プロトコル インスタンスの 3XX ステータス コード数|
| **alibabacloud.slb.instance_status_code4xx.average** <br>(rate) | Layer 7 プロトコル インスタンスの 4XX ステータス コード数|
| **alibabacloud.slb.instance_status_code5xx.average** <br>(rate) | Layer 7 プロトコル インスタンスの 5XX ステータス コード数|
| **alibabacloud.slb.instance_status_code_other.average** <br>(rate) | Layer 7 プロトコル インスタンスのその他のステータス コード数|
| **alibabacloud.slb.instance_upstream_code4xx.average** <br>(rate) | Layer 7 プロトコル インスタンスのアップストリーム 4XX ステータス コード数|
| **alibabacloud.slb.instance_upstream_code5xx.average** <br>(rate) | Layer 7 プロトコル インスタンスのアップストリーム 5XX ステータス コード数|
| **alibabacloud.slb.instance_upstream_rt.average** <br>(gauge) | Layer 7 プロトコル インスタンスのアップストリーム応答時間<br>_単位は millisecond_ |
| **alibabacloud.ecs.cpu_utilization.average** <br>(gauge) | CPU 使用率<br>_単位は percent_ |
| **alibabacloud.ecs.cpu_utilization.minimum** <br>(gauge) | CPU 使用率<br>_単位は percent_ |
| **alibabacloud.ecs.cpu_utilization.maximum** <br>(gauge) | CPU 使用率<br>_単位は percent_ |
| **alibabacloud.ecs.internet_in_rate.average** <br>(rate) | パブリック ネットワークの受信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.internet_in_rate.minimum** <br>(rate) | パブリック ネットワークの受信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.internet_in_rate.maximum** <br>(rate) | パブリック ネットワークの受信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.intranet_in_rate.average** <br>(rate) | プライベート ネットワークの受信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.intranet_in_rate.minimum** <br>(rate) | プライベート ネットワークの受信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.intranet_in_rate.maximum** <br>(rate) | プライベート ネットワークの受信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.internet_out_rate.average** <br>(rate) | パブリック ネットワークの送信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.internet_out_rate.minimum** <br>(rate) | パブリック ネットワークの送信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.internet_out_rate.maximum** <br>(rate) | パブリック ネットワークの送信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.intranet_out_rate.average** <br>(rate) | プライベート ネットワークの送信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.intranet_out_rate.maximum** <br>(rate) | プライベート ネットワークの送信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.intranet_out_rate.minimum** <br>(rate) | プライベート ネットワークの送信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.internet_out_rate_percent.average** <br>(gauge) | パブリック ネットワークの送信帯域幅使用率<br>_単位は percent_ |
| **alibabacloud.ecs.disk_read_bps.average** <br>(rate) | システム ディスク全体の読み取り BPS<br>_単位は bit_ |
| **alibabacloud.ecs.disk_read_bps.minimum** <br>(rate) | システム ディスク全体の読み取り BPS<br>_単位は bit_ |
| **alibabacloud.ecs.disk_read_bps.maximum** <br>(rate) | システム ディスク全体の読み取り BPS<br>_単位は bit_ |
| **alibabacloud.ecs.disk_write_bps.average** <br>(rate) | システム ディスク全体の書き込み BPS<br>_単位は bit_ |
| **alibabacloud.ecs.disk_write_bps.minimum** <br>(rate) | システム ディスク全体の書き込み BPS<br>_単位は bit_ |
| **alibabacloud.ecs.disk_write_bps.maximum** <br>(rate) | システム ディスク全体の書き込み BPS<br>_単位は bit_ |
| **alibabacloud.ecs.disk_read_iops.average** <br>(rate) | システム ディスクの読み取り IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.disk_read_iops.minimum** <br>(rate) | システム ディスクの読み取り IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.disk_read_iops.maximum** <br>(rate) | システム ディスクの読み取り IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.disk_write_iops.average** <br>(rate) | システム ディスクの書き込み IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.disk_write_iops.minimum** <br>(rate) | システム ディスクの書き込み IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.disk_write_iops.maximum** <br>(rate) | システム ディスクの書き込み IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.vpc_public_ip_internet_in_rate.average** <br>(rate) | VPC - パブリック ネットワークの受信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_in_rate.minimum** <br>(rate) | VPC - パブリック ネットワークの受信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_in_rate.maximum** <br>(rate) | VPC - パブリック ネットワークの受信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate.average** <br>(rate) | VPC - パブリック ネットワークの送信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate.minimum** <br>(rate) | VPC - パブリック ネットワークの送信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate.maximum** <br>(rate) | VPC - パブリック ネットワークの送信帯域幅<br>_単位は bit_ |
| **alibabacloud.ecs.vpc_public_ip_internet_out_rate_percent.average** <br>(gauge) | VPC - パブリック ネットワークの送信帯域幅使用率<br>_単位は percent_ |
| **alibabacloud.ecs.disk_readbytes.average** <br>(rate) | システム エージェントのディスク デバイスの読み取りバイト数<br>_単位は byte_ |
| **alibabacloud.ecs.disk_readbytes.minimum** <br>(rate) | システム エージェントのディスク デバイスの読み取りバイト数<br>_単位は byte_ |
| **alibabacloud.ecs.disk_readbytes.maximum** <br>(rate) | システム エージェントのディスク デバイスの読み取りバイト数<br>_単位は byte_ |
| **alibabacloud.ecs.disk_readiops.average** <br>(rate) | システム エージェントのディスク読み取り IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.disk_readiops.minimum** <br>(rate) | システム エージェントのディスク読み取り IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.disk_readiops.maximum** <br>(rate) | システム エージェントのディスク読み取り IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.disk_writebytes.average** <br>(rate) | システム エージェントのディスク デバイスの書き込みバイト数<br>_単位は byte_ |
| **alibabacloud.ecs.disk_writebytes.minimum** <br>(rate) | システム エージェントのディスク デバイスの書き込みバイト数<br>_単位は byte_ |
| **alibabacloud.ecs.disk_writebytes.maximum** <br>(rate) | システム エージェントのディスク デバイスの書き込みバイト数<br>_単位は byte_ |
| **alibabacloud.ecs.disk_writeiops.average** <br>(rate) | システム エージェントのディスク書き込み IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.disk_writeiops.minimum** <br>(rate) | システム エージェントのディスク書き込み IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.disk_writeiops.maximum** <br>(rate) | システム エージェントのディスク書き込み IOPS<br>_単位は operation_ |
| **alibabacloud.ecs.diskusage_avail.average** <br>(gauge) | システム エージェントの利用可能ディスク容量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_avail.minimum** <br>(gauge) | システム エージェントの利用可能ディスク容量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_avail.maximum** <br>(gauge) | システム エージェントの利用可能ディスク容量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_free.average** <br>(gauge) | ホスト ディスク空き容量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_free.minimum** <br>(gauge) | ホスト ディスク空き容量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_free.maximum** <br>(gauge) | ホスト ディスク空き容量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_total.average** <br>(gauge) | ホスト ディスク総容量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_total.minimum** <br>(gauge) | ホスト ディスク総容量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_total.maximum** <br>(gauge) | ホスト ディスク総容量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_used.average** <br>(gauge) | ホスト ディスク使用量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_used.minimum** <br>(gauge) | ホスト ディスク使用量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_used.maximum** <br>(gauge) | ホスト ディスク使用量<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_utilization.average** <br>(gauge) | ホスト ディスク使用率<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_utilization.minimum** <br>(gauge) | ホスト ディスク使用率<br>_単位は byte_ |
| **alibabacloud.ecs.diskusage_utilization.maximum** <br>(gauge) | ホスト ディスク使用率<br>_単位は byte_ |
| **alibabacloud.ecs.gpu_decoder_utilization.average** <br>(gauge) | GPU デコーダー使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_decoder_utilization.minimum** <br>(gauge) | GPU デコーダー使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_decoder_utilization.maximum** <br>(gauge) | GPU デコーダー使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_encoder_utilization.average** <br>(gauge) | GPU エンコーダー使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_encoder_utilization.minimum** <br>(gauge) | GPU エンコーダー使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_encoder_utilization.maximum** <br>(gauge) | GPU エンコーダー使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_gpu_temperature.average** <br>(gauge) | GPU 温度<br>_単位は degree celsius_ |
| **alibabacloud.ecs.gpu_gpu_temperature.minimum** <br>(gauge) | GPU 温度<br>_単位は degree celsius_ |
| **alibabacloud.ecs.gpu_gpu_temperature.maximum** <br>(gauge) | GPU 温度<br>_単位は degree celsius_ |
| **alibabacloud.ecs.gpu_gpu_usedutilization.average** <br>(gauge) | GPU 使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_gpu_usedutilization.minimum** <br>(gauge) | GPU 使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_gpu_usedutilization.maximum** <br>(gauge) | GPU 使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_memory_freespace.average** <br>(gauge) | GPU メモリ空き容量<br>_単位は byte_ |
| **alibabacloud.ecs.gpu_memory_freespace.minimum** <br>(gauge) | GPU メモリ空き容量<br>_単位は byte_ |
| **alibabacloud.ecs.gpu_memory_freespace.maximum** <br>(gauge) | GPU メモリ空き容量<br>_単位は byte_ |
| **alibabacloud.ecs.gpu_memory_freeutilization.average** <br>(gauge) | GPU メモリ空き率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_memory_freeutilization.minimum** <br>(gauge) | GPU メモリ空き率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_memory_freeutilization.maximum** <br>(gauge) | GPU メモリ空き率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_memory_usedspace.average** <br>(gauge) | GPU メモリ使用容量<br>_単位は byte_ |
| **alibabacloud.ecs.gpu_memory_usedspace.minimum** <br>(gauge) | GPU メモリ使用容量<br>_単位は byte_ |
| **alibabacloud.ecs.gpu_memory_usedspace.maximum** <br>(gauge) | GPU メモリ使用容量<br>_単位は byte_ |
| **alibabacloud.ecs.gpu_memory_usedutilization.average** <br>(gauge) | GPU メモリ使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_memory_usedutilization.minimum** <br>(gauge) | GPU メモリ使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_memory_usedutilization.maximum** <br>(gauge) | GPU メモリ使用率<br>_単位は percent_ |
| **alibabacloud.ecs.gpu_power_readings_power_draw.average** <br>(gauge) | GPU 消費電力<br>_単位は watt_ |
| **alibabacloud.ecs.gpu_power_readings_power_draw.minimum** <br>(gauge) | GPU 消費電力<br>_単位は watt_ |
| **alibabacloud.ecs.gpu_power_readings_power_draw.maximum** <br>(gauge) | GPU 消費電力<br>_単位は watt_ |
| **alibabacloud.rds.cpu_usage.average** <br>(gauge) | CPU 使用率<br>_単位は percent_ |
| **alibabacloud.rds.cpu_usage.minimum** <br>(gauge) | CPU 使用率<br>_単位は percent_ |
| **alibabacloud.rds.cpu_usage.maximum** <br>(gauge) | CPU 使用率<br>_単位は percent_ |
| **alibabacloud.rds.disk_usage.average** <br>(gauge) | ディスク使用率<br>_単位は percent_ |
| **alibabacloud.rds.disk_usage.minimum** <br>(gauge) | ディスク使用率<br>_単位は percent_ |
| **alibabacloud.rds.disk_usage.maximum** <br>(gauge) | ディスク使用率<br>_単位は percent_ |
| **alibabacloud.rds.iops_usage.average** <br>(gauge) | IOPS 使用率<br>_単位は percent_ |
| **alibabacloud.rds.iops_usage.minimum** <br>(gauge) | IOPS 使用率<br>_単位は percent_ |
| **alibabacloud.rds.iops_usage.maximum** <br>(gauge) | IOPS 使用率<br>_単位は percent_ |
| **alibabacloud.rds.connection_usage.average** <br>(gauge) | 接続使用率<br>_単位は percent_ |
| **alibabacloud.rds.connection_usage.minimum** <br>(gauge) | 接続使用率<br>_単位は percent_ |
| **alibabacloud.rds.connection_usage.maximum** <br>(gauge) | 接続使用率<br>_単位は percent_ |
| **alibabacloud.rds.data_delay.average** <br>(gauge) | 読み取り専用インスタンスの遅延時間<br>_単位は second_ |
| **alibabacloud.rds.data_delay.minimum** <br>(gauge) | 読み取り専用インスタンスの遅延時間<br>_単位は second_ |
| **alibabacloud.rds.data_delay.maximum** <br>(gauge) | 読み取り専用インスタンスの遅延時間<br>_単位は second_ |
| **alibabacloud.rds.memory_usage.average** <br>(gauge) | メモリ使用率<br>_単位は percent_ |
| **alibabacloud.rds.memory_usage.minimum** <br>(gauge) | メモリ使用率<br>_単位は percent_ |
| **alibabacloud.rds.memory_usage.maximum** <br>(gauge) | メモリ使用率<br>_単位は percent_ |
| **alibabacloud.rds.my_sql_network_in_new.average** <br>(rate) | MySQL の 1 秒あたりの受信ネットワーク トラフィック<br>_単位は bit_ |
| **alibabacloud.rds.my_sql_network_in_new.minimum** <br>(rate) | MySQL の 1 秒あたりの受信ネットワーク トラフィック<br>_単位は bit_ |
| **alibabacloud.rds.my_sql_network_in_new.maximum** <br>(rate) | MySQL の 1 秒あたりの受信ネットワーク トラフィック<br>_単位は bit_ |
| **alibabacloud.rds.my_sql_network_out_new.average** <br>(rate) | MySQL の 1 秒あたりの送信ネットワーク トラフィック<br>_単位は bit_ |
| **alibabacloud.rds.my_sql_network_out_new.minimum** <br>(rate) | MySQL の 1 秒あたりの送信ネットワーク トラフィック<br>_単位は bit_ |
| **alibabacloud.rds.my_sql_network_out_new.maximum** <br>(rate) | MySQL の 1 秒あたりの送信ネットワーク トラフィック<br>_単位は bit_ |
| **alibabacloud.rds.sql_server_network_in_new.average** <br>(rate) | SQL Server の 1 秒あたりの受信ネットワーク トラフィック<br>_単位は bit_ |
| **alibabacloud.rds.sql_server_network_out_new.average** <br>(rate) | SQL Server の 1 秒あたりの送信ネットワーク トラフィック<br>_単位は bit_ |
| **alibabacloud.redis.memory_usage.average** <br>(gauge) | メモリ使用率<br>_単位は percent_ |
| **alibabacloud.redis.memory_usage.minimum** <br>(gauge) | メモリ使用率<br>_単位は percent_ |
| **alibabacloud.redis.memory_usage.maximum** <br>(gauge) | メモリ使用率<br>_単位は percent_ |
| **alibabacloud.redis.connection_usage.average** <br>(gauge) | 接続使用率<br>_単位は percent_ |
| **alibabacloud.redis.connection_usage.minimum** <br>(gauge) | 接続使用率<br>_単位は percent_ |
| **alibabacloud.redis.connection_usage.maximum** <br>(gauge) | 接続使用率<br>_単位は percent_ |
| **alibabacloud.redis.intranet_in_ratio.average** <br>(gauge) | 書き込み処理で消費される帯域幅の割合<br>_単位は percent_ |
| **alibabacloud.redis.intranet_in_ratio.minimum** <br>(gauge) | 書き込み処理で消費される帯域幅の割合<br>_単位は percent_ |
| **alibabacloud.redis.intranet_in_ratio.maximum** <br>(gauge) | 書き込み処理で消費される帯域幅の割合<br>_単位は percent_ |
| **alibabacloud.redis.intranet_in.average** <br>(rate) | 書き込み速度<br>_単位は bit_ |
| **alibabacloud.redis.intranet_in.minimum** <br>(rate) | 書き込み速度<br>_単位は bit_ |
| **alibabacloud.redis.intranet_in.maximum** <br>(rate) | 書き込み速度<br>_単位は bit_ |
| **alibabacloud.redis.failed_count.average** <br>(rate) | KVSTORE で失敗した処理数<br>_単位は operation_ |
| **alibabacloud.redis.failed_count.minimum** <br>(rate) | KVSTORE で失敗した処理数<br>_単位は operation_ |
| **alibabacloud.redis.failed_count.maximum** <br>(rate) | KVSTORE で失敗した処理数<br>_単位は operation_ |
| **alibabacloud.redis.cpu_usage.average** <br>(gauge) | CPU 使用率<br>_単位は percent_ |
| **alibabacloud.redis.cpu_usage.minimum** <br>(gauge) | CPU 使用率<br>_単位は percent_ |
| **alibabacloud.redis.cpu_usage.maximum** <br>(gauge) | CPU 使用率<br>_単位は percent_ |
| **alibabacloud.redis.used_memory.average** <br>(gauge) | 使用中メモリ量<br>_単位は byte_ |
| **alibabacloud.redis.used_memory.minimum** <br>(gauge) | 使用中メモリ量<br>_単位は byte_ |
| **alibabacloud.redis.used_memory.maximum** <br>(gauge) | 使用中メモリ量<br>_単位は byte_ |
| **alibabacloud.redis.used_connection.average** <br>(gauge) | 使用中の接続数<br>_単位は connection_ |
| **alibabacloud.redis.used_connection.minimum** <br>(gauge) | 使用中の接続数<br>_単位は connection_ |
| **alibabacloud.redis.used_connection.maximum** <br>(gauge) | 使用中の接続数<br>_単位は connection_ |
| **alibabacloud.cdn.qps.average** <br>(gauge) | 総アクセス リクエスト数<br>_単位は request_ |
| **alibabacloud.cdn.qps.minimum** <br>(gauge) | 総アクセス リクエスト数<br>_単位は request_ |
| **alibabacloud.cdn.qps.maximum** <br>(gauge) | 総アクセス リクエスト数<br>_単位は request_ |
| **alibabacloud.cdn.bps.average** <br>(rate) | ピーク帯域幅<br>_単位は bit_ |
| **alibabacloud.cdn.bps.minimum** <br>(rate) | ピーク帯域幅<br>_単位は bit_ |
| **alibabacloud.cdn.bps.maximum** <br>(rate) | ピーク帯域幅<br>_単位は bit_ |
| **alibabacloud.cdn.hit_rate.average** <br>(gauge) | バイト ヒット率<br>_単位は percent_ |
| **alibabacloud.cdn.code4xx.average** <br>(gauge) | 4xx ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.cdn.code5xx.average** <br>(gauge) | 5xx ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.cdn.internet_out.sum** <br>(gauge) | ダウンストリーム トラフィック<br>_単位は byte_ |
| **alibabacloud.cdn.count** <br>(gauge) | インスタンス数<br>_単位は instance_ |
| **alibabacloud.container_service.cluster.cpu.limit** <br>(gauge) | クラスター CPU 上限<br>_単位は core_ |
| **alibabacloud.container_service.cluster.cpu.request** <br>(gauge) | クラスター CPU リクエスト<br>_単位は core_ |
| **alibabacloud.container_service.cluster.cpu.usage_rate** <br>(gauge) | クラスター CPU 使用量<br>_単位は core_ |
| **alibabacloud.container_service.cluster.cpu.utilization** <br>(gauge) | クラスター CPU 使用率<br>_単位は percent_ |
| **alibabacloud.container_service.cluster.memory.limit** <br>(gauge) | クラスター メモリ上限<br>_単位は byte_ |
| **alibabacloud.container_service.cluster.memory.request** <br>(gauge) | クラスター メモリ リクエスト<br>_単位は byte_ |
| **alibabacloud.container_service.cluster.memory.utilization** <br>(gauge) | クラスター メモリ使用率<br>_単位は percent_ |
| **alibabacloud.container_service.node.cpu.allocatable** <br>(gauge) | ノード CPU の割り当て可能量<br>_単位は core_ |
| **alibabacloud.container_service.node.cpu.capacity** <br>(gauge) | ノード CPU 容量<br>_単位は core_ |
| **alibabacloud.container_service.node.cpu.limit** <br>(gauge) | ノード CPU 上限<br>_単位は core_ |
| **alibabacloud.container_service.node.cpu.oversale_rate** <br>(rate) | ノード CPU オーバー コミット率<br>_単位は core_ |
| **alibabacloud.container_service.node.cpu.request** <br>(gauge) | ノード CPU リクエスト<br>_単位は core_ |
| **alibabacloud.container_service.node.cpu.usage_rate** <br>(rate) | ノード CPU 使用量<br>_単位は core_ |
| **alibabacloud.container_service.node.cpu.utilization** <br>(gauge) | ノード CPU 使用率<br>_単位は percent_ |
| **alibabacloud.container_service.node.filesystem.available** <br>(gauge) | ノード ファイル システムの利用可能容量<br>_単位は node_ |
| **alibabacloud.container_service.node.filesystem.inodes** <br>(gauge) | ノード ファイル システムの inode 数<br>_単位は inode_ |
| **alibabacloud.container_service.node.filesystem.limit** <br>(gauge) | ノード ファイル システム上限<br>_単位は node_ |
| **alibabacloud.container_service.node.filesystem.usage** <br>(gauge) | ノード ファイル システム使用量<br>_単位は node_ |
| **alibabacloud.container_service.node.memory.allocatable** <br>(gauge) | ノード メモリの割り当て可能量<br>_単位は byte_ |
| **alibabacloud.container_service.node.memory.cache** <br>(gauge) | ノード メモリ キャッシュ量<br>_単位は byte_ |
| **alibabacloud.container_service.node.memory.limit** <br>(gauge) | ノード メモリ上限<br>_単位は byte_ |
| **alibabacloud.container_service.node.memory.oversale_rate** <br>(gauge) | ノード メモリ オーバー コミット率<br>_単位は percent_ |
| **alibabacloud.container_service.node.memory.request** <br>(gauge) | ノード メモリ リクエスト<br>_単位は byte_ |
| **alibabacloud.container_service.node.memory.usage** <br>(gauge) | ノード メモリ使用量<br>_単位は byte_ |
| **alibabacloud.container_service.node.memory.utilization** <br>(gauge) | ノード メモリ使用率<br>_単位は percent_ |
| **alibabacloud.container_service.node.memory.working_set** <br>(gauge) | ノード メモリ ワーキング セット<br>_単位は byte_ |
| **alibabacloud.container_service.node.network.rx_errors** <br>(gauge) | ノード ネットワークの受信エラー数<br>_単位は error_ |
| **alibabacloud.container_service.node.network.rx_errors_rate** <br>(rate) | ノード ネットワークの受信エラー率<br>_単位は byte_ |
| **alibabacloud.container_service.node.network.rx_rate** <br>(rate) | ノード ネットワークの受信レート<br>_単位は byte_ |
| **alibabacloud.container_service.node.network.tx_errors_rate** <br>(rate) | ノード ネットワークの送信エラー率<br>_単位は byte_ |
| **alibabacloud.container_service.node.network.tx_rate** <br>(rate) | ノード ネットワークの送信レート<br>_単位は byte_ |
| **alibabacloud.container_service.ns.cpu.limit** <br>(gauge) | ns CPU 上限<br>_単位は core_ |
| **alibabacloud.container_service.pod.cpu.limit** <br>(gauge) | pod CPU 上限<br>_単位は core_ |
| **alibabacloud.container_service.pod.cpu.oversale_rate** <br>(gauge) | pod CPU オーバー コミット率<br>_単位は percent_ |
| **alibabacloud.container_service.pod.cpu.request** <br>(gauge) | pod CPU リクエスト<br>_単位は core_ |
| **alibabacloud.container_service.pod.cpu.usage_rate** <br>(rate) | pod CPU 使用量<br>_単位は core_ |
| **alibabacloud.container_service.pod.cpu.utilization** <br>(gauge) | pod CPU 使用率<br>_単位は percent_ |
| **alibabacloud.container_service.pod.memory.cache** <br>(gauge) | pod メモリ キャッシュ量<br>_単位は byte_ |
| **alibabacloud.container_service.pod.memory.limit** <br>(gauge) | pod メモリ上限<br>_単位は byte_ |
| **alibabacloud.container_service.pod.memory.oversale_rate** <br>(gauge) | pod メモリ オーバー コミット率<br>_単位は percent_ |
| **alibabacloud.container_service.pod.memory.request** <br>(gauge) | pod メモリ リクエスト<br>_単位は byte_ |
| **alibabacloud.container_service.pod.memory.rss** <br>(gauge) | pod メモリ RSS 量<br>_単位は byte_ |
| **alibabacloud.container_service.pod.memory.utilization** <br>(gauge) | pod メモリ使用率<br>_単位は percent_ |
| **alibabacloud.container_service.pod.memory.working_set** <br>(gauge) | pod メモリ ワーキング セット<br>_単位は byte_ |
| **alibabacloud.container_service.pod.network.rx_errors_rate** <br>(rate) | pod ネットワークの受信エラー率<br>_単位は byte_ |
| **alibabacloud.container_service.pod.network.rx_rate** <br>(rate) | pod ネットワークの受信レート<br>_単位は byte_ |
| **alibabacloud.container_service.pod.network.tx_errors_rate** <br>(rate) | pod ネットワークの送信エラー率<br>_単位は byte_ |
| **alibabacloud.container_service.pod.network.tx_rate** <br>(rate) | pod ネットワークの送信レート<br>_単位は byte_ |
| **alibabacloud.container_service.deployment.filesystem.available** <br>(gauge) | deployment ファイル システムの利用可能容量<br>_単位は byte_ |
| **alibabacloud.container_service.deployment.filesystem.limit** <br>(gauge) | deployment ファイル システム上限<br>_単位は byte_ |
| **alibabacloud.container_service.pod.filesystem.available** <br>(gauge) | pod ファイル システムの利用可能容量<br>_単位は byte_ |
| **alibabacloud.container_service.pod.filesystem.limit** <br>(gauge) | pod ファイル システム上限<br>_単位は byte_ |
| **alibabacloud.container_service.cluster.filesystem.available** <br>(gauge) | クラスター ファイル システムの利用可能容量<br>_単位は byte_ |
| **alibabacloud.container_service.cluster.filesystem.limit** <br>(gauge) | クラスター ファイル システム上限<br>_単位は byte_ |
| **alibabacloud.container_service.count** <br>(gauge) | クラスター数<br>_単位は instance_ |
| **alibabacloud.container_service.number_of_nodes** <br>(gauge) | ノード数<br>_単位は node_ |
| **alibabacloud.express_connect.intranet_rx** <br>(gauge) | ネットワークの受信トラフィック<br>_単位は byte_ |
| **alibabacloud.express_connect.intranet_tx** <br>(gauge) | ネットワークの送信トラフィック<br>_単位は byte_ |
| **alibabacloud.express_connect.receive_bandwidth** <br>(rate) | ネットワークの受信帯域幅<br>_単位は bit_ |
| **alibabacloud.express_connect.transported_bandwidth** <br>(rate) | ネットワークの送信帯域幅<br>_単位は bit_ |
| **alibabacloud.express_connect.router_interface_response_time.maximum** <br>(gauge) | 遅延時間<br>_単位は millisecond_ |
| **alibabacloud.express_connect.router_interface_loss_rate.maximum** <br>(gauge) | パケット損失率<br>_単位は percent_ |
| **alibabacloud.express_connect.count** <br>(gauge) | インスタンス数<br>_単位は instance_ |
| **alibabacloud.express_connect.bytes_out_from_vpc_to_idc** <br>(gauge) | VPC から IDC への送信バイト数<br>_単位は byte_ |
| **alibabacloud.express_connect.pkgs_drop_in_from_idc_to_vpc** <br>(rate) | IDC から VPC への 1 秒あたりに破棄された受信パケット数<br>_単位は packet_ |
| **alibabacloud.express_connect.pkgs_drop_out_from_vpc_to_idc** <br>(rate) | VPC から IDC への 1 秒あたりに破棄された送信パケット数<br>_単位は packet_ |
| **alibabacloud.express_connect.pkgs_in_from_idc_to_vpc** <br>(rate) | IDC から VPC への 1 秒あたりの受信パケット数<br>_単位は packet_ |
| **alibabacloud.express_connect.pkgs_out_from_vpc_to_idc** <br>(rate) | VPC から IDC への 1 秒あたりの送信パケット数<br>_単位は packet_ |
| **alibabacloud.express_connect.rate_in_from_idc_to_vpc** <br>(rate) | IDC から VPC への 1 秒あたりの受信ビット数<br>_単位は bit_ |
| **alibabacloud.express_connect.rate_out_from_vpc_to_idc** <br>(rate) | VPC から IDC への 1 秒あたりの送信ビット数<br>_単位は bit_ |
| **alibabacloud.express_connect.vbr_healthy_check_latency** <br>(gauge) | VBR 遅延時間<br>_単位は microsecond_ |
| **alibabacloud.express_connect.vbr_healthy_check_loss_rate** <br>(gauge) | VBR 損失率<br>_単位は percent_ |
| **alibabacloud.dcdn.code_count_1.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 1XX ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_2.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 2XX ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_3.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 3XX ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_4.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 4XX ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_400.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 400 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_403.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 403 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_404.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 404 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_416.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 416 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_499.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 499 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_5.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 5XX ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_500.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 500 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_502.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 502 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_503.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 503 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_504.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 504 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_ratio_400.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 400 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_403.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 403 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_404.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 404 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_416.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 416 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_499.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 499 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_500.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 500 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_502.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 502 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_503.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 503 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_504.maximum** <br>(gauge) | インスタンスのエッジ ノードで発生した 504 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_acc.maximum** <br>(gauge) | オリジン サーバーへのリクエスト数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_bandwidth.maximum** <br>(rate) | オリジンへの帯域幅<br>_単位は bit_ |
| **alibabacloud.dcdn.ori_code_count_1.maximum** <br>(gauge) | オリジンへの 1XX ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_2.maximum** <br>(gauge) | オリジンへの 2XX ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_3.maximum** <br>(gauge) | オリジンへの 3XX ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_4.maximum** <br>(gauge) | オリジンへの 4XX ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_400.maximum** <br>(gauge) | オリジンへの 400 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_403.maximum** <br>(gauge) | オリジンへの 403 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_404.maximum** <br>(gauge) | オリジンへの 404 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_416.maximum** <br>(gauge) | オリジンへの 416 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_499.maximum** <br>(gauge) | オリジンへの 499 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_500.maximum** <br>(gauge) | オリジンへの 500 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_502.maximum** <br>(gauge) | オリジンへの 503 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_503.maximum** <br>(gauge) | オリジンへの 503 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_count_504.maximum** <br>(gauge) | オリジンへの 504 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.ori_code_ratio_1.maximum** <br>(gauge) | オリジンへの 1XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_2.maximum** <br>(gauge) | オリジンへの 2XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_3.maximum** <br>(gauge) | オリジンへの 3XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_4.maximum** <br>(gauge) | オリジンへの 4XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_400.maximum** <br>(gauge) | オリジンへの 400 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_403.maximum** <br>(gauge) | オリジンへの 403 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_404.maximum** <br>(gauge) | オリジンへの 404 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_416.maximum** <br>(gauge) | オリジンへの 416 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_499.maximum** <br>(gauge) | オリジンへの 499 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_500.maximum** <br>(gauge) | オリジンへの 500 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_502.maximum** <br>(gauge) | オリジンへの 502 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_503.maximum** <br>(gauge) | オリジンへの 503 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.ori_code_ratio_504.maximum** <br>(gauge) | オリジンへの 504 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.bps_in.maximum** <br>(rate) | 受信帯域幅<br>_単位は bit_ |
| **alibabacloud.dcdn.bps_in_http.maximum** <br>(rate) | HTTP 受信帯域幅<br>_単位は bit_ |
| **alibabacloud.dcdn.bps_in_ws.maximum** <br>(rate) | WebSocket 受信帯域幅<br>_単位は bit_ |
| **alibabacloud.dcdn.bps_out.maximum** <br>(rate) | 送信帯域幅<br>_単位は bit_ |
| **alibabacloud.dcdn.bps_out_http.maximum** <br>(rate) | HTTP 送信帯域幅<br>_単位は bit_ |
| **alibabacloud.dcdn.bps_out_ws.maximum** <br>(rate) | WebSocket 送信帯域幅<br>_単位は bit_ |
| **alibabacloud.dcdn.code_count_499_http.average** <br>(gauge) | HTTP 499 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_499_http.minimum** <br>(gauge) | HTTP 499 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_499_http.maximum** <br>(gauge) | HTTP 499 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_499_ws.average** <br>(gauge) | WebSocket 499 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_499_ws.minimum** <br>(gauge) | WebSocket 499 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_count_499_ws.maximum** <br>(gauge) | WebSocket 499 ステータス コード数<br>_単位は instance_ |
| **alibabacloud.dcdn.code_ratio_1.maximum** <br>(gauge) | 1XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_1_http.maximum** <br>(gauge) | HTTP 1XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_1_ws.maximum** <br>(gauge) | WebSocket 1XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_2.maximum** <br>(gauge) | 2XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_2_http.maximum** <br>(gauge) | HTTP 2XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_2_ws.maximum** <br>(gauge) | WebSocket 2XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_3.maximum** <br>(gauge) | 3XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_3_http.maximum** <br>(gauge) | HTTP 3XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_3_ws.maximum** <br>(gauge) | WebSocket 3XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_4.maximum** <br>(gauge) | 4XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_499_http.maximum** <br>(gauge) | HTTP 499 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_499_ws.maximum** <br>(gauge) | WebSocket 499 ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_4_http.maximum** <br>(gauge) | HTTP 4XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_4_ws.maximum** <br>(gauge) | WebSocket 4XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_5.maximum** <br>(gauge) | 5XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_5_http.maximum** <br>(gauge) | HTTP 5XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.code_ratio_5_ws.maximum** <br>(gauge) | WebSocket 5XX ステータス コードの割合<br>_単位は percent_ |
| **alibabacloud.dcdn.dcdn_qps.maximum** <br>(rate) | 1 秒あたりのリクエスト数<br>_単位は request_ |
| **alibabacloud.dcdn.dcdn_qps_http.maximum** <br>(rate) | HTTP の 1 秒あたりのリクエスト数<br>_単位は request_ |
| **alibabacloud.dcdn.dcdn_qps_ws.maximum** <br>(rate) | WebSocket の 1 秒あたりのリクエスト数<br>_単位は request_ |
| **alibabacloud.dcdn.hit_rate.maximum** <br>(gauge) | バイト ヒット率<br>_単位は percent_ |
| **alibabacloud.dcdn.hit_rate_http.maximum** <br>(gauge) | HTTP ヒット率<br>_単位は percent_ |
| **alibabacloud.dcdn.hit_rate_ws.maximum** <br>(gauge) | WebSocket ヒット率<br>_単位は percent_ |
| **alibabacloud.dcdn.rt.maximum** <br>(gauge) | リクエスト応答時間<br>_単位は millisecond_ |
| **alibabacloud.dcdn.rt_http.maximum** <br>(gauge) | HTTP リクエスト応答時間<br>_単位は millisecond_ |
| **alibabacloud.dcdn.rt_ws.maximum** <br>(gauge) | WebSocket リクエスト応答時間<br>_単位は millisecond_ |
| **alibaabcloud.dcdn.waf_acl_block_qps.value** <br>(rate) | DCDN WAF カスタム ルールによる 1 秒あたりの遮断数<br>_単位は instance_ |
| **alibaabcloud.dcdn.waf_web_block_qps.value** <br>(rate) | DCDN WAF 基本保護による 1 秒あたりの遮断数<br>_単位は instance_ |

### イベント

Alibaba Cloud からのイベントは、Alibaba Cloud の各サービス単位で収集されます。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
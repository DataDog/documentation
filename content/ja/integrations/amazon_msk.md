---
categories:
  - cloud
  - aws
  - ログの収集
ddtype: check
dependencies: []
description: Amazon Managed Streaming for Apache Kafka (MSK) のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_msk/'
draft: false
git_integration_title: amazon_msk
has_logo: true
integration_title: Amazon Managed Streaming for Apache Kafka
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_msk
public_title: Datadog-Amazon Managed Streaming for Apache Kafka インテグレーション
short_description: Amazon MSK のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon Managed Streaming for Apache Kafka (MSK) は、Apache Kafka を使用してストリーミングデータを処理するアプリケーションを、簡単に構築して実行できるフルマネージド型のサービスです。

このインテグレーションからメトリクスを収集する方法は、[Datadog Agent](#agent-check) を使用する方法と、[クローラー](#crawler)を使用して CloudWatch からメトリクスを収集する方法の 2 通りあります。

## Agentチェック

Agent チェックは、Datadog Agent を通じて、Amazon Managed Streaming for Apache Kafka ([Amazon MSK][1]) を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

1. まだ作成していない場合は、[クライアントマシンを作成します][3]
2. クライアントマシンにアクセス許可ポリシー（[arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][5]）が[付与][4]されているか、これに相当する[資格情報][6]が使用できることを確認します
3. [Datadog Agent][7] をインストールします

### コンフィギュレーション

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `amazon_msk.d/conf.yaml` ファイルを編集し、Amazon MSK のパフォーマンスデータの収集を開始します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[amazon_msk.d/conf.yaml のサンプル][8]を参照してください。

2. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `amazon_msk` を探します。

### 収集データ

#### メトリクス
{{< get-metrics-from-git "amazon_msk" >}}


#### サービスのチェック

**aws.msk.can_connect**:<br>
Agent が MSK クラスターのノードを発見できない場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

**aws.msk.prometheus.health**:<br>
チェックがメトリクスのエンドポイントにアクセスできない場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

### イベント

Amazon MSK チェックには、イベントは含まれません。

## Crawler

このインテグレーションを有効にすると、CloudWatch からの MSK メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][12]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][13]のメトリクス収集で、`MSK` をオンにします。

2. [Datadog - Amazon MSK インテグレーション][14]をインストールします。

### ログの収集

#### ログの有効化

Amazon MSK から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_msk` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][15]をまだ設定していない場合は、設定を行ってください。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon MSK ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][16]
    - [Cloudwatch ロググループに手動トリガーを追加][17]

### 収集データ

<table class="table table-vertical-mobile table-metrics"><tbody><tr><td><strong>aws.kafka.zookeeper_request_latency_ms_mean</strong><br>（gauge）</td><td>ブローカーからの ZooKeeper リクエストの平均レイテンシー（ミリ秒）。</td></tr><tr><td><strong>aws.kafka.active_controller_count</strong><br>（gauge）</td><td>クラスターごとに、常に 1 つのコントローラーだけをアクティブにする必要があります。</td></tr><tr><td><strong>aws.kafka.global_partition_count</strong><br>（gauge）</td><td>クラスター内のすべてのブローカーのパーティションの合計数。</td></tr><tr><td><strong>aws.kafka.global_topic_count</strong><br>（gauge）</td><td>クラスター内のすべてのブローカーのトピックの合計数。</td></tr><tr><td><strong>aws.kafka.offline_partitions_count</strong><br>（gauge）</td><td>クラスター内でオフラインになっているパーティションの合計数。</td></tr><tr><td><strong>aws.kafka.swap_used</strong><br>（gauge）</td><td>ブローカーに使用されているスワップメモリのサイズ。<br><em>バイト数で表示</em></td></tr><tr><td><strong>aws.kafka.swap_free</strong><br>（gauge）</td><td>ブローカーで使用可能なスワップメモリのサイズ。<br><em>バイト数で表示</em></td></tr><tr><td><strong>aws.kafka.memory_used</strong><br>（gauge）</td><td>ブローカーに使用されているメモリのサイズ。<br><em>バイト数で表示</em></td></tr><tr><td><strong>aws.kafka.memory_buffered</strong><br>（gauge）</td><td>ブローカーに使用されているバッファメモリのサイズ。<br><em>バイト数で表示</em></td></tr><tr><td><strong>aws.kafka.memory_free</strong><br>（gauge）</td><td>ブローカーが使用可能な空きメモリのサイズ。<br><em>バイト数で表示</em></td></tr><tr><td><strong>aws.kafka.memory_cached</strong><br>（gauge）</td><td>ブローカーのキャッシュメモリのサイズ。<br><em>バイト数で表示</em></td></tr><tr><td><strong>aws.kafka.cpu_user</strong><br>（gauge）</td><td>ユーザースペースの CPU の割合。<br><em>パーセントで表示</em></td></tr><tr><td><strong>aws.kafka.cpu_system</strong><br>（gauge）</td><td>カーネルスペースの CPU の割合。<br><em>パーセントで表示</em></td></tr><tr><td><strong>aws.kafka.cpu_idle</strong><br>（gauge）</td><td>CPU アイドル時間の割合。<br><em>パーセントで表示</em></td></tr><tr><td><strong>aws.kafka.root_disk_used</strong><br>（gauge）</td><td>ブローカーに使用されているルートディスクの割合。<br><em>パーセントで表示</em></td></tr><tr><td><strong>aws.kafka.kafka_app_logs_disk_used</strong><br>（gauge）</td><td>アプリケーションログに使用されるディスク容量の割合。<br><em>パーセントで表示</em></td></tr><tr><td><strong>aws.kafka.kafka_data_logs_disk_used</strong><br>（gauge）</td><td>データログに使用されているディスク容量の割合。<br><em>パーセントで表示</em></td></tr><tr><td><strong>aws.kafka.network_rx_errors</strong><br>（count）</td><td>ブローカーのネットワーク受信エラーの数。</td></tr><tr><td><strong>aws.kafka.network_tx_errors</strong><br>（count）</td><td>ブローカーのネットワーク送信エラーの数。</td></tr><tr><td><strong>aws.kafka.network_rx_dropped</strong><br>（count）</td><td>ドロップされた受信パッケージの数。</td></tr><tr><td><strong>aws.kafka.network_tx_dropped</strong><br>（count）</td><td>ドロップされた送信パッケージの数。</td></tr><tr><td><strong>aws.kafka.network_rx_packets</strong><br>（count）</td><td>ブローカーによって受信されたパケットの数。</td></tr><tr><td><strong>aws.kafka.network_tx_packets</strong><br>（count）</td><td>ブローカーによって送信されたパケットの数。</td></tr><tr><td><strong>aws.kafka.messages_in_per_sec</strong><br>（gauge）</td><td>ブローカーの 1 秒あたりの受信メッセージ数。</td></tr><tr><td><strong>aws.kafka.network_processor_avg_idle_percent</strong><br>（gauge）</td><td>ネットワークプロセッサがアイドル状態の平均時間の割合。</td></tr><tr><td><strong>aws.kafka.request_handler_avg_idle_percent</strong><br>（gauge）</td><td>リクエストハンドラーのスレッドがアイドル状態の平均時間の割合。</td></tr><tr><td><strong>aws.kafka.leader_count</strong><br>（gauge）</td><td>リーダーレプリカの数。</td></tr><tr><td><strong>aws.kafka.partition_count</strong><br>（gauge）</td><td>ブローカーのパーティションの数。</td></tr><tr><td><strong>aws.kafka.produce_local_time_ms_mean</strong><br>（gauge）</td><td>フォロワーが応答を送信するまでの平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.produce_message_conversions_time_ms_mean</strong><br>（gauge）</td><td>メッセージ形式の変換に費やされた平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.produce_request_queue_time_ms_mean</strong><br>（gauge）</td><td>リクエストメッセージがキューに費やした平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.produce_response_queue_time_ms_mean</strong><br>（gauge）</td><td>応答メッセージがキューに費やした平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.produce_response_send_time_ms_mean</strong><br>（gauge）</td><td>応答メッセージの送信に費やされた平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.produce_total_time_ms_mean</strong><br>（gauge）</td><td>ミリ秒単位の平均生成時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.request_bytes_mean</strong><br>（gauge）</td><td>ブローカーのリクエストバイトの平均数。</td></tr><tr><td><strong>aws.kafka.under_minlsr_partition_count</strong><br>（gauge）</td><td>ブローカーの minIsr 未満パーティションの数。</td></tr><tr><td><strong>aws.kafka.under_replicated_partitions</strong><br>（gauge）</td><td>ブローカーのレプリケートされていないパーティションの数。</td></tr><tr><td><strong>aws.kafka.bytes_in_per_sec</strong><br>（gauge）</td><td>クライアントから受信した 1 秒あたりのバイト数。<br><em>バイト数で表示</em></td></tr><tr><td><strong>aws.kafka.bytes_out_per_sec</strong><br>（gauge）</td><td>クライアントに送信された 1 秒あたりのバイト数。<br><em>バイト数で表示</em></td></tr><tr><td><strong>aws.kafka.messages_in_per_sec</strong><br>（gauge）</td><td>クライアントから受信した 1 秒あたりのメッセージ数。</td></tr><tr><td><strong>aws.kafka.fetch_message_conversions_per_sec</strong><br>（gauge）</td><td>ブローカーの 1 秒あたりのフェッチメッセージ変換回数。</td></tr><tr><td><strong>aws.kafka.produce_message_conversions_per_sec</strong><br>（gauge）</td><td>ブローカーの 1 秒あたりの生成メッセージ変換回数。</td></tr><tr><td><strong>aws.kafka.fetch_consumer_total_time_ms_mean</strong><br>（gauge）</td><td>コンシューマーがブローカーからデータを取得するのに費やす平均合計時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.fetch_follower_total_time_ms_mean</strong><br>（gauge）</td><td>フォロワーがブローカーからデータを取得するのに費やす平均合計時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.fetch_consumer_request_queue_time_ms_mean</strong><br>（gauge）</td><td>コンシューマーのリクエストがリクエストキューで待機する平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.fetch_follower_request_queue_time_ms_mean</strong><br>（gauge）</td><td>フォロワーのリクエストがリクエストキューで待機する平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.fetch_consumer_local_time_ms_mean</strong><br>（gauge）</td><td>コンシューマーのリクエストがリーダーで処理される平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.fetch_follower_local_time_ms_mean</strong><br>（gauge）</td><td>フォロワーのリクエストがリーダーで処理される平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.fetch_consumer_response_queue_time_ms_mean</strong><br>（gauge）</td><td>コンシューマーのリクエストが応答キューで待機する平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.fetch_follower_response_queue_time_ms_mean</strong><br>（gauge）</td><td>フォロワーのリクエストが応答キューで待機する平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.consumer_response_send_time_ms_mean</strong><br>（gauge）</td><td>コンシューマーが応答を送信するための平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.fetch_follower_response_send_time_ms_mean</strong><br>（gauge）</td><td>フォロワーが応答を送信するための平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.produce_throttle_time</strong><br>（gauge）</td><td>平均スロットル生成時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.produce_throttle_byte_rate</strong><br>（gauge）</td><td>1 秒あたりのスロットルバイト数。</td></tr><tr><td><strong>aws.kafka.produce_throttle_queue_size</strong><br>（gauge）</td><td>スロットルキュー内のメッセージ数。</td></tr><tr><td><strong>aws.kafka.fetch_throttle_time</strong><br>（gauge）</td><td>スロットル取得の平均時間<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.fetch_throttle_byte_rate</strong><br>（gauge）</td><td>1 秒あたりのスロットルバイト数。</td></tr><tr><td><strong>aws.kafka.fetch_throttle_queue_size</strong><br>（gauge）</td><td>スロットルキュー内のメッセージ数。</td></tr><tr><td><strong>aws.kafka.request_throttle_time</strong><br>（gauge）</td><td>リクエストスロットルの平均時間。<br><em>ミリ秒で表示</em></td></tr><tr><td><strong>aws.kafka.request_time</strong><br>（gauge）</td><td>ブローカーネットワークおよび I/O スレッドでリクエストを処理するのに費やされた平均時間。</td></tr><tr><td><strong>aws.kafka.request_throttle_queue_size</strong><br>（gauge）</td><td>スロットルキュー内のメッセージ数。</td></tr><tr><td><strong>aws.kafka.request_exempt_from_throttle_time</strong><br>（gauge）</td><td>ブローカーネットワークおよび I/O スレッドで、スロットリングから除外されたリクエストを処理するのに費やされた平均時間。</td></tr></tbody></table>

Amazon MSK クローラーには、イベントやサービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][18]までお問合せください。

[1]: https://aws.amazon.com/msk
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations/
[3]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[5]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[6]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[7]: https://docs.datadoghq.com/ja/agent/
[8]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[12]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[13]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[14]: https://app.datadoghq.com/account/settings#integrations/amazon-msk
[15]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[16]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[17]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[18]: https://docs.datadoghq.com/ja/help/
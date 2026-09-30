---
aliases:
- /ja/integrations/amazon_elb
app_id: amazon-elb
categories:
- aws
- metrics
- cloud
custom_kind: integration
description: Amazon ELB は、複数の EC2 インスタンスにトラフィックを自動的に分散します。
media: []
title: Amazon Elastic Load Balancing
---
## 概要

Amazon Elastic Load Balancing は、クラウド上の複数の Amazon EC2 インスタンスに受信アプリケーション トラフィックを自動的に振り分けます。

AWS が提供する Elastic Load Balancer には、Application Load Balancer (ALB)、Classic Load Balancer (ELB)、Network Load Balancer (NLB) の 3 種類があり、Datadog はそのすべてからメトリクスとメタデータを収集します。

このインテグレーションを有効にすると、Elastic Load Balancing のすべてのメトリクスを Datadog で確認できます。

注: このインテグレーションを完全に有効にするには、'ec2:describe\*\*' と 'elasticloadbalancing:describe\*' の権限が必要です。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### メトリクス収集

1. [AWS integration ページ](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`ApplicationELB`、`ELB`、`NetworkELB` が有効になっていることを確認します。
1. [Datadog - Amazon ELB インテグレーション](https://app.datadoghq.com/integrations/amazon-elb) をインストールします。

### ログ収集

#### Amazon ELB または ALB のロギングを有効にする

ログを収集するには、まず ELB または ALB でロギングを有効にします。ALB と ELB のログは Amazon S3 バケットに書き出し、[Lambda 関数で取り込めます](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function)。詳細は、[Classic Load Balancer のアクセス ログを有効にする](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html) を参照してください。

![Amazon ELB ログ有効化](images/aws_elb_log_enable.png)

間隔を 5 分に設定し、S3 バケットとプレフィックスを指定します。[あいまいに定義された S3 イベント通知設定](https://aws.amazon.com/premiumsupport/knowledge-center/lambda-s3-event-configuration-error/) を避けるため、ほかのロード バランサーのログ保存先と重ならない **一意の場所** を必ず使用してください。複数のロード バランサーが同じバケットにログを書き出す場合は、`my-bucket-for-elb-logs/my-elb-name` のような **一意のプレフィックス** を使用して、ログが別々の場所に保存されるようにします。

![Amazon ELB ログ設定](images/aws_elb_configure_log.png)

#### ログを Datadog に送信する

1. まだ設定していない場合は、AWS アカウントに [Datadog Forwarder Lambda 関数](https://docs.datadoghq.com/logs/guide/forwarder/) を設定してください。
1. 設定が完了したら、Datadog Forwarder Lambda 関数を開きます。ELB ログを保存している S3 バケットに対して、トリガーを [自動で](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers) または [手動で](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets) 設定します。手動で設定する場合は、イベント タイプに `All object create events` を使用します。
1. [Log Explorer](https://app.datadoghq.com/logs) を使ってログを確認できます。

AWS Services のログ収集について詳しくは、[Datadog Lambda 関数で AWS Services Logs を送信する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/) を参照してください。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.applicationelb.active_connection_count** <br>(count) | クライアントとロード バランサー間、およびロード バランサーとターゲット間でアクティブな同時 TCP 接続の総数<br>_単位は connection_ |
| **aws.applicationelb.client_tlsnegotiation_error_count** <br>(count) | TLS ネゴシエーション エラー数<br>_単位は error_ |
| **aws.applicationelb.consumed_lcus** <br>(gauge) | ロード バランサーで使用された Load Balancer Capacity Unit (LCU) 数<br>_単位は unit_ |
| **aws.applicationelb.grpc_request_count** <br>(count) | IPv4 と IPv6 で処理された gRPC リクエスト数<br>_単位は request_ |
| **aws.applicationelb.healthy_host_count** <br>(gauge) | 各 Availability Zone における正常なインスタンスの平均数<br>_単位は host_ |
| **aws.applicationelb.healthy_host_count.maximum** <br>(gauge) | 各 Availability Zone における正常なインスタンスの最大数<br>_単位は host_ |
| **aws.applicationelb.healthy_host_count.minimum** <br>(gauge) | 各 Availability Zone における正常なインスタンスの最小数<br>_単位は host_ |
| **aws.applicationelb.healthy_host_count_deduped** <br>(count) | Cross-Zone Load Balancing オプションの有効/無効にかかわらず、Availability Zone ごとの正常なインスタンス数<br>_単位は host_ |
| **aws.applicationelb.ipv_6processed_bytes** <br>(count) | ロード バランサーが IPv6 経由で処理した総バイト数<br>_単位は byte_ |
| **aws.applicationelb.ipv_6request_count** <br>(count) | ロード バランサーが受信した IPv6 リクエスト数<br>_単位は request_ |
| **aws.applicationelb.new_connection_count** <br>(count) | クライアントとロード バランサー間、およびロード バランサーとターゲット間で新たに確立された TCP 接続の総数<br>_単位は connection_ |
| **aws.applicationelb.processed_bytes** <br>(count) | ロード バランサーが IPv4 と IPv6 経由で処理した総バイト数<br>_単位は byte_ |
| **aws.applicationelb.rejected_connection_count** <br>(count) | ロード バランサーが接続数の上限に達したために拒否された接続数<br>_単位は connection_ |
| **aws.applicationelb.request_count** <br>(count) | 受信され、登録済みインスタンスにルーティングされた完了済みリクエストの総数。HTTP 460、HTTP 400、および一部の HTTP 503 と 500 は含みません。<br>_単位は request_ |
| **aws.applicationelb.request_count_per_target** <br>(count) | ターゲット グループ内の各ターゲットが平均して受信したリクエスト数<br>_単位は request_ |
| **aws.applicationelb.reserved_lcus** <br>(count) | LCU Reservation によってロード バランサー用に予約された Load Balancer Capacity Unit (LCU) 数<br>_単位は unit_ |
| **aws.applicationelb.rule_evaluations** <br>(count) | 1 時間平均のリクエスト レートに基づいて、ロード バランサーが処理したルール数|
| **aws.applicationelb.target_connection_error_count** <br>(count) | ロード バランサーと登録済みインスタンスの間で正常に確立できなかった接続数<br>_単位は error_ |
| **aws.applicationelb.target_response_time.average** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった平均時間<br>_単位は second_ |
| **aws.applicationelb.target_response_time.maximum** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった最大時間<br>_単位は second_ |
| **aws.applicationelb.target_response_time.p50** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった時間の 50 パーセンタイル値<br>_単位は second_ |
| **aws.applicationelb.target_response_time.p90** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった時間の 90 パーセンタイル値<br>_単位は second_ |
| **aws.applicationelb.target_response_time.p95** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった時間の 95 パーセンタイル値<br>_単位は second_ |
| **aws.applicationelb.target_response_time.p99** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった時間の 99 パーセンタイル値<br>_単位は second_ |
| **aws.applicationelb.un_healthy_host_count** <br>(gauge) | 各 Availability Zone における異常なインスタンスの平均数<br>_単位は host_ |
| **aws.applicationelb.un_healthy_host_count.maximum** <br>(gauge) | 各 Availability Zone における異常なインスタンスの最大数<br>_単位は host_ |
| **aws.applicationelb.un_healthy_host_count.minimum** <br>(gauge) | 各 Availability Zone における異常なインスタンスの最小数<br>_単位は host_ |
| **aws.applicationelb.un_healthy_host_count_deduped** <br>(count) | Cross-Zone Load Balancing オプションの有効/無効にかかわらず、Availability Zone ごとの異常なインスタンス数<br>_単位は host_ |
| **aws.elb.backend_connection_errors** <br>(rate) | ロード バランサーと登録済みインスタンスの間で正常に確立されなかった接続数<br>_単位は error_ |
| **aws.elb.estimated_albactive_connection_count** <br>(count) | クライアントとロード バランサー間、およびロード バランサーとターゲット間でアクティブな同時 TCP 接続の推定総数<br>_単位は connection_ |
| **aws.elb.estimated_albconsumed_lcus** <br>(gauge) | Application Load Balancer が使用した Load Balancer Capacity Unit (LCU) の推定総数<br>_単位は unit_ |
| **aws.elb.estimated_albnew_connection_count** <br>(count) | クライアントとロード バランサー間、およびロード バランサーとターゲット間で新たに確立された TCP 接続の推定総数<br>_単位は connection_ |
| **aws.elb.estimated_processed_bytes** <br>(count) | Application Load Balancer が処理した総バイト数の推定値<br>_単位は byte_ |
| **aws.elb.healthy_host_count** <br>(gauge) | 各 Availability Zone における正常なインスタンスの平均数<br>_単位は host_ |
| **aws.elb.healthy_host_count.maximum** <br>(gauge) | 各 Availability Zone における正常なインスタンスの最大数<br>_単位は host_ |
| **aws.elb.healthy_host_count.minimum** <br>(gauge) | 各 Availability Zone における正常なインスタンスの最小数<br>_単位は host_ |
| **aws.elb.healthy_host_count_deduped** <br>(gauge) | Cross-Zone Load Balancing オプションの有効/無効にかかわらず、Availability Zone ごとの正常なインスタンス数<br>_単位は host_ |
| **aws.elb.httpcode_backend_2xx** <br>(rate) | 登録済みインスタンスが返した HTTP 2XX 応答コード数<br>_単位は response_ |
| **aws.elb.httpcode_backend_3xx** <br>(rate) | 登録済みインスタンスが返した HTTP 3XX 応答コード数<br>_単位は response_ |
| **aws.elb.httpcode_backend_4xx** <br>(rate) | 登録済みインスタンスが返した HTTP 4XX 応答コード数<br>_単位は response_ |
| **aws.elb.httpcode_backend_5xx** <br>(rate) | 登録済みインスタンスが返した HTTP 5XX 応答コード数<br>_単位は response_ |
| **aws.elb.httpcode_elb_4xx** <br>(rate) | ロード バランサーが生成した HTTP 4XX クライアント エラー コード数<br>_単位は response_ |
| **aws.elb.httpcode_elb_5_0_0** <br>(count) | ロード バランサー側で発生した HTTP 500 エラー コード数<br>_単位は response_ |
| **aws.elb.httpcode_elb_5_0_2** <br>(count) | ロード バランサー側で発生した HTTP 502 エラー コード数<br>_単位は response_ |
| **aws.elb.httpcode_elb_5_0_3** <br>(count) | ロード バランサー側で発生した HTTP 503 エラー コード数<br>_単位は response_ |
| **aws.elb.httpcode_elb_5_0_4** <br>(count) | ロード バランサー側で発生した HTTP 504 エラー コード数<br>_単位は response_ |
| **aws.elb.httpcode_elb_5xx** <br>(rate) | ロード バランサーが生成した HTTP 5XX エラー コード数<br>_単位は response_ |
| **aws.elb.latency** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった平均時間 (ELB v1)<br>_単位は second_ |
| **aws.elb.latency.maximum** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった最大時間 (ELB v1)<br>_単位は second_ |
| **aws.elb.latency.minimum** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった最小時間 (ELB v1)<br>_単位は second_ |
| **aws.elb.latency.p95** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった時間の 95 パーセンタイル値 (ELB v1)<br>_単位は second_ |
| **aws.elb.latency.p99** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった時間の 99 パーセンタイル値 (ELB v1)<br>_単位は second_ |
| **aws.elb.request_count** <br>(rate) | 受信され、登録済みインスタンスにルーティングされた完了済みリクエストの総数<br>_単位は request_ |
| **aws.elb.spillover_count** <br>(rate) | キューがいっぱいだったために拒否されたリクエストの総数<br>_単位は request_ |
| **aws.elb.spillover_count.maximum** <br>(rate) | ロード バランサー ノードごとに、キューがいっぱいだったために拒否されたリクエストの最大数<br>_単位は request_ |
| **aws.elb.surge_queue_length** <br>(gauge) | 登録済みインスタンスへの送信待ちとなっているリクエストの最大数<br>_単位は request_ |
| **aws.elb.un_healthy_host_count** <br>(gauge) | 各 Availability Zone における異常なインスタンスの平均数<br>_単位は host_ |
| **aws.elb.un_healthy_host_count.maximum** <br>(gauge) | 各 Availability Zone における異常なインスタンスの最大数<br>_単位は host_ |
| **aws.elb.un_healthy_host_count.minimum** <br>(gauge) | 各 Availability Zone における異常なインスタンスの最小数<br>_単位は host_ |
| **aws.elb.un_healthy_host_count_deduped** <br>(gauge) | Cross-Zone Load Balancing オプションの有効/無効にかかわらず、Availability Zone ごとの異常なインスタンス数<br>_単位は host_ |
| **aws.networkelb.active_flow_count** <br>(gauge) | クライアントからターゲットへの確立済みアクティブ接続の平均数<br>_単位は connection_ |
| **aws.networkelb.active_flow_count.maximum** <br>(gauge) | クライアントからターゲットへの確立済みアクティブ接続の最大数<br>_単位は connection_ |
| **aws.networkelb.active_flow_count.minimum** <br>(gauge) | クライアントからターゲットへの確立済みアクティブ接続の最小数<br>_単位は connection_ |
| **aws.networkelb.active_flow_count_tcp** <br>(count) | クライアントからターゲットへの同時 TCP フロー (または接続) の平均数<br>_単位は connection_ |
| **aws.networkelb.active_flow_count_tls** <br>(count) | クライアントからターゲットへの同時 TLS フロー (または接続) の平均数<br>_単位は connection_ |
| **aws.networkelb.active_flow_count_udp** <br>(count) | クライアントからターゲットへの同時 UDP フロー (または接続) の平均数<br>_単位は connection_ |
| **aws.networkelb.client_tlsnegotiation_error_count** <br>(count) | クライアントと TLS リスナーの間で、ネゴシエーション中に失敗した TLS ハンドシェイクの総数<br>_単位は error_ |
| **aws.networkelb.consumed_lcus** <br>(count) | ロード バランサーが使用した LCU 数<br>_単位は unit_ |
| **aws.networkelb.consumed_lcus_tcp** <br>(count) | ロード バランサーが TCP に使用した LCU 数<br>_単位は unit_ |
| **aws.networkelb.consumed_lcus_tls** <br>(count) | ロード バランサーが TLS に使用した LCU 数<br>_単位は unit_ |
| **aws.networkelb.consumed_lcus_udp** <br>(count) | ロード バランサーが UDP に使用した LCU 数<br>_単位は unit_ |
| **aws.networkelb.healthy_host_count** <br>(gauge) | 正常なターゲットの平均数<br>_単位は host_ |
| **aws.networkelb.healthy_host_count.maximum** <br>(gauge) | 正常なターゲットの最大数<br>_単位は host_ |
| **aws.networkelb.healthy_host_count.minimum** <br>(gauge) | 正常なターゲットの最小数<br>_単位は host_ |
| **aws.networkelb.new_flow_count** <br>(count) | クライアントからターゲットへの新規 TCP 接続数<br>_単位は connection_ |
| **aws.networkelb.new_flow_count_tcp** <br>(count) | 対象期間中にクライアントからターゲットへ新たに確立された TCP フロー (または接続) の総数<br>_単位は connection_ |
| **aws.networkelb.new_flow_count_tls** <br>(count) | 対象期間中にクライアントからターゲットへ新たに確立された TLS フロー (または接続) の総数<br>_単位は connection_ |
| **aws.networkelb.new_flow_count_udp** <br>(count) | 対象期間中にクライアントからターゲットへ新たに確立された UDP フロー (または接続) の総数<br>_単位は connection_ |
| **aws.networkelb.peak_packets_per_second** <br>(gauge) | 対象期間内の 6 つの 10 秒測定ウィンドウで記録された、平均パケット レートの最大値<br>_単位は packet_ |
| **aws.networkelb.port_allocation_error_count** <br>(count) | クライアント IP 変換処理中に発生したエフェメラル ポート割り当てエラーの総数<br>_単位は error_ |
| **aws.networkelb.processed_bytes** <br>(count) | TCP/IP ヘッダーを含め、ロード バランサーが処理した総バイト数<br>_単位は byte_ |
| **aws.networkelb.processed_bytes_tcp** <br>(count) | TCP リスナーが処理した総バイト数<br>_単位は byte_ |
| **aws.networkelb.processed_bytes_tls** <br>(count) | TLS リスナーが処理した総バイト数<br>_単位は byte_ |
| **aws.networkelb.processed_bytes_udp** <br>(count) | UDP リスナーが処理した総バイト数<br>_単位は byte_ |
| **aws.networkelb.processed_packets** <br>(count) | ロード バランサーが処理したパケットの総数<br>_単位は packet_ |
| **aws.networkelb.reserved_lcus** <br>(count) | LCU Reservation を使ってロード バランサー用に予約された Load Balancer Capacity Unit (LCU) 数<br>_単位は unit_ |
| **aws.networkelb.target_tlsnegotiation_error_count** <br>(count) | TLS リスナーとターゲットの間で、ネゴシエーション中に失敗した TLS ハンドシェイクの総数<br>_単位は error_ |
| **aws.networkelb.tcpclient_reset_count** <br>(count) | クライアントが生成してターゲットに送信したリセット (RST) パケット数<br>_単位は packet_ |
| **aws.networkelb.tcpelbreset_count** <br>(count) | ロード バランサーが生成したリセット (RST) パケット数<br>_単位は packet_ |
| **aws.networkelb.tcptarget_reset_count** <br>(count) | ターゲットが生成してクライアントに送信したリセット (RST) パケット数<br>_単位は packet_ |
| **aws.networkelb.un_healthy_host_count** <br>(gauge) | 異常なターゲットの平均数<br>_単位は host_ |
| **aws.networkelb.un_healthy_host_count.maximum** <br>(gauge) | 異常なターゲットの最大数<br>_単位は host_ |
| **aws.networkelb.un_healthy_host_count.minimum** <br>(gauge) | 異常なターゲットの最小数<br>_単位は host_ |
| **aws.applicationelb.desync_mitigation_mode_non_compliant_request** <br>(count) | RFC 7230 に準拠していないリクエスト数<br>_単位は request_ |
| **aws.applicationelb.elb_auth_error** <br>(count) | 認証アクションの設定不備、ロード バランサーが IdP との接続を確立できなかったこと、または内部エラーにより認証フローを完了できなかったことが原因で、完了しなかったユーザー認証数<br>_単位は error_ |
| **aws.applicationelb.elb_auth_failure** <br>(count) | IdP がユーザーのアクセスを拒否したか、認可コードが複数回使われたために完了しなかったユーザー認証数<br>_単位は error_ |
| **aws.applicationelb.elb_auth_latency** <br>(gauge) | ID トークンとユーザー情報を取得するために IdP へ問い合わせるのにかかった時間。これらの処理のいずれかが失敗した場合は、失敗するまでに要した時間です。<br>_単位は millisecond_ |
| **aws.applicationelb.elb_auth_refresh_token_success** <br>(count) | IdP から提供されたリフレッシュ トークンを使って、ロード バランサーがユーザー クレームを正常に更新できた回数<br>_単位は success_ |
| **aws.applicationelb.elb_auth_success** <br>(count) | 正常に完了した認証アクション数<br>_単位は success_ |
| **aws.applicationelb.elb_authuser_claims_size_exceeded** <br>(count) | 設定された IdP が返したユーザー クレームのサイズが 11K byte を超えた回数|
| **aws.applicationelb.httpcode_elb_3xx** <br>(count) | ロード バランサー側で発生した HTTP 3XX リダイレクト コード数<br>_単位は response_ |
| **aws.applicationelb.httpcode_elb_4xx** <br>(count) | ロード バランサーが生成した HTTP 4XX クライアント エラー コード数<br>_単位は response_ |
| **aws.applicationelb.httpcode_elb_5_0_0** <br>(count) | ロード バランサー側で発生した HTTP 500 エラー コード数<br>_単位は response_ |
| **aws.applicationelb.httpcode_elb_5_0_2** <br>(count) | ロード バランサー側で発生した HTTP 502 エラー コード数<br>_単位は response_ |
| **aws.applicationelb.httpcode_elb_5_0_3** <br>(count) | ロード バランサー側で発生した HTTP 503 エラー コード数<br>_単位は response_ |
| **aws.applicationelb.httpcode_elb_5_0_4** <br>(count) | ロード バランサー側で発生した HTTP 504 エラー コード数<br>_単位は response_ |
| **aws.applicationelb.httpcode_elb_5xx** <br>(count) | ロード バランサーが生成した HTTP 5XX エラー コード数<br>_単位は response_ |
| **aws.applicationelb.httpcode_redirect** <br>(count) | 正常に実行されたリダイレクト アクション数<br>_単位は response_ |
| **aws.applicationelb.httpcode_target_2xx** <br>(count) | 登録済みインスタンスが返した HTTP 2XX 応答コード数<br>_単位は response_ |
| **aws.applicationelb.httpcode_target_3xx** <br>(count) | 登録済みインスタンスが返した HTTP 3XX 応答コード数<br>_単位は response_ |
| **aws.applicationelb.httpcode_target_4xx** <br>(count) | 登録済みインスタンスが返した HTTP 4XX 応答コード数<br>_単位は response_ |
| **aws.applicationelb.httpcode_target_5xx** <br>(count) | 登録済みインスタンスが返した HTTP 5XX 応答コード数<br>_単位は response_ |
| **aws.applicationelb.httpfixed_response** <br>(count) | 正常に実行された fixed-response アクション数<br>_単位は response_ |
| **aws.applicationelb.httpredirect** <br>(count) | 正常に実行されたリダイレクト アクション数|
| **aws.applicationelb.httpredirect_url_limit_exceeded** <br>(count) | レスポンスの location ヘッダー内の URL が 8K を超えたために完了できなかったリダイレクト アクション数|
| **aws.applicationelb.lambda_internal_error** <br>(count) | ロード バランサーまたは AWS Lambda の内部的な問題が原因で失敗した Lambda 関数へのリクエスト数<br>_単位は request_ |
| **aws.applicationelb.lambda_target_processed_bytes** <br>(gauge) | Lambda 関数へのリクエストおよびレスポンスについて、ロード バランサーが処理した総バイト数<br>_単位は byte_ |
| **aws.applicationelb.lambda_user_error** <br>(count) | Lambda 関数側の問題が原因で失敗した Lambda 関数へのリクエスト数<br>_単位は request_ |
| **aws.applicationelb.non_sticky_request_count** <br>(count) | 既存のスティッキー セッションを利用できず、ロード バランサーが新しいターゲットを選択したリクエスト数<br>_単位は request_ |
| **aws.applicationelb.target_tlsnegotiation_error_count** <br>(count) | ロード バランサーが開始した TLS 接続のうち、ターゲットとのセッションを確立できなかった数<br>_単位は connection_ |
| **aws.elb.active_connection_count** <br>(count) | クライアントとロード バランサー間、およびロード バランサーとターゲット間でアクティブな同時 TCP 接続の総数<br>_単位は connection_ |
| **aws.elb.client_tlsnegotiation_error_count** <br>(count) | TLS ネゴシエーション エラー数<br>_単位は error_ |
| **aws.elb.consumed_lbcapacity_units** <br>(gauge) | 消費された ELB capacity unit 数<br>_単位は unit_ |
| **aws.elb.consumed_lcus** <br>(gauge) | ロード バランサーで使用された Load Balancer Capacity Unit (LCU) 数<br>_単位は unit_ |
| **aws.elb.httpcode_redirect** <br>(count) | 正常に実行されたリダイレクト アクション数<br>_単位は response_ |
| **aws.elb.httpcode_target_2xx** <br>(count) | ターゲットが返した HTTP 2XX 応答コード数<br>_単位は response_ |
| **aws.elb.httpcode_target_3xx** <br>(count) | ターゲットが返した HTTP 3XX 応答コード数<br>_単位は response_ |
| **aws.elb.httpcode_target_4xx** <br>(count) | ターゲットが返した HTTP 4XX 応答コード数<br>_単位は response_ |
| **aws.elb.httpcode_target_5xx** <br>(count) | ターゲットが返した HTTP 5XX 応答コード数<br>_単位は response_ |
| **aws.elb.ipv_6processed_bytes** <br>(count) | ロード バランサーが IPv6 経由で処理した総バイト数<br>_単位は byte_ |
| **aws.elb.ipv_6request_count** <br>(count) | ロード バランサーが受信した IPv6 リクエスト数<br>_単位は request_ |
| **aws.elb.new_connection_count** <br>(count) | クライアントとロード バランサー間、およびロード バランサーとターゲット間で新たに確立された TCP 接続の総数<br>_単位は connection_ |
| **aws.elb.processed_bytes** <br>(count) | ロード バランサーが IPv4 と IPv6 経由で処理した総バイト数<br>_単位は byte_ |
| **aws.elb.request_count_per_target** <br>(count) | ターゲット グループ内の各ターゲットが平均して受信したリクエスト数<br>_単位は request_ |
| **aws.elb.rule_evaluations** <br>(count) | 1 時間平均のリクエスト レートに基づいて、ロード バランサーが処理したルール数|
| **aws.elb.target_connection_error_count** <br>(count) | ロード バランサーと登録済みインスタンスの間で正常に確立されなかった接続数<br>_単位は error_ |
| **aws.elb.target_response_time.average** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった平均時間。`aws.applicationelb.target_response_time.average` と同じです。<br>_単位は second_ |
| **aws.elb.target_response_time.maximum** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった最大時間。`aws.applicationelb.target_response_time.maximum` と同じです。<br>_単位は second_ |
| **aws.elb.target_response_time.p95** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった時間の 95 パーセンタイル値。`aws.applicationelb.target_response_time.p95` と同じです。<br>_単位は second_ |
| **aws.elb.target_response_time.p99** <br>(gauge) | リクエストがロード バランサーを離れてから応答を受信するまでにかかった時間の 99 パーセンタイル値。`aws.applicationelb.target_response_time.p99` と同じです。<br>_単位は second_ |

### イベント

Amazon Elastic Load Balancing インテグレーションにはイベントは含まれません。

### サービス チェック

Amazon Elastic Load Balancing インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。
---
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/observability_pipelines/integrations.md
kind: ドキュメント
title: インテグレーション
---
## 概要

Vector は Datadog と統合し、60 種類の[ソース](#sources)と[シンク](#sinks)とすぐに統合することが可能です。

## ソース

| ソース名                   | 説明                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| [Apache Metrics][1]           | Apache の HTTPD サーバーからメトリクスを収集します。                                                           |
| [AWS ECS Metrics][2]          | AWS ECS と AWS Fargate で実行されているタスクの Docker コンテナの統計情報を収集します。                          |
| [AWS Kinesis Firehose][3]     | AWS Kinesis Firehose からログを収集します。                                                               |
| [AWS S3][4]                   | AWS S3 からログを収集します。                                                                             |
| [AWS SQS][5]                  | AWS SQS からログを収集します。                                                                            |
| [Datadog Agent][6]            | Datadog Agent が収集したログやメトリクスを受信します。                                                |
| [Demo logs][7]                | テストやデモに便利なフェイクログイベントを生成します。                                  |
| [dnstap][8]                   | dnstap 対応サーバーから DNS ログを収集します。                                                     |
| [Docker logs][9]              | Docker からログを収集します。                                                                             |
| [EventStoreDB][10]            | EventStoreDB が収集したメトリクスを受信します。                                                     |
| [Exec][11]                    | ホスト上で動作しているプロセスから出力を収集します。                                                     |
| [File][12]                    | ファイルからログを収集します。                                                                              |
| [Fluent][13]                  | Fluentd または Fluent Bit Agent からログを収集します。                                                      |
| [Heroku Logplex][14]          | Heroku アプリのログを受信するルーターである Heroku の Logplex からログを収集します。  |
| [Host metrics][15]            | ローカルシステムからメトリクスデータを収集します。                                                            |
| [HTTP][16]                    | HTTP サーバーが発するログを収集します。                                                               |
| [Internal logs][17]           | 実行中の Vector インスタンスから出力されるすべてのログおよびトレースメッセージを公開します。                             |
| [Internal metrics][18]        | Vector 自身が生成するメトリクスにアクセスし、Vector のパイプラインで処理します。             |
| [JournalD][19]                | JournalD からログを収集します。                                                                           |
| [Kafka][20]                   | Kafka からログを収集します。                                                                              |
| [Kubernetes logs][21]         | Kubernetes Node からログを収集します。                                                                   |
| [Logstash][22]                | Logstash Agent からログを収集します。                                                                   |
| [MongoDB metrics][23]         | MongoDB データベースからメトリクスを収集します。                                                            |
| [NATS][24]                    | NATS メッセージングシステムで対象の観測可能性データを読み取ります。                                   |
| [NGINX metrics][25]           | NGINX からメトリクスを収集します。                                                                           |
| [PostgreSQL metrics][26]      | PostgreSQL データベースからメトリクスを収集します。                                                         |
| [Prometheus remote write][27] | Prometheus からメトリクスを収集します。                                                                      |
| [Prometheus scrape][28]       | Prometheus クライアントでメトリクスを収集します。                                                            |
| [Redis][29]                   | Redis から観測可能性データを収集します。                                                                |
| [Socket][30]                  | ソケットクライアントを使用してログを収集します。                                                                 |
| [Splunk HEC][31]              | Splunk からログを受信します。                                                                             |
| [StatsD][32]                  | StatsD アグリゲーターが発するログを収集します。                                                        |
| [stdin][33]                   | stdin で送信されるログを収集します。                                                                          |
| [Syslog][34]                  | Syslog で送信されるログを収集します。                                                                         |
| [Vector][35]                  | 別の Vector インスタンスから観測可能性データを収集します。                                              |

## シンク

| シンク名                             | 説明                                                                               |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| [AWS Cloudwatch logs][36]             | ログイベントを AWS Cloudwatch Logs に公開します。                                                |
| [AWS Cloudwatch metrics][37]          | AWS Cloudwatch Metrics にメトリクスイベントを公開します。                                          |
| [AWS Kinesis Data Firehose Logs][38]  | AWS Kinesis Data Firehose のトピックにログを公開します。                                         |
| [AWS Kinesis Streams logs][39]        | AWS Kinesis Streams のトピックにログを公開します。                                               |
| [AWS S3][40]                          | 観測可能性イベントを AWS S3 オブジェクトストレージシステムに格納します。                           |
| [AWS SQS][41]                         | 観測可能性イベントを Simple Queue Service のトピックに公開します。                              |
| [Azure Blob Storage][42]              | 観測可能性データを Azure Blob Storage に格納します。                                      |
| [Azure Monitor logs][43]              | Azure Monitor Logs サービスにログイベントを公開します。                                     |
| [Blackhole][44]                       | 観測可能性イベントをどこにも送らないので、デバッグに便利です。            |
| [Clickhouse][45]                      | Clickhouse のデータベースにログデータを配信します。                                              |
| [Console][46]                         | 観測可能性イベントをコンソールに表示します。デバッグに便利です。  |
| [Datadog events][47]                  | 観測可能性イベントを Datadog Events API に公開します。                                   |
| [Datadog logs][48]                    | Datadog にログイベントを公開します。                                                            |
| [Datadog metrics][49]                 | Datadog にメトリクスイベントを公開します。                                                         |
| [Datadog traces][50]                  | Datadog にトレースを公開します。                                                                |
| [Elasticsearch][51]                   | Elasticsearch の観測可能性イベントをインデックス化します。                                              |
| [File][52]                            | 観測可能性イベントをファイルに出力します。                                                   |
| [GCP Cloud Monitoring][53]            | GCP のクラウドモニタリングシステムにメトリクスを配信します。                                         |
| [GCP Cloud storage][54]               | 観測可能性イベントを GCP Cloud Storage に格納します。                                          |
| [GCP Stackdriver][55]                 | GCP の Cloud Operationsスイートにログを配信します。                                             |
| [GCP PubSub][56]                      | 観測可能性イベントを GCP の PubSub メッセージングシステムに公開します。                            |
| [Honeycomb][57]                       | ログイベントを Honeycomb に配信します。                                                          |
| [HTTP][58]                            | 観測可能性イベントデータを HTTP サーバーに配信します。                                       |
| [Humio logs][59]                      | ログイベントデータを Humio に配信します。                                                          |
| [Humio metrics][60]                   | メトリクスイベントデータを Humio に配信します。                                                       |
| [InfluxDB logs][61]                   | ログイベントデータを InfluxDB に配信します。                                                       |
| [InfluxDB metrics][62]                | メトリクスイベントデータを InfluxDB に配信します。                                                    |
| [Kafka][63]                           | 観測可能性イベントデータを Apache Kafka のトピックに公開します。                                  |
| [LogDNA][64]                          | ログイベントデータを LogDNA に配信します。                                                         |
| [Loki][65]                            | ログイベントデータを Loki 集計システムへ配信します。                                    |
| [NATS][66]                            | NATS メッセージングシステムで観測可能性データを対象に公開します。                      |
| [New Relic][67]                       | New Relic にイベントを配信します。                                                              |
| [New Relic logs][68]                  | New Relic にログイベントを配信します。                                                          |
| [Papertrail][69]                      | SolarWinds から Papertrail にログイベントを配信します。                                         |
| [Prometheus Exporter][70]             | ホスト上で動作している Prometheus エクスポーターにメトリクスイベントを出力します。                        |
| [Prometheus remote write][71]         | Prometheus のリモート書き込みエンドポイントにメトリクスデータを配信します。                                |
| [Pulsar][72]                          | Apache Pulsar のトピックに観測可能なイベントを公開します。                                     |
| [Redis][73]                           | 観測可能性データを Redis に公開します。                                                      |
| [Sematext logs][74]                   | Sematext にログイベントを公開します。                                                           |
| [Sematext metrics][75]                | Sematext にメトリクスイベントを公開します。                                                        |
| [Socket][76]                          | リモートソケットエンドポイントにログを配信します。                                                 |
| [Splunk HEC logs][77]                 | ログデータを Splunk の HTTP イベントコレクターに配信します。                                        |
| [Splunk HEC metrics][78]              | メトリクスデータを Splunk の HTTP イベントコレクターに配信します。                                     |
| [Statsd][79]                          | StatsD アグリゲーターにログデータを配信します。                                                  |
| [Vector][80]                          | 観測可能性データを別の Vector インスタンスに中継します。                                      |

## Datadog Agent
- [Vector による Datadog Agent の集計](https://docs.datadoghq.com/agent/vector_aggregation/ )

[1]: https://vector.dev/docs/reference/configuration/sources/apache_metrics/
[2]: https://vector.dev/docs/reference/configuration/sources/aws_ecs_metrics/
[3]: https://vector.dev/docs/reference/configuration/sources/aws_kinesis_firehose/
[4]: https://vector.dev/docs/reference/configuration/sources/aws_s3/
[5]: https://vector.dev/docs/reference/configuration/sources/aws_sqs/
[6]: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
[7]: https://vector.dev/docs/reference/configuration/sources/demo_logs/
[8]: https://vector.dev/docs/reference/configuration/sources/dnstap/
[9]: https://vector.dev/docs/reference/configuration/sources/docker_logs/
[10]: https://vector.dev/docs/reference/configuration/sources/eventstoredb_metrics/
[11]: https://vector.dev/docs/reference/configuration/sources/exec/
[12]: https://vector.dev/docs/reference/configuration/sources/file/
[13]: https://vector.dev/docs/reference/configuration/sources/fluent/
[14]: https://vector.dev/docs/reference/configuration/sources/heroku_logs/
[15]: https://vector.dev/docs/reference/configuration/sources/host_metrics/
[16]: https://vector.dev/docs/reference/configuration/sources/http/
[17]: https://vector.dev/docs/reference/configuration/sources/internal_logs/
[18]: https://vector.dev/docs/reference/configuration/sources/internal_metrics/
[19]: https://vector.dev/docs/reference/configuration/sources/journald/
[20]: https://vector.dev/docs/reference/configuration/sources/kafka/
[21]: https://vector.dev/docs/reference/configuration/sources/kubernetes_logs/
[22]: https://vector.dev/docs/reference/configuration/sources/logstash/
[23]: https://vector.dev/docs/reference/configuration/sources/mongodb_metrics/
[24]: https://vector.dev/docs/reference/configuration/sources/nats/
[25]: https://vector.dev/docs/reference/configuration/sources/nginx_metrics/
[26]: https://vector.dev/docs/reference/configuration/sources/postgresql_metrics/
[27]: https://vector.dev/docs/reference/configuration/sources/prometheus_remote_write/
[28]: https://vector.dev/docs/reference/configuration/sources/prometheus_scrape/
[29]: https://vector.dev/docs/reference/configuration/sources/redis/
[30]: https://vector.dev/docs/reference/configuration/sources/socket/
[31]: https://vector.dev/docs/reference/configuration/sources/splunk_hec/
[32]: https://vector.dev/docs/reference/configuration/sources/statsd/
[33]: https://vector.dev/docs/reference/configuration/sources/stdin/
[34]: https://vector.dev/docs/reference/configuration/sources/syslog/
[35]: https://vector.dev/docs/reference/configuration/sources/vector/
[36]: https://vector.dev/docs/reference/configuration/sinks/aws_cloudwatch_logs/
[37]: https://vector.dev/docs/reference/configuration/sinks/aws_cloudwatch_metrics/
[38]: https://vector.dev/docs/reference/configuration/sinks/aws_kinesis_firehose/
[39]: https://vector.dev/docs/reference/configuration/sinks/aws_kinesis_streams/
[40]: https://vector.dev/docs/reference/configuration/sinks/aws_s3/
[41]: https://vector.dev/docs/reference/configuration/sinks/aws_sqs/
[42]: https://vector.dev/docs/reference/configuration/sinks/azure_blob/
[43]: https://vector.dev/docs/reference/configuration/sinks/azure_monitor_logs/
[44]: https://vector.dev/docs/reference/configuration/sinks/blackhole/
[45]: https://vector.dev/docs/reference/configuration/sinks/clickhouse/
[46]: https://vector.dev/docs/reference/configuration/sinks/console/
[47]: https://vector.dev/docs/reference/configuration/sinks/datadog_events/
[48]: https://vector.dev/docs/reference/configuration/sinks/datadog_logs/
[49]: https://vector.dev/docs/reference/configuration/sinks/datadog_metrics/
[50]: https://vector.dev/docs/reference/configuration/sinks/datadog_traces/
[51]: https://vector.dev/docs/reference/configuration/sinks/elasticsearch/
[52]: https://vector.dev/docs/reference/configuration/sinks/file/
[53]: https://vector.dev/docs/reference/configuration/sinks/gcp_stackdriver_metrics/
[54]: https://vector.dev/docs/reference/configuration/sinks/gcp_cloud_storage/
[55]: https://vector.dev/docs/reference/configuration/sinks/gcp_stackdriver_logs/
[56]: https://vector.dev/docs/reference/configuration/sinks/gcp_pubsub/
[57]: https://vector.dev/docs/reference/configuration/sinks/honeycomb/
[58]: https://vector.dev/docs/reference/configuration/sinks/http/
[59]: https://vector.dev/docs/reference/configuration/sinks/humio_logs/
[60]: https://vector.dev/docs/reference/configuration/sinks/humio_metrics/
[61]: https://vector.dev/docs/reference/configuration/sinks/influxdb_logs/
[62]: https://vector.dev/docs/reference/configuration/sinks/influxdb_metrics/
[63]: https://vector.dev/docs/reference/configuration/sinks/kafka/
[64]: https://vector.dev/docs/reference/configuration/sinks/logdna/
[65]: https://vector.dev/docs/reference/configuration/sinks/loki/
[66]: https://vector.dev/docs/reference/configuration/sinks/nats/
[67]: https://vector.dev/docs/reference/configuration/sinks/new_relic/
[68]: https://vector.dev/docs/reference/configuration/sinks/new_relic_logs/
[69]: https://vector.dev/docs/reference/configuration/sinks/papertrail/
[70]: https://vector.dev/docs/reference/configuration/sinks/prometheus_exporter/
[71]: https://vector.dev/docs/reference/configuration/sinks/prometheus_remote_write/
[72]: https://vector.dev/docs/reference/configuration/sinks/pulsar/
[73]: https://vector.dev/docs/reference/configuration/sinks/redis/
[74]: https://vector.dev/docs/reference/configuration/sinks/sematext_logs/
[75]: https://vector.dev/docs/reference/configuration/sinks/sematext_metrics/
[76]: https://vector.dev/docs/reference/configuration/sinks/socket/
[77]: https://vector.dev/docs/reference/configuration/sinks/splunk_hec_logs/
[78]: https://vector.dev/docs/reference/configuration/sinks/splunk_hec_metrics/
[79]: https://vector.dev/docs/reference/configuration/sinks/statsd/
[80]: https://vector.dev/docs/reference/configuration/sinks/vector/
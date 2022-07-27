---
title: Integrations
kind: Documentation
dependencies:
  ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/observability_pipelines/integrations.md"]
---
## Overview

Vector integrates with Datadog and offers out-of-the-box integrations with 60 different [sources](#sources) and [sinks](#sinks). 

## Sources

| Source Name                   | Description                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| [Apache Metrics][1]           | Collect metrics from Apache’s HTTPD server.                                                           |
| [AWS ECS Metrics][2]          | Collect Docker container stats for tasks running in AWS ECS and AWS Fargate.                          |
| [AWS Kinesis Firehose][3]     | Collect logs from AWS Kinesis Firehose.                                                               |
| [AWS S3][4]                   | Collect logs from AWS S3.                                                                             |
| [AWS SQS][5]                  | Collect logs from AWS SQS.                                                                            |
| [Datadog Agent][6]            | Receive logs and metrics collected by a Datadog Agent.                                                |
| [Demo logs][7]                | Generate fake log events, which can be useful for testing and demos.                                  |
| [dnstap][8]                   | Collect DNS logs from a dnstap-compatible server.                                                     |
| [Docker logs][9]              | Collect logs from Docker.                                                                             |
| [EventStoreDB][10]            | Receive metrics from collected by a EventStoreDB.                                                     |
| [Exec][11]                    | Collect output from a process running on the host.                                                     |
| [File][12]                    | Collect logs from files.                                                                              |
| [Fluent][13]                  | Collect logs from a Fluentd or Fluent Bit agent.                                                      |
| [Heroku Logplex][14]          | Collect logs from Heroku’s Logplex, the router responsible for receiving logs from your Heroku apps.  |
| [Host metrics][15]            | Collect metric data from the local system.                                                            |
| [HTTP][16]                    | Collect logs emitted by an HTTP server.                                                               |
| [Internal logs][17]           | Expose all log and trace messages emitted by the running Vector instance.                             |
| [Internal metrics][18]        | Access to the metrics produced by Vector itself and process them in your Vector pipeline.             |
| [JournalD][19]                | Collect logs from JournalD.                                                                           |
| [Kafka][20]                   | Collect logs from Kafka.                                                                              |
| [Kubernetes logs][21]         | Collect logs from Kubernetes Nodes.                                                                   |
| [Logstash][22]                | Collect logs from a Logstash agent.                                                                   |
| [MongoDB metrics][23]         | Collect metrics from the MongoDB database.                                                            |
| [NATS][24]                    | Read observability data from subjects on the NATS messaging system.                                   |
| [NGINX metrics][25]           | Collect metrics from NGINX.                                                                           |
| [PostgreSQL metrics][26]      | Collect metrics from the PostgreSQL database.                                                         |
| [Prometheus remote write][27] | Collect metrics from Prometheus.                                                                      |
| [Prometheus scrape][28]       | Collect metrics with the Prometheus client.                                                            |
| [Redis][29]                   | Collect observability data from Redis.                                                                |
| [Socket][30]                  | Collect logs using the socket client.                                                                 |
| [Splunk HEC][31]              | Receive logs from Splunk.                                                                             |
| [StatsD][32]                  | Collect logs emitted by the StatsD aggregator.                                                        |
| [stdin][33]                   | Collect logs sent with stdin.                                                                          |
| [Syslog][34]                  | Collect logs sent with Syslog.                                                                         |
| [Vector][35]                  | Collect observability data from another Vector instance.                                              |

## Sinks 

| Sink Name                             | Description                                                                               |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| [AWS Cloudwatch logs][36]             | Publish log events to AWS Cloudwatch Logs.                                                |
| [AWS Cloudwatch metrics][37]          | Publish metric events to AWS Cloudwatch Metrics.                                          |
| [AWS Kinesis Data Firehose Logs][38]  | Publish logs to AWS Kinesis Data Firehose topics.                                         |
| [AWS Kinesis Streams logs][39]        | Publish logs to AWS Kinesis Streams topics.                                               |
| [AWS S3][40]                          | Store observability events in the AWS S3 object storage system.                           |
| [AWS SQS][41]                         | Publish observability events to Simple Queue Service topics.                              |
| [Azure Blob Storage][42]              | Store your observability data in Azure Blob Storage.                                      |
| [Azure Monitor logs][43]              | Publish log events to the Azure Monitor Logs service.                                     |
| [Blackhole][44]                       | Send observability events nowhere, which can be useful for debugging purposes.            |
| [Clickhouse][45]                      | Deliver log data to the Clickhouse database.                                              |
| [Console][46]                         | Display observability events in the console, which can be useful for debugging purposes.  |
| [Datadog events][47]                  | Publish observability events to the Datadog Events API.                                   |
| [Datadog logs][48]                    | Publish log events to Datadog.                                                            |
| [Datadog metrics][49]                 | Publish metric events to Datadog.                                                         |
| [Datadog traces][50]                  | Publish traces to Datadog.                                                                |
| [Elasticsearch][51]                   | Index observability events in Elasticsearch.                                              |
| [File][52]                            | Output observability events into files.                                                   |
| [GCP Cloud Monitoring][53]            | Deliver metrics to GCP’s Cloud Monitoring system.                                         |
| [GCP Cloud storage][54]               | Store observability events in GCP Cloud Storage.                                          |
| [GCP Stackdriver][55]                 | Deliver logs to GCP’s Cloud Operations suite.                                             |
| [GCP PubSub][56]                      | Publish observability events to GCP’s PubSub messaging system.                            |
| [Honeycomb][57]                       | Deliver log events to Honeycomb.                                                          |
| [HTTP][58]                            | Deliver observability event data to an HTTP server.                                       |
| [Humio logs][59]                      | Deliver log event data to Humio.                                                          |
| [Humio metrics][60]                   | Deliver metric event data to Humio.                                                       |
| [InfluxDB logs][61]                   | Deliver log event data to InfluxDB.                                                       |
| [InfluxDB metrics][62]                | Deliver metric event data to InfluxDB.                                                    |
| [Kafka][63]                           | Publish observability event data to Apache Kafka topics.                                  |
| [LogDNA][64]                          | Deliver log event data to LogDNA.                                                         |
| [Loki][65]                            | Deliver log event data to the Loki aggregation system.                                    |
| [NATS][66]                            | Publish observability data to subjects on the NATS messaging system.                      |
| [New Relic][67]                       | Deliver events to New Relic.                                                              |
| [New Relic logs][68]                  | Deliver log events to New Relic.                                                          |
| [Papertrail][69]                      | Deliver log events to Papertrail from SolarWinds.                                         |
| [Prometheus Exporter][70]             | Output metric events to a Prometheus exporter running on the host.                        |
| [Prometheus remote write][71]         | Deliver metric data to a Prometheus remote write endpoint.                                |
| [Pulsar][72]                          | Publish observability events to Apache Pulsar topics.                                     |
| [Redis][73]                           | Publish observability data to Redis.                                                      |
| [Sematext logs][74]                   | Publish log events to Sematext.                                                           |
| [Sematext metrics][75]                | Publish metric events to Sematext.                                                        |
| [Socket][76]                          | Deliver logs to a remote socket endpoint.                                                 |
| [Splunk HEC logs][77]                 | Deliver log data to Splunk’s HTTP Event Collector.                                        |
| [Splunk HEC metrics][78]              | Deliver metric data to Splunk’s HTTP Event Collector.                                     |
| [Statsd][79]                          | Deliver log data to a StatsD aggregator.                                                  |
| [Vector][80]                          | Relay observability data to another Vector instance.                                      |

## Datadog Agent
- [Aggregating Datadog agents with Vector](https://docs.datadoghq.com/agent/vector_aggregation/ )

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

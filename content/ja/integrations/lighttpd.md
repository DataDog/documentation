---
last_modified: 2015/07/16
translation_status: original
language: ja
title: Datadog-Lighttpd Integration
integration_title: Lighttpd
kind: integration
doclevel:
---

<!-- ### Overview
{:#int-overview}

Bring Lighttpd metrics to Datadog to:

- Visualize your web server performance.
- Correlate the performance of Lighttpd with the rest of your applications. -->

### 概要
{:#int-overview}

次の目的で、LighttpdのメトリクスをDatadogへ送信します:

- webサーバのパフォーマンスを可視化する
- lighttpdのメトリクスと他のアプリケーションメトリクスを連携し、状況を把握する


<!-- From the open-source Agent:

* [Lighttpd YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/lighttpd.yaml.example)
* [Lighttpd checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/lighttpd.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:
* [Lighttpdインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/lighttpd.yaml.example)
* [Lighttpdインテグレーション checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/lighttpd.py)


<!-- The following metrics are collected by default with the Lighttpd integration:

    lighttpd.connections.state_handle_request
    lighttpd.connections.state_keep_alive
    lighttpd.connections.state_read_header
    lighttpd.connections.state_start
    lighttpd.connections.state_write_response
    lighttpd.net.bytes_in
    lighttpd.net.bytes_in_avg
    lighttpd.net.bytes_in_avg_5sec
    lighttpd.net.bytes_out
    lighttpd.net.bytes_out_avg
    lighttpd.net.bytes_out_avg_5sec
    lighttpd.net.bytes_per_s
    lighttpd.net.connections_avg
    lighttpd.net.connections_avg_5sec
    lighttpd.net.connections_total
    lighttpd.net.request_per_s
    lighttpd.net.requests_avg
    lighttpd.net.requests_avg_5sec
    lighttpd.net.requests_total
    lighttpd.performance.busy_servers
    lighttpd.performance.idle_server
    lighttpd.performance.memory_usage
    lighttpd.performance.uptime
    lighttpd.response.status_1xx
    lighttpd.response.status_2xx
    lighttpd.response.status_3xx
    lighttpd.response.status_4xx
    lighttpd.response.status_5xx -->

Lighttpdインテグレーションがデフォルトで取得しているメトリクス:

    lighttpd.connections.state_handle_request
    lighttpd.connections.state_keep_alive
    lighttpd.connections.state_read_header
    lighttpd.connections.state_start
    lighttpd.connections.state_write_response
    lighttpd.net.bytes_in
    lighttpd.net.bytes_in_avg
    lighttpd.net.bytes_in_avg_5sec
    lighttpd.net.bytes_out
    lighttpd.net.bytes_out_avg
    lighttpd.net.bytes_out_avg_5sec
    lighttpd.net.bytes_per_s
    lighttpd.net.connections_avg
    lighttpd.net.connections_avg_5sec
    lighttpd.net.connections_total
    lighttpd.net.request_per_s
    lighttpd.net.requests_avg
    lighttpd.net.requests_avg_5sec
    lighttpd.net.requests_total
    lighttpd.performance.busy_servers
    lighttpd.performance.idle_server
    lighttpd.performance.memory_usage
    lighttpd.performance.uptime
    lighttpd.response.status_1xx
    lighttpd.response.status_2xx
    lighttpd.response.status_3xx
    lighttpd.response.status_4xx
    lighttpd.response.status_5xx

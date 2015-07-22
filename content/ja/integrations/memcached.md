---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-Memcached Integration
integration_title: Memcached
kind: integration
doclevel: basic
---

<!-- ### Overview
{:#int-overview} -->

## 概要
{: #int-overview}


<!-- Connect Memcached to Datadog in order to:

- Visualize its performance
- Correlate the performance of Memcached with the rest of your applications -->

次の目的のために、MeｍcachedのメトリクスをDatadogに送信します:

- パフォーマンスの可視化
- Meｍcachedのパフォーマンス情報と他アプリケーションの情報を連携


<!-- From the open-source Agent:

* [Memcache YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/mcache.yaml.example)
* [Memcache checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/mcache.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [Memcachedインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/mcache.yaml.example)
* [Memcachedインテグレーション checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/mcache.py)


<!-- The following metrics are collected by default with the Memcache integration:

    memcache.bytes
    memcache.bytes_read
    memcache.bytes_written
    memcache.cmd_get
    memcache.cmd_set
    memcache.connection_structures
    memcache.curr_connections
    memcache.curr_items
    memcache.evictions
    memcache.get_hits
    memcache.get_misses
    memcache.limit_maxbytes
    memcache.pointer_size
    memcache.rusage_system
    memcache.rusage_user
    memcache.threads
    memcache.total_connections
    memcache.total_items -->

Memcachedインテグレーションがデフォルトで取得しているメトリクス:

    memcache.bytes
    memcache.bytes_read
    memcache.bytes_written
    memcache.cmd_get
    memcache.cmd_set
    memcache.connection_structures
    memcache.curr_connections
    memcache.curr_items
    memcache.evictions
    memcache.get_hits
    memcache.get_misses
    memcache.limit_maxbytes
    memcache.pointer_size
    memcache.rusage_system
    memcache.rusage_user
    memcache.threads
    memcache.total_connections
    memcache.total_items

---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-MongoDB Integration
integration_title: MongoDB
kind: integration
doclevel: basic
---

<!-- ### Overview
{:#int-overview} -->

## 概要
{: #int-overview}


<!-- Connect MongoDB to Datadog in order to:

- Visualize key MongoDB metrics.
- Correlate MongoDB performance with the rest of your applications. -->

次の目的の為に、MongoDBのメトリクスをDatadogに送信します:

- MongoDBのキーメトリクスの可視化
- MongoDBのパフォーマンス情報と他アプリケーションの情報を連携


<!-- From the open-source Agent:

* [MongoDB YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/mongo.yaml.example)
* [MongoDB checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/mongo.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [MongoDBインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/mongo.yaml.example)
* [MongoDBインテグレーション checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/mongo.py)


<!-- The following metrics are collected by default with the MongoDB integration:

    mongo.asserts.msg
    mongo.asserts.regular
    mongo.asserts.rollovers
    mongo.asserts.user
    mongo.asserts.warning
    mongo.connections.available
    mongo.connections.current
    mongo.cursors.timedOut
    mongo.cursors.totalOpen
    mongo.globalLock.ratio
    mongo.indexCounters.btree.accesses
    mongo.indexCounters.btree.hits
    mongo.indexCounters.btree.misses
    mongo.indexCounters.btree.missRatio
    mongo.mem.mapped
    mongo.mem.resident
    mongo.mem.virtual
    mongo.opcounters.command
    mongo.opcounters.delete
    mongo.opcounters.getmore
    mongo.opcounters.inserts
    mongo.opcounters.query
    mongo.opcounters.update
    mongo.replSet.health
    mongo.replSet.replicationLag
    mongo.replSet.state
    mongo.stats.dataSize
    mongo.stats.indexes
    mongo.stats.indexSize
    mongo.stats.objects
    mongo.stats.storageSize
    mongo.uptime -->

MongoDBインテグレーションがデフォルトで取得しているメトリクス:

    mongo.asserts.msg
    mongo.asserts.regular
    mongo.asserts.rollovers
    mongo.asserts.user
    mongo.asserts.warning
    mongo.connections.available
    mongo.connections.current
    mongo.cursors.timedOut
    mongo.cursors.totalOpen
    mongo.globalLock.ratio
    mongo.indexCounters.btree.accesses
    mongo.indexCounters.btree.hits
    mongo.indexCounters.btree.misses
    mongo.indexCounters.btree.missRatio
    mongo.mem.mapped
    mongo.mem.resident
    mongo.mem.virtual
    mongo.opcounters.command
    mongo.opcounters.delete
    mongo.opcounters.getmore
    mongo.opcounters.inserts
    mongo.opcounters.query
    mongo.opcounters.update
    mongo.replSet.health
    mongo.replSet.replicationLag
    mongo.replSet.state
    mongo.stats.dataSize
    mongo.stats.indexes
    mongo.stats.indexSize
    mongo.stats.objects
    mongo.stats.storageSize
    mongo.uptime

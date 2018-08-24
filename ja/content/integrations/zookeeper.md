---
last_modified: 2015/07/17
translation_status: complete
language: ja
title: Datadog-Zookeeper Integration
integration_title: Zookeeper
git_integration_title: zookeeper
kind: integration
doclevel: basic
---

<!-- ### Overview

Connect ZooKeeper to Datadog in order to:

- Visualize ZooKeeper performance and utilization.
- Correlate the performance of ZooKeeper with the rest of your applications. -->

## 概要

次の目的で、ZooKeeperとDatadogを連携します:

* ZooKeeperのパフォーマンスと活用状況を可視化する
* Zookeeperのパフォーマンスとそれ以外のアプリケーションを関連付け、状況を把握する

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [ZooKeeper MySQLインテグレーションの設定ファイルサンプル](https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example)
* [ZooKeeperインテグレーション checks.d](https://github.com/DataDog/integrations-core/blob/master/zk/check.py)

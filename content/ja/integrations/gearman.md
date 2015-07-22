---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-Gearman Integration
integration_title: Gearman
kind: integration
doclevel: complete
---

<!-- ### Overview
{:#int-overview}

Bring Gearman metrics to Datadog to:

- Visualize Gearman performance.
- Know how many tasks are queued or running.
- Correlate the performance of Gearman with the rest of your applications. -->

### 概要
{:#int-overview}

Bring Gearman metrics to Datadog to:
次の目的で、GearmanのメトリクスをDatadogと連携します:

* Greamanのパフォーマンスを可視化する。
* キューに溜まったタスクや進行形のタスクを把握する。
* Gearmanのパフォーマンスを他のアプルケーションと連携し状況を把握する


<!-- From the open-source Agent:

* [Gearman YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/gearmand.yaml.example)
* [Gearman checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/gearmand.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [Gearmanインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/gearmand.yaml.example)
* [Gearmanインテグレーション checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/gearmand.py)


<!-- The following metrics are collected by default with the Gearman integration:

    gearman.queued
    gearman.running
    gearman.unique_tasks
    gearman.workers -->

Gearmanインテグレーションがデフォルトで取得しているメトリクス:
    gearman.queued
    gearman.running
    gearman.unique_tasks
    gearman.workers
